import { useEffect, useState } from "react";

const AddMilestoneModal = ({
  open,
  onClose,
  onSubmit,
  editingMilestone,
}) => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    dueDate: "",
    progress: 0,
    status: "Pending",
  });

  useEffect(() => {
    if (editingMilestone) {
      setForm({
        title: editingMilestone.title,
        description: editingMilestone.description,
        dueDate: editingMilestone.dueDate
          ?.substring(0, 10),
        progress: editingMilestone.progress,
        status: editingMilestone.status,
      });
    } else {
      setForm({
        title: "",
        description: "",
        dueDate: "",
        progress: 0,
        status: "Pending",
      });
    }
  }, [editingMilestone]);

  if (!open) return null;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.name === "progress"
          ? Number(e.target.value)
          : e.target.value,
    });
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

      <div className="bg-white rounded-xl p-6 w-[500px]">

        <h2 className="text-2xl font-bold mb-5">
          {editingMilestone
            ? "Edit Milestone"
            : "Add Milestone"}
        </h2>

        <input
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          className="border p-3 rounded w-full mb-3"
        />

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="border p-3 rounded w-full mb-3"
        />

        <input
          type="date"
          name="dueDate"
          value={form.dueDate}
          onChange={handleChange}
          className="border p-3 rounded w-full mb-3"
        />

        <input
          type="range"
          min="0"
          max="100"
          name="progress"
          value={form.progress}
          onChange={handleChange}
          className="w-full mb-3"
        />

        <p className="text-center mb-3">
          {form.progress}%
        </p>

        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="border p-3 rounded w-full mb-5"
        >
          <option>Pending</option>
          <option>In Progress</option>
          <option>Completed</option>
        </select>

        <div className="flex justify-end gap-3">

          <button
            onClick={onClose}
            className="bg-gray-300 px-5 py-2 rounded"
          >
            Cancel
          </button>

          <button
            onClick={() => onSubmit(form)}
            className="bg-indigo-600 text-white px-5 py-2 rounded"
          >
            {editingMilestone ? "Update" : "Create"}
          </button>

        </div>

      </div>

    </div>
  );
};

export default AddMilestoneModal;