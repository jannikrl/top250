import React, { PureComponent } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import variables from '../assets/styles/varibales';
import RadioSelectButton from './RadioSelectButton';
import PropTypes from 'prop-types';

export default class RadioSelect extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            selected: props.selected,
        }
    }

    _onPress = (id) => {
        this.setState({
            selected: id
        });

        this.props.onChange(id);
    }

    _isSelected = (id) => {
        return (id === this.state.selected)
    }
    
    render () {
        const radioButtons = this.props.options.map(option => {
            return (
                <RadioSelectButton 
                    title={option.title} 
                    id={option.id} 
                    isSelected={this._isSelected(option.id)} 
                    key={option.id} 
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

RadioSelect.propTypes = {
    onChange: PropTypes.func.isRequired,
    options: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string.isRequired,
        id: PropTypes.any.isRequired,
    })).isRequired
}

const styles = StyleSheet.create({
    radioSelect: {
        width: '100%',
    },
})