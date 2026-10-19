import React, { useState, useRef, useEffect } from 'react';
import { translations } from '../data/translations';
import { cropDiseases } from '../data/cropDiseases';
import { analyzeLeafImage } from '../services/visionService';
import { speakText, stopSpeaking, isSpeaking } from '../services/speechService';
import {
  Camera,
  Upload,
  Sparkles,
  Volume2,
  VolumeX,
  AlertTriangle,
  CheckCircle2,
  RefreshCw,
  TrendingUp,
  CloudSun,
  ShieldAlert,
  Beaker,
  Leaf,
  Layers
} from 'lucide-react';

// Pre-built SVGs/Data URLs for instant high-quality leaf disease demos
const SAMPLE_LEAVES = [
  {
    id: "leaf-blight",
    title_hi: "धान/गेहूं पत्ती झुलसा (Leaf Blight)",
    title_en: "Rice Leaf Blight (Sample)",
    crop: "Rice / Wheat",
    badge: "Key Demo",
    color: "from-amber-600 to-yellow-800",
    svgPreview: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {/* Leaf blade */}
        <path d="M 50,5 Q 85,35 65,85 Q 50,95 35,85 Q 15,35 50,5 Z" fill="#4d7c0f" stroke="#365314" strokeWidth="2" />
        {/* Midrib */}
        <path d="M 50,5 Q 50,50 50,95" stroke="#a3e635" strokeWidth="2.5" fill="none" />
        {/* Leaf Blight Lesions (Brown elongated necrotic patches with yellow halo) */}
        <ellipse cx="62" cy="40" rx="9" ry="18" fill="#78350f" transform="rotate(15 62 40)" opacity="0.9" />
        <ellipse cx="62" cy="40" rx="12" ry="21" fill="none" stroke="#facc15" strokeWidth="2" transform="rotate(15 62 40)" />
        <ellipse cx="40" cy="62" rx="7" ry="14" fill="#78350f" transform="rotate(-20 40 62)" opacity="0.9" />
        <ellipse cx="40" cy="62" rx="10" ry="17" fill="none" stroke="#facc15" strokeWidth="2" transform="rotate(-20 40 62)" />
        <ellipse cx="56" cy="72" rx="5" ry="10" fill="#92400e" opacity="0.8" />
      </svg>
    )
  },
  {
    id: "early-blight-tomato",
    title_hi: "टमाटर अगेती झुलसा (Early Blight)",
    title_en: "Tomato Early Blight",
    crop: "Tomato",
    badge: "Target Spot",
    color: "from-orange-600 to-amber-700",
    svgPreview: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <path d="M 50,10 C 80,20 85,60 55,90 C 45,95 35,90 20,65 C 15,35 30,15 50,10 Z" fill="#65a30d" stroke="#365314" strokeWidth="2" />
        <circle cx="50" cy="45" r="14" fill="#451a03" />
        <circle cx="50" cy="45" r="10" fill="none" stroke="#ca8a04" strokeWidth="2" />
        <circle cx="50" cy="45" r="5" fill="#78350f" />
        <circle cx="36" cy="65" r="8" fill="#451a03" />
        <circle cx="36" cy="65" r="5" fill="none" stroke="#ca8a04" strokeWidth="1.5" />
      </svg>
    )
  },
  {
    id: "brown-rust-wheat",
    title_hi: "गेहूं भूरा रतुआ (Brown Rust)",
    title_en: "Wheat Rust Pustules",
    crop: "Wheat",
    badge: "Fungal Spores",
    color: "from-red-600 to-amber-800",
    svgPreview: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <path d="M 45,5 Q 65,30 60,95 Q 50,98 40,95 Q 35,30 45,5 Z" fill="#84cc16" stroke="#3f6212" strokeWidth="2" />
        <ellipse cx="50" cy="30" rx="3" ry="6" fill="#b45309" />
        <ellipse cx="54" cy="45" rx="3" ry="7" fill="#b45309" />
        <ellipse cx="46" cy="55" rx="2.5" ry="6" fill="#b45309" />
        <ellipse cx="52" cy="70" rx="3" ry="8" fill="#b45309" />
        <ellipse cx="48" cy="80" rx="2.5" ry="5" fill="#b45309" />
      </svg>
    )
  },
  {
    id: "healthy-crop",
    title_hi: "स्वस्थ पत्ता (Healthy Leaf)",
    title_en: "Healthy Green Leaf",
    crop: "All Crops",
    badge: "100% Clean",
    color: "from-emerald-500 to-teal-700",
    svgPreview: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <path d="M 50,5 Q 85,35 65,85 Q 50,95 35,85 Q 15,35 50,5 Z" fill="#22c55e" stroke="#15803d" strokeWidth="2" />
        <path d="M 50,5 Q 50,50 50,95" stroke="#86efac" strokeWidth="2.5" fill="none" />
        <path d="M 50,35 Q 65,28 75,32" stroke="#86efac" strokeWidth="1.5" fill="none" />
        <path d="M 50,55 Q 35,48 25,52" stroke="#86efac" strokeWidth="1.5" fill="none" />
        <path d="M 50,70 Q 62,65 70,68" stroke="#86efac" strokeWidth="1.5" fill="none" />
      </svg>
    )
  }
];

