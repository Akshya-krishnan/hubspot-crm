const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  createContact,
  convertLeadToContact,
  getAllContacts,
  getContactById,
  updateContact,
  deleteContact,
} = require("../controllers/contactController");

// Create & Get Contacts
router
  .route("/")
  .post(protect, createContact)
  .get(protect, getAllContacts);

// Convert Lead to Contact
router.post(
  "/convert/:leadId",
  protect,
  convertLeadToContact
);

// Contact CRUD
router
  .route("/:id")
  .get(protect, getContactById)
  .put(protect, updateContact)
  .delete(protect, deleteContact);

module.exports = router;