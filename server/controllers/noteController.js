const Note = require("../models/Note");
const Lead = require("../models/Lead");

// ==============================
// Create Note
// ==============================
const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const { leadId } = req.params;

    if (!content) {
      return res.status(400).json({
        success: false,
        message: "Note content is required.",
      });
    }

    const lead = await Lead.findOne({
      _id: leadId,
      owner: req.user.id,
    });

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: "Lead not found.",
      });
    }

    const note = await Note.create({
      title,
      content,
      lead: leadId,
      owner: req.user.id,
    });

    res.status(201).json({
      success: true,
      data: note,
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
// Get Notes
// ==============================
const getLeadNotes = async (req, res) => {
  try {
    const notes = await Note.find({
      lead: req.params.leadId,
      owner: req.user.id,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: notes,
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
// Update Note
// ==============================
const updateNote = async (req, res) => {
  try {
    const note = await Note.findOneAndUpdate(
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

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Note updated successfully.",
      data: note,
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
// Delete Note
// ==============================
const deleteNote = async (req, res) => {
  try {
    const note = await Note.findOneAndDelete({
      _id: req.params.id,
      owner: req.user.id,
    });

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Note deleted successfully.",
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
  createNote,
  getLeadNotes,
  updateNote,
  deleteNote,
};