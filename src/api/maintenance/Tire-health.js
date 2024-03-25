import express from 'express';
import { TireHealth } from '../../models/TireHealth.js'; // Corrected import path

const tireHealthRouter = express.Router();

// GET route handler
tireHealthRouter.get('/tire-health', async (req, res) => {
    try {
        const tireHealths = await TireHealth.find();
        res.json(tireHealths);
    } catch (error) {
        console.error('Error fetching tire health details:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

tireHealthRouter.get('/tire-health/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const tireHealth = await TireHealth.findById(id);
        if (!tireHealth) {
            return res.status(404).json({ message: "Tire health details not found" });
        }
        res.json(tireHealth);
    } catch (error) {
        console.error('Error fetching tire health details:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// POST route handler
tireHealthRouter.post('/tire-health', async (req, res) => {
    try {
        const {
            _id,
            truckId,
            truckName,
            tirePressure,
            tireTemperature,
            tireDepth,
            tireAge
        } = req.body;
        const tireHealth = await TireHealth.create({
            _id,
            truckId,
            truckName,
            tirePressure,
            tireTemperature,
            tireDepth,
            tireAge
        });
        res.json(tireHealth);
    } catch (error) {
        console.error('Error adding tire health details:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// PUT route handler
tireHealthRouter.put('/tire-health/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const {
            truckId,
            truckName,
            tirePressure,
            tireTemperature,
            tireDepth,
            tireAge
        } = req.body;

        const updatedTireHealth = await TireHealth.findByIdAndUpdate(id, {
            truckId,
            truckName,
            tirePressure,
            tireTemperature,
            tireDepth,
            tireAge
        }, { new: true });

        if (!updatedTireHealth) {
            return res.status(404).json({ message: "Tire health details not found" });
        }

        res.json(updatedTireHealth);
    } catch (error) {
        console.error('Error updating tire health details:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// DELETE route handler
tireHealthRouter.delete('/tire-health/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const deletedTireHealth = await TireHealth.findByIdAndDelete(id);

        if (!deletedTireHealth) {
            return res.status(404).json({ message: "Tire health details not found" });
        }

        res.json({ message: "Tire health details deleted successfully" });
    } catch (error) {
        console.error('Error deleting tire health details:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

export default tireHealthRouter;
