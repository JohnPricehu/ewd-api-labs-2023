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

     router.route('/:id')
         .get(moviesController.getMovie);
 
     router.route('/')
         .get(moviesController.find); 
 
     // Add new routes
     router.route('/:id/images')
         .get(moviesController.getMovieImages);
     
     router.route('/:id/cast')
         .get(moviesController.getMovieCast);
     
     router.route('/:id/reviews')
         .get(moviesController.getMovieReviews);
     
     router.route('/:id/similar')
         .get(moviesController.getSimilarMovies);

    return router;
};
export default createMoviesRouter;
