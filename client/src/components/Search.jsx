import React from 'react';
import axios from 'axios';

class Search extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      genres: [],
      currentGenre:"",
    };

    this.getGenres = this.getGenres.bind(this);
    this.handleGenreChange = this.handleGenreChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.getGenres();
  }

  getGenres() {
    //make an axios request in this component to get the list of genres from your endpoint GET GENRES
    axios.get('movies/genres')
    .then((genres) => {
      // console.log(genres);
      this.setState({
        genres: genres.data,
      })
    })
    .catch((err) => {
      console.log('Error getting genres: ', err);
    })
  }

  handleGenreChange(e) {
    if (e.target.value !== "") {
      this.setState({currentGenre: e.target.value});
    }
  }

  handleSubmit() {
    if (this.state.currentGenre) {
      this.props.getMovies(this.state.currentGenre);
    }
  }


  render() {
    return (
      <div className="search">
        <button onClick={() => {this.props.swapFavorites()}}>{this.props.showFaves ? "Show Results" : "Show Favorites"}</button>
        <br/><br/>

        {/* Make the select options dynamic from genres !!! */}
        {/* How can you tell which option has been selected from here? */}

        <select onChange={this.handleGenreChange}>
        <option value="">--Select a Genre--</option>
          {this.state.genres.map((genre, index) => {
            return (<option key={index} value={genre.id}>{genre.name}</option>)
          })}
        </select>
        <br/><br/>

        <button onClick={this.handleSubmit}>Search</button>

      </div>
    );
  }
}

export default Search;