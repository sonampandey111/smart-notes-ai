# 🌾 KisanMitra AI (किसान मित्र) - End-to-End Smart Farm Advisor

[![Vite](https://img.shields.io/badge/Vite-8.3-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-19.2-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![GitHub Pages](https://img.shields.io/badge/Live_Website-GitHub_Pages-2ea44f?logo=githubpages&logoColor=white)](https://sonampandey111.github.io/kisanmitra-ai/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

---

### 🌐 Official Live Website Link
👉 **Live Application**: **[https://sonampandey111.github.io/kisanmitra-ai/](https://sonampandey111.github.io/kisanmitra-ai/)**  
*(Click to open and test live in any mobile or desktop browser)*

---

> **"Kisan ko pata nahi kab beej boye, kab dawa dale, kaha beche"**  
> **किसान मित्र AI** solves India's core agricultural bottlenecks by combining **Computer Vision crop disease diagnosis**, **real-time weather spraying windows**, **satellite NDVI soil & vegetation telemetry**, and **live APMC mandi marketplace trading**.

---

## 📌 Problem Statement & Solution

| Problem Faced by Farmer | KisanMitra AI Solution |
| :--- | :--- |
| **"Kab beej boye?"** (Uncertain sowing time, erratic rainfall, climate shifts) | **Smart Sowing Calendar**: Soil moisture & temperature intelligence for Rabi, Kharif & Zaid seasons with certified seed varieties and seed treatment protocols. |
| **"Kab dawa dale?"** (Wasting ₹10,000+ per acre spraying pesticides right before rain or in high winds) | **Weather-based Spray Suitability Window**: Real-time Open-Meteo telemetry evaluating wind drift, humidity, temperature scorch risk, and rain probability with golden spray hours. |
| **"Kya bimari hai aur konsi dawa dale?"** (Lack of agronomists, incorrect pesticide purchases) | **Computer Vision Crop Doctor**: Farmer uploads or captures leaf photo $\rightarrow$ AI instantly identifies **Leaf Blight**, severity grade, exact chemical dosage per 15L tank, and organic neem/gaumutra alternatives. |
| **"Kaha beche?"** (Middlemen commissions, distress selling below MSP) | **Live APMC Mandi Rates & Direct Marketplace**: Compares MSP vs local vs peak nearby mandis with mileage gain, plus zero-commission farmer-to-buyer direct trading via WhatsApp. |

---

## ⚡ Core Tech Stack

```
                          ┌──────────────────────────────────────────────┐
                          │         KisanMitra AI Web Platform           │
                          │        (React 19 + Tailwind CSS v4)          │
                          └──────────────────────┬───────────────────────┘
                                                 │
            ┌─────────────────────┬──────────────┴──────────────┬─────────────────────┐
            ▼                     ▼                             ▼                     ▼
 ┌──────────────────────┐ ┌───────────────┐           ┌───────────────────┐ ┌───────────────────┐
 │   Computer Vision    │ │ Weather Engine│           │ Satellite Telemetry│ │ Mandi Marketplace │
 │ (Pixel Lesion Model) │ │ (Open-Meteo)  │           │(Sentinel-2 NDVI)  │ │ (APMC Real-time)  │
 ├──────────────────────┤ ├───────────────┤           ├───────────────────┤ ├───────────────────┤
 │ • Leaf Blight        │ │ • Spray Gauge │           │ • 10m NDVI Heatmap│ │ • 8+ Core Crops   │
 │ • Rust & Mildew      │ │ • Wind Drift  │           │ • Soil Moisture % │ │ • MSP Delta       │
 │ • Chemical Dosages   │ │ • Rain Risk   │           │ • Zone 3 Alert    │ │ • WhatsApp Connect│
 │ • Organic Remedies   │ │ • 5-Day Trend │           │ • Stress Anomaly  │ │ • Zero Middlemen  │
 └──────────────────────┘ └───────────────┘           └───────────────────┘ └───────────────────┘
            │                     │                             │                     │
            └─────────────────────┴──────────────┬──────────────┴─────────────────────┘
                                                 ▼
                                  ┌───────────────────────────────┐
                                  │      Bilingual Interface      │
                                  │   (हिन्दी & English + Voice)   │
                                  └───────────────────────────────┘
```

- **Frontend**: React 19, Vite 8, Tailwind CSS v4, Lucide React icons, Canvas Confetti.
- **Computer Vision**: In-browser Canvas spectral pixel analysis, chlorosis/necrosis ratios, lesion bounding box overlay.
- **Weather API**: Open-Meteo Live Forecast API (precipitation probability, 10m wind speed, humidity, temperature).
- **Satellite Telemetry**: Simulated ESA Sentinel-2 / Landsat NDVI & NDWI multispectral heatmaps for agricultural parcels.
- **Accessibility**: Native Web Speech Synthesis API providing voice guidance in Hindi (`hi-IN`) and English (`en-US`).

---

## 🚀 Key Features

### 1. 🔬 Computer Vision Crop Doctor ("Leaf Blight" Diagnosis)
- Instant photo upload from smartphone camera or file gallery.
- Built-in one-tap test samples for **Rice Leaf Blight**, **Wheat Rust**, **Tomato Early Blight**, and **Healthy Leaf**.
- Highlights fungal lesions and necrotic margins with interactive bounding boxes.
- Prescribes **chemical fungicide** (Propiconazole 25% EC / Mancozeb) with exact dosage per 15-liter spray tank, along with zero-budget **organic remedies** (Neem oil 1500 PPM + Gaumutra).
- **Audio Guidance**: Tap "आवाज में सुनें" to hear the diagnosis and medicine instructions read out loud.

### 2. 🌦️ "Kab Dawa Dale" - Weather & Spray Window Advisor
- Live weather telemetry across major agricultural regions (Varanasi, Karnal, Ludhiana, Indore, Jaipur, Patna, Nagpur, Rajkot).
- **Spray Suitability Index (0-100%)**:
  - 🟢 **SAFE**: Calm winds (<12 km/h), rain risk <20%, ideal absorption.
  - 🟡 **CAUTION**: Breezy conditions or high relative humidity.
  - 🔴 **AVOID**: Rain >40% (chemicals will wash away) or wind >18 km/h (spray drift).
- Hourly golden spray windows: Early Morning (6:30 - 9:30 AM) and Late Afternoon (4:30 - 6:30 PM).
- 5-Day precipitation probability forecast.

### 3. 📅 "Kab Beej Boye" - Smart Sowing Calendar
- Active seasonal calendars for **Rabi (Winter)**, **Kharif (Monsoon)**, and **Zaid (Summer)**.
- Certified seed varieties (e.g. HD-3086 Wheat, Pusa Bold Mustard, Basmati 1509 Paddy).
- Soil readiness metrics (optimal soil temperature & field moisture capacity).
- Seed treatment protocols (Rhizobium, Carbendazim, Thiram).

### 4. 🛰️ Satellite Field Health (NDVI & Soil Moisture)
- Simulated Sentinel-2 10-meter resolution vegetative index.
- Farm Parcel subdivision (Zone 1 NE, Zone 2 Core, Zone 3 SW, Zone 4 SE).
- Anomaly detection: Flags waterlogging in Zone 3 with Leaf Blight alert.
- Toggle between **NDVI Biomass Heatmap**, **Soil Moisture Saturation**, and **RGB Satellite view**.

### 5. 📈 "Kaha Beche" - Live Mandi Rates & Direct Marketplace
- Live APMC rates for Wheat, Paddy, Mustard, Soybean, Potato, Tomato, Cotton, Onion.
- Compares real-time price against Government **Minimum Support Price (MSP)**.
- Nearby top-paying mandi finder (e.g., Khanna Mandi paying +₹120/qtl over local yard).
- **Direct Farmer-to-Buyer Marketplace**: Farmers can list their produce with expected rate and connect directly to buyers via WhatsApp or phone call.

### 6. 💬 KisanMitra AI Chatbot
- 24x7 agronomy assistant answering disease, fertilizer, and mandi queries in Hindi and English.
- Pre-set prompt chips for quick tapping.
- Voice narration support.

---

## 🛠️ Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/sonampandey111/kisanmitra-ai.git

# Enter project directory
cd kisanmitra-ai

# Install dependencies
npm install

# Start local development server
npm run dev
```

### Production Build
```bash
npm run build
npm run preview
```

---

## 📂 Project Directory Structure

```
kisanmitra-ai/
├── public/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx               # Header, region selector & bilingual toggle
│   │   ├── HeroBanner.jsx           # Greeting & quick action CTAs
│   │   ├── LeafScanner.jsx          # Camera & CV leaf blight detector
│   │   ├── WeatherSprayingAdvisor.jsx# Spray window index & rain forecast
│   │   ├── SowingCalendar.jsx       # Rabi/Kharif/Zaid sowing calendar
│   │   ├── SatelliteFieldViewer.jsx # Sentinel-2 NDVI telemetry map
│   │   ├── MandiMarketplace.jsx     # Live APMC rates & direct marketplace
│   │   ├── KisanBot.jsx             # Conversational Agri AI chatbot
│   │   └── Footer.jsx               # Kisan helpline (1551) & portals
│   ├── data/
│   │   ├── cropDiseases.js          # Disease catalog, symptoms & medicines
│   │   ├── mandiRates.js            # APMC prices, MSP & listings
│   │   ├── cropCalendar.js          # Sowing calendar & certified varieties
│   │   └── translations.js          # Hindi & English dictionaries
│   ├── services/
│   │   ├── visionService.js         # Computer vision leaf analysis engine
│   │   ├── weatherService.js        # Open-Meteo live API service
│   │   ├── satelliteService.js      # Satellite NDVI & moisture telemetry
│   │   └── speechService.js         # Web Speech API bilingual audio service
│   ├── App.jsx                      # App root with state management
│   ├── main.jsx                     # Vite entry point
│   └── index.css                    # Tailwind CSS v4 directives
├── index.html                       # HTML template with Google Fonts
├── package.json
├── push_to_github.bat               # 1-click GitHub push script
├── start_kisanmitra.bat             # 1-click local launch script
├── vite.config.js
└── README.md
```

---

## 🏆 Why Will It Win?
1. **Direct to 10 Crore Farmers**: Built mobile-first, lightweight, offline-resilient, with full Hindi and voice narration so every farmer can use it effortlessly.
2. **Comprehensive End-to-End**: Answers the three foundational questions of agriculture — **when to sow**, **when to spray**, and **where to sell**.
3. **Sustainable Revenue Model**: Transaction brokerage on bulk produce trading, B2B grain miller listings, and premium precision drone/satellite soil health diagnostics.

---

## 📜 License
This project is open-source and licensed under the [MIT License](LICENSE).
