//variables for API and characters, and characterID
var PRIV_KEY = "e6abd0558c8f951d1017bdab251fc8c672e6c845";
var PUBLIC_KEY = "31f470f4364dd518ad52e9fe9902ae7e";
var ts = new Date().getTime();
var hash = md5(ts + PRIV_KEY + PUBLIC_KEY.toString());
var character;
var charID;

// New voice powered search functions

if (annyang) {
  // Let's define our first command. First the text we expect, and then the function it should call
  var commands = {
    'search *tag': function(tag) {
      alert("TESTING..." + tag);
    character = tag;
    var PRIV_KEY = "e6abd0558c8f951d1017bdab251fc8c672e6c845";
    var PUBLIC_KEY = "31f470f4364dd518ad52e9fe9902ae7e";
    var ts = new Date().getTime();
    var hash = md5(ts + PRIV_KEY + PUBLIC_KEY.toString());
    var marvelAPI = "https://gateway.marvel.com/v1/public/characters?name=" + tag + "&ts=" + ts + "&apikey=" + PUBLIC_KEY + "&hash=" + hash;

        $.ajax  ({
           dataType: "json",
           url: marvelAPI
           })
           .done(function(charobj) {
             // sort of a long dump you will need to sort through
             console.log(charobj);
            charID = charobj.data.results[0].id;
            character = charobj.data.results[0].name;
            console.log(charID + " is the ID and name is: " + character);
                 MarvelCall();
          });
    }
    
  };

  // Add our commands to annyang
  annyang.addCommands(commands);

  // Start listening. You can call this here, or attach this call to an event, button, etc.
  annyang.start();
}


function scrolling() {
     $('body').delay(2000) //wait 2 seconds
        .animate({
            //animate jQuery's custom "scrollTop" style
            //grab the value as the offset of #second from the top of the page
            'scrollTop': $('#section2').offset().top
        }, 800); //animate over 800ms, change this to however long you want it to anim
}//end function

function MarvelCall() 
{ 
  //get character from what user entered
  console.log("MARVEL, CALLED!");
  scrolling();

  $('.character-show').css('display', 'block');
  //get the characterID from the character that the user entered


  //marvelAPI URL
  var marvelAPI = "https://gateway.marvel.com/v1/public/characters/" + 
  charID + "?name=" + character + "&ts=" + ts + "&apikey=" + PUBLIC_KEY + 
  "&hash=" + hash;
  // var getComics = "http://gateway.marvel.com/v1/public/comics/" + charID + "&ts=" + ts + "?apikey=" + PUBLIC_KEY + "&hash=" + hash;
  // console.log("getComics: " + getComics);
  //AJAX Call
  $.ajax  ({
     dataType: "json",
     url: marvelAPI
     }).done(function(response) {
       // sort of a long dump you will need to sort through
       console.log(response);
         var search = response.data;

         var img = $("<img>").addClass("pic").attr("src", search.results[0].thumbnail.path + "." + search.results[0].thumbnail.extension);
         $("#pic-area").html(img);	
         var descriptionHeader = $("<h2>").addClass("desc-header").html("About");
         var comicHeader = $("<h2>").addClass("comic-header").html("Comics");

         $(".bio-header-section").html(descriptionHeader);
         $(".comic-book-section").html(comicHeader);

         var descriptionText = $("<p>").addClass("desc-text");
         var comicDisplay;
         var testing = search.results[0].comics.items[0].resourceURI.getComics;
         console.log(testing);

         //Taylor this is the part I am trying to get the three comic books to display
         //for loop that will choose the first three comic books....
         var comicAPI = "https://gateway.marvel.com:80/v1/public/comics?dateDescriptor=thisWeek&dateRange=2015-01-01%2C2017-01-01&characters=" + charID + "&ts=" + ts + "&apikey=" + PUBLIC_KEY + 
  		"&hash=" + hash;


         $.ajax  ({
		     dataType: "json",
		     url: comicAPI
		     }).done(function(response) {
         		for (var i = 0; i < 3; i++) {
         			console.log(response);
         			var search = response.data;
            		comicDisplay = $("<img>").addClass("comic-pic").attr("src", search.results[i].images[0].path + "." + search.results[i].images[0].extension);
            
            		$(".comic-book-section").append(comicDisplay);
            		console.log(response);
            	}
         });

         descriptionText.html(search.results[0].description);//get the character description from api
         $(".bio-description-section").html(descriptionText); //add the character description to the page
         $(".form-control").val(""); //clear the search bar
    });//end done function

};//end search





//Map stuff below.
var mapKey = "AIzaSyA-YESMuTF_QIWim5QKpFwcrSm0uc-Bq5s";
var mapURL = "https://maps.googleapis.com/maps/api/js?key=" + mapKey + "&libraries=places";

//Set up map and tap the map div. Yes, it's a long function. It needs to stay
//together because of reasons of scope and getting the markers to work 
//properly.
function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 11
      });

  //HTML5 geolocation. Part of initMap
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      //Map center is the geolocation that just got found. Part of initMap.
      map.setCenter(pos);

      //Looking for all close stores that sell comics. Needs to be in initMap.
      var request = {
        location: pos,
        radius: 50000,
        query: "comic",
        type: "store"
      };

      //Doing a text search of the places library. Still part of initMap.
      var service = new google.maps.places.PlacesService(map);
      service.textSearch(request, callback);
            
    });

    //If the library is up, markers are created for local stores selling comics.
    //Part of initMap.
    function callback(results, status) {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
          createMarker(results[i]);
        }
      }
    }

    //Creating the markers, adding the info windows, and click listeners.
    //Part of initMap.
    function createMarker(place) {
      var infoWindow = new google.maps.InfoWindow({
        content: "<div class='text-center'>" + place.name + "<br>" + 
        place.formatted_address + "</div>"
      });
      var placeLoc = place.geometry.location;
      var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location
      });
      marker.addListener("click", function(){
        infoWindow.open(map, this);
      });
    }
  }
}; //This ends initMap.

//Sets up map as soon as the page is loaded. Only one function to call.
// $(document).ready(function(){
//   initMap();
// });
initMap();

$("#top").click(function(e){       
    e.preventDefault();
    $('html,body').animate({scrollTop:$(this.hash).offset().top}, "slow");
});



