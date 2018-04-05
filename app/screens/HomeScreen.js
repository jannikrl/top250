import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
	Text,
	View,
	Button,
} from 'react-native';
import * as moviesActions from '../store/movies/actions';
import * as moviesSelectors from '../store/movies/reducer';
import MovieList from '../components/MovieList';

class HomeScreen extends Component {
	static navigationOptions = {
		title: 'Hjem'
	}
	
	componentDidMount() {
		this.props.dispatch(moviesActions.fetchMovies());
	}

	_hasSeenToggle = (movieId) => {
		this.props.dispatch(moviesActions.movieHasSeenToggle(movieId));
	}

	render() {
		return (
			<MovieList 
				data={this.props.moviesTopList}
				hasSeenToggle={this._hasSeenToggle}
			/>
		);
	}
}

function mapStateToProps(state) {
	return {
		moviesTopList: moviesSelectors.getMoviesTopList(state)
	}
}

export default connect(mapStateToProps)(HomeScreen)