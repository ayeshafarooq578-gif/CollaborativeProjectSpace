const Stats = ({ stats }) => {
  const cards = [
    {
      title: "Projects",
      value: stats.projects,
      color: "bg-indigo-500",
    },
    {
      title: "Tasks",
      value: stats.tasks,
      color: "bg-emerald-500",
    },
    {
      title: "Completed",
      value: stats.completed,
      color: "bg-pink-500",
    },
    {
      title: "Members",
      value: stats.members,
      color: "bg-orange-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">      {cards.map((card) => (
        <div
          key={card.title}
          className="bg-white rounded-xl shadow p-6"
        >
          <div
            className={`w-12 h-12 rounded-lg ${card.color} mb-4`}
          />

          <h3 className="text-gray-500">
            {card.title}
          </h3>

          <p className="text-3xl font-bold">
            {card.value}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Stats;