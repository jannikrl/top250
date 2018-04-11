import React from 'react';
import * as variables from '../assets/styles/varibales';
import SvgUri from 'react-native-svg-uri';

const headerStyles = {
	headerStyle: {
	  	backgroundColor: variables.backgroundColor.darken(0.25),
	  	borderBottomWidth: 0,  
	},
	headerTintColor: 'white',
	headerTitleStyle: {
	  	fontFamily: variables.fontFamily,
	  	fontSize: 18,
	},
}

export const movieNavigatorOptions = {
	navigationOptions: {
		...headerStyles,
	},
	cardStyle: {
		backgroundColor: variables.backgroundColor
	}
}

export const profileNavigatorOptions = {
	navigationOptions: {
		...headerStyles,
	},
	cardStyle: {
		backgroundColor: variables.backgroundColor
	}
}

export const mainNavigatorOptions = {
	initialRouteName: 'Profile',
	navigationOptions: ({ navigation }) => ({
		tabBarIcon: ({ focused, tintColor }) => {
			const { routeName } = navigation.state;
			let icon;

			const moviesActiveIcon = <SvgUri width={25} height={25} source={require('../assets/images/movies-active.svg')} />;
			const moviesInactiveIcon = <SvgUri width={24} height={24} source={require('../assets/images/movies-inactive.svg')} />;
			const profileActiveIcon = <SvgUri width={23} height={25} source={require('../assets/images/profile-active.svg')} />;
			const profileInactiveIcon = <SvgUri width={23} height={25} source={require('../assets/images/profile-inactive.svg')} />;

			switch (routeName) {
				case 'Home':
					icon = focused ? moviesActiveIcon : moviesInactiveIcon;
					break;
				case 'Profile':
					icon = focused ? profileActiveIcon : profileInactiveIcon;
					break;
			}			

			return icon;
		},
	}),
	tabBarOptions: {
		activeTintColor: variables.primaryColor,
		inactiveTintColor: '#c1c1c1',
		style: {
			backgroundColor: variables.backgroundColor.darken(0.25),
		},
		labelStyle: {
			fontFamily: variables.fontFamily,
			fontSize: 10.5,
			fontWeight: '700',
		}
	}
}