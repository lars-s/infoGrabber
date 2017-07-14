<?php

@include "data/mtggoldfish/goldfish.php";
@include "data/magiccardmarket/magiccardmarket.php";
@include "db_methods.php";
@include "config.php";
//error_reporting(E_ERROR);

//grabLinks("data/set_data.json");
//grabLinksM("data/set_data_complete.json");

//writeMKMJSONToDB($servername, $username, $password, $dbname, 'data/magiccardmarket/result/2017/July/14.json');
updateGoldfishJSONToDB($servername, $username, $password, $dbname, 'data/mtggoldfish/result/2017/July/14.json');