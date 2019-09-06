var choose1 = $("#O-choose1");
var choose2 = $("#O-choose2");
var button = $("#O-choose_button");

choose1.click(function () {
	var temp = choose1.attr("class");
	if (temp.indexOf("active") == -1) {
		choose1.addClass("active");
		choose2.removeClass("active");
	}
});

choose2.click(function () {
	var temp = choose2.attr("class");
	if (temp.indexOf("active") == -1) {
		choose2.addClass("active");
		choose1.removeClass("active");
	}
});

button.click(function () {
	location.href = "/device/matching";
});