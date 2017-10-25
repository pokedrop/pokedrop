// nice job wrapping this in a document.ready block
$( document ).ready(function(){

initMap(weatherLocation);

// init location API
  function initMap(callback) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
          var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };  
        var latitude = pos.lat; 
        var longitude = pos.lng;
        localStorage.setItem("latitude", latitude);
        localStorage.setItem("longitude", longitude);
        var location = JSON.stringify(pos);
        localStorage.setItem("pos", location);
        callback(latitude, longitude)
      }); // closing getCurrentPosition
    }; //closing if navigator.geolocation
  }; //initMap

  //start with all the pages closed 
  $('.menu').hide();
  $('.page').hide();

  //open the pokeball to load the modal
  $('.poke-ball').click(function () {

    $('.top').toggleClass('top-rotate');

  });

  // best to just remove commented out code
  // //successful authentication hides opening and show menu and welcome page
  // $('.user-login').on('click', function(){
  //   $('.opening').hide();
  //   $('.menu').show();
  //   $('#welcome').show();
  // });

  //page navigation 
  //open home page

  // the logic in these listeners is fairly repetitive - might be a good spot
  // to DRY things up by having one function that simply hides the four main elements
  // and then you only have to call `.show` on the one element you really care about.
  $('#menu').on("click", '.blue', function () {
    $('#welcome').show(); 
    // welcome(); why is this here? <<~~this was causing home images to duplicate
    $('#weather').hide();
    $('#profile').hide();
    $('#pokemon').hide();

  });
  //open weather page
  $('#menu').on("click", '.green', function () {
    $('#welcome').hide();
    $('#weather').show(); loadMap();
    $('#profile').hide();
    $('#pokemon').hide();
  });

  //open pokemon page
  $('#menu').on("click", '.red', function () {
    $('#welcome').hide();
    $('#weather').hide();
    $('#profile').hide();
    $('#pokemon').show();
  });

//open profile page
$('#menu').on("click", '.lightblue', function () {
  $('#welcome').hide();
  $('#weather').hide();
  $('#profile').show();
  $('#pokemon').hide();
});

//adding a new user
$("#add-user").on("click", function(event) {
  event.preventDefault();

// I know you're probably sick of me mentioning it, but consistent indentation
// makes your code much easier to visually understand which pays serious
// dividends towards maintainability.
var name = $("#name-input").val().trim();
var email = $("#email-input").val().trim();
var address = $("#location-input").val().trim();

// I think it would be better if we stored members
//unsure how to do this usin setItem
// var newMember = {
//   name: membername,
//   email: memberemail,
//   address: memberaddress
// };

localStorage.setItem("name", name);
localStorage.setItem("email", email);
localStorage.setItem("address", address);

$("#name-input").val("");
$("#email-input").val("");
$("#location-input").val("");
});


//map and weather page 
//Jimmy's section modified 
function loadMap() {
  var lat = localStorage.getItem("latitude");
  var lng = localStorage.getItem("longitude");
  var pos = JSON.parse(localStorage.getItem("pos"));

  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 50.00, lng: -50.00},
    zoom: 6
  });

  infoWindow = new google.maps.InfoWindow;

  if (navigator.geolocation) {

      infoWindow.setPosition(pos);
      infoWindow.setContent('Location found.');
      infoWindow.open(map); 
      // map.setCenter(pos);
      map.setCenter(pos);
      loadWeather();
      // seems a bit odd to be handling a location error here - the code seems to indicate that things have worked
      handleLocationError(true, infoWindow, map.getCenter());      
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }
};  // closing loadMap
    
function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
                        'Error: The Geolocation service failed.' :
                        'Error: Your browser doesn\'t support geolocation.');
  infoWindow.open(map);
}; // closing handleLocationError


function weatherLocation(lat, long) {
  var APIKey = "166a433c57516f51dfab1f7edaed8413";

  var latty = lat;
  var longy = long;

  // Here we are building the URL we need to query the database
  var queryURL = "https://api.openweathermap.org/data/2.5/weather?lat="+latty+"&lon="+longy+"&appid="+APIKey;
  // Here we run our AJAX call to the OpenWeatherMap API
  $.ajax({
    url: queryURL,
    method: "GET"
  })
  // We store all of the retrieved data inside of an object called "response"
  .done(function(response) {
    // Log the resulting object
    var windSpeed = response.wind.speed;
    var humidity = response.main.humidity;
    var temperature = (response.main.temp * 9 / 5 - 459.67).toFixed(2);
    var city = response.name;
    localStorage.setItem("windSpeed", windSpeed);
    localStorage.setItem("humidity", humidity);
    localStorage.setItem("temperature", temperature);
    localStorage.setItem("city", city);
  });
} //closing weather location 

// load text to the weather div

function loadWeather() {

  $(".city").html("<h1>" + localStorage.getItem("city") + " Weather Details</h1>");
  $(".wind").html("Wind Speed: " + localStorage.getItem("windSpeed") + "mph");
  $(".humidity").html("Humidity: " + localStorage.getItem("humidity") + "%");
  $(".temp").html("Temperature: " + localStorage.getItem("temperature") + "F degree");

};

// end of map and weather


}); // closing on document ready