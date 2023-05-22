import dotenv from 'dotenv';
import express from 'express';
//import moviesRouter from './src/movies';
import genresRouter from './src/genres';
import createAccountsRouter from './src/accounts/routes';
import buildDependencies from "./src/config/dependencies";
import createMoviesRouter from './src/movies/routes';
import createActorsRouter from './src/actors/routes';
import db from './src/config/db';
import errorHandler from './src/utils/ErrorHandler';
import createGenresRouter from './src/genres/routes';

dotenv.config();

db.init(); //add BELOW dotenv.config();
//.. Add this after db.init();

const port = process.env.PORT;

const dependencies = buildDependencies();

const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'My API',
      version: '1.0.0',
    },
  },
  apis: ['./src/**/*.js'], // path to the API files
};

const specs = swaggerJsdoc(options);


const app = express();


// Use express.json middleware to parse JSON request bodies
app.use(express.json());

app.use('/api/movies', createMoviesRouter(dependencies));
app.use('/api/accounts', createAccountsRouter(dependencies));
app.use('/api/actors', createActorsRouter(dependencies));
app.use('/api/genres', createGenresRouter(dependencies));

app.use(errorHandler);

const swaggerUi = require('swagger-ui-express');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));


app.listen(port, () => {
  console.info(`Server running at ${port}`);
});
