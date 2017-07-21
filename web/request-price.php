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


//grabLinks($src);
//grabLinksM($src);

//writeMKMJSONToDB($conn, 'data/magiccardmarket/result/2017/July/18.json');
//updateGoldfishJSONToDB($conn, 'data/mtggoldfish/result/2017/July/18.json');

//createToDoList($conn);
