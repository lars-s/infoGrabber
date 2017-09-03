<?php
function writeMKMJSONToDB($conn, $jsonFileSrc)
{
    preg_match('/(\d{4})\/([A-Z][a-z]*)\/(\d+)/', $jsonFileSrc, $date);

    $dateString = "{$date[3]} {$date[2]} {$date[1]}";
    $date = date('Y-m-d', strtotime(str_replace('-', '/', $dateString)));

    $file = file_get_contents($jsonFileSrc);
    $cardsArray = json_decode($file);

    $query = "REPLACE INTO cards (cardname, code, price_avg_mkm, parseDate, foil) VALUES ";
    foreach ($cardsArray as $card) {
        $cleanName = str_replace("'", "\\'", $card->name);
        $query .= "('{$cleanName}', '{$card->set}', '{$card->price}', '{$date}', '{$card->foil}'),\r\n";
    }

    // Replace last comma with a semicolon
    $query = substr($query, 0, -3) . ";";

    if ($conn->query($query) !== TRUE) {
        echo "Error: <br>" . $conn->error;
    }

    $conn->close();
}

function updateGoldfishJSONToDB($conn, $jsonFileSrc)
{
    preg_match('/(\d{4})\/([A-Z][a-z]*)\/(\d+)/', $jsonFileSrc, $date);

//    $dateString = "{$date[3]} {$date[2]} {$date[1]}";
//    $date = date('Y-m-d', strtotime(str_replace('-', '/', $dateString)));

    $file = file_get_contents($jsonFileSrc);
    $cardsArray = json_decode($file);

//    $query = "INSERT INTO cards (cardname, code, price_avg_mtggoldfish, parseDate) VALUES ";
//    foreach ($cardsArray as $card) {
//        $cleanName = str_replace("'", "\\'", $card->name);
//        $query .= "('{$cleanName}', '{$card->set}', '{$card->price}', '{$date}'),\r\n";
//

    foreach ($cardsArray as $card) {
        $cleanName = str_replace("'", "\\'", $card->name);
        $query = "UPDATE cards SET price_avg_mtggoldfish = '{$card->price}' " .
            "WHERE cardname='{$cleanName}' AND code='{$card->set}' AND foil='{$card->foil}'";
        if ($conn->query($query) !== TRUE) {
            echo "Error: <br>" . $conn->error;
        }
    }

    $conn->close();
}

/**
 * @param $conn database connection
 * @return mixed query result, db matches
 */
function getFodderList($conn)
{
//    $query = "SELECT cardname, code, price_avg_mkm, price_avg_mtggoldfish, (price_avg_mtggoldfish/2) / (price_avg_mkm*3) " .
//        " as margin FROM cards WHERE (price_avg_mkm BETWEEN 0.5 AND 5) AND price_avg_mtggoldfish AND " .
//        "(price_avg_mkm*3) < (price_avg_mtggoldfish/2) ORDER BY (price_avg_mtggoldfish/2) / (price_avg_mkm*3) DESC";
    $query = "SELECT cardname, foil, code, price_avg_mkm, price_avg_mtggoldfish, " .
        "(price_avg_mtggoldfish/2) / (price_avg_mkm*3) as margin FROM cards WHERE (price_avg_mkm BETWEEN 0.5 AND 50) " .
        "AND (price_avg_mtggoldfish BETWEEN 0.5 AND 50) AND (buylist_ck IS null) ORDER BY (price_avg_mtggoldfish/2) / (price_avg_mkm*3) DESC LIMIT 4000";
    $result = $conn->query($query);

    return $result;
}

/**
 * @param $conn database connection
 * @return mixed query result, db matches
 */
function getCashOutList($conn)
{
    $query = "SELECT cardname, code, price_avg_mkm, price_avg_mtggoldfish, (price_avg_mkm / price_avg_mtggoldfish) " .
        "as margin FROM cards WHERE (price_avg_mkm / price_avg_mtggoldfish >= 0.7) AND " .
        "(price_avg_mkm BETWEEN 4 AND 40) AND (price_avg_mtggoldfish BETWEEN 3 AND 55) " .
        "ORDER BY (price_avg_mkm / price_avg_mtggoldfish) DESC";
    $result = $conn->query($query);

    return $result;
}

function updateCard($card, $conn)
{
    // WRITE BUYLIST CARD KINGDOM
    if (isset($card["buylist_ck"])) {
        $cleanName = str_replace("'", "\\'", $card["name"]);
        $query = "UPDATE cards SET buylist_ck = '{$card["buylist_ck"]}' " .
            "WHERE cardname='$cleanName' AND code='{$card["set"]}' AND foil='{$card["foil"]}'";
        if ($conn->query($query) !== TRUE) {
            echo "Error: <br>" . $conn->error;
        }
    }

    // WRITE BUYLIST ABU
    if (isset($card["buylist_abu"])) {
        $cleanName = str_replace("'", "\\'", $card["name"]);
        $query = "UPDATE cards SET buylist_abu = '{$card["buylist_abu"]}' " .
            "WHERE cardname='$cleanName' AND code='{$card["set"]}' AND foil='{$card["foil"]}'";
        if ($conn->query($query) !== TRUE) {
            echo "Error: <br>" . $conn->error;
        }
    }
}