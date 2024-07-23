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
brakeSystemRouter.get('/brake-system', getAllBrakeSystems);

// GET route handler to fetch brake system details by ID
brakeSystemRouter.get('/brake-system/:id', getBrakeSystemById);

// POST route handler to add a new brake system detail
brakeSystemRouter.post('/brake-system', addBrakeSystem);

// PUT route handler to update brake system details by ID
brakeSystemRouter.put('/brake-system/:id', updateBrakeSystem);

// DELETE route handler to delete brake system details by ID
brakeSystemRouter.delete('/brake-system/:id', deleteBrakeSystem);

export default brakeSystemRouter;
