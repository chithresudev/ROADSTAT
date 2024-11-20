import { Alert } from '../Models/Alert.js';

/**
 * Get all alerts
 */
export const getAllAlerts = async (req, res) => {
    try {
        const alerts = await Alert.find().sort({ createdAt: -1 }); // Fetch all alerts sorted by creation time
        res.status(200).json(alerts);
    } catch (error) {
        console.error("Error fetching alerts:", error);
        res.status(500).json({ error: "Failed to retrieve alerts" });
    }
};

/**
 * Get alerts by truck ID
 */
export const getAlertsByTruckId = async (req, res) => {
    const { truckId } = req.params;
    try {
        const alerts = await Alert.find({ truckId }).sort({ createdAt: -1 });
        if (alerts.length === 0) {
            return res.status(404).json({ message: "No alerts found for this truck ID" });
        }
        res.status(200).json(alerts);
    } catch (error) {
        console.error("Error fetching alerts by truck ID:", error);
        res.status(500).json({ error: "Failed to retrieve alerts" });
    }
};
