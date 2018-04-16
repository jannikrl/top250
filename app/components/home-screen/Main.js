import React, { PureComponent } from 'react';
import { View, StyleSheet } from 'react-native';
import Tooltip from '../Tooltip';
import MovieList from './subcomponents/MovieList';
import OutlineButton from '../OutlineButton';
import MyText from '../MyText';
import Color from 'color';

export default class Main extends PureComponent {
    _updateHasOnboarded = () => {
        this.props.updateHasOnboarded(true);
    }
    
    _renderTooltip = () => {
        if (this.props.hasOnboarded) {
            return;
        }

        return (
            <Tooltip style={styles.tooltip}>            
                <MyText style={styles.text}>
                    Which of IMDb’s top 250 movies have you watched
                    and which do you still need to see? Swipe right 
                    to check off a movie.
                </MyText>
                <OutlineButton color="dark" rounded={true} style={styles.button} onPress={this._updateHasOnboarded}>Got it!</OutlineButton>
            </Tooltip>
        )
    }
    
    render() {
        return (
            <View>
                <MovieList
                    movieList={this.props.movieList}
                    selectedMoviesById={this.props.selectedMoviesById}
                    setSelected={this.props.setSelected}
                    onPressItem={this.props.onPressMovie}                  
                />
                { this._renderTooltip() }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    tooltip: {
        position: 'absolute',
        top: 125,
        left: 26,
        right: 26,
    },
    text: {
        color: Color('#2D2D2D'),
        fontSize: 18,
        fontWeight: '700',
    },
    button: {
        alignSelf: 'flex-end',
        marginTop: 12,
    }
})