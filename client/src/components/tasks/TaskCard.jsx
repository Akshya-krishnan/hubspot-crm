const TaskCard = ({ task }) => {
  const isOverdue =
    task.status !== "Completed" &&
    new Date(task.dueDate) < new Date();

  return (
    <div className="border rounded-lg p-4">

      <div className="flex justify-between">

        <h3 className="font-semibold text-lg">
          {task.title}
        </h3>

        <span
          className={`px-3 py-1 rounded-full text-xs ${
            task.priority === "High"
              ? "bg-red-100 text-red-600"
              : task.priority === "Medium"
              ? "bg-yellow-100 text-yellow-600"
              : "bg-green-100 text-green-600"
          }`}
        >
          {task.priority}
        </span>

      </div>

      <p className="text-gray-600 mt-2">
        {task.description}
      </p>

      <div className="mt-4 flex justify-between">

        <p
          className={`text-sm ${
            isOverdue
              ? "text-red-600"
              : "text-gray-500"
          }`}
        >
          Due:
          {" "}
          {task.dueDate
            ? new Date(task.dueDate).toLocaleDateString()
            : "-"}
        </p>

        <span
          className={`font-medium ${
            task.status === "Completed"
              ? "text-green-600"
              : "text-yellow-600"
          }`}
        >
          {task.status}
        </span>

      </div>

    </div>
  );
};

export default TaskCard;