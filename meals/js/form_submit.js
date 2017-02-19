var resultCounter = 0;

$('#form_submit').click(function() {
	var location = $("#form #location").val();
	var cuisine = $("#form #cuisine").val();

	// resets/clears entries from previous query
	$(`#results div`).each(function() {
		$(this).css("display", "none");
	})
	$("#noresults").empty();
	resultCounter = 0;

	// shows only those that have the matching class names
	$(`#results .${location}.${cuisine}`).each(function() {
		$(this).css("display", "block");
		resultCounter++;
	})

	// if query returned no results, give message
	if(resultCounter === 0) {
		$("#noresults").html("No results for your query.");
	}
})