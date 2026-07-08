const Lead = require("../models/Lead"); // Change to Lead model later

const getDashboardStats = async (req, res) => {
  try {
    const totalLeads = await Lead.countDocuments({
      owner: req.user.id,
    });

    res.status(200).json({
      success: true,
      data: {
        totalLeads,
        activeDeals: 0,
        closedDeals: 0,
        monthlyRevenue: 0,
      },
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
  getDashboardStats,
};