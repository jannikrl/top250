import React, { Component } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import SwipeableListItem from './SwipeableListItem';


export default class SwipeableList extends Component {
    constructor(props) {
        super(props)

        this.state = {
            scrollEnabled: true,
        }
    }
    
    _setScrollEnabled = (scrollEnabled) => {
        this.setState(
            {scrollEnabled}
        );
    }

    _setSelected = (itemId, selected) => {
        this.props.setSelected(itemId, selected)
    }

    _onPressItem = (movieId) => {
        this.props.onPressItem(movieId);
    }

    _isSelected = (itemId) => {
        return !!this.props.selectedItems[itemId];
    }

    _renderItem = ({ item }) => {
        return (
            <SwipeableListItem 
                id={item.id}
                item={item}
                setScrollEnabled={this._setScrollEnabled}
                isSelected={this._isSelected(item.id)}
                setSelected={this._setSelected}
                renderLayerBehind={this.props.renderLayerBehindListItem}
                renderListItem={this.props.renderListItem}
            />
        )
    }
    
    render() {
        return (
            <FlatList 
                data={this.props.data}
                renderItem={this._renderItem}
                ItemSeparatorComponent={this.props.renderSeperator}
                scrollEnabled={this.state.scrollEnabled}
                keyExtractor={(item) => item.id}
                style={this.props.style}
            />
        )
    }
}