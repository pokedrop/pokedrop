$(document).ready(function(){
	// pokemon images
	var pokeImg = ["1.png", "2.png", "3.png", "4.png", "5.png", "6.png", "7.png", "8.png", "9.png", "10.png","11.png", "12.png", "13.png", "14.png", "15.png", "16.png","17.png", "18.png", "19.png", "20.png","21.png", "22.png", "23.png", "24.png", "25.png", "26.png", "27.png", "28.png", "29.png", "30.png", "31.png", "32.png", "33.png", "34.png", "35.png", "36.png", "37.png", "38.png", "39.png", "40.png", "41.png", "42.png", "43.png", "44.png", "45.png", "46.png", "47.png", "48.png", "49.png", "50.png", "52.png", "53.png", "54.jpg", "55.png", "56.png", "57.png", "58.png", "59.png", "60.png", "61.png", "62.png", "63.png", "64.png", "65.png", "66.png","67.png", "68.png", "69.png", "70.png"]
	var pokeImgPath = "assets/images/PokeIcon/"

	var randomImg = pokeImg[Math.floor(Math.random() * pokeImg.length)]
	var randomImgPath = pokeImgPath + randomImg
  var dailyMsg = "";
  var temperature = localStorage.getItem("temperature");
  var windSpeed = localStorage.getItem("windSpeed");
  var humidity = localStorage.getItem("humidity")

  window.welcome = welcome;
    function welcome(){ 
	  $(".pokeImg").append("<img src=" + randomImgPath + " width='400px'>")
     degrees(temperature);
     otherWeather(windSpeed, humidity);
     $(".weatherMsg").text(dailyMsg);
  };
   
   function degrees(tempF) {

    if (tempF < 36){  
       dailyMsg = '"Brrrr...Snow Attack! Wear some gloves."'
       $("body").css("background-image", "url('assets/images/PokeBackground/freezeDay.jpg')")
    }
          
    else if (tempF < 51){ 
       dailyMsg = '"Pretty chilly over here. Bring a jacket!"'
        $("body").css("background-image", "url('assets/images/PokeBackground/chillDay.jpg')")
    }     
          
    else if (tempF < 80){ 
       dailyMsg = '"Beautiful Day! Go out and catc`em all!"'
       $("body").css("background-image", "url('assets/images/PokeBackground/warmDay.jpg')")
    }     

    else if (tempF >= 80){ 
       dailyMsg = '"Find a beach and cool off!"'
       $("body").css("background-image", "url('assets/images/PokeBackground/hotDay.jpg')")
    }    
   };

   function otherWeather(windSpeed, humidity){
      if (windSpeed > 27){  //mph
         dailyMsg = '"No need to style your hair today. The wind will destroy you."'
         $("body").css("background-image", "url('assets/images/PokeBackground/windyDay.jpg')")
      }     
            
      else if (humidity > 60){ 
         dailyMsg = '"Beware of sweat and ICK!"'
         $("body").css("background-image", "url('assets/images/PokeBackground/ickyDay.jpg')")
      } 
   };


});
