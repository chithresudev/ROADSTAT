import express from 'express';
import { Accident } from '../../models/Accident.js';

const accidentDetailsRouter = express.Router();

// GET route handler for fetching all accident details
accidentDetailsRouter.get('/accidents', async (req, res) => {
    try {
        const accidents = await Accident.find();
        res.json(accidents);
    } catch (error) {
        console.error('Error fetching accident details:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// GET route handler for fetching accident details by ID
accidentDetailsRouter.get('/accidents/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const accident = await Accident.findById(id);
        if (!accident) {
            return res.status(404).json({ message: "Accident details not found" });
        }
        res.json(accident);
    } catch (error) {
        console.error('Error fetching accident details:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// POST route handler for adding new accident details
accidentDetailsRouter.post('/accidents', async (req, res) => {
    try {
        const { truckDrivingId, incidentDate, location, severity, description } = req.body;
        const accident = await Accident.create({ truckDrivingId, incidentDate, location, severity, description });
        res.json(accident);
    } catch (error) {
        console.error('Error adding accident details:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// PUT route handler for updating accident details by ID
accidentDetailsRouter.put('/accidents/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { truckDrivingId, incidentDate, location, severity, description } = req.body;
        const updatedAccident = await Accident.findByIdAndUpdate(id, {
            truckDrivingId, incidentDate, location, severity, description
        }, { new: true });
        if (!updatedAccident) {
            return res.status(404).json({ message: "Accident not found" });
        }
        res.json(updatedAccident);
    } catch (error) {
        console.error('Error updating accident details:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// DELETE route handler for deleting accident details by ID
accidentDetailsRouter.delete('/accidents/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedAccident = await Accident.findByIdAndDelete(id);
        if (!deletedAccident) {
            return res.status(404).json({ message: "Accident not found" });
        }
        res.json({ message: "Accident deleted successfully" });
    } catch (error) {
        console.error('Error deleting accident details:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

export default accidentDetailsRouter;
