import React, { PureComponent } from 'react';
import { Animated, Easing, Dimensions, StyleSheet } from 'react-native';

const windowHeight = Dimensions.get('window').height;

export default class AnimateTooltip extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            value: new Animated.Value(0),
        }
    }

    componentDidMount() {
        this._animateIn();
    }

    componentWillUpdate(nextProps) {
        if (this.props.hasOnboarded !== nextProps.hasOnboarded) {
            this._animateOut();
        }
    }

    _animateIn = () => {
        Animated.timing(this.state.value, {
            toValue: 50,
            duration: 600,
        }).start();
    }

    _animateOut = () => {
        Animated.timing(this.state.value, {
            toValue: 100,
            duration: 400,
        }).start();
    }
    
    render() {
        const translateY = this.state.value.interpolate({
            inputRange: [0, 50, 100],
            outputRange: [-windowHeight, 0, windowHeight],
        })
        const rotate = this.state.value.interpolate({
            inputRange: [0, 50, 100],
            outputRange: ['0deg', '0deg', '30deg'],
        })

        return (
            <Animated.View style={[{transform: [{translateY: translateY}, {rotate: rotate}]}, styles.animateTooltip]}>
                {this.props.children}
            </Animated.View>
        )
    }
}

const styles = StyleSheet.create({
    animateTooltip: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    }
})