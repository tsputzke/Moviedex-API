// Users can search for Movies by genre, country or avg_vote

const express = require('express');
const movies = require('./movies-data-small.json');


const app = express()

// The endpoint is GET /movie
app.get('/movie', function handleGetMovies(req, res) {
  res.json(movies)
})

app.listen(8000, () => {
  console.log(`Server listening at http://localhost:8000`)
})
// The search options for genre, country, and/or average vote are provided in query string parameters.
// When searching by genre, users are searching for whether the Movie's genre includes a specified string. The search should be case insensitive.
// When searching by country, users are searching for whether the Movie's country includes a specified string. The search should be case insensitive.
// When searching by average vote, users are searching for Movies with an avg_vote that is greater than or equal to the supplied number.
// The API responds with an array of full movie entries for the search results
// The endpoint only responds when given a valid Authorization header with a Bearer API token value.
// The endpoint should have general security in place such as best practice headers and support for CORS.

//hint:
// When comparing two numeric strings for greater than or less than, we can "cast" the strings to numbers like so:

// Number('1') === 1
// Number('3') === 3
// Number('6.123') === 6.123