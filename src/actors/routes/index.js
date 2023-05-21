import express from 'express';
import ActorsController from '../controllers';
import AccountsController from '../../accounts/controllers';

const createActorsRouter = (dependencies) => {
    const router = express.Router();

    const actorsController = ActorsController(dependencies);
    const accountsController = AccountsController(dependencies);

    router.route('/*')
        .all(accountsController.verify);

    router.route('/:id')
        .get(actorsController.getActor);

    router.route('/')
        .get(actorsController.find);

    router.route('/:id/movies')
        .get(actorsController.getActorMovies);

    router.route('/:id/images')
        .get(actorsController.getActorImages);

    return router;
};
export default createActorsRouter;
