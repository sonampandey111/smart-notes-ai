# 📚 Smart AI Notes Analyzer

> **Transform lecture notes, PDF textbooks, and Word documents into executive summaries, key concepts, interactive AI quizzes, and 3D flashcards — powered by Google Gemini AI & MongoDB.**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![AI Engine](https://img.shields.io/badge/AI-Google%20Gemini%20%2F%20Gemma-4285F4)](https://ai.google.dev/)
[![Frontend](https://img.shields.io/badge/Frontend-React%2018%20%2B%20Vite-61DAFB)](https://vitejs.dev/)
[![Backend](https://img.shields.io/badge/Backend-Python%20Flask-000000)](https://flask.palletsprojects.com/)
[![Database](https://img.shields.io/badge/Database-MongoDB-47A248)](https://www.mongodb.com/)

---

## 🌟 Key Features

1. 📂 **Multi-Format Note Upload**:
   - Upload **PDF (`.pdf`)** with `pypdf` text extraction.
   - Upload **Word (`.docx`)** documents with `python-docx` parser.
   - Upload **Plain Text (`.txt`)** files.
   - Or paste notes directly into the built-in rich text editor.

2. 🧠 **AI Summarization**:
   - Generates concise, high-impact executive summaries.
   - Actionable study checklist for self-assessment.
   - 1-click copy to clipboard and export options.

3. 🔑 **Key Points & Definitions Extraction**:
   - **Core Concepts**: Clear bulleted breakdown of fundamental principles.
   - **Definitions Glossary**: Highlighting academic terminology.
   - **Formulas & Scientific Laws**: Equations, theorem notations, and explanations.
   - **Keywords & Index Chips**: Quick tagging system for revision.

4. 🎯 **Interactive AI Quiz Generator**:
   - **Multiple Choice Questions (MCQs)**: 4 choices per question with instant visual feedback (green/red), real-time score tracker, and explanations.
   - **True / False Questions**: Rapid retention check with explanations.
   - **Celebration Confetti**: Dynamic animation on high retention scores (≥ 70%).

5. 🗂️ **3D Flip Flashcards**:
   - Smooth 180° 3D card flip animation for active recall.
   - Category tags, Next/Previous card navigation, and "Mark as Mastered" tracker.

6. 💬 **Notes Q&A Chatbot**:
   - Conversational assistant strictly grounded in your uploaded study notes.
   - Instant answers with conceptual citations.

7. 🌐 **Bilingual Language Support**:
   - Toggle seamlessly between **English 🇬🇧** and **Hindi (हिन्दी) 🇮🇳**.
   - Generates summaries, key points, quizzes, and flashcards in your chosen language.

8. 💾 **Download & Export**:
   - Export comprehensive **Study Pack (`.txt`)** with summaries, formulas, quizzes, and flashcards.
   - One-click **Print / Save as PDF**.

9. 📊 **User-Friendly Dashboard**:
   - Live analytics: Total notes analyzed, words processed, quizzes generated, and flashcard counts.
   - History library connected to **MongoDB** with 1-click reload and delete.

---

## 🛠️ Architecture & Tech Stack

- **Frontend**: React 18, Vite, Lucide Icons, Canvas Confetti, Modern CSS3 3D Transforms (Professional Blue & White Theme)
- **Backend**: Python 3.10+, Flask, Flask-CORS, python-dotenv
- **Document Processing**: `pypdf` (PDFs), `python-docx` (Word Documents)
- **AI Integration**: Google AI Studio Gemini API (`models/gemini-flash-latest`, `models/gemma-4-26b-a4b-it`)
- **Database**: MongoDB (with automatic local storage fallback)

```
[ User Upload: PDF / DOCX / TXT / Paste ]
                  │
                  ▼
      [ React 18 + Vite Frontend ]
                  │ (REST API / Multipart)
                  ▼
     [ Python Flask REST API Server ]
       ├── pypdf (PDF parsing)
       ├── python-docx (Word parsing)
       ├── MongoDB (Notes & Study Stats)
       └── Google Gemini AI Engine
                  │
                  ▼
[ Structured Analysis: Summary + Key Points + Quiz + Flashcards + Q&A ]
```

---

## 🚀 Quick Start Guide (VS Code)

### Prerequisites
- [Node.js (v18+)](https://nodejs.org/)
- [Python (3.10+)](https://www.python.org/)
- *(Optional)* [MongoDB Community Server](https://www.mongodb.com/try/download/community) — *App runs with built-in fallback if MongoDB is not installed!*

---

### Step 1: Clone the Repository
```bash
git clone https://github.com/sonampandey111/smart-notes-ai.git
cd smart-notes-ai
```

---

### Step 2: Configure Environment Variables

Create a `.env` file inside the `backend/` folder:
```bash
# backend/.env
GEMINI_API_KEY=your_gemini_api_key_here
MONGODB_URI=mongodb://localhost:27017
PORT=5000
```
> 💡 Get a free Gemini API key from [Google AI Studio](https://aistudio.google.com/).

---

### Step 3: Run the Backend
Open a terminal in VS Code:
```bash
cd backend
python -m pip install -r requirements.txt
python app.py
```
> Flask server runs at: `http://127.0.0.1:5000`

---

### Step 4: Run the Frontend
Open a second terminal in VS Code:
```bash
cd frontend
npm install
npm run dev
```
> React application will open at: `http://localhost:5173`

---

### ⚡ 1-Click Launch (Windows)
Double-click `start_project.bat` in the project root to start both backend and frontend servers simultaneously!

---

## 📤 Upload to GitHub (गिटहब पर अपलोड कैसे करें)

### Repository Link:
🔗 **[https://github.com/sonampandey111/smart-notes-ai](https://github.com/sonampandey111/smart-notes-ai)**

### Option A: Double-Click Helper Script
Double-click `push_to_github.bat` in your project folder. It will stage, commit, and push your latest code to GitHub automatically.

### Option B: Terminal Commands
Run these commands in your VS Code terminal:
```bash
# 1. Check status
git status

# 2. Stage all files
git add .

# 3. Commit with a message
git commit -m "feat: complete Smart AI Notes Analyzer with full features"

# 4. Push to GitHub
git branch -M main
git push -u origin main
```

---

## 📂 Project Structure

```text
smart-notes-ai/
├── backend/
│   ├── app.py                # Flask API routes, file parsers, AI engine & MongoDB layer
│   ├── requirements.txt      # Python dependencies
│   ├── .env                  # Private API keys (git-ignored)
│   └── .env.example          # Environment variables template
├── frontend/
│   ├── index.html            # Main HTML document
│   ├── package.json          # Node dependencies and scripts
│   ├── vite.config.js        # Vite build configuration
│   └── src/
│       ├── App.jsx           # Main React component with all tabs & interactive features
│       ├── App.css           # Blue-and-white theme, 3D card flip & responsive styling
│       ├── main.jsx          # React DOM entry point
│       └── index.css         # Typography & base styles
├── push_to_github.bat        # 1-click GitHub upload batch script
├── start_project.bat         # 1-click local launcher for both servers
├── sample_notes.txt          # Sample test study notes
├── LICENSE                   # MIT License
└── README.md                 # Complete documentation
```

---

## 📄 License
This project is licensed under the [MIT License](LICENSE).
