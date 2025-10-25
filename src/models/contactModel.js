// backend/src/models/contactModel.js

const { v4: uuidv4 } = require('uuid');

// In-memory data storage (resets when server restarts)
let contacts = [
    { id: "c1", name: "Sakthi Priyadharshini", email: "sakthi.p@ibm.com", phone: "8111044275" },
    { id: "c2", name: "Jane Smith", email: "jane.s@example.com", phone: "9876543210" }
];

// --- CRUD FUNCTIONS ---

// READ: Get all contacts
const findAll = () => contacts;

// READ: Get a single contact by ID
const findById = (id) => contacts.find(contact => contact.id === id);

// CREATE: Add a new contact
const create = (newContact) => {
    // Generate a unique ID for the new contact
    const contact = { id: uuidv4(), ...newContact };
    contacts.push(contact);
    return contact;
};

// UPDATE: Modify an existing contact
const update = (id, updatedFields) => {
    const index = contacts.findIndex(c => c.id === id);
    if (index > -1) {
        // Merge existing data with updated fields
        contacts[index] = { ...contacts[index], ...updatedFields, id };
        return contacts[index];
    }
    return null; // Contact not found
};

// DELETE: Remove a contact
const remove = (id) => {
    const initialLength = contacts.length;
    contacts = contacts.filter(contact => contact.id !== id);
    // Return true if length changed (deletion successful)
    return contacts.length < initialLength;
};

module.exports = { findAll, findById, create, update, remove };