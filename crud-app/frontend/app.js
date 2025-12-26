// API Base URL - Update this to your Vercel deployment URL
const API_URL = window.location.origin;

// DOM Elements
const addUserBtn = document.getElementById('addUserBtn');
const userForm = document.getElementById('userForm');
const userFormElement = document.getElementById('userFormElement');
const formTitle = document.getElementById('formTitle');
const cancelBtn = document.getElementById('cancelBtn');
const userIdInput = document.getElementById('userId');
const userNameInput = document.getElementById('userName');
const userEmailInput = document.getElementById('userEmail');
const usersList = document.getElementById('usersList');
const loading = document.getElementById('loading');
const messageDiv = document.getElementById('message');

let isEditMode = false;

// Event Listeners
addUserBtn.addEventListener('click', () => {
    showForm('Add New User');
    resetForm();
});

cancelBtn.addEventListener('click', () => {
    hideForm();
    resetForm();
});

userFormElement.addEventListener('submit', handleSubmit);

// Functions
async function loadUsers() {
    showLoading();
    try {
        const response = await fetch(`${API_URL}/api/users`);
        if (!response.ok) throw new Error('Failed to fetch users');
        const users = await response.json();
        displayUsers(users);
    } catch (error) {
        showMessage('Failed to load users: ' + error.message, 'error');
        usersList.innerHTML = '<div class="empty-state"><h3>Error loading users</h3><p>Please check your API connection</p></div>';
    } finally {
        hideLoading();
    }
}

async function handleSubmit(e) {
    e.preventDefault();
    const userData = {
        name: userNameInput.value.trim(),
        email: userEmailInput.value.trim()
    };

    try {
        let response;
        if (isEditMode) {
            const id = userIdInput.value;
            response = await fetch(`${API_URL}/api/users/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData)
            });
        } else {
            response = await fetch(`${API_URL}/api/users`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData)
            });
        }

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Operation failed');
        }

        showMessage(`User ${isEditMode ? 'updated' : 'created'} successfully!`, 'success');
        hideForm();
        resetForm();
        loadUsers();
    } catch (error) {
        showMessage('Error: ' + error.message, 'error');
    }
}

async function deleteUser(id) {
    if (!confirm('Are you sure you want to delete this user?')) return;

    try {
        const response = await fetch(`${API_URL}/api/users/${id}`, {
            method: 'DELETE'
        });

        if (!response.ok) throw new Error('Failed to delete user');

        showMessage('User deleted successfully!', 'success');
        loadUsers();
    } catch (error) {
        showMessage('Failed to delete user: ' + error.message, 'error');
    }
}

function editUser(user) {
    isEditMode = true;
    showForm('Edit User');
    userIdInput.value = user.id;
    userNameInput.value = user.name;
    userEmailInput.value = user.email;
}

function displayUsers(users) {
    if (users.length === 0) {
        usersList.innerHTML = '<div class="empty-state"><h3>No users found</h3><p>Click "Add User" to create your first user</p></div>';
        return;
    }

    usersList.innerHTML = users.map(user => `
        <div class="user-card">
            <div class="user-info">
                <h3>${escapeHtml(user.name)}</h3>
                <p>${escapeHtml(user.email)}</p>
            </div>
            <div class="user-actions">
                <button class="btn btn-edit" onclick="editUser(${JSON.stringify(user).replace(/"/g, '&quot;')})">Edit</button>
                <button class="btn btn-danger" onclick="deleteUser('${user.id}')">Delete</button>
            </div>
        </div>
    `).join('');
}

function showForm(title) {
    formTitle.textContent = title;
    userForm.classList.remove('hidden');
    addUserBtn.style.display = 'none';
}

function hideForm() {
    userForm.classList.add('hidden');
    addUserBtn.style.display = 'block';
    isEditMode = false;
}

function resetForm() {
    userFormElement.reset();
    userIdInput.value = '';
    isEditMode = false;
}

function showLoading() {
    loading.classList.remove('hidden');
    usersList.innerHTML = '';
}

function hideLoading() {
    loading.classList.add('hidden');
}

function showMessage(text, type) {
    messageDiv.textContent = text;
    messageDiv.className = `message ${type}`;
    messageDiv.classList.remove('hidden');
    setTimeout(() => {
        messageDiv.classList.add('hidden');
    }, 5000);
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Make functions global for onclick handlers
window.editUser = editUser;
window.deleteUser = deleteUser;

// Load users on page load
loadUsers();

