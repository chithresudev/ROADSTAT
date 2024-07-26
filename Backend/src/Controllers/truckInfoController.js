import { TruckInformation } from '../Models/TruckInformation.js';

export const getAllTruckInformation = async (req, res) => {
  try {
    const allTruckInformation = await TruckInformation.find();
    res.json(allTruckInformation);
  } catch (error) {
    console.error('Error fetching all truck information:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getTruckInformationById = async (req, res) => {
  try {
    const { truckId } = req.params;
    const truckInformationDetail = await TruckInformation.findById(truckId);
    if (!truckInformationDetail) {
      return res.status(404).json({ message: "Truck information details not found" });
    }
    res.json(truckInformationDetail);
  } catch (error) {
    console.error('Error fetching truck information details:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const createTruckInformation = async (req, res) => {
  try {
    const { _id, truckId, truckName, distanceTravelled, location, idleStartDate, idleStartTime, idleEndDate, idleEndTime, duration } = req.body;
    const truckInformationDetail = await TruckInformation.create({ _id, truckId, truckName, distanceTravelled, location, idleStartDate, idleStartTime, idleEndDate, idleEndTime, duration });
    res.json(truckInformationDetail);
  } catch (error) {
    console.error('Error adding truck information details:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const updateTruckInformationById = async (req, res) => {
  try {
    const { truckNo } = req.params;
    const { truckId, truckName, distanceTravelled, location, idleStartDate, idleStartTime, idleEndDate, idleEndTime, duration } = req.body;
    const updatedTruckInformationDetail = await TruckInformation.findOneAndUpdate(
      { truckNo },
      { truckId, truckName, distanceTravelled, location, idleStartDate, idleStartTime, idleEndDate, idleEndTime, duration },
      { new: true }
    );
    if (!updatedTruckInformationDetail) {
      return res.status(404).json({ message: "Truck information details not found" });
    }
    res.json(updatedTruckInformationDetail);
  } catch (error) {
    console.error('Error updating truck information details:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const deleteTruckInformationById = async (req, res) => {
  try {
    const { truckId } = req.params;
    const deletedTruckInformationDetail = await TruckInformation.findOneAndDelete({ truckId });
    if (!deletedTruckInformationDetail) {
      return res.status(404).json({ message: "Truck information details not found" });
    }
    res.json({ message: "Truck information details deleted successfully" });
  } catch (error) {
    console.error('Error deleting truck information details:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};