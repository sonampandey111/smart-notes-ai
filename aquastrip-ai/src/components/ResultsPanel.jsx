import React, { useEffect } from 'react';
import {
  ShieldCheck,
  ShieldAlert,
  AlertTriangle,
  Flame,
  Filter,
  Sparkles,
  Printer,
  BookmarkPlus,
  CheckCircle2,
  HelpCircle,
  TrendingUp,
  Droplets,
  Layers,
  Activity,
  Bot
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ResultsPanel({
  lang,
  t,
  analysisResult,
  onOpenReport,
  onSaveHistory
}) {
  if (!analysisResult) return null;

  const {
    parameters,
    evaluation,
    capturedPreviewUrl,
    timestamp
  } = analysisResult;

  const {
    potabilityScore,
    status,
    statusBadge,
    statusBadgeHi,
    healthSummary,
    healthSummaryHi,
    recommendations,
    parameterBreakdown
  } = evaluation;

  // Trigger celebration confetti if potability is safe (>= 85)
  useEffect(() => {
    if (status === 'safe' && potabilityScore >= 85) {
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.6 }
        });
      } catch (e) {
        // ignore
      }
    }
  }, [analysisResult, status, potabilityScore]);

  // Color theme variables based on status
  const isSafe = status === 'safe';
  const isModerate = status === 'moderate';
  const isToxic = status === 'toxic';

  const badgeBg = isSafe
    ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300'
    : isModerate
    ? 'bg-amber-500/15 border-amber-500/40 text-amber-300'
    : 'bg-rose-500/15 border-rose-500/40 text-rose-300';

  const gaugeStroke = isSafe
    ? '#10b981'
    : isModerate
    ? '#f59e0b'
    : '#f43f5e';

  // Radial gauge calculations
  const radius = 48;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (potabilityScore / 100) * circumference;

  return (
    <div className="space-y-6">
      {/* Hero Verdict Card */}
      <div
        className={`relative overflow-hidden rounded-2xl glass-panel-elevated p-6 border shadow-2xl ${
          isSafe
            ? 'border-emerald-500/30 bg-gradient-to-br from-slate-900/95 via-emerald-950/20 to-slate-900/95'
            : isModerate
            ? 'border-amber-500/30 bg-gradient-to-br from-slate-900/95 via-amber-950/20 to-slate-900/95'
            : 'border-rose-500/30 bg-gradient-to-br from-slate-900/95 via-rose-950/25 to-slate-900/95'
        }`}
      >
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left: Verdict Status Badge & Summary */}
          <div className="space-y-3 text-center md:text-left">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
              <div className={`inline-flex items-center space-x-2 px-3.5 py-1 rounded-full text-xs font-black tracking-wide border uppercase ${badgeBg}`}>
                {isSafe ? (
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                ) : isModerate ? (
                  <AlertTriangle className="w-4 h-4 text-amber-400" />
                ) : (
                  <ShieldAlert className="w-4 h-4 text-rose-400 animate-pulse" />
                )}
                <span>{lang === 'hi' ? statusBadgeHi : statusBadge}</span>
              </div>

              {analysisResult.geminiAiVerdict && (
                <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-purple-500/20 border border-purple-500/40 text-[10px] font-bold text-purple-300">
                  <Bot className="w-3.5 h-3.5 text-purple-400" />
                  <span>Gemini Vision AI Verified</span>
                </div>
              )}
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {isSafe
                ? (lang === 'hi' ? 'यह पानी पीने के लिए बिल्कुल सुरक्षित है' : 'Water is 100% Safe for Drinking')
                : isModerate
                ? (lang === 'hi' ? 'सावधानी: पीने से पहले शोधन/फिल्ट्रेशन करें' : 'Caution: Mild Treatment Recommended Before Drinking')
                : (lang === 'hi' ? 'चेतावनी: यह पानी सीधे पीने योग्य नहीं है' : 'Hazard Warning: Water Unfit for Direct Consumption')}
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
              {analysisResult.geminiAiVerdict
                ? (lang === 'hi'
                    ? (analysisResult.geminiAiVerdict.aiVerdictHi || analysisResult.geminiAiVerdict.aiVerdict)
                    : analysisResult.geminiAiVerdict.aiVerdict)
                : (lang === 'hi' ? healthSummaryHi : healthSummary)}
            </p>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 pt-2">
              <button
                onClick={onOpenReport}
                className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs shadow-md shadow-cyan-600/30 transition-all flex items-center space-x-1.5"
              >
                <Printer className="w-4 h-4" />
                <span>{t.exportReport}</span>
              </button>

              <button
                onClick={onSaveHistory}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs border border-slate-700 transition-colors flex items-center space-x-1.5"
              >
                <BookmarkPlus className="w-4 h-4 text-emerald-400" />
                <span>{lang === 'hi' ? 'रिपोर्ट सेव करें' : 'Save to History'}</span>
              </button>
            </div>
          </div>

          {/* Right: Radial Potability Gauge (0-100) */}
          <div className="flex flex-col items-center justify-center shrink-0">
            <div className="relative w-36 h-36 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
                <circle
                  cx="60"
                  cy="60"
                  r={radius}
                  className="text-slate-800"
                  strokeWidth="10"
                  stroke="currentColor"
                  fill="transparent"
                />
                <circle
                  cx="60"
                  cy="60"
                  r={radius}
                  stroke={gaugeStroke}
                  strokeWidth="10"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  fill="transparent"
                  className="transition-all duration-1000 ease-out"
                />
              </svg>
              <div className="absolute flex flex-col items-center justify-center text-center">
                <span className="text-3xl font-black text-white tracking-tight">
                  {potabilityScore}
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  / 100 WQI
                </span>
              </div>
            </div>
            <span className="text-xs font-bold text-slate-300 mt-2">
              {t.potabilityIndex}
            </span>
          </div>
        </div>
      </div>

      {/* 4 Core Parameter Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* 1. pH Parameter */}
        <div className="p-4 rounded-xl glass-panel border border-slate-800/80 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              {t.phLevel}
            </span>
            <span
              className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                parameterBreakdown.ph.status === 'safe'
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                  : parameterBreakdown.ph.status === 'moderate'
                  ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                  : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
              }`}
            >
              {parameterBreakdown.ph.status}
            </span>
          </div>

          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-extrabold text-white">
              {parameters.ph.value}
            </span>
            <span className="text-xs text-slate-400">
              {parameters.ph.value < 6.5 ? 'Acidic' : parameters.ph.value > 8.5 ? 'Alkaline' : 'Neutral'}
            </span>
          </div>

          {/* Colorimetric Match Swatch */}
          <div className="flex items-center space-x-2 p-2 rounded-lg bg-slate-900/60 border border-slate-800 text-[11px]">
            <div
              className="w-5 h-5 rounded-md border border-white/20 shadow-sm"
              style={{ backgroundColor: parameters.ph.measuredColorHex }}
              title="Measured Camera Color"
            />
            <div className="text-slate-300 font-mono text-[10px]">
              ΔE: {parameters.ph.deltaE} ({parameters.ph.confidence}% match)
            </div>
          </div>

          <p className="text-[11px] text-slate-400 leading-snug">
            {lang === 'hi' ? 'WHO मानक: 6.5 से 8.5 के बीच का pH सर्वोत्तम है।' : 'WHO standard: 6.5 - 8.5 is ideal for human consumption.'}
          </p>
        </div>

        {/* 2. Total Hardness */}
        <div className="p-4 rounded-xl glass-panel border border-slate-800/80 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              {t.hardnessLevel}
            </span>
            <span
              className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                parameterBreakdown.hardness.status === 'safe'
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                  : parameterBreakdown.hardness.status === 'moderate'
                  ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                  : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
              }`}
            >
              {parameterBreakdown.hardness.status}
            </span>
          </div>

          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-extrabold text-white">
              {parameters.hardness.value}
            </span>
            <span className="text-xs text-slate-400">ppm CaCO₃</span>
          </div>

          <div className="flex items-center space-x-2 p-2 rounded-lg bg-slate-900/60 border border-slate-800 text-[11px]">
            <div
              className="w-5 h-5 rounded-md border border-white/20 shadow-sm"
              style={{ backgroundColor: parameters.hardness.measuredColorHex }}
            />
            <span className="text-slate-300 text-[11px]">
              {parameters.hardness.value <= 60
                ? 'Soft Water'
                : parameters.hardness.value <= 180
                ? 'Balanced Mineral'
                : 'Hard (Scaling)'}
            </span>
          </div>

          <p className="text-[11px] text-slate-400 leading-snug">
            {lang === 'hi' ? '200 ppm से अधिक हार्डनेस होने पर RO फिल्टर की जरूरत होती है।' : 'Hardness > 200 ppm forms limescale and requires RO softening.'}
          </p>
        </div>

        {/* 3. Free Chlorine */}
        <div className="p-4 rounded-xl glass-panel border border-slate-800/80 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              {t.chlorineLevel}
            </span>
            <span
              className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                parameterBreakdown.chlorine.status === 'safe'
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                  : parameterBreakdown.chlorine.status === 'moderate'
                  ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                  : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
              }`}
            >
              {parameterBreakdown.chlorine.status}
            </span>
          </div>

          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-extrabold text-white">
              {parameters.chlorine.value}
            </span>
            <span className="text-xs text-slate-400">ppm (mg/L)</span>
          </div>

          <div className="flex items-center space-x-2 p-2 rounded-lg bg-slate-900/60 border border-slate-800 text-[11px]">
            <div
              className="w-5 h-5 rounded-md border border-white/20 shadow-sm"
              style={{ backgroundColor: parameters.chlorine.measuredColorHex }}
            />
            <span className="text-slate-300 text-[11px]">
              {parameters.chlorine.value <= 0.5
                ? 'Safe Residual'
                : parameters.chlorine.value <= 2.0
                ? 'Chemical Taste'
                : 'Bleach Toxic'}
            </span>
          </div>

          <p className="text-[11px] text-slate-400 leading-snug">
            {lang === 'hi' ? 'WHO मानक: 0.2 - 0.5 ppm कीटनाशक स्तर बैक्टीरिया से बचाता है।' : 'WHO target: 0.2 - 0.5 ppm protects against municipal bacteria.'}
          </p>
        </div>

        {/* 4. Total Alkalinity */}
        <div className="p-4 rounded-xl glass-panel border border-slate-800/80 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              {t.alkalinityLevel}
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full uppercase bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              {parameterBreakdown.alkalinity.status}
            </span>
          </div>

          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-extrabold text-white">
              {parameters.alkalinity.value}
            </span>
            <span className="text-xs text-slate-400">ppm</span>
          </div>

          <div className="flex items-center space-x-2 p-2 rounded-lg bg-slate-900/60 border border-slate-800 text-[11px]">
            <div
              className="w-5 h-5 rounded-md border border-white/20 shadow-sm"
              style={{ backgroundColor: parameters.alkalinity.measuredColorHex }}
            />
            <span className="text-slate-300 text-[11px]">
              {parameters.alkalinity.value >= 80 ? 'Optimal Buffering' : 'Low Buffer'}
            </span>
          </div>

          <p className="text-[11px] text-slate-400 leading-snug">
            {lang === 'hi' ? 'प्राकृतिक बफरिंग एसिडिटी को रोकती है और नलों को जंग से बचाती है।' : 'Natural buffering stabilizes pH and prevents pipe degradation.'}
          </p>
        </div>
      </div>

      {/* Filtration & Remediation Recommendations */}
      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <Filter className="w-4 h-4 text-cyan-400" />
          <h3 className="text-sm font-bold uppercase tracking-wider text-white">
            {t.filtrationTitle}
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {recommendations.map((rec, idx) => (
            <div
              key={rec.id || idx}
              className="p-4 rounded-xl glass-panel border border-slate-800 hover:border-cyan-500/40 transition-colors flex items-start space-x-3"
            >
              <div
                className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                  rec.urgency === 'high'
                    ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                    : rec.urgency === 'medium'
                    ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                    : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                }`}
              >
                {rec.id === 'direct_drink' ? (
                  <CheckCircle2 className="w-5 h-5" />
                ) : rec.id === 'req_ro' ? (
                  <Filter className="w-5 h-5" />
                ) : rec.id.includes('boil') ? (
                  <Flame className="w-5 h-5" />
                ) : (
                  <Sparkles className="w-5 h-5" />
                )}
              </div>

              <div className="space-y-1">
                <h4 className="text-xs font-bold text-white">
                  {lang === 'hi' ? rec.titleHi : rec.title}
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {lang === 'hi' ? rec.descHi : rec.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
