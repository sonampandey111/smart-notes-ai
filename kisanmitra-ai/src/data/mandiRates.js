export const mandiRates = [
  {
    id: "wheat-sharbati",
    crop_hi: "गेहूँ (शरबती / लोकवान)",
    crop_en: "Wheat (Sharbati / Lokwan)",
    variety: "Lokwan Grade-A",
    msp: 2275,
    current_avg: 2480,
    unit: "₹ / क्विंटल",
    trend: "up", // up, down, stable
    change_today: +45,
    top_mandi: {
      name_hi: "खन्ना मंडी (लुधियाना, पंजाब)",
      name_en: "Khanna APMC Mandi (Punjab)",
      price: 2540,
      distance_km: 24
    },
    local_mandi: {
      name_hi: "नजदीकी जिला मंडी",
      name_en: "Local District Mandi",
      price: 2420
    },
    recommendation_hi: "भाव में तेजी बनी हुई है! नजदीकी मंडी की तुलना में खन्ना मंडी में बेचने पर ₹120 प्रति क्विंटल का अतिरिक्त मुनाफा मिलेगा। 3-4 दिन होल्ड करना फायदेमंद हो सकता है।",
    recommendation_en: "Strong upward price momentum! Selling at Khanna Mandi yields ₹120/qtl extra profit over local APMC. Holding harvest for 3 days recommended.",
    state: "Punjab / Haryana / UP / MP",
    history_7d: [2380, 2400, 2415, 2430, 2450, 2465, 2480]
  },
  {
    id: "paddy-basmati",
    crop_hi: "धान (बासमती 1509 / 1121)",
    crop_en: "Paddy (Basmati 1509 / 1121)",
    variety: "1509 Export Quality",
    msp: 2203,
    current_avg: 3850,
    unit: "₹ / क्विंटल",
    trend: "up",
    change_today: +80,
    top_mandi: {
      name_hi: "करनाल मंडी (हरियाणा)",
      name_en: "Karnal Rice Market (Haryana)",
      price: 3990,
      distance_km: 38
    },
    local_mandi: {
      name_hi: "स्थानीय अनाज मंडी",
      name_en: "Local Grain Mandi",
      price: 3780
    },
    recommendation_hi: "चावल मिलों की भारी मांग है। करनाल मंडी में ₹210 प्रति क्विंटल अधिक दाम मिल रहा है। आज बेचने का उत्तम समय है!",
    recommendation_en: "High miller export demand. Karnal Mandi offers ₹210/quintal premium over local trade. Prime time to liquidate stock.",
    state: "Haryana / Punjab / UP",
    history_7d: [3620, 3680, 3710, 3750, 3800, 3820, 3850]
  },
  {
    id: "mustard-sarson",
    crop_hi: "सरसों / राई (Mustard)",
    crop_en: "Mustard Seed (Sarson)",
    variety: "Black Pusa Bold (42% Oil)",
    msp: 5650,
    current_avg: 5820,
    unit: "₹ / क्विंटल",
    trend: "stable",
    change_today: +15,
    top_mandi: {
      name_hi: "अलवर मंडी (राजस्थान)",
      name_en: "Alwar Oilseed Mandi (Rajasthan)",
      price: 5960,
      distance_km: 45
    },
    local_mandi: {
      name_hi: "क्षेत्रीय मंडी",
      name_en: "Regional Mandi",
      price: 5790
    },
    recommendation_hi: "तेल मिलों की खरीद स्थिर है। 42% तेल मात्रा वाली सरसों का भाव एमएसपी से ₹170 अधिक मिल रहा है।",
    recommendation_en: "Oil mill procurement stable. Batches with >42% oil content trade ₹170 over MSP. Favorable selling window.",
    state: "Rajasthan / Haryana / MP",
    history_7d: [5790, 5800, 5810, 5805, 5815, 5810, 5820]
  },
  {
    id: "soybean-yellow",
    crop_hi: "सोयाबीन (पीला सोना)",
    crop_en: "Soybean (Yellow Gold)",
    variety: "JS-9560 / JS-2034",
    msp: 4600,
    current_avg: 4890,
    unit: "₹ / क्विंटल",
    trend: "up",
    change_today: +60,
    top_mandi: {
      name_hi: "इंदौर मंडी (मध्य प्रदेश)",
      name_en: "Indore APMC Yard (MP)",
      price: 5040,
      distance_km: 32
    },
    local_mandi: {
      name_hi: "उज्जैन मंडी",
      name_en: "Ujjain Local Mandi",
      price: 4850
    },
    recommendation_hi: "वैश्विक खाद्य तेल मांग के चलते सोयाबीन भाव ₹5,000 पार कर रहा है। इंदौर मंडी सीधे बिकवाली के लिए सर्वश्रेष्ठ है।",
    recommendation_en: "Driven by edible oil demand, prices breach ₹5,000 mark. Indore APMC yard offers direct cash settlement at ₹5,040.",
    state: "Madhya Pradesh / Maharashtra",
    history_7d: [4720, 4750, 4790, 4810, 4830, 4870, 4890]
  },
  {
    id: "tomato-hybrid",
    crop_hi: "टमाटर (हाइब्रिड लाल)",
    crop_en: "Tomato (Hybrid Red)",
    variety: "Abhinav / S-152",
    msp: 0, // No MSP for perishable horticulture
    current_avg: 1850,
    unit: "₹ / क्विंटल (₹18.5/किग्रा)",
    trend: "down",
    change_today: -70,
    top_mandi: {
      name_hi: "आजादपुर मंडी (दिल्ली)",
      name_en: "Azadpur Fruit & Veg Mandi (Delhi)",
      price: 2150,
      distance_km: 65
    },
    local_mandi: {
      name_hi: "सब्जी मंडी हाट",
      name_en: "Local Sabzi Mandi",
      price: 1780
    },
    recommendation_hi: "आवक बढ़ने से दाम गिर रहे हैं। तैयार माल को तुरंत बड़े शहर की आजादपुर मंडी में भेजें या सीधे होटल/प्रोसेसर को बेचें।",
    recommendation_en: "Heavy seasonal arrivals causing slight price drop. Recommend immediate transport to Azadpur metro market or direct bulk sale.",
    state: "UP / Haryana / Delhi / MP / Karnataka",
    history_7d: [2100, 2050, 1980, 1940, 1900, 1880, 1850]
  },
  {
    id: "potato-chandramukhi",
    crop_hi: "आलू (पुखराज / चंद्रमुखी)",
    crop_en: "Potato (Pukhraj / Chandramukhi)",
    variety: "Kufri Jyoti / Pukhraj",
    msp: 0,
    current_avg: 1280,
    unit: "₹ / क्विंटल (₹12.8/किग्रा)",
    trend: "stable",
    change_today: +20,
    top_mandi: {
      name_hi: "आगरा मंडी (उत्तर प्रदेश)",
      name_en: "Agra Cold Storage APMC (UP)",
      price: 1390,
      distance_km: 40
    },
    local_mandi: {
      name_hi: "फर्रुखाबाद मंडी",
      name_en: "Farrukhabad Mandi",
      price: 1250
    },
    recommendation_hi: "कोल्ड स्टोरेज से निकासी सुचारू है। चिप्स कंपनियों को सीधे आपूर्ति करने पर 15% अधिक मूल्य प्राप्त हो रहा है।",
    recommendation_en: "Stable cold storage off-take. Supplying directly to potato chip processors yields 15% price markup over open APMC.",
    state: "Uttar Pradesh / West Bengal / Punjab",
    history_7d: [1220, 1240, 1250, 1260, 1270, 1275, 1280]
  },
  {
    id: "cotton-narma",
    crop_hi: "कपास (नरमा / बीटी कॉटन)",
    crop_en: "Raw Cotton (Narma / Kapas)",
    variety: "Long Staple Shankar-6",
    msp: 7020,
    current_avg: 7450,
    unit: "₹ / क्विंटल",
    trend: "up",
    change_today: +110,
    top_mandi: {
      name_hi: "राजकोट मंडी (गुजरात)",
      name_en: "Rajkot Cotton Market Yard (Gujarat)",
      price: 7680,
      distance_km: 70
    },
    local_mandi: {
      name_hi: "बठिंडा मंडी",
      name_en: "Bathinda Mandi (Punjab)",
      price: 7390
    },
    recommendation_hi: "टेक्सटाइल मिलों की वैश्विक मांग से नरमा में बंपर तेजी। एमएसपी ₹7,020 से ₹430 ऊपर भाव चल रहा है!",
    recommendation_en: "Surging textile mill procurement. Narma trades at ₹430 above government MSP benchmark.",
    state: "Gujarat / Maharashtra / Punjab / Rajasthan",
    history_7d: [7180, 7230, 7290, 7340, 7380, 7420, 7450]
  },
  {
    id: "onion-nasik",
    crop_hi: "प्याज (नासिक लाल)",
    crop_en: "Red Onion (Nasik Premium)",
    variety: "Garwa / Rabi Red",
    msp: 0,
    current_avg: 2350,
    unit: "₹ / क्विंटल (₹23.5/किग्रा)",
    trend: "up",
    change_today: +90,
    top_mandi: {
      name_hi: "लासलगांव मंडी (नासिक, महाराष्ट्र)",
      name_en: "Lasalgaon Onion Mandi (Nashik)",
      price: 2580,
      distance_km: 55
    },
    local_mandi: {
      name_hi: "पुणे गुलटेकडी मंडी",
      name_en: "Pune Market Yard",
      price: 2310
    },
    recommendation_hi: "लासलगांव एशिया की सबसे बड़ी प्याज मंडी है जहाँ सर्वाधिक ₹2,580 का भाव है। निर्यात मांग से भाव चढ़ रहा है।",
    recommendation_en: "Lasalgaon offers peak trade value at ₹2,580/qtl due to strong southern and export shipments.",
    state: "Maharashtra / MP / Karnataka",
    history_7d: [2050, 2110, 2180, 2240, 2290, 2320, 2350]
  }
];

