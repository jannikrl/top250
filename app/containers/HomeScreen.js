import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Button, StyleSheet } from 'react-native';
import * as moviesActions from '../store/movies/actions';
import * as moviesSelectors from '../store/movies/reducer';
import * as onboardingActions from '../store/onboarding/actions';
import * as onboardingSelectors from '../store/onboarding/reducer';
import Main from '../components/home-screen/Main';
import HeaderRight from '../components/home-screen/HeaderRight';


class HomeScreen extends PureComponent {
	static navigationOptions = ({ navigation }) => {
        return {
            title: 'Top 250',
            headerRight: <HeaderRight goToFilter={() => navigation.navigate('Filter')} />,
        }
	}
	
	componentDidMount() {
        // Load movies from file for quick response
        if (!this.props.movieList.length) {
            this.props.dispatch(moviesActions.loadMoviesFromFile());
        }

        // Update movie list from API
		this.props.dispatch(moviesActions.fetchMoviesFromApi());
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
				movieList={this.props.movieList}
				selectedMoviesById={this.props.selectedMoviesById}
				setSelected={this._setSelected}
                updateHasOnboarded={this._updateHasOnboarded}
                hasOnboarded={this.props.hasOnboarded}
			/>
		);
	}
}

function mapStateToProps(state) {
	return {
		movieList: moviesSelectors.getMovieList(state), 
        selectedMoviesById: moviesSelectors.getSelectedMoviesById(state),
        hasOnboarded: onboardingSelectors.hasOnboarded(state),
	}
}

export default connect(mapStateToProps)(HomeScreen)