$(document).ready(function(){ 

    var cityName = "";
    var todayDate = moment().format('L');
    var queryWeatherURL = "";
    var queryUVURL = "";
    var latitude = "";
    var longitude = "";
    var cityTemp = "";
    var cityHumidity = "";
    var cityWind = "";
    var cityUV = "";

    // When search button is clicked, append a new button with a name matching the form textarea
    $(".city-search-button").on("click", function() {
        event.preventDefault();
        cityName = $("#city-search").val();
        
        var newCityButton = $("<button>");
        newCityButton.addClass("btn btn-light");
        newCityButton.text(cityName);
        newCityButton.attr("data-city", cityName);
        $("#add-buttons-here").append(newCityButton);
        queryWeatherURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=d0ac70bd4ea6ba698001a45b4fec69e2"
        callAPI();
    })

    // Make CurrentWeather API call and use latitude and longitude to make UV Index API call, update variables with response data
    function callAPI() {
        $.ajax({
            url: queryWeatherURL,
            method: "GET"
        }).then(function(response) {
            console.log(response);
            latitude = response.coord.lat;
            longitude = response.coord.lon;
            cityTemp = response.main.temp;
            cityHumidity = response.main.humidity;
            cityWind = response.wind.speed;
            queryUVURL = "http://api.openweathermap.org/data/2.5/uvi?appid=d0ac70bd4ea6ba698001a45b4fec69e2&lat=" + latitude + "&lon=" + longitude;
    
            $.ajax({
                url: queryUVURL,
                method: "GET"
            }).then(function(response) {
                console.log(response);
                cityUV = response.value;
            });
    
        });
    }




});