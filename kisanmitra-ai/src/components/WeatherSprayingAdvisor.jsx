import React from 'react';
import { translations } from '../data/translations';
import { speakText, stopSpeaking } from '../services/speechService';
import {
  CloudSun,
  CloudRain,
  Wind,
  Droplets,
  Thermometer,
  ShieldCheck,
  AlertTriangle,
  XCircle,
  Clock,
  Sparkles,
  Volume2
} from 'lucide-react';

export default function WeatherSprayingAdvisor({ lang, weatherData, selectedRegion }) {
  const t = translations[lang];

  if (!weatherData) return null;

  const { temp, humidity, windSpeed, rainProb, sprayAdvice, forecast } = weatherData;

  const getStatusBadge = () => {
    switch (sprayAdvice.status) {
      case 'SAFE':
        return {
          icon: ShieldCheck,
          text: t.spraySafe,
          bg: 'bg-emerald-500',
          border: 'border-emerald-600',
          textColor: 'text-emerald-950',
          cardBg: 'bg-emerald-50/70'
        };
      case 'CAUTION':
        return {
          icon: AlertTriangle,
          text: t.sprayCaution,
          bg: 'bg-amber-500',
          border: 'border-amber-600',
          textColor: 'text-amber-950',
          cardBg: 'bg-amber-50/70'
        };
      default:
        return {
          icon: XCircle,
          text: t.sprayAvoid,
          bg: 'bg-rose-500',
          border: 'border-rose-600',
          textColor: 'text-rose-950',
          cardBg: 'bg-rose-50/70'
        };
    }
  };

  const statusBadge = getStatusBadge();
  const StatusIcon = statusBadge.icon;

  const playWeatherAudio = () => {
    const text = lang === 'hi'
      ? `मौसम सलाहकार: ${selectedRegion.name_hi} में तापमान ${temp} डिग्री, नमी ${humidity} प्रतिशत, हवा ${windSpeed} किलोमीटर प्रति घंटा है। छिड़काव सलाह: ${sprayAdvice.reason_hi}`
      : `Weather advisory for ${selectedRegion.name_en}: Temperature is ${temp} degrees Celsius, humidity ${humidity} percent, wind speed ${windSpeed} km/h. Spraying advice: ${sprayAdvice.reason_en}`;
    speakText(text, lang);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-200">
        <div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-800 flex items-center gap-2">
            <CloudSun className="w-6 h-6 text-amber-500" />
            <span>{t.weatherTitle}</span>
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
            {t.weatherSubtitle} — <span className="font-semibold text-emerald-700">{lang === 'hi' ? selectedRegion.name_hi : selectedRegion.name_en}</span>
          </p>
        </div>

        <button
          onClick={playWeatherAudio}
          className="flex items-center gap-2 bg-emerald-100 hover:bg-emerald-200 text-emerald-900 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all self-start sm:self-auto cursor-pointer"
        >
          <Volume2 className="w-4 h-4 text-emerald-700" />
          <span>{t.listenAudio}</span>
        </button>
      </div>

      {/* Main Suitability Banner Card */}
      <div className={`rounded-2xl border-2 ${statusBadge.border} ${statusBadge.cardBg} p-6 shadow-sm`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-extrabold text-white shadow-xs uppercase tracking-wide bg-gradient-to-r from-slate-900 to-slate-800">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>{t.spraySuitability}</span>
            </div>

            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-2xl ${statusBadge.bg} text-white flex items-center justify-center shadow-md`}>
                <StatusIcon className="w-7 h-7" />
              </div>
              <div>
                <h4 className="text-xl sm:text-2xl font-black text-slate-900">
                  {statusBadge.text}
                </h4>
                <p className="text-xs sm:text-sm font-semibold text-slate-700 mt-0.5">
                  {lang === 'hi' ? sprayAdvice.reason_hi : sprayAdvice.reason_en}
                </p>
              </div>
            </div>
          </div>

          {/* Suitability Gauge Score */}
          <div className="bg-white/80 backdrop-blur-xs p-4 rounded-2xl border border-slate-200/80 flex flex-col items-center justify-center min-w-[170px] shadow-xs">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">
              {lang === 'hi' ? 'छिड़काव अनुकूलता' : 'Suitability Index'}
            </span>
            <div className="text-3xl sm:text-4xl font-black text-emerald-700 my-1">
              {sprayAdvice.score}
              <span className="text-sm font-semibold text-slate-400">/100</span>
            </div>
            <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden mt-1">
              <div
                className={`h-full rounded-full transition-all duration-700 ${statusBadge.bg}`}
                style={{ width: `${sprayAdvice.score}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* 4 Real-time Weather Parameters */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-5 border-t border-slate-200/70">
          <div className="bg-white p-3.5 rounded-xl border border-slate-100 shadow-2xs">
            <div className="flex items-center justify-between text-slate-500 mb-1">
              <span className="text-xs font-semibold">{t.temperature}</span>
              <Thermometer className="w-4 h-4 text-rose-500" />
            </div>
            <div className="text-xl font-extrabold text-slate-800">{temp}°C</div>
            <span className="text-[10px] text-slate-500">
              {temp > 32 ? (lang === 'hi' ? 'गर्म' : 'Warm') : (lang === 'hi' ? 'अनुकूल' : 'Optimal')}
            </span>
          </div>

          <div className="bg-white p-3.5 rounded-xl border border-slate-100 shadow-2xs">
            <div className="flex items-center justify-between text-slate-500 mb-1">
              <span className="text-xs font-semibold">{t.rainRisk}</span>
              <CloudRain className="w-4 h-4 text-blue-500" />
            </div>
            <div className="text-xl font-extrabold text-slate-800">{rainProb}%</div>
            <span className="text-[10px] text-slate-500">
              {rainProb < 20 ? (lang === 'hi' ? 'बारिश का खतरा नहीं' : 'No rain risk') : (lang === 'hi' ? 'बारिश संभव' : 'Rain likely')}
            </span>
          </div>

          <div className="bg-white p-3.5 rounded-xl border border-slate-100 shadow-2xs">
            <div className="flex items-center justify-between text-slate-500 mb-1">
              <span className="text-xs font-semibold">{t.windSpeed}</span>
              <Wind className="w-4 h-4 text-teal-500" />
            </div>
            <div className="text-xl font-extrabold text-slate-800">{windSpeed} km/h</div>
            <span className="text-[10px] text-slate-500">
              {windSpeed < 12 ? (lang === 'hi' ? 'हवा शांत है' : 'Gentle breeze') : (lang === 'hi' ? 'मध्यम तेज' : 'Breezy')}
            </span>
          </div>

          <div className="bg-white p-3.5 rounded-xl border border-slate-100 shadow-2xs">
            <div className="flex items-center justify-between text-slate-500 mb-1">
              <span className="text-xs font-semibold">{t.humidity}</span>
              <Droplets className="w-4 h-4 text-cyan-500" />
            </div>
            <div className="text-xl font-extrabold text-slate-800">{humidity}%</div>
            <span className="text-[10px] text-slate-500">
              {humidity >= 45 && humidity <= 75 ? (lang === 'hi' ? 'दवा के लिए आदर्श' : 'Ideal absorption') : (lang === 'hi' ? 'सावधानी' : 'Moderate')}
            </span>
          </div>
        </div>
      </div>

      {/* Best Spray Hours & 5-Day Forecast */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Recommended Golden Hours */}
        <div className="md:col-span-5 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <h4 className="text-sm font-bold text-slate-800 flex items-center gap-2">
            <Clock className="w-4 h-4 text-emerald-600" />
            <span>{lang === 'hi' ? 'आज छिड़काव के सर्वोत्तम घंटे' : 'Best Spraying Time Windows Today'}</span>
          </h4>

          <div className="space-y-3 text-xs">
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
              <div>
                <span className="font-bold text-emerald-950 block text-sm">
                  {lang === 'hi' ? 'प्रातः काल: 06:30 AM - 09:30 AM' : 'Morning: 06:30 AM - 09:30 AM'}
                </span>
                <span className="text-emerald-700">
                  {lang === 'hi' ? 'ओस सूखने के तुरंत बाद, शांत हवा व पौधों द्वारा अधिकतम अवशोषण' : 'Dew dried, zero wind, maximum stomatal absorption'}
                </span>
              </div>
              <span className="bg-emerald-600 text-white font-bold px-2 py-1 rounded-md text-[10px]">
                {lang === 'hi' ? 'उत्तम' : 'Prime'}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-teal-50 border border-teal-200 flex items-center justify-between">
              <div>
                <span className="font-bold text-teal-950 block text-sm">
                  {lang === 'hi' ? 'सायंकाल: 04:30 PM - 06:30 PM' : 'Evening: 04:30 PM - 06:30 PM'}
                </span>
                <span className="text-teal-700">
                  {lang === 'hi' ? 'धूप की तीव्रता कम होने पर, पत्ती जलने का खतरा शून्य' : 'Sun intensity subsides, no leaf scorch'}
                </span>
              </div>
              <span className="bg-teal-600 text-white font-bold px-2 py-1 rounded-md text-[10px]">
                {lang === 'hi' ? 'अच्छा' : 'Good'}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800">
              <span className="font-bold block">
                {lang === 'hi' ? 'दोपहर 12:00 PM से 03:30 PM तक कभी न छिड़कें' : 'Avoid Midday 12:00 PM - 03:30 PM'}
              </span>
              <span>
                {lang === 'hi' ? 'तेज धूप में दवा तुरंत वाष्पीकृत हो जाती है और पौधे झुलस सकते हैं।' : 'High evaporative loss and risk of phytotoxicity.'}
              </span>
            </div>
          </div>
        </div>

        {/* 5-Day Weather Forecast */}
        <div className="md:col-span-7 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <h4 className="text-sm font-bold text-slate-800 flex items-center gap-2">
            <CloudSun className="w-4 h-4 text-emerald-600" />
            <span>{t.forecast5Days}</span>
          </h4>

          <div className="grid grid-cols-5 gap-2">
            {forecast.map((day, idx) => (
              <div
                key={idx}
                className={`p-2.5 rounded-xl border text-center transition-all ${
                  idx === 0 
                    ? 'border-emerald-500 bg-emerald-50/50 shadow-2xs font-bold' 
                    : 'border-slate-200 bg-slate-50/70 hover:bg-slate-100'
                }`}
              >
                <div className="text-[11px] font-bold text-slate-700 truncate mb-1">
                  {lang === 'hi' ? day.date : day.date_en}
                </div>
                <CloudSun className="w-5 h-5 mx-auto text-amber-500 my-1" />
                <div className="text-xs font-extrabold text-slate-900">
                  {day.maxTemp}°
                </div>
                <div className="text-[10px] text-slate-500">
                  {day.minTemp}°
                </div>
                <div className="mt-2 pt-1 border-t border-slate-200 text-[10px] font-semibold text-blue-600 flex items-center justify-center gap-0.5">
                  <Droplets className="w-2.5 h-2.5" />
                  <span>{day.rainProb}%</span>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs text-slate-600 flex items-center justify-between">
            <span>
              {lang === 'hi' 
                ? '💡 सलाह: अगले 48 घंटों में बारिश की संभावना 15% से कम है, उर्वरक व फफूंदनाशक छिड़कने की योजना बना सकते हैं।' 
                : '💡 Tip: Rain probability remains under 15% for next 48 hours; ideal window for foliar fungicide sprays.'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
