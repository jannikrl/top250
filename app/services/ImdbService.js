import _ from "lodash";
import * as moviesJson from "../assets/data/movies.json";

// API-token should be in a filed ignored by git.
// But for demonstration purpose I'll leave it here.
const API_TOKEN = "2680f6b2-3c45-447a-ba81-75e7d93d5da7";
const IMDB_API_ENDPOINT = "http://api.myapifilms.com";

class ImdbService {
	getMoviesFromFileSystem() {
		const movies = _.get(moviesJson, "data.movies");
		return this.mapValuesMovieList(movies);
	}

	async getMoviesFromApi() {
		const url = `${IMDB_API_ENDPOINT}/imdb/top?start=1&end=250&token=${API_TOKEN}&format=json&data=0`;

		const response = await fetch(url, {
			method: "GET",
			headers: {
				Accept: "application/json"
			}
		});

		if (!response.ok) {
			throw new Error(
				"ImdbService getMoviesFromApi failed, HTTP status ${response.status}"
			);
		}

		const data = await response.json();
		const movies = _.get(data, "data.movies");

		if (!movies) {
			throw new Error(
				"ImdbService getMoviesFromApi failed, movies not returned"
			);
		}

		return this.mapValuesMovieList(movies);
	}

	mapValuesMovieList(movies) {
		return _.map(movies, movie => {
			return {
				id: _.get(movie, "idIMDB"),
				title: _.get(movie, "title"),
				year: _.get(movie, "year"),
				thumbnail: _.get(movie, "urlPoster"),
				rating: _.get(movie, "rating"),
				ranking: _.get(movie, "ranking")
			};
		});
	}
}

export default new ImdbService();
