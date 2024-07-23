import express from 'express';
import {
    getAllTransmissions,
    getTransmissionById,
    addTransmission,
    updateTransmission,
    deleteTransmission
} from '../../Controllers/maintenance-controllers/Transmission-status.js';

const transmissionRouter = express.Router();

// GET route handler to fetch all transmission details
transmissionRouter.get('/transmission', getAllTransmissions);

// GET route handler to fetch transmission details by truck ID
transmissionRouter.get('/transmission/:id', getTransmissionById);

// POST route handler to add new transmission details
transmissionRouter.post('/transmission', addTransmission);

// PUT route handler to update transmission details by ID
transmissionRouter.put('/transmission/:id', updateTransmission);

// DELETE route handler to delete transmission details by ID
transmissionRouter.delete('/transmission/:id', deleteTransmission);

export default transmissionRouter;