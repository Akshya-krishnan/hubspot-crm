const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  createNote,
  getLeadNotes,
} = require("../controllers/noteController");

router
  .route("/leads/:leadId/notes")
  .post(protect, createNote)
  .get(protect, getLeadNotes);

module.exports = router;