const API_URL = 'http://localhost:3000/api/contacts';

// DOM Element References
const contactIdInput = document.getElementById('contact-id');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');
const contactList = document.getElementById('contact-list');
const saveButton = document.querySelector('#contact-form button:first-of-type');
const cancelButton = document.getElementById('cancel-btn');
const formHeader = document.querySelector('#contact-form h2');

// 1. READ: Fetch all contacts and render
async function fetchContacts() {
    try {
        const response = await fetch(API_URL);
        const contacts = await response.json();
        renderContacts(contacts);
    } catch (error) {
        contactList.innerHTML = `<p style="color: red;">Error: Could not connect to the API. Ensure backend is running on port 3000.</p>`;
    }
}

// 2. CREATE / UPDATE: Handle form submission
async function handleSubmit() {
    const id = contactIdInput.value;
    const method = id ? 'PUT' : 'POST';
    const url = id ? `${API_URL}/${id}` : API_URL;

    const contactData = {
        name: nameInput.value,
        email: emailInput.value,
        phone: phoneInput.value
    };

    try {
        const response = await fetch(url, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(contactData)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'API request failed');
        }

        resetForm();
        fetchContacts();
    } catch (error) {
        alert(`Failed to save contact: ${error.message}`);
    }
}

// 3. DELETE: Remove a contact
async function deleteContact(id) {
    if (!confirm('Are you sure you want to delete this contact?')) return;
    try {
        await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        fetchContacts();
    } catch (error) {
        alert(`Failed to delete contact: ${error.message}`);
    }
}

// UI Functions
function editContact(contact) {
    contactIdInput.value = contact.id;
    nameInput.value = contact.name;
    emailInput.value = contact.email;
    phoneInput.value = contact.phone;

    saveButton.textContent = 'Update Contact';
    cancelButton.style.display = 'inline';
    formHeader.textContent = 'Update Existing Contact';
}

function resetForm() {
    contactIdInput.value = '';
    nameInput.value = '';
    emailInput.value = '';
    phoneInput.value = '';
    
    saveButton.textContent = 'Save Contact';
    cancelButton.style.display = 'none';
    formHeader.textContent = 'Add New Contact';
}

function renderContacts(contacts) {
    contactList.innerHTML = '';
    if (contacts.length === 0) {
        contactList.innerHTML = '<p>No contacts found.</p>';
        return;
    }

    contacts.forEach(contact => {
        const item = document.createElement('div');
        item.className = 'contact-item';
        // Pass the contact object to editContact (JSON.stringify is needed for inline click)
        item.innerHTML = `
            <div>
                <strong>${contact.name}</strong> (${contact.email}) - ${contact.phone || 'N/A'}
            </div>
            <div>
                <button onclick='editContact(${JSON.stringify(contact)})'>Edit</button>
                <button onclick="deleteContact('${contact.id}')">Delete</button>
            </div>
        `;
        contactList.appendChild(item);
    });
}

// Initialize on page load
fetchContacts();