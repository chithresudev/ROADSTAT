import { Driver } from '../Models/Driver.js';

export const getAllDrivers = async (req, res) => {
    try {
        const allDrivers = await Driver.find();
        res.json(allDrivers);
    } catch (error) {
        console.error('Error fetching all drivers:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getDriverById = async (req, res) => {
    try {
        const { driverId } = req.params;
        const driverDetail = await Driver.findById(driverId);
        if (!driverDetail) {
            return res.status(404).json({ message: "Driver details not found" });
        }
        res.json(driverDetail);
    } catch (error) {
        console.error('Error fetching driver details:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const addDriver = async (req, res) => {
    try {
        const { driverId, driverName, knownHealthIssues, experience, status } = req.body;
        const driverDetail = await Driver.create({ driverId, driverName, knownHealthIssues, experience, status });
        res.json(driverDetail);
    } catch (error) {
        console.error('Error adding driver:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const updateDriverById = async (req, res) => {
    try {
        const { driverId } = req.params;
        const { driverName, knownHealthIssues, experience, status } = req.body;
        const updatedDriver = await Driver.findByIdAndUpdate(driverId, { driverName, knownHealthIssues, experience, status }, { new: true });
        if (!updatedDriver) {
            return res.status(404).json({ message: "Driver not found" });
        }
        res.json(updatedDriver);
    } catch (error) {
        console.error('Error updating driver:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const deleteDriverById = async (req, res) => {
    try {
        const { driverId } = req.params;
        const deletedDriver = await Driver.findByIdAndDelete(driverId);
        if (!deletedDriver) {
            return res.status(404).json({ message: "Driver not found" });
        }
        res.json({ message: "Driver deleted successfully" });
    } catch (error) {
        console.error('Error deleting driver:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
