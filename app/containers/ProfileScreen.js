import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as moviesSelectors from '../store/movies/reducer';
import Main from '../components/profile-screen/Main';

class ProfileScreen extends React.Component {
	static navigationOptions = {
		title: 'My stats'
	}

	render() {
		return (
			<Main 
				moviesCount={this.props.moviesCount} 
				selectedMoviesCount={this.props.selectedMoviesCount} 
			/>
		)
	}
}

const mapStateToProps = (state) => ({
    moviesCount: moviesSelectors.getMoviesCount(state),
    selectedMoviesCount: moviesSelectors.getSelectedMoviesCount(state),
})

export default connect(mapStateToProps)(ProfileScreen);