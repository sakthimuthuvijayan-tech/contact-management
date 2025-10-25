// backend/src/routes/contactRoutes.js

const express = require('express');
const router = express.Router();
const controller = require('../controllers/contactController');

// Define all RESTful API endpoints for the contact resource

// GET all contacts and POST a new contact
router.route('/')
    .get(controller.getAllContacts)
    .post(controller.createContact);

// GET, PUT, and DELETE a single contact by ID
router.route('/:id')
    .get(controller.getContactById)
    .put(controller.updateContact)
    .delete(controller.deleteContact);

module.exports = router;