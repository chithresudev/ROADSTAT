import { TruckLocation } from '../Models/TruckLocation.js';

export const getTruckLocationByTruckId = async (req, res) => {
  try {
    const { truckId } = req.params;
    const truckLocation = await TruckLocation.findOne({ truckId });
    if (!truckLocation) {
      return res.status(404).json({ message: "Truck location details not found" });
    }
    res.json(truckLocation);
  } catch (error) {
    console.error('Error fetching truck location:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getAllTruckLocations = async (req, res) => {
  try {
    const truckLocations = await TruckLocation.find();
    if (!truckLocations || truckLocations.length === 0) {
      return res.status(404).json({ message: "Truck location details not found" });
    }
    res.json(truckLocations);
  } catch (error) {
    console.error('Error fetching truck locations:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const createTruckLocation = async (req, res) => {
  try {
    const { _id, truckId, trailerId, latitude, longitude, status, gps } = req.body;
    const truckLocation = await TruckLocation.create({ _id, truckId, trailerId, latitude, longitude, status, gps });
    res.json(truckLocation);
  } catch (error) {
    console.error('Error adding truck location:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const updateTruckLocationByTruckId = async (req, res) => {
  try {
    const { truckId } = req.params;
    const { trailerId, latitude, longitude, status, gps } = req.body;
    const updatedTruckLocation = await TruckLocation.findOneAndUpdate(
      { truckId },
      { truckId, trailerId, latitude, longitude, status, gps },
      { new: true }
    );
    if (!updatedTruckLocation) {
      return res.status(404).json({ message: 'Truck location not found' });
    }
    res.json(updatedTruckLocation);
  } catch (error) {
    console.error('Error updating truck location:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const deleteTruckLocationByTruckId = async (req, res) => {
  try {
    const { truckId } = req.params;
    const deletedTruckLocation = await TruckLocation.findOneAndDelete({ truckId });
    if (!deletedTruckLocation) {
      return res.status(404).json({ message: 'Truck location not found' });
    }
    res.json({ message: 'Truck location deleted successfully' });
  } catch (error) {
    console.error('Error deleting truck location:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
