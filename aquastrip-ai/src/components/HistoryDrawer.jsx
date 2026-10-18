import React from 'react';
import { X, Trash2, Calendar, Droplets, ArrowRight, ShieldCheck, AlertTriangle, ShieldAlert } from 'lucide-react';

export default function HistoryDrawer({
  isOpen,
  onClose,
  history,
  onSelectScan,
  onClearHistory,
  lang
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-md h-full bg-slate-900 border-l border-slate-800 shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-800 bg-slate-900/90">
          <div className="flex items-center space-x-2">
            <Droplets className="w-5 h-5 text-cyan-400" />
            <h3 className="text-base font-bold text-white">
              {lang === 'hi' ? 'स्कैन इतिहास (Scan History)' : 'Water Quality Scan History'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {history.length === 0 ? (
            <div className="text-center py-16 text-slate-400 space-y-2">
              <Droplets className="w-10 h-10 text-slate-600 mx-auto" />
              <p className="text-xs font-semibold">
                {lang === 'hi' ? 'कोई पुराना स्कैन नहीं मिला' : 'No previous scan records yet'}
              </p>
              <p className="text-[11px] text-slate-500">
                {lang === 'hi' ? 'कैमरे से स्ट्रिप स्कैन करें और "Save to History" दबाएं।' : 'Scan a strip and save results to track water quality over time.'}
              </p>
            </div>
          ) : (
            history.map((item, idx) => {
              const isSafe = item.evaluation.status === 'safe';
              const isModerate = item.evaluation.status === 'moderate';

              return (
                <div
                  key={item.id || idx}
                  onClick={() => {
                    onSelectScan(item);
                    onClose();
                  }}
                  className="p-3.5 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 hover:border-cyan-500/40 transition-all cursor-pointer space-y-2 group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono text-slate-400 flex items-center space-x-1">
                      <Calendar className="w-3 h-3 text-cyan-400" />
                      <span>{new Date(item.timestamp).toLocaleString()}</span>
                    </span>
                    <span
                      className={`text-[9px] font-bold px-1.5 py-0.5 rounded uppercase ${
                        isSafe
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : isModerate
                          ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                          : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                      }`}
                    >
                      {item.evaluation.status}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                        WQI Score: {item.evaluation.potabilityScore}%
                      </div>
                      <div className="text-[11px] text-slate-400">
                        pH {item.parameters.ph.value} · Hardness {item.parameters.hardness.value} ppm
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        {history.length > 0 && (
          <div className="p-4 border-t border-slate-800 bg-slate-900/90 flex justify-between items-center">
            <span className="text-xs text-slate-400">
              {history.length} {lang === 'hi' ? 'रिकॉर्ड सहेजे गए' : 'records saved'}
            </span>
            <button
              onClick={onClearHistory}
              className="text-xs text-rose-400 hover:text-rose-300 flex items-center space-x-1 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>{lang === 'hi' ? 'इतिहास मिटाएं' : 'Clear History'}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
