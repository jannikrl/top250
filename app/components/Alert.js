import React, { PureComponent } from 'react';
import { View, StyleSheet } from 'react-native';
import MyText from './MyText';
import * as variables from '../assets/styles/varibales';

export default class Alert extends PureComponent {
    render() {
        return (
            <View style={styles.alert}>
                <MyText style={styles.text}>
                    {this.props.children}
                </MyText>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    alert: {
        backgroundColor: variables.primaryColor.alpha(0.3),
        borderWidth: 1,
        borderColor: variables.primaryColor.alpha(0.7),
        margin: variables.baseMargin * 2,
        padding: variables.basePadding * 2,
        borderRadius: variables.borderRadius,
    },
    text: {
        color: variables.primaryColor,
    }
})