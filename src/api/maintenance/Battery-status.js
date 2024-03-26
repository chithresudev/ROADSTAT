import express from 'express';
import { BatteryStatus } from '../../models/BatteryStatus.js';

const batteryStatusRouter = express.Router();

// GET route handler
batteryStatusRouter.get('/battery-status', async (req, res) => {
    try {
        const batteryStatuses = await BatteryStatus.find();
        res.json(batteryStatuses);
    } catch (error) {
        console.error('Error fetching battery status details:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

batteryStatusRouter.get('/battery-status/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const batteryStatus = await BatteryStatus.findById(id);
        if (!batteryStatus) {
            return res.status(404).json({ message: "Battery status details not found" });
        }
        res.json(batteryStatus);
    } catch (error) {
        console.error('Error fetching battery status details:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// POST route handler
batteryStatusRouter.post('/battery-status', async (req, res) => {
    try {
        const {
            _id,
            truckId,
            truckName,
            batteryVoltage,
            chargeStatus,
            healthPercentage,
            lastReplace
        } = req.body;
        const batteryStatus = await BatteryStatus.create({
            _id,
            truckId,
            truckName,
            batteryVoltage,
            chargeStatus,
            healthPercentage,
            lastReplace
        });
        res.json(batteryStatus);
    } catch (error) {
        console.error('Error adding battery status details:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// PUT route handler
batteryStatusRouter.put('/battery-status/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const {
            truckId,
            truckName,
            batteryVoltage,
            chargeStatus,
            healthPercentage,
            lastReplace
        } = req.body;

        const updatedBatteryStatus = await BatteryStatus.findByIdAndUpdate(id, {
            truckId,
            truckName,
            batteryVoltage,
            chargeStatus,
            healthPercentage,
            lastReplace
        }, { new: true });

        if (!updatedBatteryStatus) {
            return res.status(404).json({ message: "Battery status details not found" });
        }

        res.json(updatedBatteryStatus);
    } catch (error) {
        console.error('Error updating battery status details:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// DELETE route handler
batteryStatusRouter.delete('/battery-status/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const deletedBatteryStatus = await BatteryStatus.findByIdAndDelete(id);

        if (!deletedBatteryStatus) {
            return res.status(404).json({ message: "Battery status details not found" });
        }

        res.json({ message: "Battery status details deleted successfully" });
    } catch (error) {
        console.error('Error deleting battery status details:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

export default batteryStatusRouter;