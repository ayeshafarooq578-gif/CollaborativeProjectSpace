import Milestone from "../models/Milestone.js";
import logActivity from "../utils/logActivity.js";

// Create Milestone
export const createMilestone = async (req, res) => {
  try {
    const milestone = await Milestone.create(req.body);

    await logActivity({
      user: req.user._id,
      project: milestone.project,
      action: "created milestone",
      target: milestone.title,
    });

    res.status(201).json(milestone);
  } catch (error) {
  console.error("MILESTONE ERROR:");
  console.error(error);

  res.status(500).json({
    message: error.message,
  });
}
};

// Get Milestones
export const getMilestones = async (req, res) => {
  try {
    const milestones = await Milestone.find({
      project: req.params.projectId,
    }).sort({ dueDate: 1 });

    res.json(milestones);
  } catch (error) {
  console.error("MILESTONE ERROR:");
  console.error(error);

  res.status(500).json({
    message: error.message,
  });
}
};

// Update Milestone
export const updateMilestone = async (req, res) => {
  try {
    const milestone = await Milestone.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    if (!milestone) {
      return res.status(404).json({
        message: "Milestone not found",
      });
    }

    await logActivity({
      user: req.user._id,
      project: milestone.project,
      action: "updated milestone",
      target: milestone.title,
    });

    res.json(milestone);
  } catch (error) {
  console.error("MILESTONE ERROR:");
  console.error(error);

  res.status(500).json({
    message: error.message,
  });
}
};

// Delete Milestone
export const deleteMilestone = async (req, res) => {
  try {
    const milestone = await Milestone.findById(req.params.id);

    if (!milestone) {
      return res.status(404).json({
        message: "Milestone not found",
      });
    }

    await logActivity({
      user: req.user._id,
      project: milestone.project,
      action: "deleted milestone",
      target: milestone.title,
    });

    await milestone.deleteOne();

    res.json({
      message: "Milestone deleted successfully",
    });
  } catch (error) {
  console.error("MILESTONE ERROR:");
  console.error(error);

  res.status(500).json({
    message: error.message,
  });
}
};