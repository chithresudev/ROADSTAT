import express from "express";
import path from "path";
import dotenv from "dotenv";
import db from "./src/Db/database.js";
import cors from "cors"; // Import CORS middleware
const app = express();
const PORT = process.env.PORT || 3000;

// const PORT = process.env.PORT || 4000;
const __dirname = path.resolve();
dotenv.config({ path: __dirname + "/.env" }); // Load environment variables from .env file
db.connect(); // Connect to the database

app.use(
  cors({
    //origin: '*', Adjust this for security in production
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

import userRouter from "./src/Routes/userRoute.js";
import authRouter from "./src/Routes/authRoute.js";
import roleRouter from "./src/Routes/roleRoute.js";
import alertsRouter from "./src/Routes/alertsRoute.js";
import collisionHistoryRouter from "./src/Routes/collisionHistoryRoute.js";
import destinationRouter from "./src/Routes/destinationRoute.js";
import driverRouter from "./src/Routes/driverRoute.js";
import driverHealthRouter from "./src/Routes/driverHealthRoute.js";
import truckLocationRouter from "./src/Routes/truckLocationRoute.js";
import trailerDetailsRouter from "./src/Routes/trailerDetailsRoute.js";
import trackLocationRouter from "./src/Routes/trackLocationRoute.js";
import truckControlRouter from "./src//Routes/truckControlRoute.js";
import truckDetailsRouter from "./src/Routes/truckDetailsRoute.js";
import truckInformationRouter from "./src/Routes/truckInfoRoute.js";
import truckEfficiencyRouter from "./src/Routes/truckEfficiencyRoute.js";
import trailerLocationRouter from "./src/Routes/trailerLocationRoute.js";
import EngineHealthRouter from "./src/Routes/maintenance-routes/engineHealthRoute.js";
import brakeSystemRouter from "./src/Routes/maintenance-routes/brakeSystemRoute.js";
import fuelSystemRouter from "./src/Routes/maintenance-routes/fuelSystemRoute.js";
import tireHealthRouter from "./src/Routes/maintenance-routes/tireHealthRoute.js";
import batteryStatusRouter from "./src/Routes/maintenance-routes/batteryStatusRoute.js";
import trucksMetricsRouter from "./src/Routes/truckMetricsRoute.js";
import transmissionRouter from "./src/Routes/maintenance-routes/transmissionStatusRoute.js";

app.get("/api", (req, res) => {
  res.send("Welcome to the Truck Management System API");
});

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/roles", roleRouter);
app.use("/api/alerts", alertsRouter);
app.use("/api/collision-history", collisionHistoryRouter);
app.use("/api/destinations", destinationRouter);
app.use("/api/driver-health", driverHealthRouter);
app.use("/api/drivers", driverRouter);
app.use("/api/truck-location", truckLocationRouter);
app.use("/api/track-location", trackLocationRouter);
app.use("/api/truck-information", truckInformationRouter);
app.use("/api/truck-control", truckControlRouter);
app.use("/api/trailers", trailerDetailsRouter);
app.use("/api/truck-efficiency", truckEfficiencyRouter);
app.use("/api/trucks", truckDetailsRouter);
app.use("/api/truck-metrics", trucksMetricsRouter);
app.use("/api/trailer-location", trailerLocationRouter);
app.use("/api/battery-status", batteryStatusRouter);
app.use("/api/brake-system", brakeSystemRouter);
app.use("/api/engine-health", EngineHealthRouter);
app.use("/api/fuel-system", fuelSystemRouter);
app.use("/api/tire-health", tireHealthRouter);
app.use("/api/transmission", transmissionRouter);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
