import React, { Component } from 'react';
import { View, StatusBar, StyleSheet } from 'react-native';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import * as reducers from './store/reducers';
import Navigation from './navigation/Navigation';

const store = createStore(combineReducers(reducers), applyMiddleware(thunk));

export default class App extends Component {
	render() {
		return (
			<View style={styles.app}>
				<StatusBar barStyle="light-content" />
				<Provider store={store}>
					<Navigation />
				</Provider>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	app: {
		flex: 1,
	}
})