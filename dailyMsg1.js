$(document).ready(function(){
   // pokemon images
   var pokeImg = ["1.png", "2.png", "3.png", "4.png", "5.png", "6.png", "7.png", "8.png", "9.png", "10.png","11.png", "12.png", "13.png", "14.png", "15.png", "16.png","17.png", "18.png", "19.png", "20.png","21.png", "22.png", "23.png", "24.png", "25.png", "26.png", "27.png", "28.png", "29.png", "30.png", "31.png", "32.png", "33.png", "34.png", "35.png", "36.png", "37.png", "38.png", "39.png", "40.png", "41.png", "42.png", "43.png", "44.png", "45.png", "46.png", "47.png", "48.png", "49.png", "50.png", "51.png", "52.png", "53.png", "54.jpg", "55.png", "56.png", "57.png", "58.png", "59.png", "60.png", "61.png", "62.png", "63.png", "64.png", "65.png", "66.png","67.png", "68.png", "69.png", "70.png"]
   var pokeImgPath = "../PokeIcon/"

   var randomImg = pokeImg[Math.floor(Math.random() * pokeImg.length)]
   var randomImgPath = pokeImgPath + randomImg

   $(".pokeImg").append("<img src=" + randomImgPath + " width='400px'>")
   
   // weather message
   var APIKey = "166a433c57516f51dfab1f7edaed8413";
   var latitude = 51.51;
   var longitude = -0.118;

   var queryURL = "https://api.openweathermap.org/data/2.5/forecast?lat="+latitude+"&lon="+longitude+"&appid=" + APIKey;   
   console.log(queryURL)
      $.ajax({
         url: queryURL,
         method: "GET"
      })
      .done(function(results){
         console.log(results)
      

         var temperature = results.list[0].main.temp
            console.log("Temperature in K: " + temperature)
         var tempF = (9/5)*(temperature - 273) + 32
            console.log("Temperature in F: " + tempF)
         var windSpeed = results.list[0].wind.speed //miles per second
            console.log("Wind speed: " + windSpeed)
         var humidity = results.list[0].main.humidity
            console.log("Humidity: " + humidity)

         dailyMsg = "";

         function degrees() {
   
            if (tempF < 36){  
               dailyMsg = '"Brrrr...Snow Attack! Wear some gloves."'
               // $("body").append("<img src='../PokeBackground/freezeDay.jpg'>")
            }
                  
            else if (tempF < 51){ 
               dailyMsg = '"Pretty chilly over here. Bring a jacket!"'
               // $("body").append("<img src='../PokeBackground/chillDay.jpg'>")
            }     
                  
            else if (tempF < 80){ 
               dailyMsg = '"Beautiful Day! Go out and catc`em all!"'
               // $("body").append("<img src='../PokeBackground/warmDay.jpg'>")
            }     

            else if (tempF >= 80){ 
               dailyMsg = '"Find a beach and cool off!"'
               // $("body").append("<img src='../PokeBackground/hotDay.jpg'>")
            }     
         };

         function otherWeather(){
            if (windSpeed > 27){  //mph
               dailyMsg = '"No need to style your hair today. The wind will destroy you."'
               // $("body").append("<img src='../PokeBackground/windyDay.jpg'>")
            }     
                  
            else if (humidity > 60){ 
               dailyMsg = '"Beware of sweat and ICK!"'
               // $("body").append("<img src='../PokeBackground/ickyDay.jpg'>")
            }  
         };

         degrees();
         otherWeather();
      
         $(".weatherMsg").text(dailyMsg);

      });
});
