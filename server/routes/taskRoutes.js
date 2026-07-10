const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");

// Create & Get Tasks for a Lead
router
  .route("/leads/:leadId/tasks")
  .post(protect, createTask)
  .get(protect, getTasks);

// Update & Delete Task
router
  .route("/tasks/:id")
  .put(protect, updateTask)
  .delete(protect, deleteTask);

module.exports = router;