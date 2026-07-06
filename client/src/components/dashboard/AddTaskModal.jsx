import { useEffect, useState } from "react";

const AddTaskModal = ({
  open,
  onClose,
  onSubmit,
  editingTask,
  members = [],
}) => {
  const [task, setTask] = useState({
    title: "",
    description: "",
    priority: "Medium",
    status: "Todo",
    assignedTo: "",
    deadline: "",
  });

  useEffect(() => {
    if (editingTask) {
      ssetTask({
  title: editingTask.title || "",
  description: editingTask.description || "",
  priority: editingTask.priority || "Medium",
  status: editingTask.status || "Todo",
  assignedTo: editingTask.assignedTo?._id || "",
  deadline: editingTask.deadline
    ? editingTask.deadline.substring(0, 10)
    : "",
});
    } else {
    setTask({
  title: "",
  description: "",
  priority: "Medium",
  status: "Todo",
  assignedTo: "",
  deadline: "",
});
    }
  }, [editingTask]);

  if (!open) return null;

  const handleChange = (e) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
  const taskData = { ...task };

  // Remove assignedTo if nothing is selected
  if (!taskData.assignedTo) {
    delete taskData.assignedTo;
  }

  onSubmit(taskData);
};

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

      <div className="bg-white w-[500px] rounded-xl p-6">

        <h2 className="text-2xl font-bold mb-5">
          {editingTask ? "Edit Task" : "Add Task"}
        </h2>

        <input
          name="title"
          value={task.title}
          onChange={handleChange}
          placeholder="Task Title"
          className="border w-full p-3 rounded mb-3"
        />

        <textarea
          name="description"
          value={task.description}
          onChange={handleChange}
          placeholder="Task Description"
          className="border w-full p-3 rounded mb-3"
        />

        <select
          name="priority"
          value={task.priority}
          onChange={handleChange}
          className="border w-full p-3 rounded mb-3"
        >
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>

        <select
          name="status"
          value={task.status}
          onChange={handleChange}
          className="border w-full p-3 rounded mb-3"
        >
          <option value="Todo">Todo</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>

        {/* Assign Member */}
        <div className="mb-4">
  <label className="block mb-2 font-medium">
    Assign Member
  </label>

  <select
    name="assignedTo"
    value={task.assignedTo}
    onChange={handleChange}
    className="border w-full p-3 rounded"
  >
    <option value="">Select Member</option>

    {members?.map((member) => (
      <option
        key={member._id}
        value={member._id}
      >
        {member.name}
      </option>
    ))}
  </select>
</div>

<div className="mb-5">
  <label className="block mb-2 font-medium">
    Deadline
  </label>

  <input
    type="date"
    name="deadline"
    value={task.deadline}
    onChange={handleChange}
    className="border w-full p-3 rounded"
  />
</div>

        <div className="flex justify-end gap-3">

          <button
            onClick={onClose}
            className="bg-gray-300 px-5 py-2 rounded"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="bg-indigo-600 text-white px-5 py-2 rounded"
          >
            {editingTask ? "Update" : "Create"}
          </button>

        </div>

      </div>

    </div>
  );
};

export default AddTaskModal;