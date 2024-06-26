import express from 'express';
import { EngineHealth } from '../../Models/EngineHealth.js'; // Corrected import path

const engineHealthRouter = express.Router();

// GET route handler
engineHealthRouter.get('/engine-health', async (req, res) => {
    try {
        const engines = await EngineHealth.find(); // Corrected usage of EngineHealth model
        res.json(engines);
    } catch (error) {
        console.error('Error fetching engine health details:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

engineHealthRouter.get('/engine-health/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const engine = await EngineHealth.findById(id); // Corrected usage of EngineHealth model
        if (!engine) {
            return res.status(404).json({ message: "Engine health details not found" });
        }
        res.json(engine);
    } catch (error) {
        console.error('Error fetching engine health details:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// POST route handler
engineHealthRouter.post('/engine-health', async (req, res) => {
    try {
        const {
            _id,
            truckId,
            RPM,
            engineTemperature,
            oilPressure,
            coolantTemperature,
            status
        } = req.body;
        const engine = await EngineHealth.create({ // Corrected usage of EngineHealth model
            _id,
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
});

// PUT route handler
engineHealthRouter.put('/engine-health/:id', async (req, res) => {
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
});

// DELETE route handler
engineHealthRouter.delete('/engine-health/:id', async (req, res) => {
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
});

export default engineHealthRouter;
