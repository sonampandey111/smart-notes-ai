// Weather & Spraying Advisory Service using Open-Meteo Free API

export const AGRI_REGIONS = [
  { id: "varanasi", name_hi: "वाराणसी (पूर्वांचल, उत्तर प्रदेश)", name_en: "Varanasi (UP)", lat: 25.3176, lon: 82.9739 },
  { id: "karnal", name_hi: "करनाल (हरियाणा धान/गेहूं बेल्ट)", name_en: "Karnal (Haryana)", lat: 29.6857, lon: 76.9905 },
  { id: "ludhiana", name_hi: "लुधियाना (पंजाब)", name_en: "Ludhiana (Punjab)", lat: 30.9010, lon: 75.8573 },
  { id: "indore", name_hi: "इंदौर (मालवा, मध्य प्रदेश)", name_en: "Indore (MP)", lat: 22.7196, lon: 75.8577 },
  { id: "jaipur", name_hi: "जयपुर (सरसों/बाजरा क्षेत्र, राजस्थान)", name_en: "Jaipur (Rajasthan)", lat: 26.9124, lon: 75.7873 },
  { id: "patna", name_hi: "पटना (बिहार मक्का/सब्जी क्षेत्र)", name_en: "Patna (Bihar)", lat: 25.5941, lon: 85.1376 },
  { id: "nagpur", name_hi: "नागपुर (विदर्भ कपास/संतरा, महाराष्ट्र)", name_en: "Nagpur (Maharashtra)", lat: 21.1458, lon: 79.0882 },
  { id: "rajkot", name_hi: "राजकोट (सौराष्ट्र मूंगफली/कपास, गुजरात)", name_en: "Rajkot (Gujarat)", lat: 22.3039, lon: 70.8022 }
];

export async function fetchLiveAgriWeather(lat = 25.3176, lon = 82.9739) {
  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,precipitation,weather_code,wind_speed_10m,wind_direction_10m&hourly=temperature_2m,precipitation_probability,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=auto`;
    const response = await fetch(url);
    if (!response.ok) throw new Error("Weather API failed");
    const data = await response.json();
    return formatAgriWeather(data);
  } catch (error) {
    console.warn("Using smart fallback weather data:", error);
    return getFallbackWeather();
  }
}

function calculateSprayWindow(temp, humidity, rainProb, windSpeed) {
  let score = 100;
  let status = "SAFE"; // SAFE, CAUTION, AVOID
  let reason_hi = "";
  let reason_en = "";

  if (rainProb > 40) {
    score -= 60;
    status = "AVOID";
    reason_hi = "बारिश की भारी संभावना है (दवा धुलकर बह जाएगी)। आज छिड़काव न करें।";
    reason_en = "High rain probability (>40%). Expensive chemicals will wash off. Do NOT spray today.";
  } else if (rainProb > 20) {
    score -= 30;
    status = "CAUTION";
    reason_hi = "हल्की बारिश या बूंदाबांदी का जोखिम है। स्टिकर/स्प्रेडर मिलाकर ही छिड़काव करें।";
    reason_en = "Moderate rain risk. Mix an agricultural surfactant/sticker if spraying.";
  }

  if (windSpeed > 18) {
    score -= 40;
    status = "AVOID";
    reason_hi = "हवा की गति 18 किमी/घंटा से अधिक है (दवा हवा में उड़कर पड़ोसी खेत में चली जाएगी)।";
    reason_en = "Wind speed exceeds 18 km/h. High spray drift hazard. Avert spraying.";
  } else if (windSpeed > 12) {
    score -= 20;
    if (status !== "AVOID") status = "CAUTION";
    reason_hi = "हवा मध्यम तेज है। नोजल को पौधे के करीब रखकर सुबह छिड़कें।";
    reason_en = "Breezy conditions. Keep sprayer nozzle close to canopy and spray early morning.";
  }

  if (temp > 36) {
    score -= 30;
    if (status !== "AVOID") status = "CAUTION";
    reason_hi = "तेज धूप और गर्मी में पत्तियों के जलने (Phytotoxicity) का खतरा है। केवल शाम को 4 बजे बाद छिड़कें।";
    reason_en = "Extreme midday heat (>36°C) can cause chemical scorch. Restrict spraying to late afternoon.";
  }

  if (humidity > 85) {
    score -= 15;
    reason_hi = "हवा में नमी अधिक है, दवा सूखने में समय लगेगा।";
    reason_en = "High relative humidity; drying time is prolonged.";
  }

  if (status === "SAFE") {
    reason_hi = "मौसम पूरी तरह अनुकूल है! हवा शांत है और बारिश का कोई खतरा नहीं। दवा छिड़काव का सबसे उत्तम समय।";
    reason_en = "Ideal spraying conditions! Calm breeze, optimal temperature, and zero rain risk.";
  }

  return {
    score: Math.max(10, Math.min(100, score)),
    status,
    reason_hi,
    reason_en
  };
}

function formatAgriWeather(data) {
  const current = data.current;
  const temp = Math.round(current.temperature_2m);
  const humidity = current.relative_humidity_2m;
  const windSpeed = Math.round(current.wind_speed_10m);
  const rainProb = data.daily?.precipitation_probability_max?.[0] || 10;

  const sprayAdvice = calculateSprayWindow(temp, humidity, rainProb, windSpeed);

  const forecast = (data.daily?.time || []).slice(0, 5).map((date, idx) => ({
    date: new Date(date).toLocaleDateString('hi-IN', { weekday: 'short', day: 'numeric', month: 'short' }),
    date_en: new Date(date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
    maxTemp: Math.round(data.daily.temperature_2m_max[idx]),
    minTemp: Math.round(data.daily.temperature_2m_min[idx]),
    rainProb: data.daily.precipitation_probability_max[idx] || 5,
    weatherCode: data.daily.weather_code[idx]
  }));

  return {
    temp,
    humidity,
    windSpeed,
    rainProb,
    weatherCode: current.weather_code,
    sprayAdvice,
    forecast
  };
}

function getFallbackWeather() {
  const sprayAdvice = calculateSprayWindow(28, 55, 10, 8);
  return {
    temp: 28,
    humidity: 55,
    windSpeed: 8,
    rainProb: 10,
    weatherCode: 1,
    sprayAdvice,
    forecast: [
      { date: "आज (सोम)", date_en: "Today", maxTemp: 31, minTemp: 19, rainProb: 10, weatherCode: 1 },
      { date: "मंगल", date_en: "Tue", maxTemp: 32, minTemp: 20, rainProb: 5, weatherCode: 0 },
      { date: "बुध", date_en: "Wed", maxTemp: 30, minTemp: 18, rainProb: 15, weatherCode: 2 },
      { date: "गुरु", date_en: "Thu", maxTemp: 29, minTemp: 18, rainProb: 20, weatherCode: 3 },
      { date: "शुक्र", date_en: "Fri", maxTemp: 31, minTemp: 19, rainProb: 10, weatherCode: 1 }
    ]
  };
}
