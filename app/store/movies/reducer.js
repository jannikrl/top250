import _ from 'lodash';
import * as types from './actionTypes';
import Immutable from 'seamless-immutable';
import update from 'immutability-helper';

const initialState = Immutable({
  moviesById: undefined,
  selectedMoviesById: {},
});

export default function reduce(state = initialState, action = {}) {
  switch (action.type) {
    case types.MOVIES_FETCHED:
      return {
        ...state, 
        moviesById: action.moviesById
      };
    case types.MOVIE_SET_SELECTED:
      return {
        ...state,
        selectedMoviesById: {
          ...state.selectedMoviesById,
          [action.movieId]: action.selected, 
        }
      }
    default:
      return state;
  }
}

// selectors

export function getMovie(state, movieId) {
  return state.movies.moviesById[movieId];
}

export function getMoviesById(state) {
  return state.movies.moviesById;
}

export function getMovieListOrderedByRank(state) {
  const movieList = _.values(state.movies.moviesById);
  return _.orderBy(movieList, ['rank']);
}

export function getMoviesCount(state) {
  return _.keys(state.movies.moviesById).length
}

export function getSelectedMoviesById(state) {
  return state.movies.selectedMoviesById;
}

export function getSelectedMoviesCount(state) {
  const selectedMoviesById = getSelectedMoviesById(state);
  return _.filter(selectedMoviesById, (isSelected) => isSelected).length;
}