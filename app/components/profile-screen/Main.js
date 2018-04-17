import React, { PureComponent } from 'react';
import { View, Button, Dimensions, StyleSheet } from 'react-native';
import { ProgressCircle }  from 'react-native-svg-charts';
import * as variables from 'app/assets/styles/varibales';
import Color from 'color';
import MyText from 'app/components/MyText';

export default class Main extends PureComponent {
	render() {
		const progress = this.props.selectedMoviesCount / this.props.moviesCount;

		return (
			<View style={styles.profileScreen}>
				<MyText style={styles.heading}>Movies you{"\n"}have watched</MyText>
				<View style={styles.chartContainer}>
					<MyText style={styles.chartText}>
						{this.props.selectedMoviesCount}/
						{this.props.moviesCount}
					</MyText>
					<ProgressCircle
						style={styles.chart}
						progress={progress}
						progressColor={chartStyles.chartCircleProgress}
						backgroundColor={chartStyles.chartCircleBackground}
                        strokeWidth={chartStyles.strokeWidth}
					/>
				</View>
			</View>
		)
	}
}

const {height, width} = Dimensions.get('window');
const diameter = width * 0.7;

const styles = StyleSheet.create({
	profileScreen: { 
		flex: 1, 
		alignItems: 'center', 
		justifyContent: 'center',
	},
	heading: {
		fontSize: 32,
		textAlign: 'center',
		fontWeight: '700',
		marginBottom: 40,
	},
	chartContainer: {
		position: 'relative',
	},
	chartText: {
		fontSize: 32,
		fontWeight: '700',
		position: 'absolute',
		textAlign: 'center',
		width: diameter,
		lineHeight: diameter,
	},
	chart: {
		height: diameter, 
		width: diameter,
	},
})

const chartStyles = {
	chartCircleProgress: variables.primaryColor.string(),
	chartCircleBackground: Color('white').alpha(0.25).string(),
	strokeWidth: 7,
}