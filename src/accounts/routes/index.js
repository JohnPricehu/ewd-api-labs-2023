import ValidationController from '../controllers/ValidationController'; //add to import statements at top of file
import express from 'express';
import AccountsController from '../controllers';



const createRouter = (dependencies) => {
    const router = express.Router();
    // load controller with dependencies
    const validationController = ValidationController(dependencies);//Add this lineLoad validation controller with dependencies
    const accountsController = AccountsController(dependencies);
    
        /**
     * @openapi
     * /api/accounts:
     *   post:
     *     tags:
     *       - Accounts
     *     summary: Create a new account
     *     description: This endpoint creates a new account
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/Account'
     *     responses:
     *       '201':
     *         description: Account created successfully
     *       '400':
     *         description: Invalid request body
     *       '500':
     *         description: Internal server error
     */
        router.route('/')
            .post(validationController.validateAccount,accountsController.createAccount); //add validateAccount to route
        // router.route('/')
        //     .post(accountsController.createAccount);
    /**
     * @openapi
     * /api/accounts:
     *   get:
     *     tags:
     *       - Accounts
     *     summary: List all accounts
     *     description: This endpoint lists all accounts
     *     responses:
     *       '200':
     *         description: Success
     *       '500':
     *         description: Internal server error
     */
        router.route('/')
            .get(accountsController.listAccounts);
    /**
     * @openapi
     * /api/accounts/{id}:
     *   get:
     *     tags:
     *       - Accounts
     *     summary: Get account by ID
     *     description: This endpoint returns an account by ID
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         description: Account ID
     *         schema:
     *           type: string
     *     responses:
     *       '200':
     *         description: Success
     *       '404':
     *         description: Account not found
     *       '500':
     *         description: Internal server error
     */
        router.route('/:id')
            .get(accountsController.getAccount);
    /**
     * @openapi
     * /api/accounts/{id}:
     *   put:
     *     tags:
     *       - Accounts
     *     summary: Update an existing account
     *     description: This endpoint updates an existing account
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         description: Account ID
     *         schema:
     *           type: string
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/Account'
     *     responses:
     *       '200':
     *         description: Account updated successfully
     *       '400':
     *         description: Invalid request body
     *       '500':
     *         description: Internal server error
     */
        router.route('/:id')
            .put(accountsController.updateAccount);
    /**
     * @openapi
     * /api/accounts/security/token:
     *   post:
     *     tags:
     *       - Accounts
     *     summary: Authenticate an account
     *     description: This endpoint authenticates an account and returns a token
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               email:
     *                 type: string
     *               password:
     *                 type: string
     *     responses:
     *       '200':
     *         description: Success
     *       '401':
     *         description: Unauthorized
     *       '500':
     *         description: Internal server error
     */   
    router.route('/security/token')
    .post(accountsController.authenticateAccount);   
        /**
     * @openapi
     * /api/accounts/{id}/favourites:
     *   post:
     *     tags:
     *       - Accounts
     *     summary: Add a movie to favourite list
     *     description: This endpoint adds a movie to the favourite list of the specified account
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         description: Account ID
     *         schema:
     *           type: string
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               movieId:
     *                 type: string
     *     responses:
     *       '200':
     *         description: Movie added to favourite list successfully
     *       '400':
     *         description: Invalid request body
     *       '500':
     *         description: Internal server error
     */
    router.route('/:id/favourites')
    .post(accountsController.addFavourite);

    /**
    * @openapi
    * /api/accounts/{id}/favourites:
    *   get:
    *     tags:
    *       - Accounts
    *     summary: Get favourites list
    *     description: This endpoint returns the favourite movies of the specified account
    *     parameters:
    *       - in: path
    *         name: id
    *         required: true
    *         description: Account ID
    *         schema:
    *           type: string
    *     responses:
    *       '200':
    *         description: Successfully retrieved list
    *       '500':
    *         description: Internal server error
    */
    router.route('/:id/favourites')
    .get(accountsController.getFavourites);

    /**
    * @openapi
    * /api/accounts/{id}/mustwatches:
    *   post:
    *     tags:
    *       - Accounts
    *     summary: Add a movie to must watch list
    *     description: This endpoint adds a movie to the must watch list of the specified account
    *     parameters:
    *       - in: path
    *         name: id
    *         required: true
    *         description: Account ID
    *         schema:
    *           type: string
    *     requestBody:
    *       required: true
    *       content:
    *         application/json:
    *           schema:
    *             type: object
    *             properties:
    *               movieId:
    *                 type: string
    *     responses:
    *       '200':
    *         description: Movie added to must watch list successfully
    *       '400':
    *         description: Invalid request body
    *       '500':
    *         description: Internal server error
    */
    router.route('/:id/mustwatches')
    .post(accountsController.addMustWatch);

    /**
    * @openapi
    * /api/accounts/{id}/mustwatches:
    *   get:
    *     tags:
    *       - Accounts
    *     summary: Get must watch list
    *     description: This endpoint returns the must watch movies of the specified account
    *     parameters:
    *       - in: path
    *         name: id
    *         required: true
    *         description: Account ID
    *         schema:
    *           type: string
    *     responses:
    *       '200':
    *         description: Successfully retrieved list
    *       '500':
    *         description: Internal server error
    */
    router.route('/:id/mustwatches')
    .get(accountsController.getMustWatches);
        
    return router;
};


export default createRouter;
