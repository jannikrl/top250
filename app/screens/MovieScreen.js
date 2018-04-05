import React, { Component } from 'react';
import {
  Text,
  View,
  Button,
} from 'react-native';

export default class MovieScreen extends Component {
  static navigationOptions = ({ navigation }) => {
      const { params } = navigation.state

      return { 
        title: params ? params.title : '' 
      }
  }
  
  render() {
    const { params } = this.props.navigation.state;
    const movieId = params ? params.movieId : null;

    return (
      <View>
        <Text>
          Statsitics Screen
          </Text>
        <Text>
          Med id: {JSON.stringify(movieId)}
        </Text>
        <Button
          title="Go back"
          onPress={() => { this.props.navigation.goBack() }} />
      </View>
    );
  }
}