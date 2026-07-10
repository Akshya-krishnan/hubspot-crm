const Task = require("../models/Task");

// ==============================
// Create Task
// ==============================
const createTask = async (req, res) => {
  try {
    const { leadId } = req.params;

    const {
      title,
      description,
      dueDate,
      priority,
      status,
    } = req.body;

    if (!title) {
      return res.status(400).json({
        success: false,
        message: "Title is required.",
      });
    }

    const task = await Task.create({
      title,
      description,
      dueDate,
      priority,
      status,
      lead: leadId,
      owner: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: "Task created successfully.",
      data: task,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ==============================
// Get Tasks for a Lead
// ==============================
const getTasks = async (req, res) => {
  try {
    const { leadId } = req.params;

    const tasks = await Task.find({
      lead: leadId,
      owner: req.user.id,
    }).sort({ dueDate: 1 });

    res.status(200).json({
      success: true,
      data: tasks,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ==============================
// Update Task
// ==============================
const updateTask = async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      {
        _id: req.params.id,
        owner: req.user.id,
      },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Task updated successfully.",
      data: task,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ==============================
// Delete Task
// ==============================
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      owner: req.user.id,
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Task deleted successfully.",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

module.exports = {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
};