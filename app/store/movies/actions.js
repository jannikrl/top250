import _ from 'lodash';
import * as types from './actionTypes';
import ImdbService from '../../services/imdb';

export function fetchMovies() {
	return async (dispatch, getState) => {
		try {
			const moviesById = await ImdbService.getMovies();

			// @TODO save moviesById and moviesTopIdList

			dispatch({ type: types.MOVIES_FETCHED, moviesById });
		} catch (error) {
			console.error(error);
		}
	};
}
