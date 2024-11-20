import { EngineHealth } from '../../Models/EngineHealth.js'; // Import EngineHealth model

/**
 * GET route handler to fetch all engine health details
 */
export const getAllEngineHealths = async (req, res) => {
    try {
        const engines = await EngineHealth.find();
        res.json(engines);
    } catch (error) {
        console.error('Error fetching engine health details:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

/**
 * GET route handler to fetch engine health details by ID
 */
export const getEngineHealthById = async (req, res) => {
    try {
        const { id } = req.params;
        const engine = await EngineHealth.findById(id);
        if (!engine) {
            return res.status(404).json({ message: "Engine health details not found" });
        }
        res.json(engine);
    } catch (error) {
        console.error('Error fetching engine health details:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

/**
 * POST route handler to add a new engine health detail
 */
export const addEngineHealth = async (req, res) => {
    try {
        const {
            truckId,
            RPM,
            engineTemperature,
            oilPressure,
            coolantTemperature,
            status
        } = req.body;
        const engine = await EngineHealth.create({
            truckId,
            RPM,
            engineTemperature,
            oilPressure,
            coolantTemperature,
            status
        });
        res.json(engine);
    } catch (error) {
        console.error('Error adding engine health details:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

/**
 * PUT route handler to update engine health details by ID
 */
export const updateEngineHealth = async (req, res) => {
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

        const updatedEngine = await EngineHealth.findByIdAndUpdate(id, {
            truckId,
            RPM,
            engineTemperature,
            oilPressure,
            coolantTemperature,
            status
        }, { new: true });

        if (!updatedEngine) {
            return res.status(404).json({ message: "Engine health details not found" });
        }

        res.json(updatedEngine);
    } catch (error) {
        console.error('Error updating engine health details:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

/**
 * DELETE route handler to delete engine health details by ID
 */
export const deleteEngineHealth = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedEngine = await EngineHealth.findByIdAndDelete(id);

        if (!deletedEngine) {
            return res.status(404).json({ message: "Engine health details not found" });
        }

        res.json({ message: "Engine health details deleted successfully" });
    } catch (error) {
        console.error('Error deleting engine health details:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};