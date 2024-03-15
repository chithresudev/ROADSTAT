// Import necessary modules
import express from 'express';
import { Driver } from '../../models/Driver.js';

// Create an Express Router
const driverRouter = express.Router();

// GET route handler
driverRouter.get('/drivers', async (req, res) => {
    try {
        const drivers = await Driver.find();
        res.json(drivers);
    } catch (error) {
      console.error('Error fetching drivers:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
});

// POST route handler
driverRouter.post('/drivers', async (req, res) => {
  try {
    const { name, age, experience, healthIssues, accidentCount, status } = req.body;
    const driver = await Driver.create({ name, age, experience, healthIssues, accidentCount, status });
    res.json(driver);
  } catch (error) {
    console.error('Error adding driver:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// PUT route handler
driverRouter.put('/drivers/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, age, experience, healthIssues, accidentCount, status } = req.body;
    const updatedDriver = await Driver.findByIdAndUpdate(id, { name, age, experience, healthIssues, accidentCount, status }, { new: true });
    res.json(updatedDriver);
  } catch (error) {
    console.error('Error updating driver:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// DELETE route handler
driverRouter.delete('/drivers/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Driver.findByIdAndDelete(id);
    res.json({ message: 'Driver deleted successfully' });
  } catch (error) {
    console.error('Error deleting driver:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Export the driverRouter
export default driverRouter;
