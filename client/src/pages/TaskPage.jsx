import { useEffect, useState } from "react";
import Navbar from "../components/dashboard/Navbar";
import Sidebar from "../components/dashboard/Sidebar";

import TaskStats from "../components/tasks/TaskStats";
import TaskSearch from "../components/tasks/TaskSearch";
import TaskFilters from "../components/tasks/TaskFilters";
import TaskTable from "../components/tasks/TaskTable";

import AddTaskModal from "../components/dashboard/AddTaskModal";

import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../services/taskService";

import { getProjects } from "../services/projectService";
import { getMembers } from "../services/memberService";
const TaskPage = () => {
  const [projects, setProjects] = useState([]);
  const [currentProject, setCurrentProject] = useState("");

  const [tasks, setTasks] = useState([]);

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] = useState("");

  const [priorityFilter, setPriorityFilter] = useState("");

  const [taskModal, setTaskModal] = useState(false);

  const [editingTask, setEditingTask] = useState(null);

  const [members, setMembers] = useState([]);
  useEffect(() => {
    loadProjects();
  }, []);

  useEffect(() => {
    if (currentProject) {
      loadTasks();
    }
  }, [currentProject]);

  useEffect(() => {
  if (currentProject) {
    loadTasks();
    loadMembers();
  }
}, [currentProject]);

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

  const loadTasks = async () => {
    try {
      const data = await getTasks(currentProject);
      setTasks(data);
    } catch (error) {
      console.log(error);
    }
  };

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

      loadTasks();

      setTaskModal(false);
      setEditingTask(null);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    await deleteTask(id);
    loadTasks();
  };

  const loadMembers = async () => {
  if (!currentProject) return;

  const data = await getMembers(currentProject);

  setMembers(data);
};

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "" || task.status === statusFilter;

    const matchesPriority =
      priorityFilter === "" || task.priority === priorityFilter;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  return (
    <div className="min-h-screen bg-slate-100">
      <Navbar />

      <div className="flex">
        <Sidebar />

        <main className="flex-1 p-8">

          <h1 className="text-4xl font-bold mb-8">
            Task Management
          </h1>

          <TaskStats tasks={tasks} />

          <div className="flex justify-between items-center my-8">

            <TaskSearch
              search={search}
              setSearch={setSearch}
            />

            <TaskFilters
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
              priorityFilter={priorityFilter}
              setPriorityFilter={setPriorityFilter}
            />

            <button
              onClick={() => setTaskModal(true)}
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg"
            >
              + Add Task
            </button>

          </div>

          <TaskTable
            tasks={filteredTasks}
            onEdit={(task) => {
              setEditingTask(task);
              setTaskModal(true);
            }}
            onDelete={handleDelete}
          />

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
    </div>
  );
};

export default TaskPage;