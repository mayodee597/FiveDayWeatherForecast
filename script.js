
$(document).ready(function() {
    var cities = JSON.parse(localStorage.getItem("cities"));
  cities = cities ? cities : ["Baltimore"];

$("#search").on("click", function(event) {
    event.preventDefault();
    var searchInput = $("#search-city").val();
    var city = searchInput.trim();
    if (city === "") {
        console.log("noCity");
      return;
      
    }
    cities.push(city);
    if (cities.length >8) {
      cities.shift();
    }
    $("#search-city").val("");
    localStorage.setItem("cities", JSON.stringify(cities));
    localStorage.setItem("selected-city", city);

  var key = "6205a6d12e7aceeef1f08712b4067400";
  //var city = "Baltimore"; // My test case was "Columbia"
  var queryURL = `https://api.openweathermap.org/data/2.5/forecast?q=${searchInput}&APPID=${key}`; 
 
  console.log(queryURL);

  $.ajax({
    method: "GET",
    url: queryURL,

})

  .then(function(response) {
     console.log(response);
    console.log(response.list[1].main.temp);
    console.log(response.list[1].main.humidity);
    console.log(response.list[1].wind.speed);
    console.log(response.list[1].dt_txt);

    var uvQuery = `http://api.openweathermap.org/data/2.5/uvi?appid=${key}&lat=${response.city.coord.lat}&lon=${response.city.coord.lon}`;

    $.ajax({
    method: "GET",
    url: uvQuery,
})

.then(function(response2) {
     console.log(response2.value);
     // Fill it with data from the weather API
    var html = "<h2>" + searchInput + "</h2>\n";
    html += "<p>Temperature: " + response.list[1].main.temp;
    html += "\n<br>Humidity: " + response.list[1].main.humidity;
    html += "\n<br>Speed: " + response.list[1].wind.speed;
    html += "\n<br>Date: " + response.list[1].dt_txt;
    html += "\n<br>UV Index: " + response2.value;
    html += "\n</p>";

    // Fill the div named weatherDashboard with our html
    $("#weatherDashboard").html(html);
});

    // Create a string variable with the name html
    // Fill it with data from the weather API



  //renderButtons();
  $("#city-submit").on("click", function(event) {
    event.preventDefault();
    var city = userInput.val().trim();
    if (city === "") {
        console.log("noCity");
      return;
      
    }
    cities.push(city);
    if (cities.length >8) {
      cities.shift();
    }
    userInput.val("");
    localStorage.setItem("cities", JSON.stringify(cities));
    localStorage.setItem("selected-city", city);
    //renderButtons();
    displayCityInfo();
  });
    

    // Fill the div named weatherDashboard with our html
 

    $("#5DayForecast").html('');

    var currentDate = " "
    for (var i = 0; i<response.list.length; i++) {

     //dateTime[0] = date, dateTime[1] = time
      var dateTime = response.list[i].dt_txt.split(" ");
      var url = "http://openweathermap.org/img/w/" + response.list[i].weather[0].icon + ".png";


      //populate 5 day weather forcast
      if(currentDate != dateTime[0]){
        var box = "<div class='blueForcastBox'>" +
                      "<p>" + dateTime[0] + "</p>" +
                      "<p> Temp: " + response.list[i].main.temp + " F</p>" +
                      "<p> Humidity: " + response.list[i].main.humidity + "%</p>" +
                      "<img src= "+ url +  " alt='weather icon'>" + 
                  "</div>";
        $("#5DayForecast").append(box);
        currentDate = dateTime[0];
      }
    }

    //populate the table
    $("#searchTable").append("<p class='searchHistory'>" + searchInput + "</p>")


    }); //promise ends here
  });
});