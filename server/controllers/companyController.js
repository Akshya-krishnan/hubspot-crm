const Company = require("../models/Company");
const Contact = require("../models/Contact");
const Lead = require("../models/Lead");

// ==============================
// Create Company
// ==============================
const createCompany = async (req, res) => {
  try {
    const {
      name,
      domain,
      industry,
      phone,
      website,
      address,
    } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Company name is required.",
      });
    }

    const existingCompany = await Company.findOne({
      name,
      owner: req.user.id,
    });

    if (existingCompany) {
      return res.status(400).json({
        success: false,
        message: "Company already exists.",
      });
    }

    const company = await Company.create({
      name,
      domain,
      industry,
      phone,
      website,
      address,
      owner: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: "Company created successfully.",
      data: company,
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
// Get All Companies
// ==============================
const getAllCompanies = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const search = req.query.search || "";

    const query = {
      owner: req.user.id,
      $or: [
        { name: { $regex: search, $options: "i" } },
        { domain: { $regex: search, $options: "i" } },
        { industry: { $regex: search, $options: "i" } },
      ],
    };

    const totalCompanies = await Company.countDocuments(query);

    const companies = await Company.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      success: true,
      page,
      limit,
      totalCompanies,
      totalPages: Math.ceil(totalCompanies / limit),
      data: companies,
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
// Get Company By ID
// ==============================
const getCompanyById = async (req, res) => {
  try {
    const company = await Company.findOne({
      _id: req.params.id,
      owner: req.user.id,
    });

    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company not found.",
      });
    }

    res.status(200).json({
      success: true,
      data: company,
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
// Get Company Contacts
// ==============================
const getCompanyContacts = async (req, res) => {
  try {
    const company = await Company.findOne({
      _id: req.params.id,
      owner: req.user.id,
    });

    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company not found.",
      });
    }

    const contacts = await Contact.find({
      company: company.name,
      owner: req.user.id,
    }).sort({ firstName: 1 });

    res.status(200).json({
      success: true,
      total: contacts.length,
      data: contacts,
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
// Get Company Leads
// ==============================
const getCompanyLeads = async (req, res) => {
  try {
    const company = await Company.findOne({
      _id: req.params.id,
      owner: req.user.id,
    });

    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company not found.",
      });
    }

    const leads = await Lead.find({
      company: company.name,
      owner: req.user.id,
    }).sort({ firstName: 1 });

    res.status(200).json({
      success: true,
      total: leads.length,
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
// Update Company
// ==============================
const updateCompany = async (req, res) => {
  try {
    const company = await Company.findOneAndUpdate(
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

    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Company updated successfully.",
      data: company,
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
// Delete Company
// ==============================
const deleteCompany = async (req, res) => {
  try {
    const company = await Company.findOneAndDelete({
      _id: req.params.id,
      owner: req.user.id,
    });

    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Company deleted successfully.",
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
  createCompany,
  getAllCompanies,
  getCompanyById,
  getCompanyContacts,
  getCompanyLeads,
  updateCompany,
  deleteCompany,
};