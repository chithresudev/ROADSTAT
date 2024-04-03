import express from 'express';
import { Destination } from '../../models/Destination.js';

const destinationRouter = express.Router();

// GET route handler for fetching all destination details
destinationRouter.get('/destinations', async (req, res) => {
    try {
        const destinations = await Destination.find();
        res.json(destinations);
    } catch (error) {
        console.error('Error fetching destination details:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

destinationRouter.get('/destinations/:truckId', async (req, res) => {
    try {
      const { truckId } = req.params;
      // Find the destination by truckId
      const destination = await Destination.findOne({ truckId: truckId });
      if (!destination) {
        return res.status(404).json({ message: "Destination details not found for the specified truckId" });
      }
      res.json(destination);
    } catch (error) {
      console.error('Error fetching destination details:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

// POST route handler for adding new destination details
destinationRouter.post('/destinations', async (req, res) => {
    try {
        const { _id, destinationId, destinationName, truckId, driverId, latitude, longitude, source, status } = req.body;
        const destination = await Destination.create({ _id, destinationId, destinationName, truckId, driverId, latitude, longitude, source, status });
        res.json(destination);
    } catch (error) {
        console.error('Error adding destination details:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// PUT route handler for updating destination details by ID
destinationRouter.put('/destinations/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { destinationId, destinationName, truckId, driverId, latitude, longitude, source, status } = req.body;
        const updatedDestination = await Destination.findByIdAndUpdate(id, {
            destinationId, destinationName, truckId, driverId, latitude, longitude, source, status
        }, { new: true });
        if (!updatedDestination) {
            return res.status(404).json({ message: "Destination not found" });
        }
        res.json(updatedDestination);
    } catch (error) {
        console.error('Error updating destination details:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// DELETE route handler for deleting destination details by ID
destinationRouter.delete('/destinations/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedDestination = await Destination.findByIdAndDelete(id);
        if (!deletedDestination) {
            return res.status(404).json({ message: "Destination not found" });
        }
        res.json({ message: "Destination deleted successfully" });
    } catch (error) {
        console.error('Error deleting destination details:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

export default destinationRouter;