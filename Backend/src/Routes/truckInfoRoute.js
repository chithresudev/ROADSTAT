import express from 'express';
import {
  getAllTruckInformation,
  getTruckInformationById,
  createTruckInformation,
  updateTruckInformationById,
  deleteTruckInformationById
} from '../Controllers/truckInfoController.js';

const truckInformationRouter = express.Router();

truckInformationRouter.get('/', getAllTruckInformation);
truckInformationRouter.get('/:truckId', getTruckInformationById);
truckInformationRouter.post('/', createTruckInformation);
truckInformationRouter.put('/:truckNo', updateTruckInformationById);
truckInformationRouter.delete('/:truckId', deleteTruckInformationById);

export default truckInformationRouter;
