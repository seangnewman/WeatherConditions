var xmlhttp;
var $appid = '00de164de018150d983d520a81e61b45';

window.onload = function(){

  //document.addEventListener('deviceready', init);
  init();
}

function init(){

  document.getElementById('btnGetForecast').addEventListener('click', getData);
}

function getData(){

  xmlhttp = new XMLHttpRequest();

  xmlhttp.onreadystatechange =  processResult;
  var $zipCode =  document.getElementById('zip').value;

  var $url = 'http://api.openweathermap.org/data/2.5/weather?zip=' + $zipCode + ',us&appid=' + $appid ;

//  url+= document.getElementById('zip').value;
 
  //xmlhttp.open('GET', url, false);
  //xmlhttp.send();
  $.getJSON($url)
   .done(processResult)
   .fail(handleErr);





}


function handleErr(jqxhr, textStatus, err) {

  console.log("Request Failed: " + textStatus + ", " + err);
}

function convertKelvinToFahrenheit(kelvin){
   return (kelvin * (9/5) - 459.67).toFixed(1);
}

function convertKelvinToCelsius(kelvin){
   return (kelvin -273.15).toFixed(1);
}


function processResult(theResponse){



    var city = theResponse.name;
    var country = theResponse.sys.country;
    var temperature = (convertKelvinToFahrenheit(theResponse.main.temp) + ' F/' +  convertKelvinToCelsius(theResponse.main.temp) + ' C' );
    var relativeHumidity = theResponse.main.humidity;
    var description =  theResponse.weather[0].description;
    var wind = theResponse.wind.speed;
    var forecastIcon = theResponse.weather[0].icon;

    var output = "Weather For:   " ;
    output += city + ", " + country;
    output += "<br/>Temperature : " + temperature;
    output += "<br/>Humidity    : " + relativeHumidity + '%';
    output += "<br/>Description : " + description;
    output += "<br/>Wind        : " + wind;



    $('#weatherImage').attr('src','./resources/images/icons/' + forecastIcon + '.png');
    //document.getElementById('weatherImage').src = 'images/icons/' + filename;
    //document.getElementById('weatherInfo').innerHTML = output;
   $('#result').append(output);

}
