import { TruckControl } from '../../models/TruckControl.js';
import { Warning, Alert } from '../../models/Alert.js'; // Assuming Alert model is defined in a separate file
import express from 'express';

const truckMetricsRouter = express.Router();

// GET route handler for fetching all alerts
truckMetricsRouter.get('/alerts', async (req, res) => {
  try {
    const alerts = await Alert.find();
    res.json(alerts);
  } catch (error) {
    console.error('Error fetching alerts:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// GET route handler for fetching all warnings
truckMetricsRouter.get('/warnings', async (req, res) => {
  try {
    const warnings = await Warning.find();
    res.json(warnings);
  } catch (error) {
    console.error('Error fetching warnings:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// POST route handler for tracking truck metrics
truckMetricsRouter.post('/metrics/:truckId', async (req, res) => {
  try {
    const { truckId } = req.params;
    const metrics = req.body;

    const trackedMetrics = {};
    const alerts = [];
    const warnings = [];

    // Define standard ranges and alert thresholds for each metric
    const metricRanges = {
      speed: { min: 55, max: 70, minWarningThreshold: 55, maxWarningThreshold: 80 },
      fuelLevel: { min: 40, max: 300, minWarningThreshold: 30, maxWarningThreshold: 300 },
      fuelPressure: { min: 30, max: 70, minWarningThreshold: 20, maxWarningThreshold: 80 },
      engineTemp: { min: 180, max: 220, minWarningThreshold: 170, maxWarningThreshold: 230 },
      COLevel: { min: 1.9, max: 3.1, minWarningThreshold: 1.5, maxWarningThreshold: 3.5 },
      NOXLevel: { min: 0.12, max: 0.31, minWarningThreshold: 0.05, maxWarningThreshold: 0.4 },
      HCLevel: { min: 0.06, max: 0.19, minWarningThreshold: 0.03, maxWarningThreshold: 0.25 },
      tirePressure: { min: 80, max: 100, minWarningThreshold: 70, maxWarningThreshold: 110 },
      brakeHealth: { min: 212, max: 302, minWarningThreshold: 200, maxWarningThreshold: 310 },
      batteryHealth: { min: 11.8, max: 100, minWarningThreshold: 5, maxWarningThreshold: 100 },
    };

    // Track metrics against standard ranges and generate alerts or warnings if necessary
    for (const [key, value] of Object.entries(metrics)) {
      const range = metricRanges[key];
      if (range) {
        trackedMetrics[key] = {
          value,
          withinRange: value >= range.min && value <= range.max,
          min: range.min,
          max: range.max,
        };

        const flag1 = 0;
        const flag2 = 0;
        // Check if the value is out of the standard range
        if (value < range.min || value > range.max) {
          const type = value < range.minWarningThreshold || value > range.maxWarningThreshold ? 'alert' : 'warning';
          if (type === 'alert') { if (value < range.minWarningThreshold) flag1 = 1}
          if (type === 'warning') { if (value < range.min) flag2 = 1}
          // const message = `${key} value (${value}) is ${type === 'alert' ? 'below' : 'above'} the ${type === 'alert' ? 'minimum' : 'maximum'} threshold (${range.min} to ${type === 'alert' ? range.min : range.warningThreshold}).`;
          const message = `${key} value (${value}) is ${flag1 == 1 || flag2 == 1 ? 'below' : 'above'} the ${flag1 == 1 || flag2 == 1  ? 'minimum' : 'maximum'} threshold (${range.min} to ${range.max}).`;

          // Save the alert or warning
          if (type === 'alert') {
            const alert = await Alert.create({
              _id,
              truckId,
              metric: key,
              value,
              message
            });
            res.json(alert)
            alerts.push(alert);
          } else {
            const warning = new Warning({
              _id,
              truckId,
              metric: key,
              value,
              message
            });
            res.json(warning)
            warnings.push(warning);
          }
        }
      }
    }

    // Respond with tracked metrics, alerts, and warnings
    res.json({ trackedMetrics, alerts, warnings });
  } catch (error) {
    console.error('Error tracking truck metrics:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// DELETE route handler for deleting a single warning by ID
truckMetricsRouter.delete('/warnings/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedWarning = await Warning.findByIdAndDelete(id);
    if (!deletedWarning) {
      return res.status(404).json({ message: "Warning not found" });
    }
    res.json({ message: "Warning deleted successfully" });
  } catch (error) {
    console.error('Error deleting warning:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// DELETE route handler for deleting a single alert by ID
truckMetricsRouter.delete('/alerts/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedAlert = await Alert.findByIdAndDelete(id);
    if (!deletedAlert) {
      return res.status(404).json({ message: "Alert not found" });
    }
    res.json({ message: "Alert deleted successfully" });
  } catch (error) {
    console.error('Error deleting alert:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// DELETE route handler for deleting all alerts
truckMetricsRouter.delete('/alerts', async (req, res) => {
  try {
    await Alert.deleteMany();
    res.json({ message: 'All alerts deleted successfully' });
  } catch (error) {
    console.error('Error deleting alerts:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// DELETE route handler for deleting all warnings
truckMetricsRouter.delete('/warnings', async (req, res) => {
  try {
    await Warning.deleteMany();
    res.json({ message: 'All warnings deleted successfully' });
  } catch (error) {
    console.error('Error deleting warnings:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default truckMetricsRouter;