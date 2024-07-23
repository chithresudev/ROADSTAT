import express from 'express';
import {
    getAllTrailerLocations,
    getTrailerLocationById,
    addTrailerLocation,
    updateTrailerLocation,
    deleteTrailerLocation
} from '../Controllers/trailerLocationController.js';

const trailerLocationRouter = express.Router();

trailerLocationRouter.get('/trailer-location', getAllTrailerLocations);
trailerLocationRouter.get('/trailer-location/:trailerId', getTrailerLocationById);
trailerLocationRouter.post('/trailer-location', addTrailerLocation);
trailerLocationRouter.put('/trailer-location/:trailerId', updateTrailerLocation);
trailerLocationRouter.delete('/trailer-location/:trailerId', deleteTrailerLocation);

export default trailerLocationRouter;