import axios from 'axios';

export default {
    getMovie: async (movieId) => {
        const response = await axios.get(
            `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.TMDB_KEY}`
        );
        return response.data;
    },
    find: async (query, page = 1) => {
      const response = await axios.get(
          `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDB_KEY}&language=en-US&include_adult=false&include_video=false&page=${page}&${query}`
      );
      return response.data;
  },
  
    findUpcoming: async (query, page = 1) => {
      const url = `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.TMDB_KEY}&language=en-US&include_adult=false&include_video=false&page=${page}&${query}`;
      const response = await axios.get(url);
      return response.data;
  },
  
    getMovieImages: async (movieId) => {
        const response = await axios.get(
            `https://api.themoviedb.org/3/movie/${movieId}/images?api_key=${process.env.TMDB_KEY}`
        );
        return response.data;
    },
    getMovieCast: async (movieId) => {
        const response = await axios.get(
            `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${process.env.TMDB_KEY}`
        );
        return response.data;
    },
    getMovieReviews: async (movieId) => {
        const response = await axios.get(
            `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=${process.env.TMDB_KEY}`
        );
        return response.data;
    },
    getSimilarMovies: async (movieId) => {
        const response = await axios.get(
            `https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${process.env.TMDB_KEY}`
        );
        return response.data;
    },
};
