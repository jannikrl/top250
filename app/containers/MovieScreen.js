import React, { Component } from "react";
import { connect } from "react-redux";
import * as movieSelectors from "../store/movies/reducer";
import Main from "../components/movie-screen/Main";

class MovieScreen extends Component {
	static navigationOptions = ({ navigation }) => {
		const { params } = navigation.state;

		return {
			title: params ? params.title : "Movie title"
		};
	};

	componentDidMount() {
		this.props.navigation.setParams({
			title: this.props.movie.title
		});
	}

	render() {
		return <Main movie={this.props.movie} />;
	}
}

function mapStateToProps(state, ownProps) {
	const { params } = ownProps.navigation.state;
	const movieId = params ? params.movieId : null;

	return {
		movie: movieSelectors.getMovie(state, movieId)
	};
}

export default connect(mapStateToProps)(MovieScreen);
