
import React, { useEffect, useState } from 'react';
import { CloudRain, Wind, Droplets, Sun, Calendar, MapPin, Cloud, CloudLightning, CloudSnow, Loader2 } from 'lucide-react';
import { UserLocation } from '../types';

interface WeatherSectionProps {
  userLocation: UserLocation | null;
}

// Open-Meteo WMO Code Interpretation
const getWeatherCondition = (code: number) => {
  if (code === 0) return { label: 'Clear Sky', icon: Sun, color: 'text-yellow-400' };
  if (code >= 1 && code <= 3) return { label: 'Partly Cloudy', icon: Cloud, color: 'text-gray-300' };
  if (code >= 45 && code <= 48) return { label: 'Foggy', icon: Cloud, color: 'text-gray-400' };
  if (code >= 51 && code <= 55) return { label: 'Drizzle', icon: CloudRain, color: 'text-blue-300' };
  if (code >= 61 && code <= 67) return { label: 'Rain', icon: CloudRain, color: 'text-blue-500' };
  if (code >= 71 && code <= 77) return { label: 'Snow', icon: CloudSnow, color: 'text-white' };
  if (code >= 80 && code <= 82) return { label: 'Showers', icon: CloudRain, color: 'text-blue-400' };
  if (code >= 95 && code <= 99) return { label: 'Thunderstorm', icon: CloudLightning, color: 'text-purple-400' };
  return { label: 'Clear Sky', icon: Sun, color: 'text-yellow-400' };
};

