// Currency Converter using Jquery and Ajax

$(document).ready(function () {

$.ajax({
    type: "GET",
    url: "http://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml",
    dataType: "xml",
    success: xmlParser
   });

	$("select.fromCurrencyDropDown").on( "blur change", fromDisplayChange);
	$("select.toCurrencyDropDown").on( "blur change", toDisplayChange);
	$("input.fromCurrencyInput").on( "blur change", fromCurrencyTextboxChange);
	$("input.toCurrencyInput").on( "blur change", toCurrencyTextboxChange);
	
});
// Functions for select the currency and show exhange rates
function displayChange() {
	fromCurrencyDropDownChange();
	toCurrencyDropDownChange();
	fromCurrencyTextboxChange();
	toCurrencyTextboxChange();
}

function fromDisplayChange() {
	fromCurrencyDropDownChange();
	fromCurrencyTextboxChange();
	toCurrencyDropDownChange();
}

function toDisplayChange() {
	toCurrencyDropDownChange();
	toCurrencyTextboxChange();
	fromCurrencyDropDownChange();
}

// Currency exchange total left to right and right to left
function fromCurrencyTextboxChange() {
	var fromCurrencyDropDown = $( "select.fromCurrencyDropDown option:selected" );
	var toCurrencyDropDown = $( "select.toCurrencyDropDown option:selected" );
	var toCurrencyValue = toCurrencyDropDown.val()/fromCurrencyDropDown.val();
	var toCurrencyInputValue = $( "input.fromCurrencyInput").val() * toCurrencyValue;
	$( "input.toCurrencyInput" ).val(toCurrencyInputValue.toFixed(3));
	fromCurrencyDropDownChange();
	toCurrencyDropDownChange();
}

function toCurrencyTextboxChange() {
	var fromCurrencyDropDown = $( "select.fromCurrencyDropDown option:selected" );
	var toCurrencyDropDown = $( "select.toCurrencyDropDown option:selected" );
	var fromCurrencyValue = fromCurrencyDropDown.val()/toCurrencyDropDown.val();
	var fromCurrencyInputValue = $( "input.toCurrencyInput").val() * fromCurrencyValue;
	$( "input.fromCurrencyInput" ).val(fromCurrencyInputValue.toFixed(3));
	fromCurrencyDropDownChange();
	toCurrencyDropDownChange();
}

function fromCurrencyDropDownChange() {
	var fromCurrencyDropDown = $( "select.fromCurrencyDropDown option:selected" );
	var toCurrencyDropDown = $( "select.toCurrencyDropDown option:selected" );
	var fromCurrencyValue = toCurrencyDropDown.val()/fromCurrencyDropDown.val();
	var fromCurrencyDisplay = "1 " + fromCurrencyDropDown.attr("currencyAbbr") + " = " + fromCurrencyValue.toFixed(3) + " " + toCurrencyDropDown.attr("currencyAbbr");
	$(".fromCurrencyDisplay").html(fromCurrencyDisplay);
}

function toCurrencyDropDownChange()
{
	var fromCurrencyDropDown = $( "select.fromCurrencyDropDown option:selected" );
	var toCurrencyDropDown = $( "select.toCurrencyDropDown option:selected" );
	var toCurrencyValue = fromCurrencyDropDown.val()/toCurrencyDropDown.val();
	var toCurrencyDisplay = "1 " + toCurrencyDropDown.attr("currencyAbbr") + " = " + toCurrencyValue.toFixed(3) + " " + fromCurrencyDropDown.attr("currencyAbbr");
	$(".toCurrencyDisplay").html(toCurrencyDisplay);
}

// Parse XML
function xmlParser(xml) {

	$('#load').fadeOut();
	var cubeElementWithDates = $(xml).find("Cube").find("Cube");
	var currencyExchangeRates = [{ 
		Currency: "EUR", 
		Rate: 1,
		CurrencyName: "Euro"
	}];
// Create Array of Objects for currency names
	var currencyNames = [   
							{ Currency: "EUR", CurrencyName: "Euro" },
							{ Currency: "USD", CurrencyName: "United States Doller" },
							{ Currency: "JPY", CurrencyName: "Japan Yen" },
							{ Currency: "BGN", CurrencyName: "Bulgarian Lev" },
							{ Currency: "CZK", CurrencyName: "Czech Republic Koruna" },
							{ Currency: "DKK", CurrencyName: "Danish Krone" },
							{ Currency: "GBP", CurrencyName: "British Pound" },
							{ Currency: "HUF", CurrencyName: "Hungarian Forint" },
							{ Currency: "PLN", CurrencyName: "Polish Zloty" },
							{ Currency: "RON", CurrencyName: "Romanian Leu" },
							{ Currency: "SEK", CurrencyName: "Swedish Krona" },
							{ Currency: "CHF", CurrencyName: "Swiss Franc" },
							{ Currency: "ISK", CurrencyName: "Iceland Krona" },
							{ Currency: "NOK", CurrencyName: "Norwegian Krone" },
							{ Currency: "HRK", CurrencyName: "Croatian Kuna" },
							{ Currency: "RUB", CurrencyName: "Russian Ruble" },
							{ Currency: "TRY", CurrencyName: "Turkish Lira" },
							{ Currency: "AUD", CurrencyName: "Australian Dollar" },
							{ Currency: "BRL", CurrencyName: "Brazilian Real" },
							{ Currency: "CAD", CurrencyName: "Canadian Dollar" },
							{ Currency: "CNY", CurrencyName: "Chinese Yuan" },
							{ Currency: "HKD", CurrencyName: "Hong Kong Dollar" },
							{ Currency: "IDR", CurrencyName: "Indonesian Rupiah" },
							{ Currency: "ILS", CurrencyName: "Israeli Shekel" },
							{ Currency: "INR", CurrencyName: "Indian Rupee" },
							{ Currency: "KRW", CurrencyName: "South Korean Won" },
							{ Currency: "MXN", CurrencyName: "Mexican Peso" },
							{ Currency: "MYR", CurrencyName: "Malaysian Ringgit" },
							{ Currency: "NZD", CurrencyName: "New Zealand Dollar" },
							{ Currency: "PHP", CurrencyName: "Philippine Peso" },
							{ Currency: "SGD", CurrencyName: "Singapore Dollar" },
							{ Currency: "THB", CurrencyName: "Thai Baht" },
							{ Currency: "ZAR", CurrencyName: "South African Rand" }
						];

	cubeElementWithDates.find("Cube").each(function () {
		var that = $(this);
		var currencyNamesObject = $.grep(currencyNames, function(e){ return e.Currency == that.attr("currency"); })
		var currencyName = currencyNamesObject.length > 0 ? currencyNamesObject[0].CurrencyName : "";
		currencyExchangeRates.push({ Currency: that.attr("currency"), Rate: that.attr('rate'), CurrencyName: currencyName });
	 });

	$(currencyExchangeRates).each(function(){
	    $(".fromCurrencyDropDown").append('<option value="' + this.Rate + '" currencyAbbr="' + this.Currency + '">' + this.CurrencyName + '</option>');
	    $(".toCurrencyDropDown").append('<option value="' + this.Rate + '" currencyAbbr="' + this.Currency + '">' + this.CurrencyName + '</option>');
	});

    displayChange();

    $("div.fromCurrencySection").fadeIn(1000);
    $("div.toCurrencySection").fadeIn(1000);
}
