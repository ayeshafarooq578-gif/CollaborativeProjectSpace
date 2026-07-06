import Task from "../models/Task.js";
import { getIO } from "../socket/socket.js";
import logActivity from "../utils/logActivity.js";
// Create Task
export const createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    console.log("Task Created:", task);
console.log("User:", req.user);

console.log("Before logActivity");
    await logActivity({
  user: req.user._id,
  project: task.project,
 action: "created task",
  target: task.title,
});

console.log("After logActivity");
    getIO().emit("taskCreated", task);

    res.status(201).json(task);
  } catch (error) {
  console.error("TASK CONTROLLER ERROR");
  console.error(error);

  res.status(500).json({
    message: error.message,
  });
}
};

// Get Tasks by Project
export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({
      project: req.params.projectId,
    })
      .populate("assignedTo", "name email")
      .sort({ createdAt: -1 });

    res.json(tasks);
  } catch (error) {
  console.error("TASK CONTROLLER ERROR");
  console.error(error);

  res.status(500).json({
    message: error.message,
  });
}
};

// Update Task
export const updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    await logActivity({
  user: req.user._id,
  project: task.project,
  action: `moved task to ${task.status}`,
  target: task.title,
});

    getIO().emit("taskUpdated", task);

    res.json(task);
  } catch (error) {
  console.error("TASK CONTROLLER ERROR");
  console.error(error);

  res.status(500).json({
    message: error.message,
  });
}
  
};

// Delete Task
export const deleteTask = async (req, res) => {
  try {
const task = await Task.findById(req.params.id);

await logActivity({
  user: req.user._id,
  project: task.project,
  action: "deleted task",
  target: task.title,
});

await Task.findByIdAndDelete(req.params.id);
    getIO().emit("taskDeleted", req.params.id);

    res.json({
      message: "Task deleted",
    });
  } catch (error) {
  console.error("TASK CONTROLLER ERROR");
  console.error(error);

  res.status(500).json({
    message: error.message,
  });
}
};