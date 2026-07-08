const Lead = require("../models/Lead");

// ==============================
// Create Lead
// ==============================
const createLead = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      company,
      leadSource,
      lifecycleStage,
    } = req.body;

    // Validate required fields
    if (!firstName || !email) {
      return res.status(400).json({
        success: false,
        message: "First Name and Email are required.",
      });
    }

    // Check duplicate email
    const existingLead = await Lead.findOne({ email });

    if (existingLead) {
      return res.status(400).json({
        success: false,
        message: "Lead already exists.",
      });
    }

    // Create Lead
    const lead = await Lead.create({
      firstName,
      lastName,
      email,
      phone,
      company,
      leadSource,
      lifecycleStage,
      owner: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: "Lead created successfully.",
      data: lead,
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
// Get All Leads
// ==============================
const getAllLeads = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const search = req.query.search || "";

    const query = {
      owner: req.user.id,
      $or: [
        { firstName: { $regex: search, $options: "i" } },
        { lastName: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { company: { $regex: search, $options: "i" } },
      ],
    };

    const totalLeads = await Lead.countDocuments(query);

    const leads = await Lead.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      success: true,
      page,
      limit,
      totalLeads,
      totalPages: Math.ceil(totalLeads / limit),
      data: leads,
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
// Get Single Lead
// ==============================
const getLeadById = async (req, res) => {
  try {
    const lead = await Lead.findOne({
      _id: req.params.id,
      owner: req.user.id,
    });

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: "Lead not found.",
      });
    }

    res.status(200).json({
      success: true,
      data: lead,
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
// Update Lead
// ==============================
const updateLead = async (req, res) => {
  try {
    const lead = await Lead.findOneAndUpdate(
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

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: "Lead not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Lead updated successfully.",
      data: lead,
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
// Delete Lead
// ==============================
const deleteLead = async (req, res) => {
  try {
    const lead = await Lead.findOneAndDelete({
      _id: req.params.id,
      owner: req.user.id,
    });

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: "Lead not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Lead deleted successfully.",
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
  createLead,
  getAllLeads,
  getLeadById,
  updateLead,
  deleteLead,
};