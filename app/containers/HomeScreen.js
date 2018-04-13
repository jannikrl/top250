import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { StyleSheet } from 'react-native';
import * as moviesActions from '../store/movies/actions';
import * as moviesSelectors from '../store/movies/reducer';
import * as onboardingActions from '../store/onboarding/actions';
import * as onboardingSelectors from '../store/onboarding/reducer';
import Main from '../components/home-screen/Main';


class HomeScreen extends PureComponent {
	static navigationOptions = {
		title: 'Top 250'
	}
	
	componentDidMount() {
		this.props.dispatch(moviesActions.fetchMovies());
	}

	_goToMovie = (movieId) => {
		this.props.navigation.navigate('Movie', {movieId: movieId});
	}

	_setSelected = (movieId, selected) => {
		this.props.dispatch(moviesActions.setSelected(movieId, selected));
    }
    
    _updateHasOnboarded = (hasOnboarded) => {
        this.props.dispatch(onboardingActions.updateHasOnboarded(hasOnboarded));
    }

	render() {
		return (
			<Main 
				movieList={this.props.movieListOrderedByRank}
				selectedMoviesById={this.props.selectedMoviesById}
				setSelected={this._setSelected}
                onPressMovie={this._goToMovie}
                updateHasOnboarded={this._updateHasOnboarded}
                hasOnboarded={this.props.hasOnboarded}
			/>
		);
	}
}

function mapStateToProps(state) {
    console.log(state);

	return {
		movieListOrderedByRank: moviesSelectors.getMovieListOrderedByRank(state), 
        selectedMoviesById: moviesSelectors.getSelectedMoviesById(state),
        hasOnboarded: onboardingSelectors.hasOnboarded(state),
	}
}

export default connect(mapStateToProps)(HomeScreen)