import React, { PureComponent } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import MyText from './MyText';
import * as variables from '../assets/styles/varibales';

export default class RadioButton extends PureComponent {
    _onPress = () => {
        this.props.onPress(this.props.value);
    }
    
    render () {
        const buttonStyles = this.props.isSelected ? [styles.button, styles.buttonSelected] : styles.button;
        const radioStyles = this.props.isSelected ? [styles.radio, styles.radioSelected] : styles.radio;
        const dot = this.props.isSelected ? <View style={styles.dot} /> : undefined;

        return (
            <TouchableOpacity style={buttonStyles} onPress={this._onPress}>
                <View style={radioStyles}>
                    {dot}
                </View> 
                <MyText style={styles.title}>{this.props.title}</MyText>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    button: {
        borderWidth: 1,
        borderRadius: variables.borderRadius,
        borderColor: variables.borderColor,
        borderWidth: 2,
        padding: variables.basePadding * 1.5,
        marginBottom: variables.baseMargin,
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
    },
    buttonSelected: {
        backgroundColor: variables.backgroundColor.lighten(0.15),
        borderColor: '#FFFFFF',
    },
    radio: {
        width: 22,
        height: 22,
        borderWidth: 2,
        borderRadius: 99,
        borderColor: variables.borderColor,
        marginRight: variables.baseMargin * 1.5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    radioSelected: {
        borderColor: '#FFFFFF',
    },
    dot: {
        backgroundColor: variables.primaryColor,
        width: 18,
        height: 18,
        borderRadius: 99,
        borderWidth: 1,
        borderColor: variables.backgroundColor.alpha(0.8),
    },
    title: {
        fontSize: 20,
        fontWeight: '700',
    }
})