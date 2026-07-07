const express = require("express");
const router = express.Router();

const { createContact,getAllContacts,getContactById,updateContact,deleteContact  } = require("../controllers/contactController");
const protect = require("../middleware/authMiddleware");

// Protected Route
router.post("/", protect, createContact);
router.get("/", protect, getAllContacts);
router.get("/:id", protect, getContactById);
router.put("/:id", protect, updateContact);
router.delete("/:id", protect, deleteContact);

module.exports = router;