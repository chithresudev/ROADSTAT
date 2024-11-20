import express from 'express';
import { getAllAlerts, getAlertsByTruckId } from '../Controllers/alertController.js';
const router = express.Router();

// Route to fetch all alerts
router.get('/', getAllAlerts);

// Route to fetch alerts by truck ID
router.get('/:truckId', getAlertsByTruckId);

export default router;
