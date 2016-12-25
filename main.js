var view = {
	begin: "begin",
	begin_header: "CHANGE HERE",

	trip: "thetrip",
	trip_header: "The Trip",

	pictures: "pictures",
	pictures_header: "Pictures",

	highlights: "highlights",
	highlights_header: "The Good Times",

	likes: "likes",
	likes_header: "What I Liked",

	dislikes: "dislikes",
	dislikes_header: "What I Disliked",

	tips: "tips",
	tips_header: "Tips",

	final: "final",
	final_header: "Final Thoughts"
}

var template = 
"<ul class=\"nav navbar-nav navbar-right\"><li>" + 
"<a class=\"page-scroll\" href=\"#{{begin}}\">{{begin_header}}</a><\/li>" + 
"<li> <a class=\"page-scroll\" href=\"#{{trip}}\">{{trip_header}}<\/a><\/li>" + 
"<li><a class=\"page-scroll\" href=\"#{{pictures}}\">{{pictures_header}}<\/a><\/li>" + 
"<li><a class=\"page-scroll\" href=\"#{{highlights}}\">{{highlights_header}}<\/a><\/li>" + 
"<li><a class=\"page-scroll\" href=\"#{{likes}}\">{{likes_header}}<\/a><\/li>" + 
"<li><a class=\"page-scroll\" href=\"#{{dislikes}}\">{{dislikes_header}}<\/a><\/li>" +
"<li><a class=\"page-scroll\" href=\"#{{tips}}\">{{tips_header}}<\/a><\/li>" + 
"<li><a class=\"page-scroll\" href=\"#{{final}}\">{{final_header}}<\/a><\/li><\/ul>";

setInterval(function() {
	// $('#bs-example-navbar-collapse-1').html(Mustache.render(,));
	$("#bs-example-navbar-collapse-1").html(Mustache.render(template, view));
}, 1000);
