# 📚 AI Study Material Generator

An AI-powered educational platform that automatically generates study materials from uploaded documents. The system helps students save time and improve learning efficiency by generating **summaries, quizzes, flashcards, MCQs**, and providing an **AI Study Tutor / Chatbot**.

---

## 📌 Project Information

**Project Title:** AI Study Material Generator

**Course:** CSE4104 – Software Development III

**Team Name:** CSE4104-7C-T03

**Section:** 7C

---

## 👥 Team Information

| Name | Student ID | Role |
|---|---|---|
| Md. Jubayer Hossain | 11230121152 | Team Leader |
| Zemima Khan Jimu | 11230121144 | Member |
| Orin Khan Joty | 11230121147 | Member |
| Rafiuzzaman Rafi | 11230121154 | Member |

---

## 📖 Project Description

Students often spend significant time manually creating notes, summaries, flashcards, and practice questions from their study materials.

The **AI Study Material Generator** solves this problem by allowing students to upload their study documents and automatically generate useful learning materials using Artificial Intelligence.

The system supports **PDF, DOCX, and TXT** files and can generate:

- 📄 Summaries
- ❓ Multiple Choice Questions (MCQs)
- 🃏 Flashcards
- 📝 Quizzes
- 🤖 AI Study Tutor / Chatbot responses

The platform also provides secure user authentication, profile management, an admin dashboard, document management, and a responsive user interface.

---

## 🎯 Objectives

- Automate study material generation.
- Reduce manual note-taking effort.
- Improve student productivity.
- Provide AI-assisted learning support.
- Generate personalized learning resources.
- Help students prepare for examinations more efficiently.

---

## ✨ Features

### 👤 User Features

- User Registration
- User Login
- JWT Authentication
- Secure Password Hashing
- Profile Management
- Upload Study Documents
- PDF, DOCX & TXT File Support
- Dashboard Search
- View Generated Materials

### 🤖 AI Features

- AI Summary Generator
- AI MCQ Generator
- AI Flashcard Generator
- AI Quiz Generator
- AI Study Tutor / Chatbot
- Google Gemini API Integration

### 👨‍💼 Admin Features

- Admin Dashboard
- User Management
- Document Management
- Dashboard Search
- System Monitoring

### 🎨 UI & System Features

- Responsive User Interface
- React-based Dashboard
- Frontend–Backend Integration
- MongoDB Database Integration
- REST API
- Error Handling

---

## 🏗️ System Architecture

```text
                         ┌───────────────────┐
                         │   Student / User  │
                         └─────────┬─────────┘
                                   │
                                   ▼
                         ┌───────────────────┐
                         │  React.js + Vite  │
                         │     Frontend      │
                         └─────────┬─────────┘
                                   │
                                   ▼
                         ┌───────────────────┐
                         │ Node.js + Express │
                         │      Backend      │
                         └─────────┬─────────┘
                                   │
                    ┌──────────────┼──────────────┐
                    │              │              │
                    ▼              ▼              ▼
             ┌────────────┐ ┌────────────┐ ┌──────────────┐
             │  MongoDB   │ │ JWT + bcrypt│ │ Gemini API   │
             │  Database  │ │Authentication│ │     AI       │
             └────────────┘ └────────────┘ └──────┬───────┘
                                                   │
                                                   ▼
                                          ┌─────────────────┐
                                          │ Study Materials │
                                          ├─────────────────┤
                                          │ • Summary       │
                                          │ • MCQ           │
                                          │ • Flashcards    │
                                          │ • Quiz          │
                                          │ • AI Tutor      │
                                          └─────────────────┘
```

---

## 🛠️ Technology Stack

### Frontend

- React.js
- Vite
- JavaScript
- Responsive UI

### Backend

- Node.js
- Express.js
- REST API
- JWT Authentication
- bcrypt

### Database

- MongoDB

### AI Integration

- Google Gemini API

### Tools

- Visual Studio Code
- Figma
- Draw.io
- DB Diagram
- Git
- GitHub
- Postman / Thunder Client

---

## 📂 Repository Structure

```text
AI-Study-Material-Generator/
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   ├── config/
│   ├── server.js
│   └── package.json
│
├── database/
├── documentation/
├── diagrams/
├── ai/
├── screenshots/
│
├── .gitignore
└── README.md
```

---

## 🔌 API Endpoints

### Authentication APIs

```http
POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout
```

### User APIs

```http
GET /api/user/profile
PUT /api/user/profile
```

### Document APIs

