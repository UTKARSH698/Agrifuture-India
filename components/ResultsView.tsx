
import React, { useState } from 'react';
import { Download, Share2, PhoneCall, Save, CheckCircle2, ChevronRight, AlertCircle } from 'lucide-react';
import { PredictionResult } from '../types';

interface ResultsViewProps {
  result: PredictionResult;
  onReset: () => void;
}

export const ResultsView: React.FC<ResultsViewProps> = ({ result, onReset }) => {
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handlePdf = () => {
    window.print();
  };

  const handleShare = () => {
    const text = `AgriFuture Recommendation: Best crop for my land is ${result.cropName} (${result.cropHindi}). Yield: ${result.yieldEstimate}, Rate: ${result.marketPriceEstimate}.`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <section className="py-20 px-4 min-h-[60vh] flex items-center justify-center">
       {/* Toast Notification */}
       {saved && (
          <div className="fixed top-24 right-6 bg-emerald-600 text-white px-6 py-3 rounded-xl shadow-2xl animate-in fade-in slide-in-from-right-10 flex items-center gap-2 z-50">
             <CheckCircle2 size={18} />
             <span className="font-bold text-sm">Report Saved Successfully</span>
          </div>
       )}

       <div className="max-w-4xl w-full animate-in fade-in slide-in-from-bottom-10 duration-700">
         
         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Main Result Card */}
            <div className="md:col-span-2 bg-gradient-to-br from-emerald-900 to-charcoal border border-emerald-500/20 rounded-3xl p-1 relative overflow-hidden group shadow-2xl shadow-emerald-900/20">
               <div className="bg-charcoal/40 backdrop-blur-sm rounded-[22px] p-8 h-full flex flex-col justify-between relative z-10">
                   
                   <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none">
                     <CheckCircle2 size={120} className="text-white" />
                   </div>
                   
                   <div className="flex flex-col gap-4">
                       <div>
                           <div className="inline-block px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-jakarta tracking-widest mb-4 border border-emerald-500/20 font-bold">
                             CONFIDENCE SCORE: {result.confidence}%
                           </div>
                           <h2 className="text-4xl md:text-5xl font-outfit text-white font-bold mb-2 leading-tight">{result.cropName}</h2>
                           <h3 className="text-2xl font-inter text-gray-400">{result.cropHindi}</h3>
                       </div>
                   </div>

                   <div className="grid grid-cols-2 gap-8 border-t border-white/10 pt-8 mt-6">
                      <div>
                        <div className="text-gray-400 text-xs uppercase tracking-wider mb-1 font-bold">Expected Yield</div>
                        <div className="text-xl md:text-2xl font-outfit text-white font-bold">{result.yieldEstimate}</div>
                      </div>
                      <div>
                        <div className="text-gray-400 text-xs uppercase tracking-wider mb-1 font-bold">Market Potential</div>
                        <div className="text-xl md:text-2xl font-outfit text-gold font-bold">{result.marketPriceEstimate}</div>
                      </div>
                   </div>
               </div>
            </div>

            {/* Side Panel: Alternatives & Note */}
            <div className="space-y-6 flex flex-col">
               
               {/* Agronomist Note */}
               <div className="bg-white dark:bg-charcoal border border-black/5 dark:border-white/10 rounded-3xl p-6 shadow-xl shadow-black/5 dark:shadow-black/20 flex-grow">
                  <h4 className="font-outfit text-gold-dim dark:text-gold text-lg mb-3 font-bold flex items-center gap-2">
                    <AlertCircle size={18} /> Agronomist Note
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed font-inter font-medium">
                    {result.agronomistNote}
                  </p>
               </div>

               {/* Alternatives List */}
               {result.alternatives && result.alternatives.length > 0 && (
                 <div className="bg-gray-50 dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-3xl p-6">
                    <h4 className="font-jakarta text-xs font-bold text-gray-900 dark:text-gray-500 uppercase tracking-widest mb-3">Alternative Crops</h4>
                    <div className="space-y-3">
                       {result.alternatives.map((alt, i) => (
                         <div key={i} className="flex items-center justify-between border-b border-black/5 dark:border-white/5 last:border-0 pb-2 last:pb-0">
                            <div>
                               <div className="text-sm font-bold text-gray-900 dark:text-white">{alt.cropName}</div>
                               <div className="text-xs text-gray-500 dark:text-gray-400">{alt.cropHindi}</div>
                            </div>
                            <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-900/30 px-2 py-1 rounded-full">
                               {alt.confidence}% Match
                            </div>
                         </div>
                       ))}
                    </div>
                 </div>
               )}
            </div>
         </div>

         {/* Additional Metadata / Duration */}
         <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-3xl p-6 flex items-center justify-between shadow-xl shadow-black/5 dark:shadow-none">
                <span className="text-gray-500 dark:text-gray-400 text-sm font-medium">Cycle Duration</span>
                <span className="text-gray-900 dark:text-white font-bold font-outfit">{result.duration}</span>
            </div>
            {/* Tools Bar */}
            <div className="flex flex-wrap gap-2 justify-end items-center">
                <button 
                  onClick={handleSave}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-4 rounded-xl bg-white dark:bg-white/5 hover:bg-gray-50 dark:hover:bg-white/10 border border-black/5 dark:border-white/10 text-gray-900 dark:text-white text-sm transition-colors shadow-sm font-bold"
                >
                  <Save size={16} /> Save
                </button>
                <button 
                  onClick={handlePdf}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-4 rounded-xl bg-white dark:bg-white/5 hover:bg-gray-50 dark:hover:bg-white/10 border border-black/5 dark:border-white/10 text-gray-900 dark:text-white text-sm transition-colors shadow-sm font-bold"
                >
                  <Download size={16} /> PDF
                </button>
                <button 
                  onClick={handleShare}
                  className="flex-[2] flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-emerald-50 dark:bg-emerald-600/20 hover:bg-emerald-100 dark:hover:bg-emerald-600/30 border border-emerald-200 dark:border-emerald-500/30 text-emerald-800 dark:text-emerald-400 text-sm transition-colors shadow-sm font-bold"
                >
                  <Share2 size={16} /> WhatsApp
                </button>
            </div>
         </div>

         <div className="mt-8 text-center">
            <button 
              onClick={onReset}
              className="px-6 py-3 rounded-xl text-gray-500 hover:text-gray-900 dark:hover:text-white text-sm underline transition-colors font-medium opacity-60 hover:opacity-100"
            >
              Analyze Another Crop
            </button>
         </div>

       </div>
    </section>
  );
};
