import { Droppable } from "@hello-pangea/dnd";
import TaskCard from "./TaskCard";

const Column = ({
  title,
  droppableId,
  tasks,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="bg-slate-100 rounded-xl p-4 min-h-[650px]">

      {/* Column Header */}
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-xl font-bold">{title}</h2>

        <span className="bg-white px-3 py-1 rounded-full text-sm font-semibold shadow">
          {tasks.length}
        </span>
      </div>

      <Droppable droppableId={droppableId}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`rounded-lg min-h-[500px] transition-all duration-300 ${
              snapshot.isDraggingOver
                ? "bg-indigo-100"
                : "bg-transparent"
            }`}
          >
            {tasks.length === 0 && (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center text-gray-400">
                Drop tasks here
              </div>
            )}

            {tasks.map((task, index) => (
              <TaskCard
                key={task._id}
                task={task}
                index={index}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}

            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default Column;