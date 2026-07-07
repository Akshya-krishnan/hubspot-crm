const express = require("express");
const router = express.Router();

const { createContact,getAllContacts,getContactById } = require("../controllers/contactController");
const protect = require("../middleware/authMiddleware");

// Protected Route
router.post("/", protect, createContact);
router.get("/", protect, getAllContacts);
router.get("/:id", protect, getContactById);

module.exports = router;