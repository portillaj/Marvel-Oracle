//variables for API and characters, and characterID
var PRIV_KEY = "e6abd0558c8f951d1017bdab251fc8c672e6c845";
var PUBLIC_KEY = "31f470f4364dd518ad52e9fe9902ae7e";
var ts = new Date().getTime();
var hash = md5(ts + PRIV_KEY + PUBLIC_KEY.toString());
var character;
var charID;

//list of character objects     
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

]; //end charArray

//function that gets character ID from character name
function getCharId (character) {
  //go through character array
	for (var i = 0 ; i < charArray.length ; i++) {
    //if character === gets name return the character ID
		if (character == charArray[i].name) {
			 charID = charArray[i].characterID;

		}else{
      //display character not found(check spelling)
    }
	}//end for loop

}//end function

$("#search-button").on("click", function() {
  //get character from what user entered
  character = $(".form-control").val().trim();
  $('.hide-show').css('display', 'block');
  //get the characterID from the character that the user entered
  getCharId(character);

  //marvelAPI URL
  var marvelAPI = "https://gateway.marvel.com/v1/public/characters/" + 
  charID + "?name=" + character + "&ts=" + ts + "&apikey=" + PUBLIC_KEY + 
  "&hash=" + hash;
  //AJAX Call
  $.ajax  ({
     dataType: "json",
     url: marvelAPI
     }).done(function(response) {
       // sort of a long dump you will need to sort through
       console.log(response);
         var search = response.data;

         var img = $("<img>").addClass("pic").attr("src", search.results[0].thumbnail.path + "." + search.results[0].thumbnail.extension);
         /*p.text(search.results[0].thumbnail.path);*/
         $("#pic-area").append(img);	
         var descriptionHeader = $("<h2>").addClass("desc-header");
         var descriptionText = $("<p>").addClass("desc-text");
         var comicDisplay;
         for (var i = 0; i < 3; i++) {
            comicDisplay = $("<img>").addClass("pic").attr("src", search.results[0].series.items[i].resourceURI);
         }
    
         descriptionHeader.html("About");
         descriptionText.html(search.results[0].description);

         $("#bio").append(descriptionHeader);
         $("#bio").append(descriptionText);
    });//end done function
});//end search button click

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

