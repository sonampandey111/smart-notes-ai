/**
 * Calibrated Colorimetry Reference Standards & Datasets
 * Based on Universal Litmus & Multi-parameter Water Test Strips
 * Conforms to WHO & BIS (IS 10500:2012) Drinking Water Specifications.
 */

// Universal pH 1 - 14 Color Scale
export const PH_PALETTE = [
  {
    value: 1.0,
    label: "pH 1.0 - Highly Acidic (Hazardous)",
    status: "toxic",
    stepSize: 1.0,
    rgb: { r: 215, g: 25, b: 28 },
    hex: "#d7191c",
    desc: "Severe battery acid like acidity. Corrosive to mucous membranes."
  },
  {
    value: 2.0,
    label: "pH 2.0 - Strong Acid",
    status: "toxic",
    stepSize: 1.0,
    rgb: { r: 230, g: 57, b: 70 },
    hex: "#e63946",
    desc: "Dangerous acidity. Highly corrosive to plumbing and digestive tract."
  },
  {
    value: 3.0,
    label: "pH 3.0 - Acidic (Unsafe)",
    status: "toxic",
    stepSize: 1.0,
    rgb: { r: 244, g: 109, b: 67 },
    hex: "#f46d43",
    desc: "Vinegar/orange juice level acidity. Unfit for drinking."
  },
  {
    value: 4.0,
    label: "pH 4.0 - Moderately Acidic",
    status: "toxic",
    stepSize: 1.0,
    rgb: { r: 253, g: 174, b: 97 },
    hex: "#fdae61",
    desc: "Leaches heavy metals (lead, copper) from pipes."
  },
  {
    value: 5.0,
    label: "pH 5.0 - Weak Acid",
    status: "moderate",
    stepSize: 1.0,
    rgb: { r: 254, g: 224, b: 139 },
    hex: "#fee08b",
    desc: "Sour/acidic taste. May cause stomach irritation with long-term use."
  },
  {
    value: 6.0,
    label: "pH 6.0 - Slightly Acidic",
    status: "moderate",
    stepSize: 1.0,
    rgb: { r: 230, g: 245, b: 152 },
    hex: "#e6f598",
    desc: "Just below WHO minimum limit (6.5). Neutralization advised."
  },
  {
    value: 7.0,
    label: "pH 7.0 - Pure Neutral (Optimal)",
    status: "safe",
    stepSize: 1.0,
    rgb: { r: 102, g: 189, b: 99 },
    hex: "#66bd63",
    desc: "Perfect neutral drinking water. Safe, refreshing, non-corrosive."
  },
  {
    value: 8.0,
    label: "pH 8.0 - Mild Alkaline (Optimal)",
    status: "safe",
    stepSize: 1.0,
    rgb: { r: 26, g: 152, b: 80 },
    hex: "#1a9850",
    desc: "Healthy mineral-rich alkaline range. Optimal for hydration."
  },
  {
    value: 9.0,
    label: "pH 9.0 - Moderate Alkaline",
    status: "moderate",
    stepSize: 1.0,
    rgb: { r: 43, g: 131, b: 186 },
    hex: "#2b83ba",
    desc: "Slightly bitter/soapy feel. Acceptable in some mineral springs."
  },
  {
    value: 10.0,
    label: "pH 10.0 - High Alkaline (Unsafe)",
    status: "toxic",
    stepSize: 1.0,
    rgb: { r: 69, g: 117, b: 180 },
    hex: "#4575b4",
    desc: "Causes skin & eye irritation, bitter slippery taste. Filtration required."
  },
  {
    value: 11.0,
    label: "pH 11.0 - Strongly Alkaline",
    status: "toxic",
    stepSize: 1.0,
    rgb: { r: 49, g: 54, b: 149 },
    hex: "#313695",
    desc: "Ammonia like caustic scale. Toxic to drink."
  },
  {
    value: 12.0,
    label: "pH 12.0 - Caustic Alkaline",
    status: "toxic",
    stepSize: 1.0,
    rgb: { r: 94, g: 60, b: 153 },
    hex: "#5e3c99",
    desc: "Bleach/soap level alkalinity. Causes chemical burns."
  },
  {
    value: 13.0,
    label: "pH 13.0 - Highly Caustic",
    status: "toxic",
    stepSize: 1.0,
    rgb: { r: 118, g: 42, b: 131 },
    hex: "#762a83",
    desc: "Industrial lye alkaline. Dangerously corrosive."
  },
  {
    value: 14.0,
    label: "pH 14.0 - Maximum Alkaline (Extreme)",
    status: "toxic",
    stepSize: 1.0,
    rgb: { r: 64, g: 0, b: 75 },
    hex: "#40004b",
    desc: "Maximum caustic alkalinity. Destroys living tissue."
  }
];

