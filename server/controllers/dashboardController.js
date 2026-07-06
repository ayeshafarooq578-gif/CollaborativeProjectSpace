import Project from "../models/Project.js";
import Task from "../models/Task.js";
import User from "../models/User.js";

export const getDashboardStats = async (req, res) => {
  try {
    const projects = await Project.countDocuments();

    const tasks = await Task.countDocuments();

    const completed = await Task.countDocuments({
      status: "Done",
    });

    const members = await User.countDocuments();

    res.json({
      projects,
      tasks,
      completed,
      members,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};