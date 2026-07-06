import express from "express";

import {
  createMilestone,
  getMilestones,
  updateMilestone,
  deleteMilestone,
} from "../controllers/milestoneController.js";

const router = express.Router();

router.post("/", createMilestone);

router.get("/:projectId", getMilestones);

router.put("/:id", updateMilestone);

router.delete("/:id", deleteMilestone);

export default router;