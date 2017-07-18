<?php

function grabLinks($src)
{
    $baseURL = "https://www.mtggoldfish.com";
    $basePath = "data/mtggoldfish/result";
    $agent = 'Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1; .NET CLR 1.0.3705; .NET CLR 1.1.4322)';

    $goldfishData = file_get_contents($src);
    $goldfishDataObj = json_decode($goldfishData);

//    $dataObj = $goldfishDataObj[0];
    $allCardsArray = [];
    foreach ($goldfishDataObj as $dataObj) {
        $link = $baseURL . $dataObj->link_mtggoldfish;

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

        $tables = $doc->getElementsByTagName("table");

        $cardData = $tables[1]->nodeValue;

        $cardData = substr(
            $cardData,
            strrpos($cardData, "(%)") + 4
        );

        $cardData = preg_replace('/(%)\n([A-Z])/', '\1|\2', $cardData);
        $cardData = preg_replace('/\R/', '', $cardData);

        // Two letter set code
        if (preg_match('/(\/)(PS|ON|OD|AP|IN|PR|NE|MM|UD|UL|UZ|EX|ST|TE|WL|VI|MI|7E)$/', $link)) {
            $cardData = preg_replace(
                '/(PS|ON|OD|AP|IN|PR|NE|MM|UD|UL|UZ|EX|ST|TE|WL|VI|MI|7E)/',
                '\1X',
                $cardData
            );
        }

        $cardData = preg_replace('/([A-Z01234567890]{3})(Rare|Uncommon|Common|Mythic|Special|Bonus|Land)/', '\1', $cardData);
        $cardData = preg_replace('/([A-Z1234567890]{3})(\d+.\d{2})/', '!\1!\2!', $cardData);
        $cardData = explode("|", $cardData);

        // Grab $maxCount cards from the set
        $maxCount = 80;
        $i = 1;

        foreach ($cardData as $card) {
//            preg_match("/(.*[a-z])([A-Z123456789]{3})(\d*.\d{2})/", $card, $cardParsed);
            $cardParsed = explode("!", $card);
            $allCardsArray[] = [
                "name" => $cardParsed[0],
                "set" => $cardParsed[1],
                "price" => $cardParsed[2]
            ];

            $i += 1;
            if ($i > $maxCount) {
                $i = 1;
                break;
            }
        }

        // fair use delay
        sleep(4);
    }

    $now = getdate();
    $fullPath = "$basePath/{$now["year"]}/{$now['month']}";
    mkdir($fullPath, 0777, true);
    file_put_contents("$fullPath/{$now['mday']}.json", json_encode(array_values($allCardsArray)), FILE_APPEND);

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