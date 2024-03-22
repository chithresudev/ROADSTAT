import express from 'express';
import { TruckLocation } from '../../models/TruckLocation.js'; // Import TruckLocation model

const truckLocationRouter = express.Router();

// GET route handler
truckLocationRouter.get('/truck-location/:truckId', async (req, res) => {
  try {
      const { truckId } = req.params;
      // Find the truck location by truckId instead of _id
      const truckLocation = await TruckLocation.findOne({ truckId: truckId });
      if (!truckLocation) {
        return res.status(404).json({ message: "Truck location details not found" });
    }
      res.json(truckLocation);
  } catch (error) {
      console.error('Error fetching truck location:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
});

// POST route handler
truckLocationRouter.post('/truck-location', async (req, res) => {
  try {
    // const categoryDoc = await Category.create({ name });
    // return NextResponse.json(categoryDoc);
    const { _id, truckId, trailerId, latitude, longitude, status, gps, destinationId } = req.body;
    const truckLocation = await TruckLocation.create({ _id, truckId, trailerId, latitude, longitude, status, gps, destinationId });
    // await truckLocation.save();
    res.json(truckLocation);
  } catch (error) {
    console.error('Error adding truck location:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// PUT route handler
// PUT route handler to update truck location based on truck ID
truckLocationRouter.put('/truck-location/:truckId', async (req, res) => {
  try {
    const { truckId } = req.params;
    const { trailerId, latitude, longitude, status, gps } = req.body;

    // Find and update the truck location by truckId
    const updatedTruckLocation = await TruckLocation.findOneAndUpdate(
      { truckId },
      { truckId, trailerId, latitude, longitude, status, gps, destinationId },
      { new: true }
    );

    if (!updatedTruckLocation) {
      return res.status(404).json({ message: 'Truck location not found' });
    }

    // Send the updated truck location in the response
    res.json(updatedTruckLocation);
  } catch (error) {
    console.error('Error updating truck location:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// DELETE route handler
truckLocationRouter.delete('/truck-location/:truckId', async (req, res) => {
  try {
    const { truckId } = req.params;

    // Find and delete the truck location by truckId
    const deletedTruckLocation = await TruckLocation.findOneAndDelete({ truckId });

    if (!deletedTruckLocation) {
      return res.status(404).json({ message: 'Truck location not found' });
    }

    // Send a success message in the response
    res.json({ message: 'Truck location deleted successfully' });
  } catch (error) {
    console.error('Error deleting truck location:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default truckLocationRouter;

