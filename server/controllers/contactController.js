    const Contact = require("../models/Contact");

// Create Contact
const createContact = async (req, res) => {
    try {

        const {
            firstName,
            lastName,
            email,
            phone,
            company,
            leadSource,
            lifecycleStage
        } = req.body;

        // Validate required fields
        if (!firstName || !email) {
            return res.status(400).json({
                success: false,
                message: "First Name and Email are required."
            });
        }

        // Check duplicate email
        const existingContact = await Contact.findOne({ email });

        if (existingContact) {
            return res.status(400).json({
                success: false,
                message: "Contact already exists."
            });
        }

        // Create Contact
        const contact = await Contact.create({
            firstName,
            lastName,
            email,
            phone,
            company,
            leadSource,
            lifecycleStage,
            owner: req.user.id
        });

        res.status(201).json({
            success: true,
            message: "Contact created successfully.",
            data: contact
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }
};

// Get All Contacts
// Get All Contacts
const getAllContacts = async (req, res) => {
    try {

        // Current page (default = 1)
        const page = parseInt(req.query.page) || 1;

        // Records per page (default = 10)
        const limit = parseInt(req.query.limit) || 10;

        // Skip records
        const skip = (page - 1) * limit;

        // Total contacts
        const totalContacts = await Contact.countDocuments({
            owner: req.user.id
        });

        // Fetch contacts
        const contacts = await Contact.find({
            owner: req.user.id
        })
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        res.status(200).json({
            success: true,
            page,
            limit,
            totalContacts,
            totalPages: Math.ceil(totalContacts / limit),
            data: contacts
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }
};

// Get Single Contact
const getContactById = async (req, res) => {
    try {

        const contact = await Contact.findOne({
            _id: req.params.id,
            owner: req.user.id
        });

        if (!contact) {
            return res.status(404).json({
                success: false,
                message: "Contact not found."
            });
        }

        res.status(200).json({
            success: true,
            data: contact
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }
};

// Update Contact
const updateContact = async (req, res) => {
    try {

        const contact = await Contact.findOneAndUpdate(
            {
                _id: req.params.id,
                owner: req.user.id
            },
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!contact) {
            return res.status(404).json({
                success: false,
                message: "Contact not found."
            });
        }

        res.status(200).json({
            success: true,
            message: "Contact updated successfully.",
            data: contact
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }
};

// Delete Contact
const deleteContact = async (req, res) => {
    try {

        const contact = await Contact.findOneAndDelete({
            _id: req.params.id,
            owner: req.user.id
        });

        if (!contact) {
            return res.status(404).json({
                success: false,
                message: "Contact not found."
            });
        }

        res.status(200).json({
            success: true,
            message: "Contact deleted successfully."
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }
};

module.exports = {
    createContact,
    getAllContacts,
    getContactById,
    updateContact,
    deleteContact
};