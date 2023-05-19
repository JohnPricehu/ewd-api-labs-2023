import accountService from "../services";

export default (dependencies) => {

    const passwordRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&-+=()])(?=\S+$).{7,20}$/;
    
    const createAccount = async (request, response, next) => {
        const { firstName, lastName, email, password } = request.body;

        // Adding validation for firstName and lastName length
        if (firstName.length < 1 || firstName.length > 30) {
            return response.status(400).send({ error: 'FirstName must be between 1 and 30 characters.' });
        }
        if (lastName.length < 1 || lastName.length > 30) {
            return response.status(400).send({ error: 'LastName must be between 1 and 30 characters.' });
        }

        // Validate password strength
        if (!passwordRegex.test(password)) {
            return response.status(400).send({ error: 'Password does not meet the strength requirements.' });
        }

        const account = await accountService.registerAccount(firstName, lastName, email, password, dependencies);
        response.status(201).json(account)
    };
    const getAccount = async (request, response, next) => {
        //input
        const accountId = request.params.id;
        // Treatment
        const account = await accountService.getAccount(accountId, dependencies);
        //output
        response.status(200).json(account);
    };
    const listAccounts = async (request, response, next) => {
        // Treatment
        const accounts = await accountService.find(dependencies);
        //output
        response.status(200).json(accounts);
    };

    const updateAccount = async (request, response, next) => {
        // Input
        const id = request.params.id;
        const { firstName, lastName, email, password } = request.body;
        // Treatment
        const account = await accountService.updateAccount(id, firstName, lastName, email, password, dependencies);
        // Output
        response.status(200).json(account);
      };
    
    const authenticateAccount = async (request, response, next) => {
        try {
            const { email, password } = request.body;
            const token = await accountService.authenticate(email, password, dependencies);
            response.status(200).json({ token: `BEARER ${token}` });
        } catch (error) {
            response.status(401).json({ message: 'Unauthorised' });
        }
    };

    const addFavourite = async (request, response, next) => {
        try {
            const { movieId } = request.body;
            const id = request.params.id;
            const account = await accountService.getAccount(id, dependencies);
            
            // Preventing duplicate favorites
            if (account.favourites.includes(movieId)) {
                return response.status(400).send({ error: 'This movie is already a favourite.' });
            }

            const updatedAccount = await accountService.addFavourite(id, movieId, dependencies);
            response.status(200).json(updatedAccount);
        } catch (err) {
            next(new Error(`Invalid Data ${err.message}`));
        }
    };

    const getFavourites = async (request, response, next) => {
        try {
            const id = request.params.id;
            const favourites = await accountService.getFavourites(id, dependencies);
            response.status(200).json(favourites);
        } catch (err) {
            next(new Error(`Invalid Data ${err.message}`));
        }
    };

    const verify = async (request, response, next) => {
        try { 
        // Input
        const authHeader = request.headers.authorization;

        // Treatment

        const accessToken = authHeader.split(" ")[1];
        const user = await accountService.verifyToken(accessToken, dependencies);

        //output
        next();
    }catch(err){
        //Token Verification Failed
        next(new Error(`Verification Failed ${err.message}`));
        }
    };


    return {
        createAccount,
        getAccount,
        listAccounts,
        updateAccount,
        authenticateAccount,
        addFavourite,
        getFavourites,
        verify
    };
};
