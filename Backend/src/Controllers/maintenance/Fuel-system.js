import express from 'express';
import { FuelSystem } from '../../Models/FuelSystem.js'; // Corrected import path

const fuelSystemRouter = express.Router();

// GET route handler
fuelSystemRouter.get('/fuel-system', async (req, res) => {
    try {
        const fuelSystems = await FuelSystem.find();
        res.json(fuelSystems);
    } catch (error) {
        console.error('Error fetching fuel system details:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

fuelSystemRouter.get('/fuel-system/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const fuelSystem = await FuelSystem.findById(id);
        if (!fuelSystem) {
            return res.status(404).json({ message: "Fuel system details not found" });
        }
        res.json(fuelSystem);
    } catch (error) {
        console.error('Error fetching fuel system details:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// POST route handler
fuelSystemRouter.post('/fuel-system', async (req, res) => {
    try {
        const {
            _id,
            truckId,
            truckName,
            fuelLevel,
            fuelConsumptionRate,
            fuelEfficiency
        } = req.body;
        const fuelSystem = await FuelSystem.create({
            _id,
            truckId,
            truckName,
            fuelLevel,
            fuelConsumptionRate,
            fuelEfficiency
        });
        res.json(fuelSystem);
    } catch (error) {
        console.error('Error adding fuel system details:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// PUT route handler
fuelSystemRouter.put('/fuel-system/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const {
            truckId,
            truckName,
            fuelLevel,
            fuelConsumptionRate,
            fuelEfficiency
        } = req.body;

        const updatedFuelSystem = await FuelSystem.findByIdAndUpdate(id, {
            truckId,
            truckName,
            fuelLevel,
            fuelConsumptionRate,
            fuelEfficiency
        }, { new: true });

        if (!updatedFuelSystem) {
            return res.status(404).json({ message: "Fuel system details not found" });
        }

        res.json(updatedFuelSystem);
    } catch (error) {
        console.error('Error updating fuel system details:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// DELETE route handler
fuelSystemRouter.delete('/fuel-system/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const deletedFuelSystem = await FuelSystem.findByIdAndDelete(id);

        if (!deletedFuelSystem) {
            return res.status(404).json({ message: "Fuel system details not found" });
        }

        res.json({ message: "Fuel system details deleted successfully" });
    } catch (error) {
        console.error('Error deleting fuel system details:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

export default fuelSystemRouter;