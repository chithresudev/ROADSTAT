import express from 'express';
import { TruckEfficiency } from '../../models/TruckEfficiency.js'; // Corrected import path

const truckEfficiencyRouter = express.Router();

// GET route handler
truckEfficiencyRouter.get('/truck-efficiency', async (req, res) => {
    try {
        const trucks = await TruckEfficiency.find(); // Corrected usage of TruckEfficiency model
        res.json(trucks);
    } catch (error) {
      console.error('Error fetching truck details:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
});

truckEfficiencyRouter.get('/truck-efficiency/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const truck = await TruckEfficiency.findById(id); // Corrected usage of TruckEfficiency model
    if (!truck) {
      return res.status(404).json({ message: "Truck details not found" });
    }
    res.json(truck);
  } catch (error) {
    console.error('Error fetching truck details:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// POST route handler
truckEfficiencyRouter.post('/truck-efficiency', async (req, res) => {
  try {
    const {
        _id,
        truckId,
        serviceHistory,
        level,
        status
    } = req.body;
    const truck = await TruckEfficiency.create({ // Corrected usage of TruckEfficiency model
        _id,
        truckId,
        serviceHistory,
        level,
        status
    });
    res.json(truck);
  } catch (error) {
    console.error('Error adding truck details:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// PUT route handler
truckEfficiencyRouter.put('/truck-efficiency/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const {
      truckId,
      serviceHistory,
      level,
      status
    } = req.body;

    const updatedTruck = await TruckEfficiency.findByIdAndUpdate(id, {
      truckId,
      serviceHistory,
      level,
      status
    }, { new: true });

    if (!updatedTruck) {
      return res.status(404).json({ message: "Truck not found" });
    }

    res.json(updatedTruck);
  } catch (error) {
    console.error('Error updating truck details:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// DELETE route handler
truckEfficiencyRouter.delete('/truck-efficiency/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const deletedTruck = await TruckEfficiency.findByIdAndDelete(id);

    if (!deletedTruck) {
      return res.status(404).json({ message: "Truck not found" });
    }

    res.json({ message: "Truck deleted successfully" });
  } catch (error) {
    console.error('Error deleting truck details:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default truckEfficiencyRouter;
