# AI Study Material Generator

An AI-powered educational platform that automatically generates study materials from uploaded documents. The system helps students save time and improve learning efficiency by generating summaries, quizzes, flashcards, MCQs, and providing AI chatbot assistance.

---

## 📌 Project Information

**Project Title:** AI Study Material Generator

**Course:** CSE4104 – Software Development III

**Team Name:** CSE4104-7C-T03

**Section:** 7C

---

## 👥 Team Information

| Name                 | Student ID     | Role        |
| ------------------   | ----------     | ----------- |
| [Md.Jubayer Hossain] |[11230121152]   | Team Leader |
| [Zemima Khan jimu]   | [11230121144]  | Member      |
| [Orin Khan Joty]     | [11230121147]  | Member      |
| [Rafiuzzaman Rafi]   | [11230121154]  | Member      |

---

## 📖 Project Description

Students often spend significant time creating notes, summaries, flashcards, and practice questions manually. Existing learning platforms provide limited automation and personalization.

The AI Study Material Generator solves this problem by allowing students to upload study materials and automatically generate:

* Summaries
* Multiple Choice Questions (MCQs)
* Flashcards
* Quizzes
* AI-powered chatbot responses

This system enhances learning efficiency and reduces the time required for exam preparation.

---

## 🎯 Objectives

* Automate study material generation.
* Reduce manual note-taking effort.
* Improve student productivity.
* Provide AI-assisted learning support.
* Generate personalized learning resources.

---

## ✨ Features

### User Features

* User Registration
* User Login & Authentication
* Profile Management
* Upload Study Documents
* Download Generated Materials

### AI Features

* AI Summary Generator
* AI MCQ Generator
* AI Flashcard Generator
* AI Quiz Generator
* AI Chatbot Assistance

### Admin Features

* Manage Users
* Manage Documents
* Monitor System Activities

---

## 🏗️ System Architecture

```text
Student/User
      │
      ▼
Frontend (React.js)
      │
      ▼
Backend API (Node.js + Express.js)
      │
      ├────────► MongoDB Database
      │
      └────────► OpenAI API 
```

---

## 🛠️ Technology Stack

### Frontend
* HTML
* React.js
* Tailwind CSS
* JavaScript
  

### Backend

* Node.js
* Express.js
* JWT Authentication

### Database

* MongoDB

### AI Integration

* OpenAI API 


### Tools

* Draw.io
* DBDiagram.io
* GitHub

---

## 📂 Repository Structure

```text
AI-Study-Material-Generator/
│
├── frontend/          # React frontend application
├── backend/           # Node.js backend APIs
├── ai-module/         # AI processing and integration
├── database/          # Database schema and scripts
├── documentation/     # SRS, System Design, Reports
├── diagrams/          # UML and architecture diagrams
├── docs/              # Additional project documents
├── README.md
│
└── .gitignore
```

---

## 🔌 Planned API Endpoints

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

---

## 🤖 AI Integration Workflow

```text
User Uploads Document
            │
            ▼
Backend Extracts Text
            │
            ▼
OpenAI / Gemini API
            │
            ▼
AI Processes Content
            │
            ▼
Generate:
• Summary
• MCQs
• Flashcards
• Quiz Questions
            │
            ▼
Store Results in Database
            │
            ▼
Display Results to User
```

---

## 📚 References

* OpenAI API Documentation
* Google Gemini API Documentation
* React.js Documentation
* Node.js Documentation
* Express.js Documentation
* MongoDB Documentation

---

## 📄 License

This project is developed for academic purposes as part of the CSE4104 – Software Development III course.

---

## ⭐ Project Status

**Current Phase:** UI/UX Design and Development Planning

**Development Status:** In Progress 🚧

