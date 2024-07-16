import express from 'express';
import { 
    getAllDrivers, 
    getDriverById, 
    addDriver, 
    updateDriverById, 
    deleteDriverById 
} from '../Controllers/driverController.js';

const driverRouter = express.Router();

driverRouter.get('/drivers', getAllDrivers);
driverRouter.get('/drivers/:driverId', getDriverById);
driverRouter.post('/drivers', addDriver);
driverRouter.put('/drivers/:driverId', updateDriverById);
driverRouter.delete('/drivers/:driverId', deleteDriverById);

export default driverRouter;
