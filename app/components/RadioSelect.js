import React, { PureComponent } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import variables from '../assets/styles/varibales';
import RadioButton from './RadioButton';

export default class RadioSelect extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            selected: props.selected,
        }
    }

    _onPress = (value) => {
        this.setState({
            selected: value
        });

        this.props.onChange(value);
    }

    _isSelected = (value) => {
        return (value === this.state.selected)
    }
    
    render () {
        const radioButtons = this.props.options.map(option => {
            return (
                <RadioButton 
                    title={option.title} 
                    value={option.value} 
                    isSelected={this._isSelected(option.value)} 
                    key={option.value} 
                    onPress={this._onPress} 
                />
            )
        })

        return (
            <View style={styles.radioSelect}>
                {radioButtons}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    radioSelect: {
        width: '100%',
    },
})