import express from 'express';
import ActorsController from '../controllers';
import AccountsController from '../../accounts/controllers';

const createActorsRouter = (dependencies) => {
    const router = express.Router();

    const actorsController = ActorsController(dependencies);
    const accountsController = AccountsController(dependencies);

    router.route('/*')
        .all(accountsController.verify);

    /**
     * @openapi
     * /api/actors/{id}:
     *   get:
     *     tags:
     *       - Actors
     *     summary: Get actor by id
     *     description: This endpoint returns actor details by actor ID
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         description: Actor ID
     *         schema:
     *           type: string
     *     responses:
     *       '200':
     *         description: Successfully retrieved actor
     *       '500':
     *         description: Internal server error
     */
    router.route('/:id')
        .get(actorsController.getActor);

    /**
     * @openapi
     * /api/actors/:
     *   get:
     *     tags:
     *       - Actors
     *     summary: Get actors
     *     description: This endpoint returns all actors
     *     responses:
     *       '200':
     *         description: Successfully retrieved actors
     *       '500':
     *         description: Internal server error
     */
    router.route('/')
        .get(actorsController.find);

    /**
     * @openapi
     * /api/actors/{id}/movies:
     *   get:
     *     tags:
     *       - Actors
     *     summary: Get actor's movies
     *     description: This endpoint returns movies of specified actor
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         description: Actor ID
     *         schema:
     *           type: string
     *     responses:
     *       '200':
     *         description: Successfully retrieved actor's movies
     *       '500':
     *         description: Internal server error
     */
    router.route('/:id/movies')
        .get(actorsController.getActorMovies);

    /**
     * @openapi
     * /api/actors/{id}/images:
     *   get:
     *     tags:
     *       - Actors
     *     summary: Get actor's images
     *     description: This endpoint returns images of specified actor
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         description: Actor ID
     *         schema:
     *           type: string
     *     responses:
     *       '200':
     *         description: Successfully retrieved actor's images
     *       '500':
     *         description: Internal server error
     */
    router.route('/:id/images')
        .get(actorsController.getActorImages);


    return router;
};
export default createActorsRouter;