export const WeatherSection: React.FC<WeatherSectionProps> = ({ userLocation }) => {
  const [loading, setLoading] = useState(false);
  const [realWeather, setRealWeather] = useState<any>(null);

  // Default to Vadodara coordinates if no user location is provided
  const defaultLat = 22.3072;
  const defaultLng = 73.1812;

  useEffect(() => {
    const fetchWeather = async () => {
      setLoading(true);
      
      // LOGIC: Use userLocation coords if available, otherwise default to Vadodara
      // This ensures both current weather AND forecast use the same logic.
      const lat = userLocation?.lat || defaultLat;
      const lng = userLocation?.lng || defaultLng;

      try {
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current_weather=true&daily=temperature_2m_max,precipitation_probability_max&timezone=auto`
        );
        const data = await response.json();
        setRealWeather(data);
      } catch (error) {
        console.error("Failed to fetch weather", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [userLocation]); // Re-run whenever userLocation changes

  const locationDisplay = userLocation 
    ? `${userLocation.city}, ${userLocation.state}` 
    : "Vadodara, Gujarat";

  const current = realWeather?.current_weather;
  const condition = current ? getWeatherCondition(current.weathercode) : { label: 'Loading...', icon: Loader2, color: 'text-white' };
  const TempIcon = condition.icon;

  const getDayName = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  };

  return (
    <section id="weather-section" className="py-20 px-6 bg-ivory dark:bg-charcoal transition-colors duration-500 scroll-mt-32">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/20 bg-blue-500/5 backdrop-blur-md mb-4">
               <CloudRain className="w-3 h-3 text-blue-600 dark:text-blue-400" />
               <span className="text-[10px] font-jakarta tracking-widest text-blue-800 dark:text-blue-400 font-bold uppercase">Live Meteorological Data</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-outfit font-bold text-gray-900 dark:text-white">Regional Weather</h2>
          </div>
          <div className="text-right hidden md:block">
            <div className="flex items-center justify-end gap-2 text-sm font-bold text-gray-900 dark:text-white font-outfit">
               <MapPin className="w-4 h-4 text-gold" />
               {locationDisplay}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 font-inter mt-1 flex items-center justify-end gap-1">
              {loading ? <Loader2 className="w-3 h-3 animate-spin" /> : <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>}
              {loading ? "Syncing..." : "Live Data Feed"}
            </div>
          </div>
        </div>

        {/* Main Weather Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Current Status Card */}
          <div className="lg:col-span-1 bg-gradient-to-br from-blue-500 to-blue-700 rounded-[2rem] p-8 text-white relative overflow-hidden shadow-2xl shadow-blue-900/20 group">
             <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-white/20 transition-colors"></div>
             
             <div className="relative z-10 h-full flex flex-col justify-between">
               <div className="flex items-start justify-between mb-8">
                 <div className="p-4 bg-white/20 backdrop-blur-md rounded-2xl border border-white/20">
                   <TempIcon className={`w-10 h-10 ${condition.color} ${loading ? 'animate-spin' : 'animate-pulse-slow'}`} />
                 </div>
                 <span className="font-jakarta text-xs font-bold tracking-widest bg-black/20 px-3 py-1 rounded-full">LIVE</span>
               </div>
               
               <div className="mb-2">
                 <span className="text-7xl font-outfit font-bold tracking-tighter">{current ? Math.round(current.temperature) : '--'}°</span>
                 <span className="text-2xl font-outfit text-blue-100">C</span>
               </div>
               <div className="text-lg font-medium text-blue-100 mb-8">{condition.label}</div>

               <div className="grid grid-cols-2 gap-4 border-t border-white/20 pt-6">
                  <div>
                    <div className="text-xs text-blue-200 mb-1 uppercase tracking-wider">Time</div>
                    <div className="text-xl font-bold font-outfit">{current ? new Date().getHours() + ":00" : "--:--"}</div>
                  </div>
                  <div>
                    <div className="text-xs text-blue-200 mb-1 uppercase tracking-wider">Wind</div>
                    <div className="text-xl font-bold font-outfit">{current ? current.windspeed : '--'} km/h</div>
                  </div>
               </div>
             </div>
          </div>

          {/* Detailed Metrics */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4">
             {[
               { icon: Droplets, label: 'Precipitation', value: realWeather?.daily?.precipitation_probability_max?.[0] ? `${realWeather.daily.precipitation_probability_max[0]}%` : '0%', sub: 'Chance', color: 'text-cyan-500', bg: 'bg-cyan-50 dark:bg-cyan-900/10' },
               { icon: Wind, label: 'Wind Gusts', value: current ? `${current.windspeed} km/h` : '--', sub: 'Variable', color: 'text-gray-500', bg: 'bg-gray-50 dark:bg-gray-900/10' },
               { icon: Sun, label: 'UV Index', value: 'Moderate', sub: 'Standard', color: 'text-orange-500', bg: 'bg-orange-50 dark:bg-orange-900/10' },
             ].map((item, i) => (
               <div key={i} className={`rounded-3xl p-6 border border-black/5 dark:border-white/5 ${item.bg} flex flex-col justify-between hover:scale-105 transition-transform duration-300`}>
                  <div className={`w-12 h-12 rounded-full bg-white dark:bg-white/5 flex items-center justify-center shadow-sm mb-4 ${item.color}`}>
                    <item.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-2xl font-outfit font-bold text-gray-900 dark:text-white mb-1">{item.value}</div>
                    <div className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1">{item.label}</div>
                    <div className="text-[10px] text-gray-400 dark:text-gray-500">{item.sub}</div>
                  </div>
               </div>
             ))}

             {/* 4 Day Forecast Row */}
             <div className="md:col-span-3 bg-white dark:bg-white/5 border border-black/5 dark:border-white/5 rounded-3xl p-6 mt-4">
                <div className="flex items-center gap-2 mb-6">
                  <Calendar className="w-4 h-4 text-gold" />
                  <span className="text-xs font-jakarta font-bold uppercase tracking-widest text-gray-900 dark:text-white">4-Day Forecast</span>
                </div>
                <div className="grid grid-cols-4 gap-4">
                   {/* We slice from 1 to 5 to skip today (index 0) and show next 4 days */}
                   {realWeather?.daily?.time?.slice(1, 5).map((dateStr: string, idx: number) => {
                     const maxTemp = realWeather.daily.temperature_2m_max[idx + 1];
                     const rainProb = realWeather.daily.precipitation_probability_max[idx + 1];
                     // Simple icon logic based on rain probability
                     const Icon = rainProb > 50 ? CloudRain : (rainProb > 20 ? Cloud : Sun);
                     const iconColor = rainProb > 50 ? "text-blue-500" : (rainProb > 20 ? "text-gray-400" : "text-yellow-500");

                     return (
                        <div key={idx} className="text-center group cursor-pointer">
                            <div className="text-xs font-bold text-gray-400 mb-3">{getDayName(dateStr)}</div>
                            <div className={`mx-auto w-10 h-10 rounded-full bg-gray-50 dark:bg-white/10 flex items-center justify-center mb-2 group-hover:bg-gold group-hover:text-black transition-colors ${iconColor}`}>
                                <Icon className="w-5 h-5" />
                            </div>
                            <div className="text-sm font-bold text-gray-900 dark:text-white">{Math.round(maxTemp)}°</div>
                            <div className="text-[10px] text-blue-500 font-bold mt-1">{rainProb}% Rain</div>
                        </div>
                     )
                   }) || (
                     <div className="col-span-4 text-center text-sm text-gray-400 py-4">Loading Forecast...</div>
                   )}
                </div>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};
