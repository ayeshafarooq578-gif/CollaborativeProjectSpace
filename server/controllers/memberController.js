import Project from "../models/Project.js";
import User from "../models/User.js";
import logActivity from "../utils/logActivity.js";

// Get All Users (for invite dropdown)
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");

    res.json(users);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Project Members
export const getMembers = async (req, res) => {
  try {
    const project = await Project.findById(req.params.projectId).populate(
      "members",
      "name email"
    );

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    res.json(project.members);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Invite Member
export const addMember = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const project = await Project.findById(req.params.projectId);

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    const alreadyMember = project.members.some(
      (member) => member.toString() === user._id.toString()
    );

    if (alreadyMember) {
      return res.status(400).json({
        message: "Member already exists",
      });
    }

    project.members.push(user._id);

    await project.save();

    // Activity Log
    await logActivity({
      user: req.user._id,
      project: project._id,
      action: "added member",
      target: user.name,
    });

    const updatedProject = await Project.findById(project._id).populate(
      "members",
      "name email"
    );

    res.json(updatedProject.members);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Remove Member
export const removeMember = async (req, res) => {
  try {
    const project = await Project.findById(req.params.projectId);

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    // Find member before removing
    const user = await User.findById(req.params.userId);

    project.members = project.members.filter(
      (member) => member.toString() !== req.params.userId
    );

    await project.save();

    // Activity Log
    await logActivity({
      user: req.user._id,
      project: project._id,
      action: "removed member",
      target: user ? user.name : "Unknown User",
    });

    res.json({
      message: "Member removed",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};