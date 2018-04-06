import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as moviesActions from '../store/movies/actions';
import * as moviesSelectors from '../store/movies/reducer';
import MovieList from '../components/MovieList';
import SwipeableList from '../components/SwipeableList';

class HomeScreen extends Component {
	static navigationOptions = {
		title: 'Home'
	}
	
	componentDidMount() {
		this.props.dispatch(moviesActions.fetchMovies());
	}

	_isSelectedToggle = (movieId) => {
		this.props.dispatch(moviesActions.movieIsSelectedToggle(movieId));
	}

	_goToMovie = (movieId) => {
		this.props.navigation.navigate('Movie', {movieId: movieId});
	}

	_setSelected = (movieId, selected) => {
		this.props.dispatch(moviesActions.setSelected(movieId, selected));
	}

	render() {
		return (
			<SwipeableList
				data={this.props.movieListOrderedByRank}
				selectedItems={this.props.selectedMoviesById}
				setSelected={this._setSelected}
			/>
			
		);
	}
}

function mapStateToProps(state) {
	return {
		// @TODO: refactor name to movieListOrderedByRank

		movieListOrderedByRank: moviesSelectors.getMovieListOrderedByRank(state), 
		selectedMoviesById: moviesSelectors.getSelectedMoviesById(state),
	}
}

export default connect(mapStateToProps)(HomeScreen)