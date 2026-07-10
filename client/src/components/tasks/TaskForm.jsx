import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Input from "../common/Input";
import Button from "../common/Button";
import {
  createTask,
  updateTask,
} from "../../services/taskService";

const TaskForm = ({
  leadId,
  task,
  onClose,
  onTaskCreated,
}) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "Medium",
    status: "Pending",
  });

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || "",
        description: task.description || "",
        dueDate: task.dueDate
          ? task.dueDate.substring(0, 10)
          : "",
        priority: task.priority || "Medium",
        status: task.status || "Pending",
      });
    }
  }, [task]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (task) {
        await updateTask(task._id, formData);
        toast.success("Task updated successfully");
      } else {
        await createTask(leadId, formData);
        toast.success("Task created successfully");
      }

      onTaskCreated();
      onClose();
    } catch (error) {
      console.error(error);
      toast.error("Failed to save task");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">

      <Input
        label="Title"
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Enter task title"
      />

      <div>
        <label className="block mb-2 text-sm font-medium">
          Description
        </label>

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={4}
          className="w-full border rounded-lg p-3 outline-none focus:border-[#5B4AE6]"
          placeholder="Enter description"
        />
      </div>

      <Input
        type="date"
        label="Due Date"
        name="dueDate"
        value={formData.dueDate}
        onChange={handleChange}
      />

      <div>
        <label className="block mb-2 text-sm font-medium">
          Priority
        </label>

        <select
          name="priority"
          value={formData.priority}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>

      <div>
        <label className="block mb-2 text-sm font-medium">
          Status
        </label>

        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
        >
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      <div className="flex justify-end gap-3 pt-4">

        <Button
          type="button"
          onClick={onClose}
          className="bg-gray-300 text-black hover:bg-gray-400 w-auto px-6"
        >
          Cancel
        </Button>

        <Button
          type="submit"
          className="w-auto px-6"
        >
          {task ? "Update Task" : "Save Task"}
        </Button>

      </div>

    </form>
  );
};

export default TaskForm;