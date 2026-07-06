import { useEffect, useState } from "react";

import Navbar from "../components/dashboard/Navbar";
import Sidebar from "../components/dashboard/Sidebar";
import Stats from "../components/dashboard/Stats";
import KanbanBoard from "../components/dashboard/KanbanBoard";
import RightSidebar from "../components/dashboard/RightSidebar";
import AddTaskModal from "../components/dashboard/AddTaskModal";
import AddProjectModal from "../components/dashboard/AddProjectModal";
import ProjectSelector from "../components/dashboard/ProjectSelector";

import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../services/taskService";

import {
  getProjects,
  createProject,
} from "../services/projectService";

import { getDashboardStats } from "../services/dashboardService";
import { getMembers } from "../services/memberService";

import socket from "../services/socket";
import ActivityTimeline from "../components/dashboard/ActivityTimeline";

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [currentProject, setCurrentProject] = useState("");

  const [tasks, setTasks] = useState([]);
  const [members, setMembers] = useState([]);

  const [taskModal, setTaskModal] = useState(false);
  const [projectModal, setProjectModal] = useState(false);

  const [editingTask, setEditingTask] = useState(null);

  const [stats, setStats] = useState({
    projects: 0,
    tasks: 0,
    completed: 0,
    members: 0,
  });

  // ===========================
  // Load Dashboard Stats
  // ===========================

  const loadStats = async () => {
    try {
      const data = await getDashboardStats();
      setStats(data);
    } catch (error) {
      console.log(error);
    }
  };

  // ===========================
  // Load Projects
  // ===========================

  const loadProjects = async () => {
    try {
      const data = await getProjects();

      setProjects(data);

      if (data.length > 0) {
        setCurrentProject(data[0]._id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // ===========================
  // Load Tasks
  // ===========================

  const loadTasks = async (projectId) => {
    try {
      const data = await getTasks(projectId);
      setTasks(data);
    } catch (error) {
      console.log(error);
    }
  };

  // ===========================
  // Load Members
  // ===========================

  const loadMembers = async () => {
    try {
      if (!currentProject) return;

      const data = await getMembers(currentProject);

      setMembers(data);
    } catch (error) {
      console.log(error);
    }
  };

  // ===========================
  // Initial Load
  // ===========================

  useEffect(() => {
    loadProjects();
    loadStats();
  }, []);

  // ===========================
  // Load Project Data
  // ===========================

  useEffect(() => {
    if (currentProject) {
      loadTasks(currentProject);
      loadMembers();
    }
  }, [currentProject]);

  // ===========================
  // Socket Events
  // ===========================

  useEffect(() => {
    if (!currentProject) return;

    const refresh = () => {
      loadTasks(currentProject);
      loadStats();
    };

    socket.on("taskCreated", refresh);
    socket.on("taskUpdated", refresh);
    socket.on("taskDeleted", refresh);

    return () => {
      socket.off("taskCreated", refresh);
      socket.off("taskUpdated", refresh);
      socket.off("taskDeleted", refresh);
    };
  }, [currentProject]);

  // ===========================
  // Save Task
  // ===========================

  const handleSaveTask = async (task) => {
    try {
      if (editingTask) {
        await updateTask(editingTask._id, task);
      } else {
        await createTask({
          ...task,
          project: currentProject,
        });
      }

      await loadTasks(currentProject);
      await loadStats();

      setTaskModal(false);
      setEditingTask(null);
    } catch (error) {
      console.log(error);
    }
  };

  // ===========================
  // Drag & Drop
  // ===========================

  const handleDragEnd = async (result) => {
    if (!result.destination) return;

    const taskId = result.draggableId;

    const newStatus = result.destination.droppableId;

    const updated = tasks.map((task) =>
      task._id === taskId
        ? {
            ...task,
            status: newStatus,
          }
        : task
    );

    setTasks(updated);

    try {
      await updateTask(taskId, {
        status: newStatus,
      });

      await loadStats();
    } catch (error) {
      console.log(error);
    }
  };

  // ===========================
  // Delete Task
  // ===========================

  const handleDelete = async (id) => {
    try {
      await deleteTask(id);

      await loadTasks(currentProject);
      await loadStats();
    } catch (error) {
      console.log(error);
    }
  };

  // ===========================
  // Edit Task
  // ===========================

  const handleEdit = (task) => {
    setEditingTask(task);
    setTaskModal(true);
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <Navbar />

      <div className="flex">
        <Sidebar />

        <main className="flex-1 p-6 overflow-hidden">
          <ProjectSelector
            projects={projects}
            currentProject={currentProject}
            setCurrentProject={setCurrentProject}
            onNewProject={() => setProjectModal(true)}
          />

          <Stats stats={stats} />

          <div className="flex justify-end mb-6">
            <button
              onClick={() => setTaskModal(true)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg"
            >
              + Add Task
            </button>
          </div>

          <div className="flex flex-col xl:flex-row gap-6">
            <div className="flex-1 min-w-0 overflow-x-auto">
              <KanbanBoard
                tasks={tasks}
                onDragEnd={handleDragEnd}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            </div>

<ActivityTimeline
  projectId={currentProject}
/>
          </div>
        </main>
      </div>

      <AddTaskModal
        open={taskModal}
        onClose={() => {
          setTaskModal(false);
          setEditingTask(null);
        }}
        onSubmit={handleSaveTask}
        editingTask={editingTask}
        members={members}
      />

      <AddProjectModal
        open={projectModal}
        onClose={() => setProjectModal(false)}
        onSubmit={async (project) => {
          await createProject(project);

          await loadProjects();
          await loadStats();

          setProjectModal(false);
        }}
      />
    </div>
  );
};

export default Dashboard;