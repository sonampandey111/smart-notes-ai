import React from 'react';
import { Sparkles, TrendingDown, Clock, ShieldCheck, Zap } from 'lucide-react';

export default function CostSavingsBanner({ lang, t }) {
  return (
    <div className="relative overflow-hidden rounded-2xl glass-panel-elevated p-4 sm:p-6 mb-8 border border-cyan-500/30 bg-gradient-to-r from-slate-900/90 via-cyan-950/30 to-slate-900/90 shadow-xl">
      {/* Background ambient decorative glow */}
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6">
        {/* Left: Hackathon Problem & Innovation Pitch */}
        <div className="space-y-2 text-center lg:text-left">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold">
            <Zap className="w-3.5 h-3.5 text-cyan-400" />
            <span>{lang === 'hi' ? 'हैकथॉन इनोवेशन: ₹5 हार्डवेयर + AI विजन' : 'Hackathon USP: ₹5 Hardware + AI Vision'}</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            {lang === 'hi'
              ? 'महंगी लैब टेस्टिंग बंद — अब फोन कैमरा से तत्काल पानी जांच'
              : 'Zero-Lab Water Testing via ₹5 Litmus Strip & Camera'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
            {lang === 'hi'
              ? 'बाजार में मिलने वाली ₹5-10 की स्ट्रिप को पानी में डुबोकर कैमरे के सामने रखें। हमारा CIE L*a*b* कलरिमेट्रिक विज़न एल्गोरिद्म pH, हार्डनेस और क्लोरीन का सटीक स्तर मापकर शुद्धता व RO फिल्टर की आवश्यकता बताता है।'
              : 'Dip a standard ₹5 litmus/chemical strip in water and hold it before your camera. Computer vision matches RGB shades against calibrated colorimetric charts to diagnose potability, toxicity, and filtration needs in 2 seconds.'}
          </p>
        </div>

        {/* Right: Quick Contrast Cards */}
        <div className="grid grid-cols-2 gap-3 w-full sm:w-auto shrink-0">
          {/* Traditional Lab */}
          <div className="p-3.5 rounded-xl bg-slate-900/80 border border-rose-500/20 text-center">
            <span className="text-[11px] font-semibold text-rose-400 uppercase tracking-wider block mb-1">
              {lang === 'hi' ? 'पारंपरिक लैब' : 'Traditional Lab'}
            </span>
            <div className="text-lg sm:text-xl font-extrabold text-white">
              ₹800 - ₹2,500
            </div>
            <div className="flex items-center justify-center space-x-1 text-[11px] text-slate-400 mt-1">
              <Clock className="w-3 h-3 text-rose-400" />
              <span>3 - 5 Days Wait</span>
            </div>
          </div>

          {/* AquaStrip AI */}
          <div className="p-3.5 rounded-xl bg-gradient-to-b from-cyan-950/60 to-emerald-950/40 border border-cyan-400/40 text-center relative shadow-lg shadow-cyan-950/50">
            <span className="absolute -top-2 right-2 px-1.5 py-0.5 rounded-full bg-emerald-500 text-[9px] font-bold text-slate-950">
              99.4% SAVINGS
            </span>
            <span className="text-[11px] font-semibold text-cyan-300 uppercase tracking-wider block mb-1">
              AquaStrip AI
            </span>
            <div className="text-lg sm:text-xl font-extrabold text-emerald-400">
              ₹5 - ₹10
            </div>
            <div className="flex items-center justify-center space-x-1 text-[11px] text-cyan-300 mt-1">
              <Sparkles className="w-3 h-3 text-emerald-400" />
              <span>Instant 2 Seconds</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
