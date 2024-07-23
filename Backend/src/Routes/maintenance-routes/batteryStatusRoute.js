import express from 'express';
import {
    getAllBatteryStatuses,
    getBatteryStatusById,
    addBatteryStatus,
    updateBatteryStatus,
    deleteBatteryStatus
} from '../../Controllers/maintenance-controllers/Battery-status.js';

const batteryStatusRouter = express.Router();

batteryStatusRouter.get('/battery-status', getAllBatteryStatuses);
batteryStatusRouter.get('/battery-status/:id', getBatteryStatusById);
batteryStatusRouter.post('/battery-status', addBatteryStatus);
batteryStatusRouter.put('/battery-status/:id', updateBatteryStatus);
batteryStatusRouter.delete('/battery-status/:id', deleteBatteryStatus);

export default batteryStatusRouter;
