import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
	Text,
	View,
	Button,
} from 'react-native';
import * as moviesActions from '../store/movies/actions';
import * as moviesSelectors from '../store/movies/reducer';

class HomeScreen extends Component {
	static navigationOptions = {
		title: 'Hjem'
	}
	
	componentDidMount() {
		this.props.dispatch(moviesActions.fetchMovies());
	}

	render() {
		let length = (this.props.moviesById) ? JSON.stringify(this.props.moviesById.length) : 'Loading...';

		return (
			<View>
				<Text>
					Home Screen {length}
        		</Text>
				<Button
					title="Go to movie"
					onPress={() => {this.props.navigation.navigate('Movie', {
						movieId: 89,
						title: 'Matrix',
					})}} />
			</View>
		);
	}
}

function mapStateToProps(state) {
	return {
		moviesById: moviesSelectors.getMoviesById(state)
	}
}

export default connect(mapStateToProps)(HomeScreen)