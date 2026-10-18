# 💧 AquaStrip AI – Water Quality Scanner via Smartphone Camera

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![React 19](https://img.shields.io/badge/React-19.2-cyan.svg)](https://react.dev)
[![Vite 8](https://img.shields.io/badge/Vite-8.3-purple.svg)](https://vite.dev)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind-v4.0-38bdf8.svg)](https://tailwindcss.com)
[![Status: Production Ready](https://img.shields.io/badge/Status-Hackathon%20Ready-emerald.svg)]()

> **"Low-Cost Hardware (₹5-10 Strip) + Smartphone Camera Computer Vision = Pure Innovation."**  
> *Bazaar me milne wali ₹5-10 ki litmus/test strip ko paani me duba kar phone camera ke aage rakho — AI turant batayega paani peene layak hai ya nahi, aur RO ya ubaalna zaroori hai ya nahi.*

---

## 📌 Problem Statement (समस्या)
- **Mehangi Lab Testing**: Peene ke paani me contamination (pH, hardness, chlorine, alkalinity) check karne ke liye ₹800 se ₹2,500 tak kharch karne padte hain aur 3–5 din ka intezar karna padta hai.
- **Grameen aur Aam Janta ke liye Asuvidha**: Rural areas, schools, aur tier-2/3 cities me water testing labs uplabdh nahi hoti hain, jisse contaminated paani peene se kidney stones, jaundice, typhoid, aur fluorosis jaisi bimariyan failti hain.
- **Digital TDS / Photometer Meters**: Market me milne wale digital water testers ₹2,000 se ₹15,000 ke aate hain jo aam insaan afford nahi kar sakta.

---

## 💡 Solution: AquaStrip AI (हमारा समाधान)
1. **Ati-Sasti Hardware (₹5 - ₹10)**: Har medical store aur stationary par milne wali simple litmus paper ya 4-in-1 multi-parameter water test strip.
2. **Smartphone Camera & Computer Vision**: Strip ko phone camera ke aage rakhein. Hamara vision engine:
   - Screen par neon alignment viewfinder reticle deta hai.
   - Wet strip ke specular glare aur camera shadows ko automatically filter karta hai.
   - Strip ke exact RGB shade ko CIE L\*a\*b\* color space me convert karke calibrated standard color-chart se match karta hai.
   - Continuous inverse-distance weighting se decimal precision (jaise pH 7.3) nikalta hai.
3. **Instant Output**:
   - **pH & Hardness Level**: Numerical precision parameters (pH 1–14, Hardness 0–425 ppm, Chlorine 0–10 ppm, Alkalinity 0–240 ppm).
   - **Safety Verdict**: 🟢 **SAFE (Peene Yogya)**, 🟡 **MODERATE (Chintajanak / Treatment Advised)**, ya 🔴 **TOXIC / UNSAFE (Peene Layak Nahi)**.
   - **Water Potability Index (WQI)**: 0 to 100% composite score.
   - **Filtration Recommendations**: E.g., *"10-15 minute ubaalna paryapt hai"*, *"Hardness 380 ppm hai, RO filter lagana zaroori hai"*, *"Activated Carbon Filter required"*, ya *"Direct drinkable"*.
   - **Printable Water Quality Certificate**: 1-click official lab report with sample ID and timestamp.

---

## 🏆 Hackathon USP & Impact Metrics

| Metric | Traditional Lab Testing | AquaStrip AI | Disruption |
| :--- | :--- | :--- | :--- |
| **Testing Cost** | ₹800 - ₹2,500 | **₹5 - ₹10** | **99.4% Cost Reduction** |
| **Turnaround Time** | 3 to 5 Days | **Instant (2 Seconds)** | **99.9% Faster** |
| **Accessibility** | Urban Labs Only | **Any Smartphone with Camera** | **100% Decentralized** |
| **Server Cost** | High Cloud GPU fees | **Client-Side Canvas CV (₹0 Server Cost)** | **Infinite Scalability** |
| **Language Support** | Complex English jargon | **Bilingual (English + हिन्दी/Hinglish)** | **Mass Rural Adoption** |

---

## 🔬 Computer Vision & Optical Architecture

```
[ Water Sample ]
       │
[ ₹5 Chemical Strip (2 sec dip) ]
       │
[ Smartphone Camera / Video Stream ]
       │
 ┌─────▼────────────────────────────────────────┐
 │   Preprocessing & Optical Calibration        │
 │   • Neon Viewfinder Spatial Alignment        │
 │   • Glare Outlier Filter (L > 92% removed)   │
 │   • Shadow Filter (L < 15% removed)          │
 │   • White-Balance Normalization              │
 └─────┬────────────────────────────────────────┘
       │
 ┌─────▼────────────────────────────────────────┐
 │   Colorimetric Engine (CIE L*a*b* & ΔE)      │
 │   • sRGB ➔ CIE XYZ ➔ CIE L*a*b* conversion   │
 │   • CIE76 Euclidean Delta-E color distance   │
 │   • Continuous interpolation between bands   │
 └─────┬────────────────────────────────────────┘
       │
 ┌─────▼────────────────────────────────────────┐
 │   Water Potability & WHO Decision Engine     │
 │   • WHO & BIS IS 10500:2012 Compliance      │
 │   • Water Quality Index (WQI) Score (0-100)  │
 │   • Safe / Moderate / Toxic Verdict          │
 │   • Filtration Protocols (Boil / RO / Carbon)│
 └─────┬────────────────────────────────────────┘
       │
[ Instant Dashboard + Printable Water Lab Certificate ]
```

---

## 🧪 Built-in Hackathon Demo Presets
Even if judges do not have physical test strips during a presentation, AquaStrip AI includes **1-click simulated realistic sample scans**:
1. **Delhi Jal Board / Municipal Tap Water** (Safe, pH 7.3, Hardness 115 ppm, Chlorine 0.4 ppm)
2. **Packaged RO Mineral Water** (Safe, pH 6.9, Hardness 35 ppm, Chlorine 0.0 ppm)
3. **Village Borewell Groundwater** (Moderate, pH 8.2, Hardness 380 ppm — RO Recommended)
4. **Acidic Industrial Effluent** (Toxic, pH 3.4, Hardness 410 ppm, Chlorine 4.8 ppm)
5. **High-Chlorine Apartment Tanker Water** (Bleach overdose, pH 8.6, Chlorine 5.5 ppm — Carbon/Boil needed)
6. **Himalayan Mountain Spring Water** (Pure, pH 7.6, Hardness 90 ppm, 100% Potability)

---

## 🚀 Quick Start / Local Setup

### Prerequisites
- Node.js (v18 or higher)
- npm or pnpm

### Installation
```bash
# Clone the repository
git clone https://github.com/sonampandey111/aquastrip-ai.git

# Navigate into project directory
cd aquastrip-ai

# Install dependencies
npm install

# Start development server
npm run dev
```

Open your browser at `http://localhost:5173`.

---

## 📦 Production Build & GitHub Pages Deployment

To build optimized static bundle:
```bash
npm run build
```
The output will be in `dist/`. Since `vite.config.js` uses relative paths (`base: './'`), the `dist/` directory can be deployed directly to:
- **GitHub Pages** (via GitHub Actions included in `.github/workflows/deploy.yml`)
- **Vercel**
- **Netlify**
- Or served directly via any static web server!

---

## 📜 Standards & Compliance
- **WHO Guidelines for Drinking-water Quality (4th Edition)**
- **Bureau of Indian Standards (BIS IS 10500:2012)**:
  - pH: 6.5 to 8.5 (Desirable)
  - Total Hardness: ≤ 200 ppm (Desirable), ≤ 600 ppm (Permissible)
  - Free Available Chlorine: 0.2 to 0.5 ppm (Desirable), ≤ 1.0 ppm (Permissible)
  - Total Alkalinity: ≤ 200 ppm (Desirable), ≤ 600 ppm (Permissible)

---

## 👥 Contributors & Credits
- **AquaStrip AI Team**
- Built for Hackathon Excellence 🇮🇳
