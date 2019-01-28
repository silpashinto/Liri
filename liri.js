require("dotenv").config();

//Import the Spotify API , Axios ,request, moment, files
var Spotify = require('node-spotify-api');
var axios = require("axios");
var request = require('request');
var moment = require('moment');
var fs = require('fs');

//Import our Keys File
var keys = require('./keys');

//Create a Spotify Client
var spotify = new Spotify(keys.spotify);

//variable declaration
var inputCommand;
var inputString;

if (process.argv[2] && !process.argv[3]) {

    inputCommand = process.argv[2];
    inputString = '';
    init(inputCommand, inputString);
}
else if (process.argv[2] && process.argv[3]) {

    inputCommand = process.argv[2];
    inputString = process.argv[3];
    //inital function call
    init(inputCommand, inputString);
}
else {

    inputCommand = '';
    inputString = '';
    init(inputCommand, inputString);
}

// Function init
function init(cmdparam, strparam) {

    switch (cmdparam) {

        case 'concert-this':
            concertThis(strparam);
            break;

        case 'spotify-this-song':
            spotifyThisSong(strparam);
            break;

        case 'movie-this':
            var parameter;
            if (strparam) parameter = strparam;
            else parameter = 'Mr.Nobody';
            movieTthis(parameter);
            break;

        case 'do-what-it-says':
            doWhatItSays();
            break;

        default:
            console.log('No arguments');
    }

}

//Function to get concert information using Bands In Town API
function concertThis(param) {

    var artist = param;
    var ouput = '';
    if (artist) {
        request("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp", function (error, response, body) {

            var body = JSON.parse(body);
            var ouput = '';
            ouput += "Upcoming concerts for " + artist + ": \n-----------------------------------\n";
            for (var set in body) {
                var date = moment(body[set].datetime).format("MM/DD/YYYY");
                ouput += body[set].venue.city + ", " + "at " + body[set].venue.name + ", " + "on " + date + '\n';
            }
            ouput += "-------------------------------------\n";
            console.log(ouput);

            logData('concert-this', param, ouput);
        });
    }
    else {
        console.log('Missig Argument');
    }
}

//Function Node Spotify API 
function spotifyThisSong(param) {
    if (param) {
        var ouput = '';
        var arrAr = '';
        spotify
            .search({ type: 'track', query: param, limit: 20 })
            .then(function (response) {
                var items = response.tracks.items;
                var artistsArr = [];
                ouput += "SONG DETAILS \n-------------------------------------\n";

                for (var j = 0; j < items.length; j++) {

                    artistsArr = items[j].artists;

                    for (var i = 0; i < artistsArr.length; i++) {

                        arrAr += artistsArr[i].name + ',';

                    }
                    ouput += ' * Artist(s) : ' + arrAr + '\n';
                    ouput += " * Song's name : " + items[j].name + '\n';
                    ouput += " * Preview link : " + items[j].preview_url + '\n';
                    ouput += " * Album : " + items[j].album.name + '\n';
                    ouput += "-------------------------------------\n";
                    console.log(ouput);
                }
                logData('spotify-this-song', param, ouput);


            })
            .catch(function (err) {
                console.log(err);
            });
    } else {
        console.log('Missig Argument');
    }

}

// Function Axios
function movieTthis(param) {

    var movieName = param;
    var ouput = '';
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
    axios.get(queryUrl).then(

        function (response) {

            var result = response.data;
            var ratings = result.Ratings;
            ouput = 'MOVIE DETAILS\n----------------------\n * Title : ' + result.Title + '\n * Year : '
                + result.Year + '\n * IMDB Rating : ' + result.imdbRating+'\n';
            Object.keys(ratings).forEach(function (key) {

                if (ratings[key].Source === 'Rotten Tomatoes') {
                    ouput += ' * ' + ratings[key].Source + ' Rating : ' + ratings[key].Value;

                }
            });
            ouput += '\n * Country : ' + result.Country + '\n * Languages : ' + result.Language + '\n * Actors : ' + result.Actors + '\n * Plot : '
                + result.Plot + '\n-------------------------------\n';
            console.log(ouput);
            logData('movie-this', param, ouput);

        }).catch(function (err) {
            console.log(err);
        });

}

//Function to execute the command in random.txt file
function doWhatItSays() {

    //read file
    fs.readFile('random.txt', 'utf8', function (err, contents) {

        if (err) return console.log(err);
        //split contents
        var textsInside = contents.split(",");

        //get the command and string attached to the command
        var cmdP = textsInside[0];
        var strP = textsInside[1];

        //execute the command
        init(cmdP, strP);

    });

}

function logData(cmdparam, strparam, data) {

    fs.appendFile('log.txt', cmdparam + ' ,"' + strparam + '"\n' + data, function (err) {
        if (err) throw err;
        console.log('logged');
    });
}




