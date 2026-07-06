import { Draggable } from "@hello-pangea/dnd";

const priorityColors = {
  High: "bg-red-100 text-red-700 border-red-300",
  Medium: "bg-yellow-100 text-yellow-700 border-yellow-300",
  Low: "bg-green-100 text-green-700 border-green-300",
};

const TaskCard = ({
  task,
  index,
  onEdit,
  onDelete,
}) => {
  return (
    <Draggable
      draggableId={task._id}
      index={index}
    >
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`bg-white rounded-xl shadow-md p-5 mb-4 border transition-all duration-300 ${
            snapshot.isDragging
              ? "shadow-2xl rotate-2 scale-105"
              : "hover:shadow-lg"
          }`}
        >
          {/* Header */}
          <div className="flex justify-between items-start">

            <h3 className="font-bold text-lg">
              {task.title}
            </h3>

            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                priorityColors[task.priority]
              }`}
            >
              {task.priority}
            </span>

          </div>

          {/* Description */}
          <p className="text-gray-500 mt-3 text-sm">
            {task.description || "No description"}
          </p>

          {/* Assigned User */}

          <div className="mt-4 text-sm">

            <p>
              👤{" "}
              <span className="font-semibold">
                Assigned:
              </span>{" "}
              {task.assignedTo?.name || "Unassigned"}
            </p>

            <p className="mt-2">
              📅{" "}
              <span className="font-semibold">
                Deadline:
              </span>{" "}
              {task.deadline
                ? new Date(
                    task.deadline
                  ).toLocaleDateString()
                : "Not Set"}
            </p>

            <p className="mt-2">
              📌{" "}
              <span className="font-semibold">
                Status:
              </span>{" "}
              {task.status}
            </p>

          </div>

          {/* Buttons */}

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
      )}
    </Draggable>
  );
};

export default TaskCard;