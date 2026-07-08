const express = require("express");
const router = express.Router();

const {
  createLead,
  getAllLeads,
  getLeadById,
  updateLead,
  deleteLead,
} = require("../controllers/leadController");

const protect= require("../middleware/authMiddleware");

router.route("/")
  .post(protect, createLead)
  .get(protect, getAllLeads);

router.route("/:id")
  .get(protect, getLeadById)
  .put(protect, updateLead)
  .delete(protect, deleteLead);

module.exports = router;