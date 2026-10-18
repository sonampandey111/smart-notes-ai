import React from 'react';
import { X, Printer, ShieldCheck, ShieldAlert, AlertTriangle, Droplet, CheckCircle2 } from 'lucide-react';

export default function WaterReportModal({ isOpen, onClose, analysisResult, lang }) {
  if (!isOpen || !analysisResult) return null;

  const { parameters, evaluation, capturedPreviewUrl, timestamp } = analysisResult;
  const sampleId = 'AQ-' + (timestamp ? new Date(timestamp).getTime().toString().slice(-6) : '892411');
  const dateStr = timestamp ? new Date(timestamp).toLocaleString() : new Date().toLocaleString();

  const handlePrint = () => {
    window.print();
  };

  const isSafe = evaluation.status === 'safe';
  const isModerate = evaluation.status === 'moderate';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl my-8 bg-white text-slate-900 rounded-2xl shadow-2xl overflow-hidden border border-slate-200 print:m-0 print:border-none print:shadow-none">
        {/* Modal Controls (Hidden in Print) */}
        <div className="flex items-center justify-between p-4 bg-slate-900 text-white no-print">
          <div className="flex items-center space-x-2">
            <Droplet className="w-5 h-5 text-cyan-400" />
            <span className="font-bold text-sm">
              {lang === 'hi' ? 'वाटर हेल्थ सर्टिफिकेट प्रिव्यू' : 'Water Health Certificate & Lab Report'}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs flex items-center space-x-1.5 transition-colors shadow-md"
            >
              <Printer className="w-4 h-4" />
              <span>{lang === 'hi' ? 'प्रिंट करें / PDF सेव करें' : 'Print / Save PDF'}</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Certificate Document */}
        <div className="p-8 sm:p-10 space-y-6 bg-white text-slate-900">
          {/* Certificate Header */}
          <div className="flex items-start justify-between border-b-2 border-cyan-600 pb-5">
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-lg bg-cyan-600 flex items-center justify-center text-white font-bold">
                  💧
                </div>
                <h1 className="text-2xl font-black tracking-tight text-slate-900">
                  AquaStrip AI
                </h1>
              </div>
              <p className="text-xs font-semibold text-cyan-700 tracking-wider uppercase">
                Autonomous Optical Water Quality Diagnostic Laboratory
              </p>
              <p className="text-[11px] text-slate-500">
                Calibrated Computer Vision & CIE L*a*b* Colorimetric Analysis
              </p>
            </div>

            <div className="text-right space-y-1">
              <div className="inline-block px-2.5 py-1 rounded bg-slate-100 border border-slate-300 font-mono text-xs font-bold text-slate-800">
                SAMPLE #{sampleId}
              </div>
              <p className="text-[11px] text-slate-500">{dateStr}</p>
              <p className="text-[10px] text-slate-400">Spec: WHO / BIS IS 10500:2012</p>
            </div>
          </div>

          {/* Safety Status Banner */}
          <div
            className={`p-4 rounded-xl border-2 flex items-center justify-between ${
              isSafe
                ? 'bg-emerald-50 border-emerald-500 text-emerald-900'
                : isModerate
                ? 'bg-amber-50 border-amber-500 text-amber-900'
                : 'bg-rose-50 border-rose-500 text-rose-900'
            }`}
          >
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider block opacity-75">
                Official Safety Verdict
              </span>
              <h2 className="text-lg font-black tracking-tight">
                {evaluation.statusBadge}
              </h2>
              <p className="text-xs max-w-md leading-relaxed">
                {evaluation.healthSummary}
              </p>
            </div>

            <div className="text-center px-4 py-2 rounded-lg bg-white/80 border border-slate-300 shadow-sm shrink-0">
              <div className="text-2xl font-black text-slate-900">
                {evaluation.potabilityScore}%
              </div>
              <div className="text-[9px] font-bold uppercase text-slate-500">
                WQI Potability
              </div>
            </div>
          </div>

          {/* Parameters Table */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Laboratory Parameter Breakdown
            </h3>
            <div className="border border-slate-200 rounded-lg overflow-hidden shadow-sm">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                  <tr>
                    <th className="p-2.5">Parameter Tested</th>
                    <th className="p-2.5">Measured Value</th>
                    <th className="p-2.5">Optical Color</th>
                    <th className="p-2.5">Standard Limit</th>
                    <th className="p-2.5 text-right">Result Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {/* pH */}
                  <tr>
                    <td className="p-2.5 font-bold text-slate-900">pH Level (Acidity/Alkalinity)</td>
                    <td className="p-2.5 font-mono font-bold text-slate-900">{parameters.ph.value}</td>
                    <td className="p-2.5">
                      <div className="flex items-center space-x-1.5">
                        <div
                          className="w-4 h-4 rounded border border-slate-300 shadow-sm"
                          style={{ backgroundColor: parameters.ph.measuredColorHex }}
                        />
                        <span className="font-mono text-[10px] text-slate-500">
                          {parameters.ph.measuredColorHex}
                        </span>
                      </div>
                    </td>
                    <td className="p-2.5 text-slate-600">6.5 - 8.5 (WHO)</td>
                    <td className="p-2.5 text-right">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-slate-100 border">
                        {evaluation.parameterBreakdown.ph.status}
                      </span>
                    </td>
                  </tr>

                  {/* Hardness */}
                  <tr>
                    <td className="p-2.5 font-bold text-slate-900">Total Hardness (CaCO₃)</td>
                    <td className="p-2.5 font-mono font-bold text-slate-900">{parameters.hardness.value} ppm</td>
                    <td className="p-2.5">
                      <div className="flex items-center space-x-1.5">
                        <div
                          className="w-4 h-4 rounded border border-slate-300 shadow-sm"
                          style={{ backgroundColor: parameters.hardness.measuredColorHex }}
                        />
                        <span className="font-mono text-[10px] text-slate-500">
                          {parameters.hardness.measuredColorHex}
                        </span>
                      </div>
                    </td>
                    <td className="p-2.5 text-slate-600">&lt; 200 ppm (Desirable)</td>
                    <td className="p-2.5 text-right">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-slate-100 border">
                        {evaluation.parameterBreakdown.hardness.status}
                      </span>
                    </td>
                  </tr>

                  {/* Chlorine */}
                  <tr>
                    <td className="p-2.5 font-bold text-slate-900">Free Available Chlorine</td>
                    <td className="p-2.5 font-mono font-bold text-slate-900">{parameters.chlorine.value} ppm</td>
                    <td className="p-2.5">
                      <div className="flex items-center space-x-1.5">
                        <div
                          className="w-4 h-4 rounded border border-slate-300 shadow-sm"
                          style={{ backgroundColor: parameters.chlorine.measuredColorHex }}
                        />
                        <span className="font-mono text-[10px] text-slate-500">
                          {parameters.chlorine.measuredColorHex}
                        </span>
                      </div>
                    </td>
                    <td className="p-2.5 text-slate-600">0.2 - 0.5 ppm (WHO)</td>
                    <td className="p-2.5 text-right">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-slate-100 border">
                        {evaluation.parameterBreakdown.chlorine.status}
                      </span>
                    </td>
                  </tr>

                  {/* Alkalinity */}
                  <tr>
                    <td className="p-2.5 font-bold text-slate-900">Total Alkalinity</td>
                    <td className="p-2.5 font-mono font-bold text-slate-900">{parameters.alkalinity.value} ppm</td>
                    <td className="p-2.5">
                      <div className="flex items-center space-x-1.5">
                        <div
                          className="w-4 h-4 rounded border border-slate-300 shadow-sm"
                          style={{ backgroundColor: parameters.alkalinity.measuredColorHex }}
                        />
                        <span className="font-mono text-[10px] text-slate-500">
                          {parameters.alkalinity.measuredColorHex}
                        </span>
                      </div>
                    </td>
                    <td className="p-2.5 text-slate-600">60 - 200 ppm</td>
                    <td className="p-2.5 text-right">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-slate-100 border">
                        {evaluation.parameterBreakdown.alkalinity.status}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Filtration & Remediation Guidance */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Recommended Household Filtration Protocol
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {evaluation.recommendations.map((rec, i) => (
                <div key={i} className="p-2.5 rounded-lg border border-slate-200 bg-slate-50">
                  <div className="font-bold text-slate-800">{rec.title}</div>
                  <p className="text-[11px] text-slate-600 mt-0.5">{rec.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Certificate Footer & Seal */}
          <div className="pt-6 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
            <div>
              <p className="font-semibold text-slate-700">AquaStrip AI Automated Diagnostic Engine</p>
              <p className="text-[10px]">Method: Smartphone RGB Computer Vision & CIE L*a*b* ΔE Color Matching</p>
            </div>

            <div className="text-right">
              <div className="inline-block px-3 py-1 rounded-full border border-emerald-600 text-emerald-700 font-bold text-[10px] uppercase">
                ✓ Digitally Certified
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
