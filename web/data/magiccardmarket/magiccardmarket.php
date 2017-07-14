<?php

function grabLinksM($src)
{
    $baseURL = "https://www.magiccardmarket.eu/Products/Singles/--set--?sortBy=lowPrice&sortDir=desc&view=list";
    $baseURLNext = "https://www.magiccardmarket.eu/Products/Singles/--set--?sortBy=lowPrice&sortDir=desc&view=list&resultsPage=1";

    $basePath = "data/magiccardmarket/result";
    $agent = 'Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1; .NET CLR 1.0.3705; .NET CLR 1.1.4322)';

    $setData = file_get_contents($src);
    $setDataObj = json_decode($setData);

    $allCardsArray = [];

//    $dataObj = $setDataObj[0];
    foreach ($setDataObj as $dataObj) {
        $setName = str_replace(" ", "+", $dataObj->edition);
        $link = str_replace("--set--", $setName, $baseURL);
        $linkNext = str_replace("--set--", $setName, $baseURLNext);
        $setCode = $dataObj->code;

        $url = $link;
        $handle = curl_init($url);
        curl_setopt($handle, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($handle, CURLOPT_USERAGENT, $agent);

        $response = curl_exec($handle);
        if ($response === false) {
            $response = curl_error($handle);
            echo stripslashes($response);
            return false;
        } else {
            $html = $response;
        }

        libxml_use_internal_errors(true); // Prevent HTML errors from displaying
        $doc = new DOMDocument();
        $doc->loadHTML($html);
        curl_close($handle);

        $tableRows = $doc->getElementsByTagName("tr");

        foreach ($tableRows as $row) {
            // Transform nodes into array for easier parsing
            $card = [];

            foreach ($row->childNodes as $tableCol) {
                $card[] = $tableCol;
            }

            // Parse all cards into result array
            if (isset($card[2]) && $card[2]->nodeValue !== "English Name") {
                if (strpos($card[2]->nodeValue, "Token") === false) {
                    $allCardsArray[] = [
                        "name" => $card[2]->nodeValue,
                        "set" => $setCode,
                        "price" => str_replace([",", ' €'], [".", ""], $card[5]->nodeValue)
                    ];
                }
            }
        }
    }

    $now = getdate();
    $fullPath = "$basePath/{$now["year"]}/{$now['month']}";
    mkdir($fullPath, 0777, true);
    file_put_contents("$fullPath/{$now['mday']}.json", json_encode(array_values($allCardsArray)), FILE_APPEND);

    echo "finished";
}
