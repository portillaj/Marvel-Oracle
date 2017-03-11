
       var PRIV_KEY = "e6abd0558c8f951d1017bdab251fc8c672e6c845";
	   var PUBLIC_KEY = "31f470f4364dd518ad52e9fe9902ae7e";


		var ts = new Date().getTime();
         var hash = md5(ts + PRIV_KEY + PUBLIC_KEY.toString());
         console.log(hash);

          var character;
          var charID;

          var charArray = [
          	spiderman = {
          		name : "spiderman",
          		characterID : 1009610
          	},
          	wolverine = {
          		name : "wolverine",
          		characterID : 1009718
          	},
          	ironman = {
          		name : "ironman",
          		characterID : 1009368
          	},
          	blackWidow = {
          		name : "black widow",
          		characterID : 1009189
          	},
          	hulk = {
          		name : "hulk",
          		characterID : 1009351
          	},
          	deadpool = {
          		name : "deadpool",
          		characterID : 1009268
          	},
          	lukeCage = {
          		name : "luke cage",
          		characterID : 1009215
          	},
          	daredevil = {
          		name : "daredevil",
          		characterID : 1009262
          	},
          	thor = {
          		name : "thor",
          		characterID : 1009664
          	},
          	magneto = {
          		name : "magneto",
          		characterID : 1009417
          	}

          ];

          function getCharId (character) {
          	for (var i = 0 ; i < charArray.length ; i++) {
          		console.log(charArray[i].name);  
          		if (character == charArray[i].name) {
          			 charID = charArray[i].characterID;

          		}    
          	}

          }


         



        $("#search-button").on("click", function() {

        character = $(".form-control").val().trim();
		
		 getCharId(character);

        var marvelAPI = "https://gateway.marvel.com/v1/public/characters/" + charID + "?name=" + character + "&ts=" + ts + "&apikey=" + PUBLIC_KEY + "&hash=" + hash;
        $.ajax  ({
           dataType: "json",
           url: marvelAPI
           })
           .done(function(response) {
             // sort of a long dump you will need to sort through
             console.log(response);
             


	             var search = response.data;

	             var p = $("<img>").addClass("pic").attr("src", search.results[0].thumbnail.path + "." + search.results[0].thumbnail.extension);
	             /*p.text(search.results[0].thumbnail.path);*/
	             $("#main-section").append(p);	
				
				

			});
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

