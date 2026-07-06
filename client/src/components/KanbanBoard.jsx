import { DragDropContext } from "@hello-pangea/dnd";
import Column from "./Column";

const KanbanBoard = ({
  tasks,
  onDragEnd,
  onEdit,
  onDelete,
}) => {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        <Column
          title="Todo"
          droppableId="Todo"
          tasks={tasks.filter(
            (task) => task.status === "Todo"
          )}
          onEdit={onEdit}
          onDelete={onDelete}
        />

        <Column
          title="In Progress"
          droppableId="In Progress"
          tasks={tasks.filter(
            (task) => task.status === "In Progress"
          )}
          onEdit={onEdit}
          onDelete={onDelete}
        />

        <Column
          title="Done"
          droppableId="Done"
          tasks={tasks.filter(
            (task) => task.status === "Done"
          )}
          onEdit={onEdit}
          onDelete={onDelete}
        />

      </div>
    </DragDropContext>
  );
};

export default KanbanBoard;