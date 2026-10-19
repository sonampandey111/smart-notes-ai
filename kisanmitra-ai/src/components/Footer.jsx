import React from 'react';
import { Phone, ShieldCheck, Heart, ExternalLink, Sprout } from 'lucide-react';

export default function Footer({ lang }) {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-white/80 backdrop-blur-xs text-slate-600">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {/* Col 1 */}
          <div className="space-y-2 md:col-span-2">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center">
                <Sprout className="w-4 h-4" />
              </div>
              <h5 className="font-extrabold text-slate-900 text-base">
                {lang === 'hi' ? 'किसान मित्र AI (KisanMitra AI)' : 'KisanMitra AI'}
              </h5>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed max-w-md">
              {lang === 'hi' 
                ? 'कंप्यूटर विज़न, उपग्रह डेटा और मौसम विश्लेषण द्वारा संचालित संपूर्ण डिजिटल कृषि सलाहकार। 10 करोड़ किसान भाइयों को समर्पित।'
                : 'Empowering 100 million farmers with AI Computer Vision leaf pathology, real-time weather spray windows, satellite NDVI, and direct APMC mandi trading.'}
            </p>
          </div>

          {/* Col 2: Kisan Helpline */}
          <div className="space-y-2 bg-emerald-50/70 p-3.5 rounded-xl border border-emerald-100">
            <span className="text-[11px] font-bold text-emerald-900 uppercase tracking-wider block">
              {lang === 'hi' ? 'सरकारी किसान कॉल सेंटर (Helpline)' : 'Kisan Call Center Helpline'}
            </span>
            <div className="flex items-center gap-2 text-emerald-800 font-black text-base">
              <Phone className="w-4 h-4 text-emerald-700 animate-pulse" />
              <span>1800-180-1551 (1551)</span>
            </div>
            <span className="text-[10px] text-emerald-700 block">
              {lang === 'hi' ? 'सुबह 6:00 से रात 10:00 बजे तक (निःशुल्क)' : '6:00 AM to 10:00 PM (Toll Free)'}
            </span>
          </div>

          {/* Col 3: Portal Links */}
          <div className="space-y-1.5 text-xs">
            <span className="font-bold text-slate-800 block mb-1">
              {lang === 'hi' ? 'महत्वपूर्ण कृषि पोर्टल' : 'Official Agri Portals'}
            </span>
            <a
              href="https://enam.gov.in"
              target="_blank"
              rel="noreferrer"
              className="text-emerald-700 hover:underline flex items-center gap-1"
            >
              <span>e-NAM राष्ट्रीय कृषि बाजार</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <a
              href="https://pmkisan.gov.in"
              target="_blank"
              rel="noreferrer"
              className="text-emerald-700 hover:underline flex items-center gap-1"
            >
              <span>PM-Kisan सम्मान निधि</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <a
              href="https://pmfby.gov.in"
              target="_blank"
              rel="noreferrer"
              className="text-emerald-700 hover:underline flex items-center gap-1"
            >
              <span>प्रधानमंत्री फसल बीमा योजना</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-200/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p>© 2026 KisanMitra AI. Open-source AgriTech for Indian Agriculture.</p>
          <div className="flex items-center gap-1 text-slate-600 font-medium">
            <span>Built with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>for Indian Farmers</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
