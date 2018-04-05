import React from 'react';
import { StackNavigator, TabNavigator } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import MovieScreen from '../screens/MovieScreen';

const ProfileNavigator = StackNavigator({
	Profile: ProfileScreen,
})

const MovieNavigator = StackNavigator({
	Movies: HomeScreen,
	Movie: MovieScreen,
})

const MainNavigator = TabNavigator({
	Home: MovieNavigator,
	Profile: ProfileNavigator,
}, {
	navigationOptions: ({ navigation }) => ({
		tabBarIcon: ({ focused, tintColor }) => {
			const { routeName } = navigation.state;
			let iconName;
			if (routeName === 'Home') {
				iconName = `ios-home${focused ? '' : '-outline'}`;
			} else if (routeName === 'Profile') {
				iconName = `ios-person${focused ? '' : '-outline'}`;
			}

			return <Ionicons name={iconName} size={25} color={tintColor} />;
		},
	}),
})

export default MainNavigator;