```http
POST /api/documents/upload
GET /api/documents
DELETE /api/documents/:id
```

### AI APIs

```http
POST /api/ai/summary
POST /api/ai/mcq
POST /api/ai/flashcards
POST /api/ai/quiz
POST /api/ai/chat
```

> **Note:** Endpoint availability may depend on the current backend implementation and route configuration.

---

## 🤖 AI Integration Workflow

```text
User Uploads Document
          │
          ▼
Backend Receives Document
          │
          ▼
Extract Text from Document
          │
          ▼
Send Relevant Content
to Google Gemini API
          │
          ▼
Gemini AI Processes Content
          │
          ├───────────────┐
          │               │
          ▼               ▼
       Summary          MCQs
          │               │
          ├───────────────┤
          │               │
          ▼               ▼
     Flashcards          Quiz
          │
          ▼
     AI Study Tutor
          │
          ▼
Display Generated
Materials to User
```

---

## 🔐 Authentication & Security

The system uses several security mechanisms:

- JWT-based authentication
- Password hashing using bcrypt
- Protected API routes
- Role-based access for admin functionality
- Environment variables for sensitive credentials
- `.env` excluded from GitHub

---

## 📄 Supported File Formats

| File Format | Support |
|---|---|
| PDF | ✅ |
| DOCX | ✅ |
| TXT | ✅ |

---

## ⭐ Project Status

**Current Phase:** Final Presentation & Viva — Week 14  
**Development Status:** ✅ Complete  
**Latest Completed Phase:** Week 13 — Presentation Preparation ✅

---

## ✅ Completed Features

- User Registration & Login
- JWT Authentication
- PDF, DOCX & TXT File Upload
- AI Summary Generator
- AI MCQ Generator
- AI Flashcard Generator
- AI Quiz Generator
- AI Study Tutor / Chatbot
- User Profile Update
- Admin Dashboard
- Dashboard Search
- Responsive UI
- MongoDB Database Integration

---

## 🚀 Project Progress

| Week | Phase | Status |
|---|---|---|
| Week 7 | Frontend Development | ✅ Completed |
| Week 8 | AI Integration | ✅ Completed |
| Week 9 | Feature Completion | ✅ Completed |
| Week 10 | Testing & Debugging | ✅ Completed |
| Week 11 | Deployment | ✅ Completed |
| Week 12 | Documentation | ✅ Completed |
| Week 13 | Presentation Preparation | ✅ Completed |
| Week 14 | Final Presentation & Viva | ⏳ Current |

### 🎉 Overall Development Status: **100% Complete**

---

## ▶️ How to Run the Project

### 1. Clone the Repository

```bash
git clone https://github.com/jubayerhossain5618/AI-Study-Material-Generator.git
cd AI-Study-Material-Generator
```

### 2. Backend Setup

Navigate to the backend directory:

```bash
cd backend
```

Install the required dependencies:

```bash
npm install
```

Create a `.env` file inside the `backend` folder.

Add the required environment variables:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_gemini_api_key
```

Start the backend server:

```bash
npm start
```

---

### 3. Frontend Setup

Open a **new terminal** and navigate to the frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the frontend development server:

```bash
npm run dev
```

Vite will provide the local development URL in the terminal.

---

## 🔑 Environment Variables

The backend requires the following environment variables:

| Variable | Description |
|---|---|
| `MONGO_URI` | MongoDB connection string |
| `JWT_SECRET` | Secret key for JWT authentication |
| `GEMINI_API_KEY` | Google Gemini API key |

Add the following to `.gitignore`:

```gitignore
.env
node_modules/
```

---

## 🧪 Testing

The system has been tested for:

- User registration
- User login
- JWT authentication
- Password hashing
- File uploading
- PDF processing
- DOCX processing
- TXT processing
- AI summary generation
- MCQ generation
- Flashcard generation
- Quiz generation
- AI Study Tutor / Chatbot
- User profile update
- Admin dashboard
- Dashboard search
- MongoDB operations
- Frontend–backend API communication
- Responsive UI
- Error handling

---


## 🚀 Future Improvements

Although the current academic version is complete, the following features can be considered for future development:

- Voice-based AI Study Tutor
- Support for additional document formats
- Personalized study plans
- Student learning progress tracking
- Advanced learning analytics
- AI-generated explanations with references
- Mobile application
- More AI model options


---

## 📄 License

This project is developed for **academic purposes** as part of the **CSE4104 – Software Development III** course.

**© 2026 AI Study Material Generator Team**

