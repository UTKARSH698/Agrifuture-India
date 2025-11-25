
import React, { useState } from 'react';
import { MapPin, ChevronRight, Loader2, CheckCircle, Crosshair, ChevronDown, Droplets, Info } from 'lucide-react';
import { UserLocation } from '../types';

interface PredictionFormProps {
  onAnalyze: (data: any) => void;
  isLoading: boolean;
  onLocationUpdate: (location: UserLocation) => void;
}

const SOIL_TYPES = [
  "Don't know",
  "Alluvial Soil",
  "Black Soil (Regur)",
  "Red Soil",
  "Laterite Soil",
  "Desert / Arid Soil",
  "Forest / Mountain Soil",
  "Loamy Soil"
];

// SCIENTIFICALLY ACCURATE REGIONAL DEFAULTS (Source: NBSS&LUP)
// Maps State -> Approx Soil Properties
const REGIONAL_DEFAULTS: Record<string, { rainfall: number, soil: string, n: number, p: number, k: number, ph: number }> = {
  "Maharashtra": { rainfall: 1100, soil: "Black Soil (Regur)", n: 50, p: 30, k: 60, ph: 7.2 }, // Rich K, Low P
  "Punjab": { rainfall: 600, soil: "Alluvial Soil", n: 90, p: 60, k: 50, ph: 7.8 }, // Alkaline tendency
  "Haryana": { rainfall: 550, soil: "Alluvial Soil", n: 85, p: 55, k: 45, ph: 7.8 },
  "Uttar Pradesh": { rainfall: 850, soil: "Alluvial Soil", n: 80, p: 40, k: 50, ph: 7.2 },
  "Gujarat": { rainfall: 700, soil: "Black Soil (Regur)", n: 50, p: 40, k: 60, ph: 7.5 },
  "Rajasthan": { rainfall: 350, soil: "Desert / Arid Soil", n: 30, p: 20, k: 50, ph: 8.2 }, // High pH, Low organic matter
  "Kerala": { rainfall: 2800, soil: "Laterite Soil", n: 70, p: 30, k: 40, ph: 5.5 }, // Acidic soil
  "Tamil Nadu": { rainfall: 950, soil: "Red Soil", n: 60, p: 35, k: 50, ph: 6.8 },
  "Karnataka": { rainfall: 1200, soil: "Red Soil", n: 60, p: 40, k: 50, ph: 6.5 },
  "Telangana": { rainfall: 900, soil: "Red Soil", n: 65, p: 45, k: 45, ph: 6.8 },
  "Andhra Pradesh": { rainfall: 900, soil: "Red Soil", n: 65, p: 45, k: 45, ph: 7.0 },
  "West Bengal": { rainfall: 1600, soil: "Alluvial Soil", n: 80, p: 50, k: 50, ph: 6.0 }, // Slightly acidic alluvial
  "Madhya Pradesh": { rainfall: 1000, soil: "Black Soil (Regur)", n: 55, p: 40, k: 50, ph: 7.0 },
  "Bihar": { rainfall: 1100, soil: "Alluvial Soil", n: 70, p: 40, k: 45, ph: 6.8 },
  "Chhattisgarh": { rainfall: 1300, soil: "Red Soil", n: 60, p: 30, k: 30, ph: 6.5 },
};

