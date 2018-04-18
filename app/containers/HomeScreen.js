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
            headerRight: <HeaderRight goToFilterScreen={() => navigation.navigate('Filter')} />,
        }
	}
	
	componentDidMount() {
        // Load movies from file for quick response
        if (!this.props.movieList.length) {
            this.props.loadMoviesFromFile();
        }

        // Update movie list from API
		this.props.fetchMoviesFromApi;
	}

	_setSelected = (movieId, selected) => {
		this.props.setSelected(movieId, selected);
    }
    
    _updateHasOnboarded = (hasOnboarded) => {
        this.props.updateHasOnboarded(hasOnboarded);
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

const mapStateToProps = (state) => ({
    movieList: moviesSelectors.getMovieList(state), 
    selectedMoviesById: moviesSelectors.getSelectedMoviesById(state),
    hasOnboarded: onboardingSelectors.hasOnboarded(state),
})

const mapDispatchToProps = (dispatch) => ({
    loadMoviesFromFile: () => dispatch(moviesActions.loadMoviesFromFile()),
    fetchMoviesFromApi: () => dispatch(moviesActions.fetchMoviesFromApi()),
    setSelected: (movieId, selected) => dispatch(moviesActions.setSelected(movieId, selected)),
    updateHasOnboarded: (hasOnboarded) => dispatch(onboardingActions.updateHasOnboarded(hasOnboarded)),
})

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)