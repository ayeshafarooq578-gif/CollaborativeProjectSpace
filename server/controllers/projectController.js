import Project from "../models/Project.js";
import logActivity from "../utils/logActivity.js";

// Create Project
export const createProject = async (req, res) => {
  try {
    const { title, description, members } = req.body;

    const project = await Project.create({
      title,
      description,
      members,
      createdBy: req.user._id,
    });

    await logActivity({
      user: req.user._id,
      project: project._id,
      action: "created project",
      target: project.title,
    });

    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get All Projects
export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find()
      .populate("createdBy", "name email")
      .populate("members", "name email");

    res.json(projects);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update Project
export const updateProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    project.title = req.body.title || project.title;
    project.description =
      req.body.description || project.description;
    project.members =
      req.body.members || project.members;

    const updatedProject = await project.save();

    await logActivity({
      user: req.user._id,
      project: updatedProject._id,
      action: "updated project",
      target: updatedProject.title,
    });

    res.json(updatedProject);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete Project
export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    await logActivity({
      user: req.user._id,
      project: project._id,
      action: "deleted project",
      target: project.title,
    });

    await project.deleteOne();

    res.json({
      message: "Project deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};