import express from "express";
import { getActivities } from "../controllers/activityController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// Get project activity timeline
router.get("/:projectId", protect, getActivities);

export default router;