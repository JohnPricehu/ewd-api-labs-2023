import express from 'express';
import GenresController from '../controllers';
import AccountsController from '../../accounts/controllers'; //ADD THIS: imports accounts controller

const createGenresRouter = (dependencies) => {
    const router = express.Router();
    // load controllers with dependencies
    const genresController = GenresController(dependencies);
    const accountsController = AccountsController(dependencies);//ADD THIS: Create accountsController with dependencies
    // console.log('genresController:', genresController); // Add this
     router.route('/*')
         .all(accountsController.verify); //ADD THIS: require token for all routes


    /**
     * @openapi
     * /api/genres/:
     *   get:
     *     tags:
     *       - Genres
     *     summary: Get genres
     *     description: This endpoint returns all genres
     *     responses:
     *       '200':
     *         description: Successfully retrieved genres
     *       '500':
     *         description: Internal server error
     */
    router.route('/')
        .get(genresController.find);



    return router;
};
export default createGenresRouter;
