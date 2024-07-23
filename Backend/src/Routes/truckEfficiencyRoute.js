import express from 'express';
import {
    getAllTruckEfficiency,
    getTruckEfficiencyById,
    createTruckEfficiency,
    updateTruckEfficiencyById,
    deleteTruckEfficiencyById
} from '../Controllers/truckEfficiencyController.js';

const truckEfficiencyRouter = express.Router();

truckEfficiencyRouter.get('/', getAllTruckEfficiency);
truckEfficiencyRouter.get('/:id', getTruckEfficiencyById);
truckEfficiencyRouter.post('/', createTruckEfficiency);
truckEfficiencyRouter.put('/:id', updateTruckEfficiencyById);
truckEfficiencyRouter.delete('/:id', deleteTruckEfficiencyById);

export default truckEfficiencyRouter;
