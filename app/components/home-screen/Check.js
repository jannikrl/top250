import React, { PureComponent } from 'react';
import { StyleSheet } from 'react-native';
import SvgUri from 'react-native-svg-uri';
import * as variables from '../../assets/styles/varibales';

export default class Check extends PureComponent {
    render() {
        return (
            <SvgUri style={StyleSheet.flatten(styles.check)} source={require('../../assets/images/check.svg')}></SvgUri>
        )
    }
}

const styles = StyleSheet.create({
    check: {
        marginLeft: variables.basePadding * 2,
        justifyContent: 'center',
        height: 112,
    }
})