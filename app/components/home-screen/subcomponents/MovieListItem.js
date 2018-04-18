import React, { PureComponent } from 'react';
import { 
    View, 
    Text, 
    Image, 
    Animated, 
    PanResponder, 
    Dimensions, 
    StyleSheet, 
} from 'react-native';
import * as variables from 'app/assets/styles/varibales';
import MyText from 'app/components/MyText';
import SvgUri from 'react-native-svg-uri';
import Color from 'color';

export default class MovieListItem extends PureComponent {
    render() {
        const backgroundColor = (this.props.isSelected) ? variables.primaryColor.alpha(0.5) : variables.backgroundColor;        

        return (
            <View style={[styles.contentInside, {backgroundColor}]}>   
                <Image source={{uri:this.props.movie.thumbnail}} style={styles.thumbnail} />
                <View style={styles.mainInfo}>
                    <MyText ellipsizeMode="tail" numberOfLines={2}>
                        <MyText style={styles.rank}>{ this.props.movie.ranking }. </MyText> 
                        <MyText style={styles.title}>{ this.props.movie.title }</MyText>
                    </MyText>
                    <MyText style={styles.year}>{ this.props.movie.year }</MyText>
                </View>
                <View style={styles.secondaryInfo}>
                    <SvgUri style={StyleSheet.flatten(styles.star)} source={require('app/assets/images/star.svg')}></SvgUri>
                    <MyText style={styles.rating}>{ this.props.movie.rating }</MyText>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    contentInside: {
        backgroundColor: variables.backgroundColor,
        height: 112,
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
})