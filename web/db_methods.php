<?php
function writeMKMJSONToDB($servername, $username, $password, $dbname, $jsonFileSrc)
{
    // Create connection
    $conn = new mysqli($servername, $username, $password, $dbname);
    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    preg_match('/(\d{4})\/([A-Z][a-z]*)\/(\d+)/', $jsonFileSrc, $date);

    $dateString = "{$date[3]} {$date[2]} {$date[1]}";
    $date = date('Y-m-d', strtotime(str_replace('-', '/', $dateString)));

    $file = file_get_contents($jsonFileSrc);
    $cardsArray = json_decode($file);

    $query = "INSERT INTO cards (cardname, code, price_avg_mkm, parseDate) VALUES ";
    foreach ($cardsArray as $card) {
        $cleanName = str_replace("'", "\\'", $card->name);
        $query .= "('{$cleanName}', '{$card->set}', '{$card->price}', '{$date}'),\r\n";
    }

    // Replace last comma with a semicolon
    $query = substr($query, 0, -3) . ";";

    if ($conn->query($query) === TRUE) {

    } else {
        echo "Error: <br>" . $conn->error;
    }

    $conn->close();
}

function updateGoldfishJSONToDB($servername, $username, $password, $dbname, $jsonFileSrc)
{
    // Create connection
    $conn = new mysqli($servername, $username, $password, $dbname);
    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    preg_match('/(\d{4})\/([A-Z][a-z]*)\/(\d+)/', $jsonFileSrc, $date);

    $dateString = "{$date[3]} {$date[2]} {$date[1]}";
    $date = date('Y-m-d', strtotime(str_replace('-', '/', $dateString)));

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
            "WHERE cardname='{$cleanName}' AND code='{$card->set}' AND parseDate='{$date}';";
        if ($conn->query($query) === TRUE) {

        } else {
            echo "Error: <br>" . $conn->error;
        }
    }

    $conn->close();
}