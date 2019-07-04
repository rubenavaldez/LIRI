require("dotenv").config();
require("fs")
var keys = require("./keys.js");

var spotify = new Spotify(keys.spotify);

var type = process.argv[2];


switch(type){
    case "concert-this":
        searchConcert()
        break;

        case "spotify-this-song":
            searchSpotify()

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



searchConcert(){
    //"https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp")
    //venue name
    //venue location
}

searchSpotify(){
    //Artist
    //Song Name
    //link of song from spotify
    //album
    // if none default is "the sign" by ace of base
    
}

searchMovie(){
    // title
    // year
    // imdb rating
    // rotten tomatoes rating
    //country where produced 
    //language 
    //plot
    //actors
    // default "Mr. Nobody"
}

searchRandom(){
    //use fs
    //run spotify this song
    //"i want it that way" import from random text
    // test this with movie-this and concert-this
}

//bonus
//write to log.txt
//append not overwrite