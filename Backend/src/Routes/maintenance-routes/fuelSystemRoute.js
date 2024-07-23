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
fuelSystemRouter.get('/fuel-system', getAllFuelSystems);

// GET route handler to fetch fuel system details by ID
fuelSystemRouter.get('/fuel-system/:id', getFuelSystemById);

// POST route handler to add a new fuel system detail
fuelSystemRouter.post('/fuel-system', addFuelSystem);

// PUT route handler to update fuel system details by ID
fuelSystemRouter.put('/fuel-system/:id', updateFuelSystem);

// DELETE route handler to delete fuel system details by ID
fuelSystemRouter.delete('/fuel-system/:id', deleteFuelSystem);

export default fuelSystemRouter;