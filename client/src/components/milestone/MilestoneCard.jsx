import ProgressBar from "./ProgressBar";

const statusColors = {
  Pending: "bg-red-100 text-red-600",
  "In Progress": "bg-yellow-100 text-yellow-700",
  Completed: "bg-green-100 text-green-700",
};

const MilestoneCard = ({
  milestone,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="bg-white rounded-xl shadow p-6">

      <div className="flex justify-between">

        <div>
          <h2 className="text-xl font-bold">
            {milestone.title}
          </h2>

          <p className="text-gray-500 mt-2">
            {milestone.description}
          </p>
        </div>

        <span
          className={`px-3 py-1 rounded-full text-sm ${
            statusColors[milestone.status]
          }`}
        >
          {milestone.status}
        </span>

      </div>

      <ProgressBar progress={milestone.progress} />

      <div className="flex justify-between mt-5">

        <p className="text-sm text-gray-500">
          Due:{" "}
          {new Date(
            milestone.dueDate
          ).toLocaleDateString()}
        </p>

        <div className="flex gap-3">

          <button
            onClick={() => onEdit(milestone)}
            className="text-indigo-600"
          >
            Edit
          </button>

          <button
            onClick={() => onDelete(milestone._id)}
            className="text-red-500"
          >
            Delete
          </button>

        </div>

      </div>
    </div>
  );
};

export default MilestoneCard;