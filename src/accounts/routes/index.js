import ValidationController from '../controllers/ValidationController'; //add to import statements at top of file
import express from 'express';
import AccountsController from '../controllers';



const createRouter = (dependencies) => {
    const router = express.Router();
    // load controller with dependencies
    const validationController = ValidationController(dependencies);//Add this lineLoad validation controller with dependencies
    const accountsController = AccountsController(dependencies);
    router.route('/')
        .post(validationController.validateAccount,accountsController.createAccount); //add validateAccount to route
    // router.route('/')
    //     .post(accountsController.createAccount);

    router.route('/')
        .get(accountsController.listAccounts);

    router.route('/:id')
        .get(accountsController.getAccount);

        router.route('/:id')
        .put(accountsController.updateAccount);
       
    router.route('/security/token')
                .post(accountsController.authenticateAccount);

    router.route('/:id/favourites')
                .post(accountsController.addFavourite);
    router.route('/:id/favourites')
                .get(accountsController.getFavourites);
    router.route('/:id/mustwatches')
                .post(accountsController.addMustWatch);
    router.route('/:id/mustwatches')
                .get(accountsController.getMustWatches);
        
    return router;
};


export default createRouter;