export const sampleMarketListings = [
  {
    id: "lst-101",
    farmer_name: "रामेश्वर सिंह (Rameshwar Singh)",
    location: "मेरठ, उत्तर प्रदेश (Meerut, UP)",
    crop: "बासमती धान (1509 Basmati Paddy)",
    quantity: "85 क्विंटल",
    expected_price: "₹3,920 / क्विंटल",
    quality_grade: "Grade-A (Dry Moisture 12%)",
    phone: "+91 98765 43210",
    verified: true,
    days_ago: "आज ही पोस्ट किया (Today)"
  },
  {
    id: "lst-102",
    farmer_name: "गुरप्रीत सिंह (Gurpreet Singh)",
    location: "पटियाला, पंजाब (Patiala, Punjab)",
    crop: "शरबती गेहूँ (Sharbati Wheat)",
    quantity: "140 क्विंटल",
    expected_price: "₹2,510 / क्विंटल",
    quality_grade: "Premium Bold Clean Grain",
    phone: "+91 98123 45678",
    verified: true,
    days_ago: "1 दिन पहले (Yesterday)"
  },
  {
    id: "lst-103",
    farmer_name: "कमलेश पाटीदार (Kamlesh Patidar)",
    location: "उज्जैन, मध्य प्रदेश (Ujjain, MP)",
    crop: "सोयाबीन JS-9560 (Yellow Soybean)",
    quantity: "60 क्विंटल",
    expected_price: "₹4,950 / क्विंटल",
    quality_grade: "Double Filtered Dry Seeds",
    phone: "+91 97531 24680",
    verified: true,
    days_ago: "आज ही पोस्ट किया (Today)"
  },
  {
    id: "lst-104",
    farmer_name: "दिनेश चौधरी (Dinesh Choudhary)",
    location: "भरतपुर, राजस्थान (Bharatpur, RJ)",
    crop: "काली सरसों (Pusa Bold Mustard)",
    quantity: "95 क्विंटल",
    expected_price: "₹5,880 / क्विंटल",
    quality_grade: "42.5% Certified Oil Content",
    phone: "+91 94140 12345",
    verified: true,
    days_ago: "2 दिन पहले (2d ago)"
  }
];
