/**
 * Gemini AI Multimodal Vision Service for AquaStrip AI
 * Sends captured test strip frames to Google Gemini 1.5/2.0 Flash Vision API
 * for deep chemical diagnostic, potability evaluation, and filtration prescriptions.
 */

export const getGeminiApiKey = () => {
  return (
    localStorage.getItem('aquastrip_gemini_api_key') ||
    import.meta.env.VITE_GEMINI_API_KEY ||
    ''
  );
};

export const setGeminiApiKey = (key) => {
  if (key) {
    localStorage.setItem('aquastrip_gemini_api_key', key.trim());
  } else {
    localStorage.removeItem('aquastrip_gemini_api_key');
  }
};

/**
 * Call Google Gemini Vision API with the captured strip image (base64)
 */
export async function analyzeStripWithGemini(base64DataUrl, stripType = 'multi') {
  const apiKey = getGeminiApiKey();

  if (!apiKey) {
    throw new Error('NO_API_KEY');
  }

  // Extract base64 payload
  const base64Data = base64DataUrl.includes(',')
    ? base64DataUrl.split(',')[1]
    : base64DataUrl;

  const prompt = `
You are AquaStrip AI, a world-class water chemistry and optical diagnostic system.
Examine this image of a water test strip / litmus paper.
Analyze the color pads based on standard colorimetric water testing charts (Universal pH 1-14, Total Hardness as CaCO3, Free Available Chlorine, and Total Alkalinity).
Comply with WHO Guidelines for Drinking-water Quality and Bureau of Indian Standards (BIS IS 10500:2012).

Respond ONLY with a valid, clean JSON object (no markdown code blocks, no backticks, no preamble):
{
  "ph": 7.2,
  "hardness_ppm": 110,
  "chlorine_ppm": 0.3,
  "alkalinity_ppm": 90,
  "potability_score": 92,
  "status": "safe",
  "status_badge": "SAFE TO DRINK",
  "status_badge_hi": "पीने योग्य / पूर्ण सुरक्षित",
  "ai_verdict": "Water sample meets WHO & BIS standards with optimal pH and balanced mineral hardness.",
  "ai_verdict_hi": "यह पानी WHO और BIS मानकों के अनुकूल है और पीने के लिए सुरक्षित है।",
  "filtration_advice": [
    "Safe for direct consumption.",
    "Mild boiling (2-3 min) optional for delicate infants."
  ],
  "health_advisory": "Clean and mineral balanced. No heavy scaling or chemical hazard.",
  "health_advisory_hi": "संतुलित खनिज और रसायनों से पूरी तरह सुरक्षित।"
}

Note:
- "status" must be strictly one of: "safe", "moderate", "toxic"
- If pH is < 6.0 or > 9.0, or Hardness > 300, or Chlorine > 2.0 ppm, status must be "toxic" or "moderate".
- Provide practical household filtration recommendations (e.g. Reverse Osmosis (RO), Boiling 10-15 mins, Activated Carbon Filter, or Remineralizer).
`;

  const requestBody = {
    contents: [
      {
        parts: [
          { text: prompt },
          {
            inline_data: {
              mime_type: 'image/jpeg',
              data: base64Data
            }
          }
        ]
      }
    ],
    generationConfig: {
      temperature: 0.2,
      response_mime_type: 'application/json'
    }
  };

  // Try gemini-1.5-flash first, fallback to gemini-2.0-flash
  const models = ['gemini-1.5-flash', 'gemini-2.0-flash'];
  let lastError = null;

  for (const model of models) {
    try {
      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        const errText = await response.text();
        console.warn(`Gemini ${model} error:`, errText);
        lastError = new Error(`API Error (${response.status}): ${errText}`);
        continue;
      }

      const data = await response.json();
      const rawText =
        data.candidates?.[0]?.content?.parts?.[0]?.text || '';

      // Strip markdown code fences if model returned them
      const cleanJson = rawText
        .replace(/```json/gi, '')
        .replace(/```/g, '')
        .trim();

      const parsed = JSON.parse(cleanJson);
      return {
        success: true,
        modelUsed: model,
        data: parsed
      };
    } catch (err) {
      lastError = err;
    }
  }

  throw lastError || new Error('Gemini API call failed');
}
