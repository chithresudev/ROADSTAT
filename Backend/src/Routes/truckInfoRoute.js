import express from 'express';
import {
  getAllTruckInformation,
  getTruckInformationById,
  createTruckInformation,
  updateTruckInformationById,
  deleteTruckInformationById
} from '../Controllers/truckInfoController.js';

const truckInformationRouter = express.Router();

truckInformationRouter.get('/truck-information', getAllTruckInformation);
truckInformationRouter.get('/truck-information/:truckId', getTruckInformationById);
truckInformationRouter.post('/truck-information', createTruckInformation);
truckInformationRouter.put('/truck-information/:truckNo', updateTruckInformationById);
truckInformationRouter.delete('/truck-information/:truckId', deleteTruckInformationById);

export default truckInformationRouter;
