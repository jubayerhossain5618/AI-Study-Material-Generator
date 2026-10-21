# 📚 AI Study Material Generator – StudyGen

StudyGen is a full-stack AI-powered web application designed to help students generate useful study materials from uploaded documents.

Users can upload study materials in PDF, DOCX, or TXT format and use AI-powered features to generate summaries, MCQs, flashcards, quizzes, and ask questions through an AI Tutor.

## ✨ Features

- 🔐 User Registration and Login
- 🛡️ Protected User Dashboard
- 📤 PDF, DOCX, and TXT File Upload
- 📄 AI Summary Generator
- 🧠 AI MCQ Generator
- 🗂️ AI Flashcard Generator
- 📝 AI Quiz Generator
- 🤖 AI Tutor
- 👤 User Profile Management
- 🔎 Uploaded File Search
- 📁 Recent Files
- 🚪 Secure Logout
- 📱 Responsive Mobile, Tablet, and Desktop Design
- ☰ Mobile Hamburger Navigation

## 🛠️ Technologies Used

### Frontend
- React.js
- Vite
- React Router
- CSS
- JavaScript

### Backend
- Node.js
- Express.js
- REST API

### Database
- MongoDB
- Mongoose

### AI Integration
- Google Gemini API

### Authentication
- JSON Web Token (JWT)

## 📂 Project Structure

```text
AI-Study-Material-Generator/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   └── server.js
│
├── frontend/
│   ├── public/
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── App.jsx
│       └── main.jsx
│
├── database/
├── diagrams/
├── documentation/
└── README.md
```

## ⚙️ Installation and Setup

### 1. Clone the Repository

```bash
git clone https://github.com/jubayerhossain5618/AI-Study-Material-Generator.git
cd AI-Study-Material-Generator
```

### 2. Install Backend Dependencies

```bash
cd backend
npm install
```

### 3. Configure Environment Variables

Create a `.env` file inside the `backend` directory.

Example:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_gemini_api_key
```

> Never commit the real `.env` file or API keys to GitHub.

### 4. Start the Backend

```bash
npm start
```

The backend server runs on:

```text
https://ai-study-material-generator-xwx7.onrender.com
```

### 5. Install Frontend Dependencies

Open another terminal:

```bash
cd frontend
npm install
```

### 6. Start the Frontend

```bash
npm run dev
```

The frontend runs on:

```text
http://localhost:5173
```

## 🤖 AI Study Tools

StudyGen uses the Google Gemini API to process extracted document text and generate:

- Document summaries
- Multiple-choice questions
- Flashcards
- Practice quizzes
- Context-based AI Tutor answers

## 📱 Responsive Design

The application supports desktop, tablet, and mobile devices.

On smaller screens, the desktop sidebar automatically changes to a hamburger navigation menu with a scrollable sidebar and overlay.

## 🔒 Security

- Password-based authentication
- JWT-protected application routes
- User-specific document access
- Environment variables for sensitive credentials
- Unsupported upload formats are restricted
- `.env` files are excluded through `.gitignore`

## 🧪 Testing

The application has been tested for:

- Registration and login
- Invalid login credentials
- Protected route access
- File upload validation
- AI content generation
- AI Tutor functionality
- Profile updates
- Logout
- Mobile responsiveness
- Tablet responsiveness
- Desktop responsiveness
- Mobile navigation

## 🚀 Project Status

**Final tested version completed.**

The major application features are functional and the responsive dashboard/navigation has been tested across mobile, tablet, and desktop layouts.

## 👥 Contributors

Developed as an academic software project.

## 📄 License

This project is intended for educational and academic purposes.