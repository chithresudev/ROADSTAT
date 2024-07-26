import express from 'express';
import {
    getAllFuelSystems,
    getFuelSystemById,
    addFuelSystem,
    updateFuelSystem,
    deleteFuelSystem
} from '../../Controllers/maintenance-controllers/Fuel-system.js';

const fuelSystemRouter = express.Router();

// GET route handler to fetch all fuel system details
fuelSystemRouter.get('/', getAllFuelSystems);

// GET route handler to fetch fuel system details by ID
fuelSystemRouter.get('/:id', getFuelSystemById);

// POST route handler to add a new fuel system detail
fuelSystemRouter.post('/', addFuelSystem);

// PUT route handler to update fuel system details by ID
fuelSystemRouter.put('/:id', updateFuelSystem);

// DELETE route handler to delete fuel system details by ID
fuelSystemRouter.delete('/:id', deleteFuelSystem);

export default fuelSystemRouter;