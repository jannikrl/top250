import React, { PureComponent } from 'react';
import { 
    View, 
    Text, 
    Image, 
    Animated, 
    PanResponder, 
    Dimensions, 
    Vibration,
    TouchableOpacity,
    StyleSheet, 
} from 'react-native';
import * as variables from '../assets/styles/varibales';
import MyText from './MyText';
import SvgUri from 'react-native-svg-uri';
import Color from 'color';
import MovieListItem from './home-screen/MovieListItem';
import Check from './home-screen/Check';

const windowWidth = Dimensions.get('window').width;

export default class SwipeableListItem extends PureComponent {
    constructor(props) {
        super(props)

        this._ignoreSwipeThreshold = 20;
        this._slowSwipeThreshold = 60;
        this._selectThreshold = 60;
        this._slowDownFactor = 0.6;
        this._isListScrollEnabled = true;
        this._backgroundColor = Color('#222222');

        this.state = {
            position: new Animated.ValueXY(),
        };

        this._panResponder = PanResponder.create({
            onStartShouldSetPanResponder: (event, gestureState) => false,
            onMoveShouldSetPanResponder: (event, gestureState) => true,
            onPanResponderTerminationRequest: (event,gestureState) => false,
            onPanResponderMove: (event, gestureState) => {
                if (gestureState.dx < this._ignoreSwipeThreshold) {
                    return;
                }

                this._setListScrollEnabled(false);
                
                this.state.position.setValue({
                    x: gestureState.dx - this._ignoreSwipeThreshold, 
                    y: 0
                });
            },
            onPanResponderRelease: (event, gestureState) => {
                if (gestureState.dx > this._selectThreshold) {
                    this._setSelected(!this.props.isSelected);
                    Vibration.vibrate();
                }

                this._setListScrollEnabled(true);

                Animated.sequence([
                    Animated.decay(this.state.position, {
                        velocity: {x: gestureState.vx, y: 0},
                        deceleration: 0.85
                    }),
                    Animated.spring(this.state.position, {
                        toValue: {x: 0, y: 0},
                        duration: 150,
                    })
                ]).start();
            },
        });
    }

    _setSelected(selected) {
        this.props.setSelected(this.props.id, selected)
    }

    _setListScrollEnabled(enabled) {
        if (this._isListScrollEnabled === enabled) {
            return;
        }

        this.props.setScrollEnabled(enabled);
        this._isListScrollEnabled = enabled;
    }
    
    render() {        
        const listItemTranslateX = this.state.position.x.interpolate({
            inputRange: [0, this._slowSwipeThreshold, windowWidth],
            outputRange: [0, this._slowSwipeThreshold,  windowWidth * this._slowDownFactor],
        });
        const checkTranslateX = this.state.position.x.interpolate({
            inputRange: [0, this._selectThreshold, windowWidth],
            outputRange: [0, 0,  windowWidth * this._slowDownFactor - this._slowSwipeThreshold],
        });

        return (
            <View style={[styles.swipeableListItem, {backgroundColor: this._backgroundColor}]}>
                <Animated.View style={[{transform: [{translateX: checkTranslateX}]}, styles.checkContainer]}>
                    {this.props.renderLayerBehind()}
                </Animated.View>
                <Animated.View 
                    {...this._panResponder.panHandlers} 
                    style={{transform: [{translateX: listItemTranslateX}]}}>
                        {this.props.renderListItem({
                            item: this.props.item, 
                            isSelected: this.props.isSelected
                        })}
                </Animated.View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    swipeableListItem: {
        position: 'relative',
    },
    checkContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        width: '100%',
    },
})