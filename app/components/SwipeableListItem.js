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

const windowWidth = Dimensions.get('window').width;

export default class SwipeableListItem extends PureComponent {
    constructor(props) {
        super(props)

        this._ignoreSwipeThreshold = 20;
        this._slowSwipeThreshold = 60;
        this._selectThreshold = 60;
        this._slowDownFactor = 0.6;
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

    _onPress = () => {
        this.props.onPressItem(this.props.movie.id);
    }
    
    render() {

        // @TODO: Move to renderItem()
        // @TODO: Build component e.g. ImageFromUri to fetch images to avoid errors

        const backgroundColor = (this.props.isSelected) ? variables.primaryColor.alpha(0.5) : variables.backgroundColor;
        
        const listItemTranslateX = this.state.position.x.interpolate({
            inputRange: [0, this._slowSwipeThreshold, windowWidth],
            outputRange: [0, this._slowSwipeThreshold,  windowWidth * this._slowDownFactor],
        });
        const checkTranslateX = this.state.position.x.interpolate({
            inputRange: [0, this._selectThreshold, windowWidth],
            outputRange: [0, 0,  windowWidth * this._slowDownFactor - this._slowSwipeThreshold],
        });

        return (
            <View style={styles.swipeableListItem}>
                <Animated.View style={[{transform: [{translateX: checkTranslateX}]}, styles.checkContainer]}>
                    <SvgUri style={StyleSheet.flatten(styles.check)} source={require('../assets/images/check.svg')}></SvgUri>
                </Animated.View>
                <Animated.View 
                    {...this._panResponder.panHandlers} 
                    style={[{transform: [{translateX: listItemTranslateX}]}, styles.content]}
                >
                    <TouchableOpacity activeOpacity={0.8} style={[styles.contentInside, {backgroundColor}]} onPress={this._onPress}>   
                        <Image source={{uri:this.props.movie.thumbnail}} style={styles.thumbnail} />
                        <View style={styles.mainInfo}>
                            <MyText ellipsizeMode="tail" numberOfLines={2}>
                                <MyText style={styles.rank}>{ this.props.movie.ranking }. </MyText> 
                                <MyText style={styles.title}>{ this.props.movie.title }</MyText>
                            </MyText>
                            <MyText style={styles.year}>{ this.props.movie.year }</MyText>
                        </View>
                        <View style={styles.secondaryInfo}>
                            <SvgUri style={StyleSheet.flatten(styles.star)} source={require('../assets/images/star.svg')}></SvgUri>
                            <MyText style={styles.rating}>{ this.props.movie.rating }</MyText>
                        </View>
                    </TouchableOpacity>
                </Animated.View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    swipeableListItem: {
        height: 112,
        position: 'relative',
        backgroundColor: Color('#222222'),
    },
    content: {
        backgroundColor: variables.backgroundColor,
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
    },
    contentInside: {
        paddingTop: variables.basePadding,
        paddingBottom: variables.basePadding,
        paddingLeft: variables.basePadding * 2,
        paddingRight: variables.basePadding * 2,
        flex: 1,
        flexDirection: 'row',
    },
    mainInfo: {
        flex: 1,
        paddingLeft: variables.basePadding * 2,
        paddingTop: variables.basePadding,
    },
    secondaryInfo: {
        paddingTop: variables.basePadding,
        width: 60,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginLeft: 4,
    },
    thumbnail: {
        width: 66, 
        height: 98,
        borderRadius: variables.borderRadius,
    },
    title: {
        fontSize: 18,
    },
    rank: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    year: {
        opacity: 0.6,
        marginTop: 4,
    },
    rating: {
        fontWeight: 'bold',
        fontSize: 18,
        marginLeft: 4
    },
    star: {
        marginTop: 2,
    },
    checkContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        width: '100%',
        justifyContent: 'center',
    },
    check: {
        marginLeft: variables.basePadding * 2,
    }
})