import _ from 'lodash';
import * as types from './actionTypes';
import * as moviesSelectors from './reducer';
import ImdbService from '../../services/imdb';

export function fetchMovies() {
	return async (dispatch, getState) => {
		try {
			const moviesCount = moviesSelectors.getMoviesCount(getState());
				
			// Load movies from file system for quick response
			if (!moviesCount) {
				const movies = await ImdbService.getMoviesFromFileSystem();			
				const moviesById = _.keyBy(movies, movie => movie.id);
				dispatch({ type: types.MOVIES_FETCHED, moviesById });
			}

			// Update list using API
			const movies = await ImdbService.getMoviesFromApi();			
			const moviesById = _.keyBy(movies, movie => movie.id);
			dispatch({ type: types.MOVIES_FETCHED, moviesById });
		} catch (error) {
			console.error(error);
		}
	};
}

export function setSelected(movieId, selected) {
	return { type: types.MOVIE_SET_SELECTED, movieId, selected};
}
