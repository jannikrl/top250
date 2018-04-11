import React, { Component } from 'react';
import { Text, StyleSheet } from 'react-native';
import * as variables from '../assets/styles/varibales';

export default class MyText extends Component {
    render () {
        return (
            <Text
                {...this.props}
                style={[styles.myText, this.props.style]}>
                {this.props.children}
            </Text>
        );
    }
}

const styles = StyleSheet.create({
    myText: {
        color: variables.textColor,
        fontFamily: variables.fontFamily,
        fontSize: variables.fontSize,
    }
});

