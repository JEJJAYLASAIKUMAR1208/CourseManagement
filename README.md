# Courses Web Application

A full-stack Courses Management Web Application built with **React (frontend)**, **Node.js/Express (backend)**, and **SQLite**.

- **Admin**: Can add, edit, and delete courses (CRUD operations).  
- **Students**: Can view and enroll in courses but cannot modify them.

---

## Admin Credentials
Username: admin@test.com
Password: admin123

---

## Prerequisites

- Node.js v18+  
- npm 
- Git  

---

## Steps to Run Locally

### 1. Clone the Repository
    clone the repo 
    cd courseManagement
### 2. Backend Setup
    cd backend
    npm install
## Run Backend
    npm run dev
### 3. Frontend Setup
    cd ../frontend
    npm install
### Run Frontend
    npm start
Usage

Admin: Log in with admin credentials, access courses page, add/edit/delete courses

Student: Register or log in, view available courses, enroll in courses

Notes

Only admin has CRUD access; students have read-only access

SQLite database file is stored in the backend folder

Ensure backend is running before using the frontend

