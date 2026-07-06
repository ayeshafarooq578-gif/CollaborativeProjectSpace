import {
  FaEdit,
  FaTrash,
  FaFlag,
} from "react-icons/fa";

const TaskTable = ({
  tasks,
  onEdit,
  onDelete,
}) => {
  const priorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-700";

      case "Medium":
        return "bg-yellow-100 text-yellow-700";

      case "Low":
        return "bg-green-100 text-green-700";

      default:
        return "bg-gray-100";
    }
  };

  const statusColor = (status) => {
    switch (status) {
      case "Todo":
        return "bg-gray-100 text-gray-700";

      case "In Progress":
        return "bg-blue-100 text-blue-700";

      case "Done":
        return "bg-green-100 text-green-700";

      default:
        return "bg-gray-100";
    }
  };

  return (
    <div className="bg-white rounded-xl shadow overflow-hidden">

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead className="bg-slate-100">

            <tr>

              <th className="text-left px-6 py-4">
                Title
              </th>

              <th className="text-left px-6 py-4">
                Status
              </th>

              <th className="text-left px-6 py-4">
                Priority
              </th>

              <th className="text-left px-6 py-4">
                Assigned
              </th>

              <th className="text-left px-6 py-4">
                Deadline
              </th>

              <th className="text-center px-6 py-4">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {tasks.length === 0 ? (
              <tr>
                <td
                  colSpan="6"
                  className="text-center py-10 text-gray-500"
                >
                  No Tasks Found
                </td>
              </tr>
            ) : (
              tasks.map((task) => (
                <tr
                  key={task._id}
                  className="border-t hover:bg-gray-50"
                >

                  <td className="px-6 py-5">

                    <h3 className="font-semibold">
                      {task.title}
                    </h3>

                    <p className="text-gray-500 text-sm">
                      {task.description}
                    </p>

                  </td>

                  <td className="px-6 py-5">

                    <span
                      className={`px-3 py-1 rounded-full text-sm ${statusColor(
                        task.status
                      )}`}
                    >
                      {task.status}
                    </span>

                  </td>

                  <td className="px-6 py-5">

                    <span
                      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm ${priorityColor(
                        task.priority
                      )}`}
                    >
                      <FaFlag />

                      {task.priority}
                    </span>

                  </td>

                  <td className="px-6 py-5">

                    {task.assignedTo?.name || "-"}

                  </td>

                  <td className="px-6 py-5">

                    {task.deadline
                      ? new Date(
                          task.deadline
                        ).toLocaleDateString()
                      : "-"}

                  </td>

                  <td className="px-6 py-5">

                    <div className="flex justify-center gap-4">

                      <button
                        onClick={() => onEdit(task)}
                        className="text-indigo-600 hover:text-indigo-800"
                      >
                        <FaEdit size={18} />
                      </button>

                      <button
                        onClick={() =>
                          onDelete(task._id)
                        }
                        className="text-red-600 hover:text-red-800"
                      >
                        <FaTrash size={18} />
                      </button>

                    </div>

                  </td>

                </tr>
              ))
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default TaskTable;