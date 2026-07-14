const Deal = require("../models/Deal");

// ==============================
// Create Deal
// ==============================
const createDeal = async (req, res) => {
  try {
    const {
      dealName,
      amount,
      stage,
      closeDate,
      description,
      company,
      contact,
    } = req.body;

    if (!dealName || !amount) {
      return res.status(400).json({
        success: false,
        message: "Deal Name and Amount are required.",
      });
    }

    const deal = await Deal.create({
      dealName,
      amount,
      stage,
      closeDate,
      description,
      company,
      contact,
      owner: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: "Deal created successfully.",
      data: deal,
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
// Get All Deals
// ==============================
const getAllDeals = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const search = req.query.search || "";

    const query = {
      owner: req.user.id,
      $or: [
        {
          dealName: {
            $regex: search,
            $options: "i",
          },
        },
        {
          company: {
            $regex: search,
            $options: "i",
          },
        },
        {
          contact: {
            $regex: search,
            $options: "i",
          },
        },
      ],
    };

    const totalDeals = await Deal.countDocuments(query);

    const deals = await Deal.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      success: true,
      page,
      limit,
      totalDeals,
      totalPages: Math.ceil(totalDeals / limit),
      data: deals,
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
// Get Deal By ID
// ==============================
const getDealById = async (req, res) => {
  try {
    const deal = await Deal.findOne({
      _id: req.params.id,
      owner: req.user.id,
    });

    if (!deal) {
      return res.status(404).json({
        success: false,
        message: "Deal not found.",
      });
    }

    res.status(200).json({
      success: true,
      data: deal,
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
// Update Deal
// ==============================
const updateDeal = async (req, res) => {
  try {
    const deal = await Deal.findOneAndUpdate(
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

    if (!deal) {
      return res.status(404).json({
        success: false,
        message: "Deal not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Deal updated successfully.",
      data: deal,
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
// Delete Deal
// ==============================
const deleteDeal = async (req, res) => {
  try {
    const deal = await Deal.findOneAndDelete({
      _id: req.params.id,
      owner: req.user.id,
    });

    if (!deal) {
      return res.status(404).json({
        success: false,
        message: "Deal not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Deal deleted successfully.",
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
  createDeal,
  getAllDeals,
  getDealById,
  updateDeal,
  deleteDeal,
};