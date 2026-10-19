import React, { useState } from 'react';
import { translations } from '../data/translations';
import { cropCalendarData } from '../data/cropCalendar';
import { speakText } from '../services/speechService';
import { CalendarDays, Sprout, Clock, ShieldCheck, Thermometer, Droplets, Volume2, Sparkles } from 'lucide-react';

export default function SowingCalendar({ lang }) {
  const t = translations[lang];
  const [selectedSeasonId, setSelectedSeasonId] = useState("rabi");

  const currentSeason = cropCalendarData.find(s => s.season_id === selectedSeasonId) || cropCalendarData[0];

  const playSowingAudio = () => {
    const text = lang === 'hi'
      ? `${currentSeason.season_name_hi}। बुवाई का समय: ${currentSeason.sowing_window_hi}। मुख्य फसलें: गेहूं, सरसों, चना, आलू। ${currentSeason.climate_guide_hi}`
      : `${currentSeason.season_name_en}. Sowing window: ${currentSeason.sowing_window_en}. Recommended crops: Wheat, Mustard, Gram, Potato. ${currentSeason.climate_guide_en}`;
    speakText(text, lang);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-200">
        <div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-800 flex items-center gap-2">
            <CalendarDays className="w-6 h-6 text-emerald-600" />
            <span>{t.sowingTitle}</span>
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
            {t.sowingSubtitle}
          </p>
        </div>

        <button
          onClick={playSowingAudio}
          className="flex items-center gap-2 bg-emerald-100 hover:bg-emerald-200 text-emerald-900 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all self-start sm:self-auto cursor-pointer"
        >
          <Volume2 className="w-4 h-4 text-emerald-700" />
          <span>{t.listenAudio}</span>
        </button>
      </div>

      {/* Season Selection Tabs */}
      <div className="grid grid-cols-3 gap-3">
        {cropCalendarData.map((season) => (
          <button
            key={season.season_id}
            onClick={() => setSelectedSeasonId(season.season_id)}
            className={`p-3 sm:p-4 rounded-2xl border text-left transition-all cursor-pointer ${
              selectedSeasonId === season.season_id
                ? 'border-emerald-600 bg-emerald-50/80 shadow-xs ring-1 ring-emerald-500'
                : 'border-slate-200 bg-white hover:border-emerald-300 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className={`text-[9px] sm:text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                season.season_id === 'rabi' ? 'bg-amber-100 text-amber-900' : 'bg-slate-100 text-slate-700'
              }`}>
                {season.season_id === 'rabi' ? (lang === 'hi' ? 'सक्रिय सीजन' : 'Active Season') : 'Upcoming'}
              </span>
            </div>
            <div className="text-xs sm:text-sm font-extrabold text-slate-900 truncate">
              {lang === 'hi' ? season.season_name_hi : season.season_name_en}
            </div>
            <div className="text-[11px] text-slate-500 mt-1 font-medium">
              {lang === 'hi' ? season.sowing_window_hi : season.sowing_window_en}
            </div>
          </button>
        ))}
      </div>

      {/* Season Climate & Soil Readiness Banner */}
      <div className="bg-gradient-to-r from-emerald-800 to-teal-900 text-white p-5 rounded-2xl shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider">
              {lang === 'hi' ? 'बुवाई अनुकूलता गाइड' : 'Agronomic Soil Guidelines'}
            </span>
            <h4 className="text-lg font-bold text-white">
              {lang === 'hi' ? currentSeason.season_name_hi : currentSeason.season_name_en}
            </h4>
            <p className="text-xs text-emerald-100 leading-relaxed max-w-2xl">
              {lang === 'hi' ? currentSeason.climate_guide_hi : currentSeason.climate_guide_en}
            </p>
          </div>

          <div className="flex items-center gap-3 bg-emerald-950/60 p-3 rounded-xl border border-emerald-700/60 shrink-0">
            <div>
              <div className="flex items-center gap-1 text-[11px] text-emerald-300 font-semibold">
                <Thermometer className="w-3.5 h-3.5" />
                <span>{lang === 'hi' ? 'मिट्टी का तापमान' : 'Soil Temp'}</span>
              </div>
              <div className="text-base font-extrabold text-white">21.5°C</div>
            </div>
            <div className="w-px h-8 bg-emerald-700/80"></div>
            <div>
              <div className="flex items-center gap-1 text-[11px] text-emerald-300 font-semibold">
                <Droplets className="w-3.5 h-3.5" />
                <span>{lang === 'hi' ? 'पर्याप्त नमी' : 'Field Moisture'}</span>
              </div>
              <div className="text-base font-extrabold text-white">58% Oatt</div>
            </div>
          </div>
        </div>
      </div>

      {/* Recommended Crop Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {currentSeason.crops.map((crop) => (
          <div
            key={crop.id}
            className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:border-emerald-300 transition-all space-y-4"
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                  <Sprout className="w-5 h-5 text-emerald-700" />
                </div>
                <div>
                  <h5 className="text-base font-extrabold text-slate-900">
                    {lang === 'hi' ? crop.crop_hi : crop.crop_en}
                  </h5>
                  <span className="text-[11px] text-emerald-700 font-semibold">
                    {crop.status}
                  </span>
                </div>
              </div>
              <span className="bg-slate-100 text-slate-700 text-xs font-bold px-2.5 py-1 rounded-lg">
                {crop.seed_rate}
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                <span className="font-bold text-slate-700 block text-[11px] uppercase tracking-wider mb-0.5">
                  {lang === 'hi' ? 'प्रमाणित उच्च उपज किस्में (Top Varieties)' : 'Certified High-Yield Varieties'}:
                </span>
                <span className="font-semibold text-emerald-900">
                  {lang === 'hi' ? crop.best_varieties_hi : crop.best_varieties_en}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-slate-700">
                <div className="bg-slate-50 p-2 rounded-lg">
                  <span className="text-slate-400 block text-[10px]">{t.soilReq}:</span>
                  <span className="font-semibold">{lang === 'hi' ? crop.soil_type_hi : crop.soil_type_en}</span>
                </div>
                <div className="bg-slate-50 p-2 rounded-lg">
                  <span className="text-slate-400 block text-[10px]">{t.harvestDays}:</span>
                  <span className="font-semibold text-slate-900">{crop.days_to_harvest}</span>
                </div>
              </div>

              <div className="bg-amber-50/70 p-2.5 rounded-xl border border-amber-200/60 text-slate-800 flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-amber-950 text-[11px] block">
                    {lang === 'hi' ? 'बीज शोधन (Seed Treatment):' : 'Seed Treatment Protocol:'}
                  </span>
                  <span className="text-slate-700 text-[11px]">
                    {lang === 'hi' ? crop.seed_treatment_hi : crop.seed_treatment_en}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
