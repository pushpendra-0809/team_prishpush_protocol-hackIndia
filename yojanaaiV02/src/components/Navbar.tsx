import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../contexts/ThemeContext';
import { Menu, Moon, Sun, Languages, Home } from 'lucide-react';
import { Button } from './Button';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';

export const Navbar = ({ onMenuClick }: { onMenuClick: () => void }) => {
  const { t, i18n } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const [isLangOpen, setIsLangOpen] = useState(false);

  const toggleLang = () => {
    const nextLang = i18n.language === 'en' ? 'hi' : 'en';
    i18n.changeLanguage(nextLang);
    setIsLangOpen(false);
  };

  return (
    <nav className="h-16 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md sticky top-0 z-30 px-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="p-2 lg:hidden text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-900 rounded-lg"
        >
          <Menu className="w-6 h-6" />
        </button>
        <Link to="/" className="p-2 text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-900 rounded-lg transition-colors">
          <Home className="w-5 h-5" />
        </Link>
      </div>

      <div className="flex items-center gap-2">
        {/* Theme Toggle */}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          className="rounded-full"
        >
          {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
        </Button>

        {/* Language Toggle */}
        <div className="relative">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleLang}
            className="rounded-full"
          >
            <Languages className="w-5 h-5" />
          </Button>
          <div className="absolute right-0 bottom-full mb-2 hidden">
             {/* Simple toggle for now, no complex dropdown needed with only 2 langs */}
          </div>
        </div>
      </div>
    </nav>
  );
};
