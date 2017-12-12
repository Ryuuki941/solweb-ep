document.getElementById("click-on").onclick = function () { alert('hello!');}

var el = document.getElementById("click-on");
if (el.addEventListener)
    el.addEventListener("click", doFunction, false);
else if (el.attachEvent)
    el.attachEvent('onclick', doFunction);

geocoder = new google.maps.Geocoder();


function getLocation( address, callback ){
    geocoder.geocode({address = address}, function(results, status){
            coordinates_obj = results[0].geometry.location;
            say(coordinates_obj.nb)
            say(coordinates_obj.ob)
            callback(coordinates)
    })
    return coordinates;
}


function say(something){
    console.log(something);
}