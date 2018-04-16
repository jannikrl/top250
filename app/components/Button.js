import React, { PureComponent } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import MyText from './MyText';
import * as variables from '../assets/styles/varibales';
import Color from 'color';

export default class OutlineButton extends PureComponent {
    render() {
        return (
            <TouchableOpacity style={[styles.button, this.props.style]} onPress={this.props.onPress}>
                <MyText style={styles.title}>{this.props.title}</MyText>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: variables.primaryColor,
        padding: variables.basePadding * 1.5,
        borderRadius: variables.borderRadius,
        width: '100%',
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: '700',
    }
})