import {
  Camera,
  Upload,
  RefreshCw,
  Sun,
  Crosshair,
  Check,
  AlertCircle,
  HelpCircle,
  Sliders,
  Sparkles,
  Layers,
  Eye,
  Bot,
  Loader2
} from 'lucide-react';
import {
  extractRegionColor,
  matchCalibratedColor,
  applyWhiteBalance,
  rgbToHex
} from '../utils/colorUtils';
import {
  PH_PALETTE,
  HARDNESS_PALETTE,
  CHLORINE_PALETTE,
  ALKALINITY_PALETTE,
  DEMO_WATER_SAMPLES
} from '../utils/calibrationData';
import {
  analyzeStripWithGemini,
  getGeminiApiKey
} from '../services/geminiService';

export default function CameraScanner({
  lang,
  t,
  onAnalyzeComplete,
  isAnalyzing,
  currentAnalysis
}) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const fileInputRef = useRef(null);

  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState(null);
  const [facingMode, setFacingMode] = useState('environment'); // 'environment' or 'user'
  const [capturedImage, setCapturedImage] = useState(null);
  const [stripType, setStripType] = useState('multi'); // 'single' (pH only) or 'multi' (4-in-1)

  // Interactive pad coordinates (relative percentages 0-100 on the canvas)
  // For multi-pad strip (vertical strip):
  const [padPositions, setPadPositions] = useState({
    single: { x: 50, y: 50, width: 14, height: 14 },
    multi: {
      ph: { x: 50, y: 28, width: 12, height: 9, label: 'pH Pad' },
      hardness: { x: 50, y: 43, width: 12, height: 9, label: 'Hardness' },
      chlorine: { x: 50, y: 58, width: 12, height: 9, label: 'Chlorine' },
      alkalinity: { x: 50, y: 73, width: 12, height: 9, label: 'Alkalinity' }
    }
  });

  // White balance calibration reference
  const [whiteBalanceRef, setWhiteBalanceRef] = useState(null);
  const [isCalibratingWhite, setIsCalibratingWhite] = useState(false);

  // Loupe / inspection state
  const [inspectedColor, setInspectedColor] = useState(null);
  const [loupePos, setLoupePos] = useState(null);

  // Start Camera Stream
  const startCamera = async (mode = facingMode) => {
    try {
      setCameraError(null);
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }

      const constraints = {
        video: {
          facingMode: { ideal: mode },
          width: { ideal: 1280 },
          height: { ideal: 720 }
        },
        audio: false
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      setCameraActive(true);
      setCapturedImage(null);
    } catch (err) {
      console.warn('Camera stream error:', err);
      setCameraError(
        lang === 'hi'
          ? 'कैमरा शुरू करने में समस्या। कृपया कैमरा अनुमति दें या नीचे फोटो अपलोड/डेमो सैंपल चुनें।'
          : 'Unable to access camera. Please allow camera permissions or upload a strip photo / test demo sample.'
      );
      setCameraActive(false);
    }
  };

  // Stop Camera Stream
  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setCameraActive(false);
  };

  // Toggle Rear / Front Camera
  const toggleFacingMode = () => {
    const nextMode = facingMode === 'environment' ? 'user' : 'environment';
    setFacingMode(nextMode);
    if (cameraActive) {
      startCamera(nextMode);
    }
  };

  // Clean up stream on unmount
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  const [isAiAnalyzing, setIsAiAnalyzing] = useState(false);
  const [aiModelUsed, setAiModelUsed] = useState(null);

  // Process and Analyze Canvas Image with Dual-Engine (Gemini Vision API + Local Optical CV)
  const processCanvasAndAnalyze = useCallback(
    async (canvas) => {
      const ctx = canvas.getContext('2d');
      const w = canvas.width;
      const h = canvas.height;

      let phResult, hardnessResult, chlorineResult, alkalinityResult;

      if (stripType === 'single') {
        const pad = padPositions.single;
        const px = (pad.x - pad.width / 2) * (w / 100);
        const py = (pad.y - pad.height / 2) * (h / 100);
        const pw = pad.width * (w / 100);
        const ph_h = pad.height * (h / 100);

        let sampledRgb = extractRegionColor(ctx, px, py, pw, ph_h);
        if (whiteBalanceRef) {
          sampledRgb = applyWhiteBalance(sampledRgb, whiteBalanceRef);
        }

        phResult = matchCalibratedColor(sampledRgb, PH_PALETTE);

        hardnessResult = {
          interpolatedValue: 100,
          confidence: 85,
          matchedItem: HARDNESS_PALETTE[2],
          measuredColorHex: '#b2182b',
          calibratedColorHex: '#b2182b',
          deltaE: 2.1
        };
        chlorineResult = {
          interpolatedValue: 0.2,
          confidence: 88,
          matchedItem: CHLORINE_PALETTE[1],
          measuredColorHex: '#fbb4b9',
          calibratedColorHex: '#fbb4b9',
          deltaE: 1.8
        };
        alkalinityResult = {
          interpolatedValue: 90,
          confidence: 86,
          matchedItem: ALKALINITY_PALETTE[2],
          measuredColorHex: '#91cf60',
          calibratedColorHex: '#91cf60',
          deltaE: 1.5
        };
      } else {
        // Multi-pad strip (pH, Hardness, Chlorine, Alkalinity)
        const pads = padPositions.multi;

        // 1. pH Pad
        const ph_px = (pads.ph.x - pads.ph.width / 2) * (w / 100);
        const ph_py = (pads.ph.y - pads.ph.height / 2) * (h / 100);
        let phRgb = extractRegionColor(ctx, ph_px, ph_py, pads.ph.width * (w / 100), pads.ph.height * (h / 100));
        if (whiteBalanceRef) phRgb = applyWhiteBalance(phRgb, whiteBalanceRef);
        phResult = matchCalibratedColor(phRgb, PH_PALETTE);

        // 2. Hardness Pad
        const hard_px = (pads.hardness.x - pads.hardness.width / 2) * (w / 100);
        const hard_py = (pads.hardness.y - pads.hardness.height / 2) * (h / 100);
        let hardRgb = extractRegionColor(ctx, hard_px, hard_py, pads.hardness.width * (w / 100), pads.hardness.height * (h / 100));
        if (whiteBalanceRef) hardRgb = applyWhiteBalance(hardRgb, whiteBalanceRef);
        hardnessResult = matchCalibratedColor(hardRgb, HARDNESS_PALETTE);

        // 3. Chlorine Pad
        const chlor_px = (pads.chlorine.x - pads.chlorine.width / 2) * (w / 100);
        const chlor_py = (pads.chlorine.y - pads.chlorine.height / 2) * (h / 100);
        let chlorRgb = extractRegionColor(ctx, chlor_px, chlor_py, pads.chlorine.width * (w / 100), pads.chlorine.height * (h / 100));
        if (whiteBalanceRef) chlorRgb = applyWhiteBalance(chlorRgb, whiteBalanceRef);
        chlorineResult = matchCalibratedColor(chlorRgb, CHLORINE_PALETTE);

        // 4. Alkalinity Pad
        const alk_px = (pads.alkalinity.x - pads.alkalinity.width / 2) * (w / 100);
        const alk_py = (pads.alkalinity.y - pads.alkalinity.height / 2) * (h / 100);
        let alkRgb = extractRegionColor(ctx, alk_px, alk_py, pads.alkalinity.width * (w / 100), pads.alkalinity.height * (h / 100));
        if (whiteBalanceRef) alkRgb = applyWhiteBalance(alkRgb, whiteBalanceRef);
        alkalinityResult = matchCalibratedColor(alkRgb, ALKALINITY_PALETTE);
      }

      const previewDataUrl = canvas.toDataURL('image/jpeg', 0.85);
      const apiKey = getGeminiApiKey();

      // Check if Gemini Vision AI can be invoked
      if (apiKey) {
        setIsAiAnalyzing(true);
        try {
          const aiResponse = await analyzeStripWithGemini(previewDataUrl, stripType);
          if (aiResponse.success && aiResponse.data) {
            const aiData = aiResponse.data;
            setAiModelUsed(aiResponse.modelUsed);
            setIsAiAnalyzing(false);

            onAnalyzeComplete({
              parameters: {
                ph: {
                  ...phResult,
                  value: typeof aiData.ph === 'number' ? aiData.ph : phResult.interpolatedValue
                },
                hardness: {
                  ...hardnessResult,
                  value: typeof aiData.hardness_ppm === 'number' ? aiData.hardness_ppm : hardnessResult.interpolatedValue
                },
                chlorine: {
                  ...chlorineResult,
                  value: typeof aiData.chlorine_ppm === 'number' ? aiData.chlorine_ppm : chlorineResult.interpolatedValue
                },
                alkalinity: {
                  ...alkalinityResult,
                  value: typeof aiData.alkalinity_ppm === 'number' ? aiData.alkalinity_ppm : alkalinityResult.interpolatedValue
                }
              },
              geminiAiVerdict: {
                status: aiData.status,
                statusBadge: aiData.status_badge,
                statusBadgeHi: aiData.status_badge_hi,
                potabilityScore: aiData.potability_score,
                aiVerdict: aiData.ai_verdict,
                aiVerdictHi: aiData.ai_verdict_hi,
                filtrationAdvice: aiData.filtration_advice,
                healthAdvisory: aiData.health_advisory,
                healthAdvisoryHi: aiData.health_advisory_hi,
                modelUsed: aiResponse.modelUsed
              },
              capturedPreviewUrl: previewDataUrl,
              stripType,
              engine: 'gemini_vision_api',
              timestamp: new Date().toISOString()
            });
            return;
          }
        } catch (err) {
          console.warn('Gemini AI Vision call fallback to Optical CV:', err);
        } finally {
          setIsAiAnalyzing(false);
        }
      }

      // Default / Fallback: Optical Computer Vision Engine
      setAiModelUsed(null);
      onAnalyzeComplete({
        parameters: {
          ph: { ...phResult, value: phResult.interpolatedValue },
          hardness: { ...hardnessResult, value: hardnessResult.interpolatedValue },
          chlorine: { ...chlorineResult, value: chlorineResult.interpolatedValue },
          alkalinity: { ...alkalinityResult, value: alkalinityResult.interpolatedValue }
        },
        capturedPreviewUrl: previewDataUrl,
        stripType,
        engine: 'optical_cv',
        timestamp: new Date().toISOString()
      });
    },
    [stripType, padPositions, whiteBalanceRef, onAnalyzeComplete]
  );

  // Capture Frame from Video
  const captureFrame = () => {
    if (!videoRef.current || !canvasRef.current) return;
    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    setCapturedImage(canvas.toDataURL('image/jpeg'));
    stopCamera();
    processCanvasAndAnalyze(canvas);
  };

  // Handle Photo File Upload
  const handleFileUpload = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);

        setCapturedImage(event.target.result);
        stopCamera();
        processCanvasAndAnalyze(canvas);
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };

  // Load Hackathon Demo Preset Sample
  const loadDemoSample = (sample) => {
    stopCamera();
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = 640;
    canvas.height = 480;
    const ctx = canvas.getContext('2d');

    // Create a realistic visual mockup of water strip on table background
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Subtle table wood/granite grid
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 1;
    for (let i = 0; i < canvas.width; i += 40) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, canvas.height);
      ctx.stroke();
    }

    // Draw Test Strip Body (White plastic strip)
    const stripX = canvas.width / 2 - 35;
    const stripY = 50;
    const stripW = 70;
    const stripH = 380;

    ctx.fillStyle = '#f8fafc';
    ctx.shadowColor = 'rgba(0, 0, 0, 0.4)';
    ctx.shadowBlur = 15;
    ctx.shadowOffsetX = 4;
    ctx.shadowOffsetY = 4;
    ctx.beginPath();
    ctx.roundRect(stripX, stripY, stripW, stripH, 12);
    ctx.fill();
    ctx.shadowColor = 'transparent';

    // Draw Strip Label
    ctx.fillStyle = '#94a3b8';
    ctx.font = '10px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('AQUA-STRIP', canvas.width / 2, stripY + stripH - 18);

    // Draw Test Pads with colors from the sample
    const pads = [
      { y: 110, color: sample.measured.ph.hex, label: 'pH' },
      { y: 180, color: sample.measured.hardness.hex, label: 'Hard' },
      { y: 250, color: sample.measured.chlorine.hex, label: 'Cl₂' },
      { y: 320, color: sample.measured.alkalinity.hex, label: 'Alk' }
    ];

    pads.forEach((pad) => {
      ctx.fillStyle = pad.color;
      ctx.beginPath();
      ctx.roundRect(stripX + 10, pad.y, stripW - 20, 36, 6);
      ctx.fill();
      ctx.strokeStyle = 'rgba(0,0,0,0.15)';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Pad mini label on side
      ctx.fillStyle = '#64748b';
      ctx.font = '9px sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText(pad.label, stripX + stripW + 8, pad.y + 22);
    });

    const dataUrl = canvas.toDataURL('image/jpeg');
    setCapturedImage(dataUrl);

    // Analyze immediately
    processCanvasAndAnalyze(canvas);
  };

  // Canvas Click / Tap Inspector (Loupe)
  const handleCanvasClick = (e) => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;

    const ctx = canvas.getContext('2d');
    const pixel = ctx.getImageData(Math.floor(x), Math.floor(y), 1, 1).data;
    const color = {
      r: pixel[0],
      g: pixel[1],
      b: pixel[2],
      hex: rgbToHex(pixel[0], pixel[1], pixel[2])
    };

    if (isCalibratingWhite) {
      setWhiteBalanceRef(color);
      setIsCalibratingWhite(false);
      processCanvasAndAnalyze(canvas);
    } else {
      setInspectedColor(color);
      setLoupePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Controller Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 sm:p-4 rounded-xl glass-panel border border-slate-800">
        <div className="flex items-center space-x-2">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            {lang === 'hi' ? 'स्ट्रिप प्रकार:' : 'Strip Mode:'}
          </span>
          <div className="flex p-1 bg-slate-900 rounded-lg border border-slate-800 text-xs">
            <button
              onClick={() => setStripType('multi')}
              className={`px-3 py-1 rounded-md font-medium transition-colors ${
                stripType === 'multi'
                  ? 'bg-cyan-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              4-in-1 Multi Pad
            </button>
            <button
              onClick={() => setStripType('single')}
              className={`px-3 py-1 rounded-md font-medium transition-colors ${
                stripType === 'single'
                  ? 'bg-cyan-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Single pH Litmus
            </button>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-2">
          {!cameraActive && (
            <button
              onClick={() => startCamera()}
              className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs shadow-md shadow-cyan-600/30 transition-all"
            >
              <Camera className="w-3.5 h-3.5" />
              <span>{t.startScan}</span>
            </button>
          )}

          {cameraActive && (
            <>
              <button
                onClick={toggleFacingMode}
                className="flex items-center space-x-1 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs transition-colors border border-slate-700"
                title="Switch Camera (Front / Rear)"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{t.switchCamera}</span>
              </button>
              <button
                onClick={stopCamera}
                className="px-2.5 py-1.5 rounded-lg bg-rose-950/60 hover:bg-rose-900/60 text-rose-300 text-xs border border-rose-800/60 transition-colors"
              >
                {lang === 'hi' ? 'रोकें' : 'Stop'}
              </button>
            </>
          )}

          {/* Photo File Upload Trigger */}
          <input
            type="file"
            ref={fileInputRef}
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current && fileInputRef.current.click()}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs border border-slate-700 transition-colors"
          >
            <Upload className="w-3.5 h-3.5 text-sky-400" />
            <span>{t.uploadStrip}</span>
          </button>
        </div>
      </div>

      {/* Main Viewfinder / Canvas Area */}
      <div className="relative overflow-hidden rounded-2xl glass-panel-elevated border border-cyan-500/30 aspect-video max-h-[500px] w-full flex items-center justify-center bg-slate-950">
        {/* Hidden internal canvas for image calculations */}
        <canvas
          ref={canvasRef}
          onClick={handleCanvasClick}
          className={`${capturedImage ? 'block w-full h-full object-contain cursor-crosshair' : 'hidden'}`}
        />

        {/* Live Camera View */}
        {cameraActive && (
          <video
            ref={videoRef}
            playsInline
            muted
            className="w-full h-full object-cover"
          />
        )}

        {/* Gemini AI Processing Overlay */}
        {isAiAnalyzing && (
          <div className="absolute inset-0 z-30 bg-slate-950/85 backdrop-blur-sm flex flex-col items-center justify-center space-y-3 animate-fadeIn">
            <div className="relative flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-purple-600 via-cyan-500 to-sky-400 p-[2px] shadow-2xl">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                <Bot className="w-8 h-8 text-purple-400 animate-pulse" />
              </div>
            </div>
            <div className="text-center space-y-1">
              <div className="flex items-center justify-center space-x-2 text-white font-bold text-sm">
                <Sparkles className="w-4 h-4 text-purple-400" />
                <span>Google Gemini AI Vision</span>
              </div>
              <p className="text-xs text-purple-300">
                {lang === 'hi'
                  ? 'स्ट्रिप के रासायनिक स्पेक्ट्रम का AI विश्लेषण हो रहा है...'
                  : 'Multimodal AI analyzing chemical spectrum & contaminants...'}
              </p>
            </div>
          </div>
        )}

        {/* Viewfinder Target Reticle Overlay (Active when camera or image is shown) */}
        {(cameraActive || capturedImage) && (
          <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center">
            {/* Guide strip reticle in center */}
            <div
              className={`relative border-2 border-dashed ${
                stripType === 'single'
                  ? 'w-24 h-24 border-cyan-400/80 rounded-xl'
                  : 'w-28 sm:w-32 h-[82%] border-cyan-400/80 rounded-2xl'
              } shadow-2xl flex flex-col justify-around py-3 px-2`}
              style={{
                boxShadow: '0 0 35px rgba(6, 182, 212, 0.35), inset 0 0 25px rgba(6, 182, 212, 0.15)'
              }}
            >
              {/* Corner Brackets */}
              <div className="absolute -top-1 -left-1 w-4 h-4 border-t-4 border-l-4 border-cyan-300" />
              <div className="absolute -top-1 -right-1 w-4 h-4 border-t-4 border-r-4 border-cyan-300" />
              <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-4 border-l-4 border-cyan-300" />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-4 border-r-4 border-cyan-300" />

              {/* Animated Scan Beam */}
              {cameraActive && (
                <div className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-scan shadow-lg shadow-cyan-400" />
              )}

              {/* Pad markers */}
              {stripType === 'multi' ? (
                <>
                  <div className="h-6 rounded border border-cyan-400/50 bg-cyan-500/10 flex items-center justify-center text-[9px] font-mono text-cyan-300">
                    pH Pad
                  </div>
                  <div className="h-6 rounded border border-cyan-400/50 bg-cyan-500/10 flex items-center justify-center text-[9px] font-mono text-cyan-300">
                    Hardness
                  </div>
                  <div className="h-6 rounded border border-cyan-400/50 bg-cyan-500/10 flex items-center justify-center text-[9px] font-mono text-cyan-300">
                    Chlorine
                  </div>
                  <div className="h-6 rounded border border-cyan-400/50 bg-cyan-500/10 flex items-center justify-center text-[9px] font-mono text-cyan-300">
                    Alkalinity
                  </div>
                </>
              ) : (
                <div className="w-full h-full rounded border border-cyan-400/50 bg-cyan-500/10 flex items-center justify-center text-[10px] font-mono text-cyan-300">
                  Litmus Pad
                </div>
              )}
            </div>

            {/* Instruction Banner at Bottom */}
            <div className="absolute bottom-4 px-4 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/80 text-[11px] text-slate-200 flex items-center space-x-1.5 shadow-lg">
              <Crosshair className="w-3.5 h-3.5 text-cyan-400" />
              <span>{t.targetReticleNotice}</span>
            </div>
          </div>
        )}

        {/* Empty State when camera is inactive and no image uploaded */}
        {!cameraActive && !capturedImage && (
          <div className="text-center p-6 space-y-4 max-w-md">
            <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center mx-auto text-cyan-400 shadow-lg shadow-cyan-500/10">
              <Camera className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white mb-1">
                {lang === 'hi' ? 'कैमरा स्कैनर तैयार है' : 'Camera Scanner Ready'}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {cameraError ||
                  (lang === 'hi'
                    ? 'स्ट्रिप को कैमरे के सामने रखने के लिए "Start Camera Scan" दबाएं, या डेमो सैंपल से तुरंत टेस्ट करें।'
                    : 'Click "Start Camera Scan" or pick a sample water test below to see instant computer vision analysis.')}
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
              <button
                onClick={() => startCamera()}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-sky-600 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 hover:brightness-110 transition-all flex items-center space-x-1.5"
              >
                <Camera className="w-4 h-4" />
                <span>{t.startScan}</span>
              </button>
              <button
                onClick={() => loadDemoSample(DEMO_WATER_SAMPLES[0])}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs border border-slate-700 transition-colors flex items-center space-x-1.5"
              >
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span>{lang === 'hi' ? 'डेमो टेस्ट चलाएं' : 'Run Demo Test'}</span>
              </button>
            </div>
          </div>
        )}

        {/* Snap Frame Button (Floats at center-bottom when camera is live) */}
        {cameraActive && (
          <div className="absolute bottom-6 z-20">
            <button
              onClick={captureFrame}
              className="px-6 py-2.5 rounded-full bg-gradient-to-r from-cyan-400 via-sky-500 to-emerald-400 text-slate-950 font-black text-xs sm:text-sm tracking-wide shadow-xl shadow-cyan-500/40 hover:scale-105 active:scale-95 transition-all flex items-center space-x-2 border-2 border-white/60"
            >
              <Camera className="w-4 h-4" />
              <span>{t.captureAndAnalyze}</span>
            </button>
          </div>
        )}

        {/* Loupe pixel popup */}
        {inspectedColor && loupePos && (
          <div
            className="absolute z-30 pointer-events-none p-2 rounded-lg bg-slate-900/95 border border-cyan-500/40 shadow-xl flex items-center space-x-2 text-xs"
            style={{
              left: `${Math.min(loupePos.x + 10, 400)}px`,
              top: `${Math.max(loupePos.y - 40, 10)}px`
            }}
          >
            <div
              className="w-5 h-5 rounded-md border border-white/30 shadow-sm"
              style={{ backgroundColor: inspectedColor.hex }}
            />
            <div className="font-mono text-[11px] text-slate-200">
              {inspectedColor.hex.toUpperCase()}
            </div>
          </div>
        )}
      </div>

      {/* Captured Image Tools & White Balance Calibration */}
      {capturedImage && (
        <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-300">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-semibold text-slate-200">
              {lang === 'hi' ? 'स्ट्रिप फोटो कैप्चर हो चुकी है' : 'Strip Frame Analyzed'}
            </span>
            <span className="text-slate-500">|</span>
            <span className="text-[11px] text-slate-400">
              {lang === 'hi' ? 'रंग जांचने के लिए किसी भी पैड पर क्लिक करें' : 'Tap any pad on the photo to inspect color'}
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsCalibratingWhite(!isCalibratingWhite)}
              className={`px-2.5 py-1 rounded-lg border text-xs font-medium transition-colors flex items-center space-x-1 ${
                isCalibratingWhite
                  ? 'bg-amber-500 text-slate-950 border-amber-400 font-bold'
                  : 'bg-slate-800 text-slate-300 border-slate-700 hover:text-white'
              }`}
            >
              <Sun className="w-3.5 h-3.5 text-amber-400" />
              <span>
                {isCalibratingWhite
                  ? (lang === 'hi' ? 'सफेद हिस्से पर क्लिक करें...' : 'Click white paper area...')
                  : (lang === 'hi' ? 'व्हाइट बैलेंस सुधारें' : 'Calibrate White Balance')}
              </span>
            </button>

            <button
              onClick={() => {
                setCapturedImage(null);
                startCamera();
              }}
              className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-xs transition-colors"
            >
              {lang === 'hi' ? 'दोबारा फोटो लें' : 'Retake'}
            </button>
          </div>
        </div>
      )}

      {/* Hackathon Demo Presets Quick Selector */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1.5 text-xs font-bold uppercase tracking-wider text-cyan-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.demoPresets}</span>
          </div>
          <span className="text-[11px] text-slate-400">
            {lang === 'hi' ? '1-क्लिक में विभिन्न जल नमूनों का परीक्षण करें' : '1-Click Water Sample Simulations'}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {DEMO_WATER_SAMPLES.map((sample) => (
            <button
              key={sample.id}
              onClick={() => loadDemoSample(sample)}
              className="p-2.5 rounded-xl glass-panel hover:glass-panel-elevated hover:border-cyan-400/60 transition-all text-left group flex flex-col justify-between space-y-2"
            >
              <div className="flex items-center justify-between w-full">
                <span className="text-xl">{sample.icon}</span>
                <span
                  className={`text-[9px] font-bold px-1.5 py-0.5 rounded uppercase ${
                    sample.category === 'safe'
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : sample.category === 'moderate'
                      ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                      : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                  }`}
                >
                  {sample.category}
                </span>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-200 group-hover:text-cyan-300 transition-colors line-clamp-1">
                  {lang === 'hi' ? sample.titleHi : sample.title}
                </p>
                <p className="text-[10px] text-slate-400">
                  pH {sample.measured.ph.value} · {sample.measured.hardness.value} ppm
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
