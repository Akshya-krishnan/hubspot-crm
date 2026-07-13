const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  createCompany,
  getAllCompanies,
  getCompanyById,
  updateCompany,
  deleteCompany,
} = require("../controllers/companyController");

router
  .route("/")
  .post(protect, createCompany)
  .get(protect, getAllCompanies);

router
  .route("/:id")
  .get(protect, getCompanyById)
  .put(protect, updateCompany)
  .delete(protect, deleteCompany);

module.exports = router;