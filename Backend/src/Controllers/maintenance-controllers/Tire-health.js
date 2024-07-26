import { TireHealth } from '../../Models/TireHealth.js'; // Import TireHealth model

/**
 * GET route handler to fetch all tire health details
 */
export const getAllTireHealths = async (req, res) => {
    try {
        const tireHealths = await TireHealth.find();
        res.json(tireHealths);
    } catch (error) {
        console.error('Error fetching tire health details:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

/**
 * GET route handler to fetch tire health details by ID
 */
export const getTireHealthById = async (req, res) => {
    try {
        const { id } = req.params;
        const tireHealth = await TireHealth.findById(id);
        if (!tireHealth) {
            return res.status(404).json({ message: "Tire health details not found" });
        }
        res.json(tireHealth);
    } catch (error) {
        console.error('Error fetching tire health details:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

/**
 * POST route handler to add new tire health details
 */
export const addTireHealth = async (req, res) => {
    try {
        const {
            _id,
            truckId,
            truckName,
            tirePressure,
            tireTemperature,
            tireDepth,
            tireAge
        } = req.body;
        const tireHealth = await TireHealth.create({
            _id,
            truckId,
            truckName,
            tirePressure,
            tireTemperature,
            tireDepth,
            tireAge
        });
        res.json(tireHealth);
    } catch (error) {
        console.error('Error adding tire health details:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

/**
 * PUT route handler to update tire health details by ID
 */
export const updateTireHealth = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            truckId,
            truckName,
            tirePressure,
            tireTemperature,
            tireDepth,
            tireAge
        } = req.body;

        const updatedTireHealth = await TireHealth.findByIdAndUpdate(id, {
            truckId,
            truckName,
            tirePressure,
            tireTemperature,
            tireDepth,
            tireAge
        }, { new: true });

        if (!updatedTireHealth) {
            return res.status(404).json({ message: "Tire health details not found" });
        }

        res.json(updatedTireHealth);
    } catch (error) {
        console.error('Error updating tire health details:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

/**
 * DELETE route handler to delete tire health details by ID
 */
export const deleteTireHealth = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedTireHealth = await TireHealth.findByIdAndDelete(id);

        if (!deletedTireHealth) {
            return res.status(404).json({ message: "Tire health details not found" });
        }

        res.json({ message: "Tire health details deleted successfully" });
    } catch (error) {
        console.error('Error deleting tire health details:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};