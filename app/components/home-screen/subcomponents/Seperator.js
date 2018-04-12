import React, { PureComponent } from 'react';
import { View, StyleSheet } from 'react-native';
import Color from 'color';

export default class Seperator extends PureComponent {
    render() {
        return (
            <View style={styles.seperator} />
        )
    }
}

const styles = StyleSheet.create({
    seperator: {
        height: 1,
        backgroundColor: Color('#606060'),
        width: '74%',
        marginLeft: '26%',
    }
})