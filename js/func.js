
// var busCheck = document.getElementById("check-bus").checked;
// var stopCheck = document.getElementById("check-stops").checked
var geocoder

function initMap() {
  geocoder = new google.maps.Geocoder();
  var latlng = {lat: -23.4829, lng:  -46.501};
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 18,
    center: latlng,
    mapTypeId: google.maps.MapTypeId.SATELLITE,
  });
  var marker = new google.maps.Marker({
    position: latlng,
    map: map
  });

  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      marker.setPosition(pos);
      map.setCenter(pos);
    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
    
    
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }


//teste tudo + autocomplete
      
      function carregarNoMapa(endereco) {
        geocoder.geocode({ 'address': endereco + ', Brasil', 'region': 'BR' }, function (results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
            if (results[0]) {
              var latitude = results[0].geometry.location.lat();
              var longitude = results[0].geometry.location.lng();
        
              $('#txtEndereco').val(results[0].formatted_address);
              $('#txtLatitude').val(latitude);
              $('#txtLongitude').val(longitude);
        
              var location = new google.maps.LatLng(latitude, longitude);
              marker.setPosition(location);
              map.setCenter(location);
              map.setZoom(16);
            }
          }
        })
      }
      
      $("#btnEndereco").click(function() {
        if($(this).val() != "")
          carregarNoMapa($("#txtEndereco").val());
      })
      
      $("#txtEndereco").blur(function() {
        if($(this).val() != "")
          carregarNoMapa($(this).val());
      })
      
      google.maps.event.addListener(marker, 'drag', function () {
        geocoder.geocode({ 'latLng': marker.getPosition() }, function (results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
            if (results[0]) {  
              $('#txtEndereco').val(results[0].formatted_address);
              $('#txtLatitude').val(marker.getPosition().lat());
              $('#txtLongitude').val(marker.getPosition().lng());
            }
          }
        });
      });
      
      $("#txtEndereco").autocomplete({
        source: function (request, response) {
          geocoder.geocode({ 'address': request.term + ', Brasil', 'region': 'BR' }, function (results, status) {
            response($.map(results, function (item) {
              return {
                label: item.formatted_address,
                value: item.formatted_address,
                latitude: item.geometry.location.lat(),
                      longitude: item.geometry.location.lng()
              }
            }));
          })
        },
        select: function (event, ui) {
          $("#txtLatitude").val(ui.item.latitude);
            $("#txtLongitude").val(ui.item.longitude);
          var location = new google.maps.LatLng(ui.item.latitude, ui.item.longitude);
          marker.setPosition(location);
          map.setCenter(location);
          map.setZoom(16);
        }
      });
      
      $("form").submit(function(event) {
        event.preventDefault();
        
        var endereco = $("#txtEndereco").val();
        var latitude = $("#txtLatitude").val();
        var longitude = $("#txtLongitude").val();
        
        alert("Endereço: " + endereco + "\nLatitude: " + latitude + "\nLongitude: " + longitude);
      });


  // if(stopCheck == true){

  //   console.log("oi")


   
  //   var lat_min = pos.lat - 0.0045;
  //   var lat_max = pos.lat + 0.0045;
  //   var lon_min = pos.lon - 0.0045;
  //   var lon_max = pos.lon + 0.0045;

  //   var local = {
  //         "lat_min": lat_min,
  //         "lat_max": lat_max,
  //         "lon_min": lon_min,
  //         "lon_max": lon_max
  //   }

  //   var sender = JSON.stringify(local);


  //   request= new XMLHttpRequest()
  //   var uri = encodeURIComponent(sender) 
  //   request.open("GET", "/php/stopRequest.php?data="+uri, true)
  //   request.setRequestHeader("Content-type", "application/json")
  //   request.send()
    


  //   window.location.href = "stopRequest.php?lat_min=" + lat_min;
  //   window.location.href = "stopRequest.php?lat_max=" + lat_max;
  //   window.location.href = "stopRequest.php?lon_min=" + lon_min;
  //   window.location.href = "stopRequest.php?lon_max=" + lon_max;
    


  //   //fazer busca no bd das posicoes de pontos dentro de 1km
  //   //SELECT FROM stops WHERE( stop_lat BETWEEN value_1 AND value_2) AND ( stop_lon BETWEEN value_1 AND value_2) GROUP BY stop_id;
  // }



  // function showUser(str) {
  //   if (str=="") {
  //     document.getElementById("txtHint").innerHTML="";
  //     return;
  //   } 
  //   if (window.XMLHttpRequest) {
  //     // code for IE7+, Firefox, Chrome, Opera, Safari
  //     xmlhttp=new XMLHttpRequest();
  //   } else { // code for IE6, IE5
  //     xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  //   }
  //   xmlhttp.onreadystatechange=function() {
  //     if (this.readyState==4 && this.status==200) {
  //       document.getElementById("txtHint").innerHTML=this.responseText;
  //     }
  //   }
  //   xmlhttp.open("GET","getuser.php?q="+str,true);
  //   xmlhttp.send();
  // }










}
  

// function handleLocationError(browserHasGeolocation, infoWindow, pos) {
//   infoWindow.setPosition(pos);
//   infoWindow.setContent(browserHasGeolocation ?
//                         'Error: The Geolocation service failed.' :
//                         'Error: Your browser doesn\'t support geolocation.');
// }

