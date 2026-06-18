/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, MouseEvent } from 'react';
import { Menu, X, Instagram, Sparkles, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';

interface NavbarProps {
  onBookClick: () => void;
}

export default function Navbar({ onBookClick }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { lang, setLang, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { label: t.nav.services, href: '#services' },
    { label: t.nav.about, href: '#about' },
    { label: t.nav.gallery, href: '#gallery' },
    { label: t.nav.reviews, href: '#reviews' },
    { label: t.nav.faqs, href: '#faq' },
  ];

  const handleNavClick = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    
    setTimeout(() => {
      const element = document.querySelector(href);
      if (element) {
        const offset = 90;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
      }
    }, 100);
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-50 w-full ${
        isScrolled
          ? 'py-4 bg-[#F2E4DF]/80 backdrop-blur-md border-b border-[#D9A7A7]/15 shadow-md'
          : 'py-6 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        
        {/* Brand Logo */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex flex-col select-none group mt-2 md:mt-3 transform translate-y-1.5 focus:outline-none"
        >
          <span className="text-2xl md:text-4xl font-serif font-black tracking-[0.08em] text-[#2C2523] uppercase group-hover:text-[#B67C7C] transition-all duration-350 leading-none">
            SvetArt
          </span>
          <span className="text-[10px] md:text-[11px] font-sans font-black tracking-[0.38em] text-[#B67C7C] uppercase leading-none mt-1.5 group-hover:text-[#2C2523] transition-colors duration-350 pl-0.5">
            Beauty Studio
          </span>
        </a>

        {/* Desktop Navigation links */}
        <nav className="hidden lg:flex items-center gap-8">
          {menuItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className="text-xs uppercase tracking-widest text-[#2C2523] hover:text-[#B67C7C] transition-colors font-bold relative group py-1 font-sans"
            >
              {item.label}
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#D9A7A7] transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Call to Actions / Social links */}
        <div className="flex items-center gap-4">
          {/* Elegant inline Language Selector (always visible, subtle animation) */}
          <motion.div
            className="flex items-center gap-1 bg-white/60 backdrop-blur-md border border-[#D9A7A7]/20 rounded-full p-1 text-[10px] font-bold tracking-wider mr-1 shadow-xs"
            initial={{ y: 0 }}
            animate={{ y: [0, -4, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            {(['en', 'ro', 'ru'] as const).map((locale) => (
              <button
                key={locale}
                onClick={() => setLang(locale)}
                className={`px-2.5 py-1 rounded-full transition-all duration-300 cursor-pointer font-sans font-bold text-[10px] ${
                  lang === locale
                    ? 'bg-[#B67C7C] text-white shadow-md scale-105'
                    : 'text-stone-600 hover:text-[#B67C7C] hover:scale-105'
                }`}
              >
                {locale.toUpperCase()}
              </button>
            ))}
          </motion.div>

          <a
            href="https://www.instagram.com/svetart.beauty?igsh=MmhidHgzbHh2dXRy"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-stone-500 hover:text-[#B67C7C] transition-colors"
            title="Follow us on Instagram"
          >
            <Instagram className="w-4.5 h-4.5" />
          </a>

          {/* Upgraded Metallic Rose-Gold Action Button */}
          <button
            onClick={onBookClick}
            className="relative overflow-hidden group px-6 py-3 rounded-full text-xs uppercase tracking-widest font-bold transition-all duration-300 rose-gold-gradient text-white shadow-md hover:shadow-xl hover:brightness-105 active:scale-98 cursor-pointer font-sans flex items-center gap-2"
          >
            <Sparkles className="w-3.5 h-3.5 animate-pulse text-white" />
            <span>{t.nav.bookConsultation}</span>
          </button>
        </div>

        {/* Mobile menu Toggle */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden p-2 text-[#2C2523] hover:text-[#B67C7C] transition-colors"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="lg:hidden w-full bg-[#F2E4DF] border-b border-[#D9A7A7]/25 overflow-hidden backdrop-blur-md"
          >
            <div className="px-6 py-8 flex flex-col gap-6">
              <div className="flex flex-col gap-4">
                {menuItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className="text-xs uppercase tracking-widest text-[#2C2523] hover:text-[#B67C7C] font-bold py-2 border-b border-[#D9A7A7]/10 font-sans"
                  >
                    {item.label}
                  </a>
                ))}
              </div>

              <div className="flex flex-col gap-5 pt-4 border-t border-[#D9A7A7]/15">
                {/* Language switcher for Mobile */}
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-wider text-stone-500 font-bold flex items-center gap-1.5 font-sans">
                    <Globe className="w-3.5 h-3.5 text-[#B67C7C]" /> Language
                  </span>
                  <div className="flex items-center gap-1 bg-white/60 backdrop-blur-md border border-[#D9A7A7]/20 rounded-full p-0.5 text-[10px] font-bold tracking-wider shadow-xs">
                    {(['en', 'ro', 'ru'] as const).map((locale) => (
                      <button
                        key={locale}
                        onClick={() => setLang(locale)}
                        className={`px-3 py-1 rounded-full transition-all cursor-pointer font-sans ${
                          lang === locale ? 'bg-[#B67C7C] text-white shadow-md' : 'text-stone-600'
                        }`}
                      >
                        {locale.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <a
                    href="https://www.instagram.com/svetart.beauty?igsh=MmhidHgzbHh2dXRy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full bg-white/80 text-stone-600 hover:text-[#B67C7C] border border-[#D9A7A7]/10"
                  >
                    <Instagram className="w-4 h-4" />
                  </a>
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      onBookClick();
                    }}
                    className="px-6 py-3.5 rounded-full rose-gold-gradient text-white text-xs uppercase tracking-widest font-black shadow-md hover:brightness-105 transition-all font-sans"
                  >
                    {t.nav.bookAppointment}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
