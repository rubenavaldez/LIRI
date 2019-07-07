require("dotenv").config();

var keys = require("./keys.js");
var fs = require("fs")
var axios = require("axios")
var bandsintown = require('bandsintown')("trilogy");

var Spotify = require('node-spotify-api');
 
var spotify = new Spotify({
  id: "09d7fb5de364429e89c582b4b1f420f9",
  secret: "0166194dfc1a465b86f631011be98643"
});

var type = process.argv[2];
var searchTerm = "";

function search() {
    
    for (i = 3; i < process.argv.length; i++) {
        if(i < 4){
            console.log('single word')
            searchTerm += process.argv[i] 
        }else{
        searchTerm += " " + process.argv[i] 

    }
}
   
};


search();
console.log(searchTerm)

switch (type) {
    case "concert-this":
        searchConcert()
        console.log(searchTerm)
        break;

    case "spotify-this-song":
        searchSpotify()
        console.log(searchTerm)
        break;

    case "movie-this":
        searchMovie()
        // console.log(searchTerm)
        break;

    case "do-what-it-says":
        searchRandom()
        console.log(searchTerm)
        break;

    default:
        break;

}



function searchConcert() {
    console.log("concert")
    if (searchTerm == "") {
        searchTerm = "Black Amethyst"
    }
    //"")
    //venue name
    //venue location
    
    var queryUrl = 'https://rest.bandsintown.com/artists/'+searchTerm+'?app_id=trilogy'
    console.log(queryUrl)

    // This line is just to help us debug against the actual URL.
    axios
    .get(queryUrl)
    .then (function (response){
        console.log(response.data)
    }) 



}

function searchSpotify() {
    console.log("spotify")
    //Artist
    //Song Name
    //link of song from spotify
    //album
    // if none default is "the sign" by ace of base
    if(searchTerm == ""){
        searchTerm = "the sign ace of base"
    }
    spotify
    .request("https://api.spotify.com/v1/search?q=" + searchTerm + " &type=track,artist,album&limit=1")
    .then(function(data) {
     
      console.log(data.tracks.items[0].album.artists[0].name)
      console.log(data.tracks.items[0].album.artists[0].external_urls.spotify)
      console.log(data.tracks.items[0].album.name); 
    
    })
    .catch(function(err) {
      console.error('Error occurred: ' + err); 
    });
}

function searchMovie() {
    console.log("movie")
    if (searchTerm == "") {
        searchTerm = "Mr. Nobody"
    }
    //Include these results
    // title
    // year
    // imdb rating
    // rotten tomatoes rating
    //country where produced 
    //language 
    //plot
    //actors
    // default "Mr. Nobody"
    queryUrl = "http://www.omdbapi.com/?t=" + searchTerm + "&y=&plot=short&apikey=trilogy";


    
    console.log(queryUrl);





    axios.get(queryUrl)

        .then(
            function (response) {
                // console.log(response.data)
                console.log(response.data.Title)
                console.log("Filmed in " + response.data.Year)
                console.log("IMDB rates it at: " + response.data.imdbRating);
                if (response.data.Ratings[1] != undefined) {
                    console.log("Rotten tomatoes gave " + response.data.Title + " a rating of " + response.data.Ratings[1].Value)
                }

                console.log(response.data.Title + " was produced in " + response.data.Country)
                console.log("It's available is " + response.data.Language)
                if (response.data.Plot == "N/A") {
                    console.log(response.data.Title + " didn't really have a plot")
                } else {

                    console.log(response.data.Plot)
                }
                console.log("Staring " + response.data.Actors)




            })
        .catch(function (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log("---------------Data---------------");
                console.log(error.response.data);
                console.log("---------------Status---------------");
                console.log(error.response.status);
                console.log("---------------Status---------------");
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an object that comes back with details pertaining to the error that occurred.
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log("Error", error.message);
            }
            console.log(error.config);
        });
}

function searchRandom() {
    console.log("random")
    //use fs
    //run spotify this song
    //"i want it that way" import from random text
    // test this with movie-this and concert-this
}

//bonus
//write to log.txt
//append not overwrite

