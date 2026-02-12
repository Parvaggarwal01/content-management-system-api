import express from "express";
import {
  getChatsByThread,
  sendChat,
  getUserThreads,
} from "../controllers/chat.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const chatRouter = express.Router();

chatRouter.get("/threads", authMiddleware, getUserThreads); 
chatRouter.get("/:threadId", authMiddleware, getChatsByThread);
chatRouter.post("/", authMiddleware, sendChat);

export default chatRouter;
