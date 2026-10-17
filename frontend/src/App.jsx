import React, { useState, useEffect, useRef } from "react";
import confetti from "canvas-confetti";
import {
  LayoutDashboard,
  UploadCloud,
  FileText,
  Sparkles,
  HelpCircle,
  Layers,
  MessageSquare,
  History,
  Download,
  CheckCircle,
  XCircle,
  RefreshCw,
  Trash2,
  ChevronRight,
  ChevronLeft,
  Copy,
  Printer,
  Check,
  Menu,
  X,
  Globe,
  Database,
  Award,
  Brain,
  Zap,
  ArrowRight,
  BookOpen
} from "lucide-react";
import "./App.css";

const API_BASE = "http://127.0.0.1:5000";

const SAMPLE_NOTES = {
  physics: {
    title: "Newton's Laws of Motion & Gravitation",
    text: `Newton's First Law of Motion states that an object at rest stays at rest, and an object in uniform motion stays in uniform motion unless acted upon by a net external force. This property is known as inertia.
Newton's Second Law of Motion establishes the relationship between force, mass, and acceleration: F = m * a. The acceleration of an object is directly proportional to the net force acting upon it and inversely proportional to its mass.
Newton's Third Law states that for every action, there is an equal and opposite reaction (F_AB = -F_BA). Forces always occur in matched pairs.
Newton's Law of Universal Gravitation states that any two bodies in the universe attract each other with a force proportional to the product of their masses and inversely proportional to the square of the distance between them: F_g = G * (m1 * m2) / r^2, where G = 6.674e-11 N*m^2/kg^2.`
  },
  biology: {
    title: "Cellular Respiration & ATP Synthesis",
    text: `Cellular respiration is the biochemical pathway by which organisms break down glucose to generate ATP (adenosine triphosphate), the energy currency of cells.
Overall Equation: C6H12O6 + 6O2 -> 6CO2 + 6H2O + ~36-38 ATP.
Stage 1: Glycolysis occurs in the cytoplasm, breaking glucose (6C) into two pyruvate (3C) molecules, producing 2 net ATP and 2 NADH without requiring oxygen.
Stage 2: Krebs Cycle (Citric Acid Cycle) takes place in the mitochondrial matrix, oxidizing acetyl-CoA into CO2, producing ATP, NADH, and FADH2.
Stage 3: Oxidative Phosphorylation & Electron Transport Chain (ETC) is located in the inner mitochondrial membrane. Electrons travel through complexes I-IV, creating a proton gradient across the intermembrane space. ATP synthase utilizes this proton-motive force (chemiosmosis) to synthesize the bulk of ATP.`
  },
  ai: {
    title: "Artificial Intelligence & Neural Networks",
    text: `Artificial Intelligence (AI) refers to computer systems engineered to perform tasks typically requiring human intelligence, such as visual perception, natural language understanding, and automated decision-making.
Machine Learning (ML) is a subfield of AI where algorithms learn statistical patterns from data without being explicitly programmed.
Supervised Learning maps input features (X) to targets (Y) using labeled datasets (e.g., classification, regression).
Unsupervised Learning uncovers latent structures and groupings from unlabeled data (e.g., k-means clustering, PCA).
Deep Learning leverages Artificial Neural Networks (ANNs) composed of interconnected layers of artificial neurons. Each neuron applies a linear transformation followed by a non-linear activation function (ReLU, Sigmoid, GELU).
Training employs backpropagation and gradient descent optimization to minimize a loss function by adjusting network weights.`
  }
};

