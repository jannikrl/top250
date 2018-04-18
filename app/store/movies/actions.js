import _ from 'lodash';
import * as types from './actionTypes';
import * as moviesSelectors from './reducer';
import ImdbService from '../../services/ImdbService';

export function loadMoviesFromFile() {
    return (dispatch, getState) => {
        const movies = ImdbService.getMoviesFromFileSystem();			
        const moviesById = _.keyBy(movies, movie => movie.id);
        dispatch({ type: types.MOVIES_LOAD_SUCCESS, moviesById });
    }
}

export function fetchMoviesFromApi() {
	return async (dispatch, getState) => {
        dispatch({ type: types.MOVIES_FETCH_REQUEST });

        try {
			const movies = await ImdbService.getMoviesFromApi();			
			const moviesById = _.keyBy(movies, movie => movie.id);
            dispatch({ type: types.MOVIES_FETCH_SUCCESS, moviesById });
		} catch (error) {
			dispatch({ type: types.MOVIES_FETCH_FAILURE });
		}
	};
}

export function setSelected(movieId, selected) {
    return { type: types.MOVIE_SET_SELECTED, movieId, selected };
}

export function setCurrentFilter(filter) {
    return { type: types.MOVIE_SET_FILTER, filter };
}