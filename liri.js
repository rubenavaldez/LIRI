require("dotenv").config();


var fs = require("fs");
var axios = require("axios");
var bandsintown = require('bandsintown')("trilogy");

var Spotify = require('node-spotify-api');
var keys = require("./keys.js");

var spotify = new Spotify(keys.spotify);



var type = process.argv[2];
var searchTerm = "";

searchTerm = process.argv.slice(3).join(" ")

console.log(searchTerm)
switchType(type, searchTerm )

function switchType(type, searchTerm ){
    console.log("switch")
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
        
        break;

    case "do-what-it-says":
        searchRandom()
       
        console.log(searchTerm)
        break;

    default:
        break;

}
}



function searchConcert() {
    console.log("concert")
    if (searchTerm == "") {
        searchTerm = "Black Amethyst"
    }
   
    
    var queryUrl = 'https://rest.bandsintown.com/artists/'+searchTerm+'/events?app_id=trilogy&date=upcoming'
    console.log(queryUrl)

    
    axios
    .get(queryUrl)
    .then (function (response){
        console.log(response.data[0].venue.name)
        
        console.log(response.data[0].venue.city)
        console.log(response.data[0].venue.region)
        console.log(response.data[0].datetime)


        var logMe = JSON.stringify("Search BandsInTown for: " + searchTerm + " concerts" + "  Venue name: " + response.data[0].venue.name + "  Located in " + response.data[0].venue.city + " " +response.data[0].venue.region + " on " + response.data[0].datetime );
        console.log(logMe)
        fs.appendFile("log.txt", logMe, function (err) {
        if (err) console.log(err);
        
        })

        

    }) 



}

function searchSpotify() {
    console.log("spotify")
    //Artist
    //Song Name
    //link of song from spotify
    //album
    // if none default is "the sign" by ace of base
    var spotify = new Spotify(keys.spotify);

    if(searchTerm == ""){
        searchTerm = "the sign ace of base"
    }
    spotify
    .request("https://api.spotify.com/v1/search?q=" + searchTerm + " &type=track,artist,album&limit=1")
    .then(function(data) {
     
      console.log(data.tracks.items[0].album.artists[0].name)
      console.log(data.tracks.items[0].album.artists[0].external_urls.spotify)
      console.log(data.tracks.items[0].album.name);
      
      var logMe = JSON.stringify("Search Spotify for: " + searchTerm + "  Name: " + data.tracks.items[0].album.artists[0].name  + "  Album: " +data.tracks.items[0].album.name+ "  URL: " + data.tracks.items[0].album.artists[0].external_urls.spotify);
    console.log(logMe)
    fs.appendFile("log.txt", logMe, function (err) {
    if (err) console.log(err);
    
    })
    
});
};

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
                console.log("It's available is in " + response.data.Language)
                if (response.data.Plot == "N/A") {
                    console.log(response.data.Title + " didn't really have a plot")
                } else {

                    console.log(response.data.Plot)
                }
                console.log("Staring " + response.data.Actors)

                var logMe = JSON.stringify("Search OMDB for: " + searchTerm + "  Name: " + response.data.Title  + "  Filmed in " + response.data.Year + "  IMDB rates it at: " + response.data.imdbRating +"  Rotten tomatoes gave " + response.data.Title + " a rating of " + response.data.Ratings[1].Value +"  "+response.data.Title + " was produced in " + response.data.Country +"  It's available is in " + response.data.Language + "  Plot summary: " +response.data.Plot+ "  Staring " + response.data.Actors);
                console.log(logMe)
                fs.appendFile("log.txt", logMe, function (err) {
                if (err) console.log(err);
                
                })


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
    fs.readFile("random.txt", "utf8", function(error, data) {

        // If the code experiences any errors it will log the error to the console.
        if (error) {
          return console.log(error);
        }
      
        // We will then print the contents of data
        console.log(data);
      
        // Then split it by commas (to make it more readable)
        var dataArr = data.split(",");
      
        
        type = dataArr[0];
        searchTerm = dataArr[1].replace(/['"]+/g, '')
        switchType(type, searchTerm )      
      });
}



