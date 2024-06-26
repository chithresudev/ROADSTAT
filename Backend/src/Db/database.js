// database.js
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();
const { VITE_MONGO_URL } = process.env;

const connect = () => {
    mongoose
      .connect(VITE_MONGO_URL)
      .then(() => {
        console.log("Successfully connected to database");
      })
      .catch((error) => {
        console.log("database connection failed. exiting now...");
        console.error(error);
        process.exit(1);
      });
};

export default {
    connect
};