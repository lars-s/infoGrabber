var bulkThreshold = 0;

function makeFlagsQSLinks(nameCol, foilCol, linkCol, priceCol) {
    var linkGoldfish = "http://www.quietspeculation.com/tradertools/prices/sets/";
    $(".MKMTable").addClass("injected");

    $(".MKMTable tbody tr").each(function () {
        var name = $(this).find("td:nth-child(" + nameCol + ")").find("a").attr("href");
        name = name.replace("/en/Magic/Products/Singles/", "").replace("Æ", "Ae");

        var edition, cardname;

        edition = name.split("/")[0];
        cardname = name.split("/")[1];

        edition = edition.replace(/\+/g, " ");

        if (edition.lastIndexOf("Magic+2015") > -1) {
            edition += "+Core+Set";
        }

        if (edition.lastIndexOf("Magic+2014") > -1) {
            edition += "+Core+Set";
        }

        if (edition.lastIndexOf("Commander+2013") > -1) {
            edition += "+Edition";
        }

        if (edition.lastIndexOf("Modern+Masters+2017") > -1) {
            edition += "+Edition";
        }

        cardname = cardname.replace(/\+/g, " ");

        if (cardname.lastIndexOf("%2F") > -1) {
            cardname = cardname.split(" %2F ")[0];
        }

        name = edition + "/" + cardname;

        var link = linkGoldfish + name;

        var foil = $(this).find("td:nth-child(" + foilCol + ")").find("span").prop("outerHTML");
        if (foil !== undefined &&
            foil.lastIndexOf("Foil") > 0 &&
            edition.lastIndexOf("Promo") == -1 &&
            edition.lastIndexOf("Prerelease") == -1) {

            link += "/foil";
        }

        if (priceCol) {
            var priceMKM = $(this).find("td:nth-child(" + priceCol + ")").find("div.algn-r.nowrap").text();
            priceMKM = priceMKM.replace(" ", "");
            priceMKM = priceMKM.replace(",", ".");
            priceMKM = priceMKM.replace("€", "");
            link += "?" + priceMKM;
        }

        $(this).find("td:nth-child(" + linkCol + ")").find("a")
            .attr("href", link);
    });
}

function makeFlagsGoldfishLinks(nameCol, foilCol, linkCol) {
    var linkGoldfish = "https://www.mtggoldfish.com/price/";
    $(".MKMTable").addClass("injected");

    $(".MKMTable tbody tr").each(function () {
        var name = $(this).find("td:nth-child(" + nameCol + ")").find("a").attr("href");
        name = name.replace("/en/Magic/Products/Singles/", "");

        var edition, cardname;

        edition = name.split("/")[0];
        cardname = name.split("/")[1];

        edition = edition.replace("%27", "");
        edition = edition.replace("%2C", "");
        edition = edition.replace(".", "");
        edition = edition.replace("%3A", "");
        edition = edition.replace("%3A", "");
        edition = edition.replace("%26", "and");
        edition = edition.replace("Sixth+Edition", "Classic+Sixth+Edition");
        edition = edition.replace("Revised", "Revised+Edition");
        edition = edition.replace("Prerelease+Promos", "Prerelease+Cards");
        edition = edition.replace("Arena+League+Promos", "Arena+Promos");
        edition = edition.replace("Release+Promos", "Release+Event+Cards");
        edition = edition.replace("Buy+a+Box+Promos", "Media+Promos");
        edition = edition.replace("the+Dark", "The+Dark");
        edition = edition.replace("theros", "Theros");
        edition = edition.replace("Player+Rewards+Promos", "Magic+Player+Rewards");

        // check for Timeshifted cards
        var rarity = $(this).find("td:nth-child(" + parseInt(linkCol - 1) + ")").find("span").attr("onmouseover");
        if (rarity.indexOf("Time Shifted") > -1) {
            edition = "Timeshifted"
        }

        if (edition.lastIndexOf("Magic+2015") > -1) {
            edition += "+Core+Set";
        }

        if (edition.lastIndexOf("Magic+2014") > -1) {
            edition += "+Core+Set";
        }

        if (edition.lastIndexOf("Commander+2013") > -1) {
            edition += "+Edition";
        }

        if (edition.lastIndexOf("Modern+Masters+20") > -1) {
            edition += "+Edition";
        }

        if (edition.lastIndexOf("Planechase+2012") > -1) {
            edition += "+Edition";
        }

        cardname = cardname.replace("%2C", "");
        cardname = cardname.replace("%27", "");
        cardname = cardname.replace("+%28Version+1%29", "-A");
        cardname = cardname.replace("+%28Version+2%29", "-B");
        cardname = cardname.replace("+%28Version+3%29", "-C");
        cardname = cardname.replace("%2F%2F+", "");

        if (cardname.lastIndexOf("%2F") > -1) {
            cardname = cardname.split("+%2F+")[0];
        }

        var foil = $(this).find("td:nth-child(" + foilCol + ")").find("span").prop("outerHTML");
        if (foil !== undefined &&
            foil.lastIndexOf("Foil") > 0 &&
            edition.lastIndexOf("Promo") == -1 &&
            edition.lastIndexOf("Prerelease") == -1) {

            edition += ":Foil";
        }

        name = edition + "/" + cardname;

        $(this).find("td:nth-child(" + linkCol + ")").find("a")
            .attr("href", linkGoldfish + name);
    });
}

