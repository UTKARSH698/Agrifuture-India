
import React, { useState } from 'react';
import { Leaf } from 'lucide-react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MandiTicker } from './components/MandiTicker';
import { DigitalTwin } from './components/DigitalTwin';
import { WeatherSection } from './components/WeatherSection';
import { PredictionForm } from './components/PredictionForm';
import { ResultsView } from './components/ResultsView';
import { SupportSection } from './components/SupportSection';
import { CropGuide } from './components/CropGuide';
import { getCropPrediction } from './services/geminiService';
import { ThemeMode, PredictionResult, UserLocation, Language } from './types';

function App() {
  const [theme, setTheme] = useState<ThemeMode>(ThemeMode.DARK);
  const [prediction, setPrediction] = useState<PredictionResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [scanning, setScanning] = useState(false);
  
  // Navigation State
  const [view, setView] = useState<'home' | 'crop-guide'>('home');

  // Lifted States
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const [language, setLanguage] = useState<Language>(Language.EN);

  const toggleTheme = () => {
    const newTheme = theme === ThemeMode.DARK ? ThemeMode.LIGHT : ThemeMode.DARK;
    setTheme(newTheme);
    if (newTheme === ThemeMode.DARK) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const handleAnalysis = async (formData: any) => {
    setLoading(true);
    setScanning(true);

    try {
      // 1. Simulate "Scanning" phase visually
      await new Promise(r => setTimeout(r, 2000));
      
      // 2. Fetch "Simulated" Gemini data
      const result = await getCropPrediction(
        { lat: 0, lng: 0 }, 
        { 
          n: formData.n, 
          p: formData.p, 
          k: formData.k, 
          ph: formData.ph,
          soilType: formData.soilType 
        }
      );

      setPrediction(result);
    } catch (error) {
      console.error("Analysis failed", error);
    } finally {
      setLoading(false);
      setScanning(false);
      // Smooth scroll to results
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }
  };

  const scrollToSection = (id: string) => {
    if (view !== 'home') {
      setView('home');
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Sync theme with body class on mount/change
  React.useEffect(() => {
    if (theme === ThemeMode.DARK) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <div className={`min-h-screen relative font-inter transition-colors duration-700 ease-in-out ${theme === ThemeMode.DARK ? 'bg-obsidian text-white' : 'bg-ivory text-light-body'}`}>
      
      {/* Texture Overlay */}
      <div className="fixed inset-0 pointer-events-none z-[60] bg-noise opacity-[0.03] mix-blend-overlay"></div>

      <Navbar 
        theme={theme} 
        toggleTheme={toggleTheme} 
        language={language}
        setLanguage={setLanguage}
        onNavigateToCropGuide={() => {
          setView('crop-guide');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
      
      <main>
        {view === 'crop-guide' ? (
          <CropGuide onBack={() => {
            setView('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }} />
        ) : !prediction && !scanning ? (
          <>
            <Hero language={language} />
            <MandiTicker userLocation={userLocation} />
            <WeatherSection userLocation={userLocation} />
            <DigitalTwin />
            <PredictionForm 
              onAnalyze={handleAnalysis} 
              isLoading={loading} 
              onLocationUpdate={setUserLocation}
            />
            <SupportSection />
          </>
        ) : scanning ? (
          /* Scanning Overlay Animation */
          <div className={`fixed inset-0 z-40 flex flex-col items-center justify-center transition-colors duration-500 ${theme === ThemeMode.DARK ? 'bg-obsidian' : 'bg-ivory'}`}>
             <div className="relative w-64 h-64">
                <div className="absolute inset-0 border-t-2 border-emerald-500 rounded-full animate-spin"></div>
                <div className="absolute inset-4 border-r-2 border-gold rounded-full animate-spin-slow"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-emerald-700 dark:text-emerald-400 font-jakarta text-xs tracking-[0.3em] animate-pulse font-bold">PROCESSING</span>
                </div>
             </div>
             <p className="mt-8 text-espresso dark:text-gold-light font-outfit text-lg tracking-wide">Consulting Gemini Engine...</p>
          </div>
        ) : (
          /* Results View */
          <div className="pt-20">
             <ResultsView result={prediction!} onReset={() => setPrediction(null)} />
          </div>
        )}
      </main>

      {/* Detailed Footer */}
      <footer className={`pt-20 pb-10 border-t transition-colors duration-500 ${
          theme === ThemeMode.DARK
          ? 'bg-obsidian border-white/10 text-gray-400'
          : 'bg-white border-black/5 text-taupe'
      }`}>
          <div className="max-w-7xl mx-auto px-6">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
                  {/* Brand Column (Span 5) */}
                  <div className="md:col-span-5 space-y-8">
                      {/* Logo */}
                      <div className="flex items-center gap-2 group cursor-default">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gold to-emerald-600 flex items-center justify-center shadow-lg">
                              <Leaf className="text-white w-4 h-4" />
                          </div>
                          <span className={`font-outfit font-bold text-2xl tracking-tight ${
                              theme === ThemeMode.DARK ? 'text-ivory' : 'text-espresso'
                          }`}>AgriFuture</span>
                      </div>

                      <div className="space-y-2">
                          <p className={`font-medium ${
                              theme === ThemeMode.DARK ? 'text-gray-300' : 'text-espresso'
                          }`}>Made with ❤️ for Indian Farmers.</p>
                           <p className={`font-bold text-lg font-inter ${
                              theme === ThemeMode.DARK ? 'text-emerald-500' : 'text-emerald-700'
                          }`}>जय जवान, जय किसान</p>
                      </div>
                  </div>

                  {/* Spacer */}
                  <div className="hidden md:block md:col-span-3"></div>

                  {/* Platform Links */}
                  <div className="md:col-span-2">
                      <h4 className={`font-jakarta font-bold text-xs tracking-[0.2em] uppercase mb-6 ${
                          theme === ThemeMode.DARK ? 'text-gold' : 'text-bronze'
                      }`}>PLATFORM</h4>
                      <ul className="space-y-4 font-inter text-sm font-medium">
                          <li onClick={() => scrollToSection('prediction-engine')} className="hover:text-emerald-500 cursor-pointer transition-colors">AI Engine</li>
                          <li onClick={() => scrollToSection('mandi-rates')} className="hover:text-emerald-500 cursor-pointer transition-colors">Mandi Rates</li>
                          <li 
                            onClick={() => {
                              setView('crop-guide');
                              window.scrollTo({ top: 0, behavior: 'smooth' });
                            }} 
                            className="hover:text-emerald-500 cursor-pointer transition-colors text-gold font-bold"
                          >
                            Crop Guide
                          </li>
                      </ul>
                  </div>

                  {/* Support Links */}
                  <div className="md:col-span-2">
                      <h4 className={`font-jakarta font-bold text-xs tracking-[0.2em] uppercase mb-6 ${
                          theme === ThemeMode.DARK ? 'text-gold' : 'text-bronze'
                      }`}>SUPPORT</h4>
                      <ul className="space-y-4 font-inter text-sm font-medium">
                          <li>
                            <a href="tel:9574025753" className="hover:text-emerald-500 cursor-pointer transition-colors flex items-center gap-2">
                              Helpline: 9574025753
                            </a>
                          </li>
                          <li>
                            <a href="mailto:support@agrifuture.in" className="hover:text-emerald-500 cursor-pointer transition-colors">
                              support@agrifuture.in
                            </a>
                          </li>
                          <li className="hover:text-emerald-500 cursor-pointer transition-colors">Privacy Policy</li>
                      </ul>
                  </div>
              </div>

              {/* Copyright */}
              <div className={`pt-8 border-t text-center text-xs font-jakarta tracking-wider uppercase ${
                   theme === ThemeMode.DARK ? 'border-white/5' : 'border-black/5'
              }`}>
                   <p>&copy; 2025 AgriFuture Luxe. Powered by Gemini.</p>
              </div>
          </div>
      </footer>
    </div>
  );
}

export default App;
