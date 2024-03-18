import express from 'express';
import { Driver } from '../../models/Driver.js';

const driverRouter = express.Router();

driverRouter.get('/drivers', async (req, res) => {
    try {
        const drivers = await Driver.find();
        res.json(drivers);
    } catch (error) {
        console.error('Error fetching drivers:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

driverRouter.post('/drivers', async (req, res) => {
    try {
        const { driverNo, driverName, knownHealthIssues, experience, status } = req.body;
        const driver = await Driver.create({ driverNo, driverName, knownHealthIssues, experience, status });
        res.json(driver);
    } catch (error) {
        console.error('Error adding driver:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

driverRouter.put('/drivers/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { driverNo, driverName, knownHealthIssues, experience, status } = req.body;
        const updatedDriver = await Driver.findByIdAndUpdate(id, { driverNo, driverName, knownHealthIssues, experience, status }, { new: true });
        res.json(updatedDriver);
    } catch (error) {
        console.error('Error updating driver:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

driverRouter.delete('/drivers/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await Driver.findByIdAndDelete(id);
        res.json({ message: 'Driver deleted successfully' });
    } catch (error) {
        console.error('Error deleting driver:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

export default driverRouter;
