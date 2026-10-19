import React, { useState } from 'react';
import { translations } from '../data/translations';
import { speakText, stopSpeaking } from '../services/speechService';
import { MessageSquareText, Send, Sparkles, Volume2, Bot, User, HelpCircle } from 'lucide-react';

const INITIAL_MESSAGES = {
  hi: [
    {
      sender: "bot",
      text: "राम-राम किसान भाई! 🙏 मैं आपका कृषि AI सलाहकार किसान मित्र हूँ। आप मुझसे धान/गेहूं के रोग, लीफ ब्लाइट की दवा, मौसम के अनुसार छिड़काव या आज के मंडी भाव के बारे में कुछ भी पूछ सकते हैं।"
    }
  ],
  en: [
    {
      sender: "bot",
      text: "Namaste Farmer! 🙏 I am your KisanMitra AI advisor. Ask me anything about crop diseases like Leaf Blight, fungicide dosages, optimal spray weather windows, or today's Mandi market rates."
    }
  ]
};

const SUGGESTED_QUESTIONS = [
  {
    hi: "धान में पत्ती झुलसा (Leaf Blight) की सबसे अच्छी दवा कौन सी है?",
    en: "What is the best fungicide medicine for Leaf Blight in paddy?"
  },
  {
    hi: "आज गेहूं बेचना चाहिए या 4 दिन रुकना फायदेमंद रहेगा?",
    en: "Should I sell my wheat today or hold for 4 days?"
  },
  {
    hi: "दवा छिड़कने के लिए आज मौसम कैसा है?",
    en: "Is the weather suitable for spraying pesticides today?"
  },
  {
    hi: "जैविक कीटनाशक (नीम तेल व गौमूत्र) का सही अनुपात क्या है?",
    en: "What is the exact ratio for organic neem oil & cow urine spray?"
  }
];

