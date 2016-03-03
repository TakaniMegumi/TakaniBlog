$(document).ready(function() {
	$(".slider").each(function () { // treat each slider
		var obj = $(this);
		$(obj).append("<div class='nav'></div>");
		$(obj).find("li").each(function () {
			$(obj).find(".nav").append("<span rel='"+$(this).index()+"'></span>"); // add a navigation unit
			$(this).addClass("slider"+$(this).index());
		});
		$(obj).find("span").first().addClass("on"); // make active the first menu item
	});
});
function sliderJS (obj, sl) { // slider function
	var ul = $(sl).find("ul"); // find the block
	var bl = $(sl).find("li.slider"+obj); // find any of the components of the pack
	var step = $(bl).width(); // width object
	$(ul).animate({marginLeft: "-"+step*obj}, 500); // 500 this speed rewind
}
$(document).on("click", ".slider .nav span", function() { // slider click navigate
	var sl = $(this).closest(".slider"); // find, in what was a block-click
	$(sl).find("span").removeClass("on"); // remove the active element
	$(this).addClass("on"); // make active current
	var obj = $(this).attr("rel"); // learn its number
	sliderJS(obj, sl); // slide
	return false;
});