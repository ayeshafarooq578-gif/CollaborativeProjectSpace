import { useState } from "react";

const AddProjectModal = ({ open, onClose, onSubmit }) => {
  const [project, setProject] = useState({
    title: "",
    description: "",
  });

  if (!open) return null;

  const handleChange = (e) => {
    setProject({
      ...project,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center">

      <div className="bg-white w-[450px] rounded-xl p-6">

        <h2 className="text-2xl font-bold mb-5">
          New Project
        </h2>

        <input
          name="title"
          placeholder="Project Title"
          className="border w-full p-3 rounded mb-4"
          onChange={handleChange}
        />

        <textarea
          name="description"
          placeholder="Description"
          className="border w-full p-3 rounded mb-4"
          onChange={handleChange}
        />

        <div className="flex justify-end gap-3">

          <button
            onClick={onClose}
            className="bg-gray-200 px-5 py-2 rounded"
          >
            Cancel
          </button>

          <button
            onClick={() => {
              onSubmit(project);
              onClose();
            }}
            className="bg-indigo-600 text-white px-5 py-2 rounded"
          >
            Create
          </button>

        </div>

      </div>

    </div>
  );
};

export default AddProjectModal;