export default function KisanBot({ lang, setActiveTab }) {
  const t = translations[lang];

  const [messages, setMessages] = useState(INITIAL_MESSAGES[lang]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = (textToSend = null) => {
    const query = textToSend || inputText;
    if (!query.trim()) return;

    const userMsg = { sender: "user", text: query };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInputText("");
    setIsTyping(true);

    setTimeout(() => {
      const botResponse = generateAgriAnswer(query, lang);
      setMessages([...updatedMessages, { sender: "bot", text: botResponse }]);
      setIsTyping(false);
    }, 800);
  };

  const generateAgriAnswer = (query, currentLang) => {
    const q = query.toLowerCase();

    if (q.includes("blight") || q.includes("झुलसा") || q.includes("पत्ती") || q.includes("dawa") || q.includes("दवा")) {
      return currentLang === 'hi'
        ? "लीफ ब्लाइट (पत्ती झुलसा) के नियंत्रण के लिए प्रोपीकोनाज़ोल 25% EC (टिल्ट) की 25-30 मिली मात्रा प्रति 15 लीटर पानी की टंकी में मिलाकर छिड़कें। यदि जैविक उपाय चाहते हैं, तो 45 मिली नीम तेल (1500 PPM) + आधा लीटर गौमूत्र का छिड़काव करें। साथ ही यूरिया तुरंत बंद कर दें।"
        : "For Leaf Blight control, spray Propiconazole 25% EC (Brand: Tilt) at 25-30 ml per 15-liter spray tank. For organic treatment, mix 45 ml Neem oil (1500 PPM) with 500 ml fermented cow urine. Temporarily halt excess nitrogen/urea.";
    }

    if (q.includes("rate") || q.includes("मंडी") || q.includes("भाव") || q.includes("बेच") || q.includes("price") || q.includes("sell")) {
      return currentLang === 'hi'
        ? "आज बासमती धान ₹3,850 और शरबती गेहूं ₹2,480 प्रति क्विंटल पर मजबूत है। खन्ना और करनाल मंडियों में स्थानीय मंडी से ₹120-₹210 अधिक भाव मिल रहा है। यदि आपके पास भंडारण है तो 3-4 दिन होल्ड करना फायदेमंद हो सकता है।"
        : "Today Basmati Paddy trades at ₹3,850/qtl and Sharbati Wheat at ₹2,480/qtl. Major APMCs like Karnal & Khanna offer a ₹120-₹210 premium. Holding stock for 3-4 days is recommended.";
    }

    if (q.includes("weather") || q.includes("मौसम") || q.includes("छिड़काव") || q.includes("spray") || q.includes("barish") || q.includes("बारिश")) {
      return currentLang === 'hi'
        ? "मौसम रिपोर्ट के अनुसार आज बारिश की संभावना 10% से कम है और हवा की गति 8 किमी/घंटा है। दवा छिड़काव के लिए सुबह 6:30 से 9:30 बजे और शाम 4:30 से 6:30 बजे का समय सबसे सुरक्षित और प्रभावी है।"
        : "Current weather shows low rain probability (<10%) and calm wind at 8 km/h. Optimal spray windows are 6:30 AM - 9:30 AM and 4:30 PM - 6:30 PM.";
    }

    if (q.includes("neem") || q.includes("नीम") || q.includes("जैविक") || q.includes("organic")) {
      return currentLang === 'hi'
        ? "जैविक कीटनाशक घोल: 15 लीटर पानी में 45 मिली नीम का तेल (1500 PPM), 500 मिली गौमूत्र और 10 मिली तरल साबुन (सर्फ या शैम्पू) अच्छी तरह मिलाएं। यह रस चूसक कीटों और फंगस दोनों पर रामबाण है।"
        : "Organic Bio-Spray Recipe: In a 15-liter spray tank, mix 45 ml Neem Oil (1500 PPM), 500 ml fermented cow urine, and 10 ml mild liquid soap as spreader. Effective against aphids, whitefly, and early fungal mycelium.";
    }

    return currentLang === 'hi'
      ? "कृषि वैज्ञानिक सलाह: अपनी फसल का नियमित निरीक्षण करें। किसी भी रोग की पुष्टि के लिए आप ऊपर 'रोग जांच (AI कैमरा)' टैब से पत्ते की फोटो खींचकर तुरंत सटीक दवा व मात्रा जान सकते हैं।"
      : "Agronomy Advice: Regularly scout your field. For instant visual diagnosis of any leaf spot or pest, use the 'Leaf Disease Doctor' tab to scan your crop leaf.";
  };

  const handleSpeak = (text) => {
    speakText(text, lang);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-200">
        <div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-800 flex items-center gap-2">
            <Bot className="w-6 h-6 text-emerald-600" />
            <span>{t.chatTitle}</span>
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
            {t.chatSubtitle}
          </p>
        </div>
      </div>

      {/* Suggested Quick Questions */}
      <div className="space-y-2">
        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
          <HelpCircle className="w-3.5 h-3.5 text-emerald-600" />
          <span>{lang === 'hi' ? 'तुरंत पूछने के लिए टैप करें:' : 'Tap to ask instantly:'}</span>
        </span>

        <div className="flex flex-wrap gap-2">
          {SUGGESTED_QUESTIONS.map((item, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(lang === 'hi' ? item.hi : item.en)}
              className="text-xs bg-white hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 border border-slate-200 hover:border-emerald-300 px-3 py-1.5 rounded-full shadow-2xs transition-all cursor-pointer font-medium"
            >
              {lang === 'hi' ? item.hi : item.en}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Window */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs flex flex-col h-[460px] overflow-hidden">
        {/* Messages List */}
        <div className="flex-1 p-4 sm:p-5 overflow-y-auto space-y-4">
          {messages.map((msg, index) => {
            const isBot = msg.sender === 'bot';
            return (
              <div
                key={index}
                className={`flex gap-3 ${isBot ? 'items-start' : 'items-start flex-row-reverse'}`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                  isBot ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-white'
                }`}>
                  {isBot ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                </div>

                <div className={`max-w-[82%] sm:max-w-[70%] p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                  isBot
                    ? 'bg-emerald-50/80 text-slate-800 border border-emerald-100 rounded-tl-xs'
                    : 'bg-emerald-600 text-white font-medium rounded-tr-xs'
                }`}>
                  <p>{msg.text}</p>

                  {isBot && (
                    <div className="mt-2 pt-1 border-t border-emerald-200/60 flex items-center justify-end">
                      <button
                        onClick={() => handleSpeak(msg.text)}
                        className="text-[11px] font-bold text-emerald-800 hover:text-emerald-950 flex items-center gap-1 cursor-pointer"
                        title={t.listenAudio}
                      >
                        <Volume2 className="w-3.5 h-3.5 text-emerald-700" />
                        <span>{t.listenAudio}</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {isTyping && (
            <div className="flex items-center gap-2 text-slate-400 text-xs italic">
              <Bot className="w-4 h-4 text-emerald-600 animate-bounce" />
              <span>{lang === 'hi' ? 'किसान मित्र उत्तर तैयार कर रहा है...' : 'KisanMitra is thinking...'}</span>
            </div>
          )}
        </div>

        {/* Input Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="p-3 bg-slate-50 border-t border-slate-200 flex items-center gap-2"
        >
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={t.chatPlaceholder}
            className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 shadow-2xs"
          />
          <button
            type="submit"
            disabled={!inputText.trim()}
            className="bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-white font-bold p-2.5 rounded-xl shadow-xs transition-colors cursor-pointer"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
