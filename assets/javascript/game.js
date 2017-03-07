var animalList = ["cat", "dog", "hamster", "fish"];


function displayAnimal() {
    var animal = $(this).attr("data-name");
    var queryurl = "http://api.giphy.com/v1/gifs/search?q=" +
        animal + "&api_key=dc6zaTOxFJmzC&limit=10";
	$("#gifs_here").empty();

    $.ajax({

            url: queryurl,
            method: "GET"
        })
        .done(function(response) {

            var results = response.data;
            for (var i = 0; i < results.length; i++) {
                var gifDiv = $("<div class='pic'>");

                var rating = results[i].rating;

                var p = $("<p>").text("Rating: " + rating);
                var animalImage = $("<img>");
                animalImage.attr("src", results[i].images.fixed_height.url);

                gifDiv.prepend(p);
                gifDiv.prepend(animalImage);

                $("#gifs_here").prepend(gifDiv);


                $(animalImage).on("click", function() {

                        for (var a = 0; a < results.length; a++) {
                            $(this).attr("src", results[a].images.fixed_height_still.url);

                        }
                    }


                )


            }
        });

}


function getButtons() {

    $("#buttons").empty();
    for (var e = 0; e < animalList.length; e++) {
        var b = $("<button>");
        b.addClass("animal");
        b.attr("data-name", animalList[e]);
        b.text(animalList[e]);
        $("#buttons").append(b);
    }
}
$("#add-animal").on("click", function(event) {
    event.preventDefault();
    var animal = $("#animal-input").val().trim();
    animalList.push(animal);
    getButtons();


});
$(document).on("click", ".animal", displayAnimal);

getButtons();