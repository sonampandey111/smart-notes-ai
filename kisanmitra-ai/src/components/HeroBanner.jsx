import React from 'react';
import { translations } from '../data/translations';
import { Sparkles, Camera, TrendingUp, CloudSun, ShieldCheck, Zap } from 'lucide-react';

export default function HeroBanner({ lang, setActiveTab, weatherData }) {
  const t = translations[lang];

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-900 via-teal-900 to-slate-900 text-white shadow-xl mb-8 p-6 sm:p-8 border border-emerald-800/40">
      {/* Decorative background glow & shapes */}
      <div className="absolute -right-16 -top-16 w-80 h-80 rounded-full bg-emerald-500/20 blur-3xl pointer-events-none"></div>
      <div className="absolute right-1/3 -bottom-20 w-72 h-72 rounded-full bg-teal-400/15 blur-3xl pointer-events-none"></div>

      <div className="relative z-10 max-w-4xl">
        {/* Top Tag */}
        <div className="inline-flex items-center gap-2 bg-emerald-800/80 border border-emerald-500/30 px-3.5 py-1 rounded-full text-xs font-semibold text-emerald-200 mb-4 backdrop-blur-xs">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>{t.heroBadge}</span>
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
          <span className="text-amber-300">Idea 3: Farm Advisor</span>
        </div>

        {/* Heading */}
        <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-snug mb-3">
          {t.welcomeFarmer}
          <span className="block mt-1 text-emerald-300 font-bold text-xl sm:text-2xl">
            {t.heroHeading}
          </span>
        </h2>

        {/* Value Prop Badges */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-4 my-5 text-xs sm:text-sm text-emerald-100/90 font-medium">
          <div className="flex items-center gap-1.5 bg-emerald-950/60 px-3 py-1.5 rounded-lg border border-emerald-700/50">
            <Camera className="w-4 h-4 text-emerald-400" />
            <span>{lang === 'hi' ? 'लीफ ब्लाइट व 20+ रोग पहचान' : 'Leaf Blight & 20+ Crop Diseases'}</span>
          </div>
          <div className="flex items-center gap-1.5 bg-emerald-950/60 px-3 py-1.5 rounded-lg border border-emerald-700/50">
            <CloudSun className="w-4 h-4 text-amber-400" />
            <span>{lang === 'hi' ? 'दवा छिड़काव का सही समय' : 'Weather-based Spraying Window'}</span>
          </div>
          <div className="flex items-center gap-1.5 bg-emerald-950/60 px-3 py-1.5 rounded-lg border border-emerald-700/50">
            <TrendingUp className="w-4 h-4 text-teal-400" />
            <span>{lang === 'hi' ? 'लाइव मंडी भाव व डायरेक्ट मार्केट' : 'Live Mandi Prices & Direct Market'}</span>
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button
            onClick={() => setActiveTab('scan')}
            className="flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-slate-950 font-bold px-5 py-3 rounded-xl shadow-lg shadow-emerald-500/30 transition-all hover:scale-[1.02] cursor-pointer text-sm"
          >
            <Camera className="w-4 h-4 text-slate-950" />
            <span>{t.btnScanNow}</span>
          </button>

          <button
            onClick={() => setActiveTab('weather')}
            className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-4 py-3 rounded-xl border border-white/20 transition-all cursor-pointer text-sm backdrop-blur-xs"
          >
            <CloudSun className="w-4 h-4 text-amber-300" />
            <span>{t.btnWeatherSpray}</span>
          </button>

          <button
            onClick={() => setActiveTab('mandi')}
            className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-4 py-3 rounded-xl border border-white/20 transition-all cursor-pointer text-sm backdrop-blur-xs"
          >
            <TrendingUp className="w-4 h-4 text-emerald-300" />
            <span>{t.btnCheckMandi}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
