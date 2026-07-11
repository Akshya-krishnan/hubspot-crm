const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  createContact,
  getAllContacts,
  getContactById,
  updateContact,
  deleteContact,
} = require("../controllers/contactController");

router
  .route("/")
  .post(protect, createContact)
  .get(protect, getAllContacts);

router
  .route("/:id")
  .get(protect, getContactById)
  .put(protect, updateContact)
  .delete(protect, deleteContact);

module.exports = router;