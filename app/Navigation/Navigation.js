import React from 'react';
import { StackNavigator, TabNavigator } from 'react-navigation';
import HomeScreen from '../containers/HomeScreen';
import ProfileScreen from '../containers/ProfileScreen';
import FilterScreen from '../containers/FilterScreen';
import * as options from './navigationOptions'

const ProfileNavigator = StackNavigator({
	Profile: ProfileScreen,
}, {
    ...options.profileNavigatorOptions
})

const MovieNavigator = StackNavigator({
	Movies: HomeScreen,
}, {
    ...options.movieNavigatorOptions
})

const MainNavigator = TabNavigator({
	Home: {
		screen: MovieNavigator,
		navigationOptions: () => ({
			title: 'Top 250'
		}),
	},
	Profile: {
		screen: ProfileNavigator,
		navigationOptions: () => ({
			title: 'My stats'
		}),
	}
}, {
    ...options.mainNavigatorOptions
})

const RootNavigator = StackNavigator({
    Main: MainNavigator,
    Filter: FilterScreen,
}, {
    mode: 'modal',
    headerMode: 'none',
})

export default RootNavigator;