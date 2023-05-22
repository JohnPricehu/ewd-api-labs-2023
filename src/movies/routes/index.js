import express from 'express';
import MoviesController from '../controllers';
import AccountsController from '../../accounts/controllers'; //ADD THIS: imports accounts controller

const createMoviesRouter = (dependencies) => {
    const router = express.Router();
    // load controllers with dependencies
    const moviesController = MoviesController(dependencies);
    const accountsController = AccountsController(dependencies);//ADD THIS: Create accountsController with dependencies
    // console.log('moviesController:', moviesController); // Add this
     router.route('/*')
         .all(accountsController.verify); //ADD THIS: require token for all routes

    /**
     * @openapi
     * /api/movies/{id}:
     *   get:
     *     tags:
     *       - Movies
     *     summary: Get movie by id
     *     description: This endpoint returns movie details by movie ID
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         description: Movie ID
     *         schema:
     *           type: string
     *     responses:
     *       '200':
     *         description: Successfully retrieved movie
     *       '500':
     *         description: Internal server error
     */
    router.route('/:id')
        .get(moviesController.getMovie);

    /**
     * @openapi
     * /api/movies/:
     *   get:
     *     tags:
     *       - Movies
     *     summary: Get movies
     *     description: This endpoint returns all movies
     *     responses:
     *       '200':
     *         description: Successfully retrieved movies
     *       '500':
     *         description: Internal server error
     */
    router.route('/')
        .get(moviesController.find);

    /**
     * @openapi
     * /api/movies/upcoming:
     *   get:
     *     tags:
     *       - Movies
     *     summary: Get upcoming movies
     *     description: This endpoint returns upcoming movies
     *     responses:
     *       '200':
     *         description: Successfully retrieved upcoming movies
     *       '500':
     *         description: Internal server error
     */
    router.route('/upcoming')
        .get(moviesController.getUpcomingMovies);

    /**
     * @openapi
     * /api/movies/{id}/images:
     *   get:
     *     tags:
     *       - Movies
     *     summary: Get movie's images
     *     description: This endpoint returns images of the specified movie
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         description: Movie ID
     *         schema:
     *           type: string
     *     responses:
     *       '200':
     *         description: Successfully retrieved movie's images
     *       '500':
     *         description: Internal server error
     */
    router.route('/:id/images')
        .get(moviesController.getMovieImages);

    /**
     * @openapi
     * /api/movies/{id}/cast:
     *   get:
     *     tags:
     *       - Movies
     *     summary: Get movie's cast
     *     description: This endpoint returns cast of the specified movie
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         description: Movie ID
     *         schema:
     *           type: string
     *     responses:
     *       '200':
     *         description: Successfully retrieved movie's cast
     *       '500':
     *         description: Internal server error
     */
    router.route('/:id/cast')
        .get(moviesController.getMovieCast);

    /**
     * @openapi
     * /api/movies/{id}/reviews:
     *   get:
     *     tags:
     *       - Movies
     *     summary: Get movie's reviews
     *     description: This endpoint returns reviews of the specified movie
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         description: Movie ID
     *         schema:
     *           type: string
     *     responses:
     *       '200':
     *         description: Successfully retrieved movie's reviews
     *       '500':
     *         description: Internal server error
     */
    router.route('/:id/reviews')
        .get(moviesController.getMovieReviews);

    /**
     * @openapi
     * /api/movies/{id}/similar:
     *   get:
     *     tags:
     *       - Movies
     *     summary: Get similar movies
     *     description: This endpoint returns movies similar to the specified movie
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         description: Movie ID
     *         schema:
     *           type: string
     *     responses:
     *       '200':
     *         description: Successfully retrieved similar movies
     *       '500':
     *         description: Internal server error
     */
    router.route('/:id/similar')
        .get(moviesController.getSimilarMovies);


    return router;
};
export default createMoviesRouter;
