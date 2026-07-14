    const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  createDeal,
  getAllDeals,
  getDealById,
  updateDeal,
  deleteDeal,
} = require("../controllers/dealController");

// ==============================
// Deals Routes
// ==============================

router
  .route("/")
  .post(protect, createDeal)
  .get(protect, getAllDeals);

router
  .route("/:id")
  .get(protect, getDealById)
  .put(protect, updateDeal)
  .delete(protect, deleteDeal);

module.exports = router;