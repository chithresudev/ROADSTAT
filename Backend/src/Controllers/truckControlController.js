import { TruckControl } from '../Models/TruckControl.js';

const apiUrl = import.meta.env.VITE_API_URL;

export const getAllTruckControlDetails = async (req, res) => {
  try {
    const allTruckControlDetails = await TruckControl.find();
    res.json(allTruckControlDetails);
  } catch (error) {
    console.error('Error fetching truck control details:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getTruckControlDetailsById = async (req, res) => {
  try {
    const { truckId } = req.params;
    const truckControlDetail = await TruckControl.findOne({ truckId: truckId });
    if (!truckControlDetail) {
      return res.status(404).json({ message: "Truck control details not found" });
    }
    res.json(truckControlDetail);
  } catch (error) {
    console.error('Error fetching truck control details:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const createTruckControlDetails = async (req, res) => {
  try {
    const { _id, truckId, status, speed, fuelLevel, fuelPressure, engineTemp, COLevel, NOXLevel, HCLevel, tirePressure, brakeHealth, batteryHealth } = req.body;
    const truckControlDetail = await TruckControl.create({ _id, truckId, status, speed, fuelLevel, fuelPressure, engineTemp, COLevel, NOXLevel, HCLevel, tirePressure, brakeHealth, batteryHealth });

    // Now, call /metrics/:truckId endpoint
    const metricsResponse = await fetch(`${apiUrl}/metrics/${truckId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        // Assuming you want to send some metrics data, adjust accordingly
        speed, fuelLevel, fuelPressure, engineTemp, COLevel, NOXLevel, HCLevel, tirePressure, brakeHealth, batteryHealth
      }),
    });

    if (!metricsResponse.ok) {
      throw new Error('Failed to post to /metrics/:truckId');
    }

    const metricsData = await metricsResponse.json();

    res.json({ truckControlDetail, metricsData });
  } catch (error) {
    console.error('Error adding truck control details:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const updateTruckControlDetailsById = async (req, res) => {
  try {
    const { truckNo } = req.params;
    const { truckId, status, speed, fuelLevel, fuelPressure, engineTemp, COLevel, NOXLevel, HCLevel, tirePressure, brakeHealth, batteryHealth } = req.body;
    const updatedTruckControlDetail = await TruckControl.findOneAndUpdate(
      { truckNo },
      { truckId, status, speed, fuelLevel, fuelPressure, engineTemp, COLevel, NOXLevel, HCLevel, tirePressure, brakeHealth, batteryHealth },
      { new: true }
    );
    if (!updatedTruckControlDetail) {
      return res.status(404).json({ message: "Truck control details not found" });
    }
    res.json(updatedTruckControlDetail);
  } catch (error) {
    console.error('Error updating truck control details:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const deleteTruckControlDetailsById = async (req, res) => {
  try {
    const { truckId } = req.params;
    const deletedTruckControlDetail = await TruckControl.findOneAndDelete({ truckId });
    if (!deletedTruckControlDetail) {
      return res.status(404).json({ message: "Truck control details not found" });
    }
    res.json({ message: "Truck control details deleted successfully" });
  } catch (error) {
    console.error('Error deleting truck control details:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};