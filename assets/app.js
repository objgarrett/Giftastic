//create topics array
var topics = ["new girl", "parks and recreation", "the office", "stranger things", "bobs burgers", "arrested development", "doctor who", "game of thrones", "brooklyn nine nine", "broad city"];

//on click of a button, page grabs 10 static, non-animated gif images from GIPHY API
$("#buttons").on("click", ".tvshow", function(){
	var tvshowName = $(this).attr("data-name");
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + tvshowName + "&api_key=e5TGFeWEMcT9vwrgroEsz9W4wYdDCCO8&limit=10";
		$.ajax({
			url: queryURL,
			method: "GET"
		}).done(function(response) {
			console.log(queryURL);
			console.log(response);
			var results = response.data;

			for (var i = 0; i < results.length; i++) {
				var gifDiv = $("<div class='gifs'>");
				
				//display gif rating
				var rating = results[i].rating;
				
				var p = $("<p>").text("Rating: " + rating);
				
				var tvshowImage = $("<img>");
				tvshowImage.attr("src", results[i].images.fixed_height_still.url);
				tvshowImage.attr("data-still", results[i].images.fixed_height_still.url);
				tvshowImage.attr("data-animate", results[i].images.fixed_height.url);
				tvshowImage.attr("data-state", "still");
				tvshowImage.addClass("gif");
				gifDiv.prepend(p);
				gifDiv.append(tvshowImage);

				$("#gifs-appear-here").prepend(gifDiv);

				//$("#gifs-appear-here").empty();
			}
		});	
});

//use a loop that appends a button for each string in the array
 function renderButtons() {

        // delete buttons prior to adding new buttons - avoids repeats
        $("#buttons").empty();

        // Looping through the array of tv shows
        for (var i = 0; i < topics.length; i++) {

          //generate button
          var addTVShow = $("<button>");
          addTVShow.addClass("tvshow");
          addTVShow.attr("data-name", topics[i]);
          addTVShow.text(topics[i]);
          $("#buttons").append(addTVShow);
        };
}; 
//take value from user input box and adds to topics array
//make a function call that takes each topic in the array and remakes a button on the page
$("#add-tvshow").on("click", function(event) {
	event.preventDefault();

	var tvshow = $("#tvshow-input").val().trim();

	topics.push(tvshow);

	renderButtons();

	$("#tvshow-input").val("");

});        

//on click of gif, animate
$("#gifs-appear-here").on("click", ".gif", function() {
	var gifState = $(this).attr("data-state");
	if (gifState === "still") {
		$(this).attr("src", $(this).attr("data-animate"));
		$(this).attr("data-state", "animate")
	} else {
		$(this).attr("src", $(this).attr("data-still"));
		$(this).attr("data-state", "still");
	}
})
//on click again, stop playing
renderButtons();
	








