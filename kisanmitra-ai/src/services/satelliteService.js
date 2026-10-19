// Satellite Data Service (Simulated Sentinel-2 / Landsat NDVI & Soil Moisture)

export const satelliteTelemetry = {
  plot_id: "KM-FARM-9024",
  farmer_plot: "खेत संख्या 42, खतौनी 118 (Plot 42)",
  total_area_acres: 4.8,
  satellite_constellation: "European Space Agency (ESA) Sentinel-2B",
  last_pass: "आज सुबह 10:14 AM (Today)",
  cloud_cover: "2.4% (Clear Sky Pass)",
  overall_health_score: 82, // /100
  mean_ndvi: 0.74, // Range -1 to +1 (0.6 - 0.9 is dense healthy green vegetation)
  soil_moisture_pct: 62, // % field capacity
  chlorophyll_index: "High (0.81 CI)",
  zones: [
    {
      id: "zone-1",
      name_hi: "उत्तर-पूर्वी खंड (Zone North-East)",
      name_en: "North-East Sector",
      ndvi: 0.82,
      moisture: "65%",
      status_hi: "उत्कृष्ट स्वास्थ्य - भरपूर हरियाली",
      status_en: "Peak Health - Vigorous Canopy",
      health_color: "emerald",
      alert: null
    },
    {
      id: "zone-2",
      name_hi: "मध्य खंड (Zone Central Core)",
      name_en: "Central Core Sector",
      ndvi: 0.78,
      moisture: "60%",
      status_hi: "सामान्य - अच्छा विकास",
      status_en: "Normal - Good Growth",
      health_color: "emerald",
      alert: null
    },
    {
      id: "zone-3",
      name_hi: "दक्षिण-पश्चिमी खंड (Zone South-West)",
      name_en: "South-West Lowland Sector",
      ndvi: 0.54,
      moisture: "78% (अत्यधिक नमी)",
      status_hi: "सतर्कता: जलभराव व झुलसा रोग की संभावना",
      status_en: "Warning: Excess moisture & Leaf Blight vulnerability",
      health_color: "amber",
      alert: "जलभराव के कारण फंगस व झुलसा (Blight) का खतरा। जल निकासी करें।"
    },
    {
      id: "zone-4",
      name_hi: "किनारे की मेड़ पट्टी (Boundary Buffer)",
      name_en: "Field Perimeter Buffer",
      ndvi: 0.64,
      moisture: "52%",
      status_hi: "संतोषजनक",
      status_en: "Satisfactory",
      health_color: "blue",
      alert: null
    }
  ],
  advisories_hi: [
    "दक्षिण-पश्चिमी हिस्से में नमी 78% होने से फंगस और पत्ती झुलसा रोग (Leaf Blight) पनप सकता है। खेत से अतिरिक्त पानी निकालें।",
    "उत्तर-पूर्वी हिस्से में फसल का बायोमास बहुत घना और स्वस्थ है।"
  ],
  advisories_en: [
    "Excess moisture (78%) in South-West sector elevates fungal Leaf Blight risk. Ensure drain furrow clearing.",
    "North-East sector exhibits high NDVI biomass and peak photosynthetic vigor."
  ]
};
