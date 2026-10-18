import React from 'react';
import { Droplet, Info, Palette, History, Languages, Bot, Sparkles } from 'lucide-react';

const GithubIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

export default function Navbar({
  lang,
  setLang,
  t,
  onOpenHowItWorks,
  onOpenChart,
  onOpenHistory,
  onOpenApiSettings,
  hasApiKey
}) {
  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-slate-800/80 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand & Logo */}
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-600 via-sky-500 to-emerald-400 p-[1.5px] shadow-lg shadow-cyan-500/20">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Droplet className="w-6 h-6 text-cyan-400 fill-cyan-400/20 animate-pulse" />
            </div>
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-cyan-400 via-sky-300 to-white bg-clip-text text-transparent">
                AquaStrip
              </span>
              <span className="px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 rounded-md">
                AI Vision
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">
              {lang === 'hi' ? 'स्मार्टफोन कैमरा वाटर क्वालिटी स्कैनर' : 'Smartphone Water Quality Scanner'}
            </p>
          </div>
        </div>

        {/* Right Navigation & Tools */}
        <div className="flex items-center space-x-1.5 sm:space-x-3">
          {/* Gemini AI API Button */}
          <button
            onClick={onOpenApiSettings}
            className={`flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
              hasApiKey
                ? 'bg-purple-950/50 text-purple-300 border-purple-500/40 hover:bg-purple-900/50 shadow-sm'
                : 'bg-slate-800/60 text-slate-300 border-slate-700/60 hover:bg-slate-800'
            }`}
            title="Configure Google Gemini Vision API"
          >
            <Bot className={`w-3.5 h-3.5 ${hasApiKey ? 'text-purple-400' : 'text-slate-400'}`} />
            <span className="hidden sm:inline">
              {hasApiKey ? 'Gemini AI' : 'AI API'}
            </span>
            <span className={`w-1.5 h-1.5 rounded-full ${hasApiKey ? 'bg-emerald-400 animate-pulse' : 'bg-slate-500'}`} />
          </button>

          {/* How It Works Button */}
          <button
            onClick={onOpenHowItWorks}
            className="flex items-center space-x-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-white bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 transition-colors"
            title="How AquaStrip AI Works"
          >
            <Info className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden md:inline">{lang === 'hi' ? 'यह कैसे काम करता है' : 'How It Works'}</span>
          </button>

          {/* Color Chart Reference */}
          <button
            onClick={onOpenChart}
            className="flex items-center space-x-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-white bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 transition-colors"
            title="Calibrated Color Chart"
          >
            <Palette className="w-3.5 h-3.5 text-purple-400" />
            <span className="hidden md:inline">{lang === 'hi' ? 'कलर चार्ट' : 'Color Chart'}</span>
          </button>

          {/* Scan History */}
          <button
            onClick={onOpenHistory}
            className="flex items-center space-x-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-white bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 transition-colors"
            title="Scan History"
          >
            <History className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden md:inline">{lang === 'hi' ? 'इतिहास' : 'History'}</span>
          </button>

          {/* Bilingual Language Switcher */}
          <button
            onClick={() => setLang(lang === 'en' ? 'hi' : 'en')}
            className="flex items-center space-x-1 px-2 py-1.5 rounded-lg text-xs font-bold text-cyan-300 bg-cyan-950/40 hover:bg-cyan-900/60 border border-cyan-800/50 transition-colors shadow-sm"
            title="Switch Language / भाषा बदलें"
          >
            <Languages className="w-3.5 h-3.5" />
            <span>{lang === 'en' ? 'हिन्दी' : 'EN'}</span>
          </button>

          {/* GitHub Link */}
          <a
            href="https://github.com/sonampandey111/smart-notes-ai/tree/main/aquastrip-ai"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800/80 rounded-lg transition-colors border border-transparent hover:border-slate-700"
            title="View Source on GitHub"
          >
            <GithubIcon className="w-4 h-4" />
          </a>
        </div>
      </div>
    </header>
  );
}
