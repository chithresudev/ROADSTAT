import express from 'express';
import {
    getAllTruckEfficiency,
    getTruckEfficiencyById,
    createTruckEfficiency,
    updateTruckEfficiencyById,
    deleteTruckEfficiencyById
} from '../Controllers/truckEfficiencyController.js';

const truckEfficiencyRouter = express.Router();

truckEfficiencyRouter.get('/truck-efficiency', getAllTruckEfficiency);
truckEfficiencyRouter.get('/truck-efficiency/:id', getTruckEfficiencyById);
truckEfficiencyRouter.post('/truck-efficiency', createTruckEfficiency);
truckEfficiencyRouter.put('/truck-efficiency/:id', updateTruckEfficiencyById);
truckEfficiencyRouter.delete('/truck-efficiency/:id', deleteTruckEfficiencyById);

export default truckEfficiencyRouter;
