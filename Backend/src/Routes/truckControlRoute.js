import express from 'express';
import {
  getAllTruckControlDetails,
  getTruckControlDetailsById,
  createTruckControlDetails,
  updateTruckControlDetailsById,
  deleteTruckControlDetailsById
} from '../Controllers/truckControlController.js';

const truckControlRouter = express.Router();

truckControlRouter.get('/truck-control', getAllTruckControlDetails);
truckControlRouter.get('/truck-control/:truckId', getTruckControlDetailsById);
truckControlRouter.post('/truck-control', createTruckControlDetails);
truckControlRouter.put('/truck-control/:truckNo', updateTruckControlDetailsById);
truckControlRouter.delete('/truck-control/:truckId', deleteTruckControlDetailsById);

export default truckControlRouter;
