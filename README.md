# 🚀 Collaborative Project Space

A full-stack MERN application designed to help teams collaborate on projects in real time. Users can create projects, manage tasks through a Kanban board, assign members, track milestones, and monitor project activity through a dedicated timeline.

---

## ✨ Features

### 🔐 Authentication
- User Registration
- User Login
- JWT Authentication
- Protected Routes

### 📁 Project Management
- Create Projects
- Update Projects
- Delete Projects
- Switch Between Projects

### ✅ Task Management
- Create Tasks
- Edit Tasks
- Delete Tasks
- Assign Tasks to Members
- Task Priorities (Low, Medium, High)
- Task Status (Todo, In Progress, Done)
- Kanban Board
- Drag & Drop Task Management
- Real-Time Task Updates (Socket.io)

### 👥 Team Collaboration
- Invite Members via Email
- Remove Members
- View Project Members

### 🎯 Milestones
- Create Milestones
- Update Milestones
- Delete Milestones
- Track Progress
- Due Dates
- Status Tracking

### 📊 Dashboard
- Project Statistics
- Total Projects
- Total Tasks
- Completed Tasks
- Team Members
- Task Overview

### 📝 Activity Timeline
- Logs Project Activities
- Task Creation
- Task Updates
- Task Deletion
- Member Management
- Milestone Activities
- Project Activities

### ⚡ Real-Time Features
- Socket.io Integration
- Live Task Updates
- Live Dashboard Refresh

---

## 🛠 Tech Stack

### Frontend
- React.js
- React Router DOM
- Tailwind CSS
- Axios
- Socket.io Client
- @hello-pangea/dnd

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Socket.io
- bcryptjs
- dotenv

---

## 📂 Project Structure

```text
CollaborativeProjectSpace
│
├── client
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── services
│   │   ├── utils
│   │   └── App.jsx
│   └── package.json
│
├── server
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── socket
│   ├── utils
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

## ⚙️ Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/CollaborativeProjectSpace.git
cd CollaborativeProjectSpace
```

After cloning, choose one of the setup methods below.

---

## Option 1: Docker Installation

Use this option if you want to start the full application stack with Docker.

### Step 1: Build and Start the Containers

```bash
docker compose up --build
```

This command starts:

- Frontend on `http://localhost:5173`
- Backend on `http://localhost:5007`
- MongoDB on `mongodb://localhost:27017`

### Step 2: Open the Application

Visit:

```text
http://localhost:5173
```

### Step 3: Stop the Containers

```bash
docker compose down
```

---

## Option 2: Manual Installation

Use this option if you want to run the frontend, backend, and MongoDB manually on your machine.

### Step 1: Make Sure MongoDB Is Running

Before starting the backend, make sure you have a running MongoDB instance and a valid connection string.

### Step 2: Install Backend Dependencies

```bash
cd server
npm install
```

### Step 3: Create the Backend Environment File

Create a `.env` file inside the `server` folder with the following values:

```env
PORT=5007
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
CLIENT_URL=http://localhost:5173
```

### Step 4: Start the Backend Server

```bash
npm run dev
```

### Step 5: Start the Frontend in a New Terminal

```bash
cd client
npm install
npm run dev
```

### Step 6: Open the Application

Frontend:

```text
http://localhost:5173
```

Backend:

```text
http://localhost:5007
```

---

## 📸 Screenshots

Suggested screenshots to include:

- Login Page
- Register Page
- Dashboard
- Kanban Board
- Project Management
- Members Page
- Milestones Page
- Activity Timeline

---

## 🔒 Environment Variables

The project uses the following environment variables:

```text
PORT
MONGO_URI
JWT_SECRET
CLIENT_URL
```

**The `.env` file is not included in this repository for security reasons.**

---

## 🚀 Future Improvements

- File Uploads
- Comments on Tasks
- Notifications
- Calendar View
- Task Labels
- Email Invitations
- Dark Mode
- User Roles & Permissions
- Project Archive
- Search & Filters

---

## 👩‍💻 Author

**Ayesha Farooq**

BS Computer Science
University of Lahore

GitHub:
https://github.com/ayeshafarooq578-gif

LinkedIn:
(Add your LinkedIn profile here)

---

## 📜 License

This project was developed for educational and portfolio purposes.
