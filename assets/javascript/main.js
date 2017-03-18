$( document ).ready(function() {

var music = new Audio('seventh.m4a');
var avengemusic = new Audio('avengers.mp4');
music.volume = .075;
music.play();

  //firebase init
  var config = {
    apiKey: "AIzaSyB2_VTIaMgnWayVmDIzAYBwhzR20yPbJvA",
    authDomain: "marvel-44df2.firebaseapp.com",
    databaseURL: "https://marvel-44df2.firebaseio.com",
    storageBucket: "marvel-44df2.appspot.com",
    messagingSenderId: "160783325443"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  responsiveVoice.speak("Welcome to the Marvel Oracle. Tell me what you're looking for.", "US English Female", {rate: .95});


//variables for API and characters, and characterID  Q
var PRIV_KEY = "e6abd0558c8f951d1017bdab251fc8c672e6c845";
var PUBLIC_KEY = "31f470f4364dd518ad52e9fe9902ae7e";
var ts = new Date().getTime();
var hash = md5(ts + PRIV_KEY + PUBLIC_KEY.toString());
var character;
var charID;
var descriptionText;


//random background 
var randomback = Math.floor((Math.random() * 8) + 1);


// hide sections
$("#newmap").hide();
$("#section2").hide();
$("#devbios").hide();
$("#footage").hide();

// randomize hero backgrounds
  $("#heroholder").html('<img class="spidey" src="assets/images/marvel-jumbo0' + randomback + '.jpg">');

  database.ref().limitToLast(3).on("child_added", function(childSnapshot) {      
  $("#recent").append("<div><center>" + childSnapshot.val().slot01 + "</center></div>");
  console.log(childSnapshot.val().slot01);
});//end document ready function

// New voice powered search functions
if (annyang) {
// Let's define our first command. First the text we expect, and then the function it should call
var commands = {
 'show nearby comics': function() //use show nearby speech to show map
  { console.log("showing MAP");
  responsiveVoice.speak("Here are some nearby comic book stores", "US English Female", {rate: .95});

  // initMap();
  $("#newmap").show();//when called, scroll to the map section
  $('body').delay(300) //wait .1 seconds
      .animate({ 'scrollTop': $('#newmap').offset().top
      }, 1000); //animate over 800ms, change this to however long you want it to anim

},
 'who made this': function() //use who made this to show web dev team
  { console.log("dev team reveal");
  responsiveVoice.speak("Here is the brilliant team who created this.", "US English Female", {rate: .95});

  $("#devbios").show(); //when called, show web dev team
  $('body').delay(300) //wait .1 seconds
      .animate({ 'scrollTop': $('#devbios').offset().top
      }, 1000); //animate over 800ms, change this to however long you want it to anim

},
  'search *tag': function(tag) { //use search keyword + character
    console.log("Searching... " + tag);
    $("#searchbox").attr("placeholder", tag);
    $("#section2").show();
    $("#newmap").hide();
    $("#devbios").hide();
    $("#footage").hide();

    character = tag;
    scrolling();
    CharHunt();
  },
   'show me *tag': function(tag) { //use show me keyword + character
    console.log("Searching... " + tag);
      $("#searchbox").attr("placeholder", tag);
      $("#section2").show();
      $("#newmap").hide();
      $("#devbios").hide();
      $("#footage").hide();

    character = tag;
    scrolling();
    CharHunt();
  },
     'bring up *tag': function(tag) { //use show me keyword + character
    console.log("Searching... " + tag);
      $("#searchbox").attr("placeholder", tag);
      $("#section2").show();
      $("#newmap").hide();
      $("#devbios").hide();
      $("#footage").hide();

    character = tag;
    scrolling();
    CharHunt();
  },
   'look up *tag': function(tag) { //use show me keyword + character
    console.log("Searching... " + tag);
    $("#searchbox").attr("placeholder", tag);
      $("#section2").show();
      $("#newmap").hide();
      $("#devbios").hide();
      $("#footage").hide();

    character = tag;
    scrolling();
    CharHunt();
  },
   'lets see *tag': function(tag) { //use lets see keyword + character
    console.log("Searching... " + tag);
      $("#section2").show();
      $("#newmap").hide();
      $("#devbios").hide();
      $("#footage").hide();

    $("#searchbox").attr("placeholder", tag);
    character = tag;
    scrolling();
    CharHunt();
  },
  'kill music': function() {
    musicstop();
  },
    'stop music': function() {
    musicstop();
  },
   'play avengers theme': function() {
    console.log("avengers go")
      musicstop();
      avengemusic.play();
      avengemusic.volume = .75;
  },
    'start music': function() {
    music.play();
      console.log("START MUSIC");
  },
    'lower volume': function() {
        console.log("LOWER MUSIC");
   music.volume = (music.volume - .5);
  },
    'crank music': function() {
   music.volume = 1;
  },
    'shut up': function() {
      console.log("Shutting up")
  responsiveVoice.cancel();
  musicstop();
  },
    'silence': function() {
      console.log("Shutting up")
  responsiveVoice.cancel();
  musicstop();
  },
  'show footage': function() {
    giphy();
  }
};//end annyang command list

function musicstop()
{
  console.log("KILLING MUSIC");
  music.pause();
  avengemusic.pause();
}

//function that calls the giphy api to display gifs of the characters you asked for
function giphy() {
// Calls the Giphy API when called
   $("#footage").show();
   responsiveVoice.speak("Here's footage of " + character + " in action.", "US English Female", {rate: .95});

   $('body').delay(300) //wait .1 seconds
    .animate({ 'scrollTop': $('#footage').offset().top
    }, 1000); 

  var SearchTerm = character;
  console.log("gifs of character..." + SearchTerm)

  var queryURL = 'https://api.giphy.com/v1/gifs/search?q=' + SearchTerm + '&limit=12&api_key=dc6zaTOxFJmzC';

//giphy ajax call
  $.ajax({
      url: queryURL,
      method: 'GET'
    }).done(function(response) {
      console.log(response);
     // console.log(response.images.url);
      console.log(response.data[0].images.fixed_height.url);
      console.log(queryURL);

        for (var i = 0; i < 12; i++) 
        {
          $('#box'+ (i+1) ).html('<img src="' + response.data[i].images.downsized.url + ' " >');
          // $('#box'+ (i+1) ).val = response.data[i].images.downsized.url;
           $('#box'+ (i+1) ).attr("data-animate", response.data[i].images.downsized.url);
           $('#box'+ (i+1) ).attr("data-still", response.data[i].images.downsized_still.url);
           $('#box'+ (i+1) ).attr("rating", response.data[i].rating);
           $('#box'+ (i+1) ).attr("data-state", "still");
           console.log(response.data[i].rating);
        }//end for loop
    });//end done function
}//end giphy function

// Add our commands to annyang
annyang.addCommands(commands);

// Start listening. You can call this here, or attach this call to an event, button, etc.
annyang.start();
}

//function that calls the api to display the name of the character in the section
function CharHunt() {
    console.log("charHunt called success");
    var ts = new Date().getTime();
    var hash = md5(ts + PRIV_KEY + PUBLIC_KEY.toString());
    var marvelAPI = "https://gateway.marvel.com/v1/public/characters?name=" + character + "&ts=" + ts + "&apikey=" + PUBLIC_KEY + "&hash=" + hash;

    //the name of the character displays in the header of the character section
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

        database.ref().push({
          slot01: character,
          });
             MarvelCall();
        });//end done function
}//end function

// search button click
$(".text-button").on("click",function(e){
     event.preventDefault(e);
     console.log("button working");
      character = $("#searchbox").val();
      CharHunt();
      $("#searchbox").val("");
 });//end click 

//function that calls the scroll function which is animation that scolls to each section
function scrolling() {
  $("#section2").show();
  $('body').delay(100) //wait .1 seconds
        .animate({
            //animate jQuery's custom "scrollTop" style
            //grab the value as the offset of #second from the top of the page
            'scrollTop': $('#section2').offset().top
        }, 1000); //animate over 800ms, change this to however long you want it to anim
}//end function


//function that calls the marvel api and gets the characters and comics with that character
function MarvelCall() 
{ 
  //get character from what user entered
  console.log("MARVEL, CALLED!");
  scrolling();

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
         $("#pic-area").html(img);	
         var descriptionHeader = $("<h2>").addClass("desc-header").html("About");
         var comicHeader = $("<h2>").addClass("comic-header").html("Popular Comics Issues");

         $(".bio-header-section").html(descriptionHeader);
         $(".comic-book-section").html(comicHeader);
         $("#heroname").html(character);


         descriptionText = $("<p>").addClass("desc-text");
         var comicDisplay;


         //Taylor this is the part I am trying to get the three comic books to display
         //for loop that will choose the first 4 comic books....
         var comicAPI = "https://gateway.marvel.com/v1/public/comics?dateDescriptor=thisWeek&dateRange=2010-01-01%2C2017-01-01&characters=" + charID + "&ts=" + ts + "&apikey=" + PUBLIC_KEY + 
  		    "&hash=" + hash;

         $.ajax  ({
		     dataType: "json",
		     url: comicAPI
		     }).done(function(response) {
         		for (var i = 0; i < 4; i++) {
         			var search = response.data;
            		comicDisplay = $("<img>").addClass("comic-pic").attr("src", search.results[i].images[0].path + "." + search.results[i].images[0].extension);
            		$(".comic-book-section").append(comicDisplay);
            	}
         });
         if(search.results[0].description === ""){//if character does not have a bio
             $(".bio-description-section").addClass("coming-soon").html("Classified by Order of S.H.I.E.L.D.");
            responsiveVoice.speak(character, "US English Female", {rate: .95});
            responsiveVoice.speak("Classified by Order of Shield", "US English Female", {rate: .95});
         }else {//if character has a bio
          descriptionText.html(search.results[0].description);//get the character description from api
          $(".bio-description-section").html(descriptionText); //add the character description to the page
          responsiveVoice.speak(character, "US English Female", {rate: .95});
          responsiveVoice.speak(search.results[0].description, "US English Female", {rate: .95});
        }//end else
    });//end done function
};//end search
          //   var music = new Audio('seventh.m4a');
          //   music.volume = .17;
          //   music.play();
          //     //firebase init
          //     var config = {
          //       apiKey: "AIzaSyB2_VTIaMgnWayVmDIzAYBwhzR20yPbJvA",
          //       authDomain: "marvel-44df2.firebaseapp.com",
          //       databaseURL: "https://marvel-44df2.firebaseio.com",
          //       storageBucket: "marvel-44df2.appspot.com",
          //       messagingSenderId: "160783325443"
          //     };
          //     firebase.initializeApp(config);

          //     var database = firebase.database();

          //     responsiveVoice.speak("Welcome to the Marvel Oracle. Tell me what you're looking for.", "US English Female", {rate: .95});


          //   //variables for API and characters, and characterID  Q
          //   var PRIV_KEY = "e6abd0558c8f951d1017bdab251fc8c672e6c845";
          //   var PUBLIC_KEY = "31f470f4364dd518ad52e9fe9902ae7e";
          //   var ts = new Date().getTime();
          //   var hash = md5(ts + PRIV_KEY + PUBLIC_KEY.toString());
          //   var character;
          //   var charID;
          //   var descriptionText;


          //   //random background 
          //   var randomback = Math.floor((Math.random() * 8) + 1);


          //   // hide sections
          //   // $("#newmap").hide();
          //   $("#section2").hide();
          //   $("#devbios").hide();
          //   $("#footage").hide();

          //   // randomize hero backgrounds
          //   $("#heroholder").html('<img class="spidey" src="assets/images/marvel-jumbo0' + randomback + '.jpg">');

          //     database.ref().limitToLast(3).on("child_added", function(childSnapshot) {
                      
          //                $("#recent").append("<div><center>" + childSnapshot.val().slot01 + "</center></div>");
          //                    console.log(childSnapshot.val().slot01);
          //     });

          //   // New voice powered search functions

          //   if (annyang) {
          //     // Let's define our first command. First the text we expect, and then the function it should call
          //     var commands = {
          //      'show nearby comics': function() //use show nearby speech to show map
          //       { console.log("showing MAP");
          //       responsiveVoice.speak("Here are some nearby comic book stores", "US English Female", {rate: .95});

          //       // initMap();
          //       $("#newmap").show();//when called, scroll to the map section
          //       $('body').delay(300) //wait .1 seconds
          //           .animate({ 'scrollTop': $('#newmap').offset().top
          //           }, 1000); //animate over 800ms, change this to however long you want it to anim

          //     },
          //      'who made this': function() //use who made this to show web dev team
          //       { console.log("dev team reveal");
          //       responsiveVoice.speak("Here is the brilliant team who created this.", "US English Female", {rate: .95});

          //       $("#devbios").show(); //when called, show web dev team
          //       $('body').delay(300) //wait .1 seconds
          //           .animate({ 'scrollTop': $('#devbios').offset().top
          //           }, 1000); //animate over 800ms, change this to however long you want it to anim

          //     },
          //       'search *tag': function(tag) { //use search keyword + character
          //         console.log("Searching... " + tag);
          //         $("#searchbox").attr("placeholder", tag);
          //         $("#section2").show();
          //         $("#newmap").hide(); 
          //         $("#devbios").hide();
          //         $("#footage").hide();
          //         character = tag;
          //         scrolling();
          //         CharHunt();
          //       },

          //        'show me *tag': function(tag) { //use show me keyword + character
          //         console.log("Searching... " + tag);
          //         $("#searchbox").attr("placeholder", tag);
          //           $("#section2").show();
          //            $("#newmap").hide(); 
          //           $("#devbios").hide();
          //           $("#footage").hide();
          //         character = tag;
          //         scrolling();
          //         CharHunt();
          //       },
          //        'look up *tag': function(tag) { //use look up keyword + character
          //         console.log("Searching... " + tag);
          //         $("#searchbox").attr("placeholder", tag);
          //           $("#section2").show();
          //           $("#newmap").hide(); 
          //           $("#devbios").hide();
          //           $("#footage").hide();
          //         character = tag;
          //         scrolling();
          //         CharHunt();

          //       },
          //        'lets see *tag': function(tag) { //use lets see keyword + character
          //         console.log("Searching... " + tag);
          //           $("#section2").show();
          //           $("#newmap").hide(); 
          //           $("#devbios").hide();
          //           $("#footage").hide();
          //         $("#searchbox").attr("placeholder", tag);
          //         character = tag;
          //         scrolling();
          //         CharHunt();
                  
          //       },
          //       'kill music': function()
          //       {
          //        music.pause();
          //       },
          //       'start music': function()
          //       {
          //       music.play();
          //       },
          //       'softer music': function()
          //       {
          //        music.volume = .1;
          //       },
          //       'crank music': function()
          //       {
          //        music.volume = .95;
          //       },
          //       'show footage': function()
          //       {
          //         giphy();
          //       }

          //    };

          // // Calls the Giphy API when called
          //   function giphy() {
          //          $("#footage").show();
          //          $('body').delay(300) //wait .1 seconds
          //           .animate({ 'scrollTop': $('#footage').offset().top
          //           }, 1000); 

          //         var SearchTerm = character;
          //         console.log("gifs of character..." + SearchTerm)


          //         var queryURL = 'https://api.giphy.com/v1/gifs/search?q=' + SearchTerm + '&limit=12&api_key=dc6zaTOxFJmzC';


          //         $.ajax({
          //             url: queryURL,
          //             method: 'GET'
          //           }).done(function(response) {
          //             console.log(response);
          //            // console.log(response.images.url);
          //             console.log(response.data[0].images.fixed_height.url);
          //             console.log(queryURL);


          //               for (var i = 0; i < 12; i++) 
          //               {
          //                     $('#box'+ (i+1) ).html('<img src="' + response.data[i].images.downsized.url + ' " >');
          //                     // $('#box'+ (i+1) ).val = response.data[i].images.downsized.url;
          //                            $('#box'+ (i+1) ).attr("data-animate", response.data[i].images.downsized.url);
          //                            $('#box'+ (i+1) ).attr("data-still", response.data[i].images.downsized_still.url);
          //                            $('#box'+ (i+1) ).attr("rating", response.data[i].rating);
          //                            $('#box'+ (i+1) ).attr("data-state", "still");
          //                            console.log(response.data[i].rating);

          //                     // console.log($('#box'+ (i+1)).val()); 
          //               }
          //           });
          //       }


          //     // Add our commands to annyang
          //     annyang.addCommands(commands);

          //     // Start listening. You can call this here, or attach this call to an event, button, etc.
          //     annyang.start();
          //   }


          //   function CharHunt()
          //   {
          //       console.log("charHunt called success");
          //       var ts = new Date().getTime();
          //       var hash = md5(ts + PRIV_KEY + PUBLIC_KEY.toString());
          //       var marvelAPI = "https://gateway.marvel.com/v1/public/characters?name=" + character + "&ts=" + ts + "&apikey=" + PUBLIC_KEY + "&hash=" + hash;


          //           $.ajax  ({
          //              dataType: "json",
          //              url: marvelAPI
          //              })
          //              .done(function(charobj) {
          //                // sort of a long dump you will need to sort through
          //                console.log(charobj);
          //               charID = charobj.data.results[0].id;
          //               character = charobj.data.results[0].name;
          //               console.log(charID + " is the ID and name is: " + character);

          //               database.ref().push({
          //                 slot01: character,
          //                 });
          //                    MarvelCall();
          //               });

          //    }


          //   // search button click

          //   $(".text-button").on("click",function(e){
          //        event.preventDefault(e);
          //        console.log("button working");
          //         character = $("#searchbox").val();
          //         CharHunt();
          //         $("#searchbox").val("");
          //    });



          //   function scrolling() {
          //     $("#section2").show();
          //     $('body').delay(100) //wait .1 seconds
          //           .animate({
          //               //animate jQuery's custom "scrollTop" style
          //               //grab the value as the offset of #second from the top of the page
          //               'scrollTop': $('#section2').offset().top
          //           }, 1000); //animate over 800ms, change this to however long you want it to anim
          //   }//end function


          //   function MarvelCall() 
          //   { 
          //     //get character from what user entered
          //     console.log("MARVEL, CALLED!");
          //     scrolling();

          //     //marvelAPI URL
          //     var marvelAPI = "https://gateway.marvel.com/v1/public/characters/" + 
          //     charID + "?name=" + character + "&ts=" + ts + "&apikey=" + PUBLIC_KEY + 
          //     "&hash=" + hash;
          //     //AJAX Call
          //     $.ajax  ({
          //        dataType: "json",
          //        url: marvelAPI
          //        }).done(function(response) {
          //          // sort of a long dump you will need to sort through
          //          console.log(response);
          //            var search = response.data;

          //            var img = $("<img>").addClass("pic").attr("src", search.results[0].thumbnail.path + "." + search.results[0].thumbnail.extension);
          //            $("#pic-area").html(img);	
          //            var descriptionHeader = $("<h2>").addClass("desc-header").html("About");
          //            var comicHeader = $("<h2>").addClass("comic-header").html("Popular Comics Issues");

          //            $(".bio-header-section").html(descriptionHeader);
          //            $(".comic-book-section").html(comicHeader);
          //            $("#heroname").html(character);


          //            descriptionText = $("<p>").addClass("desc-text");
          //            var comicDisplay;


          //            //Taylor this is the part I am trying to get the three comic books to display
          //            //for loop that will choose the first 4 comic books....
          //            var comicAPI = "https://gateway.marvel.com/v1/public/comics?dateDescriptor=thisWeek&dateRange=2010-01-01%2C2017-01-01&characters=" + charID + "&ts=" + ts + "&apikey=" + PUBLIC_KEY + 
          //     		"&hash=" + hash;


          //            $.ajax  ({
          //   		     dataType: "json",
          //   		     url: comicAPI
          //   		     }).done(function(response) {
          //            		for (var i = 0; i < 4; i++) {
          //            			var search = response.data;
          //               		comicDisplay = $("<img>").addClass("comic-pic").attr("src", search.results[i].images[0].path + "." + search.results[i].images[0].extension);
          //               		$(".comic-book-section").append(comicDisplay);
          //               	}
          //            });
          //            if(search.results[0].description === ""){
          //                $(".bio-description-section").addClass("coming-soon").html("Classified by Order of S.H.I.E.L.D.");
          //             responsiveVoice.speak(character, "US English Female", {rate: .95});
          //             responsiveVoice.speak("Classified by Order of Shield", "US English Female", {rate: .95});
          //            }else {
          //             descriptionText.html(search.results[0].description);//get the character description from api
          //             $(".bio-description-section").html(descriptionText); //add the character description to the page
          //           responsiveVoice.speak(character, "US English Female", {rate: .95});
          //           responsiveVoice.speak(search.results[0].description, "US English Female", {rate: .95});
          //           }



          //       });//end done function
 


          //   };//end search

            //Map stuff below.


            // var mapKey = "AIzaSyA-YESMuTF_QIWim5QKpFwcrSm0uc-Bq5s";
            // var mapURL = "https://maps.googleapis.com/maps/api/js?key=" + mapKey + "&libraries=places&callback=initMap";

            // //Set up map and tap the map div.
            // function initMap() {
            //  var map = new google.maps.Map(document.getElementById('map'), {
            //        zoom: 11
            //      });

            //  //HTML5 geolocation.
            //  if (navigator.geolocation) {
            //    navigator.geolocation.getCurrentPosition(function(position) {
            //      var pos = {
            //        lat: position.coords.latitude,
            //        lng: position.coords.longitude
            //      };

            //      //Map center is the geolocation that just got found.
            //      map.setCenter(pos);

            //      //Looking for all close stores that sell comics.
            //      var request = {
            //        location: pos,
            //        radius: 50000,
            //        query: "comic",
            //        type: "store"
            //      };

            //      //Doing a text search of the places library.
            //      var service = new google.maps.places.PlacesService(map);
            //      service.textSearch(request, callback);
                       
            //    });

            //    //If the library is up, markers are created for local stores selling comics.
            //    function callback(results, status) {
            //      if (status === google.maps.places.PlacesServiceStatus.OK) {
            //        for (var i = 0; i < results.length; i++) {
            //          createMarker(results[i]);
            //        }
            //      }
            //    }

            //    //Creating the markers, adding the info windows, and click listeners.
            //    function createMarker(place) {
            //      var infoWindow = new google.maps.InfoWindow({
            //        content: "<div class='text-center'>" + place.name + "<br>" +
            //        place.formatted_address + "</div>"
            //      });
            //      var placeLoc = place.geometry.location;
            //      var marker = new google.maps.Marker({
            //        map: map,
            //        position: place.geometry.location
            //      });
            //      marker.addListener("click", function(){
            //        infoWindow.open(map, this);
            //      });
            //    }
            //  }
            // };

//Sets up map as soon as the page is loaded.
});