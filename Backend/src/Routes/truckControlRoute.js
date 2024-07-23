import express from 'express';
import {
  getAllTruckControlDetails,
  getTruckControlDetailsById,
  createTruckControlDetails,
  updateTruckControlDetailsById,
  deleteTruckControlDetailsById
} from '../Controllers/truckControlController.js';

const truckControlRouter = express.Router();

truckControlRouter.get('/', getAllTruckControlDetails);
truckControlRouter.get('/:truckId', getTruckControlDetailsById);
truckControlRouter.post('/', createTruckControlDetails);
truckControlRouter.put('/:truckNo', updateTruckControlDetailsById);
truckControlRouter.delete('/:truckId', deleteTruckControlDetailsById);

export default truckControlRouter;
