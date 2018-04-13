import _ from 'lodash';
import * as types from './actionTypes';

export function updateHasOnboarded(hasOnboarded) {
    return { type: types.UPDATE_HAS_ONBOARDED, hasOnboarded }
}