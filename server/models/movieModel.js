//Select one db to work with:

//For SQL
const sqlDb = require('../../db/sql');
//For Mongo
const mongoDb = require('../../db/mongodb')
const mongoose = require('mongoose');

// id = id
// title = title
// genres = genre_ids
// poster = poster_path
// rating = vote_average
// year = release_date

const movieSchema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true,
  },
  title: String,
  genres: Array,
  poster: String,
  rating: Number,
  year : Number,
});

const Movies = mongoose.model('Movie', movieSchema);


module.exports = {
  save : (movie) => {
    // console.log('Movie in Model', movie);
      return Movies.create(
        {
          id: movie.id,
          title: movie.title,
          genres: movie.genre_ids,
          poster: movie.poster_path,
          rating: movie.vote_average,
          year: movie.release_data
        }
      )
  },

  delete : (movie) => {
    console.log('Model Delete Movie id', movie.params.movie.id);

    const query = { "id": JSON.stringify(movie.params.movie.id) };
    Movies.deleteOne(query)
      .then(result => console.log(`Deleted ${result.deletedCount} item.`))
      .catch(err => console.error(`Delete failed with error: ${err}`))
  },

  getAll : () => {
    return Movies.find({});
  },
}