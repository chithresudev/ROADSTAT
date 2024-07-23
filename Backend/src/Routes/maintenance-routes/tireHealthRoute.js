import express from 'express';
import {
    getAllTireHealths,
    getTireHealthById,
    addTireHealth,
    updateTireHealth,
    deleteTireHealth
} from '../../Controllers/maintenance-controllers/Tire-health.js';

const tireHealthRouter = express.Router();

// GET route handler to fetch all tire health details
tireHealthRouter.get('/', getAllTireHealths);

// GET route handler to fetch tire health details by ID
tireHealthRouter.get('/:id', getTireHealthById);

// POST route handler to add new tire health details
tireHealthRouter.post('/', addTireHealth);

// PUT route handler to update tire health details by ID
tireHealthRouter.put('/:id', updateTireHealth);

// DELETE route handler to delete tire health details by ID
tireHealthRouter.delete('/:id', deleteTireHealth);

export default tireHealthRouter;
