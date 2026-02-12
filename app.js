import express from "express";
import cors from "cors";
import morgan from "morgan";
import authRoutes from "./routes/auth.route.js";
import artifactRoutes from "./routes/artifacts.route.js";
import cookieParser from "cookie-parser";
import webhookRouter from "./webhook/webhook.js";
import chatRouter from "./routes/chats.route.js";
const app = express();

/* Middlewares */
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(morgan("dev"));

app.use(cookieParser());
app.use("/uploads", express.static("uploads"));

/* Test Route */
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "CMS Backend is running",
  });
});

app.use("/webhooks", webhookRouter);
app.use("/chat", chatRouter)
app.use("/auth", authRoutes);
app.use("/artifacts", artifactRoutes);

export default app;

