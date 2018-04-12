import React, { PureComponent } from 'react';
import { Text } from 'react-native';
import SwipeableList from '../SwipeableList';
import Check from './Check';
import Seperator from './Seperator';
import MovieListItem from './MovieListItem';

export default class MovieList extends PureComponent {
	_renderLayerBehindListItem = () => {
		return (
			<Check />
		)
	}

	_renderSeperator = () => {
		return (
			<Seperator />
		)
	}

	_renderMovieListItem = ({item, isSelected}) => {		
		return (
			<MovieListItem movie={item} isSelected={isSelected} onPressItem={this.props.onPressItem} />
		)
	};
	
	render() {
		return (
			<SwipeableList
				data={this.props.movieList}
				selectedItems={this.props.selectedMoviesById}
				setSelected={this.props.setSelected}
				renderSeperator={this._renderSeperator}
				renderLayerBehindListItem={this._renderLayerBehindListItem}
				renderListItem={this._renderMovieListItem}
			/>
		);
	}
}