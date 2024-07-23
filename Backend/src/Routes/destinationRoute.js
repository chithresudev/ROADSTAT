import express from 'express';
import { 
    getAllDestinations, 
    getDestinationByTruckId, 
    addDestination, 
    updateDestinationById, 
    deleteDestinationById 
} from '../Controllers/destinationController.js';

const destinationRouter = express.Router();

destinationRouter.get('/', getAllDestinations);
destinationRouter.get('/:truckId', getDestinationByTruckId);
destinationRouter.post('/', addDestination);
destinationRouter.put('/:id', updateDestinationById);
destinationRouter.delete('/:id', deleteDestinationById);

export default destinationRouter;