// Total Hardness Palette (mg/L or ppm CaCO3)
export const HARDNESS_PALETTE = [
  {
    value: 0,
    label: "0 ppm - Very Soft",
    status: "safe",
    stepSize: 50,
    rgb: { r: 244, g: 165, b: 130 },
    hex: "#f4a582",
    desc: "Very low minerals. May taste flat, can leach copper pipes."
  },
  {
    value: 50,
    label: "50 ppm - Soft / Ideal",
    status: "safe",
    stepSize: 70,
    rgb: { r: 214, g: 96, b: 77 },
    hex: "#d6604d",
    desc: "Optimal soft drinking water. Great for brewing and hydration."
  },
  {
    value: 120,
    label: "120 ppm - Moderately Hard (WHO Ideal)",
    status: "safe",
    stepSize: 130,
    rgb: { r: 178, g: 24, b: 43 },
    hex: "#b2182b",
    desc: "Perfect balanced mineral profile (Calcium & Magnesium)."
  },
  {
    value: 250,
    label: "250 ppm - Hard Water",
    status: "moderate",
    stepSize: 175,
    rgb: { r: 67, g: 147, b: 195 },
    hex: "#4393c3",
    desc: "White limescale buildup in kettles. Rough on skin & hair."
  },
  {
    value: 425,
    label: "425+ ppm - Very Hard (Excessive)",
    status: "toxic",
    stepSize: 200,
    rgb: { r: 33, g: 102, b: 172 },
    hex: "#2166ac",
    desc: "Excess mineral salts. High scaling, strain on kidneys, RO recommended."
  }
];

// Free Chlorine Palette (ppm or mg/L)
export const CHLORINE_PALETTE = [
  {
    value: 0.0,
    label: "0.0 ppm - No Free Chlorine",
    status: "safe",
    stepSize: 0.5,
    rgb: { r: 247, g: 247, b: 247 },
    hex: "#f7f7f7",
    desc: "Zero residual chlorine. Common in bottled RO and well water."
  },
  {
    value: 0.5,
    label: "0.5 ppm - Safe Residual (WHO Optimal)",
    status: "safe",
    stepSize: 0.5,
    rgb: { r: 251, g: 180, b: 185 },
    hex: "#fbb4b9",
    desc: "Optimal municipal disinfection level protects against bacteria."
  },
  {
    value: 1.0,
    label: "1.0 ppm - Acceptable Residual",
    status: "safe",
    stepSize: 2.0,
    rgb: { r: 247, g: 104, b: 161 },
    hex: "#f768a1",
    desc: "Mild bleach odor. Safe to drink, slight chemical taste."
  },
  {
    value: 3.0,
    label: "3.0 ppm - High Chlorine",
    status: "moderate",
    stepSize: 2.0,
    rgb: { r: 197, g: 27, b: 138 },
    hex: "#c51b8a",
    desc: "Strong bleach smell. Boiling or carbon filtration advised."
  },
  {
    value: 5.0,
    label: "5.0 ppm - Hazardous / Swimming Pool",
    status: "toxic",
    stepSize: 5.0,
    rgb: { r: 122, g: 1, b: 119 },
    hex: "#7a0177",
    desc: "Toxic for direct drinking. May trigger respiratory & gut irritation."
  },
  {
    value: 10.0,
    label: "10.0 ppm - Severe Chemical Contamination",
    status: "toxic",
    stepSize: 5.0,
    rgb: { r: 73, g: 0, b: 106 },
    hex: "#49006a",
    desc: "Dangerous industrial or accidental chemical spill level."
  }
];

