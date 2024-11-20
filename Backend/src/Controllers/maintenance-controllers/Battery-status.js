import { BatteryStatus } from '../../Models/BatteryStatus.js'; // Import BatteryStatus model

/**
 * GET route handler to fetch all battery statuses
 */
export const getAllBatteryStatuses = async (req, res) => {
    try {
        const batteryStatuses = await BatteryStatus.find();
        res.json(batteryStatuses);
    } catch (error) {
        console.error('Error fetching battery status details:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

/**
 * GET route handler to fetch a battery status by ID
 */
export const getBatteryStatusById = async (req, res) => {
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
};

/**
 * POST route handler to add a new battery status
 */
export const addBatteryStatus = async (req, res) => {
    try {
        const {
            truckId,
            truckName,
            batteryVoltage,
            chargeStatus,
            healthPercentage,
            lastReplace
        } = req.body;
        const batteryStatus = await BatteryStatus.create({
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
};

/**
 * PUT route handler to update a battery status by ID
 */
export const updateBatteryStatus = async (req, res) => {
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
};

/**
 * DELETE route handler to delete a battery status by ID
 */
export const deleteBatteryStatus = async (req, res) => {
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
};