import _ from 'lodash';
import * as types from './actionTypes';
import Immutable from 'seamless-immutable';

const initialState = Immutable({
  moviesById: undefined,
  selectedMoviesById: {},
  currentFilter: 'ALL_MOVIES',
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
    case types.MOVIE_SET_FILTER: {
        return {
            ...state,
            currentFilter: action.filter
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

export function getMovieList(state) {
    const currentFilter = state.movies.currentFilter;
    const selectedMoviesById = state.movies.selectedMoviesById;
    const moviesById = state.movies.moviesById;
    
    let movieList = [];

    switch (currentFilter) {
        case 'ALL_MOVIES':
            movieList = _.values(moviesById)
            break;
        case 'SELECTED_MOVIES':
            movieList = _.filter(_.values(moviesById), (movie) => selectedMoviesById[movie.id]);
            break;
        case 'NOT_SELECTED_MOVIES':
            movieList = _.filter(_.values(moviesById), (movie) => !selectedMoviesById[movie.id]);
            break;
    }

    return _.orderBy(movieList, ['rank']);
}

export function getMoviesCount(state) {
    return _.keys(state.movies.moviesById).length
}

export function getSelectedMoviesById(state) {
    return state.movies.selectedMoviesById;
}

export function getSelectedMoviesCount(state) {
    const selectedMoviesById = state.movies.selectedMoviesById;
    return _.filter(selectedMoviesById, (isSelected) => isSelected).length;
}

export function getCurrentFilter(state) {
    return state.movies.currentFilter;
}