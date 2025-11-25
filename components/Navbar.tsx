
import React, { useState } from 'react';
import { Leaf, Globe, Sun, Moon, Type, BookOpen } from 'lucide-react';
import { LANGUAGES } from '../constants';
import { ThemeMode, Language } from '../types';

interface NavbarProps {
  theme: ThemeMode;
  toggleTheme: () => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  onNavigateToCropGuide: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ theme, toggleTheme, language, setLanguage, onNavigateToCropGuide }) => {
  const [langOpen, setLangOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  React.useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${
      isScrolled 
        ? 'backdrop-blur-xl bg-ivory/90 border-black/5 dark:bg-obsidian/80 dark:border-white/5 py-3 shadow-lg shadow-black/5' 
        : 'bg-transparent border-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        
        {/* Logo */}
        <div className="flex items-center gap-2 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:scale-110 transition-transform">
            <Leaf className="text-white w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="font-outfit font-bold text-xl tracking-tight text-gray-900 dark:text-ivory transition-colors">AgriFuture</span>
            <span className="font-jakarta text-[10px] tracking-[0.2em] text-gold-dim dark:text-gold">INDIA</span>
          </div>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-4">
          
          {/* Crop Guide Button (Header) */}
          <button 
            onClick={onNavigateToCropGuide}
            className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full border border-black/10 dark:border-white/10 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors group"
          >
            <BookOpen className="w-4 h-4 text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform" />
            <span className="font-jakarta text-xs font-bold text-gray-900 dark:text-white">GUIDE</span>
          </button>

          {/* Language Selector */}
          <div className="relative">
            <button 
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-2 px-3 py-2 rounded-full border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
            >
              <Globe className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              <span className="font-jakarta text-xs text-gray-900 dark:text-gray-300 hidden md:block font-bold">{language}</span>
            </button>

            {langOpen && (
              <div className="absolute top-full right-0 mt-2 w-40 bg-white dark:bg-charcoal border border-black/5 dark:border-white/10 rounded-xl shadow-2xl overflow-hidden py-2 animate-in fade-in zoom-in-95 duration-200">
                {LANGUAGES.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => {
                      setLanguage(l.code);
                      setLangOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-sm transition-colors font-inter font-medium ${
                      language === l.code 
                        ? 'text-gold bg-gold/5 font-bold' 
                        : 'text-gray-500 dark:text-gray-400 hover:text-gold dark:hover:text-gold hover:bg-black/5 dark:hover:bg-white/5'
                    }`}
                  >
                    {l.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Accessibility & Theme */}
          <div className="hidden md:flex items-center gap-2 bg-black/5 dark:bg-white/5 rounded-full p-1 border border-black/5 dark:border-white/10">
            <button className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
              <Type className="w-4 h-4" />
            </button>
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              {theme === ThemeMode.DARK ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>

          {/* CTA */}
          <button className="bg-gray-900 dark:bg-white text-white dark:text-obsidian px-6 py-2.5 rounded-full font-jakarta text-xs font-bold tracking-wider hover:bg-gold dark:hover:bg-gold hover:text-white dark:hover:text-black transition-all duration-300 shadow-[0_0_20px_rgba(0,0,0,0.1)] dark:shadow-[0_0_20px_rgba(255,255,255,0.2)]">
            START APP
          </button>
        </div>
      </div>
    </nav>
  );
};
