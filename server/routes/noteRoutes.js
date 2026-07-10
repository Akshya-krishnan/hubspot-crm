const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  createNote,
  getLeadNotes,
  updateNote,
  deleteNote,
} = require("../controllers/noteController");

// Create & Get Notes
router
  .route("/leads/:leadId/notes")
  .post(protect, createNote)
  .get(protect, getLeadNotes);

// Update & Delete Note
router
  .route("/notes/:id")
  .put(protect, updateNote)
  .delete(protect, deleteNote);

module.exports = router;