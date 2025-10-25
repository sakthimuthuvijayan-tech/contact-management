// backend/src/controllers/contactController.js

const contactModel = require('../models/contactModel');

// GET /api/contacts
const getAllContacts = (req, res) => {
    // Return all contacts with HTTP 200 OK
    res.status(200).json(contactModel.findAll());
};

// GET /api/contacts/:id
const getContactById = (req, res) => {
    const contact = contactModel.findById(req.params.id);
    if (contact) {
        res.status(200).json(contact);
    } else {
        // HTTP 404 Not Found
        res.status(404).json({ message: 'Contact not found' });
    }
};

// POST /api/contacts
const createContact = (req, res) => {
    // Basic validation
    if (!req.body.name || !req.body.email) {
        // HTTP 400 Bad Request
        return res.status(400).json({ message: 'Name and email are required fields.' });
    }
    
    const newContact = contactModel.create(req.body);
    // HTTP 201 Created
    res.status(201).json(newContact);
};

// PUT /api/contacts/:id
const updateContact = (req, res) => {
    const updatedContact = contactModel.update(req.params.id, req.body);
    if (updatedContact) {
        res.status(200).json(updatedContact);
    } else {
        res.status(404).json({ message: 'Contact not found' });
    }
};

// DELETE /api/contacts/:id
const deleteContact = (req, res) => {
    const success = contactModel.remove(req.params.id);
    if (success) {
        // HTTP 204 No Content (Standard for successful deletion)
        res.status(204).send(); 
    } else {
        res.status(404).json({ message: 'Contact not found' });
    }
};

module.exports = { getAllContacts, getContactById, createContact, updateContact, deleteContact };