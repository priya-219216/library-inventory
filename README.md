# 📚 Library Inventory Management System

A simple full-stack application for managing a library's books and issuing them to students.  
Built with **React** for the frontend and **Node.js**, **Express**, and **MongoDB** for the backend.

---

## ✨ Features

- Add, edit, and delete books
- View the list of available books
- Issue books to students
- View issued books
- Return books
- Simple and clean UI

---

## 🧰 Tech Stack

- **Frontend**: React JS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Local Database)
- **Tools**: MongoDB Compass (for GUI database management)

---

## 📥 Prerequisites

Before you begin, ensure you have the following installed:

- Node.js and npm
- MongoDB Community Server + Compass
- VS Code Editor

---

## 🛠️ Setup Instructions

### 🔹 1. Install Node.js and MongoDB
- Install Node.js from [Node.js Official Website](https://nodejs.org/).
- Install MongoDB and MongoDB Compass from [MongoDB Official Download](https://www.mongodb.com/try/download/community).

### 🔹 2. Clone the Repository (optional)

```bash
git clone https://github.com/your-username/library-inventory.git
```
Or simply download and extract the project files.

# 🚀 Running the Project Locally

You need to run the backend and frontend in two separate VS Code windows:

---

## 🖥️ Backend Setup (Server)

- Open a new VS Code window and navigate to the `backend/` folder.

- Install required backend dependencies:

```bash
npm install express cors body-parser mongodb
```
- Start the backend server:

```bash
npm start
```
- ✅ The server should start with the following messages:

MongoDB connected successfully Server is running on http://localhost:8000

---

## 🖥️ Frontend Setup (Client)

- Open another new VS Code window and navigate to the `frontend/` folder.
- Start the frontend server:

```bash
npm start
```

- ✅ Your frontend will open in the browser at something like:

http://127.0.0.1:3000/

(Port number may vary slightly depending on your system.)

---

## 🛢️ Database Setup

- Make sure MongoDB server is running locally.
- Open MongoDB Compass.
- Connect to:

```bash
mongodb://localhost:27017
```

---

## 🛣️ API Endpoints

| Method | Endpoint              | Description                      |
|--------|------------------------|----------------------------------|
| GET    | `/api/books`            | Fetch all available books        |
| GET    | `/api/issuedBooks`      | Fetch all borrowed books         |
| POST   | `/addbooks`             | Add a new book to the library    |
| POST   | `/issueData`            | Borrow a book                    |
| PUT    | `/updatebooks/:id`      | Update an existing book          |
| DELETE | `/deletebooks/:id`      | Delete a book from the library   |
| DELETE | `/returnbook/:id`       | Return (delete) a borrowed book  |

---

##  🧠 Additional Notes

- Backend must be running before interacting with the frontend.
- Ensure that MongoDB service is active and Compass is connected when starting the server.
- Use Postman (optional) to test backend API endpoints separately.

---

## ✨ Future Enhancements (Optional Ideas)

- Add authentication (Admin login).
- Add pagination and search for books.
- Deploy backend to Heroku and frontend to Netlify.
- Add Book Cover Image Upload.

---

## 👨‍💻 Author

Made by Priya Pandiyan

GitHub: https://github.com/priya-219216

LinkedIn: www.linkedin.com/in/priya-p-405032344
