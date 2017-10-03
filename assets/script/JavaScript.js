
  // init location API
function initMap() {

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
    console.log(pos)    
    var latitude = pos.lat; 
    var longitude = pos.lng;
    //var location = ("{lat: "+latitude+", lng: "+longitude+"}");
    localStorage.setItem("latitude", latitude);
    localStorage.setItem("longitude", longitude);
    var location = JSON.stringify(pos);
    localStorage.setItem("pos", location);
    }); // closing getCurrentPosition
  }; //closing if navigator.geolocation

}; //initLocation


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
    $('#weather').show(); loadMap();
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

$(document).on('laod', ".pokeball-container", weatherLocation());

//map and weather page 
//Jimmy's section modified 
function loadMap() {
  var lat = localStorage.getItem("latitude");
  var lng = localStorage.getItem("longitude");
  var pos = JSON.parse(localStorage.getItem("pos"));

  //var myLatLng = new google.maps.LatLng(pos); 

  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 50.00, lng: -50.00},
    zoom: 6
  });

  infoWindow = new google.maps.InfoWindow;

  if (navigator.geolocation) {

      // infoWindow.setPosition(pos);

      infoWindow.setPosition(pos);
      infoWindow.setContent('Location found.');
      infoWindow.open(map); 
      // map.setCenter(pos);
      map.setCenter(pos);
      loadWeather();
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

function weatherLocation() {
  console.log("I'm in weatherLocation")
var APIKey = "166a433c57516f51dfab1f7edaed8413";
var latty = localStorage.getItem("latitude");
var longy = localStorage.getItem("longitude");
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