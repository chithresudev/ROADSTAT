// Import necessary modules
import express from 'express';
import { DriverHealth } from '../../models/DriverHealth.js';

// Create an Express Router
const driverHealthRouter = express.Router();

// GET route handler
driverHealthRouter.get('/driver-health', async (req, res) => {
    try {
        const driverHealthData = await DriverHealth.find();
        res.json(driverHealthData);
    } catch (error) {
      console.error('Error fetching driver health data:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
});

// POST route handler
driverHealthRouter.post('/driver-health', async (req, res) => {
  try {
    const { driverId, heartRate, fatigueLevel, bodyTemp, hydrationLevel, stressLevel, healthStatus } = req.body;
    const driverHealth = await DriverHealth.create({ driverId, heartRate, fatigueLevel, bodyTemp, hydrationLevel, stressLevel, healthStatus });
    res.json(driverHealth);
  } catch (error) {
    console.error('Error adding driver health data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// PUT route handler
driverHealthRouter.put('/:id', async (req, res) => {
  try {
    // Handle PUT request here
  } catch (error) {
    console.error('Error updating driver health data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// DELETE route handler
driverHealthRouter.delete('/:id', async (req, res) => {
  try {
    // Handle DELETE request here
  } catch (error) {
    console.error('Error deleting driver health data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Export the driverHealthRouter
export default driverHealthRouter;
