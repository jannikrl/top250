import React, { PureComponent } from 'react';
import {
    View,
    Image,
    StyleSheet
} from 'react-native';
import MyText from '../MyText';

export default class Main extends PureComponent {
    render() {
        return (
            <View>
                <MyText style={styles.title}>
                	{this.props.movie.title}
                </MyText>
                <Image source={{uri: this.props.movie.thumbnail}} style={styles.image} />
          </View>
        )
    }
}

const styles = StyleSheet.create({
    title: {
      	fontSize: 25,
      	fontWeight: 'bold',
    },
    image: {
      	width: 60,
      	height: 80
    }
});