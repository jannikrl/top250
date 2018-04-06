import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet
} from 'react-native';
import { connect } from 'react-redux';
import * as movieSelectors from '../store/movies/reducer';

class MovieScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    
    return {
      title: params ? params.title : 'Movie title',
    }
  };
  
  componentDidMount() {
    this.props.navigation.setParams({
      title: this.props.movie.title
    })
  }
  
  render() {
    // @TODO: Move to a 'dumb' component
    return (
      <View>
        <Text style={styles.title}>
          Film {this.props.movie.title}
        </Text>
        <Image source={{uri: this.props.movie.thumbnail}} style={styles.image} />
      </View>
    );
  }
}

function mapStateToProps(state, ownProps) {
  const { params } = ownProps.navigation.state;
  const movieId = params ? params.movieId : null;

  return {
    movie: movieSelectors.getMovie(state, movieId),
  }
}

export default connect(mapStateToProps)(MovieScreen);

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