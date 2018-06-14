require( "dotenv" ).config();
var Twitter = require( "twitter" );
var Spotify = require( "node-spotify-api" );
var request = require( 'request' );
var fs = require( "fs" );


var keys = require( "./keys.js" );

var spotify = new Spotify( keys.spotify );
var client = new Twitter( keys.twitter );

var parameter = '';

var command = process.argv[2];
for ( var i = 3; i < process.argv.length; i++ ) {
    parameter += process.argv[i] + " ";
}


if ( command === "my-tweets" ) {

    console.log( "\n\n\nSEARCHING TWITTER\n\n\n" );

    console.log( "Results:" )

    client.get( 'search/tweets', { q: 'Nathan80483309' }, function ( error, tweets, response ) {
        for ( var n = 0; n < 19; n++ ) {
            if ( tweets.statuses[n] != undefined ) {
                console.log( "-------------------------" );
                console.log( "Tweet " + ( n + 1 ) + ": " + tweets.statuses[n].text );
                console.log( "Created on: " + tweets.statuses[n].created_at );
            }
        }

    } );
    console.log( "-------------------------" );

}

if ( command === "spotify-this-song" ) {
    console.log( "\n\nSPOTIFY THIS SONG" );
    console.log( "-------------------------" );

    song( parameter );

}
if ( command === "movie-this" ) {
    if ( parameter !== '' ) {
        var movieName = parameter;
    }
    else {
        var movieName = "Mr.Nobody";
    } var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

    // This line is just to help us debug against the actual URL.
    console.log( queryUrl );

    request( queryUrl, function ( error, response, body ) {
        console.log( "\n\nMOVIE THIS" );
        console.log( "-------------------------" );

        if ( !error && response.statusCode === 200 ) {
            console.log( "-------------------------" );
            console.log( "Title : " + JSON.parse( body ).Title );
            console.log( "Release Year: " + JSON.parse( body ).Year );
            console.log( "IMDB Rating: " + JSON.parse( body ).imdbRating );
            console.log( "Rotten Tomatoes Rating: " + JSON.parse( body ).Ratings[1].Value );
            console.log( "Country Produced: " + JSON.parse( body ).Country );
            console.log( "Language: " + JSON.parse( body ).Language );
            console.log( "Plot: " + JSON.parse( body ).Plot );
            console.log( "Actors: " + JSON.parse( body ).Actors );
            console.log( "-------------------------\n\n" );


            // console.log(JSON.parse(body));
        }
    } );

}
if ( command === "do-what-it-says" ) {
    fs.readFile( "./random.txt", "utf8", function ( error, data ) {

        // If the code experiences any errors it will log the error to the console.
        if ( error ) {
            return console.log( error );
        }

        // We will then print the contents of data
        // console.log( data );

        // Then split it by commas (to make it more readable)
        var dataArr = data.split( "," );
        // We will then re-display the content as an array for later use.
        var str = dataArr[1];
        console.log( "\n\nDO WHAT IT SAYS" );
        console.log( "-------------------------" );

        song( str );
    }
    )
};


function song( parameter ) {
    if ( parameter !== '' ) {
        var songName = parameter;
    }
    else {
        var songName = "The Sign";
    }
    spotify.search( { type: 'track', query: songName }, function ( err, data ) {
        if ( err ) {
            return console.log( 'Error occurred: ' + err );
        }
        console.log( "-------------------------" );
        console.log( "Artist: " + data.tracks.items[0].artists[0].name );
        console.log( "Song Name: " + data.tracks.items[0].name );
        console.log( "Album: " + data.tracks.items[0].album.name );
        console.log( "Preview link: " + data.tracks.items[0].external_urls.spotify );
        console.log( "-------------------------\n\n" );

    } );
}