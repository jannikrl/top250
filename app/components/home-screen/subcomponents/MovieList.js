import React, { PureComponent } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import Check from './Check';
import Seperator from './Seperator';
import MovieListItem from './MovieListItem';
import SwipeableCheckListItem from '../../SwipeableCheckListItem';
import Tooltip from '../../Tooltip';

export default class MovieList extends PureComponent {
	constructor(props) {
        super(props)

        this.state = {
            scrollEnabled: true,
        }
	}
	
	_enableScroll = () => {
        this.setState({
            scrollEnabled: true
        });
    }

    _disableScroll = () => {
        this.setState({
            scrollEnabled: false
        });
	}
	
	_isSelected = (itemId) => {
        return !!this.props.selectedMoviesById[itemId];
	}
	
	_setSelected = (itemId, selected) => {
        this.props.setSelected(itemId, !this._isSelected(itemId))
    }
	
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

	_renderItem = ({ item }) => {
        return (
            <SwipeableCheckListItem 
                // Data
                id={item.id}
                item={item}
                isSelected={this._isSelected(item.id)}
                
                // Events
                onSwipeStart={this._disableScroll}
                onSwipeEnd={this._enableScroll}
                onSwipeSuccess={this._setSelected}

                // Render
                renderLayerBehind={this._renderLayerBehindListItem}
                renderListItem={this._renderMovieListItem}
            />
        )
    }

	render() {
        return (
            <View>
                <FlatList 
                    data={this.props.movieList}
                    scrollEnabled={this.state.scrollEnabled}
                    keyExtractor={(item) => item.id}
                    renderItem={this._renderItem}
                    ItemSeparatorComponent={this._renderSeperator}
                />
            </View>
        )
    }
}