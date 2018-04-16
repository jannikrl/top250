import React, { PureComponent } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import * as variables from '../../assets/styles/varibales';

export default class HeaderRight extends PureComponent {
    render () {
        return (
            <View style={styles.headerRight}>
                <Button onPress={() => this.props.goToFilter()} title="Filter" color={variables.primaryColor} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    headerRight: {
        paddingRight: variables.basePadding,
    },
})