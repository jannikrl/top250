import React, { PureComponent } from 'react';
import { View, StyleSheet } from 'react-native';

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
        backgroundColor: '#606060',
        width: '74%',
        marginLeft: '26%',
    }
})