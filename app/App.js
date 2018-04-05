import React, { Component } from 'react';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import * as reducers from './store/reducers';
import Navigation from './Navigation/Navigation'

const store = createStore(combineReducers(reducers), applyMiddleware(thunk));

export default class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<Navigation />
			</Provider>
		);
	}
}
