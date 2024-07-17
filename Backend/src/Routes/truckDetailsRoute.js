import express from 'express';
import {
    getAllTrucks,
    getTruckById,
    createTruck,
    updateTruckById,
    deleteTruckById
} from '../Controllers/truckDetailsController.js';

const truckDetailsRouter = express.Router();

truckDetailsRouter.get('/trucks', getAllTrucks);
truckDetailsRouter.get('/trucks/:id', getTruckById);
truckDetailsRouter.post('/trucks', createTruck);
truckDetailsRouter.put('/trucks/:id', updateTruckById);
truckDetailsRouter.delete('/trucks/:id', deleteTruckById);

export default truckDetailsRouter;
