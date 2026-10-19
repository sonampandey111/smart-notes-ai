import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroBanner from './components/HeroBanner';
import LeafScanner from './components/LeafScanner';
import WeatherSprayingAdvisor from './components/WeatherSprayingAdvisor';
import SowingCalendar from './components/SowingCalendar';
import SatelliteFieldViewer from './components/SatelliteFieldViewer';
import MandiMarketplace from './components/MandiMarketplace';
import KisanBot from './components/KisanBot';
import Footer from './components/Footer';
import { AGRI_REGIONS, fetchLiveAgriWeather } from './services/weatherService';

export default function App() {
  const [lang, setLang] = useState('hi'); // Default Hindi for Indian farmers
  const [selectedRegion, setSelectedRegion] = useState(AGRI_REGIONS[0]); // Varanasi (Purvanchal)
  const [activeTab, setActiveTab] = useState('scan'); // 'scan' | 'weather' | 'sowing' | 'satellite' | 'mandi' | 'chat'
  const [weatherData, setWeatherData] = useState(null);
  const [loadingWeather, setLoadingWeather] = useState(true);

  useEffect(() => {
    let isMounted = true;
    async function loadWeather() {
      setLoadingWeather(true);
      const data = await fetchLiveAgriWeather(selectedRegion.lat, selectedRegion.lon);
      if (isMounted) {
        setWeatherData(data);
        setLoadingWeather(false);
      }
    }
    loadWeather();
    return () => {
      isMounted = false;
    };
  }, [selectedRegion]);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col selection:bg-emerald-500 selection:text-white">
      {/* Navigation Header */}
      <Navbar
        lang={lang}
        setLang={setLang}
        selectedRegion={selectedRegion}
        setSelectedRegion={setSelectedRegion}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-6 sm:py-8">
        {/* Hero Greeting & Quick Actions */}
        <HeroBanner
          lang={lang}
          setActiveTab={setActiveTab}
          weatherData={weatherData}
        />

        {/* Tab Render Switch */}
        <div className="transition-opacity duration-300">
          {activeTab === 'scan' && (
            <LeafScanner lang={lang} setActiveTab={setActiveTab} />
          )}

          {activeTab === 'weather' && (
            <WeatherSprayingAdvisor
              lang={lang}
              weatherData={weatherData}
              selectedRegion={selectedRegion}
            />
          )}

          {activeTab === 'sowing' && (
            <SowingCalendar lang={lang} />
          )}

          {activeTab === 'satellite' && (
            <SatelliteFieldViewer
              lang={lang}
              setActiveTab={setActiveTab}
            />
          )}

          {activeTab === 'mandi' && (
            <MandiMarketplace lang={lang} />
          )}

          {activeTab === 'chat' && (
            <KisanBot lang={lang} setActiveTab={setActiveTab} />
          )}
        </div>
      </main>

      {/* Footer */}
      <Footer lang={lang} />
    </div>
  );
}
