
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




$( document ).ready(function() {


//variables for API and characters, and characterID  Q
var PRIV_KEY = "e6abd0558c8f951d1017bdab251fc8c672e6c845";
var PUBLIC_KEY = "31f470f4364dd518ad52e9fe9902ae7e";
var ts = new Date().getTime();
var hash = md5(ts + PRIV_KEY + PUBLIC_KEY.toString());
var character;
var charID;


//random background 
var randomback = Math.floor((Math.random() * 8) + 1);


// hide map
$("#map").hide();
$("#section2").hide();
$("#devbios").hide();

// randomize hero backgrounds
$("#heroholder").html('<img class="spidey" src="assets/images/marvel-jumbo0' + randomback + '.jpg">');

  database.ref().limitToLast(3).on("child_added", function(childSnapshot) {
          
             $("#recent").append("<div><center>" + childSnapshot.val().slot01 + "</center></div>");
                 console.log(childSnapshot.val().slot01);

          });



// New voice powered search functions

if (annyang) {
  // Let's define our first command. First the text we expect, and then the function it should call
  var commands = {
    'show nearby comic shops': function()
    { console.log("showing");
    $("#map").show();
    $('body').delay(100) //wait .1 seconds
        .animate({ 'scrollTop': $('#map').offset().top
        }, 300); //animate over 800ms, change this to however long you want it to anim

  },
      'who made this': function()
    { console.log("dev team reveal");
    $("#devbios").show();
    $('body').delay(100) //wait .1 seconds
        .animate({ 'scrollTop': $('#devbios').offset().top
        }, 300); //animate over 800ms, change this to however long you want it to anim

  },
    'search *tag': function(tag) {
      console.log("Searching... " + tag);
      $("#searchbox").attr("placeholder", tag);
      character = tag;
      CharHunt();
    },
     'show me *tag': function(tag) {
      console.log("Searching... " + tag);
      $("#searchbox").attr("placeholder", tag);
      character = tag;
      CharHunt();
    },
     'lets see *tag': function(tag) {
      console.log("Searching... " + tag);
      $("#searchbox").attr("placeholder", tag);
      character = tag;
      CharHunt();
    }

 };

  // Add our commands to annyang
  annyang.addCommands(commands);

  // Start listening. You can call this here, or attach this call to an event, button, etc.
  annyang.start();
}


function CharHunt()
{
    console.log("charHunt called success");
    var ts = new Date().getTime();
    var hash = md5(ts + PRIV_KEY + PUBLIC_KEY.toString());
    var marvelAPI = "https://gateway.marvel.com/v1/public/characters?name=" + character + "&ts=" + ts + "&apikey=" + PUBLIC_KEY + "&hash=" + hash;


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
                 scrolling();
            });

 }



function scrolling() {
  $("#section2").show();
  $('body').delay(100) //wait .1 seconds
        .animate({
            //animate jQuery's custom "scrollTop" style
            //grab the value as the offset of #second from the top of the page
            'scrollTop': $('#section2').offset().top
        }, 300); //animate over 800ms, change this to however long you want it to anim
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

         var descriptionText = $("<p>").addClass("desc-text");
         var comicDisplay;
         // var testing = search.results[0].comics.items[0].resourceURI.getComics;
         // console.log(testing);

         //Taylor this is the part I am trying to get the three comic books to display
         //for loop that will choose the first 4 comic books....
         var comicAPI = "https://gateway.marvel.com/v1/public/comics?dateDescriptor=thisWeek&dateRange=2010-01-01%2C2017-01-01&characters=" + charID + "&ts=" + ts + "&apikey=" + PUBLIC_KEY + 
  		"&hash=" + hash;


         $.ajax  ({
		     dataType: "json",
		     url: comicAPI
		     }).done(function(response) {
         		for (var i = 0; i < 4; i++) {
              console.log("Comics called...")
         			console.log(response);
         			var search = response.data;
            		comicDisplay = $("<img>").addClass("comic-pic").attr("src", search.results[i].images[0].path + "." + search.results[i].images[0].extension);
            
            		$(".comic-book-section").append(comicDisplay);
            	}
         });

         descriptionText.html(search.results[0].description);//get the character description from api
         $(".bio-description-section").html(descriptionText); //add the character description to the page
         $(".form-control").val(""); //clear the search bar
    });//end done function

};//end search






//Map stuff below.


