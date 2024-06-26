import express from 'express';
import { TrackLocation } from '../../Models/TrackLocation.js'; // Import TrackLocation model

const trackLocationRouter = express.Router();

// GET route handler to fetch all track locations
trackLocationRouter.get('/track-location', async (req, res) => {
  try {
    const allTrackLocations = await TrackLocation.find();
    res.json(allTrackLocations);
  } catch (error) {
    console.error('Error fetching track locations:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// GET route handler
trackLocationRouter.get('/track-location/:trailerNo', async (req, res) => {
  try {
    const { trailerNo } = req.params;
    // Find the track location by trailerNo instead of _id
    const trackLocation = await TrackLocation.findOne({ trailerNo: trailerNo });
    res.json(trackLocation);
  } catch (error) {
    console.error('Error fetching track location:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// POST route handler
trackLocationRouter.post('/track-location', async (req, res) => {
  try {
    const { _id, truckId, trailerId, gps, strength, locationStatus, beacon, destination } = req.body;
    const trackLocation = await TrackLocation.create({ _id, truckId, trailerId, gps, strength, locationStatus, beacon, destination });
    res.json(trackLocation);
  } catch (error) {
    console.error('Error adding track location:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// PUT route handler
trackLocationRouter.put('/track-location/:trailerNo', async (req, res) => {
  try {
    const { trailerNo } = req.params;
    const { truckId, trailerId, gps, strength, locationStatus, beacon, destination } = req.body;

    // Find and update the track location by trailerNo
    const updatedTrackLocation = await TrackLocation.findOneAndUpdate(
      { trailerNo },
      { truckId, trailerId, gps, strength, locationStatus, beacon, destination },
      { new: true }
    );

    if (!updatedTrackLocation) {
      return res.status(404).json({ message: 'Track location not found' });
    }

    // Send the updated track location in the response
    res.json(updatedTrackLocation);
  } catch (error) {
    console.error('Error updating track location:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// DELETE route handler
trackLocationRouter.delete('/track-location/:trailerNo', async (req, res) => {
  try {
    const { trailerNo } = req.params;

    // Find and delete the track location by trailerNo
    const deletedTrackLocation = await TrackLocation.findOneAndDelete({ trailerNo });

    if (!deletedTrackLocation) {
      return res.status(404).json({ message: 'Track location not found' });
    }

    // Send a success message in the response
    res.json({ message: 'Track location deleted successfully' });
  } catch (error) {
    console.error('Error deleting track location:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default trackLocationRouter;
