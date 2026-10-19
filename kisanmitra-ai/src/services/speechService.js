// Text-to-Speech Audio Service for Farmer Accessibility (Hindi & English)

let currentUtterance = null;

export function speakText(text, lang = "hi", onEndCallback = null) {
  if (!("speechSynthesis" in window)) {
    console.warn("Speech synthesis not supported in this browser");
    return false;
  }

  // Cancel any ongoing audio
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  currentUtterance = utterance;

  // Set voice language
  utterance.lang = lang === "hi" ? "hi-IN" : "en-US";
  utterance.rate = 0.95; // slightly slower for clear farmer comprehension
  utterance.pitch = 1.0;

  // Try to find a natural native Hindi or English voice
  const voices = window.speechSynthesis.getVoices();
  const targetPrefix = lang === "hi" ? "hi" : "en";
  const matchedVoice = voices.find(v => v.lang.startsWith(targetPrefix));
  if (matchedVoice) {
    utterance.voice = matchedVoice;
  }

  utterance.onend = () => {
    currentUtterance = null;
    if (onEndCallback) onEndCallback();
  };

  utterance.onerror = (e) => {
    console.warn("Speech error:", e);
    currentUtterance = null;
    if (onEndCallback) onEndCallback();
  };

  window.speechSynthesis.speak(utterance);
  return true;
}

export function stopSpeaking() {
  if ("speechSynthesis" in window) {
    window.speechSynthesis.cancel();
    currentUtterance = null;
  }
}

export function isSpeaking() {
  return window.speechSynthesis ? window.speechSynthesis.speaking : false;
}
