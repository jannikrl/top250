import React, { PureComponent } from 'react';
import { View, StyleSheet } from 'react-native';
import * as variables from '../assets/styles/varibales';
import MyText from './MyText';
import Color from 'color';

export default class Tooltip extends PureComponent {
    render () {
        return (
            <View 
                style={[this.props.style, styles.tooltip]}
                shadowColor={variables.shadowColor}
                shadowOffset={variables.shadowOffset}
                shadowOpacity={variables.shadowOpacity}
                shadowRadius={variables.shadowRadius}
            >
                <View style={styles.arrow}></View>
                {this.props.children}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    tooltip: {
        backgroundColor: variables.primaryColor,
        borderRadius: variables.borderRadius,
        padding: variables.basePadding * 3,
    },
    arrow: {
        backgroundColor: variables.primaryColor,
        width: 20,
        height: 20,
        position: 'absolute',
        top: -5,
        right: 20,
        transform: [{rotate: '45deg'}],
    }
})