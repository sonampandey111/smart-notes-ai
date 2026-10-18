import React from 'react';
import { X, Cpu, Smartphone, Sparkles, Filter, Droplet, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function HowItWorksModal({ isOpen, onClose, lang }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-3xl max-h-[90vh] flex flex-col rounded-2xl glass-panel-elevated border border-slate-700 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-slate-800 bg-slate-900/80">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                {lang === 'hi' ? 'AquaStrip AI कैसे काम करता है?' : 'How AquaStrip AI Works'}
              </h3>
              <p className="text-xs text-slate-400">
                {lang === 'hi'
                  ? '₹5-10 की साधारण स्ट्रिप और कंप्यूटर विज़न तकनीक का अद्भुत संगम'
                  : 'Low-cost hardware + smartphone computer vision = pure innovation'}
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

        {/* Modal Body */}
        <div className="overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* Step Progression Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Step 1 */}
            <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-400 font-bold flex items-center justify-center text-xs border border-cyan-500/30">
                01
              </div>
              <h4 className="text-sm font-bold text-white">
                {lang === 'hi' ? '1. ₹5 की स्ट्रिप पानी में डुबाएं' : '1. Dip ₹5 Test Strip'}
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                {lang === 'hi'
                  ? 'बाजार या दवा की दुकान से मिलने वाली साधारण लिटमस या 4-in-1 टेस्ट स्ट्रिप को पीने के पानी में 2 सेकंड डुबोएं और अतिरिक्त पानी झटक दें।'
                  : 'Dip an inexpensive ₹5-10 litmus or multi-pad chemical test strip into water for 2 seconds and gently shake excess droplets.'}
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-sky-500/20 text-sky-400 font-bold flex items-center justify-center text-xs border border-sky-500/30">
                02
              </div>
              <h4 className="text-sm font-bold text-white">
                {lang === 'hi' ? '2. फोन कैमरे के आगे रखें' : '2. Hold Before Camera'}
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                {lang === 'hi'
                  ? 'स्ट्रिप को स्क्रीन पर बने गाइड बॉक्स के बीच में लाएं। हमारा ऑटो-अलाइनमेंट व्यूफाइंडर रासायनिक पैड के स्थान को डिटेक्ट करता है।'
                  : 'Position strip inside the neon viewfinder frame. The app auto-aligns sampling zones with ambient glare and shadow compensation.'}
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center text-xs border border-emerald-500/30">
                03
              </div>
              <h4 className="text-sm font-bold text-white">
                {lang === 'hi' ? '3. तत्काल परिणाम और सलाह' : '3. Instant AI Verdict'}
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                {lang === 'hi'
                  ? 'CIE L*a*b* कलरिमेट्रिक एल्गोरिद्म रंग का मिलान करके pH, हार्डनेस और क्लोरीन का मान देता है और बताता है कि उबालना या RO लगाना जरूरी है।'
                  : 'CIE L*a*b* Delta-E colorimetric matching identifies exact parameter levels, Potability Index, and filtration prescriptions in 2 seconds.'}
              </p>
            </div>
          </div>

          {/* Technical Architecture Breakdown */}
          <div className="p-4 sm:p-5 rounded-xl glass-panel border border-cyan-500/20 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center space-x-1.5">
              <Smartphone className="w-4 h-4" />
              <span>{lang === 'hi' ? 'कंप्यूटर विज़न और कलरिमेट्रिक तकनीक (Technical Pipeline)' : 'Computer Vision & Optical Pipeline'}</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-300">
              <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 space-y-1">
                <span className="font-bold text-white block">1. Glare & Specular Filtering</span>
                <p className="text-slate-400">
                  Filters wet reflections and harsh glare by pruning high-luminance outliers (&gt;92% brightness) and deep shadows (&lt;15% brightness).
                </p>
              </div>

              <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 space-y-1">
                <span className="font-bold text-white block">2. CIE L*a*b* & Delta-E Matching</span>
                <p className="text-slate-400">
                  Standard sRGB is non-linear to human perception. Converting to CIE L*a*b* enables Euclidean Delta-E perceptual distance calculations.
                </p>
              </div>

              <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 space-y-1">
                <span className="font-bold text-white block">3. Continuous Interpolation</span>
                <p className="text-slate-400">
                  Instead of snapping to coarse integers, inverse distance weighting interpolates intermediate values (e.g., pH 7.3 between 7.0 and 8.0).
                </p>
              </div>

              <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 space-y-1">
                <span className="font-bold text-white block">4. WHO / BIS Decision Tree</span>
                <p className="text-slate-400">
                  Maps measured parameters to BIS IS 10500:2012 thresholds to determine whether boiling, carbon filtration, or RO is mandatory.
                </p>
              </div>
            </div>
          </div>

          {/* Hackathon Pitch Quote */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-cyan-950/40 via-sky-950/30 to-slate-900 border border-cyan-500/30 text-center space-y-1.5">
            <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider">
              {lang === 'hi' ? 'हैकथॉन यूएसपी (Hackathon USP)' : 'Hackathon USP'}
            </span>
            <p className="text-sm font-semibold text-white">
              "Democratizing safe drinking water testing for 1.4 billion people with ₹5 test strips and the phone camera in their pocket."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
