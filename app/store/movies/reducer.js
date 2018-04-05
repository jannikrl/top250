import _ from 'lodash';
import * as types from './actionTypes';
import Immutable from 'seamless-immutable';
import update from 'immutability-helper';

const initialState = Immutable({
  moviesById: undefined,
});

export default function reduce(state = initialState, action = {}) {
  switch (action.type) {
    case types.MOVIES_FETCHED:
      return {
        ...state, 
        moviesById: action.moviesById
      };
    case types.MOVIE_SELECTION_TOGGLE:
      return {
        ...state, 
        moviesById: {
          ...state.moviesById,
          [action.movieId]: {
            ...state.moviesById[action.movieId],
            isSelected: action.newValue
          }
        }
      };
    default:
      return state;
  }
}

// selectors

export function getMoviesById(state) {
  return state.movies.moviesById;
}

export function getMoviesTopList(state) {
  const movieList = _.values(state.movies.moviesById);
  return _.orderBy(movieList, ['rank']);
}