function App() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [language, setLanguage] = useState("en");

  // Notes and upload state
  const [inputText, setInputText] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");
  const [error, setError] = useState(null);

  // Active analyzed note data
  const [activeNote, setActiveNote] = useState(null);
  const [historyList, setHistoryList] = useState([]);
  const [stats, setStats] = useState({
    total_notes: 0,
    total_words: 0,
    quizzes_generated: 0,
    flashcards_generated: 0,
    db_type: "Connecting..."
  });

  // Quiz state
  const [userMcqAnswers, setUserMcqAnswers] = useState({});
  const [userTfAnswers, setUserTfAnswers] = useState({});
  const [quizScore, setQuizScore] = useState(null);

  // Flashcards state
  const [cardIndex, setCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [masteredCards, setMasteredCards] = useState(new Set());

  // Q&A Chat state
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const chatBottomRef = useRef(null);

  // Copy feedback state
  const [copied, setCopied] = useState(false);

  // Fetch initial dashboard stats & history on load
  useEffect(() => {
    fetchStats();
    fetchHistory();
  }, []);

  useEffect(() => {
    if (chatBottomRef.current) {
      chatBottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatMessages]);

  const fetchStats = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/stats`);
      if (res.ok) {
        const data = await res.json();
        if (data.stats) setStats(data.stats);
      }
    } catch (err) {
      console.warn("Backend not reached for stats:", err);
    }
  };

  const fetchHistory = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/history`);
      if (res.ok) {
        const data = await res.json();
        if (data.notes) setHistoryList(data.notes);
      }
    } catch (err) {
      console.warn("Backend not reached for history:", err);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const lower = file.name.toLowerCase();
    if (!lower.endsWith(".pdf") && !lower.endsWith(".docx") && !lower.endsWith(".doc") && !lower.endsWith(".txt")) {
      setError("Supported file types are: .pdf, .docx, and .txt");
      return;
    }
    setSelectedFile(file);
    setError(null);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      const lower = file.name.toLowerCase();
      if (lower.endsWith(".pdf") || lower.endsWith(".docx") || lower.endsWith(".doc") || lower.endsWith(".txt")) {
        setSelectedFile(file);
        setError(null);
      } else {
        setError("Please upload a PDF, DOCX, or TXT file.");
      }
    }
  };

  const loadSample = (key) => {
    const s = SAMPLE_NOTES[key];
    if (s) {
      setInputText(s.text);
      setSelectedFile(null);
      setError(null);
    }
  };

  const analyzeNotes = async () => {
    if (!inputText.trim() && !selectedFile) {
      setError("Please paste your study notes or upload a PDF, DOCX, or TXT file.");
      return;
    }

    setLoading(true);
    setLoadingMessage(language === "hi" ? "AI नोट्स का विश्लेषण कर रहा है..." : "Analyzing notes with AI...");
    setError(null);

    const formData = new FormData();
    if (inputText.trim()) formData.append("text", inputText);
    if (selectedFile) formData.append("file", selectedFile);
    formData.append("language", language);

    try {
      const res = await fetch(`${API_BASE}/api/analyze`, {
        method: "POST",
        body: formData
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Analysis failed. Please check the backend server.");
      }

      setActiveNote(data.data);
      // Reset interactive components
      setUserMcqAnswers({});
      setUserTfAnswers({});
      setQuizScore(null);
      setCardIndex(0);
      setIsFlipped(false);
      setMasteredCards(new Set());
      setChatMessages([
        {
          sender: "bot",
          text: language === "hi"
            ? `नमस्ते! मैंने "${data.data.title}" का विश्लेषण पूरा कर लिया है। आप इन नोट्स से संबंधित कोई भी प्रश्न पूछ सकते हैं!`
            : `Hello! I have finished analyzing "${data.data.title}". Feel free to ask me anything about your notes!`
        }
      ]);

      // Switch to Summary tab
      setActiveTab("summary");
      fetchStats();
      fetchHistory();
    } catch (err) {
      setError(err.message || "Failed to analyze notes.");
    } finally {
      setLoading(false);
    }
  };

  const loadHistoryNote = async (id) => {
    setLoading(true);
    setLoadingMessage("Loading saved notes...");
    try {
      const res = await fetch(`${API_BASE}/api/notes/${id}`);
      const data = await res.json();
      if (res.ok && data.note) {
        setActiveNote(data.note);
        setUserMcqAnswers({});
        setUserTfAnswers({});
        setQuizScore(null);
        setCardIndex(0);
        setIsFlipped(false);
        setActiveTab("summary");
      }
    } catch (err) {
      setError("Failed to load note: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteHistoryNote = async (id, e) => {
    e.stopPropagation();
    if (!window.confirm("Are you sure you want to delete this note?")) return;
    try {
      await fetch(`${API_BASE}/api/notes/${id}`, { method: "DELETE" });
      setHistoryList((prev) => prev.filter((item) => item.id !== id));
      if (activeNote && activeNote.id === id) {
        setActiveNote(null);
      }
      fetchStats();
    } catch (err) {
      console.error(err);
    }
  };

  // MCQ Selection handler
  const handleSelectMcq = (qIdx, optIdx) => {
    if (userMcqAnswers[qIdx] !== undefined) return;
    setUserMcqAnswers((prev) => ({ ...prev, [qIdx]: optIdx }));
  };

  // True/False selection handler
  const handleSelectTf = (qIdx, val) => {
    if (userTfAnswers[qIdx] !== undefined) return;
    setUserTfAnswers((prev) => ({ ...prev, [qIdx]: val }));
  };

  // Quiz submission & scoring
  const calculateScore = () => {
    if (!activeNote || !activeNote.quiz) return;
    let correct = 0;
    const mcqs = activeNote.quiz.mcqs || [];
    const tfs = activeNote.quiz.true_false || [];

    mcqs.forEach((q, idx) => {
      if (userMcqAnswers[idx] === q.answerIndex) correct++;
    });

    tfs.forEach((q, idx) => {
      if (userTfAnswers[idx] === q.answer) correct++;
    });

    const total = mcqs.length + tfs.length;
    setQuizScore({ correct, total, percentage: Math.round((correct / total) * 100) });

    if (correct / total >= 0.7) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  // Flashcard controls
  const nextCard = () => {
    if (!activeNote || !activeNote.flashcards) return;
    setIsFlipped(false);
    setCardIndex((prev) => (prev + 1) % activeNote.flashcards.length);
  };

  const prevCard = () => {
    if (!activeNote || !activeNote.flashcards) return;
    setIsFlipped(false);
    setCardIndex((prev) => (prev - 1 + activeNote.flashcards.length) % activeNote.flashcards.length);
  };

  const toggleMastered = (idx) => {
    setMasteredCards((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });
  };

  // Q&A Chat submission
  const handleSendMessage = async (e) => {
    e?.preventDefault();
    if (!chatInput.trim() || chatLoading) return;

    const question = chatInput.trim();
    setChatInput("");
    setChatMessages((prev) => [...prev, { sender: "user", text: question }]);
    setChatLoading(true);

    try {
      const res = await fetch(`${API_BASE}/api/ask`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: json_payload({
          question,
          note_id: activeNote?.id,
          context: activeNote?.raw_text || inputText,
          language,
          history: chatMessages
        })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Unable to get answer");

      setChatMessages((prev) => [...prev, { sender: "bot", text: data.answer }]);
    } catch (err) {
      setChatMessages((prev) => [
        ...prev,
        { sender: "bot", text: `⚠️ Error: ${err.message || "Could not retrieve answer."}` }
      ]);
    } finally {
      setChatLoading(false);
    }
  };

  function json_payload(obj) {
    return JSON.stringify(obj);
  }

  // Copy Summary
  const copySummary = () => {
    if (!activeNote?.summary?.executive_summary) return;
    navigator.clipboard.writeText(activeNote.summary.executive_summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Download Study Pack
  const downloadStudyPack = () => {
    if (!activeNote) return;
    const title = activeNote.title || "SmartNotes-StudyPack";
    let content = `========================================================\n`;
    content += `📚 ${title.toUpperCase()}\n`;
    content += `Date: ${activeNote.created_at} | Words: ${activeNote.word_count}\n`;
    content += `Generated with Smart AI Notes Analyzer\n`;
    content += `========================================================\n\n`;

    content += `1. EXECUTIVE SUMMARY\n`;
    content += `--------------------------------------------------------\n`;
    content += `${activeNote.summary?.executive_summary || "N/A"}\n\n`;

    if (activeNote.summary?.study_checklist?.length) {
      content += `Study Checklist:\n`;
      activeNote.summary.study_checklist.forEach((item, i) => {
        content += `[ ] ${i + 1}. ${item}\n`;
      });
      content += `\n`;
    }

    content += `2. KEY CONCEPTS & DEFINITIONS\n`;
    content += `--------------------------------------------------------\n`;
    activeNote.key_points?.concepts?.forEach((c, i) => {
      content += `• Concept ${i + 1}: ${c}\n`;
    });
    content += `\nDefinitions:\n`;
    activeNote.key_points?.definitions?.forEach((d) => {
      content += `• ${d.term}: ${d.definition}\n`;
    });
    content += `\nFormulas & Laws:\n`;
    activeNote.key_points?.formulas?.forEach((f) => {
      content += `• ${f.name} [ ${f.formula} ]: ${f.description}\n`;
    });
    content += `\nKeywords: ${(activeNote.key_points?.keywords || []).join(", ")}\n\n`;

    content += `3. QUIZ & SELF-ASSESSMENT\n`;
    content += `--------------------------------------------------------\n`;
    activeNote.quiz?.mcqs?.forEach((q, i) => {
      content += `Q${i + 1}: ${q.question}\n`;
      q.options.forEach((opt, oi) => {
        content += `   [${String.fromCharCode(65 + oi)}] ${opt}\n`;
      });
      content += `   Correct: [${String.fromCharCode(65 + q.answerIndex)}] ${q.options[q.answerIndex]}\n`;
      content += `   Explanation: ${q.explanation}\n\n`;
    });

    content += `4. FLASHCARDS (${activeNote.flashcards?.length || 0} Cards)\n`;
    content += `--------------------------------------------------------\n`;
    activeNote.flashcards?.forEach((fc, i) => {
      content += `Card ${i + 1} [${fc.category || "General"}]:\n`;
      content += `Front: ${fc.front}\n`;
      content += `Back:  ${fc.back}\n\n`;
    });

    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${title.replace(/[^a-zA-Z0-9_-]/g, "_")}_Study_Pack.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const navItems = [
    { id: "dashboard", label: language === "hi" ? "डैशबोर्ड" : "Dashboard", icon: LayoutDashboard },
    { id: "upload", label: language === "hi" ? "नोट्स अपलोड करें" : "Upload & Analyze", icon: UploadCloud },
    { id: "summary", label: language === "hi" ? "एआई सारांश" : "AI Summary", icon: FileText, disabled: !activeNote },
    { id: "keypoints", label: language === "hi" ? "प्रमुख बिंदु" : "Key Points", icon: Sparkles, disabled: !activeNote },
    { id: "quiz", label: language === "hi" ? "एआई क्विज" : "AI Quiz", icon: HelpCircle, disabled: !activeNote },
    { id: "flashcards", label: language === "hi" ? "फ्लैशकार्ड्स" : "Flashcards", icon: Layers, disabled: !activeNote },
    { id: "chat", label: language === "hi" ? "नोट्स से पूछें (Q&A)" : "Notes Q&A Chat", icon: MessageSquare, disabled: !activeNote },
    { id: "history", label: language === "hi" ? "सहेजे गए नोट्स" : "Saved Notes", icon: History }
  ];

  return (
    <div className="app-layout">
      {/* Sidebar Navigation */}
      <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <div className="logo-wrapper">
            <div className="logo-icon">
              <Brain size={24} color="#ffffff" />
            </div>
            <div className="logo-text">
              <h1>SmartNotes AI</h1>
              <span className="logo-tag">Pro AI Analyzer</span>
            </div>
          </div>
          <button
            className="mobile-menu-btn"
            style={{ color: "#ffffff", display: sidebarOpen ? "block" : "none" }}
            onClick={() => setSidebarOpen(false)}
          >
            <X size={20} />
          </button>
        </div>

        <nav className="sidebar-nav">
          <div className="nav-section-label">
            {language === "hi" ? "नेविगेशन" : "Navigation"}
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                className={`nav-item ${activeTab === item.id ? "active" : ""}`}
                disabled={item.disabled}
                style={{ opacity: item.disabled ? 0.45 : 1, cursor: item.disabled ? "not-allowed" : "pointer" }}
                onClick={() => {
                  if (!item.disabled) {
                    setActiveTab(item.id);
                    setSidebarOpen(false);
                  }
                }}
              >
                <Icon size={18} className="nav-icon" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="sidebar-footer">
          <div className="db-pill">
            <span className="status-dot"></span>
            <span>{stats.db_type || "MongoDB Online"}</span>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="main-wrapper">
        {/* Sticky Topbar */}
        <header className="topbar">
          <div className="topbar-left">
            <button className="mobile-menu-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>
              <Menu size={22} />
            </button>
            <h2 className="page-title">
              {navItems.find((n) => n.id === activeTab)?.label || "SmartNotes AI"}
            </h2>
            {activeNote && (
              <span className="current-note-chip" title={activeNote.title}>
                📖 {activeNote.title}
              </span>
            )}
          </div>

          <div className="topbar-right">
            {/* Language Switcher */}
            <div className="lang-switch">
              <button
                className={`lang-btn ${language === "en" ? "active" : ""}`}
                onClick={() => setLanguage("en")}
              >
                🇬🇧 English
              </button>
              <button
                className={`lang-btn ${language === "hi" ? "active" : ""}`}
                onClick={() => setLanguage("hi")}
              >
                🇮🇳 हिन्दी
              </button>
            </div>

            {activeNote && (
              <button className="btn btn-secondary btn-sm" onClick={downloadStudyPack} title="Download Complete Study Pack">
                <Download size={15} />
                <span>Export Pack</span>
              </button>
            )}
          </div>
        </header>

        {/* Dynamic Page Views */}
        <main className="page-container">
          {error && (
            <div className="card" style={{ borderLeft: "4px solid #ef4444", background: "#fef2f2", color: "#991b1b" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span>⚠️ {error}</span>
                <button onClick={() => setError(null)} style={{ background: "none", border: "none", cursor: "pointer" }}>
                  <X size={18} />
                </button>
              </div>
            </div>
          )}

          {/* TAB 1: DASHBOARD */}
          {activeTab === "dashboard" && (
            <div>
              {/* Stats Bar */}
              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-icon blue">
                    <BookOpen size={24} />
                  </div>
                  <div className="stat-content">
                    <h3>{stats.total_notes || 0}</h3>
                    <p>{language === "hi" ? "विश्लेषित नोट्स" : "Notes Analyzed"}</p>
                  </div>
                </div>

                <div className="stat-card">
                  <div className="stat-icon green">
                    <FileText size={24} />
                  </div>
                  <div className="stat-content">
                    <h3>{(stats.total_words || 0).toLocaleString()}</h3>
                    <p>{language === "hi" ? "शब्द प्रसंस्कृत" : "Words Processed"}</p>
                  </div>
                </div>

                <div className="stat-card">
                  <div className="stat-icon purple">
                    <Award size={24} />
                  </div>
                  <div className="stat-content">
                    <h3>{stats.quizzes_generated || 0}</h3>
                    <p>{language === "hi" ? "निर्मित क्विज़ प्रश्न" : "Quiz Questions"}</p>
                  </div>
                </div>

                <div className="stat-card">
                  <div className="stat-icon amber">
                    <Layers size={24} />
                  </div>
                  <div className="stat-content">
                    <h3>{stats.flashcards_generated || 0}</h3>
                    <p>{language === "hi" ? "फ्लैशकार्ड्स" : "Revision Flashcards"}</p>
                  </div>
                </div>
              </div>

              {/* Quick Actions & Welcome */}
              <div className="card" style={{ background: "linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%)", color: "#ffffff" }}>
                <h2 style={{ fontSize: "1.5rem", marginBottom: "8px" }}>
                  {language === "hi" ? "स्मार्ट एआई नोट्स विश्लेषक में आपका स्वागत है" : "Welcome to Smart AI Notes Analyzer"}
                </h2>
                <p style={{ opacity: 0.9, maxWidth: "700px", marginBottom: "20px", fontSize: "0.95rem" }}>
                  {language === "hi"
                    ? "अपने व्याख्यान नोट्स, पीडीएफ या वर्ड दस्तावेज़ अपलोड करें और तुरंत स्पष्ट सारांश, प्रमुख अवधारणाएं, इंटरएक्टिव क्विज और 3D फ्लैशकार्ड प्राप्त करें।"
                    : "Transform lengthy lecture slides, PDF textbooks, and messy notes into high-retention summaries, key definitions, interactive MCQs, and 3D flashcards in seconds."}
                </p>
                <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                  <button className="btn btn-secondary" onClick={() => setActiveTab("upload")}>
                    <UploadCloud size={16} />
                    <span>{language === "hi" ? "नए नोट्स अपलोड करें" : "Upload New Notes"}</span>
                  </button>
                  {activeNote && (
                    <button className="btn btn-primary" onClick={() => setActiveTab("summary")}>
                      <FileText size={16} />
                      <span>{language === "hi" ? "वर्तमान सारांश देखें" : "View Current Summary"}</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Recent Analyzed Notes */}
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">
                    <History size={20} color="#2563eb" />
                    <span>{language === "hi" ? "हाल के विश्लेषित नोट्स" : "Recent Analyzed Notes"}</span>
                  </h3>
                  <button className="btn btn-secondary btn-sm" onClick={fetchHistory}>
                    <RefreshCw size={14} />
                    <span>{language === "hi" ? "ताज़ा करें" : "Refresh"}</span>
                  </button>
                </div>

                {historyList.length === 0 ? (
                  <p style={{ color: "#64748b", padding: "20px 0" }}>
                    {language === "hi"
                      ? "अभी तक कोई नोट्स विश्लेषित नहीं किए गए हैं। 'Upload & Analyze' टैब से शुरुआत करें!"
                      : "No notes analyzed yet. Click 'Upload & Analyze' to get started!"}
                  </p>
                ) : (
                  <div className="history-grid">
                    {historyList.slice(0, 6).map((item) => (
                      <div key={item.id} className="history-card" onClick={() => loadHistoryNote(item.id)} style={{ cursor: "pointer" }}>
                        <div>
                          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                            <span style={{ fontSize: "0.75rem", background: "#eff6ff", color: "#1d4ed8", padding: "2px 8px", borderRadius: "10px", fontWeight: "600" }}>
                              {item.source_type}
                            </span>
                            <span style={{ fontSize: "0.75rem", color: "#94a3b8" }}>{item.created_at}</span>
                          </div>
                          <h4 style={{ fontSize: "1.05rem", fontWeight: "700", marginBottom: "8px", color: "#0f172a" }}>
                            {item.title}
                          </h4>
                          <p style={{ fontSize: "0.85rem", color: "#64748b", marginBottom: "14px", overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>
                            {item.summary?.executive_summary || "Study summary and key points..."}
                          </p>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid #f1f5f9", paddingTop: "10px" }}>
                          <span style={{ fontSize: "0.8rem", color: "#475569" }}>
                            {item.word_count} {language === "hi" ? "शब्द" : "words"}
                          </span>
                          <button
                            className="btn btn-secondary btn-sm"
                            onClick={(e) => deleteHistoryNote(item.id, e)}
                            style={{ color: "#ef4444" }}
                            title="Delete"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: UPLOAD & ANALYZE */}
          {activeTab === "upload" && (
            <div>
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">
                    <UploadCloud size={20} color="#2563eb" />
                    <span>{language === "hi" ? "अध्ययन सामग्री अपलोड करें या चिपकाएं" : "Upload or Paste Study Material"}</span>
                  </h3>
                  <span style={{ fontSize: "0.85rem", color: "#64748b" }}>
                    Supports <strong>PDF, DOCX, TXT</strong> (up to 20MB)
                  </span>
                </div>

                <div className="upload-grid">
                  {/* File Dropzone */}
                  <div>
                    <label style={{ display: "block", fontWeight: "600", marginBottom: "8px", color: "#334155" }}>
                      1. {language === "hi" ? "फ़ाइल चुनें (PDF, Word, Text)" : "Select File (PDF, DOCX, TXT)"}
                    </label>
                    <div
                      className="dropzone"
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={handleDrop}
                      onClick={() => document.getElementById("fileInput").click()}
                    >
                      <div className="dropzone-icon">
                        <UploadCloud size={28} />
                      </div>
                      <p style={{ fontWeight: "600", color: "#1e3a8a", marginBottom: "4px" }}>
                        {language === "hi" ? "फ़ाइल को यहाँ खींचें या ब्राउज़ करें" : "Drag and drop your file here"}
                      </p>
                      <span style={{ fontSize: "0.82rem", color: "#64748b" }}>
                        Click to browse documents from your device
                      </span>
                      <input
                        id="fileInput"
                        type="file"
                        accept=".pdf,.docx,.doc,.txt"
                        style={{ display: "none" }}
                        onChange={handleFileChange}
                      />
                    </div>

                    {selectedFile && (
                      <div className="file-pill">
                        <FileText size={18} color="#2563eb" />
                        <span style={{ flex: 1, overflow: "hidden", textOverflow: "ellipsis" }}>
                          {selectedFile.name} ({(selectedFile.size / 1024).toFixed(1)} KB)
                        </span>
                        <button
                          onClick={() => setSelectedFile(null)}
                          style={{ background: "none", border: "none", cursor: "pointer", color: "#ef4444" }}
                        >
                          <X size={16} />
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Textarea Editor */}
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                      <label style={{ fontWeight: "600", color: "#334155" }}>
                        2. {language === "hi" ? "या सीधे नोट्स यहाँ पेस्ट करें" : "Or Paste Your Notes Directly"}
                      </label>
                      <span style={{ fontSize: "0.8rem", color: "#94a3b8" }}>
                        {inputText.split(/\s+/).filter(Boolean).length} {language === "hi" ? "शब्द" : "words"}
                      </span>
                    </div>
                    <textarea
                      className="notes-textarea"
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      placeholder={
                        language === "hi"
                          ? "यहाँ अपने व्याख्यान नोट्स, सूत्र या पाठ पेस्ट करें..."
                          : "Paste your lecture notes, concepts, definitions or textbook excerpts here..."
                      }
                    />
                  </div>
                </div>

                {/* Sample Notes Bar */}
                <div className="sample-bar">
                  <span style={{ fontSize: "0.85rem", fontWeight: "600", color: "#475569" }}>
                    ⚡ {language === "hi" ? "त्वरित परीक्षण नमूने:" : "Quick Test Samples:"}
                  </span>
                  <button className="sample-btn" onClick={() => loadSample("physics")}>
                    🚀 Physics: Laws of Motion
                  </button>
                  <button className="sample-btn" onClick={() => loadSample("biology")}>
                    🌿 Biology: Cellular Respiration
                  </button>
                  <button className="sample-btn" onClick={() => loadSample("ai")}>
                    🤖 Computer Science: Artificial Intelligence
                  </button>
                </div>

                {/* Submit Button */}
                <div style={{ marginTop: "24px", display: "flex", justifyContent: "flex-end", gap: "12px" }}>
                  <button
                    className="btn btn-primary"
                    style={{ padding: "12px 28px", fontSize: "1rem" }}
                    onClick={analyzeNotes}
                    disabled={loading || (!inputText.trim() && !selectedFile)}
                  >
                    {loading ? (
                      <>
                        <RefreshCw size={18} className="spinner" style={{ width: "18px", height: "18px", margin: 0 }} />
                        <span>{loadingMessage}</span>
                      </>
                    ) : (
                      <>
                        <Sparkles size={18} />
                        <span>{language === "hi" ? "✨ एआई विश्लेषण शुरू करें" : "✨ Generate AI Analysis"}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: AI SUMMARY */}
          {activeTab === "summary" && activeNote && (
            <div>
              <div className="card">
                <div className="card-header">
                  <div>
                    <h3 className="card-title">
                      <FileText size={20} color="#2563eb" />
                      <span>{activeNote.title}</span>
                    </h3>
                    <p style={{ fontSize: "0.85rem", color: "#64748b", marginTop: "4px" }}>
                      Source: {activeNote.source_type} | {activeNote.word_count} words | Created: {activeNote.created_at}
                    </p>
                  </div>
                  <div style={{ display: "flex", gap: "10px" }}>
                    <button className="btn btn-secondary btn-sm" onClick={copySummary}>
                      {copied ? <Check size={14} color="#10b981" /> : <Copy size={14} />}
                      <span>{copied ? "Copied!" : "Copy Summary"}</span>
                    </button>
                    <button className="btn btn-secondary btn-sm" onClick={() => window.print()}>
                      <Printer size={14} />
                      <span>Print / PDF</span>
                    </button>
                  </div>
                </div>

                {/* Executive Summary Body */}
                <div style={{ background: "#f8fafc", padding: "24px", borderRadius: "12px", border: "1px solid #e2e8f0", lineHeight: "1.8", fontSize: "1.05rem", color: "#1e293b", whiteSpace: "pre-line" }}>
                  {activeNote.summary?.executive_summary}
                </div>

                {/* Study Checklist */}
                {activeNote.summary?.study_checklist?.length > 0 && (
                  <div style={{ marginTop: "24px" }}>
                    <h4 style={{ fontSize: "1rem", fontWeight: "700", color: "#0f172a", marginBottom: "12px", display: "flex", alignItems: "center", gap: "8px" }}>
                      <CheckCircle size={18} color="#10b981" />
                      <span>{language === "hi" ? "अध्ययन चेकलिस्ट और मुख्य प्रश्न" : "Study Checklist & Self-Review"}</span>
                    </h4>
                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                      {activeNote.summary.study_checklist.map((item, idx) => (
                        <div key={idx} style={{ display: "flex", alignItems: "center", gap: "12px", padding: "10px 14px", background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "8px" }}>
                          <input type="checkbox" id={`chk-${idx}`} style={{ width: "18px", height: "18px", cursor: "pointer" }} />
                          <label htmlFor={`chk-${idx}`} style={{ fontSize: "0.95rem", color: "#334155", cursor: "pointer" }}>
                            {item}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 4: KEY POINTS & CONCEPTS */}
          {activeTab === "keypoints" && activeNote && (
            <div>
              {/* Concepts */}
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">
                    <Sparkles size={20} color="#2563eb" />
                    <span>{language === "hi" ? "मुख्य अवधारणाएं और सिद्धांत" : "Core Concepts & Foundational Principles"}</span>
                  </h3>
                </div>
                <div>
                  {activeNote.key_points?.concepts?.map((concept, idx) => (
                    <div key={idx} className="concept-item">
                      <span style={{ fontWeight: "700", color: "#2563eb" }}>#{idx + 1}</span>
                      <p style={{ fontSize: "0.95rem", color: "#1e293b" }}>{concept}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Definitions Glossary */}
              {activeNote.key_points?.definitions?.length > 0 && (
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">
                      <BookOpen size={20} color="#2563eb" />
                      <span>{language === "hi" ? "महत्वपूर्ण शब्दावली और परिभाषाएँ" : "Key Definitions & Terminology"}</span>
                    </h3>
                  </div>
                  <div>
                    {activeNote.key_points.definitions.map((def, idx) => (
                      <div key={idx} className="definition-card">
                        <div className="definition-term">📖 {def.term}</div>
                        <p style={{ fontSize: "0.95rem", color: "#334155" }}>{def.definition}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Formulas & Scientific Laws */}
              {activeNote.key_points?.formulas?.length > 0 && (
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">
                      <Zap size={20} color="#2563eb" />
                      <span>{language === "hi" ? "सूत्र और वैज्ञानिक नियम" : "Formulas, Equations & Laws"}</span>
                    </h3>
                  </div>
                  <div>
                    {activeNote.key_points.formulas.map((item, idx) => (
                      <div key={idx} className="formula-card">
                        <h4 style={{ fontWeight: "700", color: "#1e3a8a", fontSize: "1rem" }}>{item.name}</h4>
                        <div className="formula-badge">{item.formula}</div>
                        <p style={{ fontSize: "0.9rem", color: "#475569" }}>{item.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Keywords */}
              {activeNote.key_points?.keywords?.length > 0 && (
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">
                      <span>🏷️ {language === "hi" ? "मुख्य कीवर्ड्स और टैग" : "Keywords & Index Tags"}</span>
                    </h3>
                  </div>
                  <div className="keyword-chips">
                    {activeNote.key_points.keywords.map((kw, idx) => (
                      <span key={idx} className="keyword-chip">
                        #{kw}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 5: INTERACTIVE AI QUIZ */}
          {activeTab === "quiz" && activeNote && (
            <div>
              <div className="card" style={{ background: "#ffffff" }}>
                <div className="card-header">
                  <div>
                    <h3 className="card-title">
                      <HelpCircle size={20} color="#2563eb" />
                      <span>{language === "hi" ? "इंटरएक्टिव एआई क्विज" : "Interactive AI Quiz Simulator"}</span>
                    </h3>
                    <p style={{ fontSize: "0.85rem", color: "#64748b" }}>
                      {language === "hi"
                        ? "विकल्प चुनें और तुरंत सही या गलत उत्तर का परिणाम देखें!"
                        : "Test your retention. Select answers for immediate scoring and detailed explanations!"}
                    </p>
                  </div>

                  {quizScore && (
                    <div style={{ textAlign: "right" }}>
                      <span style={{ fontSize: "1.4rem", fontWeight: "800", color: quizScore.percentage >= 70 ? "#10b981" : "#f59e0b" }}>
                        {quizScore.correct} / {quizScore.total} ({quizScore.percentage}%)
                      </span>
                      <p style={{ fontSize: "0.8rem", color: "#64748b" }}>
                        {quizScore.percentage >= 70 ? "🎉 Outstanding Retention!" : "Keep practicing!"}
                      </p>
                    </div>
                  )}
                </div>

                {/* Section A: Multiple Choice Questions */}
                <div style={{ marginBottom: "32px" }}>
                  <h4 style={{ fontSize: "1.1rem", fontWeight: "700", color: "#1e3a8a", marginBottom: "16px" }}>
                    Part 1: Multiple Choice Questions (MCQs)
                  </h4>
                  {activeNote.quiz?.mcqs?.map((mcq, qIdx) => {
                    const selected = userMcqAnswers[qIdx];
                    const isAnswered = selected !== undefined;
                    return (
                      <div key={qIdx} className="quiz-card">
                        <div className="quiz-header">
                          <span className="quiz-num">Question {qIdx + 1} of {activeNote.quiz.mcqs.length}</span>
                        </div>
                        <h4 style={{ fontSize: "1.05rem", fontWeight: "600", color: "#0f172a" }}>
                          {mcq.question}
                        </h4>

                        <div className="quiz-options">
                          {mcq.options.map((option, optIdx) => {
                            let statusClass = "";
                            if (isAnswered) {
                              if (optIdx === mcq.answerIndex) statusClass = "correct";
                              else if (selected === optIdx) statusClass = "incorrect";
                            }
                            return (
                              <button
                                key={optIdx}
                                className={`quiz-option ${statusClass} ${isAnswered ? "disabled" : ""}`}
                                onClick={() => handleSelectMcq(qIdx, optIdx)}
                              >
                                <span style={{ width: "26px", height: "26px", borderRadius: "50%", background: "#f1f5f9", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.85rem", fontWeight: "700" }}>
                                  {String.fromCharCode(65 + optIdx)}
                                </span>
                                <span>{option}</span>
                              </button>
                            );
                          })}
                        </div>

                        {isAnswered && (
                          <div className="quiz-explanation">
                            <strong>💡 Explanation: </strong>
                            {mcq.explanation}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Section B: True / False Questions */}
                {activeNote.quiz?.true_false?.length > 0 && (
                  <div style={{ marginBottom: "32px" }}>
                    <h4 style={{ fontSize: "1.1rem", fontWeight: "700", color: "#1e3a8a", marginBottom: "16px" }}>
                      Part 2: True or False
                    </h4>
                    {activeNote.quiz.true_false.map((tf, qIdx) => {
                      const selected = userTfAnswers[qIdx];
                      const isAnswered = selected !== undefined;
                      return (
                        <div key={qIdx} className="quiz-card">
                          <p style={{ fontSize: "1rem", fontWeight: "600", color: "#0f172a", marginBottom: "14px" }}>
                            {qIdx + 1}. {tf.statement}
                          </p>
                          <div style={{ display: "flex", gap: "14px" }}>
                            {[true, false].map((val) => {
                              let statusClass = "";
                              if (isAnswered) {
                                if (val === tf.answer) statusClass = "correct";
                                else if (selected === val) statusClass = "incorrect";
                              }
                              return (
                                <button
                                  key={String(val)}
                                  className={`btn ${statusClass}`}
                                  style={{
                                    border: "1.5px solid #cbd5e1",
                                    padding: "8px 24px",
                                    background: statusClass ? undefined : "#ffffff",
                                    color: statusClass ? undefined : "#0f172a"
                                  }}
                                  onClick={() => handleSelectTf(qIdx, val)}
                                >
                                  {val ? "✓ True" : "✗ False"}
                                </button>
                              );
                            })}
                          </div>
                          {isAnswered && (
                            <div className="quiz-explanation">
                              <strong>💡 Explanation: </strong>
                              {tf.explanation}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Score Submission and Reset */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid #e2e8f0", paddingTop: "20px" }}>
                  <button
                    className="btn btn-secondary"
                    onClick={() => {
                      setUserMcqAnswers({});
                      setUserTfAnswers({});
                      setQuizScore(null);
                    }}
                  >
                    <RefreshCw size={15} />
                    <span>Reset Answers</span>
                  </button>

                  <button className="btn btn-primary" onClick={calculateScore}>
                    <Award size={16} />
                    <span>Calculate Final Score</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: 3D FLASHCARDS */}
          {activeTab === "flashcards" && activeNote && (
            <div>
              <div className="card">
                <div className="card-header">
                  <div>
                    <h3 className="card-title">
                      <Layers size={20} color="#2563eb" />
                      <span>{language === "hi" ? "रिवीजन फ्लैशकार्ड्स (3D फ्लिप)" : "Active Recall Flashcards (3D Flip)"}</span>
                    </h3>
                    <p style={{ fontSize: "0.85rem", color: "#64748b" }}>
                      {language === "hi"
                        ? "उत्तर देखने के लिए कार्ड पर क्लिक करें। अगले या पिछले कार्ड पर जाने के लिए तीर का उपयोग करें।"
                        : "Click anywhere on the card to flip between Question and Answer. Use arrows to navigate."}
                    </p>
                  </div>
                  <span style={{ fontSize: "0.85rem", background: "#ecfdf5", color: "#065f46", padding: "4px 12px", borderRadius: "12px", fontWeight: "600" }}>
                    ⭐ {masteredCards.size} / {activeNote.flashcards?.length || 0} Mastered
                  </span>
                </div>

                {activeNote.flashcards && activeNote.flashcards.length > 0 ? (
                  <div className="flashcard-wrapper">
                    {/* 3D Card */}
                    <div
                      className={`flashcard ${isFlipped ? "flipped" : ""}`}
                      onClick={() => setIsFlipped(!isFlipped)}
                    >
                      {/* Front */}
                      <div className="flashcard-face flashcard-front">
                        <div className="flashcard-top">
                          <span className="card-category">
                            {activeNote.flashcards[cardIndex]?.category || "Concept"}
                          </span>
                          <span style={{ fontSize: "0.85rem", color: "#94a3b8" }}>
                            {cardIndex + 1} / {activeNote.flashcards.length}
                          </span>
                        </div>
                        <div className="card-body-text" style={{ color: "#0f172a" }}>
                          {activeNote.flashcards[cardIndex]?.front}
                        </div>
                        <div className="flashcard-hint">
                          🔄 Click to reveal answer
                        </div>
                      </div>

                      {/* Back */}
                      <div className="flashcard-face flashcard-back">
                        <div className="flashcard-top">
                          <span className="card-category">
                            Answer & Definition
                          </span>
                          <span style={{ fontSize: "0.85rem", opacity: 0.8 }}>
                            {cardIndex + 1} / {activeNote.flashcards.length}
                          </span>
                        </div>
                        <div className="card-body-text">
                          {activeNote.flashcards[cardIndex]?.back}
                        </div>
                        <div className="flashcard-hint">
                          🔄 Click to flip back
                        </div>
                      </div>
                    </div>

                    {/* Navigation Controls */}
                    <div className="flashcard-controls">
                      <button className="btn btn-secondary" onClick={prevCard} title="Previous Card">
                        <ChevronLeft size={18} />
                        <span>Previous</span>
                      </button>

                      <button
                        className={`btn ${masteredCards.has(cardIndex) ? "btn-success" : "btn-secondary"}`}
                        onClick={() => toggleMastered(cardIndex)}
                      >
                        <CheckCircle size={16} />
                        <span>{masteredCards.has(cardIndex) ? "Mastered" : "Mark Mastered"}</span>
                      </button>

                      <button className="btn btn-primary" onClick={nextCard} title="Next Card">
                        <span>Next</span>
                        <ChevronRight size={18} />
                      </button>
                    </div>
                  </div>
                ) : (
                  <p>No flashcards generated for this note.</p>
                )}
              </div>
            </div>
          )}

          {/* TAB 7: NOTES Q&A CHAT */}
          {activeTab === "chat" && activeNote && (
            <div>
              <div className="card">
                <div className="card-header">
                  <div>
                    <h3 className="card-title">
                      <MessageSquare size={20} color="#2563eb" />
                      <span>{language === "hi" ? "नोट्स से पूछें (एआई ट्यूटर)" : "Ask Your Notes (AI Tutor)"}</span>
                    </h3>
                    <p style={{ fontSize: "0.85rem", color: "#64748b" }}>
                      {language === "hi"
                        ? "यह एआई सीधे आपकी अपलोड की गई अध्ययन सामग्री के आधार पर प्रश्नों का सटीक उत्तर देता है।"
                        : "Answers are grounded strictly in your uploaded notes. Ask conceptual questions, explanations, or formula derivations."}
                    </p>
                  </div>
                </div>

                <div className="chat-window">
                  <div className="chat-messages">
                    {chatMessages.map((msg, i) => (
                      <div key={i} className={`chat-bubble ${msg.sender}`}>
                        <div style={{ fontSize: "0.75rem", opacity: 0.7, marginBottom: "4px" }}>
                          {msg.sender === "user" ? "You" : "SmartNotes Tutor"}
                        </div>
                        <div style={{ whiteSpace: "pre-wrap" }}>{msg.text}</div>
                      </div>
                    ))}
                    {chatLoading && (
                      <div className="chat-bubble bot" style={{ fontStyle: "italic", color: "#64748b" }}>
                        Thinking and searching notes...
                      </div>
                    )}
                    <div ref={chatBottomRef} />
                  </div>

                  <form className="chat-input-bar" onSubmit={handleSendMessage}>
                    <input
                      type="text"
                      className="chat-input"
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      placeholder={
                        language === "hi"
                          ? "अपने नोट्स से संबंधित कोई भी सवाल पूछें..."
                          : "Ask anything about your uploaded notes..."
                      }
                      disabled={chatLoading}
                    />
                    <button type="submit" className="btn btn-primary" disabled={chatLoading || !chatInput.trim()}>
                      <span>Send</span>
                      <ArrowRight size={16} />
                    </button>
                  </form>
                </div>
              </div>
            </div>
          )}

          {/* TAB 8: SAVED NOTES HISTORY */}
          {activeTab === "history" && (
            <div>
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">
                    <History size={20} color="#2563eb" />
                    <span>{language === "hi" ? "सहेजी गई नोट्स लाइब्रेरी" : "Saved Notes Library"}</span>
                  </h3>
                  <button className="btn btn-secondary btn-sm" onClick={fetchHistory}>
                    <RefreshCw size={14} />
                    <span>{language === "hi" ? "ताज़ा करें" : "Refresh"}</span>
                  </button>
                </div>

                {historyList.length === 0 ? (
                  <p style={{ color: "#64748b", padding: "20px 0" }}>
                    No saved notes found. Analyze some notes to see them stored here!
                  </p>
                ) : (
                  <div className="history-grid">
                    {historyList.map((item) => (
                      <div key={item.id} className="history-card">
                        <div>
                          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                            <span style={{ fontSize: "0.75rem", background: "#eff6ff", color: "#1d4ed8", padding: "2px 8px", borderRadius: "10px", fontWeight: "600" }}>
                              {item.source_type}
                            </span>
                            <span style={{ fontSize: "0.75rem", color: "#94a3b8" }}>{item.created_at}</span>
                          </div>
                          <h4 style={{ fontSize: "1.1rem", fontWeight: "700", marginBottom: "8px", color: "#0f172a" }}>
                            {item.title}
                          </h4>
                          <p style={{ fontSize: "0.85rem", color: "#64748b", marginBottom: "16px", overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical" }}>
                            {item.summary?.executive_summary || "Full academic study breakdown and questions..."}
                          </p>
                        </div>

                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid #f1f5f9", paddingTop: "12px" }}>
                          <button className="btn btn-primary btn-sm" onClick={() => loadHistoryNote(item.id)}>
                            <span>View Study Pack</span>
                            <ChevronRight size={14} />
                          </button>
                          <button
                            className="btn btn-secondary btn-sm"
                            onClick={(e) => deleteHistoryNote(item.id, e)}
                            style={{ color: "#ef4444" }}
                            title="Delete note"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
