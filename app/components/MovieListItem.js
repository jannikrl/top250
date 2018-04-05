import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

export default class MovieListItem extends Component {
    _onPress = () => {
        this.props.onPressItem(this.props.id);
    }
    
    render() {
        return (
            <TouchableOpacity onPress={this._onPress}>
                <Image source={{uri:this.props.thumbnail}} style={styles.image} />
                <Text>{ this.props.ranking }. { this.props.title } ({ this.props.year })</Text>
                <Text>Rating { this.props.rating }</Text>
                <Text>{ JSON.stringify(this.props.isSelected) }</Text>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    image: {
        width: 50, 
        height: 50,
    }
})