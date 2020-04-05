$(document).ready(function(){ 

    // When search button is clicked, append a new button with a name matching the form textarea
    $(".city-search-button").on("click", function() {
        event.preventDefault();
        var cityName = $("#city-search").val();
        
        var newCityButton = $("<button>");
        newCityButton.addClass("btn btn-light");
        newCityButton.text(cityName);
        newCityButton.attr("data-city", cityName);
        $("#add-buttons-here").append(newCityButton);
    })



});