export const PredictionForm: React.FC<PredictionFormProps> = ({ onAnalyze, isLoading, onLocationUpdate }) => {
  const [formData, setFormData] = useState({
    n: 50,
    p: 50,
    k: 50,
    ph: 6.5,
    rainfall: 1200,
    city: '',
    soilType: 'Alluvial Soil'
  });
  const [locating, setLocating] = useState(false);
  const [detectedAddress, setDetectedAddress] = useState<string | null>(null);
  const [detectedState, setDetectedState] = useState<string | null>(null);
  const [showSoilInfo, setShowSoilInfo] = useState(false);

  const handleManualLocation = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({...formData, city: e.target.value});
  };

  const handleSoilChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    
    if (value === "Don't know") {
      if (detectedState && REGIONAL_DEFAULTS[detectedState]) {
        const suggestedSoil = REGIONAL_DEFAULTS[detectedState].soil;
        setFormData(prev => ({ ...prev, soilType: suggestedSoil }));
        alert(`Based on your detected location (${detectedState}), your soil is likely ${suggestedSoil}. We have selected it for you.`);
      } else {
        alert("Please click 'Detect & Sync' or ensure your location is found to automatically determine the soil type.");
        setFormData(prev => ({ ...prev, soilType: value }));
      }
    } else {
      setFormData(prev => ({ ...prev, soilType: value }));
    }
  };

  const handleNumericChange = (key: string, value: string, min: number, max: number, isFloat = false) => {
    let num = isFloat ? parseFloat(value) : parseInt(value);
    if (isNaN(num)) num = min;
    // Don't enforce max rigidly on typing, allow users to type freely but clamp on blur if needed or handle logic
    // Here we clamp to ensure safety
    if (num < min) num = min;
    if (num > max) num = max;
    
    setFormData(prev => ({ ...prev, [key]: num }));
  };

  const startGps = () => {
    setLocating(true);
    setDetectedAddress(null);
    setDetectedState(null);
    
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      setLocating(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        
        try {
          // 1. Reverse Geocode
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10`
          );
          
          if (!response.ok) {
            throw new Error('Location service unavailable');
          }

          const data = await response.json();
          const address = data.address;
          
          const state = address.state || "Unknown";
          const city = address.city || address.town || address.village || address.county || address.state_district || state;
          
          setDetectedState(state);
          
          // Update Global App State for Mandi & Weather with Coordinates
          onLocationUpdate({ city, state, lat: latitude, lng: longitude });

          // 2. Smart Defaults based on State
          let newRainfall = formData.rainfall;
          let newSoil = formData.soilType; // Default to existing
          
          let newN = formData.n;
          let newP = formData.p;
          let newK = formData.k;
          let newPh = formData.ph;

          if (REGIONAL_DEFAULTS[state]) {
             const defaults = REGIONAL_DEFAULTS[state];
             newRainfall = defaults.rainfall;
             newSoil = defaults.soil; // Auto-update soil from location
             newN = defaults.n;
             newP = defaults.p;
             newK = defaults.k;
             newPh = defaults.ph;
             console.log(`Applied scientific defaults for ${state}`);
          } else {
             // Fallback estimate logic if state not in dictionary
             if (latitude < 20 && latitude > 8) newRainfall = 1500; // South India generally wetter
             else if (longitude < 73) newRainfall = 400; // West (Desert)
             else newRainfall = 1100; // Central/North Avg
          }

          setFormData(prev => ({
            ...prev,
            city: city,
            rainfall: newRainfall,
            soilType: newSoil,
            n: newN,
            p: newP,
            k: newK,
            ph: newPh
          }));
          
          setDetectedAddress(`${city}, ${state}`);
          
        } catch (error) {
          console.error("Reverse geocoding failed", error);
          setDetectedAddress(`Lat: ${latitude.toFixed(2)}, Long: ${longitude.toFixed(2)}`);
          // Even if geocoding fails, we can loosely estimate rainfall by coords
          setFormData(prev => ({
             ...prev, 
             rainfall: latitude < 20 ? 1400 : 900 // Very rough fallback
          }));
        } finally {
          setLocating(false);
        }
      },
      (error) => {
        console.error("Geolocation error", error);
        let errorMsg = "Unable to retrieve your location.";
        if (error.code === 1) errorMsg = "Permission denied. Please enter location manually.";
        alert(errorMsg);
        setLocating(false);
      },
      { enableHighAccuracy: false, timeout: 10000 }
    );
  };

  return (
    <section className="py-20 px-4 scroll-mt-32" id="prediction-engine">
      <div className="max-w-4xl mx-auto bg-white dark:bg-charcoal border border-black/5 dark:border-white/5 rounded-3xl p-8 md:p-12 relative overflow-hidden shadow-2xl shadow-black/5 dark:shadow-black/50 transition-colors duration-500">
        
        {/* Background Gradients */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 dark:bg-emerald-500/10 rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-gold/10 dark:bg-gold/5 rounded-full blur-[80px] pointer-events-none" />

        <div className="mb-10 relative z-10">
            <h2 className="text-3xl font-outfit text-gray-900 dark:text-white font-bold">Crop Intelligence Engine</h2>
            <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm font-medium">
               Auto-detect your region to fetch estimated soil & weather conditions.
            </p>
        </div>

        {/* Location Input Section */}
        <div className="mb-12 p-1.5 rounded-2xl bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 flex flex-col md:flex-row gap-2 relative z-10">
            <div className="flex-grow relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    <MapPin className="w-5 h-5" />
                </div>
                <input 
                    type="text" 
                    placeholder="Enter City / Region"
                    value={formData.city}
                    onChange={handleManualLocation}
                    className="w-full h-14 pl-12 pr-4 bg-transparent border-none focus:ring-0 text-gray-900 dark:text-white font-bold placeholder:font-medium placeholder:text-gray-400 outline-none"
                />
                {detectedAddress && (
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-emerald-600 flex items-center gap-1 text-[10px] md:text-xs font-bold bg-emerald-100 dark:bg-emerald-900/30 px-3 py-1.5 rounded-full animate-in fade-in slide-in-from-right-4">
                        <CheckCircle className="w-3 h-3" />
                        <span className="hidden md:inline">LOCATED:</span>
                        <span className="uppercase">{detectedAddress}</span>
                    </div>
                )}
            </div>
            <button 
                onClick={startGps}
                disabled={locating}
                className="h-14 px-6 md:px-8 rounded-xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white font-bold hover:bg-emerald-50 dark:hover:bg-white/10 hover:text-emerald-700 dark:hover:text-emerald-400 transition-all flex items-center gap-2 justify-center shadow-sm whitespace-nowrap active:scale-95"
            >
                {locating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Crosshair className="w-4 h-4" />}
                {locating ? "Scanning..." : "Detect & Sync"}
            </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10">
           {/* Sliders Column */}
           <div className="space-y-8">
              {[
                { label: 'Nitrogen (N)', key: 'n', min: 0, max: 140, unit: 'mg/kg' },
                { label: 'Phosphorus (P)', key: 'p', min: 0, max: 100, unit: 'mg/kg' },
                { label: 'Potassium (K)', key: 'k', min: 0, max: 100, unit: 'mg/kg' },
              ].map((field) => (
                <div key={field.key} className="group">
                  <div className="flex justify-between mb-3 items-center">
                    <label className="text-xs font-jakarta tracking-widest text-gray-500 dark:text-gray-400 uppercase font-bold">{field.label}</label>
                    <div className="flex items-center gap-2 bg-white dark:bg-black/20 px-2 py-1 rounded-lg border border-gray-200 dark:border-white/5 focus-within:border-gold/50 transition-colors">
                        <input 
                          type="number"
                          min={field.min}
                          max={field.max}
                          value={(formData as any)[field.key]}
                          onChange={(e) => handleNumericChange(field.key, e.target.value, field.min, field.max)}
                          className="w-12 bg-transparent text-right font-mono text-sm font-bold text-gray-900 dark:text-white outline-none appearance-none"
                        />
                        <span className="text-gold font-mono text-xs font-bold">{field.unit}</span>
                    </div>
                  </div>
                  <input 
                    type="range" 
                    min={field.min} max={field.max}
                    value={(formData as any)[field.key]}
                    onChange={(e) => setFormData({...formData, [field.key]: parseInt(e.target.value)})}
                    className="w-full h-1.5 bg-gray-200 dark:bg-white/10 rounded-lg appearance-none cursor-pointer accent-gold hover:accent-emerald-500 transition-colors"
                  />
                </div>
              ))}
           </div>

           {/* Secondary Inputs */}
           <div className="space-y-8">
              
              {/* Soil Type Selector */}
              <div className="group relative">
                <div className="flex justify-between mb-3 relative">
                    <div className="flex items-center gap-2">
                      <label className="block text-xs font-jakarta tracking-widest text-gray-500 dark:text-gray-400 uppercase font-bold">Soil Type</label>
                      <button 
                        type="button"
                        onClick={() => setShowSoilInfo(!showSoilInfo)}
                        onMouseEnter={() => setShowSoilInfo(true)}
                        onMouseLeave={() => setShowSoilInfo(false)}
                        className="text-gray-500 dark:text-gray-400 hover:text-gold transition-colors focus:outline-none"
                      >
                        <Info size={14} />
                      </button>
                    </div>
                    
                    {/* Tooltip */}
                    {showSoilInfo && (
                      <div className="absolute left-0 bottom-full mb-2 w-72 md:w-80 bg-white dark:bg-charcoal border border-black/10 dark:border-white/10 rounded-xl p-4 shadow-xl shadow-black/20 z-50 text-xs text-left animate-in fade-in zoom-in-95 backdrop-blur-md">
                        <h4 className="font-bold text-gray-900 dark:text-white mb-2 font-outfit border-b border-gray-100 dark:border-white/10 pb-2">Soil Properties Guide</h4>
                        <ul className="space-y-1.5 text-gray-600 dark:text-gray-300 font-inter">
                          <li><strong className="text-emerald-600 dark:text-emerald-400">Alluvial:</strong> Most fertile, river basins (Wheat/Rice).</li>
                          <li><strong className="text-emerald-600 dark:text-emerald-400">Black:</strong> High moisture retention (Cotton/Soy).</li>
                          <li><strong className="text-emerald-600 dark:text-emerald-400">Red:</strong> Porous, iron-rich (Pulses/Oilseeds).</li>
                          <li><strong className="text-emerald-600 dark:text-emerald-400">Laterite:</strong> Acidic, rocky (Cashew/Tea).</li>
                          <li><strong className="text-emerald-600 dark:text-emerald-400">Loamy:</strong> Balanced sand/silt/clay (Vegetables).</li>
                        </ul>
                        {/* Little triangle arrow */}
                        <div className="absolute bottom-[-6px] left-6 w-3 h-3 bg-white dark:bg-charcoal border-r border-b border-black/10 dark:border-white/10 transform rotate-45"></div>
                      </div>
                    )}

                    <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-100 dark:bg-emerald-900/30 px-2 py-0.5 rounded-full">REQUIRED</span>
                </div>
                <div className="relative">
                  <select
                    value={formData.soilType}
                    onChange={handleSoilChange}
                    className="w-full appearance-none bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-4 text-sm font-bold text-gray-900 dark:text-white focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/50 transition-all cursor-pointer shadow-sm hover:bg-white dark:hover:bg-white/10"
                  >
                    {SOIL_TYPES.map(type => (
                      <option key={type} value={type} className="bg-white dark:bg-charcoal text-gray-900 dark:text-white py-2">{type}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 dark:text-gray-500 pointer-events-none" />
                </div>
              </div>

              {/* pH Level */}
              <div className="group">
                  <div className="flex justify-between mb-3 items-center">
                    <label className="text-xs font-jakarta tracking-widest text-gray-500 dark:text-gray-400 uppercase font-bold">Soil pH Level</label>
                    <div className="flex items-center gap-2 bg-white dark:bg-black/20 px-2 py-1 rounded-lg border border-gray-200 dark:border-white/5 focus-within:border-gold/50 transition-colors">
                      <input 
                        type="number"
                        min="4" max="10" step="0.1"
                        value={formData.ph}
                        onChange={(e) => handleNumericChange('ph', e.target.value, 4, 10, true)}
                        className="w-12 bg-transparent text-right font-mono text-sm font-bold text-emerald-700 dark:text-emerald-400 outline-none appearance-none"
                      />
                    </div>
                  </div>
                  <input 
                    type="range" 
                    min="4" max="10" step="0.1"
                    value={formData.ph}
                    onChange={(e) => setFormData({...formData, ph: parseFloat(e.target.value)})}
                    className="w-full h-1.5 bg-gray-200 dark:bg-white/10 rounded-lg appearance-none cursor-pointer accent-emerald-600 dark:accent-emerald-500"
                  />
                  <div className="flex justify-between text-[10px] text-gray-500 dark:text-gray-600 mt-2 font-medium">
                    <span>Acidic</span>
                    <span>Neutral</span>
                    <span>Alkaline</span>
                  </div>
              </div>

              {/* Rainfall Estimate */}
              <div className="group">
                  <div className="flex justify-between mb-3 items-center">
                    <div className="flex items-center gap-2">
                         <label className="text-xs font-jakarta tracking-widest text-gray-500 dark:text-gray-400 uppercase font-bold">Rainfall</label>
                         <Droplets className="w-3 h-3 text-blue-500" />
                    </div>
                    <div className="flex items-center gap-2 bg-white dark:bg-black/20 px-2 py-1 rounded-lg border border-gray-200 dark:border-white/5 focus-within:border-gold/50 transition-colors">
                      <input 
                        type="number"
                        min="200" max="4000"
                        value={formData.rainfall}
                        onChange={(e) => handleNumericChange('rainfall', e.target.value, 200, 4000)}
                        className="w-16 bg-transparent text-right font-mono text-sm font-bold text-blue-600 dark:text-blue-400 outline-none appearance-none"
                      />
                      <span className="text-blue-600 dark:text-blue-400 font-mono text-xs font-bold">mm</span>
                    </div>
                  </div>
                  <input 
                    type="range" 
                    min="200" max="4000"
                    value={formData.rainfall}
                    onChange={(e) => setFormData({...formData, rainfall: parseInt(e.target.value)})}
                    className="w-full h-1.5 bg-gray-200 dark:bg-white/10 rounded-lg appearance-none cursor-pointer accent-blue-600 dark:accent-blue-500"
                  />
                  <p className="text-[10px] text-gray-400 mt-2">Annual estimate based on {formData.city || "detected region"}.</p>
              </div>

              {/* Action Button */}
              <button 
                onClick={() => onAnalyze(formData)}
                disabled={isLoading}
                className="w-full mt-8 bg-charcoal dark:bg-white text-white dark:text-obsidian h-16 rounded-xl font-bold font-jakarta tracking-wider hover:bg-gold dark:hover:bg-gold hover:text-black dark:hover:text-black transition-all duration-300 flex items-center justify-center gap-2 group shadow-xl shadow-black/10 dark:shadow-white/10 hover:shadow-2xl hover:-translate-y-1"
              >
                {isLoading ? (
                  <>Processing <Loader2 className="animate-spin ml-2" /></>
                ) : (
                  <>ANALYSE SOIL DATA <ChevronRight className="group-hover:translate-x-1 transition-transform" /></>
                )}
              </button>
           </div>
        </div>
      </div>
    </section>
  );
};
