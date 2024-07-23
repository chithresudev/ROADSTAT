import express from 'express';
import {
    getAllEngineHealths,
    getEngineHealthById,
    addEngineHealth,
    updateEngineHealth,
    deleteEngineHealth
} from '../../Controllers/maintenance-controllers/Engine-health.js';

const engineHealthRouter = express.Router();

// GET route handler to fetch all engine health details
engineHealthRouter.get('/engine-health', getAllEngineHealths);

// GET route handler to fetch engine health details by ID
engineHealthRouter.get('/engine-health/:id', getEngineHealthById);

// POST route handler to add a new engine health detail
engineHealthRouter.post('/engine-health', addEngineHealth);

// PUT route handler to update engine health details by ID
engineHealthRouter.put('/engine-health/:id', updateEngineHealth);

// DELETE route handler to delete engine health details by ID
engineHealthRouter.delete('/engine-health/:id', deleteEngineHealth);

export default engineHealthRouter;
