
var PRIV_KEY = "e6abd0558c8f951d1017bdab251fc8c672e6c845";
var PUBLIC_KEY = "31f470f4364dd518ad52e9fe9902ae7e";

var ts = new Date().getTime();
var hash = md5(ts + PRIV_KEY + PUBLIC_KEY.toString());
console.log(hash);

var marvelAPI = "https://gateway.marvel.com/v1/public/characters/1009718?name=wolverine&ts=" + ts + "&apikey=" + PUBLIC_KEY + "&hash=" + hash;
$.ajax  ({
  dataType: "json",
  url: marvelAPI
})
.done(function(data) {
// sort of a long dump you will need to sort through
  console.log(data);
});


//Map stuff below.

var mapKey = "AIzaSyA-YESMuTF_QIWim5QKpFwcrSm0uc-Bq5s";
var mapURL = "https://maps.googleapis.com/maps/api/js?key=" + mapKey + "&libraries=places&callback=initMap";

function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 11
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
      infoWindow.setContent('You are here.');
      map.setCenter(pos);

      var request = {
        location: pos,
        radius: 50000,
        query: "comic",
        type: "store"
      };

      var service = new google.maps.places.PlacesService(map);
      service.textSearch(request, callback);
            
    });

    function callback(results, status) {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
          createMarker(results[i]);
        }
      }
    }

    function createMarker(place) {
      var placeLoc = place.geometry.location;
      var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location
      });
    }

    google.maps.event.addListener(marker, 'click', function() {
      infowindow.setContent(place.name);
      /*infowindow.setContent(results.formatted_address);*/
      infowindow.open(map, this);
    });

    $(document).on("click", marker, function(){
      infowindow.setContent(place.name);
      infowindow.open(map, this);
    });
  }
};

$(document).ready(function(){
  initMap();
});

/*$(document).on("click", marker, function(){
  infowindow.setContent(place.name);
  infowindow.open(map, this);
})*/


//scrolling effect
$('a[href^="#"]').on('click', function(event) {

    var target = $(this.getAttribute('href'));

    if( target.length ) {
        event.preventDefault();
        $('html, body').stop().animate({
            scrollTop: target.offset().top
        }, 1000);
    }

});