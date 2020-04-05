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
    var weatherIconID = "";

    // When search button is clicked, append a new button with a name matching the form textarea
    $(".city-search-button").on("click", function() {
        event.preventDefault();
        cityName = $("#city-search").val();
        
        var newCityButton = $("<button>");
        newCityButton.addClass("btn btn-light");
        newCityButton.text(cityName);
        newCityButton.attr("data-city", cityName);
        $("#add-buttons-here").append(newCityButton);
        queryWeatherURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=d0ac70bd4ea6ba698001a45b4fec69e2";
        callAPI();
    })

    // Make CurrentWeather API call and use latitude and longitude to make UV Index API call, update variables with response data
    function callAPI() {
        $.ajax({
            url: queryWeatherURL,
            method: "GET"
        }).then(function(response) {
            console.log(response);
            weatherIconID = response.weather[0].icon;
            latitude = response.coord.lat;
            longitude = response.coord.lon;
            cityTemp = ((response.main.temp-273.15)*1.8)+32;
            cityHumidity = response.main.humidity;
            cityWind = response.wind.speed;
            queryUVURL = "http://api.openweathermap.org/data/2.5/uvi?appid=d0ac70bd4ea6ba698001a45b4fec69e2&lat=" + latitude + "&lon=" + longitude;
    
            $.ajax({
                url: queryUVURL,
                method: "GET"
            }).then(function(response) {
                cityUV = response.value;
                updateCityDisplay();
                displayWeather();
            });
    
        });
    }

    // Update the HTML elements in the city displays and run displayUV function
    function updateCityDisplay() {
        var iconImage = $("<img>");
        iconImage.attr("src", "http://openweathermap.org/img/wn/" + weatherIconID + ".png")
        $("#city-name").text(cityName + " (" + todayDate + ")");
        $("#city-name").append(iconImage);
        $("#city-temp").text("Temperature: " + Number(cityTemp).toFixed(1) + " °F");
        $("#city-humidity").text("Humidity: " + cityHumidity + "%");
        $("#city-wind").text("Wind Speed: " + cityWind + " MPH");
        displayUV();
    }

    // Update the UV background depending on UV index scale
    function displayUV() {
        $("#city-uv").text(cityUV);

        if (cityUV >= 8) {
            $("#city-uv").css("background-color", "red");
        } else if (cityUV < 8 && cityUV >= 6) {
            $("#city-uv").css("background-color", "orange");
        } else if (cityUV < 6 && cityUV >= 3) {
            $("#city-uv").css("background-color", "#c9ae10");
        } else {
            $("#city-uv").css("background-color", "green");
        }

    }

    // Display weather information HTML elements 
    function displayWeather() {
        $("#weather-information").css("display", "block");
    }


});