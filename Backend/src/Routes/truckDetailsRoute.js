import express from 'express';
import {
    getAllTrucks,
    getTruckById,
    createTruck,
    updateTruckById,
    deleteTruckById
} from '../Controllers/truckDetailsController.js';

const truckDetailsRouter = express.Router();

truckDetailsRouter.get('/', getAllTrucks);
truckDetailsRouter.get('/:id', getTruckById);
truckDetailsRouter.post('/trucks', createTruck);
truckDetailsRouter.put('/:id', updateTruckById);
truckDetailsRouter.delete('/:id', deleteTruckById);

export default truckDetailsRouter;
