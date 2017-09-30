

$( document ).ready(function(){

  //start with all the pages closed 
  $('.menu').hide();
  $('.page').hide();

  //open the pokeball to load the modal
  $('.poke-ball').click(function () {

    $('.top').toggleClass('top-rotate');

  });

  // successful authentication hides opening and show menu and welcome page
  $('.user-login').on('click', function(){
    $('.opening').hide();
    $('.menu').show();
    $('#welcome').show();
  });

  //page navigation 
  //open home page
  $('#menu').on("click", '.blue', function () {
    $('#welcome').show();
    $('#weather').hide();
    $('#profile').hide();
    $('#pokemon').hide();

  });
  //open weather page
  $('#menu').on("click", '.green', function () {
    console.log("i'm in green")
    $('#welcome').hide();
    $('#weather').show(); initMap();
    $('#profile').hide();
    $('#pokemon').hide();
  });

  //open pokemon page
  $('#menu').on("click", '.red', function () {
    console.log("i'm in red")
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


//map and weather page 
//Jimmy's section
function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -34.397, lng: 150.644},
    zoom: 6
  });
  var infoWindow = new google.maps.InfoWindow;
  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
      var latitude = pos.lat;
      var longitude = pos.lng;
      weatherLocation(latitude, longitude);
      infoWindow.setPosition(pos);
      infoWindow.setContent('Location found.');
      infoWindow.open(map);
      map.setCenter(pos);
    }, //function() {
      //handleLocationError(true, infoWindow, map.getCenter());
    //});
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }
};  // closing initMap
    
function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
                        'Error: The Geolocation service failed.' :
                        'Error: Your browser doesn\'t support geolocation.');
  infoWindow.open(map);
}; // closing handleLocationError

function weatherLocation (latty, longy) {
var APIKey = "166a433c57516f51dfab1f7edaed8413";
// Here we are building the URL we need to query the database

var queryURL = "https://api.openweathermap.org/data/2.5/weather?" +
"lat="+latty+"&lon="+longy+"&appid=" + APIKey;
// Here we run our AJAX call to the OpenWeatherMap API
$.ajax({
  url: queryURL,
  method: "GET"
})
// We store all of the retrieved data inside of an object called "response"
.done(function(response) {
  // Log the queryURL
  console.log(queryURL);
  // Log the resulting object
  console.log(response);
  // Transfer content to HTML
  $(".city").html("<h1>" + response.name + " Weather Details</h1>");
  $(".wind").html("Wind Speed: " + response.wind.speed);
  $(".humidity").html("Humidity: " + response.main.humidity);
  $(".temp").html("Temperature (K) " + response.main.temp);
  // Log the data in the console as well
  console.log("Wind Speed: " + response.wind.speed);
  console.log("Humidity: " + response.main.humidity);
  console.log("Temperature (K): " + response.main.temp);
});
} //closing weather location 

// end of map and weather




}); // closing on document ready