var Twitter = require('twitter');
var spotify = require('spotify');
var request = require('request');

var keys = require('./keys.js');

var operation = process.argv[2];
var song = process.argv[3];

var fs = require("fs");

var client = new Twitter (keys.twitterKeys);

function showLastTweets() {
    var params = {screen_name: 'bearstuffs23'};
    client.get('statuses/user_timeline', { count: 20 } , function(err, tweets, responses) {
         if (err) {
           console.log(err);
           return;
         }
         for (var i = 0; i < tweets.length; i++){

           console.log(JSON.stringify(tweets[i].text));
        }
    });    
};
function spotifyIt() {

    if (!song) {
        song = 'the sign ace of base';
    }

    spotify.search({ type: 'track', query: song }, function(error, data) {
        if (error) {
            console.log('Error occurred: ' + error);
            return;
        }
        else {
            var songInfo = data.tracks.items[0];
            
            console.log('Artist(s): ' + songInfo.artists[0].name);
            console.log('Song Name: ' + songInfo.name);
            console.log('Preview Link: ' + songInfo.preview_url);
            console.log('Originating Album: ' + songInfo.album.name);
        }
    });
};
function movieInfo() {

var nodeArgs = process.argv;

var movieName = "";

for (var i = 3; i < nodeArgs.length; i++) {

    if (i > 3 && i < nodeArgs.length) {
          movieName = movieName + "+" + nodeArgs[i];
    }
    else {
        movieName += nodeArgs[i];
    }
}

var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&r=json";

            console.log(queryUrl);

    request(queryUrl, function(error, response, body) {

         if (!error && response.statusCode === 200) {

            console.log( JSON.parse(body).Title);
            console.log( JSON.parse(body).Year);
            console.log( JSON.parse(body).imdbRating);
            console.log( JSON.parse(body).Country);
            console.log( JSON.parse(body).Language);
            console.log( JSON.parse(body).Plot);
            console.log( JSON.parse(body).Actors);
            console.log( JSON.parse(body).Ratings[1]);
            console.log( JSON.parse(body).Website);
         }
    });
};

function randomize() {
    fs.readFile("random.txt", "utf8", function(error, data) {
        var dataArr = data.split(',');

        if (dataArr[0] === 'spotify-this-song') {
            song = dataArr[1];
            spotifyIt();
        }
        else if (dataArr[0] === 'movie-this') {
            movie = dataArr[1];
            movieInfo();
        }
        else if (dataArr[0] === 'my-tweets') {
            showLastTweets();
        }
    });
}

if (operation === 'my-tweets') {
    showLastTweets();
}
else if (operation === 'spotify-this-song') {
    spotifyIt();
}
else if (operation === 'movie-this') {
    movieInfo();
}
else if (operation === 'do-what-it-says') {
    randomize();
}