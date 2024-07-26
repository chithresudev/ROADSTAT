import express from 'express';
import {
    getAllBrakeSystems,
    getBrakeSystemById,
    addBrakeSystem,
    updateBrakeSystem,
    deleteBrakeSystem
} from '../../Controllers/maintenance-controllers/Brake-system.js';

const brakeSystemRouter = express.Router();

// GET route handler to fetch all brake system details
brakeSystemRouter.get('/', getAllBrakeSystems);

// GET route handler to fetch brake system details by ID
brakeSystemRouter.get('/:id', getBrakeSystemById);

// POST route handler to add a new brake system detail
brakeSystemRouter.post('/', addBrakeSystem);

// PUT route handler to update brake system details by ID
brakeSystemRouter.put('/:id', updateBrakeSystem);

// DELETE route handler to delete brake system details by ID
brakeSystemRouter.delete('/:id', deleteBrakeSystem);

export default brakeSystemRouter;
