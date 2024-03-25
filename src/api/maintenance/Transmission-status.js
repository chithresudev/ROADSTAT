import express from 'express';
import { Transmission } from '../../models/Transmission.js';

const transmissionRouter = express.Router();

// GET route handler
transmissionRouter.get('/transmission', async (req, res) => {
    try {
        const transmissions = await Transmission.find();
        res.json(transmissions);
    } catch (error) {
        console.error('Error fetching transmission details:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

transmissionRouter.get('/transmission/:truckId', async (req, res) => {
    try {
        const { id } = req.params;
        const transmission = await Transmission.findById(id);
        if (!transmission) {
            return res.status(404).json({ message: "Transmission details not found" });
        }
        res.json(transmission);
    } catch (error) {
        console.error('Error fetching transmission details:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// POST route handler
transmissionRouter.post('/transmission', async (req, res) => {
    try {
        const {
            _id,
            truckId,
            RPM,
            engineTemperature,
            oilPressure,
            coolantTemperature,
            status
        } = req.body;
        const transmission = await Transmission.create({
            _id,
            truckId,
            RPM,
            engineTemperature,
            oilPressure,
            coolantTemperature,
            status
        });
        res.json(transmission);
    } catch (error) {
        console.error('Error adding transmission details:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// PUT route handler
transmissionRouter.put('/transmission/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const {
            truckId,
            RPM,
            engineTemperature,
            oilPressure,
            coolantTemperature,
            status
        } = req.body;

        const updatedTransmission = await Transmission.findByIdAndUpdate(id, {
            truckId,
            RPM,
            engineTemperature,
            oilPressure,
            coolantTemperature,
            status
        }, { new: true });

        if (!updatedTransmission) {
            return res.status(404).json({ message: "Transmission details not found" });
        }

        res.json(updatedTransmission);
    } catch (error) {
        console.error('Error updating transmission details:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// DELETE route handler
transmissionRouter.delete('/transmission/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const deletedTransmission = await Transmission.findByIdAndDelete(id);

        if (!deletedTransmission) {
            return res.status(404).json({ message: "Transmission details not found" });
        }

        res.json({ message: "Transmission details deleted successfully" });
    } catch (error) {
        console.error('Error deleting transmission details:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

export default transmissionRouter;
