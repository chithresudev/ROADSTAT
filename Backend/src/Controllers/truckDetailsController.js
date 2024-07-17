import { Truck } from '../Models/Truck.js';

export const getAllTrucks = async (req, res) => {
    try {
        const trucks = await Truck.find();
        res.json(trucks);
    } catch (error) {
        console.error('Error fetching truck details:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getTruckById = async (req, res) => {
    try {
        const { id } = req.params;
        const truck = await Truck.findById(id);
        if (!truck) {
            return res.status(404).json({ message: "Truck details not found" });
        }
        res.json(truck);
    } catch (error) {
        console.error('Error fetching truck details:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const createTruck = async (req, res) => {
    try {
        const {
            _id,
            truckId,
            driverId,
            location,
            incidents,
            status,
            note
        } = req.body;
        const truck = await Truck.create({
            _id,
            truckId,
            driverId,
            location,
            incidents,
            status,
            note
        });
        res.json(truck);
    } catch (error) {
        console.error('Error adding truck details:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const updateTruckById = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            truckId,
            driverId,
            location,
            incidents,
            status,
            note
        } = req.body;

        const updatedTruck = await Truck.findByIdAndUpdate(id, {
            truckId,
            driverId,
            location,
            incidents,
            status,
            note
        }, { new: true });

        if (!updatedTruck) {
            return res.status(404).json({ message: "Truck not found" });
        }

        res.json(updatedTruck);
    } catch (error) {
        console.error('Error updating truck details:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const deleteTruckById = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedTruck = await Truck.findByIdAndDelete(id);

        if (!deletedTruck) {
            return res.status(404).json({ message: "Truck not found" });
        }

        res.json({ message: "Truck deleted successfully" });
    } catch (error) {
        console.error('Error deleting truck details:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};