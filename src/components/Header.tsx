import React from 'react';
import { ShoppingBag, Search, ShieldCheck } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';

interface HeaderProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  cartCount: number;
  onOpenCart: () => void;
  onOpenSearch: () => void;
  onOpenAdmin: () => void;
  onLogoClick: () => void;
  storeName: string;
}

export const Header: React.FC<HeaderProps> = ({
  language,
  onLanguageChange,
  cartCount,
  onOpenCart,
  onOpenSearch,
  onOpenAdmin,
  onLogoClick,
  storeName,
}) => {
  const t = translations[language];

  return (
    <header className="sticky top-0 z-40 bg-[#0B0B0E]/95 backdrop-blur-md border-b border-[#24242C] transition-all">
      {/* Top subtle micro-bar with boutique location */}
      <div className="bg-[#121217] text-[#A6A29A] text-[11px] py-1 px-4 text-center border-b border-[#1D1D24] flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059] inline-block animate-pulse"></span>
          <span className="tracking-wider uppercase font-medium">{t.cityBoutique}</span>
        </div>
        <div className="hidden sm:flex items-center gap-3 text-[11px] text-[#C5A059]/90 font-medium">
          <span>✨ 100% Оригинальная Halal продукция</span>
        </div>
        <button
          onClick={onOpenAdmin}
          className="text-[#7E7A72] hover:text-[#C5A059] transition-colors flex items-center gap-1 text-[11px]"
          title={t.navProfile}
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          <span className="hidden xs:inline">{t.navProfile}</span>
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-2">
        {/* Left: Store Logo */}
        <button
          onClick={onLogoClick}
          className="text-left group flex items-center gap-2 focus:outline-none"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#D4AF37] to-[#8C6D23] p-[1px] flex items-center justify-center shadow-[0_0_15px_rgba(212,175,55,0.15)]">
            <div className="w-full h-full bg-[#0B0B0E] rounded-[7px] flex items-center justify-center text-[#D4AF37] font-bold text-sm font-serif">
              M
            </div>
          </div>
          <div>
            <span className="font-brand font-bold text-base sm:text-xl tracking-[0.18em] text-[#F4F1EA] group-hover:text-[#D4AF37] transition-colors block leading-tight">
              {storeName || 'MUSLIM SHOP'}
            </span>
            <span className="text-[9px] tracking-[0.25em] uppercase text-[#8C877D] block leading-none">
              ATYRAU · BOUTIQUE
            </span>
          </div>
        </button>

        {/* Right action controls */}
        <div className="flex items-center gap-1.5 sm:gap-3">
          {/* RU / KZ Language Toggle */}
          <div className="flex items-center bg-[#181820] border border-[#2A2A35] rounded-full p-0.5 text-xs font-medium">
            <button
              onClick={() => onLanguageChange('ru')}
              className={`px-2 sm:px-2.5 py-1 rounded-full transition-all text-[11px] ${
                language === 'ru'
                  ? 'bg-[#C5A059] text-[#0B0B0E] font-bold shadow-sm'
                  : 'text-[#9A968E] hover:text-[#F4F1EA]'
              }`}
            >
              RU
            </button>
            <button
              onClick={() => onLanguageChange('kz')}
              className={`px-2 sm:px-2.5 py-1 rounded-full transition-all text-[11px] ${
                language === 'kz'
                  ? 'bg-[#C5A059] text-[#0B0B0E] font-bold shadow-sm'
                  : 'text-[#9A968E] hover:text-[#F4F1EA]'
              }`}
            >
              KZ
            </button>
          </div>

          {/* Search Trigger */}
          <button
            onClick={onOpenSearch}
            className="p-2 sm:px-3 sm:py-1.5 rounded-full text-[#A8A49C] hover:text-[#D4AF37] hover:bg-[#181820] border border-transparent hover:border-[#2A2A35] transition-colors flex items-center gap-1.5"
            aria-label={t.search}
          >
            <Search className="w-5 h-5" />
            <span className="hidden md:inline text-xs">{t.search}</span>
          </button>

          {/* Cart Trigger */}
          <button
            onClick={onOpenCart}
            className="relative p-2 sm:px-3.5 sm:py-1.5 rounded-full bg-[#181820] hover:bg-[#20202A] text-[#F4F1EA] border border-[#2E2E3C] hover:border-[#C5A059]/40 transition-all flex items-center gap-2"
            aria-label={t.cart}
          >
            <ShoppingBag className="w-5 h-5 text-[#D4AF37]" />
            <span className="hidden sm:inline text-xs font-medium">{t.cart}</span>
            {cartCount > 0 && (
              <span className="inline-flex items-center justify-center min-w-[20px] h-5 px-1 text-[11px] font-bold text-[#0B0B0E] bg-[#D4AF37] rounded-full shadow-[0_0_8px_rgba(212,175,55,0.4)]">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
