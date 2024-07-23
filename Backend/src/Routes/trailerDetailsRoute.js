import express from 'express';
import {
    getAllTrailers,
    getTrailerById,
    createTrailer,
    updateTrailerById,
    deleteTrailerById
} from '../Controllers/trailerDetailsController.js';

const trailerDetailsRouter = express.Router();

trailerDetailsRouter.get('/', getAllTrailers);
trailerDetailsRouter.get('/:id', getTrailerById);
trailerDetailsRouter.post('/', createTrailer);
trailerDetailsRouter.put('/:id', updateTrailerById);
trailerDetailsRouter.delete('/:id', deleteTrailerById);

export default trailerDetailsRouter;
