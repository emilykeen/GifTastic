//create topics
var topics = ["cat", "dog", "hamster", "fish", "mouse", "snake", "gerbil", "turtle", "bird", "ferret"];

//display the topics
function displayAnimal() {
    //adding attribute data-name for the image and setting to the varible animal
    var animal = $(this).attr("data-name");

    //create queryurl
    var queryurl = "http://api.giphy.com/v1/gifs/search?q=" +
        animal + "&api_key=dc6zaTOxFJmzC&limit=10";

    //clear gifs 
    $("#gifs_here").empty();
//call ajax
    $.ajax({

            url: queryurl,
            method: "GET"
        })
    //promise- complete when done
        .done(function(response) {
            var results = response.data;
            for (var i = 0; i < results.length; i++) {
                //do not display pg 13 or r ratings
                if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
                    //create div with class "pic"
                    var gifDiv = $("<div class='pic'>");
                    //grab the rating
                    var rating = results[i].rating;
                    //set a p tage with the rating of the specific image
                    var p = $("<p>").text("Rating: " + rating);
                    //create img tag for the image
                    var animalImage = $("<img>");
                    //give the img attrivute of data-index, give the src and give the datastate
                    animalImage.attr('data-index', i);
                    animalImage.attr("src", results[i].images.fixed_width_still.url);
                    animalImage.attr("data-state", "still");
                    console.log(animalImage);
                    // put the rating, image, and div tag to the 
                    gifDiv.prepend(p);
                    gifDiv.prepend(animalImage);

                    $("#gifs_here").prepend(gifDiv);


                }


                $(animalImage).on("click", function() {
                    //create the data-state of the image
                        state = $(this).attr("data-state")

                        // if the picture is moving when clicked, set the image to the still image and data-state still
                        if (state === "moving") {
                            var dataIndex = $(this).attr('data-index');
                            $(this).attr("src", results[dataIndex].images.fixed_width_still.url);
                            $(this).attr("data-state", "still");
                        } else {
                  // if the picture is still when clicked, set the image to the moving image and data-state moving

                            var dataIndex = $(this).attr('data-index');
                            $(this).attr("src", results[dataIndex].images.fixed_width.url);
                            $(this).attr("data-state", "moving");
                        }

                    }


                )


            }
        });

}


function getButtons() {

    $("#buttons").empty();
    for (var e = 0; e < topics.length; e++) {
        //create button for each item in the array "topics", add class and add button
        var b = $("<button>");
        b.addClass("animal");
        b.attr("data-name", topics[e]);
        b.text(topics[e]);
        $("#buttons").append(b);
    }
}
$("#add-animal").on("click", function(event) {
    event.preventDefault();
    var animal = $("#animal-input").val().trim();
    //push topic to array
    topics.push(animal);
    //call getButtons
    getButtons();


});
$(document).on("click", ".animal", displayAnimal);

getButtons();
