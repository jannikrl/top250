import _ from 'lodash';
import * as types from './actionTypes';
import * as moviesSelectors from './reducer';
import ImdbService from '../../services/imdb';

export function fetchMovies() {
	return async (dispatch, getState) => {
		try {
			const movies = await ImdbService.getMovies();
			const moviesById = _.keyBy(movies, movie => movie.id);			
			dispatch({ type: types.MOVIES_FETCHED, moviesById });
		} catch (error) {
			console.error(error);
		}
	};
}

export function movieHasSeenToggle(movieId) {
	return (dispatch, getState) => {
		const moviesById = moviesSelectors.getMoviesById(getState());
		const movie = moviesById[movieId];
		const newValue = !_.get(movie, 'isSelected');
		dispatch({ type: types.MOVIE_SELECTION_TOGGLE, movieId, newValue});
	}
}
