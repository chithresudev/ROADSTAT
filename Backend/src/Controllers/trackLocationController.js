import { TrackLocation } from '../Models/TrackLocation.js';

export const getAllTrackLocations = async (req, res) => {
  try {
    const allTrackLocations = await TrackLocation.find();
    res.json(allTrackLocations);
  } catch (error) {
    console.error('Error fetching track locations:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getTrackLocationByTrailerNo = async (req, res) => {
  try {
    const { trailerNo } = req.params;
    const trackLocation = await TrackLocation.findOne({ trailerNo });
    if (!trackLocation) {
      return res.status(404).json({ message: "Track location not found" });
    }
    res.json(trackLocation);
  } catch (error) {
    console.error('Error fetching track location:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const createTrackLocation = async (req, res) => {
  try {
    const { _id, truckId, trailerId, gps, strength, locationStatus, beacon, destination } = req.body;
    const trackLocation = await TrackLocation.create({ _id, truckId, trailerId, gps, strength, locationStatus, beacon, destination });
    res.json(trackLocation);
  } catch (error) {
    console.error('Error adding track location:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const updateTrackLocationByTrailerNo = async (req, res) => {
  try {
    const { trailerNo } = req.params;
    const { truckId, trailerId, gps, strength, locationStatus, beacon, destination } = req.body;
    const updatedTrackLocation = await TrackLocation.findOneAndUpdate(
      { trailerNo },
      { truckId, trailerId, gps, strength, locationStatus, beacon, destination },
      { new: true }
    );
    if (!updatedTrackLocation) {
      return res.status(404).json({ message: 'Track location not found' });
    }
    res.json(updatedTrackLocation);
  } catch (error) {
    console.error('Error updating track location:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const deleteTrackLocationByTrailerNo = async (req, res) => {
  try {
    const { trailerNo } = req.params;
    const deletedTrackLocation = await TrackLocation.findOneAndDelete({ trailerNo });
    if (!deletedTrackLocation) {
      return res.status(404).json({ message: 'Track location not found' });
    }
    res.json({ message: 'Track location deleted successfully' });
  } catch (error) {
    console.error('Error deleting track location:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
