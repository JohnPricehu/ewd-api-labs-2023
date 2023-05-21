import express from 'express';
import {movies, upcomingMovies, movieReviews, movieDetails, movieImages, movieCast, similarMovies} from './moviesData';

const router = express.Router(); 

router.get('/', (req, res) => {
    res.json(movies);
});

router.get('/upcoming', (req, res) => {
    res.json(upcomingMovies);
});

// Get movie details
router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    if (movieDetails.id == id) {
        res.status(200).json(movieDetails);
    } else {
        res.status(404).json({
            message: 'The resource you requested could not be found.',
            status_code: 404
        });
    }
});

// Get movie reviews
router.get('/:id/reviews', (req, res) => {
    const id = parseInt(req.params.id);
    if (movieReviews.id == id) {
        res.status(200).json(movieReviews);
    } else {
        res.status(404).json({
            message: 'The resource you requested could not be found.',
            status_code: 404
        });
    }
}); 

// Get movie images
router.get('/:id/images', (req, res) => {
    const id = parseInt(req.params.id);
    if (movieImages.id == id) {
        res.status(200).json(movieImages);
    } else {
        res.status(404).json({
            message: 'The resource you requested could not be found.',
            status_code: 404
        });
    }
});

// Get movie cast
router.get('/:id/cast', (req, res) => {
    const id = parseInt(req.params.id);
    if (movieCast.id == id) {
        res.status(200).json(movieCast);
    } else {
        res.status(404).json({
            message: 'The resource you requested could not be found.',
            status_code: 404
        });
    }
});

// Get similar movies
router.get('/:id/similar', (req, res) => {
    const id = parseInt(req.params.id);
    if (similarMovies.id == id) {
        res.status(200).json(similarMovies);
    } else {
        res.status(404).json({
            message: 'The resource you requested could not be found.',
            status_code: 404
        });
    }
});

export default router;
