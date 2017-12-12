
function initMap() {

var busCheck = document.getElementById("check-bus").checked;
var stopCheck = document.getElementById("check-stops").checked

  var uluru = {lat: -23.4829, lng:  -46.501};
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 20,
    center: uluru,
    mapTypeId: google.maps.MapTypeId.SATELLITE,
    zoom: 18 
  });

    var infoWindow = new google.maps.InfoWindow({map: map});

  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      infoWindow.setPosition(pos);
      infoWindow.setContent('Location found.');
      map.setCenter(pos);
    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
    var marker = new google.maps.Marker({
      position: pos,
      map: map
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }


  if(stopCheck == true){


   
    var lat_min = pos.lat - 0.0045;
    var lat_max = pos.lat + 0.0045;
    var lon_min = pos.lon - 0.0045;
    var lon_max = pos.lon + 0.0045;

    var local = {
          "lat_min": lat_min,
          "lat_max": lat_max,
          "lon_min": lon_min,
          "lon_max": lon_max
    }

    var sender = JSON.stringify(local);


    request= new XMLHttpRequest()
    var uri = encodeURIComponent(sender) 
    request.open("GET", "/php/stopRequest.php?data="+uri, true)
    request.setRequestHeader("Content-type", "application/json")
    request.send()
    


    window.location.href = "stopRequest.php?lat_min=" + lat_min;
    window.location.href = "stopRequest.php?lat_max=" + lat_max;
    window.location.href = "stopRequest.php?lon_min=" + lon_min;
    window.location.href = "stopRequest.php?lon_max=" + lon_max;
    


    //fazer busca no bd das posicoes de pontos dentro de 1km
    //SELECT FROM stops WHERE( stop_lat BETWEEN value_1 AND value_2) AND ( stop_lon BETWEEN value_1 AND value_2) GROUP BY stop_id;
  }



  function showUser(str) {
    if (str=="") {
      document.getElementById("txtHint").innerHTML="";
      return;
    } 
    if (window.XMLHttpRequest) {
      // code for IE7+, Firefox, Chrome, Opera, Safari
      xmlhttp=new XMLHttpRequest();
    } else { // code for IE6, IE5
      xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange=function() {
      if (this.readyState==4 && this.status==200) {
        document.getElementById("txtHint").innerHTML=this.responseText;
      }
    }
    xmlhttp.open("GET","getuser.php?q="+str,true);
    xmlhttp.send();
  }










}
  

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
                        'Error: The Geolocation service failed.' :
                        'Error: Your browser doesn\'t support geolocation.');
}