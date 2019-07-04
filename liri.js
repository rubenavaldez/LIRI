require("dotenv").config();

var keys = require("./keys.js");
var fs = require("fs")
var axios = require("axios");

// require spotify
// var spotify = new Spotify(keys.spotify);

var type = process.argv[2];
var searchTerm = "";

function search(){
for ( i = 3; i < process.argv.length; i++ ){
    searchTerm = searchTerm + " " + process.argv[i]
    
}
};


search();
console.log(searchTerm)

switch(type){
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
            console.log(searchTerm)
        break;

        case "do-what-it-says":
            searchRandom()
            console.log(searchTerm)
        break;

        default:
            break;
        
}



function searchConcert(){
    console.log("concert")
    
    //"https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp")
    //venue name
    //venue location
}

function searchSpotify(){
    console.log("spotify")
    //Artist
    //Song Name
    //link of song from spotify
    //album
    // if none default is "the sign" by ace of base
    
}

function searchMovie(){
    console.log("movie")
    if(searchTerm == ""){
        searchTerm = "Mr. Nobody"
    }
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


// This line is just to help us debug against the actual URL.
console.log(queryUrl);





axios.get(queryUrl)

.then(
  function(response) {
      console.log(response.data)
      console.log(response.data.Title)
      console.log("Filmed in " + response.data.Year)
      console.log("IMDB rates it at: " + response.data.imdbRating);
      if(response.data.Ratings[1] != undefined){
        console.log("Rotten tomatoes gave " + response.data.Title + " a rating of " + response.data.Ratings[1].Value)    
        }     
      
      console.log(response.data.Title + " was produced in " + response.data.Country)
      console.log("It's available is " + response.data.Language)
      if(response.data.Plot == "N/A"){
          console.log(response.data.Title + " didn't really have a plot")
      } else{

      console.log(response.data.Plot)
      }
      console.log("Staring " + response.data.Actors)
       

    

  })
  .catch(function(error) {
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

function searchRandom(){
    console.log("random")
    //use fs
    //run spotify this song
    //"i want it that way" import from random text
    // test this with movie-this and concert-this
}

//bonus
//write to log.txt
//append not overwrite

