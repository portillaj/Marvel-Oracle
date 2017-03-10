
       var PRIV_KEY = "e6abd0558c8f951d1017bdab251fc8c672e6c845";
	   var PUBLIC_KEY = "31f470f4364dd518ad52e9fe9902ae7e";

		var ts = new Date().getTime();
         var hash = md5(ts + PRIV_KEY + PUBLIC_KEY.toString());
         console.log(hash);

           var marvelAPI = "https://gateway.marvel.com/v1/publi/characters/1009718?name=wolverine?ts=" + ts + "&apikey=" + PUBLIC_KEY + "&hash=" + hash;
        $.ajax  ({
           dataType: "json",
           url: marvelAPI
           })
           .done(function(data) {
             // sort of a long dump you will need to sort through
             console.log(data);
          });