// Total Alkalinity Palette (ppm CaCO3)
export const ALKALINITY_PALETTE = [
  {
    value: 0,
    label: "0 ppm - Very Low Alkalinity",
    status: "moderate",
    stepSize: 40,
    rgb: { r: 255, g: 255, b: 191 },
    hex: "#ffffbf",
    desc: "Zero buffering capacity; water pH can fluctuate rapidly."
  },
  {
    value: 40,
    label: "40 ppm - Low Alkalinity",
    status: "safe",
    stepSize: 40,
    rgb: { r: 217, g: 239, b: 139 },
    hex: "#d9ef8b",
    desc: "Adequate buffering for soft drinking water."
  },
  {
    value: 80,
    label: "80 ppm - Balanced (Optimal)",
    status: "safe",
    stepSize: 40,
    rgb: { r: 145, g: 207, b: 96 },
    hex: "#91cf60",
    desc: "Healthy natural buffering prevents pipe corrosion."
  },
  {
    value: 120,
    label: "120 ppm - Good Buffering",
    status: "safe",
    stepSize: 60,
    rgb: { r: 26, g: 152, b: 80 },
    hex: "#1a9850",
    desc: "Optimal stability and clean crisp taste."
  },
  {
    value: 180,
    label: "180 ppm - High Alkalinity",
    status: "moderate",
    stepSize: 60,
    rgb: { r: 0, g: 104, b: 55 },
    hex: "#006837",
    desc: "Noticeable bicarbonate presence; slightly chalky aftertaste."
  },
  {
    value: 240,
    label: "240+ ppm - Very High Alkalinity",
    status: "moderate",
    stepSize: 60,
    rgb: { r: 8, g: 64, b: 129 },
    hex: "#084081",
    desc: "Scale forming water. May reduce stomach acid efficacy."
  }
];

// Standard Drinking Water Norms
export const WATER_STANDARDS = {
  who: {
    name: "World Health Organization (WHO) Guidelines",
    ph: { min: 6.5, max: 8.5, optimal: 7.2 },
    hardness: { min: 0, max: 200, unit: "ppm" },
    chlorine: { min: 0.2, max: 0.5, unit: "ppm" },
    alkalinity: { min: 30, max: 200, unit: "ppm" }
  },
  bis: {
    name: "Bureau of Indian Standards (BIS IS 10500:2012)",
    ph: { min: 6.5, max: 8.5, permissible: 9.0 },
    hardness: { desirable: 200, permissible: 600, unit: "ppm" },
    chlorine: { desirable: 0.2, permissible: 1.0, unit: "ppm" },
    alkalinity: { desirable: 200, permissible: 600, unit: "ppm" }
  }
};

