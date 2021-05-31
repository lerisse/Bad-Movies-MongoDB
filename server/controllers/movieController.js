const movieModel = require('../models/movieModel.js');
const apiHelpers = require('../helpers/apiHelpers.js');

/*
Use the routes below to build your application:

|      URL         | HTTP Verb |  Result                                                     |
| :------------:   | :-------: |------------------------------------------------------:      |
|     /genres      |   GET     |  Respond with JSON of all genres                            |
|     /search      |   GET     |  Respond with JSON of all movies by the selected genre      |
|     /save        |   POST    |  Save selected movie as favorite                            |
|     /delete      |   POST    |  Remove selected movie as favorite                          |

*/

//Return requests to the client
module.exports = {
  getSearch: (req, res) => {
    // get the search genre
    //ID of genre needs to be passed in
    // console.log('Genre Search Reqest Id',req.query.genre)
    apiHelpers.getMovies(req.query.genre)
    .then((movies) => {
      // console.log(movies);
      res.status(200);
      res.send(movies.data.results)
    })
    .catch((err) => {
      console.log('Error', err)
      res.status(500);
      res.send(err);
    })

  },

  getGenres: (req, res) => {
    apiHelpers.getGenres()
    .then((genres) => {
      res.status(200);
      res.send(genres.data.genres);
    })
    .catch((err) => {
      res.status(500);
      res.send(err);
    })
  },

  saveMovie: (req, res) => {
    // console.log('Controller Request', req.body.params);
    movieModel.save(req.body.params.movie)
    .then(() => {
      console.log('Added to Favs')
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log('Already in Favs', err);
      res.sendStatus(501)
    })
  },


  deleteMovie: (req, res) => {
    // console.log('Delete Request',req.body.params.id);
    movieModel.delete(req.body)
    // .then(() => {
    //   console.log('Deleted from Favs')
    //   res.sendStatus(200)
    // })
    // .catch((err) => {
    //   console.log('Unable to delete from Favs');
    //   res.sendStatus(501);
    // })
  },

  getFavorites: (req, res) => {
    movieModel.getAll()
    .then((favs) => {
      console.log('Got Favs')
      res.status(200)
      res.send(favs)
    })
    .catch((err) => {
      console.log('Unable to get Favs');
      res.sendStatus(501);
    })
  }
}

// app.get("/genres", function(req, res) {
//   // make an axios request to get the official list of genres from themoviedb
//   // use this endpoint. you will need your API key from signup: https://api.themoviedb.org/3/genre/movie/list
// });

// app.get("/search", function(req, res) {
//   // use this endpoint to search for movies by genres (using API key): https://api.themoviedb.org/3/discover/movie
//   // and sort them by votes (worst first) using the search parameters in themoviedb API
//   // do NOT save the results into the database; render results directly on the page
// });

// app.post("/save", function(req, res) {
//   //save movie as favorite into the database
// });

// app.post("/delete", function(req, res) {
//   //remove movie from favorites into the database
// });
