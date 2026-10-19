import React from 'react';
import { translations } from '../data/translations';
import { AGRI_REGIONS } from '../services/weatherService';
import { Sprout, Camera, CloudSun, CalendarDays, Satellite, TrendingUp, MessageSquareText, Globe, MapPin, Volume2 } from 'lucide-react';

export default function Navbar({
  lang,
  setLang,
  selectedRegion,
  setSelectedRegion,
  activeTab,
  setActiveTab
}) {
  const t = translations[lang];

  const navItems = [
    { id: 'scan', label: t.tabScan, icon: Camera },
    { id: 'weather', label: t.tabWeather, icon: CloudSun },
    { id: 'sowing', label: t.tabSowing, icon: CalendarDays },
    { id: 'satellite', label: t.tabSatellite, icon: Satellite },
    { id: 'mandi', label: t.tabMandi, icon: TrendingUp },
    { id: 'chat', label: t.tabChat, icon: MessageSquareText },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-emerald-100 shadow-xs">
      {/* Top Banner Bar */}
      <div className="bg-gradient-to-r from-emerald-800 via-emerald-700 to-teal-800 text-white text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 bg-emerald-900/60 text-emerald-200 px-2 py-0.5 rounded-full font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              {lang === 'hi' ? 'लाइव कृषि सलाह' : 'Live Agri Intelligence'}
            </span>
            <span className="hidden sm:inline text-emerald-100/90">
              {t.subtagline}
            </span>
          </div>

          <div className="flex items-center gap-4">
            {/* Region Selector */}
            <div className="flex items-center gap-1.5 bg-emerald-900/40 px-2 py-0.5 rounded-md border border-emerald-600/40 text-xs">
              <MapPin className="w-3.5 h-3.5 text-emerald-300" />
              <select
                aria-label={t.currentLocation}
                value={selectedRegion.id}
                onChange={(e) => {
                  const reg = AGRI_REGIONS.find(r => r.id === e.target.value);
                  if (reg) setSelectedRegion(reg);
                }}
                className="bg-transparent text-white text-xs focus:outline-hidden cursor-pointer"
              >
                {AGRI_REGIONS.map(reg => (
                  <option key={reg.id} value={reg.id} className="text-slate-800">
                    {lang === 'hi' ? reg.name_hi : reg.name_en}
                  </option>
                ))}
              </select>
            </div>

            {/* Language Switcher */}
            <button
              onClick={() => setLang(lang === 'hi' ? 'en' : 'hi')}
              className="flex items-center gap-1 bg-amber-400 hover:bg-amber-300 text-amber-950 font-bold px-2.5 py-0.5 rounded-full text-xs shadow-xs transition-colors cursor-pointer"
              title={t.selectLanguage}
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{lang === 'hi' ? 'English में देखें' : 'हिन्दी में बदलें'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-4">
        {/* Brand */}
        <div 
          onClick={() => setActiveTab('scan')} 
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center text-white shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform">
            <Sprout className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-emerald-900 via-emerald-800 to-teal-900 bg-clip-text text-transparent">
                {t.appTitle}
              </h1>
              <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-200">
                AI 3.0
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium">
              {t.tagline}
            </p>
          </div>
        </div>

        {/* Tab Buttons */}
        <nav className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0 scrollbar-none w-full lg:w-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-600/30 font-bold'
                    : 'text-slate-600 hover:text-emerald-700 hover:bg-emerald-50'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
