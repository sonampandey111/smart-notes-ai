/**
 * AquaStrip AI Water Quality & Potability Assessment Engine
 * Computes Water Quality Index (WQI), Potability Score (0-100),
 * Safety Status (Safe / Moderate / Toxic), and Purification Recommendations.
 */

export function analyzeWaterQuality(parameters) {
  const { ph, hardness, chlorine, alkalinity } = parameters;

  const phVal = ph ? ph.value : 7.0;
  const hardVal = hardness ? hardness.value : 100;
  const chlorVal = chlorine ? chlorine.value : 0.2;
  const alkVal = alkalinity ? alkalinity.value : 100;

  // 1. Parameter Sub-Scores (0 to 100 each)
  
  // pH Score (Ideal: 7.0 to 7.8, Acceptable: 6.5 to 8.5)
  let phScore = 100;
  if (phVal < 6.5) {
    phScore = Math.max(0, 100 - Math.pow(6.5 - phVal, 1.8) * 35);
  } else if (phVal > 8.5) {
    phScore = Math.max(0, 100 - Math.pow(phVal - 8.5, 1.8) * 35);
  } else {
    // slight penalty if slightly off from 7.2
    phScore = 100 - Math.abs(phVal - 7.2) * 5;
  }

  // Hardness Score (Ideal: 60-150 ppm, Acceptable: 0-250 ppm)
  let hardScore = 100;
  if (hardVal > 300) {
    hardScore = Math.max(10, 100 - (hardVal - 300) * 0.45);
  } else if (hardVal > 180) {
    hardScore = Math.max(50, 100 - (hardVal - 180) * 0.35);
  } else if (hardVal < 30) {
    // Ultra soft lacks beneficial minerals
    hardScore = 85;
  }

  // Chlorine Score (Ideal: 0.0 - 0.5 ppm, Acceptable: up to 1.0 ppm)
  let chlorScore = 100;
  if (chlorVal > 4.0) {
    chlorScore = 10;
  } else if (chlorVal > 2.0) {
    chlorScore = 35;
  } else if (chlorVal > 1.0) {
    chlorScore = 65;
  } else if (chlorVal > 0.5) {
    chlorScore = 85;
  }

  // Alkalinity Score (Ideal: 80 - 140 ppm)
  let alkScore = 100;
  if (alkVal > 200) {
    alkScore = Math.max(40, 100 - (alkVal - 200) * 0.5);
  } else if (alkVal < 40) {
    alkScore = Math.max(50, 100 - (40 - alkVal) * 1.0);
  }

  // Weighted Potability Index (WQI)
  const totalScore = Math.round(
    phScore * 0.38 + hardScore * 0.28 + chlorScore * 0.24 + alkScore * 0.10
  );
  const potabilityScore = Math.min(100, Math.max(5, totalScore));

  // Determine Overall Safety Status
  let status = "safe";
  let statusBadge = "SAFE / PEENE LAYAK";
  let statusBadgeHi = "पीने योग्य / पूर्ण सुरक्षित (Safe)";
  let statusColor = "emerald";

  const isPhToxic = phVal < 6.0 || phVal > 9.0;
  const isChlorineToxic = chlorVal >= 3.0;
  const isHardnessToxic = hardVal >= 400;

  const isPhModerate = (phVal >= 6.0 && phVal < 6.5) || (phVal > 8.5 && phVal <= 9.0);
  const isChlorineModerate = chlorVal > 1.0 && chlorVal < 3.0;
  const isHardnessModerate = hardVal > 200 && hardVal < 400;

  if (isPhToxic || isChlorineToxic || isHardnessToxic || potabilityScore < 50) {
    status = "toxic";
    statusBadge = "TOXIC / UNSAFE (NOT DRINKABLE)";
    statusBadgeHi = "असुरक्षित / पीने योग्य नहीं (Toxic)";
    statusColor = "rose";
  } else if (isPhModerate || isChlorineModerate || isHardnessModerate || potabilityScore < 80) {
    status = "moderate";
    statusBadge = "MODERATE / TREATMENT ADVISED";
    statusBadgeHi = "मध्यम / शोधन की आवश्यकता (Moderate)";
    statusColor = "amber";
  }

  // Purification & Filtration Recommendations
  const recommendations = [];

  if (status === "safe") {
    recommendations.push({
      id: "direct_drink",
      title: "Direct Consumption Safe",
      titleHi: "सीधे पीने के लिए सुरक्षित (Direct Drinking)",
      icon: "CheckCircle",
      urgency: "low",
      desc: "Water meets all WHO & BIS primary drinking standards. No heavy filtration necessary.",
      descHi: "यह पानी WHO और BIS मानकों के अनुकूल है। इसे बिना किसी बड़े फिल्टर के पिया जा सकता है।"
    });
    if (chlorVal > 0) {
      recommendations.push({
        id: "boil_optional",
        title: "Mild Boiling (Optional for infants)",
        titleHi: "हल्का उबालना (शिशुओं के लिए ऐच्छिक)",
        icon: "Flame",
        urgency: "low",
        desc: "Boil for 2-3 minutes if serving to infants or elderly with delicate immunity.",
        descHi: "छोटे बच्चों या बुजुर्गों के लिए 2-3 मिनट उबालना पर्याप्त और सुरक्षित रहेगा।"
      });
    }
  }

  if (hardVal >= 250) {
    recommendations.push({
      id: "req_ro",
      title: "Reverse Osmosis (RO) Filter Required",
      titleHi: "रिवर्स ऑस्मोसिस (RO) फिल्टर आवश्यक",
      icon: "ShieldAlert",
      urgency: "high",
      desc: `High mineral hardness (${hardVal} ppm) will cause kidney strain and heavy limescale. Requires RO + TDS controller.`,
      descHi: `पानी में खारापन और हार्डनेस (${hardVal} ppm) अधिक है। पथरी के जोखिम और स्केलिंग से बचने के लिए RO फिल्टर जरूरी है।`
    });
  } else if (hardVal < 40) {
    recommendations.push({
      id: "remineralize",
      title: "Mineral Cartridge / Remineralization Recommended",
      titleHi: "मिनरल कार्ट्रिज / पुनः खनिजीकरण आवश्यक",
      icon: "Sparkles",
      urgency: "medium",
      desc: "Water is overly demineralized. Add copper/alkaline mineral cartridge to restore calcium and magnesium.",
      descHi: "पानी बहुत अधिक हल्का/सॉफ्ट है जिससे जरूरी खनिज गायब हैं। मिनरल कार्ट्रिज से खनिज लौटाएं।"
    });
  }

  if (chlorVal >= 1.0) {
    recommendations.push({
      id: "carbon_boil",
      title: chlorVal >= 3.0 ? "Activated Carbon + Multi-stage UV Required" : "Boiling (10-15 min) or Carbon Filter",
      titleHi: chlorVal >= 3.0 ? "एक्टिवेटेड कार्बन + UV फिल्टर अनिवार्य" : "10-15 मिनट उबालें या कार्बन फिल्टर का उपयोग करें",
      icon: "Flame",
      urgency: chlorVal >= 3.0 ? "high" : "medium",
      desc: `Elevated free chlorine (${chlorVal} ppm) gives chemical bleach smell. Boiling 10-15 min evaporates dissolved chlorine gas.`,
      descHi: `पानी में क्लोरीन (${chlorVal} ppm) ज्यादा है। 10-15 मिनट उबालने से या कार्बन फिल्टर से क्लोरीन गैस निकल जाती है।`
    });
  }

  if (phVal < 6.5) {
    recommendations.push({
      id: "ph_alkalize",
      title: "Alkaline / Neutralizing Filter Needed",
      titleHi: "एल्कलाइन / न्यूट्रलाइजर फिल्टर जरूरी",
      icon: "Beaker",
      urgency: "high",
      desc: `Acidic water (pH ${phVal}) corrodes metal plumbing and causes acidity in the stomach. Pass through calcite bed.`,
      descHi: `अम्लीय पानी (pH ${phVal}) पेट में एसिडिटी और नलों में जंग लगाता है। कैल्साइट न्यूट्रलाइजर उपयोग करें।`
    });
  } else if (phVal > 8.5) {
    recommendations.push({
      id: "ph_reduce",
      title: "Acid Neutralizer or RO Membrane",
      titleHi: "RO मेम्ब्रेन या हल्का एसिडिक संशोधन",
      icon: "Beaker",
      urgency: "medium",
      desc: `Excessive alkalinity (pH ${phVal}) causes bitter taste and reduces stomach acid needed for digestion.`,
      descHi: `अधिक क्षारीय पानी (pH ${phVal}) कड़वा स्वाद देता है और पाचन पर असर डालता है।`
    });
  }

  // Health Impact Summary
  let healthSummary = "";
  let healthSummaryHi = "";

  if (status === "safe") {
    healthSummary = "Excellent drinking condition. Optimal cellular hydration, balanced electrolytes, and zero dangerous chemical burden.";
    healthSummaryHi = "पीने के लिए बेहतरीन स्थिति। शरीर में पानी का अच्छा संतुलन, संतुलित मिनरल्स और हानिकारक रसायनों से पूरी मुक्ति।";
  } else if (status === "moderate") {
    healthSummary = "Not immediately dangerous, but prolonged consumption without filtration may cause digestive discomfort or limescale in vessels.";
    healthSummaryHi = "तुरंत जानलेवा नहीं है, लेकिन लंबे समय तक बिना छाने पीने से पेट में गड़बड़ या बर्तनों में सफेद पपड़ी जम सकती है।";
  } else {
    healthSummary = "CRITICAL: Direct ingestion is hazardous. Chemical imbalance poses risks of pipe leaching, heavy metal ingestion, or acute gastric distress.";
    healthSummaryHi = "गंभीर चेतावनी: यह पानी सीधे पीने के लिए हानिकारक है। पेट दर्द, विषाक्तता या नलों के भारी धातुओं के घुलने का खतरा है।";
  }

  return {
    potabilityScore,
    status,
    statusBadge,
    statusBadgeHi,
    statusColor,
    healthSummary,
    healthSummaryHi,
    recommendations,
    parameterBreakdown: {
      ph: {
        score: Math.round(phScore),
        value: phVal,
        unit: "",
        status: phVal >= 6.5 && phVal <= 8.5 ? "safe" : phVal >= 6.0 && phVal <= 9.0 ? "moderate" : "toxic"
      },
      hardness: {
        score: Math.round(hardScore),
        value: hardVal,
        unit: "ppm CaCO₃",
        status: hardVal <= 180 ? "safe" : hardVal <= 300 ? "moderate" : "toxic"
      },
      chlorine: {
        score: Math.round(chlorScore),
        value: chlorVal,
        unit: "ppm",
        status: chlorVal <= 0.8 ? "safe" : chlorVal <= 2.0 ? "moderate" : "toxic"
      },
      alkalinity: {
        score: Math.round(alkScore),
        value: alkVal,
        unit: "ppm",
        status: alkVal >= 60 && alkVal <= 180 ? "safe" : "moderate"
      }
    }
  };
}
