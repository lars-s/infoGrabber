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

function getCodeFromLongname($longname)
{
    $setData = file_get_contents("data/set_data_complete.json");

    $setDataArray = json_decode($setData);

    foreach ($setDataArray as $set) {
        if ($set->edition == $longname) {
            return $set->code;
        }
    }

    return "ERROR; set name not found for {$set->code}";
}

/**
 * @param $card array with code, cardname
 * @return array with table name and value (e.g. ["buylist_ck" => "2.54", ..])
 */
function getDetailedPrices($card)
{
    $prices = [];

    /*
     * Get price trend from MKM
     */
    $link = "https://www.magiccardmarket.eu/Products/Singles/";

    // add set to link
    $setName = getLongnameFromCode($card["code"]);
    $setName = str_replace([" ", ":", "'"], ["+", "%3A", "%27"], $setName);

    $find = ["--set--", "Revised+Edition"];
    $replace = [$setName, "Revised"];
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

    /*
        Get buylists from goldfish
    */
    $link = "https://www.mtggoldfish.com/price/";

    // add set to link
    $setName = getLongnameFromCode($card["code"]);;
    $find = [" ", ":", "'", "Commander+2013"];
    $replace = ["+", "", "", "Commander+2013+Edition"];
    $setName = str_replace($find, $replace, $setName);
    $link .= $setName . "/";

    // add card to link
    $link .= str_replace([" ", ":", "'", ","], ["+", "", "", ""], $card["cardname"]);

    // init curl for goldfish
    $agent = 'Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1; .NET CLR 1.0.3705; .NET CLR 1.1.4322)';
    $handle = curl_init($link);
    curl_setopt($handle, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($handle, CURLOPT_USERAGENT, $agent);

    $response = curl_exec($handle);
    if ($response === false) {
        $response = curl_error($handle);
        echo stripslashes($response);
        return [];
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

/**
 * @param $conn db connection
 * Create a todo.json file. Fill it with 1000 interesting buylist targets
 */
function createToDoList($conn)
{
    $fodder = getFodderList($conn);

    $cardArray = [];
    foreach ($fodder as $card) {
        $cardArray[] = [
            "name" => $card["cardname"],
            "set" => $card["code"],
            "foil" => $card["foil"]
        ];
    }

    $jsonFile = json_encode($cardArray);
    file_put_contents("todo.json", $jsonFile);
}

function popTodoList($conn)
{
    $jsonFile = file_get_contents("todo.json");
    $cardArray = json_decode($jsonFile);

    $card = [
        "cardname" => $cardArray[0]->name,
        "code" => $cardArray[0]->set,
        "foil" => $cardArray[0]->foil
    ];

    $cardPrices = getDetailedPrices($card);

    if (array_count_values($cardPrices) > 0) {
        $query = "UPDATE cards SET";
        $cleanName = str_replace("'", "\\'", $card['cardname']);

        $i = 1;
        foreach ($cardPrices as $colName => $value) {
            if ($i > 1) {
                $query .= ", ";
            }
            $query .= " $colName = '{$value}'";
            $i++;
        }

        $query .= " WHERE cardname='{$cleanName}' AND code='{$card['code']}';\r\n";

        if ($conn->query($query) === TRUE) {
            echo "{$card['cardname']} from {$card['code']} updated. Query: {$query}\r\n";

        } else {
            echo "Error {$card['cardname']} aus {$card['code']} <br>" . $conn->error;
        }
    }

    unset($cardArray[0]);
    $jsonFile = json_encode(array_values($cardArray));
    file_put_contents("todo.json", $jsonFile);
}

function grabABUPrices($conn)
{
    $file = file_get_contents("data/abulinks.json");
    $linksArray = json_decode($file);

    // only check sets where we have a set code, it's worthless otherwise because we can't use it to update the data
    $verified = [];
    foreach ($linksArray as $set) {
        $setCode = getCodeFromLongname($set->edition);

        if (strlen($setCode) == 3) {
            $verified[] = [
                "link" => $set->link_abu,
                "setCode" => $setCode
            ];
        }
    }

    foreach ($verified as $check) {
        $url = $check["link"];
        $setCode = $check["setCode"];

        $agent = 'Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1; .NET CLR 1.0.3705; .NET CLR 1.1.4322)';
        $handle = curl_init($url);
        curl_setopt($handle, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($handle, CURLOPT_USERAGENT, $agent);
        // TODO: Modify cookie to accept 400 results

        $response = curl_exec($handle);

        $pattern = "/(<tr><td class=\"small\">)(.*?)(<\/tr>)/";

        preg_match_all($pattern, $response, $cards_raw);

        // Read card information
        $resultsABUBuylist = [];
        foreach ($cards_raw[0] as $c) {
            $patternCardName = "/(\"cardlink\">)(.*?)(<\/a>)/";
            $patternCardValueDollar = "/(\d{1,3}\.\d{2})/";

            // GET THE CARD NAME
            preg_match($patternCardName, $c, $cardNameRaw);
            $cardName = trim($cardNameRaw[2]);

            // GET THE BUYLIST VALUE
            if (preg_match($patternCardValueDollar, $c)) {
                preg_match($patternCardValueDollar, $c, $dollarsRaw);
                $value = $dollarsRaw[1];
            } else {
                continue;
            }

            $resultsABUBuylist[] = [
                "name" => $cardName,
                "set" => $setCode,
                "buylist_abu" => $value,
                "foil" => 0
            ];
        }

        // Write to DB
        foreach ($resultsABUBuylist as $card) {
            updateCard($card, $conn);
        }

        echo "$setCode is done\r\n";
    }
}

function grabCKPrices($offset, $page, $conn)
{
    $url = "http://www.cardkingdom.com/purchasing/mtg_singles?filter%5Bipp%5D=$offset&filter%5Bsort%5D=price_desc&filter%5Bsearch%5D=mtg_advanced&filter%5Bname%5D=&filter%5Bcategory_id%5D=0&filter%5Bnonfoil%5D=1&filter%5Brarity%5D%5B0%5D=M&filter%5Brarity%5D%5B1%5D=R&filter%5Brarity%5D%5B2%5D=U&filter%5Brarity%5D%5B3%5D=C&filter%5Bprice_op%5D=>%3D&filter%5Bprice%5D=0.4&page=$page";

    $agent = 'Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1; .NET CLR 1.0.3705; .NET CLR 1.1.4322)';
    $handle = curl_init($url);
    curl_setopt($handle, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($handle, CURLOPT_USERAGENT, $agent);

    $response = curl_exec($handle);
    $response = str_replace("\r", "", $response);
    $response = str_replace("\n", "", $response);

    $pattern = "/(i class=\"itemRow).+?(<\/li>\s+?<l)/";

    preg_match_all($pattern, $response, $cards_raw);

    $resultsCKBuylist = [];
    foreach ($cards_raw[0] as $c) {
        $patternSetName = "/(<div class=\"productDetailSet\">)(.+?)\(/";
        $patternCardName = "/(<span class=\"productDetailTitle\">)(.+?)(<\/span>)/";
        $patternCardValueDollar = "/(<span class=\"sellDollarAmount\">)(.+?)(<\/span>)/";
        $patternCardValueCent = "/(<span class=\"sellCentsAmount\">)(.+?)(<\/span>)/";

        // GET THE SET NAME
        preg_match($patternSetName, $c, $setNameRaw);
        //  TRIM THE SET NAME
        $setName = trim($setNameRaw[2]);
        $setCode = getCodeFromLongname($setName);

        // Transform to set code, cancel operation if ERROR
        if (strlen($setCode) > 3) {
            echo $setName . "\r\n";
            continue;
        }

        // GET THE CARD NAME
        preg_match($patternCardName, $c, $cardNameRaw);
        $cardName = trim($cardNameRaw[2]);

        // GET THE BUYLIST VALUE
        if (preg_match($patternCardValueDollar, $c)) {
            preg_match($patternCardValueDollar, $c, $dollarsRaw);
            preg_match($patternCardValueCent, $c, $centsRaw);
            $value = "{$dollarsRaw[2]}.{$centsRaw[2]}";
        } else {
            continue;
        }

        $resultsCKBuylist[] = [
            "name" => $cardName,
            "set" => $setCode,
            "buylist_ck" => $value,
            "foil" => 0
        ];
    }

    foreach ($resultsCKBuylist as $finishedCard) {
        updateCard($finishedCard, $conn);
    }
}

function getCKPurchasePrices($conn)
{
    // until page 33 to get all cards up to about 20$
    for ($i = 1; $i < 33; $i++) {
        $url = "http://www.cardkingdom.com/catalog/view?filter%5Bipp%5D=60&filter%5Bsort%5D=" .
            "price_asc&filter%5Bsearch%5D=mtg_advanced&filter%5Bcategory_id%5D=0&filter%5Bmulti%5D%5B0%5D=1" .
            "&filter%5Brarity%5D%5B0%5D=M&filter%5Brarity%5D%5B1%5D=R&filter%5Btype_mode%5D=any&filter%" .
            "5Bprice_op%5D=%3E%3D&filter%5Bprice%5D=2.99&filter%5Bmanaprod_select%5D=any&page=$i";

        $agent = 'Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1; .NET CLR 1.0.3705; .NET CLR 1.1.4322)';
        $handle = curl_init($url);
        curl_setopt($handle, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($handle, CURLOPT_USERAGENT, $agent);

        $response = curl_exec($handle);
        $response = str_replace("\r", "", $response);
        $response = str_replace("\n", "", $response);

        // Pattern to grab all cards
        $pattern = "/(<div class=\"productItemWrapper)(.+?)(<\/script>                    <\/div>                              <\/div>)/";

        preg_match_all($pattern, $response, $cards_raw);

        $resultsCKPrices = [];
        foreach ($cards_raw[0] as $card) {
            $patternSetName = "/(productDetailSet\">)(.+?)(\()/";
            $patternCardName = "/(productDetailTitle\"><a href.+?>)(.+?)(<\/a>)/";
            $patternCardValueDollar = "/(stylePrice\">)(.+?)(<\/span>)/";

            // GET THE SET NAME
            preg_match($patternSetName, $card, $setNameRaw);
            //  TRIM THE SET NAME
            $setName = trim($setNameRaw[2]);
            $setCode = getCodeFromLongname($setName);

            // Transform to set code, cancel operation if ERROR
            if (strlen($setCode) > 3) {
                echo $setName . "\r\n";
                continue;
            }

            // GET THE CARD NAME
            preg_match($patternCardName, $card, $cardNameRaw);
            $cardName = trim($cardNameRaw[2]);

            // GET THE PURCHAES PRICE
            if (preg_match($patternCardValueDollar, $card)) {
                preg_match($patternCardValueDollar, $card, $value);
                $value = str_replace("$", "", $value);
            } else {
                continue;
            }

            $resultsCKPrices[] = [
                "name" => $cardName,
                "set" => $setCode,
                "sell_ck" => $value[2],
                "foil" => 0
            ];
        }

        foreach ($resultsCKPrices as $finishedCard) {
            updateCard($finishedCard, $conn);
        }

        // fair use
        sleep(5);
    }
}

function getEDNMI()
{
    $data = [
        "productFilter%5BsellerStatus0%5D" => "on",
        "productFilter%5BsellerStatus1%5D" => "on",
        "productFilter%5BsellerStatus2%5D" => "on",
        "productFilter[sellerRatings][]" => 1,
        "productFilter[sellerRatings][]" => 2,
        "productFilter[idLanguage][]" => 1,
        "productFilter[condition][]" => "MT",
        "productFilter[condition][]" => "NM",
        "productFilter%5BisFoil%5D" => 0,
        "productFilter%5BisSigned%5D" => 0,
        "productFilter%5BisAltered%5D" => 0,
        "productFilter%5BminAmount%5D" => 1
    ];

    $url = "https://www.magickartenmarkt.de/Products/Singles/Champions+of+Kamigawa/Untaidake%2C+the+Cloud+Keeper";
    $agent = 'Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1; .NET CLR 1.0.3705; .NET CLR 1.1.4322)';
    $handle = curl_init($url);
    curl_setopt($handle, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($handle, CURLOPT_USERAGENT, $agent);

    curl_setopt($handle, CURLOPT_POST, true);
    curl_setopt($handle, CURLOPT_POSTFIELDS, $data);

    $response = curl_exec($handle);

    print($response);
    curl_getinfo($handle, CURLINFO_EFFECTIVE_URL );

    curl_close($handle);
}

function getMKMPrice()
{
    $host = 'http://localhost:4444/wd/hub';
    $userID = "14344";
    $url = "https://www.magickartenmarkt.de/?mainPage=browseUserProducts&idCategory=1&idUser=$userID&" .
        "resultsPage=0&idLanguage=1&condition_uneq=%3C%3D&condition=EX&isFoil=N&isSigned=N&isPlayset=0&isAltered=N";


    $driver = RemoteWebDriver::create($host, DesiredCapabilities::chrome());

//    $driver->get("www.google.de");
//
//    // adding cookie
//    $driver->manage()->deleteAllCookies();
//    $cookie = new Cookie('cookie_name', 'cookie_value');
//    $driver->manage()->addCookie($cookie);
//    $cookies = $driver->manage()->getCookies();
//    print_r($cookies);
}