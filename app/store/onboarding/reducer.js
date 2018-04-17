import * as types from './actionTypes';
import Immutable from 'seamless-immutable';

const initialState = Immutable({
    hasOnboarded: false,
});

export default function reduce(state = initialState, action = {}) {
    switch (action.type) {
        case types.UPDATE_HAS_ONBOARDED:
            return {
                ...state, 
                hasOnboarded: action.hasOnboarded
            }
        default:
            return state;
    }
}

// Selectors

export function hasOnboarded(state) {
    return state.onboarding.hasOnboarded
}