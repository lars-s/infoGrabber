var bulkThreshold = 0;

function makeFlagsGoldfishLinks(nameCol, foilCol, linkCol) {
    var linkGoldfish = "https://www.mtggoldfish.com/price/";
    $(".MKMTable").addClass("injected");

    $(".MKMTable tbody tr").each(function () {
        var name = $(this).find("td:nth-child(" + nameCol + ")").find("a").attr("href");
        name = name.replace("/en/Magic/Products/Singles/", "").replace("Æ", "Ae");

        var edition, cardname;

        edition = name.split("/")[0];
        cardname = $(this).find("td:nth-child(" + nameCol + ")").find("a").text();

        edition = edition.replace("%27", "");
        edition = edition.replace("%2C", "");
        edition = edition.replace(".", "");
        edition = edition.replace("%3A", "");
        edition = edition.replace("%3A", "");
        edition = edition.replace("%26", "and");
        edition = edition.replace("Sixth-Edition", "Classic-Sixth-Edition");
        edition = edition.replace("Revised", "Revised-Edition");
        edition = edition.replace("Prerelease-Promos", "Prerelease-Cards");
        edition = edition.replace("Arena-League-Promos", "Arena+Promos");
        edition = edition.replace("Release-Promos", "Release-Event-Cards");
        edition = edition.replace("Buy-a-Box-Promos", "Media-Promos");
        edition = edition.replace("the-Dark", "The-Dark");
        edition = edition.replace("theros", "Theros");
        edition = edition.replace("Player-Rewards-Promos", "Magic-Player-Rewards");
        edition = edition.replace("Core-2019", "Core-Set-2019");

        // check for Timeshifted cards
        var rarity = $(this).find("td:nth-child(" + parseInt(linkCol - 1) + ")").find("span").attr("onmouseover");
        if (rarity.indexOf("Time Shifted") > -1) {
            edition = "Timeshifted"
        }

        if (edition.lastIndexOf("Magic-2015") > -1) {
            edition += "-Core-Set";
        }
        
        if (edition.lastIndexOf("Commander-Anthology-II") > -1) {
            edition = "Commander-Anthology-Volume-II";
        }

        if (edition.lastIndexOf("Magic-2014") > -1) {
            edition += "-Core-Set";
        }

        if (edition.lastIndexOf("Commander-2013") > -1) {
            edition += "-Edition";
        }

        if (edition.lastIndexOf("Modern-Masters-2017") > -1) {
            edition += "-Edition";
        }

        if (edition.lastIndexOf("Planechase-2012") > -1) {
            edition += "-Edition";
        }

        edition = edition.replace(/-/g, "+");
        
        cardname = cardname.replace("%2C", "");
        cardname = cardname.replace("%27", "");
        cardname = cardname.replace("'", "");
        cardname = cardname.replace(",", "");
        cardname = cardname.replace("+%28Version+1%29", "-A");
        cardname = cardname.replace("+%28Version+2%29", "-B");
        cardname = cardname.replace("+%28Version+3%29", "-C");
        cardname = cardname.replace("%2F%2F+", "");
        cardname = cardname.replace("Æ", "Ae");

        if (cardname.lastIndexOf("%2F") > -1) {
            cardname = cardname.split("+%2F+")[0];
        }
        
        // Replace + with - due to new link generation style of MKM and remove duplicate minuses
        cardname = cardname.replace(/\s/g, "+");
        cardname = cardname.replace(/\+\+/g, "+"); 

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
                    + "\t" + finalPrice + "\r\n";
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

var setData = [{id="2345", edition="3rd Edition"},
{id="2350", edition="4th Edition"},
{id="2355", edition="5th Edition"},
{id="2360", edition="6th Edition"},
{id="2365", edition="7th Edition"},
{id="2370", edition="8th Edition"},
{id="2375", edition="9th Edition"},
{id="2380", edition="10th Edition"},
{id="2789", edition="2010 Core Set"},
{id="2847", edition="2011 Core Set"},
{id="2863", edition="2012 Core Set"},
{id="2876", edition="2013 Core Set"},
{id="2895", edition="2014 Core Set"},
{id="2910", edition="2015 Core Set"},
{id="3030", edition="Aether Revolt"},
{id="2385", edition="Alara Reborn"},
{id="2390", edition="Alliances"},
{id="2395", edition="Alpha"},
{id="3042", edition="Amonkhet"},
{id="2400", edition="Anthologies"},
{id="2405", edition="Antiquities"},
{id="2410", edition="Apocalypse"},
{id="2415", edition="Arabian Nights"},
{id="2846", edition="Archenemy"},
{id="3048", edition="Archenemy - Nicol Bo"},
{id="2874", edition="Avacyn Restored"},
{id="2953", edition="Battle for Zendikar"},
{id="2420", edition="Battle Royale"},
{id="3088", edition="Battlebond"},
{id="2425", edition="Beatdown"},
{id="2430", edition="Beta"},
{id="2435", edition="Betrayers of Kamigaw"},
{id="2903", edition="Born of the Gods"},
{id="2987", edition="Card Kingdom Tokens"},
{id="3085", edition="Challenger Decks"},
{id="2440", edition="Champions of Kamigaw"},
{id="2445", edition="Chronicles"},
{id="2450", edition="Coldsnap"},
{id="3099", edition="Coldsnap Theme Decks"},
{id="2455", edition="Collectors Ed"},
{id="2460", edition="Collectors Ed Intl"},
{id="2862", edition="Commander"},
{id="2902", edition="Commander 2013"},
{id="2916", edition="Commander 2014"},
{id="2958", edition="Commander 2015"},
{id="2949", edition="Commander 2016"},
{id="3055", edition="Commander 2017"},
{id="3100", edition="Commander 2018"},
{id="3047", edition="Commander Anthology"},
{id="3089", edition="Commander Anthology "},
{id="2888", edition="Commander's Arsenal"},
{id="2783", edition="Conflux"},
{id="2908", edition="Conspiracy"},
{id="2977", edition="Conspiracy - Take th"},
{id="3097", edition="Core Set 2019"},
{id="2870", edition="Dark Ascension"},
{id="2465", edition="Darksteel"},
{id="2844", edition="Deck Builder's Toolk"},
{id="2470", edition="Deckmaster"},
{id="2475", edition="Dissension"},
{id="3086", edition="Dominaria"},
{id="2892", edition="Dragon's Maze"},
{id="2938", edition="Dragons of Tarkir"},
{id="2865", edition="DD: Ajani / Nicol Bo"},
{id="2918", edition="DD: Anthology"},
{id="2969", edition="DD: Blessed / Cursed"},
{id="2480", edition="DD: Divine / Demonic"},
{id="2936", edition="DD: Elspeth / Kiora"},
{id="2851", edition="DD: Elspeth / Tezzer"},
{id="2485", edition="DD: Elves / Goblins"},
{id="3084", edition="DD: Elves / Inventor"},
{id="2838", edition="DD: Garruk / Liliana"},
{id="2896", edition="DD: Heroes / Monster"},
{id="2878", edition="DD: Izzet / Golgari"},
{id="2490", edition="DD: Jace / Chandra"},
{id="2904", edition="DD: Jace / Vraska"},
{id="2860", edition="DD: Knights / Dragon"},
{id="3062", edition="DD: Merfolk / Goblin"},
{id="3041", edition="DD: Mind / Might"},
{id="2980", edition="DD: Nissa / Ob Nixil"},
{id="2841", edition="DD: Phyrexia / The C"},
{id="2891", edition="DD: Sorin / Tibalt"},
{id="2911", edition="DD: Speed / Cunning"},
{id="2873", edition="DD: Venser / Koth"},
{id="2951", edition="DD: Zendikar / Eldra"},
{id="2845", edition="Duels of the Planesw"},
{id="2976", edition="Eldritch Moon"},
{id="2973", edition="Eternal Masters"},
{id="2495", edition="Eventide"},
{id="2500", edition="Exodus"},
{id="3064", edition="Explorers of Ixalan"},
{id="2505", edition="Fallen Empires"},
{id="2923", edition="Fate Reforged"},
{id="2510", edition="Fifth Dawn"},
{id="2952", edition="FTV: Angels"},
{id="2913", edition="FTV: Annihilation"},
{id="2515", edition="FTV: Dragons"},
{id="2815", edition="FTV: Exiled"},
{id="2868", edition="FTV: Legends"},
{id="2979", edition="FTV: Lore"},
{id="2883", edition="FTV: Realms"},
{id="2850", edition="FTV: Relics"},
{id="3065", edition="FTV: Transform"},
{id="2899", edition="FTV: Twenty"},
{id="2520", edition="Future Sight"},
{id="3104", edition="Game Night"},
{id="2890", edition="Gatecrash"},
{id="3063", edition="Gift Pack 2017"},
{id="3093", edition="Global Series: Jiang"},
{id="2525", edition="Guildpact"},
{id="3102", edition="Guilds of Ravnica"},
{id="3103", edition="Guilds of Ravnica Gu"},
{id="2530", edition="Homelands"},
{id="3051", edition="Hour of Devastation"},
{id="2535", edition="Ice Age"},
{id="3059", edition="Iconic Masters"},
{id="2866", edition="Innistrad"},
{id="2540", edition="Invasion"},
{id="3058", edition="Ixalan"},
{id="2905", edition="Journey into Nyx"},
{id="2545", edition="Judgment"},
{id="2983" selected="selected", edition="Kaladesh"},
{id="2914", edition="Khans of Tarkir"},
{id="2550", edition="Legends"},
{id="2555", edition="Legions"},
{id="2560", edition="Lorwyn"},
{id="2950", edition="Magic Origins"},
{id="2960", edition="MPS: Expeditions"},
{id="2984", edition="MPS: Inventions"},
{id="3044", edition="MPS: Invocations"},
{id="3078", edition="Masters 25"},
{id="2565", edition="Mercadian Masques"},
{id="2570", edition="Mirage"},
{id="2575", edition="Mirrodin"},
{id="2859", edition="Mirrodin Besieged"},
{id="2907", edition="Modern Event Deck"},
{id="2894", edition="Modern Masters"},
{id="2947", edition="Modern Masters 2015"},
{id="3032", edition="Modern Masters 2017"},
{id="2580", edition="Morningtide"},
{id="3105", edition="Mythic Edition"},
{id="2590", edition="Nemesis"},
{id="2861", edition="New Phyrexia"},
{id="2967", edition="Oath of the Gatewatc"},
{id="2595", edition="Odyssey"},
{id="2600", edition="Onslaught"},
{id="2605", edition="Planar Chaos"},
{id="2839", edition="Planechase"},
{id="2875", edition="Planechase 2012"},
{id="2989", edition="Planechase Anthology"},
{id="2610", edition="Planeshift"},
{id="2615", edition="Portal"},
{id="2620", edition="Portal 3K"},
{id="2625", edition="Portal II"},
{id="2854", edition="PDS: Fire &amp; Lightnin"},
{id="2867", edition="PDS: Graveborn"},
{id="2837", edition="PDS: Slivers"},
{id="2630", edition="Promotional"},
{id="2635", edition="Prophecy"},
{id="2640", edition="Ravnica"},
{id="2884", edition="Return to Ravnica"},
{id="2843", edition="Rise of the Eldrazi"},
{id="3076", edition="Rivals of Ixalan"},
{id="2645", edition="Saviors of Kamigawa"},
{id="2852", edition="Scars of Mirrodin"},
{id="2650", edition="Scourge"},
{id="2655", edition="Shadowmoor"},
{id="2971", edition="Shadows Over Innistr"},
{id="2660", edition="Shards of Alara"},
{id="3091", edition="Signature Spellbook:"},
{id="2670", edition="Starter 1999"},
{id="2675", edition="Starter 2000"},
{id="2680", edition="Stronghold"},
{id="2685", edition="Tempest"},
{id="2690", edition="The Dark"},
{id="2900", edition="Theros"},
{id="2695", edition="Time Spiral"},
{id="2700", edition="Timeshifted"},
{id="2705", edition="Torment"},
{id="2710", edition="Unglued"},
{id="2715", edition="Unhinged"},
{id="2720", edition="Unlimited"},
{id="3075", edition="Unstable"},
{id="2725", edition="Urza's Destiny"},
{id="2730", edition="Urza's Legacy"},
{id="2735", edition="Urza's Saga"},
{id="2740", edition="Vanguard"},
{id="2745", edition="Visions"},
{id="2750", edition="Weatherlight"},
{id="2975", edition="World Championships"},
{id="2840", edition="Worldwake"},
{id="2826", edition="Zendikar"}]
