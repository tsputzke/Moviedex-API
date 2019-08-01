require('dotenv').config()
const express = require("express");
const movies = require("./movies-data-small.json");
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const app = express();
app.use(helmet())
app.use(cors())
const morganSetting = process.env.NODE_ENV === 'production' ? 'tiny' : 'common'
app.use(morgan(morganSetting))

app.use(function validateBearerToken(req, res, next) {
  const apiToken = process.env.API_TOKEN
  const authToken = req.get('Authorization')

  if (!authToken || authToken.split(' ')[1] !== apiToken) {
    return res.status(401).json({ error: 'Unauthorized request' })
  }

  next()
})

app.get("/movie", function handleGetMovies(req, res) {
  let response = movies;

  // filter movies by genre if query param is present
  if (req.query.genre) {
    response = movies.filter(movie =>
      movie.genre.toLowerCase().includes(req.query.genre.toLowerCase())
    );
  }

  // filter movies by country if query param is present
  if (req.query.country) {
    response = movies.filter(movie =>
      movie.country.toLowerCase().includes(req.query.country.toLowerCase())
    );
  }

  // filter movies by avg_vote if query param is present (greater than or equal to the supplied number)
  if (req.query.avg_vote) {
    response = movies.filter(movie => {
      if(Number(movie.avg_vote) >= Number(req.query.avg_vote)) {
        return movie
      }
    });
  }

  res.json(response);
});

app.use((error, req, res, next) => {
  let response
  if (process.env.NODE_ENV === 'production') {
    response = { error: { message: 'server error' }}
  } else {
    response = { error }
  }
  res.status(500).json(response)
})

const PORT = process.env.PORT || 8000

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:8000`);
});