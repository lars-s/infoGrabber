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

function getLongnameFromCode($code)
{
    $setData = file_get_contents("data/set_data_complete.json");

    $setDataArray = json_decode($setData);

    foreach ($setDataArray as $set) {
        if ($set->code == $code) {
            return $set->edition;
        }
    }

    return "ERROR; set name not found for $code";
}

/**
 * @param $card array with code, cardname
 * @return price array with table name and value (e.g. ["buylist_ck" => "2.54", ..])
 */
function getDetailedPrices($card)
{
    $prices = [];

    // mkm
    $link = "https://www.magiccardmarket.eu/Products/Singles/";

    // add set to link
    $setName = getLongnameFromCode($card["code"]);
    $setName = str_replace([" ", ":", "'"], ["+", "%3A", "%27"], $setName);
    $find = ["--set--"];
    $replace = [$setName];
    $link .= str_replace($find, $replace, $setName) . "/";

    // add card to link
    $link .= str_replace([" ", ":", "'", ","], ["+", "%3A", "%27", "%2C"], $card["cardname"]);

    // init curl for mkm
    $agent = 'Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1; .NET CLR 1.0.3705; .NET CLR 1.1.4322)';
    $handle = curl_init($link);
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

    $data = $doc->getElementById("prodAccordion");

    preg_match('/(Price Trend:)(\d*,\d{2})/', $data->nodeValue, $match);
    $priceTrend = str_replace(",", ".", $match[2]);

    $prices["price_trend_mkm"] = $priceTrend;

    // get buylists from goldfish
    $link = "https://www.mtggoldfish.com/price/";

    // add set to link
    $setName = getLongnameFromCode($card["code"]);;
    $setName = str_replace([" ", ":", "'"], ["+", "", ""], $setName);
    $link .= $setName . "/";

    // add card to link
    $link .= str_replace([" ", ":", "'", ","], ["+", "%3A", "%27", "%2C"], $card["cardname"]);

    // init curl for goldfish
    $agent = 'Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1; .NET CLR 1.0.3705; .NET CLR 1.1.4322)';
    $handle = curl_init($link);
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

    $data = preg_replace("/\r|\n/", "", $doc->saveHTML());


    if (preg_match('/(price-card-buy-prices)(.{1,5000})(abu.games)(.{1,500})(btn-shop-price)(.+?)(\d+.\d{2})/', $data, $match)) {
        $prices["buylist_abu"] = $match[7];
    }

    if (preg_match('/(price-card-buy-prices)(.{1,5000})(cardkingdom)(.{1,500})(btn-shop-price)(.+?)(\d+.\d{2})/', $data, $match)) {
        $prices["buylist_ck"] = $match[7];
    }

    if (preg_match('/(price-card-buy-prices)(.{1,5000})(channelfireball)(.{1,500})(btn-shop-price)(.+?)(\d+.\d{2})/', $data, $match)) {
        $prices["buylist_cfb"] = $match[7];
    }

    return $prices;
}