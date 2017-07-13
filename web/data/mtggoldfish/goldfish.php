<?php

function grabLinks()
{
    $baseURL = "https://www.mtggoldfish.com";
    $basePath = "data/mtggoldfish/result";

    $goldfishData = file_get_contents("data/mtggoldfish/src/goldfish_sets.json");
    $goldfishDataObj = json_decode($goldfishData);


    foreach ($goldfishDataObj as $dataObj) {
        $link = $baseURL . $dataObj->link;

        $url = $link;
        $handle = curl_init($url);
        curl_setopt($handle, CURLOPT_RETURNTRANSFER, true);
        $html = curl_exec($handle);
        libxml_use_internal_errors(true); // Prevent HTML errors from displaying
        $doc = new DOMDocument();
        $doc->loadHTML($html);

        $tables = $doc->getElementsByTagName("table");

        $cardData = $tables[1]->nodeValue;

        $cardData = substr(
            $cardData,
            strrpos($cardData, "(%)") + 4
        );

        $cardData = preg_replace('/(%)\n([A-Z])/', '\1|\2', $cardData);
        $cardData = preg_replace('/\R/', '', $cardData);
        $cardData = explode("|", $cardData);

        // Grab $maxCount cards from the set
        $cardDataFinal = [];
        $maxCount = 40;
        $i = 1;

        foreach ($cardData as $card) {
            preg_match("/(.*)([A-Z123456789]{3})([A-Z][a-z]*)(\d*.\d{2})/", $card, $cardParsed);
            $cardDataFinal[] = [
                "name" => $cardParsed[1],
                "set" => $cardParsed[2],
                "rarity" => $cardParsed[3],
                "price" => $cardParsed[4]
            ];

            $i+=1;
            if ($i>$maxCount) {
                $i = 1;
                break;
            }
        }

        $now = getdate();
        $fullPath = "$basePath/{$now["year"]}/{$now['month']}";
        mkdir($fullPath, 0777, true);
        file_put_contents("$fullPath/{$now['mday']}.json", json_encode($cardDataFinal), FILE_APPEND);
    }

    echo "finished";
}

/**
 * @param $string
 * @return table in html
 *
 */
function arrayToTable($string)
{
    $table = "<table>";
    $table .= "<tr><th>Name</th><th>Edition</th><th>Preis</th></tr>";

    foreach ($string as $card) {
        $table .= "<tr><td>{$card['name']}</td><td>{$card['set']}</td><td>{$card['price']}</td></tr>";
    }

    $table .= "</table>";
    return $table;
}