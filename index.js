import dotenv from 'dotenv';
import express from 'express';
//import moviesRouter from './src/movies';
import genresRouter from './src/genres';
import createAccountsRouter from './src/accounts/routes';
import buildDependencies from "./src/config/dependencies";
import createMoviesRouter from './src/movies/routes';

dotenv.config();

//.. Add this after db.init();

const port = process.env.PORT;

const dependencies = buildDependencies();

const app = express();

// Use express.json middleware to parse JSON request bodies
app.use(express.json());

app.use('/api/movies', createMoviesRouter(dependencies));
app.use('/api/genres', genresRouter);
app.use('/api/accounts', createAccountsRouter(dependencies));

app.listen(port, () => {
  console.info(`Server running at ${port}`);
});
