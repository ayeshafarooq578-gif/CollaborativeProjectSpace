const priorityColors = {
  High: "bg-red-100 text-red-700",
  Medium: "bg-yellow-100 text-yellow-700",
  Low: "bg-green-100 text-green-700",
};

const statusColors = {
  Todo: "bg-gray-100 text-gray-700",
  "In Progress": "bg-blue-100 text-blue-700",
  Done: "bg-green-100 text-green-700",
};

const TaskCard = ({ task, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all p-5 mb-4 border border-gray-100">

      <div className="flex justify-between items-start">

        <h3 className="font-bold text-lg">
          {task.title}
        </h3>

        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            priorityColors[task.priority]
          }`}
        >
          {task.priority}
        </span>

      </div>

      <p className="text-gray-500 mt-3 text-sm">
        {task.description}
      </p>

      <div className="mt-4 space-y-2">

        <p className="text-sm">
          👤 <span className="font-medium">Assigned:</span>{" "}
          {task.assignedTo?.name || "Unassigned"}
        </p>

        <p className="text-sm">
          📅 <span className="font-medium">Deadline:</span>{" "}
          {task.deadline
            ? new Date(task.deadline).toLocaleDateString()
            : "Not Set"}
        </p>

        <span
          className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
            statusColors[task.status]
          }`}
        >
          {task.status}
        </span>

      </div>

      <div className="flex justify-end gap-3 mt-5">

        <button
          onClick={() => onEdit(task)}
          className="text-indigo-600 hover:text-indigo-800 font-medium"
        >
          Edit
        </button>

        <button
          onClick={() => onDelete(task._id)}
          className="text-red-600 hover:text-red-800 font-medium"
        >
          Delete
        </button>

      </div>

    </div>
  );
};

export default TaskCard;