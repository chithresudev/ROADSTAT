import express from 'express';
import { 
    getAllDriverHealthDetails, 
    getDriverHealthDetailsById, 
    addDriverHealthDetails, 
    updateDriverHealthDetailsById, 
    deleteDriverHealthDetailsById 
} from '../Controllers/driverHealthController.js';

const driverHealthRouter = express.Router();

driverHealthRouter.get('/driver-health', getAllDriverHealthDetails);
driverHealthRouter.get('/driver-health/:driverId', getDriverHealthDetailsById);
driverHealthRouter.post('/driver-health', addDriverHealthDetails);
driverHealthRouter.put('/driver-health/:driverNo', updateDriverHealthDetailsById);
driverHealthRouter.delete('/driver-health/:driverId', deleteDriverHealthDetailsById);

export default driverHealthRouter;
