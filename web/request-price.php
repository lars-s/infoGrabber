<?php

$DEBUGGING = false;

@include "data/mtggoldfish/goldfish.php";
@include "data/magiccardmarket/magiccardmarket.php";
@include "db_methods.php";
@include "config.php";
//error_reporting(E_ERROR);

if ($DEBUGGING) {
    $src = "data/set_data_debugging.json";
} else {
    $src = "data/set_data_complete.json";
}

//grabLinks($src);
//grabLinksM($src);

//writeMKMJSONToDB($servername, $username, $password, $dbname, 'data/magiccardmarket/result/2017/July/17.json');
updateGoldfishJSONToDB($servername, $username, $password, $dbname, 'data/mtggoldfish/result/2017/July/16.json');