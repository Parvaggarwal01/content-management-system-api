import "dotenv/config";
import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import connectDB from "./config/db.js";
import { startCronJobs } from "./cron/testing.js"

const PORT = process.env.PORT || 3000;

connectDB();

// Start Cron Jobs
startCronJobs();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
