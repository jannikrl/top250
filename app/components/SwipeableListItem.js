import React, { PureComponent } from 'react';
import { 
    View, 
    Text, 
    Image, 
    Animated, 
    PanResponder, 
    Dimensions, 
    Vibration, 
    StyleSheet 
} from 'react-native';

const windowWidth = Dimensions.get('window').width;

export default class SwipeableListItem extends PureComponent {
    constructor(props) {
        super(props)

        this._ignoreSwipeThreshold = 20;
        this._selectThreshold = 100;
        this._isListScrollEnabled = true;

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
        return (
            <View style={styles.swipeableListItem}>
                <View style={styles.check}>
                    <Text>Check</Text>
                </View>
                <Animated.View 
                    {...this._panResponder.panHandlers} 
                    style={[{transform: [{translateX: this.state.position.x}]}, styles.content]}
                >
                    <Image source={{uri:this.props.movie.thumbnail}} style={styles.image} />
                    <Text>{ this.props.movie.ranking }. { this.props.movie.title } ({ this.props.movie.year })</Text>
                    <Text>Rating { this.props.movie.rating }</Text>
                    <Text>{ JSON.stringify(this.props.isSelected) }</Text>
                </Animated.View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    swipeableListItem: {
        position: 'relative',
        height: 100,
    },
    content: {
        backgroundColor: '#f5f566',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
    },
    check: {
        position: 'absolute',
        top: 0,
        left: 0,
    },
    text: {
        fontSize: 24
    },

    image: {
        width: 50, 
        height: 50,
    }
})