// Preset Water Test Samples for Hackathon Judges & Demos
export const DEMO_WATER_SAMPLES = [
  {
    id: "tap_safe",
    title: "Delhi Jal Board / Municipal Tap Water",
    titleHi: "नगर निगम नल का पानी (Municipal Tap Water)",
    category: "safe",
    icon: "🚰",
    description: "Treated municipal water from city reservoir. Chlorinated for safety with balanced mineral content.",
    measured: {
      ph: { value: 7.3, rgb: { r: 85, g: 170, b: 90 }, hex: "#55aa5a" },
      hardness: { value: 115, rgb: { r: 185, g: 30, b: 50 }, hex: "#b91e32" },
      chlorine: { value: 0.4, rgb: { r: 250, g: 190, b: 195 }, hex: "#fabec3" },
      alkalinity: { value: 95, rgb: { r: 100, g: 180, b: 85 }, hex: "#64b455" }
    }
  },
  {
    id: "bottled_ro",
    title: "Packaged RO Mineral Water (Bisleri/Kinley)",
    titleHi: "पैकेज्ड आर.ओ. मिनरल वाटर (Bottled RO)",
    category: "safe",
    icon: "🧴",
    description: "Reverse Osmosis purified water with controlled remineralization. Zero chlorine, ultra soft.",
    measured: {
      ph: { value: 6.9, rgb: { r: 105, g: 195, b: 100 }, hex: "#69c364" },
      hardness: { value: 35, rgb: { r: 230, g: 130, b: 100 }, hex: "#e68264" },
      chlorine: { value: 0.0, rgb: { r: 247, g: 247, b: 247 }, hex: "#f7f7f7" },
      alkalinity: { value: 45, rgb: { r: 210, g: 235, b: 135 }, hex: "#d2eb87" }
    }
  },
  {
    id: "borewell_hard",
    title: "Village Borewell / Hard Groundwater",
    titleHi: "गांव का बोरवेल / खारा भूजल (Hard Borewell)",
    category: "moderate",
    icon: "🚜",
    description: "Untreated deep aquifer water with high dissolved calcium & magnesium carbonates.",
    measured: {
      ph: { value: 8.2, rgb: { r: 25, g: 145, b: 85 }, hex: "#199155" },
      hardness: { value: 380, rgb: { r: 40, g: 110, b: 180 }, hex: "#286eb4" },
      chlorine: { value: 0.0, rgb: { r: 247, g: 247, b: 247 }, hex: "#f7f7f7" },
      alkalinity: { value: 210, rgb: { r: 10, g: 75, b: 110 }, hex: "#0a4b6e" }
    }
  },
  {
    id: "acidic_effluent",
    title: "Acidic Contaminated Canal / Industrial Runoff",
    titleHi: "अम्लीय प्रदूषित पानी / फैक्टरी नाला (Toxic Acidic)",
    category: "toxic",
    icon: "⚠️",
    description: "Severe industrial or battery chemical runoff with dangerous acidic pH (3.4) and zero biological safety.",
    measured: {
      ph: { value: 3.4, rgb: { r: 248, g: 125, b: 72 }, hex: "#f87d48" },
      hardness: { value: 410, rgb: { r: 35, g: 105, b: 175 }, hex: "#2369af" },
      chlorine: { value: 4.8, rgb: { r: 130, g: 5, b: 125 }, hex: "#82057d" },
      alkalinity: { value: 15, rgb: { r: 255, g: 255, b: 191 }, hex: "#ffffbf" }
    }
  },
  {
    id: "tanker_high_chlorine",
    title: "High-Chlorine Tanker Water (Bleach Overdose)",
    titleHi: "अत्यधिक क्लोरीनयुक्त टैंकर का पानी (Bleach Tanker)",
    category: "toxic",
    icon: "🚚",
    description: "Excessive sodium hypochlorite added by private water tanker drivers to mask stench.",
    measured: {
      ph: { value: 8.6, rgb: { r: 35, g: 140, b: 165 }, hex: "#238ca5" },
      hardness: { value: 210, rgb: { r: 85, g: 145, b: 190 }, hex: "#5591be" },
      chlorine: { value: 5.5, rgb: { r: 115, g: 0, b: 115 }, hex: "#730073" },
      alkalinity: { value: 170, rgb: { r: 5, g: 100, b: 60 }, hex: "#05643c" }
    }
  },
  {
    id: "natural_spring",
    title: "Himalayan Natural Mountain Spring",
    titleHi: "हिमालयी प्राकृतिक झरना (Pure Mountain Spring)",
    category: "safe",
    icon: "🏔️",
    description: "Naturally filtered through mountain limestone and quartz rock strata with natural alkaline balance.",
    measured: {
      ph: { value: 7.6, rgb: { r: 50, g: 175, b: 85 }, hex: "#32af55" },
      hardness: { value: 90, rgb: { r: 195, g: 50, b: 60 }, hex: "#c3323c" },
      chlorine: { value: 0.0, rgb: { r: 247, g: 247, b: 247 }, hex: "#f7f7f7" },
      alkalinity: { value: 110, rgb: { r: 55, g: 165, b: 80 }, hex: "#37a550" }
    }
  }
];
