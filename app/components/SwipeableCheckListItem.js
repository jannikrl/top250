import React, { PureComponent } from 'react';
import { View, Animated, PanResponder, Dimensions, Vibration, StyleSheet} from 'react-native';
import * as variables from '../assets/styles/varibales';
import PropTypes from 'prop-types';

const windowWidth = Dimensions.get('window').width;

export default class SwipeableCheckListItem extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            position: new Animated.ValueXY(),
            isSwiping: false,
        };

        this._panResponder = PanResponder.create({
            onStartShouldSetPanResponder: (event, gestureState) => false,
            onMoveShouldSetPanResponder: (event, gestureState) => true,
            onPanResponderTerminationRequest: (event,gestureState) => false,
            onPanResponderMove: (event, gestureState) => {
                if (gestureState.dx < this.props.ignoreSwipeThreshold) {
                    return;
                }

                this._onSwipeStart();
                
                this.state.position.setValue({
                    x: gestureState.dx - this.props.ignoreSwipeThreshold, 
                    y: 0
                });
            },
            onPanResponderRelease: (event, gestureState) => {
                if (gestureState.dx > this.props.selectThreshold) {
                    this._onSwipeSuccess();
                }

                this._onSwipeEnd();

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

    _onSwipeStart() {
        if (this.state.isSwiping) {
            return;
        }

        this.props.onSwipeStart();
        this.setState({isSwiping: true});
    }
    
    _onSwipeEnd() {
        this.props.onSwipeEnd();
        this.setState({isSwiping: false});
    }

    _onSwipeSuccess() {
        Vibration.vibrate();
        this.props.onSwipeSuccess(this.props.id);
    }

    render() {        
        const listItemTranslateX = this.state.position.x.interpolate({
            inputRange: [0, this.props.slowSwipeThreshold, windowWidth],
            outputRange: [0, this.props.slowSwipeThreshold,  windowWidth * this.props.slowDownFactor],
        });
        const checkTranslateX = this.state.position.x.interpolate({
            inputRange: [0, this.props.selectThreshold, windowWidth],
            outputRange: [0, 0,  windowWidth * this.props.slowDownFactor - this.props.slowSwipeThreshold],
        });

        return (
            <View style={[styles.swipeableCheckListItem, {backgroundColor: this.props.backgroundColor}]}>
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

SwipeableCheckListItem.defaultProps = {
    // Animation
    ignoreSwipeThreshold: 20,
    slowSwipeThreshold: 60,
    selectThreshold: 60,
    slowDownFactor: 0.6,

    // Styling
    backgroundColor: '#222222',
}

SwipeableCheckListItem.propTypes = {
    // Animation
    ignoreSwipeThreshold: PropTypes.number,
    slowSwipeThreshold: PropTypes.number,
    selectThreshold: PropTypes.number,
    slowDownFactor: PropTypes.number,
    
    // Styling
    backgroundColor: PropTypes.string,
    
    // Data
    id: PropTypes.string.isRequired,
    item: PropTypes.object.isRequired,
    isSelected: PropTypes.bool,
    
    // Events
    onSwipeStart: PropTypes.func,
    onSwipeEnd: PropTypes.func,
    onSwipeSuccess: PropTypes.func,

    // Render
    renderLayerBehind: PropTypes.func,
    renderListItem: PropTypes.func,
}

const styles = StyleSheet.create({
    swipeableCheckListItem: {
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