import { Transmission } from '../../Models/Transmission.js'; // Import Transmission model

/**
 * GET route handler to fetch all transmission details
 */
export const getAllTransmissions = async (req, res) => {
    try {
        const transmissions = await Transmission.find();
        res.json(transmissions);
    } catch (error) {
        console.error('Error fetching transmission details:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

/**
 * GET route handler to fetch transmission details by truck ID
 */
export const getTransmissionById = async (req, res) => {
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
};

/**
 * POST route handler to add new transmission details
 */
export const addTransmission = async (req, res) => {
    try {
        const {
            truckId,
            COlevel,
            NOXlevel,
            HClevel,
            status
        } = req.body;
        const transmission = await Transmission.create({
            truckId,
            COlevel,
            NOXlevel,
            HClevel,
            status
        });
        res.json(transmission);
    } catch (error) {
        console.error('Error adding transmission details:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

/**
 * PUT route handler to update transmission details by ID
 */
export const updateTransmission = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            truckId,
            COlevel,
            NOXlevel,
            HClevel,
            status
        } = req.body;

        const updatedTransmission = await Transmission.findByIdAndUpdate(id, {
            truckId,
            COlevel,
            NOXlevel,
            HClevel,
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
};

/**
 * DELETE route handler to delete transmission details by ID
 */
export const deleteTransmission = async (req, res) => {
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
};