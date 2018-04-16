import React, { PureComponent } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import MyText from './MyText';
import PropTypes from 'prop-types';
import * as variables from '../assets/styles/varibales';
import Color from 'color';

export default class OutlineButton extends PureComponent {
    render() {
        const buttonColor = buttonStyles[this.props.color];
        const textColor = textStyles[this.props.color];
        const buttonRounded = this.props.rounded ? buttonStyles.rounded : {};

        return (
            <TouchableOpacity style={[this.props.style, buttonStyles.baseStyles, buttonColor, buttonRounded]} onPress={this.props.onPress}>
                <MyText style={[textStyles.baseStyles, textColor]}>{this.props.children}</MyText>
            </TouchableOpacity>
        )
    }
}

OutlineButton.defaultProps = {
    rounded: true,
    color: 'primary',
}

OutlineButton.propTypes = {
    rounded: PropTypes.bool,
    color: PropTypes.oneOf(['primary', 'dark']),
    onPress: PropTypes.func,
}

const buttonStyles = StyleSheet.create({
    baseStyles: {
        borderRadius: variables.borderRadius,
        borderWidth: 2,
        paddingTop: variables.basePadding,
        paddingBottom: variables.basePadding,
        paddingLeft: variables.basePadding * 2,
        paddingRight: variables.basePadding * 2,
    },
    primary: {
        borderColor: variables.primaryColor
    },
    dark: {
        borderColor: variables.darkButtonColor
    },
    rounded: {
        borderRadius: 999,
    },
})

const textStyles = StyleSheet.create({
    baseStyles: {
        fontWeight: 'bold',
        color: variables.darkTextColor,
        fontSize: variables.buttonFontSize,
    },
    primary: {
        color: variables.primaryColor
    },
    dark: {
        color: variables.darkTextColor
    },
})