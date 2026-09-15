import React from 'react';
import { ArrowDown, Sparkles, MapPin } from 'lucide-react';
import { Language, StoreSettings } from '../types';
import { translations } from '../translations';

interface HeroProps {
  language: Language;
  settings: StoreSettings;
  onScrollToCatalog: () => void;
}

export const Hero: React.FC<HeroProps> = ({ language, settings, onScrollToCatalog }) => {
  const t = translations[language];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#111116] via-[#0D0D12] to-[#0B0B0E] border-b border-[#22222B] pt-8 pb-10 sm:py-16 px-4 sm:px-6">
      {/* Subtle luxury geometric radial background overlay */}
      <div 
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#D4AF37 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }}
      />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#C5A059]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-[#8C6D23]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-4xl mx-auto text-center flex flex-col items-center">
        {/* Boutique location badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#181822]/80 border border-[#C5A059]/30 text-[#D8B467] text-xs sm:text-sm font-medium tracking-wide mb-6 shadow-[0_2px_12px_rgba(0,0,0,0.3)]">
          <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>{settings.city} · {settings.boutiqueNumber}</span>
          <span className="w-1 h-1 rounded-full bg-[#C5A059]" />
          <span className="text-[#A5A095] text-[11px] sm:text-xs">
            {language === 'ru' ? 'Премиум бутик' : 'Премиум бутик'}
          </span>
        </div>

        {/* Store Title */}
        <h1 className="font-brand text-2xl sm:text-4xl md:text-5xl font-bold tracking-[0.2em] text-[#F5F3EF] mb-3 uppercase drop-shadow-sm">
          {settings.storeName || 'MUSLIM SHOP'}
        </h1>

        {/* Serif Tagline */}
        <div className="font-serif italic text-3xl sm:text-5xl md:text-6xl text-[#E8D49E] tracking-tight font-medium mb-4 leading-tight">
          {language === 'ru' ? settings.taglineRu : settings.taglineKz}
        </div>

        {/* Subtitle */}
        <p className="max-w-2xl text-[#B3AEA4] text-sm sm:text-base md:text-lg leading-relaxed mb-8 px-2">
          {language === 'ru' ? settings.subtitleRu : settings.subtitleKz}
        </p>

        {/* Call to action button */}
        <div className="flex flex-col sm:flex-row items-center gap-3.5 w-full sm:w-auto">
          <button
            onClick={onScrollToCatalog}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#DFBF58] to-[#C5A059] hover:from-[#DFBF58] hover:to-[#B68E33] text-[#0B0B0E] font-semibold text-sm sm:text-base tracking-wide shadow-[0_4px_20px_rgba(212,175,55,0.25)] hover:shadow-[0_6px_25px_rgba(212,175,55,0.4)] transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>{t.viewCatalog}</span>
            <ArrowDown className="w-4 h-4 text-[#0B0B0E]" />
          </button>

          <div className="flex items-center gap-1 text-[12px] text-[#8C877E] sm:hidden">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>Натуральные сертифицированные товары</span>
          </div>
        </div>
      </div>
    </section>
  );
};
