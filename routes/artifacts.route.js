import express from "express";
import {
  createArtifact,
  getAllArtifacts,
} from "../controllers/artifact.controller.js";
import { toggleLike, getLikes } from "../controllers/likes.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";
import { upload } from "../middleware/uploads.middleware.js";
import apiLimiter from "../middleware/rateLimiter.middleware.js";

const router = express.Router();

// Apply auth middleware to protect these routes
// Only ADMIN and EDITOR can create artifacts
router.post(
  "/",
    apiLimiter,
  authMiddleware,
  authorizeRoles("ADMIN", "EDITOR"),
  upload.single("file"),
  createArtifact,
);
router.get("/",apiLimiter, authMiddleware, getAllArtifacts);

// Like routes
router.post("/:id/like", authMiddleware, toggleLike);
router.get("/:id/likes", getLikes);

export default router;
