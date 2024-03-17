import express from 'express';
import { Driver } from '../../models/Driver.js';

const driverRouter = express.Router();

// GET route handler for fetching all driver details
driverRouter.get('/drivers', async (req, res) => {
    try {
        const drivers = await Driver.find();
        res.json(drivers);
    } catch (error) {
        console.error('Error fetching driver details:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// GET route handler for fetching driver details by ID
driverRouter.get('/drivers/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const driver = await Driver.findById(id);
        if (!driver) {
            return res.status(404).json({ message: "Driver details not found" });
        }
        res.json(driver);
    } catch (error) {
        console.error('Error fetching driver details:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// POST route handler for adding new driver details
driverRouter.post('/drivers', async (req, res) => {
    try {
        const { name, age, experience, healthIssues, accidentCount, status } = req.body;
        const driver = await Driver.create({ name, age, experience, healthIssues, accidentCount, status });
        res.json(driver);
    } catch (error) {
        console.error('Error adding driver details:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// PUT route handler for updating driver details by ID
driverRouter.put('/drivers/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, age, experience, healthIssues, accidentCount, status } = req.body;
        const updatedDriver = await Driver.findByIdAndUpdate(id, {
            name, age, experience, healthIssues, accidentCount, status
        }, { new: true });
        if (!updatedDriver) {
            return res.status(404).json({ message: "Driver not found" });
        }
        res.json(updatedDriver);
    } catch (error) {
        console.error('Error updating driver details:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// DELETE route handler for deleting driver details by ID
driverRouter.delete('/drivers/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedDriver = await Driver.findByIdAndDelete(id);
        if (!deletedDriver) {
            return res.status(404).json({ message: "Driver not found" });
        }
        res.json({ message: "Driver deleted successfully" });
    } catch (error) {
        console.error('Error deleting driver details:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

export default driverRouter;
