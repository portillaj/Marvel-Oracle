var backgroundMusic = new Audio('04 Seventh Trinity.m4a');
var backgroundMusic = new Audio('04 Seventh Trinity.m4a');

backgroundMusic.loop=true;
backgroundMusic.play();


var PRIV_KEY = "e6abd0558c8f951d1017bdab251fc8c672e6c845";
	   var PUBLIC_KEY = "31f470f4364dd518ad52e9fe9902ae7e";

		var ts = new Date().getTime();
		 var hash = md5(ts + PRIV_KEY + PUBLIC_KEY.toString());
		 console.log(hash);
		 
		 // the api deals a lot in ids rather than just the strings you want to use
		 var characterId = '1009718'; // wolverine                                                                            


		 var url = "http://gateway.marvel.com/v1/comics?ts=" + ts + "&apikey=" + PRIV_KEY + "&hash=" + hash;

		 console.log(url);
		 $.getJSON(url, {
		   ts: ts,
		   apikey: PUBLIC_KEY,
		   hash: hash,
		   characters: characterId
		   })
		   .done(function(data) {
		     // sort of a long dump you will need to sort through
		     console.log(data);
		   });

