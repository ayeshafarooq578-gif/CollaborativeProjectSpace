import { useEffect, useState } from "react";
import { getActivities } from "../../services/activityService";
import {
  FaPlusCircle,
  FaTrash,
  FaEdit,
  FaCheckCircle,
} from "react-icons/fa";
import socket from "../../services/socket";

const ActivityTimeline = ({ projectId }) => {
  const [activities, setActivities] = useState([]);

  const loadActivities = async () => {
    try {
      const data = await getActivities(projectId);
      setActivities(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (projectId) {
      loadActivities();
    }

    if (!projectId) return;

  loadActivities();

  socket.on("taskCreated", loadActivities);
  socket.on("taskUpdated", loadActivities);
  socket.on("taskDeleted", loadActivities);

  return () => {
    socket.off("taskCreated", loadActivities);
    socket.off("taskUpdated", loadActivities);
    socket.off("taskDeleted", loadActivities);
  };
  }, [projectId]);

  const getIcon = (action) => {
    if (action.includes("created"))
      return <FaPlusCircle className="text-green-500" />;

    if (action.includes("deleted"))
      return <FaTrash className="text-red-500" />;

    if (action.includes("updated"))
      return <FaEdit className="text-blue-500" />;

    if (action.includes("moved"))
      return <FaCheckCircle className="text-indigo-500" />;

    return <FaEdit />;
  };

  return (
    <div className="bg-white rounded-xl shadow p-6 w-full xl:w-80">
      <h2 className="text-xl font-bold mb-5">
        Recent Activity
      </h2>

      <div className="space-y-5 max-h-[600px] overflow-y-auto">

        {activities.length === 0 && (
          <p className="text-gray-500">
            No activities yet.
          </p>
        )}

        {activities.map((activity) => (
          <div
            key={activity._id}
            className="flex gap-3 items-start border-b pb-4"
          >
            <div className="mt-1">
              {getIcon(activity.action)}
            </div>

            <div>
              <p className="text-sm">
                <span className="font-semibold">
                  {activity.user?.name}
                </span>{" "}
                {activity.action}
              </p>

              <p className="text-indigo-600 font-medium">
                {activity.target}
              </p>

              <p className="text-xs text-gray-400 mt-1">
                {new Date(activity.createdAt).toLocaleString()}
              </p>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
};

export default ActivityTimeline;