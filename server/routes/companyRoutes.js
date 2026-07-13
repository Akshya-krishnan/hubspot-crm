const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  createCompany,
  getAllCompanies,
  getCompanyById,
  getCompanyContacts,
  getCompanyLeads,
  updateCompany,
  deleteCompany,
} = require("../controllers/companyController");

// Companies CRUD
router
  .route("/")
  .post(protect, createCompany)
  .get(protect, getAllCompanies);

// Company Details
router
  .route("/:id")
  .get(protect, getCompanyById)
  .put(protect, updateCompany)
  .delete(protect, deleteCompany);

// Company Associations
router.get(
  "/:id/contacts",
  protect,
  getCompanyContacts
);

router.get(
  "/:id/leads",
  protect,
  getCompanyLeads
);

module.exports = router;