import React, { PureComponent } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import * as variables from '../../assets/styles/varibales';
import MyText from '../MyText';
import RadioSelect from '../RadioSelect';
import SvgUri from 'react-native-svg-uri';
import Button from '../Button';

export default class Main extends PureComponent {    
    constructor(props) {
        super(props)

        this.state = {
            selectedFilter: props.currentFilter
        }
    }

    _onFilterChange = (filter) => {
        this.setState({
            selectedFilter: filter,
        });
    }

    _onSubmit = () => {
        this.props.setCurrentFilter(this.state.selectedFilter);
        this.props.goBack();
    }
    
    render () {
        const options = [
            {title: 'All movies', value: 'ALL_MOVIES'}, 
            {title: 'Wached movies', value: 'SELECTED_MOVIES'}, 
            {title: 'Unwached movies', value: 'NOT_SELECTED_MOVIES'}, 
        ]

        return (
            <View style={styles.main}>
                <TouchableOpacity style={styles.close} onPress={this.props.goBack}>
                    <SvgUri width={16} height={16} source={require('../../assets/images/close.svg')} />
                </TouchableOpacity>

                <MyText style={styles.heading}>Filter movies</MyText>

                <RadioSelect 
                    options={options} 
                    selected={this.props.currentFilter} 
                    onChange={this._onFilterChange}
                />

                <Button style={styles.button} title="Filter" onPress={this._onSubmit} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: variables.backgroundColor,
        padding: variables.basePadding * 2,
    },
    heading: {
        fontSize: 32,
        fontWeight: '700',
        marginBottom: variables.baseMargin * 5,
    },
    close: {
        position: 'absolute',
        top: variables.baseMargin * 4,
        right: variables.baseMargin * 2,
        width: 30,
        height: 30,
        alignItems: 'flex-end',
    },
    button: {
        position: 'absolute',
        bottom: variables.basePadding * 2,
    }
})