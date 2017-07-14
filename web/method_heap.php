<?php

function parseCodesFromMTGGoldfishLinks()
{
    $setData = file_get_contents("data/set_data.json");

    $setDataArray = json_decode($setData);

    foreach ($setDataArray as $set) {
        if ($set->code == '') {
            $newCode = str_replace("/index/", "", $set->link);

            if (strlen($newCode) == 2) {
                $newCode .= "X";
            }

            $set->code = $newCode;
        }
    }

    file_put_contents("data/set_data_complete.json", json_encode(array_values($setDataArray)));
}