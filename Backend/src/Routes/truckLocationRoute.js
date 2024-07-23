import express from 'express';
import {
  getTruckLocationByTruckId,
  getAllTruckLocations,
  createTruckLocation,
  updateTruckLocationByTruckId,
  deleteTruckLocationByTruckId
} from '../Controllers/truckLocationController.js';

const truckLocationRouter = express.Router();

truckLocationRouter.get('/:truckId', getTruckLocationByTruckId);
truckLocationRouter.get('/', getAllTruckLocations);
truckLocationRouter.post('/', createTruckLocation);
truckLocationRouter.put('/:truckId', updateTruckLocationByTruckId);
truckLocationRouter.delete('/:truckId', deleteTruckLocationByTruckId);

export default truckLocationRouter;
