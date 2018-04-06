import React, { Component } from 'react';
import {
	Text,
	View,
	Button,
} from 'react-native';
import { connect } from 'react-redux';
import * as moviesSelectors from '../store/movies/reducer'

class ProfileScreen extends React.Component {
	static navigationOptions = {
		title: 'Profile'
	}

	render() {
		// @TODO: Move to a 'dumb' component
		return (
			<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
				<Text>Movies you have watched</Text>
				<Text style={{ fontSize: 24 }}>
					{JSON.stringify(this.props.selectedMoviesCount)}/
          			{JSON.stringify(this.props.moviesCount)}
				</Text>
			</View>
		);
	}
}

function mapStateToProps(state) {
	return {
		moviesCount: moviesSelectors.getMoviesCount(state),
		selectedMoviesCount: moviesSelectors.getSelectedMoviesCount(state),
	}
}

export default connect(mapStateToProps)(ProfileScreen);