import React from 'react';
import { Home, Search, Grid, ShoppingBag, ShieldCheck } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';

interface BottomNavProps {
  currentTab: 'home' | 'search' | 'catalog' | 'cart' | 'admin';
  onChangeTab: (tab: 'home' | 'search' | 'catalog' | 'cart' | 'admin') => void;
  cartCount: number;
  language: Language;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentTab,
  onChangeTab,
  cartCount,
  language,
}) => {
  const t = translations[language];

  return (
    <nav className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0E0E14]/95 backdrop-blur-lg border-t border-[#23232E] px-2 py-1.5 pb-safe">
      <div className="grid grid-cols-5 gap-1 items-center">
        {/* Home */}
        <button
          onClick={() => onChangeTab('home')}
          className={`flex flex-col items-center justify-center py-1 rounded-xl transition-all ${
            currentTab === 'home'
              ? 'text-[#D4AF37]'
              : 'text-[#858076] hover:text-[#C5A059]'
          }`}
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px] mt-0.5 font-medium tracking-tight">
            {t.navHome}
          </span>
        </button>

        {/* Search */}
        <button
          onClick={() => onChangeTab('search')}
          className={`flex flex-col items-center justify-center py-1 rounded-xl transition-all ${
            currentTab === 'search'
              ? 'text-[#D4AF37]'
              : 'text-[#858076] hover:text-[#C5A059]'
          }`}
        >
          <Search className="w-5 h-5" />
          <span className="text-[10px] mt-0.5 font-medium tracking-tight">
            {t.navSearch}
          </span>
        </button>

        {/* Catalog */}
        <button
          onClick={() => onChangeTab('catalog')}
          className={`flex flex-col items-center justify-center py-1 rounded-xl transition-all ${
            currentTab === 'catalog'
              ? 'text-[#D4AF37]'
              : 'text-[#858076] hover:text-[#C5A059]'
          }`}
        >
          <Grid className="w-5 h-5" />
          <span className="text-[10px] mt-0.5 font-medium tracking-tight">
            {t.navCatalog}
          </span>
        </button>

        {/* Cart */}
        <button
          onClick={() => onChangeTab('cart')}
          className={`relative flex flex-col items-center justify-center py-1 rounded-xl transition-all ${
            currentTab === 'cart'
              ? 'text-[#D4AF37]'
              : 'text-[#858076] hover:text-[#C5A059]'
          }`}
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-2 min-w-[16px] h-4 px-1 rounded-full bg-[#D4AF37] text-[#0B0B0E] font-bold text-[9px] flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </div>
          <span className="text-[10px] mt-0.5 font-medium tracking-tight">
            {t.navCart}
          </span>
        </button>

        {/* Profile / Admin */}
        <button
          onClick={() => onChangeTab('admin')}
          className={`flex flex-col items-center justify-center py-1 rounded-xl transition-all ${
            currentTab === 'admin'
              ? 'text-[#D4AF37]'
              : 'text-[#858076] hover:text-[#C5A059]'
          }`}
        >
          <ShieldCheck className="w-5 h-5" />
          <span className="text-[10px] mt-0.5 font-medium tracking-tight">
            {t.navProfile}
          </span>
        </button>
      </div>
    </nav>
  );
};
