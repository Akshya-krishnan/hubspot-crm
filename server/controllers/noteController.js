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

    // Verify lead exists and belongs to user
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
      lead: leadId,
      owner: req.user.id,
      title,
      content,
    });

    res.status(201).json({
      success: true,
      message: "Note created successfully.",
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
// Get Notes for Lead
// ==============================
const getLeadNotes = async (req, res) => {
  try {
    const { leadId } = req.params;

    const notes = await Note.find({
      lead: leadId,
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

module.exports = {
  createNote,
  getLeadNotes,
};