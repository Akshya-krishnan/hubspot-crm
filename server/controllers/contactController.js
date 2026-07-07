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
const getAllContacts = async (req, res) => {
    try {

        const contacts = await Contact.find({
            owner: req.user.id
        }).sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: contacts.length,
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

module.exports = {
    createContact,
    getAllContacts,
    getContactById
};