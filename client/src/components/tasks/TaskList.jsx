import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

import {
  getTasks,
  deleteTask,
  updateTask,
} from "../../services/taskService";

import Button from "../common/Button";
import TaskCard from "./TaskCard";
import TaskDrawer from "./TaskDrawer";

const TaskList = () => {
  const { id } = useParams();

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const fetchTasks = async () => {
    try {
      setLoading(true);

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

  const handleDelete = async (taskId) => {
    if (!window.confirm("Delete this task?")) return;

    try {
      await deleteTask(taskId);

      toast.success("Task deleted");

      fetchTasks();
    } catch (error) {
      console.error(error);

      toast.error("Delete failed");
    }
  };

  const handleStatus = async (task) => {
    try {
      await updateTask(task._id, {
        status:
          task.status === "Completed"
            ? "Pending"
            : "Completed",
      });

      fetchTasks();
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return <p>Loading Tasks...</p>;
  }

  return (
    <div className="bg-white rounded-xl shadow p-6 mt-6">

      <div className="flex justify-between items-center mb-5">

        <h2 className="text-xl font-semibold">
          Tasks
        </h2>

        <Button
          className="w-auto px-5"
          onClick={() => {
            setEditingTask(null);
            setIsDrawerOpen(true);
          }}
        >
          + Add Task
        </Button>

      </div>

      {tasks.length === 0 ? (
        <p>No tasks yet.</p>
      ) : (
        <div className="space-y-4">
          {tasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              onEdit={(task) => {
                setEditingTask(task);
                setIsDrawerOpen(true);
              }}
              onDelete={handleDelete}
              onStatusChange={handleStatus}
            />
          ))}
        </div>
      )}

      <TaskDrawer
        isOpen={isDrawerOpen}
        onClose={() => {
          setIsDrawerOpen(false);
          setEditingTask(null);
        }}
        leadId={id}
        task={editingTask}
        onTaskCreated={fetchTasks}
      />

    </div>
  );
};

export default TaskList;