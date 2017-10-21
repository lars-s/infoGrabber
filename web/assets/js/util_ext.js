function appendPriceData(linkCol, priceCol, userId, condCol, autoMode = false) {
    var price, oldLink, conditionMod;

    $(".MKMTable").each(function() {
       $(this).find("tr").each(function() {
          price = $(this).find("td:nth-child("+priceCol+")").text();
          price = price.replace(",", ".");
          price = price.replace("€", "");
          price = price.trim();

          var conditionText = $(this).find("td:nth-child("+condCol+")").find(".icon").attr("onmouseover");

        if (conditionText !== undefined) {
			if (conditionText.indexOf("Near Mint") > -1) {
			conditionMod = 1;
			} else if (conditionText.indexOf("Excellent") > -1) {
			conditionMod = 0.8;
			} else if (conditionText.indexOf("Good") > -1) {
			conditionMod = 0.6;
			}
        }

		var auto;
		if (autoMode) {
			auto = "&auto";
		} else {
			auto = "";
		}

        oldLink = $(this).find("td:nth-child("+linkCol+") > a").attr("href");

        $(this).find("td:nth-child("+linkCol+")")
        	.find("a")
        	.attr("href", oldLink+"?"+userId+"&"+price+"&"+conditionMod+auto);
       });
    });
}

$(".filterBox").on("click", "span.automode", function() {
	$(this).toggleClass("active");
})

$(".filterBox").on("click", ".btn", function() {
	$(".injected").removeClass("injected");
})