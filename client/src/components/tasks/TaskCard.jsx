const TaskCard = ({
  task,
  onEdit,
  onDelete,
  onStatusChange,
}) => {
  const isOverdue =
    task.status !== "Completed" &&
    task.dueDate &&
    new Date(task.dueDate) < new Date();

  const priorityClasses = {
    High: "bg-red-100 text-red-600",
    Medium: "bg-yellow-100 text-yellow-600",
    Low: "bg-green-100 text-green-600",
  };

  const statusClasses = {
    Pending: "bg-orange-100 text-orange-600",
    Completed: "bg-green-100 text-green-600",
  };

  return (
    <div className="border rounded-xl p-5 shadow-sm">

      <div className="flex justify-between items-start">

        <div className="flex gap-3">

          <input
            type="checkbox"
            checked={task.status === "Completed"}
            onChange={() => onStatusChange(task)}
            className="mt-1 h-5 w-5"
          />

          <div>

            <h3
              className={`font-semibold text-lg ${
                task.status === "Completed"
                  ? "line-through text-gray-400"
                  : ""
              }`}
            >
              {task.title}
            </h3>

            <p className="text-gray-600 mt-1">
              {task.description || "No description"}
            </p>

          </div>

        </div>

        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            priorityClasses[task.priority]
          }`}
        >
          {task.priority}
        </span>

      </div>

      <div className="flex justify-between items-center mt-6">

        <div className="space-y-2">

          <p
            className={`text-sm ${
              isOverdue
                ? "text-red-600 font-semibold"
                : "text-gray-500"
            }`}
          >
            Due:{" "}
            {task.dueDate
              ? new Date(task.dueDate).toLocaleDateString()
              : "-"}
          </p>

          <span
            className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
              statusClasses[task.status]
            }`}
          >
            {task.status}
          </span>

        </div>

        <div className="space-x-5">

          <button
            onClick={() => onEdit(task)}
            className="text-blue-600 hover:underline"
          >
            Edit
          </button>

          <button
            onClick={() => onDelete(task._id)}
            className="text-red-600 hover:underline"
          >
            Delete
          </button>

        </div>

      </div>

    </div>
  );
};

export default TaskCard;