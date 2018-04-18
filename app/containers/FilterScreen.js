import React, { PureComponent } from 'react';
import { Text, View, Button } from 'react-native';
import Main from '../components/filter-screen/Main';
import { connect } from 'react-redux';
import * as movieSelectors from '../store/movies/reducer';
import * as movieActions from '../store/movies/actions';

class FilterModal extends PureComponent {
    _setCurrentFilter = (filter) => {
        this.props.dispatch(movieActions.setCurrentFilter(filter));
    }
    
    _goBack = () => {
        this.props.navigation.goBack();
    }
    
    render() {
        return (
            <Main 
                currentFilter={this.props.currentFilter} 
                goBack={this._goBack} 
                setCurrentFilter={this._setCurrentFilter}
            />
        )
    }
}

function mapStateToProps(state) {
    return {
        currentFilter: movieSelectors.getCurrentFilter(state),
    }
}

export default connect(mapStateToProps)(FilterModal);