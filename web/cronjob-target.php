<?php

$DEBUGGING = false;

@include "data/mtggoldfish/goldfish.php";
@include "data/magiccardmarket/magiccardmarket.php";
@include "db_methods.php";
@include "method_heap.php";
@include "config.php";
//error_reporting(E_ERROR);

if ($DEBUGGING) {
    $src = "data/set_data_debugging.json";
} else {
    $src = "data/set_data_complete.json";
}

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

//$fodder = getFodderList($conn);
//
//$fodderCard = $fodder->fetch_row();
//
//$card = [
//    "cardname" => $fodderCard[0],
//    "code" => $fodderCard[1]
//];
//
//$cardPrices = getDetailedPrices($card);
//
//if (array_count_values($cardPrices) > 0) {
//    $query = "UPDATE cards SET";
//    $cleanName = str_replace("'", "\\'", $card['cardname']);
//
//    $i = 1;
//    foreach ($cardPrices as $colName => $value) {
//        if ($i > 1) {
//            $query .= ", ";
//        }
//        $query .= " $colName = '{$value}'";
//        $i++;
//    }
//
//    $query .= " WHERE cardname='{$cleanName}' AND code='{$card['code']}';\r\n";
//
//    if ($conn->query($query) === TRUE) {
//        echo "{$card['cardname']} from {$card['code']} updated. Query: {$query}\r\n";
//    } else {
//        echo "Error {$card['cardname']} aus {$card['code']} <br>" . $conn->error;
//    }
//}

popTodoList($conn);

