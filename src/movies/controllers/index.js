import moviesService from "./../services";

export default (dependencies) => {

    const getMovie = async (request, response, next) => {
        //input
        const movieId = request.params.id;
        // Treatment
        const movie = await moviesService.getMovie(movieId, dependencies);
        //output
        response.status(200).json(movie);
    };
    const find = async (request, response, next) => {
      //input
      const { page, ...query } = request.query;
      // Treatment
      const movies = await moviesService.find(query, page, dependencies);
      //output
      response.status(200).json(movies);
  };
    const getUpcomingMovies = async (request, response, next) => {
      try {
        const { page, ...query } = request.query;
        const movies = await moviesService.findUpcoming(query, page, dependencies);
        response.status(200).json(movies);
      } catch (error) {
        next(error);
      }
  };
  
    const getMovieImages = async (request, response, next) => {
        const movieId = request.params.id;
        const images = await moviesService.getMovieImages(movieId, dependencies);
        response.status(200).json(images);
    };

    const getMovieCast = async (request, response, next) => {
        const movieId = request.params.id;
        const cast = await moviesService.getMovieCast(movieId, dependencies);
        response.status(200).json(cast);
    };

    const getMovieReviews = async (request, response, next) => {
        const movieId = request.params.id;
        const reviews = await moviesService.getMovieReviews(movieId, dependencies);
        response.status(200).json(reviews);
    };

    const getSimilarMovies = async (request, response, next) => {
        const movieId = request.params.id;
        const similarMovies = await moviesService.getSimilarMovies(movieId, dependencies);
        response.status(200).json(similarMovies);
    };
      
    return {
        getMovie,
        find,
        getUpcomingMovies,
        getMovieImages,
        getMovieCast,
        getMovieReviews,
        getSimilarMovies
    };
};
