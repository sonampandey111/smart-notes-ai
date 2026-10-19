export const cropCalendarData = [
  {
    season_id: "rabi",
    season_name_hi: "रबी सीजन (सर्दियों की फसल)",
    season_name_en: "Rabi Season (Winter Crops)",
    sowing_window_hi: "15 अक्टूबर से 30 नवंबर (वर्तमान उपयुक्त समय)",
    sowing_window_en: "15 October - 30 November (Active Sowing Window)",
    climate_guide_hi: "तापमान 18°C से 25°C के बीच और मिट्टी में 60% ओट (पर्याप्त नमी) होने पर बुवाई करें।",
    climate_guide_en: "Sow when ambient temperature settles between 18°C - 25°C and soil moisture reaches 60% field capacity.",
    crops: [
      {
        id: "rabi-wheat",
        crop_hi: "गेहूँ (Wheat)",
        crop_en: "Wheat",
        best_varieties_hi: "HD-3086 (पूसा गौतमी), DBW-187 (करन वंदना), PBW-725",
        best_varieties_en: "HD-3086 (Pusa Gautami), DBW-187, PBW-725",
        seed_rate: "40-45 किग्रा / एकड़",
        soil_type_hi: "दोमट या बलुई दोमट मिट्टी",
        soil_type_en: "Fertile Loamy to Clay Loam",
        days_to_harvest: "120 - 135 दिन",
        seed_treatment_hi: "कार्बेन्डाजिम 2 ग्राम + थायरम 2 ग्राम प्रति किग्रा बीज से उपचारित करें।",
        seed_treatment_en: "Treat seeds with Carbendazim 2g + Thiram 2g per kg seed.",
        status: "बुवाई का सर्वश्रेष्ठ समय (Optimal Window Now)"
      },
      {
        id: "rabi-mustard",
        crop_hi: "सरसों (Mustard / Rai)",
        crop_en: "Mustard Seed",
        best_varieties_hi: "पूसा बोल्ड, RH-725, गिरिराज, DRMRIJ-31",
        best_varieties_en: "Pusa Bold, RH-725, Giriraj, DRMRIJ-31",
        seed_rate: "1.5 - 2 किग्रा / एकड़",
        soil_type_hi: "हल्की से मध्यम दोमट मिट्टी",
        soil_type_en: "Sandy Loam with good drainage",
        days_to_harvest: "115 - 130 दिन",
        seed_treatment_hi: "इमिडाक्लोप्रिड 5 मिली प्रति किग्रा बीज (सफेद रतुआ व माहू से बचाव हेतु)।",
        seed_treatment_en: "Treat with Imidacloprid 5ml/kg to prevent aphid transmission.",
        status: "अंतिम बुवाई चरण (Late Window)"
      },
      {
        id: "rabi-gram",
        crop_hi: "चना (Desi / Kabuli Chana)",
        crop_en: "Bengal Gram / Chickpea",
        best_varieties_hi: "पूसा चमत्कार, जाकी 9218, पूसा 362",
        best_varieties_en: "Pusa Chamatkar, JG-11, JAKI 9218",
        seed_rate: "30-35 किग्रा / एकड़",
        soil_type_hi: "मध्यम से भारी मिट्टी (जलभराव न हो)",
        soil_type_en: "Medium-heavy well drained soil",
        days_to_harvest: "100 - 110 दिन",
        seed_treatment_hi: "राइजोबियम कल्चर (Rhizobium Culture) 10 ग्राम/किग्रा बीज से उपचारित करें।",
        seed_treatment_en: "Inoculate with Rhizobium culture 10g/kg for nitrogen fixation.",
        status: "बुवाई जारी रखें (Active Window)"
      },
      {
        id: "rabi-potato",
        crop_hi: "आलू (Potato)",
        crop_en: "Potato",
        best_varieties_hi: "कुफरी पुखराज (अगेती), कुफरी ज्योति, कुफरी बहार",
        best_varieties_en: "Kufri Pukhraj (Early), Kufri Jyoti, Kufri Bahar",
        seed_rate: "12-15 क्विंटल कंद / एकड़",
        soil_type_hi: "जीवांशयुक्त भुरभुरी बलुई दोमट",
        soil_type_en: "Loose, friable sandy loam",
        days_to_harvest: "80 - 100 दिन",
        seed_treatment_hi: "मैनकोजेब 2.5 ग्राम/लीटर घोल में कंद को 10 मिनट डुबोएं।",
        seed_treatment_en: "Dip seed tubers in Mancozeb 2.5g/L solution for 10 mins.",
        status: "मुख्य बुवाई का समय (Peak Sowing)"
      }
    ]
  },
  {
    season_id: "kharif",
    season_name_hi: "खरीफ सीजन (मानसून की फसल)",
    season_name_en: "Kharif Season (Monsoon Crops)",
    sowing_window_hi: "15 जून से 20 जुलाई",
    sowing_window_en: "15 June - 20 July",
    climate_guide_hi: "पहली मानसूनी बारिश के बाद जब मिट्टी में 10 सेमी गहराई तक नमी पहुंच जाए।",
    climate_guide_en: "Sow post initial monsoon showers when moisture reaches 10cm depth.",
    crops: [
      {
        id: "kharif-paddy",
        crop_hi: "धान (Paddy / Rice)",
        crop_en: "Rice / Paddy",
        best_varieties_hi: "पूसा बासमती 1509, 1121, PR-126, सरजू-52",
        best_varieties_en: "Pusa Basmati 1509, 1121, PR-126, Sarju-52",
        seed_rate: "6-8 किग्रा (नर्सरी) / एकड़",
        soil_type_hi: "चिकनी मटियार मिट्टी",
        soil_type_en: "Clayey loam with water retention",
        days_to_harvest: "120 - 145 दिन",
        seed_treatment_hi: "नमक के 10% घोल में तैरते हल्के बीज अलग करें, फिर स्ट्रेप्टोसाइक्लिन 1 ग्राम/10L में भिगोएं।",
        seed_treatment_en: "Soak in brine to discard floaters; treat with Streptocycline 1g/10L.",
        status: "आगामी सीजन (Upcoming Season)"
      },
      {
        id: "kharif-soybean",
        crop_hi: "सोयाबीन (Soybean)",
        crop_en: "Soybean",
        best_varieties_hi: "JS-9560, JS-2034, NRC-86",
        best_varieties_en: "JS-9560, JS-2034, NRC-86",
        seed_rate: "30-35 किग्रा / एकड़",
        soil_type_hi: "काली भारी दोमट मिट्टी",
        soil_type_en: "Black cotton / clay loam",
        days_to_harvest: "90 - 100 दिन",
        seed_treatment_hi: "थिरम + कार्बेन्डाजिम (2+1 ग्राम) प्रति किग्रा बीज।",
        seed_treatment_en: "Thiram + Carbendazim (2+1g) per kg seed.",
        status: "आगामी सीजन (Upcoming Season)"
      }
    ]
  },
  {
    season_id: "zaid",
    season_name_hi: "जायद सीजन (गर्मी की नकदी फसल)",
    season_name_en: "Zaid Season (Summer Crops)",
    sowing_window_hi: "15 फरवरी से 15 मार्च",
    sowing_window_en: "15 February - 15 March",
    climate_guide_hi: "सिंचित क्षेत्रों में खाली खेत का सदुपयोग कर 60 दिनों में अतिरिक्त आय कमाएं।",
    climate_guide_en: "Utilize irrigated fallow land between Rabi and Kharif for quick 60-day cash flow.",
    crops: [
      {
        id: "zaid-moong",
        crop_hi: "मूंग / उड़द (Summer Moong)",
        crop_en: "Summer Green Gram",
        best_varieties_hi: "पूसा विशाल, सम्राट, IPM-205-7",
        best_varieties_en: "Pusa Vishal, Samrat, IPM-205-7",
        seed_rate: "10-12 किग्रा / एकड़",
        soil_type_hi: "हल्की दोमट",
        soil_type_en: "Well-drained light loam",
        days_to_harvest: "60 - 65 दिन",
        seed_treatment_hi: "राइजोबियम + पीएसबी कल्चर से उपचार करें।",
        seed_treatment_en: "Rhizobium + PSB culture seed coating.",
        status: "फरवरी में तैयारी करें (Plan in Feb)"
      },
      {
        id: "zaid-cucurbit",
        crop_hi: "तरबूज, खरबूजा, खीरा (Watermelon & Cucumber)",
        crop_en: "Watermelon, Muskmelon & Cucumber",
        best_varieties_hi: "शुगर बेबी, कस्तूरी, मालविया",
        best_varieties_en: "Sugar Baby, Kasturi, Pusa Sanyog",
        seed_rate: "1-1.5 किग्रा / एकड़",
        soil_type_hi: "रेतीली दोमट या नदी के कछार",
        soil_type_en: "Sandy loam or riverbed soils",
        days_to_harvest: "70 - 85 दिन",
        seed_treatment_hi: "बीज को गुनगुने पानी में 12 घंटे भिगोकर सुखाएं।",
        seed_treatment_en: "Soak in lukewarm water for 12 hours before planting.",
        status: "फरवरी में तैयारी करें (Plan in Feb)"
      }
    ]
  }
];
