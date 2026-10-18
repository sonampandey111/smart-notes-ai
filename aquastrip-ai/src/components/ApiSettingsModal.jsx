import React, { useState } from 'react';
import { X, Key, Bot, Sparkles, Check, AlertCircle, Shield, ExternalLink } from 'lucide-react';
import { getGeminiApiKey, setGeminiApiKey } from '../services/geminiService';

export default function ApiSettingsModal({ isOpen, onClose, lang, onSaveSuccess }) {
  if (!isOpen) return null;

  const currentKey = getGeminiApiKey();
  const [apiKey, setApiKey] = useState(currentKey);
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    setGeminiApiKey(apiKey);
    setIsSaved(true);
    if (onSaveSuccess) onSaveSuccess();
    setTimeout(() => {
      setIsSaved(false);
      onClose();
    }, 900);
  };

  const handleClear = () => {
    setApiKey('');
    setGeminiApiKey('');
    if (onSaveSuccess) onSaveSuccess();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg rounded-2xl glass-panel-elevated border border-slate-700 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-slate-800 bg-slate-900/80">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-lg bg-gradient-to-tr from-cyan-500 to-purple-600 text-white shadow-md">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                {lang === 'hi' ? 'Google Gemini AI API सेटिंग्स' : 'Gemini AI Vision API Settings'}
              </h3>
              <p className="text-xs text-slate-400">
                {lang === 'hi'
                  ? 'मल्टीमॉडल AI से स्ट्रिप की गहन रासायनिक जांच'
                  : 'Multimodal Generative Vision for Chemometric Diagnostics'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 sm:p-6 space-y-4">
          {/* Active Engine Status Pill */}
          <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <span className={`w-3 h-3 rounded-full ${apiKey ? 'bg-emerald-400 animate-pulse' : 'bg-cyan-400'}`} />
              <div>
                <div className="text-xs font-bold text-white">
                  {apiKey ? 'Gemini 1.5/2.0 Flash Vision (Connected)' : 'Local Optical Computer Vision (Active)'}
                </div>
                <div className="text-[11px] text-slate-400">
                  {apiKey
                    ? 'AI Multimodal Strip Analysis Enabled'
                    : '100% Client-Side CIE L*a*b* Offline Engine'}
                </div>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-slate-800 border border-slate-700 text-slate-300">
              {apiKey ? 'API Online' : 'Local CV'}
            </span>
          </div>

          {/* API Key Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
              <span>{lang === 'hi' ? 'Gemini API Key दर्ज करें:' : 'Enter Gemini API Key:'}</span>
              <a
                href="https://aistudio.google.com/app/apikey"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] text-cyan-400 hover:underline flex items-center space-x-1"
              >
                <span>{lang === 'hi' ? 'मुफ्त API Key प्राप्त करें' : 'Get Free Key'}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </label>
            <div className="relative">
              <Key className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="AIzaSy... or AQ..."
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-slate-100 text-xs font-mono focus:outline-none focus:border-cyan-500 transition-colors"
              />
            </div>
            <p className="text-[11px] text-slate-400">
              {lang === 'hi'
                ? 'आपकी API Key केवल आपके ब्राउज़र में सुरक्षित रहती है और किसी बाहरी सर्वर पर नहीं भेजी जाती।'
                : 'Your API key is securely stored in your local browser and sent directly to Google API.'}
            </p>
          </div>

          {/* Dual-Engine Architecture Info */}
          <div className="p-3 rounded-xl bg-cyan-950/20 border border-cyan-500/20 text-xs text-slate-300 space-y-1">
            <div className="font-bold text-cyan-300 flex items-center space-x-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Dual-Engine Architecture</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              When Gemini API is enabled, the camera snapshot is analyzed by Gemini Multimodal AI for chemical contaminants, disease prevention, and RO filtration advice. If offline or no key is set, it instantly falls back to our local optical colorimeter.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-900/80 flex items-center justify-between">
          <button
            onClick={handleClear}
            className="text-xs text-slate-400 hover:text-rose-400 transition-colors"
          >
            {lang === 'hi' ? 'हटाएं (Use Local CV)' : 'Clear (Use Local CV)'}
          </button>

          <div className="flex items-center space-x-2">
            <button
              onClick={onClose}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs transition-colors"
            >
              {lang === 'hi' ? 'रद्द करें' : 'Cancel'}
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-cyan-500 to-sky-600 hover:from-cyan-400 hover:to-sky-500 text-slate-950 font-bold text-xs shadow-md transition-all flex items-center space-x-1"
            >
              {isSaved ? <Check className="w-3.5 h-3.5" /> : <Sparkles className="w-3.5 h-3.5" />}
              <span>{isSaved ? (lang === 'hi' ? 'सहेजा गया!' : 'Saved!') : (lang === 'hi' ? 'सहेजें' : 'Save Key')}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
