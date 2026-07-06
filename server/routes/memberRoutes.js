import express from "express";

import {
  getMembers,
  addMember,
  removeMember,
} from "../controllers/memberController.js";

const router = express.Router();

router.get("/:projectId", getMembers);

router.post("/:projectId", addMember);

router.delete("/:projectId/:userId", removeMember);

export default router;