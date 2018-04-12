import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet } from 'react-native';
import * as moviesActions from '../store/movies/actions';
import * as moviesSelectors from '../store/movies/reducer';
import Main from '../components/home-screen/Main';


class HomeScreen extends Component {
	static navigationOptions = {
		title: 'Top 250'
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
			<Main 
				movieList={this.props.movieListOrderedByRank}
				selectedMoviesById={this.props.selectedMoviesById}
				setSelected={this._setSelected}
				onPressItem={this._goToMovie}
			/>
		);
	}
}

function mapStateToProps(state) {
	return {
		movieListOrderedByRank: moviesSelectors.getMovieListOrderedByRank(state), 
		selectedMoviesById: moviesSelectors.getSelectedMoviesById(state),
	}
}

export default connect(mapStateToProps)(HomeScreen)