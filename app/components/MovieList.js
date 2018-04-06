import React, { Component } from 'react';
import { View, Text, FlatList } from 'react-native';
import MovieListItem from './MovieListItem';

export default class MovieList extends Component {
    _onPressItem = (movieId) => {
        this.props.onPressItem(movieId);
    }
    
    _renderItem = ({item}) => (
        <MovieListItem 
            id={item.id}
            title={item.title}
            year={item.year}
            thumbnail={item.thumbnail}
            rating={item.rating}
            ranking={item.ranking}
            isSelected={!!item.isSelected}
            onPressItem={this._onPressItem}
        />
    );
    
    render() {
        return (
            <FlatList
                data={this.props.data}
                renderItem={this._renderItem}
                keyExtractor={(item) => item.id}
            />
        )
    }
}