import React, { useState } from 'react';
import { X, Palette, Info, Check, AlertTriangle } from 'lucide-react';
import {
  PH_PALETTE,
  HARDNESS_PALETTE,
  CHLORINE_PALETTE,
  ALKALINITY_PALETTE,
  WATER_STANDARDS
} from '../utils/calibrationData';

export default function CalibrationChartModal({ isOpen, onClose, lang }) {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState('ph');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-4xl max-h-[90vh] flex flex-col rounded-2xl glass-panel-elevated border border-slate-700 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-slate-800 bg-slate-900/80">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
              <Palette className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                {lang === 'hi' ? 'कैलिब्रेटेड कलर रेफरेंस चार्ट' : 'Calibrated Colorimetry Reference Standards'}
              </h3>
              <p className="text-xs text-slate-400">
                {lang === 'hi'
                  ? 'WHO एवं BIS (IS 10500:2012) मानकों के आधार पर कैलिब्रेटेड कलर पैलेट'
                  : 'CIE L*a*b* calibrated colorimetric palettes for drinking water diagnostics'}
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

        {/* Tab Switcher */}
        <div className="flex border-b border-slate-800 px-4 bg-slate-900/40 text-xs font-semibold">
          {[
            { id: 'ph', label: 'Universal pH (1 - 14)' },
            { id: 'hardness', label: 'Total Hardness (ppm)' },
            { id: 'chlorine', label: 'Free Chlorine (ppm)' },
            { id: 'alkalinity', label: 'Total Alkalinity (ppm)' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-3 px-4 border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-cyan-400 text-cyan-300'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Body */}
        <div className="overflow-y-auto p-4 sm:p-6 space-y-4">
          {activeTab === 'ph' && (
            <div className="space-y-4">
              <div className="p-3 rounded-xl bg-cyan-950/20 border border-cyan-500/20 text-xs text-slate-300 flex items-start space-x-2">
                <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <p>
                  {lang === 'hi'
                    ? 'pH 6.5 से 8.5 के बीच का पानी मानव उपभोग के लिए आदर्श है। 6.5 से कम पानी एसिडिक और संक्षारक होता है, जबकि 9.0 से अधिक क्षारीय पानी कड़वा और विषैला होता है।'
                    : 'Universal Litmus Scale: pH 6.5 - 8.5 is safe and ideal. Under 6.5 is acidic and corrosive. Above 8.5 is caustic and alkaline.'}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {PH_PALETTE.map((item) => (
                  <div
                    key={item.value}
                    className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center space-x-3"
                  >
                    <div
                      className="w-10 h-10 rounded-lg shrink-0 border border-white/20 shadow-sm flex items-center justify-center font-bold text-xs"
                      style={{
                        backgroundColor: item.hex,
                        color: [1, 2, 3, 11, 12, 13, 14].includes(item.value) ? '#fff' : '#000'
                      }}
                    >
                      {item.value}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-white">
                          {item.label}
                        </span>
                        <span
                          className={`text-[9px] font-bold px-1.5 py-0.5 rounded uppercase ${
                            item.status === 'safe'
                              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                              : item.status === 'moderate'
                              ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                              : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                          }`}
                        >
                          {item.status}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 truncate">
                        {item.desc}
                      </p>
                      <div className="text-[10px] font-mono text-slate-500">
                        HEX: {item.hex} · RGB({item.rgb.r}, {item.rgb.g}, {item.rgb.b})
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'hardness' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-2.5">
                {HARDNESS_PALETTE.map((item) => (
                  <div
                    key={item.value}
                    className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center space-x-4"
                  >
                    <div
                      className="w-12 h-12 rounded-lg shrink-0 border border-white/20 shadow-md"
                      style={{ backgroundColor: item.hex }}
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-white">
                          {item.label}
                        </span>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                            item.status === 'safe'
                              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                              : item.status === 'moderate'
                              ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                              : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                          }`}
                        >
                          {item.status}
                        </span>
                      </div>
                      <p className="text-xs text-slate-300 mt-0.5">{item.desc}</p>
                      <div className="text-[10px] font-mono text-slate-500 mt-1">
                        HEX: {item.hex} · RGB({item.rgb.r}, {item.rgb.g}, {item.rgb.b})
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'chlorine' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-2.5">
                {CHLORINE_PALETTE.map((item) => (
                  <div
                    key={item.value}
                    className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center space-x-4"
                  >
                    <div
                      className="w-12 h-12 rounded-lg shrink-0 border border-white/20 shadow-md"
                      style={{ backgroundColor: item.hex }}
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-white">
                          {item.label}
                        </span>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                            item.status === 'safe'
                              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                              : item.status === 'moderate'
                              ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                              : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                          }`}
                        >
                          {item.status}
                        </span>
                      </div>
                      <p className="text-xs text-slate-300 mt-0.5">{item.desc}</p>
                      <div className="text-[10px] font-mono text-slate-500 mt-1">
                        HEX: {item.hex} · RGB({item.rgb.r}, {item.rgb.g}, {item.rgb.b})
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'alkalinity' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-2.5">
                {ALKALINITY_PALETTE.map((item) => (
                  <div
                    key={item.value}
                    className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center space-x-4"
                  >
                    <div
                      className="w-12 h-12 rounded-lg shrink-0 border border-white/20 shadow-md"
                      style={{ backgroundColor: item.hex }}
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-white">
                          {item.label}
                        </span>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                            item.status === 'safe'
                              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                              : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                          }`}
                        >
                          {item.status}
                        </span>
                      </div>
                      <p className="text-xs text-slate-300 mt-0.5">{item.desc}</p>
                      <div className="text-[10px] font-mono text-slate-500 mt-1">
                        HEX: {item.hex} · RGB({item.rgb.r}, {item.rgb.g}, {item.rgb.b})
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