function parseCartData(orderData, makeLinks) {
    // workaround to have default parameter value 1
    makeLinks = (typeof makeLinks !== 'undefined') ? makeLinks : 1;
    var parseData = '';
    var shippingCost = $(".MKMShipmentSummary > tbody tr:nth-child(7)").find(".shipmentSummaryMoney").text();
    var numberOfCards = parseInt($(".MKMShipmentSummary > tbody tr:nth-child(4)").find("td:nth-child(2)").text());
    var bulkRareCost = 0, bulkFoilCost = 0, bulkRare = 0, bulkFoil = 0;
    var sumCost = $(".MKMShipmentSummary > tbody tr:nth-child(6)").find(".shipmentSummaryMoney").text();

    shippingCost = parseFloat(shippingCost.replace(",", "."));
    sumCost = parseFloat(sumCost.replace(",", "."));

    $(orderData).find(".MKMTable tbody tr").each(function () {
        var name = $(this).find("td:nth-child(4)").find("a").text();
        var link = $(this).find("td:nth-child(8)").find("a").attr("href");
        var price, amount;
        var condition = 1;

        var foil = $(this).find("td:nth-child(10)").find("span").prop("outerHTML");
        if (foil !== undefined &&
            foil.lastIndexOf("Foil") > 0 &&
            name.lastIndexOf("Promo") == -1) {
            foil = true;
            name += "*";
        }
        var conditionText = $(this).find("td:nth-child(9)").find(".icon").attr("onmouseover");

        if (conditionText !== undefined) {
            if (conditionText.indexOf("Near Mint") > -1) {
                condition = 1;
            } else if (conditionText.indexOf("Excellent") > -1) {
                condition = 0.8;
            } else if (conditionText.indexOf("Good") > -1) {
                condition = 0.6;
            }
        }
        price = $(this).find(".Price div.nowrap").text();
        price = parseFloat(price.replace(",", ".").replace(" €", ""));

        amount = $(this).find(".Amount div.itemAmount").text();
        amount = parseInt(amount.replace("x", ""));

        var finalPrice = price + ((((price * amount) / sumCost) * shippingCost)) / amount;

        if (parseFloat(price) <= bulkThreshold) {
            if (foil) {
                bulkFoil += 1 * amount;
                bulkFoilCost += finalPrice;
            } else {
                bulkRare += 1 * amount;
                bulkRareCost += finalPrice;
            }
        } else {
            if (makeLinks == 1) {
                parseData += amount + "\t" + '=HYPERLINK("' + link + '", "' + name + '")' + "\t" + condition
                    + "\t" + finalPrice * amount + "\r\n";
            } else {
                parseData += amount + "\t" + name + "\t" + "\t" + finalPrice * amount + "\r\n";
            }
        }
    });

    if (bulkFoil > 0) {
        parseData += bulkFoil + "\t" + "Bulk Foils" + "\t" + bulkFoilCost + "\r\n";
    }

    if (bulkRare > 0) {
        parseData += bulkRare + "\t" + "Bulk Rares" + "\t" + bulkRareCost + "\r\n";
    }

    copyTextToClipboard(parseData);
    return parseData;
}

function copyTextToClipboard(text) {
    var textArea = document.createElement("textarea");

    // Place in top-left corner of screen regardless of scroll position.
    textArea.style.position = 'fixed';
    textArea.style.top = 0;
    textArea.style.left = 0;

    // Ensure it has a small width and height. Setting to 1px / 1em
    // doesn't work as this gives a negative w/h on some browsers.
    textArea.style.width = '2em';
    textArea.style.height = '2em';

    // We don't need padding, reducing the size if it does flash render.
    textArea.style.padding = 0;

    // Clean up any borders.
    textArea.style.border = 'none';
    textArea.style.outline = 'none';
    textArea.style.boxShadow = 'none';

    // Avoid flash of white box if rendered for any reason.
    textArea.style.background = 'transparent';

    textArea.value = text;

    document.body.appendChild(textArea);

    textArea.select();

    try {
        var successful = document.execCommand('copy');
        var msg = successful ? 'successful' : 'unsuccessful';
        console.log('Copying text command was ' + msg);
    } catch (err) {
        console.log('Oops, unable to copy');
    }

    document.body.removeChild(textArea);
}

function getPrices() {
    var returnVal = [];

    $(".price-card-sidebar .price-card-buy-prices a[class*='btn-paper']").each(function () {
        var vendor;
        var price;

        vendor = $(this).find(".btn-shop-label").text();
        vendor = vendor.replace(" ", "").trim();

        price = $(this).find(".btn-shop-price").text();
        price = price.replace(/[^\d.-]/g, '');

        returnVal[vendor] = price;
    });

    return returnVal;
}

function getPricesQS() {
    var returnVal = [];
    returnVal["abu"] = 0;
    returnVal["ck"] = 0;
    returnVal["cfb"] = 0;

    $("table#thisEditionPrices tr").each(function () {
        // Check for ABU
        if ($(this).find("span.label-buylist").text().indexOf("abugames") > -1) {
            var abuPrice = $(this).find("td.sorting_1").text();
            returnVal["abu"] = abuPrice;
        }

        // Check for CK
        if ($(this).find("span.label-buylist").text().indexOf("cardkingdom") > -1) {
            var ckPrice = $(this).find("td.sorting_1").text();
            returnVal["ck"] = ckPrice;
        }

        // Check for CFB
        if ($(this).find("span.label-buylist").text().indexOf("channelfireball") > -1) {
            var cfbPrice = $(this).find("td.sorting_1").text();
            returnVal["cfb"] = cfbPrice;
        }
    });

    return returnVal;
}

