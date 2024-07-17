import express from 'express';
import {
  getTruckLocationByTruckId,
  getAllTruckLocations,
  createTruckLocation,
  updateTruckLocationByTruckId,
  deleteTruckLocationByTruckId
} from '../Controllers/truckLocationController.js';

const truckLocationRouter = express.Router();

truckLocationRouter.get('/truck-location/:truckId', getTruckLocationByTruckId);
truckLocationRouter.get('/truck-location', getAllTruckLocations);
truckLocationRouter.post('/truck-location', createTruckLocation);
truckLocationRouter.put('/truck-location/:truckId', updateTruckLocationByTruckId);
truckLocationRouter.delete('/truck-location/:truckId', deleteTruckLocationByTruckId);

export default truckLocationRouter;
