import React, { PureComponent } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import MyText from './MyText';
import PropTypes from 'prop-types';
import * as variables from '../assets/styles/varibales';
import Color from 'color';

export default class MyButton extends PureComponent {
    render() {
        const buttonStyles = [];
        const textStyles = [];

        buttonStyles.push(styles.button);
        textStyles.push(styles.text);

        // Size
        buttonStyles.push(styles[this.props.size + 'Button']);
        textStyles.push(styles[this.props.size + 'Text']);

        // Shape
        if (this.props.rounded) {
            buttonStyles.push(styles.rounded);
        }

        // Color
        const outline = this.props.outline ? 'Outline' : '';
        buttonStyles.push(styles[this.props.color + outline + 'Button']);
        textStyles.push(styles[this.props.color + outline + 'Text']);

        return (
            <TouchableOpacity style={[buttonStyles, this.props.style]} onPress={this.props.onPress}>
                <MyText style={textStyles}>{this.props.children}</MyText>
            </TouchableOpacity>
        )
    }
}

MyButton.defaultProps = {
    rounded: false,
    color: 'primary',
    size: 'medium',
    outline: false,
}

MyButton.propTypes = {
    rounded: PropTypes.bool,
    color: PropTypes.oneOf(['primary', 'dark']),
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    outline: PropTypes.bool,
    onPress: PropTypes.func,
}

const styles = StyleSheet.create({
    button: {
        borderRadius: variables.borderRadius,
        borderWidth: 2,
        alignItems: 'center',
    },
    text: {
        fontWeight: 'bold',
        color: variables.darkTextColor,
        fontSize: variables.buttonFontSize,
    },
    
    // Size
    smallButton: {
        paddingTop: variables.basePadding,
        paddingBottom: variables.basePadding,
        paddingLeft: variables.basePadding * 2,
        paddingRight: variables.basePadding * 2,
    },
    mediumButton: {
        paddingTop: variables.basePadding * 1.5,
        paddingBottom: variables.basePadding * 1.5,
        paddingLeft: variables.basePadding * 3,
        paddingRight: variables.basePadding * 3,
    },
    largeButton: {
        paddingTop: variables.basePadding * 2,
        paddingBottom: variables.basePadding * 2,
        paddingLeft: variables.basePadding * 4,
        paddingRight: variables.basePadding * 4,
    },
    smallText: {
        fontSize: 14,
    },
    mediumText: {
        fontSize: 20,
    },
    largeText: {
        fontSize: 24
    },

    // Shape
    rounded: {
        borderRadius: 999,
    },

    // Color
    primaryButton: {
        backgroundColor: variables.primaryColor
    },
    primaryText: {
        color: Color('#FFFFFF'),
    },
    primaryOutlineButton: {
        borderColor: variables.primaryColor
    },
    primaryOutlineText: {
        color: variables.primaryColor
    },
    darkButton: {
        backgroundColor: variables.darkButtonColor
    },
    darkText: {
        color: Color('#FFFFFF')
    },
    darkOutlineButton: {
        borderColor: variables.darkButtonColor
    },
    darkOutlineText: {
        color: variables.darkTextColor
    },
})

const textStyles = StyleSheet.create({
    
    
    
    
})