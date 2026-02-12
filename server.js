import "dotenv/config";
import dotenv from "dotenv";
dotenv.config();
import http from "http";
import { Server } from "socket.io";
import app from "./app.js";
import connectDB from "./config/db.js";
import { startCronJobs } from "./cron/testing.js";
import { registerSocketHandler } from "./socket/socket.js";

const PORT = process.env.PORT || 3000;

connectDB();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

registerSocketHandler(io);

// Start Cron Jobs
startCronJobs();

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
