import express from 'express';
import {
    getAllTrailerLocations,
    getTrailerLocationById,
    addTrailerLocation,
    updateTrailerLocation,
    deleteTrailerLocation
} from '../Controllers/trailerLocationController.js';

const trailerLocationRouter = express.Router();

trailerLocationRouter.get('/', getAllTrailerLocations);
trailerLocationRouter.get('/:trailerId', getTrailerLocationById);
trailerLocationRouter.post('/', addTrailerLocation);
trailerLocationRouter.put('/:trailerId', updateTrailerLocation);
trailerLocationRouter.delete('/:trailerId', deleteTrailerLocation);

export default trailerLocationRouter;