export default function LeafScanner({ lang, setActiveTab }) {
  const t = translations[lang];

  const [mode, setMode] = useState('sample'); // 'sample' | 'camera' | 'upload'
  const [selectedSample, setSelectedSample] = useState(SAMPLE_LEAVES[0]);
  const [capturedImage, setCapturedImage] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanStepText, setScanStepText] = useState("");
  const [diagnosis, setDiagnosis] = useState(null);
  const [showLesionOverlay, setShowLesionOverlay] = useState(true);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  // Camera video ref
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState(null);

  // Auto-run initial sample diagnosis for immediate feedback
  useEffect(() => {
    runSampleAnalysis(SAMPLE_LEAVES[0]);
  }, []);

  // Cleanup speech on unmount
  useEffect(() => {
    return () => {
      stopSpeaking();
    };
  }, []);

  const startCamera = async () => {
    setCameraError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } }
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        setCameraActive(true);
      }
    } catch (err) {
      console.warn("Camera access error:", err);
      setCameraError(lang === 'hi' 
        ? "कैमरा शुरू नहीं हो सका। कृपया अनुमति दें या नमूना पत्ता / फाइल अपलोड का उपयोग करें।" 
        : "Camera access unavailable. Please grant permission or use Sample leaf / File upload.");
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setCameraActive(false);
  };

  const captureCameraPhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const video = videoRef.current;
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL('image/jpeg');
    setCapturedImage(dataUrl);
    stopCamera();
    runDiagnosis(dataUrl, null);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        const dataUrl = uploadEvent.target.result;
        setCapturedImage(dataUrl);
        runDiagnosis(dataUrl, null);
      };
      reader.readAsDataURL(file);
    }
  };

  const runSampleAnalysis = (sample) => {
    setSelectedSample(sample);
    setCapturedImage(null);
    runDiagnosis(null, sample.id);
  };

  const runDiagnosis = async (imageSrc, sampleId) => {
    setIsScanning(true);
    setDiagnosis(null);
    stopSpeaking();
    setIsAudioPlaying(false);

    setScanStepText(t.analyzingLeaf);
    setTimeout(() => {
      setScanStepText(t.detectingLesions);
    }, 600);

    const result = await analyzeLeafImage(imageSrc, sampleId);
    setDiagnosis(result);
    setIsScanning(false);
  };

  const handleToggleAudio = () => {
    if (isAudioPlaying) {
      stopSpeaking();
      setIsAudioPlaying(false);
    } else if (diagnosis) {
      const textToSpeak = lang === 'hi' 
        ? (diagnosis.audio_hi || `${diagnosis.name_hi}। ${diagnosis.chemical_treatment.medicine_name_hi}। मात्रा: ${diagnosis.chemical_treatment.dosage_hi}`)
        : (diagnosis.audio_en || `${diagnosis.name_en}. Recommended chemical: ${diagnosis.chemical_treatment.medicine_name_en}. Dosage: ${diagnosis.chemical_treatment.dosage_en}`);
      
      setIsAudioPlaying(true);
      speakText(textToSpeak, lang, () => {
        setIsAudioPlaying(false);
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Title & Description */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-200">
        <div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-800 flex items-center gap-2">
            <Camera className="w-6 h-6 text-emerald-600" />
            <span>{t.scanTitle}</span>
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
            {t.scanSubtitle}
          </p>
        </div>

        {/* Mode Selector */}
        <div className="flex items-center bg-slate-100 p-1 rounded-xl self-start sm:self-auto border border-slate-200 text-xs font-semibold">
          <button
            onClick={() => {
              stopCamera();
              setMode('sample');
            }}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              mode === 'sample' ? 'bg-white text-emerald-800 shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {t.sampleMode}
          </button>
          <button
            onClick={() => {
              setMode('camera');
              startCamera();
            }}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              mode === 'camera' ? 'bg-white text-emerald-800 shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {t.cameraMode}
          </button>
          <button
            onClick={() => {
              stopCamera();
              setMode('upload');
              fileInputRef.current?.click();
            }}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              mode === 'upload' ? 'bg-white text-emerald-800 shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {t.uploadMode}
          </button>
        </div>
      </div>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        accept="image/*"
        className="hidden"
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Input / Scanner Screen (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="relative rounded-2xl overflow-hidden bg-slate-950 aspect-4/3 flex items-center justify-center border-2 border-emerald-500/30 shadow-lg">
            {/* Live Camera View */}
            {mode === 'camera' && (
              <div className="relative w-full h-full">
                <video
                  ref={videoRef}
                  playsInline
                  autoPlay
                  muted
                  className="w-full h-full object-cover"
                />
                <canvas ref={canvasRef} className="hidden" />

                {cameraActive && (
                  <div className="absolute bottom-4 inset-x-0 flex justify-center">
                    <button
                      onClick={captureCameraPhoto}
                      className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-5 py-2.5 rounded-full shadow-lg cursor-pointer text-sm animate-pulse"
                    >
                      <Camera className="w-4 h-4" />
                      <span>{t.capturePhoto}</span>
                    </button>
                  </div>
                )}

                {cameraError && (
                  <div className="absolute inset-0 bg-slate-900/90 flex flex-col items-center justify-center p-4 text-center text-xs text-amber-200">
                    <AlertTriangle className="w-8 h-8 text-amber-400 mb-2" />
                    <p>{cameraError}</p>
                    <button
                      onClick={() => setMode('sample')}
                      className="mt-3 bg-emerald-600 text-white px-3 py-1.5 rounded-lg text-xs"
                    >
                      {t.sampleMode}
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Uploaded Image View */}
            {mode === 'upload' && (
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="w-full h-full flex flex-col items-center justify-center p-6 text-center cursor-pointer hover:bg-slate-900 transition-colors"
              >
                {capturedImage ? (
                  <img src={capturedImage} alt="Uploaded Leaf" className="w-full h-full object-contain" />
                ) : (
                  <div className="space-y-3 text-slate-400">
                    <div className="w-14 h-14 mx-auto rounded-full bg-slate-800 flex items-center justify-center text-emerald-400">
                      <Upload className="w-7 h-7" />
                    </div>
                    <p className="text-sm font-medium text-slate-300">{t.uploadPrompt}</p>
                    <span className="inline-block text-xs text-emerald-400 font-semibold bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-800">
                      JPG, PNG, WebP
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* Sample View */}
            {mode === 'sample' && selectedSample && (
              <div className="relative w-full h-full flex items-center justify-center p-4 bg-gradient-to-b from-slate-900 to-slate-950">
                <div className="w-52 h-52 relative">
                  {selectedSample.svgPreview}

                  {/* Bounding box overlays for simulated lesions */}
                  {showLesionOverlay && diagnosis?.detected_lesions?.map((lesion, idx) => (
                    <div
                      key={idx}
                      style={{
                        position: 'absolute',
                        left: `${lesion.x}%`,
                        top: `${lesion.y}%`,
                        width: `${lesion.w}%`,
                        height: `${lesion.h}%`
                      }}
                      className="border-2 border-dashed border-red-500 bg-red-500/20 rounded-md pointer-events-none animate-pulse flex items-start"
                    >
                      <span className="text-[9px] bg-red-600 text-white px-1 py-0.2 rounded-xs font-mono font-bold -mt-3.5 ml-1">
                        {lesion.label}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-xs text-emerald-300 text-[11px] font-semibold px-2.5 py-1 rounded-md border border-emerald-700/40">
                  {lang === 'hi' ? selectedSample.title_hi : selectedSample.title_en}
                </div>
              </div>
            )}

            {/* Laser Scanning Animation Overlay */}
            {isScanning && (
              <div className="absolute inset-0 pointer-events-none overflow-hidden bg-emerald-950/40 backdrop-blur-xs flex flex-col justify-between">
                <div className="w-full h-1 bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-500 shadow-[0_0_15px_#10b981] animate-scan-line"></div>
                <div className="m-4 self-center bg-slate-900/90 text-emerald-300 text-xs font-mono font-bold px-4 py-2 rounded-xl border border-emerald-500/50 flex items-center gap-2 shadow-xl">
                  <RefreshCw className="w-3.5 h-3.5 animate-spin text-emerald-400" />
                  <span>{scanStepText}</span>
                </div>
                <div className="h-1"></div>
              </div>
            )}
          </div>

          {/* Quick Sample Selector Buttons */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-600 font-semibold px-1">
              <span>{lang === 'hi' ? 'तुरंत परीक्षण के लिए पत्ता चुनें:' : 'Instant test samples:'}</span>
              {diagnosis && (
                <button
                  onClick={() => setShowLesionOverlay(!showLesionOverlay)}
                  className="text-emerald-700 hover:text-emerald-800 text-[11px] flex items-center gap-1 cursor-pointer font-medium"
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>{showLesionOverlay ? (lang === 'hi' ? 'धब्बे छिपाएं' : 'Hide Lesions') : (lang === 'hi' ? 'धब्बे दिखाएं' : 'Show Lesions')}</span>
                </button>
              )}
            </div>

            <div className="grid grid-cols-2 gap-2">
              {SAMPLE_LEAVES.map((sample) => (
                <button
                  key={sample.id}
                  onClick={() => {
                    setMode('sample');
                    runSampleAnalysis(sample);
                  }}
                  className={`p-2.5 rounded-xl text-left border transition-all cursor-pointer ${
                    mode === 'sample' && selectedSample?.id === sample.id
                      ? 'border-emerald-600 bg-emerald-50/80 shadow-xs ring-1 ring-emerald-500'
                      : 'border-slate-200 bg-white hover:border-emerald-300 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">
                      {sample.crop}
                    </span>
                    <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-bold ${
                      sample.id === 'leaf-blight' ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-700'
                    }`}>
                      {sample.badge}
                    </span>
                  </div>
                  <div className="text-xs font-bold text-slate-800 truncate">
                    {lang === 'hi' ? sample.title_hi : sample.title_en}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: AI Diagnosis, Prescriptions & Dosage (7 cols) */}
        <div className="lg:col-span-7">
          {diagnosis ? (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              {/* Diagnosis Header */}
              <div className="bg-gradient-to-r from-emerald-800 to-teal-900 text-white p-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-bold tracking-wider uppercase text-emerald-300">
                        {t.matchFound}
                      </span>
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                      <span className="text-xs text-slate-200">
                        {lang === 'hi' ? diagnosis.crop_hi : diagnosis.crop_en}
                      </span>
                    </div>
                    <h4 className="text-xl sm:text-2xl font-extrabold text-white">
                      {lang === 'hi' ? diagnosis.name_hi : diagnosis.name_en}
                    </h4>
                  </div>

                  {/* Audio Listen Button */}
                  <button
                    onClick={handleToggleAudio}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all shadow-md cursor-pointer ${
                      isAudioPlaying
                        ? 'bg-amber-400 text-amber-950 animate-pulse'
                        : 'bg-white/20 hover:bg-white/30 text-white backdrop-blur-xs'
                    }`}
                  >
                    {isAudioPlaying ? (
                      <>
                        <VolumeX className="w-4 h-4 text-amber-950" />
                        <span>{t.stopAudio}</span>
                      </>
                    ) : (
                      <>
                        <Volume2 className="w-4 h-4 text-emerald-300" />
                        <span>{t.listenAudio}</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Telemetry Metrics Bar */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-4 pt-3 border-t border-emerald-700/60 text-xs">
                  <div className="bg-emerald-950/50 p-2 rounded-lg">
                    <span className="text-emerald-300 text-[10px] block">{t.confidence}</span>
                    <span className="font-extrabold text-white text-base">{diagnosis.confidence}%</span>
                  </div>
                  <div className="bg-emerald-950/50 p-2 rounded-lg">
                    <span className="text-emerald-300 text-[10px] block">{t.severity}</span>
                    <span className="font-extrabold text-amber-300 text-base">
                      {diagnosis.severity_level} ({diagnosis.severity_score}%)
                    </span>
                  </div>
                  <div className="bg-emerald-950/50 p-2 rounded-lg col-span-2 sm:col-span-1">
                    <span className="text-emerald-300 text-[10px] block">
                      {lang === 'hi' ? 'रोग का कारण' : 'Causative Agent'}
                    </span>
                    <span className="font-semibold text-slate-200 truncate block text-xs">
                      {lang === 'hi' ? diagnosis.cause_hi : diagnosis.cause_en}
                    </span>
                  </div>
                </div>
              </div>

              {/* Symptoms & Diagnosis Detail */}
              <div className="p-5 space-y-4">
                <div>
                  <h5 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                    <span>{t.symptoms}</span>
                  </h5>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-amber-50/50 p-3 rounded-xl border border-amber-200/60">
                    {lang === 'hi' ? diagnosis.symptoms_hi : diagnosis.symptoms_en}
                  </p>
                </div>

                {/* Chemical Treatment & Dosage (Highlighted!) */}
                <div className="border border-emerald-200 bg-emerald-50/40 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center">
                      <Beaker className="w-4 h-4" />
                    </div>
                    <div>
                      <h5 className="text-xs font-bold text-emerald-900 uppercase tracking-wide">
                        {t.chemicalTreatment}
                      </h5>
                      <span className="text-[11px] text-emerald-700 font-semibold">
                        {lang === 'hi' ? 'शीघ्र असरदायक दवा' : 'Fast-acting Certified Fungicide'}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2 text-xs sm:text-sm text-slate-800">
                    <div className="bg-white p-3 rounded-lg border border-emerald-100 font-semibold text-emerald-950 shadow-2xs">
                      {lang === 'hi' 
                        ? diagnosis.chemical_treatment.medicine_name_hi 
                        : diagnosis.chemical_treatment.medicine_name_en}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      <div className="bg-emerald-100/60 p-2.5 rounded-lg">
                        <span className="font-bold text-emerald-900 block">{t.dosage}:</span>
                        <span className="text-slate-700">
                          {lang === 'hi' 
                            ? diagnosis.chemical_treatment.dosage_hi 
                            : diagnosis.chemical_treatment.dosage_en}
                        </span>
                      </div>
                      <div className="bg-emerald-100/60 p-2.5 rounded-lg">
                        <span className="font-bold text-emerald-900 block">
                          {lang === 'hi' ? 'छिड़काव चक्र' : 'Spray Schedule'}:
                        </span>
                        <span className="text-slate-700">
                          {lang === 'hi' 
                            ? diagnosis.chemical_treatment.spray_schedule_hi 
                            : diagnosis.chemical_treatment.spray_schedule_en}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Organic / Jaivik Remedy */}
                <div className="border border-teal-200 bg-teal-50/40 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-7 h-7 rounded-lg bg-teal-600 text-white flex items-center justify-center">
                      <Leaf className="w-4 h-4" />
                    </div>
                    <div>
                      <h5 className="text-xs font-bold text-teal-900 uppercase tracking-wide">
                        {t.organicTreatment}
                      </h5>
                      <span className="text-[11px] text-teal-700 font-semibold">
                        {lang === 'hi' ? 'कम लागत प्राकृतिक जैविक उपाय' : 'Zero-budget Natural Remedy'}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2 text-xs sm:text-sm text-slate-800">
                    <p className="font-semibold text-teal-950 bg-white p-2.5 rounded-lg border border-teal-100 shadow-2xs">
                      {lang === 'hi' 
                        ? diagnosis.organic_treatment.solution_name_hi 
                        : diagnosis.organic_treatment.solution_name_en}
                    </p>
                    <p className="text-xs text-slate-700 bg-teal-100/50 p-2 rounded-lg">
                      <span className="font-bold text-teal-900">
                        {lang === 'hi' ? 'प्रयोग विधि: ' : 'Application: '}
                      </span>
                      {lang === 'hi' 
                        ? diagnosis.organic_treatment.dosage_hi 
                        : diagnosis.organic_treatment.dosage_en}
                    </p>
                  </div>
                </div>

                {/* Precautions */}
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs text-slate-700 flex items-start gap-2">
                  <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-800">{t.precautions}: </span>
                    <span>{lang === 'hi' ? diagnosis.precautions_hi : diagnosis.precautions_en}</span>
                  </div>
                </div>

                {/* Direct Action Links to Mandi & Weather */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-200">
                  <button
                    onClick={() => setActiveTab('weather')}
                    className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100 px-3 py-2 rounded-xl border border-emerald-200 cursor-pointer transition-colors"
                  >
                    <CloudSun className="w-3.5 h-3.5" />
                    <span>{lang === 'hi' ? 'दवा छिड़कने का आज मौसम देखें' : 'Check Today’s Spray Weather'}</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('mandi')}
                    className="flex items-center gap-1.5 text-xs font-bold text-teal-700 hover:text-teal-800 bg-teal-50 hover:bg-teal-100 px-3 py-2 rounded-xl border border-teal-200 cursor-pointer transition-colors"
                  >
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>{lang === 'hi' ? 'इस फसल का मंडी भाव देखें' : 'View Mandi Rate for this Crop'}</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full min-h-[350px] bg-white rounded-2xl border border-dashed border-slate-300 flex flex-col items-center justify-center p-8 text-center text-slate-400">
              <Camera className="w-12 h-12 text-slate-300 mb-3" />
              <p className="text-sm font-semibold text-slate-600">{t.uploadPrompt}</p>
              <p className="text-xs text-slate-400 mt-1">
                {lang === 'hi' 
                  ? 'पत्ते की फोटो खींचें या बाईं ओर से नमूना पत्ता चुनें।' 
                  : 'Capture leaf photo or select a sample leaf on the left.'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
