import express from 'express';
import { BrakeSystem } from '../../models/BrakeSystem.js'; // Corrected import path

const brakeSystemRouter = express.Router();

// GET route handler
brakeSystemRouter.get('/brake-system', async (req, res) => {
    try {
        const brakes = await BrakeSystem.find(); // Corrected usage of BrakeSystem model
        res.json(brakes);
    } catch (error) {
        console.error('Error fetching brake system details:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

brakeSystemRouter.get('/brake-system/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const brake = await BrakeSystem.findById(id); // Corrected usage of BrakeSystem model
        if (!brake) {
            return res.status(404).json({ message: "Brake system details not found" });
        }
        res.json(brake);
    } catch (error) {
        console.error('Error fetching brake system details:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// POST route handler
brakeSystemRouter.post('/brake-system', async (req, res) => {
    try {
        const {
            truckNo,
            truckName,
            padWear,
            fluidLevel,
            pressure,
            absStatus
        } = req.body;
        const brake = await BrakeSystem.create({ // Corrected usage of BrakeSystem model
            truckNo,
            truckName,
            padWear,
            fluidLevel,
            pressure,
            absStatus
        });
        res.json(brake);
    } catch (error) {
        console.error('Error adding brake system details:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// PUT route handler
brakeSystemRouter.put('/brake-system/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const {
            truckNo,
            truckName,
            padWear,
            fluidLevel,
            pressure,
            absStatus
        } = req.body;

        const updatedBrake = await BrakeSystem.findByIdAndUpdate(id, {
            truckNo,
            truckName,
            padWear,
            fluidLevel,
            pressure,
            absStatus
        }, { new: true });

        if (!updatedBrake) {
            return res.status(404).json({ message: "Brake system details not found" });
        }

        res.json(updatedBrake);
    } catch (error) {
        console.error('Error updating brake system details:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// DELETE route handler
brakeSystemRouter.delete('/brake-system/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const deletedBrake = await BrakeSystem.findByIdAndDelete(id);

        if (!deletedBrake) {
            return res.status(404).json({ message: "Brake system details not found" });
        }

        res.json({ message: "Brake system details deleted successfully" });
    } catch (error) {
        console.error('Error deleting brake system details:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

export default brakeSystemRouter;
