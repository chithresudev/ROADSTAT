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
engineHealthRouter.get('/', getAllEngineHealths);

// GET route handler to fetch engine health details by ID
engineHealthRouter.get('/:id', getEngineHealthById);

// POST route handler to add a new engine health detail
engineHealthRouter.post('/', addEngineHealth);

// PUT route handler to update engine health details by ID
engineHealthRouter.put('/:id', updateEngineHealth);

// DELETE route handler to delete engine health details by ID
engineHealthRouter.delete('/:id', deleteEngineHealth);

export default engineHealthRouter;
