import { useEffect, useState } from "react";

import Navbar from "../components/dashboard/Navbar";
import Sidebar from "../components/dashboard/Sidebar";

import MilestoneCard from "../components/milestone/MilestoneCard";
import AddMilestoneModal from "../components/milestone/AddMilestoneModal";

import {
  getMilestones,
  createMilestone,
  updateMilestone,
  deleteMilestone,
} from "../services/milestoneService";

import { getProjects } from "../services/projectService";

const Milestones = () => {
  const [projects, setProjects] = useState([]);
  const [currentProject, setCurrentProject] = useState("");

  const [milestones, setMilestones] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [editingMilestone, setEditingMilestone] = useState(null);

  // Load all projects
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

  // Load milestones for selected project
  const loadMilestones = async () => {
    try {
      if (!currentProject) return;

      const data = await getMilestones(currentProject);

      setMilestones(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  useEffect(() => {
    if (currentProject) {
      loadMilestones();
    }
  }, [currentProject]);

  // Create / Update Milestone
  const handleSave = async (milestone) => {
    try {
      if (editingMilestone) {
        await updateMilestone(editingMilestone._id, milestone);
      } else {
        await createMilestone({
          ...milestone,
          project: currentProject,
        });
      }

      await loadMilestones();

      setEditingMilestone(null);
      setOpenModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  // Delete
  const handleDelete = async (id) => {
    try {
      await deleteMilestone(id);

      await loadMilestones();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (milestone) => {
    setEditingMilestone(milestone);
    setOpenModal(true);
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <Navbar />

      <div className="flex">
        <Sidebar />

        <main className="flex-1 p-8">

          <div className="flex justify-between items-center mb-8">

            <div>
              <h1 className="text-3xl font-bold">
                Project Milestones
              </h1>

              <p className="text-gray-500">
                Track important project goals
              </p>
            </div>

            <div className="flex items-center gap-4">

              <select
                value={currentProject}
                onChange={(e) => setCurrentProject(e.target.value)}
                className="border rounded-lg px-4 py-3"
              >
                {projects.map((project) => (
                  <option
                    key={project._id}
                    value={project._id}
                  >
                    {project.title}
                  </option>
                ))}
              </select>

              <button
                onClick={() => {
                  setEditingMilestone(null);
                  setOpenModal(true);
                }}
                className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700"
              >
                + Add Milestone
              </button>

            </div>

          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

            {milestones.length === 0 ? (
              <div className="col-span-full text-center text-gray-500 py-20">
                No milestones found.
              </div>
            ) : (
              milestones.map((milestone) => (
                <MilestoneCard
                  key={milestone._id}
                  milestone={milestone}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))
            )}

          </div>

        </main>
      </div>

      <AddMilestoneModal
        open={openModal}
        editingMilestone={editingMilestone}
        onClose={() => {
          setOpenModal(false);
          setEditingMilestone(null);
        }}
        onSubmit={handleSave}
      />
    </div>
  );
};

export default Milestones;