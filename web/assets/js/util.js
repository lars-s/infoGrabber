var bulkThreshold = 0.03;


function makeFlagsGoldfishLinks(nameCol, foilCol, linkCol) {
	var linkGoldfish = "https://www.mtggoldfish.com/price/";
	$(".MKMTable").addClass("injected");

	$(".MKMTable tbody tr").each(function() {
	    var name = $(this).find("td:nth-child(" + nameCol + ")").find("a").attr("href");
	    name = name.replace("/Products/Singles/","").replace("The", "the");

	    var edition, cardname;

	    edition = name.split("/")[0];
	    cardname = name.split("/")[1];

		edition = edition.replace("%27","");
		edition = edition.replace("%2C","");
		edition = edition.replace(".","");
		edition = edition.replace("%3A","");
		edition = edition.replace("%3A","");
		edition = edition.replace("%26","and");
		edition = edition.replace("Sixth+Edition","Classic+Sixth+Edition");
		edition = edition.replace("Revised","Revised+Edition");
		edition = edition.replace("Prerelease+Promos","Prerelease+Cards");
		edition = edition.replace("Arena+League+Promos","Arena+Promos");
		edition = edition.replace("Release+Promos","Release+Event+Cards");
		edition = edition.replace("Buy+a+Box+Promos","Media+Promos");
		edition = edition.replace("the+Dark","The+Dark");
		edition = edition.replace("theros","Theros");
    edition = edition.replace("Player+Rewards+Promos","Magic+Player+Rewards");

		if (edition.lastIndexOf("Magic+2015") > -1 ) {
			edition += "+Core+Set";
		}

		if (edition.lastIndexOf("Magic+2014") > -1 ) {
			edition += "+Core+Set";
		}


		if (edition.lastIndexOf("Modern+Masters+20") > -1 ) {
			edition += "+Edition";
		}

		cardname = cardname.replace("%2C","");
		cardname = cardname.replace("%27","");
		cardname = cardname.replace("+%28Version+1%29","-A");
		cardname = cardname.replace("+%28Version+2%29","-B");
		cardname = cardname.replace("+%28Version+3%29","-C");
		cardname = cardname.replace("%2F%2F+","");

		if (cardname.lastIndexOf("%2F") > -1 ) {
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
	        .attr("href", linkGoldfish+name);
	});
}

function parseCartData(orderData) {
	var parseData = '';
	var shippingCost = $(".MKMShipmentSummary > tbody tr:nth-child(7)").find(".shipmentSummaryMoney").text();
	var numberOfCards = parseInt($(".MKMShipmentSummary > tbody tr:nth-child(4)").find("td:nth-child(2)").text());
	var bulkRareCost = 0, bulkFoilCost = 0, bulkRare = 0, bulkFoil = 0;
	var sumCost = $(".MKMShipmentSummary > tbody tr:nth-child(6)").find(".shipmentSummaryMoney").text();

	shippingCost = parseFloat(shippingCost.replace(",","."));
	sumCost = parseFloat(sumCost.replace(",","."));

	$(orderData).find(".MKMTable tbody tr").each(function() {
	    var name = $(this).find("td:nth-child(4)").find("a").text();
	    var link = $(this).find("td:nth-child(8)").find("a").attr("href");
	    var price, amount;
		var condition = 1;

	    var foil = $(this).find("td:nth-child(10)").find("span").prop("outerHTML");
	    if (	foil !== undefined &&
	    		foil.lastIndexOf("Foil") > 0 &&
	    		name.lastIndexOf("Promo") == -1) {
	    	foil = true;
	    	name += "*";
	    }

	    price = $(this).find(".Price div.nowrap").text();
	    price = parseFloat(price.replace(",", ".").replace(" €", ""));

	    amount = $(this).find(".Amount div.itemAmount").text();
	    amount = parseInt(amount.replace("x", ""));

	var finalPrice = price+((((price*amount)/sumCost)*shippingCost))/amount;
		
	    if (parseFloat(price) <= bulkThreshold) {
	    	if (foil) {
	    		bulkFoil += 1*amount;
	    		bulkFoilCost += finalPrice;
	    	} else {
	    		bulkRare += 1*amount;
	    		bulkRareCost += finalPrice;
	    	}
	    } else {
	    	parseData += amount + "\t" + '=HYPERLINK("' + link + '", "' + name +'")' + "\t" + condition 
	    					+ "\t" + finalPrice + "\r\n";
	    }
	});

	if (bulkFoil > 0) {
		parseData += bulkFoil + "\t" + "Bulk Foils" + "\t" + bulkFoilCost+ "\r\n";
	}

	if (bulkRare > 0) {
		parseData += bulkRare + "\t" + "Bulk Rares" + "\t" + bulkRareCost+ "\r\n";
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

	$(".price-card-sidebar .price-card-buy-prices a[class*='btn-paper']").each(function() {
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
