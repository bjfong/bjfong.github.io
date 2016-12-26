jQuery(function ($) {
    var filter;
    $("#all_filter").click(function() {
    	$(".domestic").each(function() {
    		console.log(this);
    		$(this).css("display", "block");
    	})
    	$(".international").each(function() {
    		console.log(this);
    		$(this).css("display", "block");
    	})
    });
    $("#domestic_filter").click(function() {
    	$(".international").each(function() {
    		$(this).css("display", "none");
    	})
    	$(".domestic").each(function() {
    		console.log(this);
    		$(this).css("display", "block");
    	})
    });
    $("#international_filter").click(function() {
    	$(".domestic").each(function() {
    		$(this).css("display", "none");
    	})
    	$(".international").each(function() {
    		console.log(this);
    		$(this).css("display", "block");
    	})
    });
});