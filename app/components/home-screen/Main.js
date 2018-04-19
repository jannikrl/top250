import React, { PureComponent } from 'react';
import { View, StyleSheet } from 'react-native';
import Tooltip from '../Tooltip';
import MovieList from './subcomponents/MovieList';
import MyButton from '../MyButton';
import MyText from '../MyText';
import Color from 'color';
import Alert from '../Alert';
import AnimateTooltip from './subcomponents/AnimateTooltip';

export default class Main extends PureComponent {
    _updateHasOnboarded = () => {
        this.props.updateHasOnboarded(true);
    }

    _renderAlert = () => {
        if (this.props.movieList.length !== 0) {
            return;
        }
        
        return (
            <Alert>
                No movies match your chosen filter. Choose another filter.
            </Alert>
        )
    }
    
    _renderTooltip = () => {
        return (
            <AnimateTooltip hasOnboarded={this.props.hasOnboarded}>
                <Tooltip style={styles.tooltip}>            
                    <MyText style={styles.text}>
                        Which of IMDb’s top 250 movies have you watched
                        and which do you still need to see? Swipe right 
                        to check off a movie.
                    </MyText>
                    <MyButton 
                        color="dark" 
                        size="small" 
                        outline={true} 
                        rounded={true} 
                        style={styles.button} 
                        onPress={this._updateHasOnboarded}
                    >
                        Got it!
                    </MyButton>
                </Tooltip>
            </AnimateTooltip>
        )
    }
    
    render() {
        return (
            <View style={styles.main}>
                { this._renderAlert() }
                
                <MovieList
                    movieList={this.props.movieList}
                    selectedMoviesById={this.props.selectedMoviesById}
                    setSelected={this.props.setSelected}
                    hasOnboarded={this.props.hasOnboarded}                  
                />

                { this._renderTooltip() }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
    },
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