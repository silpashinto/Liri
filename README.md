# liri-node-app

LIRI is a Language Interpretation and Recognition Interface. LIRI will be a command line node app that takes in parameters and gives you back data.

### Requirements

Make a Node.js app that depends on user input from the command line
Integrate Bands In Town, Spotify, and OMDb APIs via the appropriate NPM modules
Use API calls and parse through returned JSON objects, outputting them in a specified format
Read commands and queries from file
Logging the data to your terminal/bash window, output the data to a .txt file.

### Technologies Used

Node.js
JavaScript
Bands In Town API(via request npm module)
Spotify API (via spotify npm module)
OMDb API (via axios npm module)

### Code Explanation

Authentication keys for Spotify are stored in "keys.js" and the contents of keys.js file is exported to the main "liri.js" file.
The application interprets the user commands, and it performs the below 4 main functions:
1. prints artist Info
2. Spotify lookup for a song
3. OMDb lookup for a movie, and
4. read command and query from another file.

The program  makes a HTTP request to the Bands In Town API using the request NPM module, and gets back a JSON object that includes everything that the user needs to know about Upcoming concerts of that artist (Venue Name,City and Date).The output is displayed using console.log.

The program also allows the user to make a search to the Spotify API, and gets back a JSON object that includes information (artist(s), song, preview linkand album) of 20 songs related to the user search. The output is displayed using console.log.

The application also provides the facility to search movies. The result lists movie information with the help of OMDb API using the axios NPM module. It returns a JSON object that includes title, year, IMDb rating, language, etc.

The program also reads from a file called "random.text" and executes the command and query found there using string and array methods.

The application logs the ouput to a .txt file called log.txt.

Appropriate comments and error-checking has been added.

[link to Output!](https://youtu.be/HZgnf0JIsM8)
