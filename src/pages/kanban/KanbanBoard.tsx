import { useState } from "react";

type Task = {
  id: string;
  title: string;
};

type Column = {
  id: string;
  title: string;
  tasks: Task[];
};

const KanbanBoard = () => {
  const [columns, setColumns] = useState<Column[]>([
    {
      id: "todo",
      title: "Todo",
      tasks: [{ id: "1", title: "Create project" }],
    },
    {
      id: "progress",
      title: "In Progress",
      tasks: [{ id: "2", title: "Build UI" }],
    },
    {
      id: "done",
      title: "Done",
      tasks: [{ id: "3", title: "Setup Bootstrap" }],
    },
  ]);

  const [activeColumn, setActiveColumn] = useState<string | null>(null);
  const [newTitle, setNewTitle] = useState("");

  const addTask = (columnId: string) => {
    if (!newTitle.trim()) return;

    setColumns((prev) =>
      prev.map((col) =>
        col.id === columnId
          ? {
            ...col,
            tasks: [
              ...col.tasks,
              { id: Date.now().toString(), title: newTitle },
            ],
          }
          : col
      )
    );

    setNewTitle("");
    setActiveColumn(null);
  };

  const deleteTask = (columnId: string, taskId: string) => {
    setColumns((prev) =>
      prev.map((col) =>
        col.id === columnId
          ? {
            ...col,
            tasks: col.tasks.filter((t) => t.id !== taskId),
          }
          : col
      )
    );
  };

  const moveTask = (toColumnId: string, task: Task) => {
    setColumns((prev) =>
      prev.map((col) => {
        if (col.tasks.some((t) => t.id === task.id)) {
          return {
            ...col,
            tasks: col.tasks.filter((t) => t.id !== task.id),
          };
        }
        if (col.id === toColumnId) {
          return { ...col, tasks: [...col.tasks, task] };
        }
        return col;
      })
    );
  };

  const headerColor = (id: string) => {
    if (id === "todo") return "bg-primary-subtle text-primary";
    if (id === "progress") return "bg-warning-subtle text-warning";
    if (id === "done") return "bg-success-subtle text-success";
    return "";
  };

  const cardBorder = (id: string) => {
    if (id === "todo") return "border-start border-4 border-primary";
    if (id === "progress") return "border-start border-4 border-warning";
    if (id === "done") return "border-start border-4 border-success";
    return "";
  };

  return (
    <div className="container mt-4">
      <div className="row g-3">
        {columns.map((column) => (
          <div
            key={column.id}
            className="col-md-4"
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) =>
              moveTask(
                column.id,
                JSON.parse(e.dataTransfer.getData("task"))
              )
            }
          >
            <div className="bg-light rounded-3 p-2 h-100 kanban-column">
              <div
                className={`rounded-3 px-2 py-2 mb-2 d-flex justify-content-between align-items-center ${headerColor(
                  column.id
                )}`}
              >
                <strong className="d-flex align-items-center gap-1">
                  <i className="bi bi-kanban"></i>
                  {column.title}
                </strong>

                <button
                  className="btn btn-sm btn-light kanban-btn"
                  onClick={() => setActiveColumn(column.id)}
                >
                  <i className="bi bi-plus-lg"></i>
                </button>
              </div>

              {activeColumn === column.id && (
                <div className="bg-white rounded shadow-sm p-2 mb-2 animate-fade">
                  <textarea
                    className="form-control mb-2"
                    rows={2}
                    placeholder="Enter a title for this card..."
                    value={newTitle}
                    autoFocus
                    onChange={(e) => setNewTitle(e.target.value)}
                  />
                  <div className="d-flex gap-2">
                    <button
                      className="btn btn-sm btn-primary kanban-btn"
                      onClick={() => addTask(column.id)}
                    >
                      <i className="bi bi-check-lg me-1"></i>
                      Add
                    </button>
                    <button
                      className="btn btn-sm btn-light kanban-btn"
                      onClick={() => {
                        setActiveColumn(null);
                        setNewTitle("");
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {column.tasks.map((task) => (
                <div
                  key={task.id}
                  className={`bg-white rounded-3 shadow-sm p-2 mb-2 d-flex justify-content-between align-items-center kanban-card ${cardBorder(
                    column.id
                  )}`}
                  draggable
                  onDragStart={(e) =>
                    e.dataTransfer.setData(
                      "task",
                      JSON.stringify(task)
                    )
                  }
                >
                  <span className="fw-medium">{task.title}</span>

                  <button
                    className="btn btn-sm btn-light text-danger kanban-btn"
                    onClick={() =>
                      deleteTask(column.id, task.id)
                    }
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KanbanBoard;
