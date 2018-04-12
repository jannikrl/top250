import React, { PureComponent } from 'react';
import { Text, FlatList } from 'react-native';
import Check from './subcomponents/Check';
import Seperator from './subcomponents/Seperator';
import ListItem from './subcomponents/ListItem';
import SwipeableCheckListItem from '../SwipeableCheckListItem';

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
			<ListItem movie={item} isSelected={isSelected} onPressItem={this.props.onPressItem} />
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
            <FlatList 
                data={this.props.movieList}
                scrollEnabled={this.state.scrollEnabled}
				keyExtractor={(item) => item.id}
				renderItem={this._renderItem}
                ItemSeparatorComponent={this._renderSeperator}
            />
        )
    }
}