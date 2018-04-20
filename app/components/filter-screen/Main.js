import React, { PureComponent } from 'react';
import { View, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import * as variables from '../../assets/styles/varibales';
import MyText from '../MyText';
import RadioSelect from '../RadioSelect';
import SvgUri from 'react-native-svg-uri';
import MyButton from '../MyButton';

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
            {title: 'All movies', id: 'ALL_MOVIES'}, 
            {title: 'Wached movies', id: 'SELECTED_MOVIES'}, 
            {title: 'Unwached movies', id: 'NOT_SELECTED_MOVIES'}, 
        ]

        return (
            <SafeAreaView style={styles.safeAreaView}>
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

                    <MyButton style={styles.button} onPress={this._onSubmit}>Filter</MyButton>
                </View>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    safeAreaView: {
        flex: 1,
        backgroundColor: variables.backgroundColor,
    },
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
        top: variables.baseMargin * 2,
        right: variables.baseMargin * 2,
        width: 30,
        height: 30,
        alignItems: 'flex-end',
    },
    button: {
        position: 'absolute',
        bottom: variables.basePadding * 2,
        width: '100%',
    }
})