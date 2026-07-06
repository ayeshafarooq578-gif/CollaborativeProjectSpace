import TaskCard from "./TaskCard";

const Column = ({
  title,
  tasks,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="bg-gray-100 rounded-xl p-5 w-80 min-h-[600px]">

      <h2 className="text-xl font-bold mb-5">
        {title}
      </h2>

      {tasks.length === 0 ? (
        <p className="text-gray-400 text-sm">
          No tasks
        </p>
      ) : (
        tasks.map((task) => (
          <TaskCard
            key={task._id}
            task={task}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))
      )}

    </div>
  );
};

export default Column;