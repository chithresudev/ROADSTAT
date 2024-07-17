import express from 'express';
import {
    getAllTrailers,
    getTrailerById,
    createTrailer,
    updateTrailerById,
    deleteTrailerById
} from '../Controllers/trailerDetailsController.js';

const trailerDetailsRouter = express.Router();

trailerDetailsRouter.get('/trailers', getAllTrailers);
trailerDetailsRouter.get('/trailers/:id', getTrailerById);
trailerDetailsRouter.post('/trailers', createTrailer);
trailerDetailsRouter.put('/trailers/:id', updateTrailerById);
trailerDetailsRouter.delete('/trailers/:id', deleteTrailerById);

export default trailerDetailsRouter;
