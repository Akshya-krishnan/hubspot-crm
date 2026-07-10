import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTasks } from "../../services/taskService";
import TaskCard from "./TaskCard";

const TaskList = () => {
  const { id } = useParams();

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    try {
      const response = await getTasks(id);
      setTasks(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  if (loading) {
    return <p>Loading tasks...</p>;
  }

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-xl font-semibold mb-4">
        Tasks
      </h2>

      {tasks.length === 0 ? (
        <p className="text-gray-500">
          No tasks yet.
        </p>
      ) : (
        <div className="space-y-4">
          {tasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;