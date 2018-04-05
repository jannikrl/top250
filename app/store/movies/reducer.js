import _ from 'lodash';
import * as types from './actionTypes';
import Immutable from 'seamless-immutable';

const initialState = Immutable({
  moviesById: undefined,
});

export default function reduce(state = initialState, action = {}) {
  switch (action.type) {
    case types.MOVIES_FETCHED:
      return state.merge({
        moviesById: action.moviesById
      });
    default:
      return state;
  }
}

// selectors

export function getMoviesById(state) {
  return state.movies.moviesById;
}

export function getMoviesIdArray(state) {
  return _.keys(state.movies.moviesById);
}