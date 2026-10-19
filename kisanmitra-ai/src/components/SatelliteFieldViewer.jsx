import React, { useState } from 'react';
import { translations } from '../data/translations';
import { satelliteTelemetry } from '../services/satelliteService';
import { speakText } from '../services/speechService';
import { Satellite, ShieldAlert, Sparkles, Layers, Droplets, Leaf, Info, Volume2, Camera } from 'lucide-react';

export default function SatelliteFieldViewer({ lang, setActiveTab }) {
  const t = translations[lang];
  const [viewMode, setViewMode] = useState("ndvi"); // 'ndvi' | 'moisture' | 'truecolor'

  const playSatelliteAudio = () => {
    const text = lang === 'hi'
      ? `सैटेलाइट रिपोर्ट: खेत का औसत एनडीवीआई इंडेक्स 0.74 है जो स्वस्थ फसल दर्शाता है। लेकिन दक्षिण-पश्चिमी खंड में अत्यधिक नमी के कारण पत्ती झुलसा रोग का खतरा है।`
      : `Satellite report: Average farm NDVI is 0.74 indicating healthy crop canopy. However, south-west sector shows high moisture with Leaf Blight disease alert.`;
    speakText(text, lang);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-200">
        <div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-800 flex items-center gap-2">
            <Satellite className="w-6 h-6 text-teal-600" />
            <span>{t.satelliteTitle}</span>
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
            {t.satelliteSubtitle} — <span className="font-semibold text-teal-700">{satelliteTelemetry.farmer_plot}</span> ({satelliteTelemetry.total_area_acres} Acres)
          </p>
        </div>

        <button
          onClick={playSatelliteAudio}
          className="flex items-center gap-2 bg-teal-100 hover:bg-teal-200 text-teal-900 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all self-start sm:self-auto cursor-pointer"
        >
          <Volume2 className="w-4 h-4 text-teal-700" />
          <span>{t.listenAudio}</span>
        </button>
      </div>

      {/* Satellite Top Telemetry Banner */}
      <div className="bg-slate-900 text-white rounded-2xl p-5 border border-slate-800 shadow-md">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-500/20 border border-teal-500/40 text-teal-400 flex items-center justify-center font-bold">
              <Satellite className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] text-teal-400 font-mono tracking-wider uppercase block">
                {satelliteTelemetry.satellite_constellation}
              </span>
              <div className="text-sm font-bold text-slate-100">
                {lang === 'hi' ? 'अंतिम उपग्रह पास: ' : 'Last Orbit Pass: '}
                <span className="text-teal-300">{satelliteTelemetry.last_pass}</span>
              </div>
            </div>
          </div>

          {/* Layer Mode Toggle */}
          <div className="flex items-center bg-slate-800 p-1 rounded-xl text-xs font-semibold">
            <button
              onClick={() => setViewMode('ndvi')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                viewMode === 'ndvi' ? 'bg-teal-600 text-white shadow-xs font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              NDVI हरियाली
            </button>
            <button
              onClick={() => setViewMode('moisture')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                viewMode === 'moisture' ? 'bg-teal-600 text-white shadow-xs font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              मिट्टी नमी (Moisture)
            </button>
            <button
              onClick={() => setViewMode('truecolor')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                viewMode === 'truecolor' ? 'bg-teal-600 text-white shadow-xs font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              RGB सैटेलाइट फोटो
            </button>
          </div>
        </div>

        {/* 4 Telemetry KPIs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700/60">
            <span className="text-slate-400 text-[10px] block">{t.ndviScore}</span>
            <div className="text-xl font-black text-emerald-400 mt-0.5">{satelliteTelemetry.mean_ndvi}</div>
            <span className="text-[10px] text-emerald-300 font-medium">घना स्वस्थ बायोमास</span>
          </div>

          <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700/60">
            <span className="text-slate-400 text-[10px] block">{t.soilMoisture}</span>
            <div className="text-xl font-black text-cyan-400 mt-0.5">{satelliteTelemetry.soil_moisture_pct}%</div>
            <span className="text-[10px] text-cyan-300 font-medium">संतोषजनक नमी स्तर</span>
          </div>

          <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700/60">
            <span className="text-slate-400 text-[10px] block">{t.healthyArea}</span>
            <div className="text-xl font-black text-teal-300 mt-0.5">88.5%</div>
            <span className="text-[10px] text-slate-400 font-medium">4.2 एकड़ स्वस्थ क्षेत्र</span>
          </div>

          <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700/60">
            <span className="text-slate-400 text-[10px] block">{t.stressedArea}</span>
            <div className="text-xl font-black text-amber-400 mt-0.5">11.5%</div>
            <span className="text-[10px] text-amber-300 font-medium">खंड 3 में निगरानी आवश्यक</span>
          </div>
        </div>
      </div>

      {/* Interactive Satellite Field Map Simulator */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Visual Map Render (7 cols) */}
        <div className="lg:col-span-7 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between text-xs font-bold text-slate-700">
            <span className="flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-teal-600" />
              <span>{lang === 'hi' ? 'खेत का बहुआयामी सैटेलाइट नक्शा (Plot #42)' : 'Multispectral Field Parcel Map (#42)'}</span>
            </span>
            <span className="text-[11px] font-mono text-slate-500">Scale: 1:2500</span>
          </div>

          {/* Interactive Simulated Satellite Parcel */}
          <div className="relative aspect-16/10 rounded-xl overflow-hidden border border-slate-300 shadow-inner bg-slate-950 flex items-center justify-center p-3">
            {/* SVG Farm Grid */}
            <svg viewBox="0 0 500 320" className="w-full h-full">
              <defs>
                <linearGradient id="ndviZone1" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#15803d" />
                  <stop offset="100%" stopColor="#22c55e" />
                </linearGradient>
                <linearGradient id="ndviZone2" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#16a34a" />
                  <stop offset="100%" stopColor="#4ade80" />
                </linearGradient>
                <linearGradient id="ndviZone3Stressed" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#d97706" />
                  <stop offset="100%" stopColor="#b45309" />
                </linearGradient>
                <linearGradient id="moistureZoneHigh" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#0284c7" />
                  <stop offset="100%" stopColor="#38bdf8" />
                </linearGradient>
              </defs>

              {/* Surrounding Farmland / Border */}
              <rect x="10" y="10" width="480" height="300" rx="12" fill="#1e293b" opacity="0.6" stroke="#475569" strokeDasharray="4 4" />

              {/* Zone 1: North East */}
              <path
                d="M 250,30 L 470,30 L 470,160 L 250,160 Z"
                fill={viewMode === 'moisture' ? '#0284c7' : viewMode === 'truecolor' ? '#2e6f40' : 'url(#ndviZone1)'}
                stroke="#ffffff"
                strokeWidth="1.5"
                opacity="0.9"
              />
              <text x="320" y="90" fill="#ffffff" fontSize="12" fontWeight="bold">ZONE 1 (NE)</text>
              <text x="320" y="110" fill="#bbf7d0" fontSize="10">NDVI: 0.82 (High)</text>

              {/* Zone 2: Central Core */}
              <path
                d="M 30,30 L 240,30 L 240,160 L 30,160 Z"
                fill={viewMode === 'moisture' ? '#0ea5e9' : viewMode === 'truecolor' ? '#357a48' : 'url(#ndviZone2)'}
                stroke="#ffffff"
                strokeWidth="1.5"
                opacity="0.9"
              />
              <text x="90" y="90" fill="#ffffff" fontSize="12" fontWeight="bold">ZONE 2 (CORE)</text>
              <text x="90" y="110" fill="#bbf7d0" fontSize="10">NDVI: 0.78 (Good)</text>

              {/* Zone 3: South West (Stressed / Blight Alert!) */}
              <path
                d="M 30,170 L 240,170 L 240,290 L 30,290 Z"
                fill={viewMode === 'moisture' ? 'url(#moistureZoneHigh)' : viewMode === 'truecolor' ? '#6b7280' : 'url(#ndviZone3Stressed)'}
                stroke="#ef4444"
                strokeWidth="2.5"
                strokeDasharray="6 3"
                opacity="0.95"
              />
              <text x="65" y="220" fill="#ffffff" fontSize="12" fontWeight="bold">ZONE 3 (SW)</text>
              <text x="65" y="240" fill="#fef08a" fontSize="10">NDVI: 0.54 • ALERT ⚠️</text>
              <text x="65" y="255" fill="#fca5a5" fontSize="9">Leaf Blight Risk</text>

              {/* Zone 4: South East Boundary */}
              <path
                d="M 250,170 L 470,170 L 470,290 L 250,290 Z"
                fill={viewMode === 'moisture' ? '#38bdf8' : viewMode === 'truecolor' ? '#42855b' : '#65a30d'}
                stroke="#ffffff"
                strokeWidth="1.5"
                opacity="0.85"
              />
              <text x="320" y="225" fill="#ffffff" fontSize="12" fontWeight="bold">ZONE 4 (SE)</text>
              <text x="320" y="245" fill="#ecfccb" fontSize="10">NDVI: 0.64 (Normal)</text>

              {/* Irrigation Canal / Trench Marker */}
              <line x1="245" y1="20" x2="245" y2="300" stroke="#38bdf8" strokeWidth="4" strokeLinecap="round" />
            </svg>

            {/* Map Legend */}
            <div className="absolute bottom-4 right-4 bg-slate-900/90 backdrop-blur-xs text-white p-2 rounded-lg border border-slate-700 text-[10px] space-y-1">
              <div className="font-bold text-slate-300">NDVI Scale:</div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 bg-emerald-500 rounded-xs"></span>
                <span>0.7 - 0.9 (स्वस्थ हरियाली)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 bg-amber-500 rounded-xs"></span>
                <span>0.4 - 0.6 (तनाव / रोग)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 bg-sky-400 rounded-xs"></span>
                <span>सिंचाई नाली (Irrigation)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Zone Breakdown & Advisory (5 cols) */}
        <div className="lg:col-span-5 space-y-3">
          <h4 className="text-sm font-bold text-slate-800 flex items-center gap-2">
            <Info className="w-4 h-4 text-teal-600" />
            <span>{lang === 'hi' ? 'खेत के विभिन्न खंडों का स्वास्थ्य' : 'Zonal Field Telemetry Breakdown'}</span>
          </h4>

          <div className="space-y-2.5">
            {satelliteTelemetry.zones.map((zone) => (
              <div
                key={zone.id}
                className={`p-3.5 rounded-xl border text-xs transition-all ${
                  zone.alert 
                    ? 'border-amber-300 bg-amber-50/80 shadow-xs ring-1 ring-amber-400' 
                    : 'border-slate-200 bg-white'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-slate-900">
                    {lang === 'hi' ? zone.name_hi : zone.name_en}
                  </span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                    zone.alert ? 'bg-amber-500 text-slate-950 animate-pulse' : 'bg-emerald-100 text-emerald-800'
                  }`}>
                    NDVI {zone.ndvi}
                  </span>
                </div>

                <div className="text-slate-600 mb-1">
                  {lang === 'hi' ? zone.status_hi : zone.status_en}
                </div>

                {zone.alert && (
                  <div className="mt-2 pt-2 border-t border-amber-200 text-amber-950 font-semibold flex flex-col gap-2">
                    <div className="flex items-start gap-1.5">
                      <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                      <span>{zone.alert}</span>
                    </div>

                    <button
                      onClick={() => setActiveTab('scan')}
                      className="self-start flex items-center gap-1 bg-amber-600 hover:bg-amber-700 text-white font-bold px-2.5 py-1 rounded-lg text-[11px] cursor-pointer shadow-xs"
                    >
                      <Camera className="w-3.5 h-3.5" />
                      <span>{lang === 'hi' ? 'इस खंड के पत्ते की AI जांच करें' : 'AI Scan Leaf in this Zone'}</span>
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
