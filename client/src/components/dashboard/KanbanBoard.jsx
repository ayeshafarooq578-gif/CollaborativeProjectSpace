import Column from "./Column";

const KanbanBoard = ({
  tasks,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="flex gap-6 overflow-x-auto pb-4">

      <Column
        title="Todo"
        tasks={tasks.filter(
          (task) => task.status === "Todo"
        )}
        onEdit={onEdit}
        onDelete={onDelete}
      />

      <Column
        title="In Progress"
        tasks={tasks.filter(
          (task) => task.status === "In Progress"
        )}
        onEdit={onEdit}
        onDelete={onDelete}
      />

      <Column
        title="Done"
        tasks={tasks.filter(
          (task) => task.status === "Done"
        )}
        onEdit={onEdit}
        onDelete={onDelete}
      />

    </div>
  );
};

export default KanbanBoard;