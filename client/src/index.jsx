import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import axios from 'axios';
// import AnyComponent from './components/filename.jsx'
import Search from './components/Search.jsx'
import Movies from './components/Movies.jsx'

class App extends React.Component {
  constructor(props) {
  	super(props)
  	this.state = {
      movies: [],
      favorites: [],
      showFaves: false,
    };

    // you might have to do something important here!
    this.getMovies = this.getMovies.bind(this);
    this.saveMovie = this.saveMovie.bind(this);
    this.deleteMovie = this.deleteMovie.bind(this);
    this.getFavorites = this.getFavorites.bind(this);
    this.swapFavorites = this.swapFavorites.bind(this);
  }

  componentDidMount() {
    this.getFavorites();
  }

  getMovies(genre) {
    // make an axios request to your server on the GET SEARCH endpoint
    axios.get('movies/search', {params: {genre: genre}})
    .then((movies) => {
      // console.log(movies)
      this.setState({
        movies: movies.data
      })
    }).catch((err) => {
      console.log(err);
    })
  }

  saveMovie(movie) {
    // same as above but do something diff
    axios.post('/movies/save', {params: {movie: movie}})
    .then(() => {
      this.getFavorites();
    }).catch((err) => {
      console.log('This movie is already saved in your favs', err);
    })
  }

  deleteMovie(movie) {
    // same as above but do something diff
    console.log('DeleteMovie Inbex',movie)
    axios.post('/movies/delete', {params: {movie: movie}})
    .then(() => {
      this.getFavorites();
    })
    .catch((err) => {
      console.error(err);
    });
  }

  getFavorites() {
    axios.get('/movies/favorites')
      .then((favs) => {
        console.log(favs)
        this.setState({favorites: favs.data});
      })
      .catch((err) => {
        console.error(err);
      });
  }

  swapFavorites() {
  //dont touch
    this.setState({
      showFaves: !this.state.showFaves
    });
  }

  render () {
  	return (
      <div className="app">
        <header className="navbar"><h1>Bad Movies</h1></header>

        <div className="main">
          <Search swapFavorites={this.swapFavorites} showFaves={this.state.showFaves} getMovies={this.getMovies}/>
          <Movies movies={this.state.showFaves ? this.state.favorites : this.state.movies} showFaves={this.state.showFaves} saveMovie={this.saveMovie} deleteMovie={this.deleteMovie}/>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));