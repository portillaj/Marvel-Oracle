var backgroundMusic = new Audio('04 Seventh Trinity.m4a');
var backgroundMusic = new Audio('04 Seventh Trinity.m4a');

backgroundMusic.loop=true;
backgroundMusic.play();


var PRIV_KEY = "8e019ed6de8ad8ebf5f3c71145c1e9c63157770d";
var PUBLIC_KEY = "b428e4cb4d988c3d848bef0be96f6669";

var ts = new Date().getTime();
  var hash = MD5(ts + PRIV_KEY + PUBLIC_KEY).toString();
  
  // the api deals a lot in ids rather than just the strings you want to use
  var characterId = '1009718'; // wolverine                                                                             


  var url = 'http://gateway.marvel.com:80/v1/public/comics';

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
    })



