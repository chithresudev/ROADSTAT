import express from 'express';
import { 
    getAllDestinations, 
    getDestinationByTruckId, 
    addDestination, 
    updateDestinationById, 
    deleteDestinationById 
} from '../Controllers/destinationController.js';

const destinationRouter = express.Router();

destinationRouter.get('/destinations', getAllDestinations);
destinationRouter.get('/destinations/:truckId', getDestinationByTruckId);
destinationRouter.post('/destinations', addDestination);
destinationRouter.put('/destinations/:id', updateDestinationById);
destinationRouter.delete('/destinations/:id', deleteDestinationById);

export default destinationRouter;