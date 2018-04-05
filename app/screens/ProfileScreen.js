import React, { Component } from 'react';
import {
  Text,
  View,
  Button,
} from 'react-native';

export default class ModalScreen extends React.Component {
  static navigationOptions = {
		title: 'Profil'
	}
  
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ fontSize: 30 }}>This is my profile</Text>
      </View>
    );
  }
}