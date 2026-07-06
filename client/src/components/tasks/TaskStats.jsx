const TaskStats = ({ tasks }) => {
  const total = tasks.length;

  const completed = tasks.filter(
    (task) => task.status === "Done"
  ).length;

  const inProgress = tasks.filter(
    (task) => task.status === "In Progress"
  ).length;

  const todo = tasks.filter(
    (task) => task.status === "Todo"
  ).length;

  const highPriority = tasks.filter(
    (task) => task.priority === "High"
  ).length;

  const stats = [
    {
      title: "Total Tasks",
      value: total,
      color: "bg-indigo-500",
    },
    {
      title: "Completed",
      value: completed,
      color: "bg-green-500",
    },
    {
      title: "In Progress",
      value: inProgress,
      color: "bg-yellow-500",
    },
    {
      title: "Todo",
      value: todo,
      color: "bg-red-500",
    },
    {
      title: "High Priority",
      value: highPriority,
      color: "bg-pink-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-6 mb-8">
      {stats.map((stat) => (
        <div
          key={stat.title}
          className="bg-white rounded-xl shadow-md p-6"
        >
          <div
            className={`w-12 h-12 rounded-lg ${stat.color} mb-4`}
          ></div>

          <p className="text-gray-500">
            {stat.title}
          </p>

          <h2 className="text-4xl font-bold mt-2">
            {stat.value}
          </h2>
        </div>
      ))}
    </div>
  );
};

export default TaskStats;