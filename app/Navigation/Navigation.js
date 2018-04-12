import React from 'react';
import { StackNavigator, TabNavigator } from 'react-navigation';
import HomeScreen from '../containers/HomeScreen';
import ProfileScreen from '../containers/ProfileScreen';
import MovieScreen from '../containers/MovieScreen';
import * as options from './navigationOptions'

const ProfileNavigator = StackNavigator({
	Profile: ProfileScreen,
},
	options.profileNavigatorOptions
)

const MovieNavigator = StackNavigator({
	Movies: HomeScreen,
	Movie: MovieScreen,
},
	options.movieNavigatorOptions
)

const MainNavigator = TabNavigator({
	Home: {
		screen: MovieNavigator,
		navigationOptions: ({ navigation }) => ({
			title: 'Top 250'
		}),
	},
	Profile: {
		screen: ProfileNavigator,
		navigationOptions: ({ navigation }) => ({
			title: 'My stats'
		}),
	}
}, 
	options.mainNavigatorOptions
)

export default MainNavigator;