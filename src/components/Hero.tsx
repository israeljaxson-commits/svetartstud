/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, MouseEvent } from 'react';
import { ArrowRight, Sparkles, Star, ArrowDown } from 'lucide-react';
import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import clientAvatar1 from '../assets/avatars/client-1.svg';
import clientAvatar2 from '../assets/avatars/client-2.svg';
import clientAvatar3 from '../assets/avatars/client-3.svg';

interface HeroProps {
  onBookClick: () => void;
  onContactClick: () => void;
}

const localHeroT = {
  en: {
    bookAppointment: "Book Your Appointment",
    viewInstagram: "View Instagram",
    scrollToDiscover: "Scroll To Discover",
    certifiedSeal: "15+ Years of Couture Mastery"
  },
  ro: {
    bookAppointment: "Programează o Vizită",
    viewInstagram: "Vezi Instagram",
    scrollToDiscover: "Derulează pentru a Descoperi",
    certifiedSeal: "15+ Ani de Măiestrie în Couture"
  },
  ru: {
    bookAppointment: "Забронировать визит",
    viewInstagram: "Наш Instagram",
    scrollToDiscover: "Листайте дальше",
    certifiedSeal: "15+ Лет кутюрного мастерства"
  }
};

export default function Hero({ onBookClick }: HeroProps) {
  const { lang, t } = useLanguage();
  const lt = localHeroT[lang] || localHeroT.en;
  const clientAvatars = [clientAvatar1, clientAvatar2, clientAvatar3];

  // Interactivity state for luxury 3D visual tilt
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    // Normalize coordinates to -0.5 ... 0.5 for premium gentle tilt
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setCoords({ x, y });
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setCoords({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <section 
      id="hero-section"
      className="relative min-h-[100vh] flex items-center justify-center pt-32 pb-24 overflow-hidden bg-[#F2E4DF]"
      style={{
        background: `
          radial-gradient(circle at 50% 0%, rgba(231, 211, 193, 0.6) 0%, transparent 60%),
          radial-gradient(circle at 15% 40%, rgba(216, 163, 163, 0.3) 0%, transparent 50%),
          radial-gradient(circle at 85% 75%, rgba(184, 134, 107, 0.18) 0%, transparent 60%),
          #F2E4DF
        `
      }}
    >
      {/* Luxury Radial Spotlight Overlay */}
      <div className="absolute inset-0 pointer-events-none -z-10"
        style={{
          background: 'radial-gradient(circle at 50% 15%, rgba(255, 255, 255, 0.6) 0%, transparent 50%)'
        }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12 items-center relative z-10">
        
        {/* Left Side: Luxury Copywriting & Editorial Typography */}
        <div className="lg:col-span-7 space-y-10 text-left">
          
          {/* Subtle Elegance Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
            className="inline-flex items-center gap-2.5 px-4.5 py-2 rounded-full bg-white/60 border border-[#D8A3A3]/20 shadow-[0_4px_30px_rgba(42,35,33,0.02)] backdrop-blur-md"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#D8A3A3] animate-pulse" />
            <span className="text-[10px] uppercase font-semibold tracking-[0.3em] text-[#B8866B] flex items-center gap-1.5 font-sans">
              <Sparkles className="w-3 h-3 text-[#B8866B]" /> {t.hero.badge}
            </span>
          </motion.div>

          {/* Heading Section inspired by Dior/Chanel typography */}
          <div className="space-y-6">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1], delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl xl:text-7.5xl font-serif text-[#2A2321] leading-[1.1] tracking-tight relative"
            >
              <span className="block font-medium tracking-tight h-auto">
                {t.hero.titleFirstLine}
              </span>
              <span className="block mt-2 font-serif italic font-light text-[#D8A3A3] tracking-wide">
                {lang === 'en' ? 'for standard-defining beauty' : `${t.hero.titleItalic} ${t.hero.titleThirdLine.replace('.', '')}`}
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.19, 1, 0.22, 1], delay: 0.2 }}
              className="text-[#2A2321]/80 font-sans font-light text-sm md:text-base leading-relaxed max-w-xl"
            >
              {t.hero.desc}
            </motion.p>
          </div>

          {/* Luxury Social Proof Row */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.19, 1, 0.22, 1], delay: 0.3 }}
            className="flex flex-wrap items-center gap-6 pt-2"
          >
            <div className="flex -space-x-3">
              {clientAvatars.map((avatar, idx) => (
                <img
                  key={`hero-client-${idx}`}
                  src={avatar}
                  className="w-9 h-9 rounded-full border-2 border-[#F2E4DF] object-cover shadow-md"
                  alt={`Client ${idx + 1}`}
                />
              ))}
            </div>
            <div className="space-y-0.5">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-[#D8A3A3] text-[#D8A3A3]" />
                ))}
                <span className="text-xs font-bold text-[#2A2321] ml-1 font-sans">{t.hero.reviewsRating}</span>
              </div>
              <p className="text-[10px] uppercase tracking-[0.18em] text-[#B8866B] font-semibold font-sans">{t.hero.bookingsCount}</p>
            </div>
          </motion.div>

          {/* Premium CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.19, 1, 0.22, 1], delay: 0.4 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-5 pt-4"
          >
            {/* Primary: Rose-Gold Metallic Gradient Button */}
            <button
              onClick={onBookClick}
              className="relative group overflow-hidden px-9 py-4 rounded-full bg-gradient-to-r from-[#D8A3A3] via-[#E7D3C1] to-[#D8A3A3] bg-[length:200%_auto] text-[#2A2321] text-xs uppercase tracking-[0.2em] font-semibold flex items-center justify-center gap-2 hover:bg-right hover:scale-102 hover:shadow-[0_15px_30px_rgba(216,163,163,0.3)] active:scale-98 transition-all duration-500 cursor-pointer font-sans"
              style={{
                boxShadow: '0 8px 25px rgba(216, 163, 163, 0.2)'
              }}
            >
              <span className="relative z-10">{lt.bookAppointment}</span>
              <ArrowRight className="w-4 h-4 text-[#2A2321] relative z-10 group-hover:translate-x-1.5 transition-transform duration-300" />
              {/* Shimmer transition overlay */}
              <div className="absolute inset-x-0 top-0 h-full w-full bg-white/20 transform -skew-x-12 -translate-x-full group-hover:animate-shine" />
            </button>

            {/* Secondary: Luxury Glass Panel Instagram Button */}
            <a
              href="https://www.instagram.com/svetart.beauty?igsh=MmhidHgzbHh2dXRy"
              target="_blank"
              rel="noopener noreferrer"
              className="px-9 py-4 rounded-full border border-[#D8A3A3]/40 text-[#2A2321] text-xs uppercase tracking-[0.2em] font-semibold flex items-center justify-center gap-2 bg-white/20 backdrop-blur-xs hover:bg-[#F2E4DF] hover:border-[#D8A3A3] hover:text-[#B8866B] hover:shadow-[0_12px_24px_rgba(42,35,33,0.04)] hover:scale-102 active:scale-98 transition-all duration-300 cursor-pointer font-sans text-center"
            >
              <span>{lt.viewInstagram}</span>
            </a>
          </motion.div>
        </div>

        {/* Right Side: Redesigned Luxury 3D Visual Centerpiece */}
        <div className="lg:col-span-5 relative flex justify-center lg:justify-end mt-12 lg:mt-0">
          
          <div 
            className="relative w-72 sm:w-96 lg:w-full aspect-square flex items-center justify-center pointer-events-auto select-none"
            style={{ perspective: 1200, transformStyle: 'preserve-3d' }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            {/* Coordinates-driven tilt container with a smooth custom layout */}
            <motion.div
              style={{
                transformStyle: 'preserve-3d',
                rotateY: coords.x * 25, // horizontal tilt
                rotateX: coords.y * -25, // vertical tilt
              }}
              animate={{
                y: [0, -12, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="relative w-full h-full flex items-center justify-center"
            >
              {/* 1. Underlying Deep Ambient Lighting Reflection Blur */}
              <div className="absolute w-[280px] h-[280px] bg-[#E7D3C1]/20 rounded-full blur-[100px] pointer-events-none" />

              {/* 2. Soft Underlying Shadow */}
              <motion.div 
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.3, 0.45, 0.3],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute bottom-6 w-[220px] h-[25px] rounded-full bg-[#2A2321]/15 blur-xl pointer-events-none"
                style={{ transform: 'translateZ(-80px)' }}
              />

              {/* 3. Luxury Rose-Gold Metallic Sphere */}
              <motion.div
                animate={{
                  y: [0, 8, 0],
                  rotate: [0, 360],
                }}
                transition={{
                  y: { duration: 25, repeat: Infinity, ease: "easeInOut" },
                  rotate: { duration: 35, repeat: Infinity, ease: "linear" }
                }}
                style={{
                  transform: 'translateZ(30px)',
                  background: 'radial-gradient(circle at 35% 35%, #FFF2E8 0%, #E7D3C1 25%, #D8A3A3 60%, #B8866B 85%, #2A2321 100%)',
                  boxShadow: 'inset -8px -8px 24px rgba(42, 35, 33, 0.65), inset 12px 12px 20px rgba(255, 255, 255, 0.8), 0 25px 60px rgba(42, 35, 33, 0.16)',
                }}
                className="absolute w-40 h-40 rounded-full border border-white/30"
              />

              {/* 4. Elongated Translucent Glass Nail Sculpture - Central Focus */}
              <motion.div
                animate={{
                  y: [0, -12, 0],
                  rotate: [12, -2, 12],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                style={{
                  transform: 'translateZ(75px)',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.7) 0%, rgba(248, 230, 223, 0.4) 40%, rgba(216, 163, 163, 0.25) 100%)',
                  boxShadow: 'inset 2px 2px 8px rgba(255, 255, 255, 0.85), inset -4px -4px 12px rgba(184, 134, 107, 0.2), 0 25px 50px rgba(42, 35, 33, 0.1)',
                }}
                className="absolute w-28 h-52 rounded-t-[100px] rounded-b-[40px] border border-white/50 flex flex-col justify-between p-6 overflow-hidden"
              >
                {/* Shimmer light reflect strip */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-[35deg] pointer-events-none" />
                {/* Internal symmetrical lighting core */}
                <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-white/70 via-white/10 to-transparent" />
                
                {/* Decorative Rose-Gold Inset Arch inside the glass nail */}
                <div className="w-full h-full rounded-t-[80px] rounded-b-[30px] border border-[#B8866B]/30 opacity-60 relative flex items-center justify-center">
                  <div className="w-6 h-6 rounded-full border border-[#D8A3A3]/40" />
                </div>
              </motion.div>

              {/* 5. Smaller Overlapping Translucent Glass Nail Sculpture */}
              <motion.div
                animate={{
                  y: [0, 15, 0],
                  rotate: [-34, -44, -34],
                }}
                transition={{
                  duration: 28,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                style={{
                  transform: 'translateZ(95px)',
                  backdropFilter: 'blur(8px)',
                  WebkitBackdropFilter: 'blur(8px)',
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.5) 0%, rgba(231, 211, 193, 0.25) 60%, rgba(184, 134, 107, 0.15) 100%)',
                  boxShadow: 'inset 1px 1px 4px rgba(255, 255, 255, 0.6), 0 12px 30px rgba(42, 35, 33, 0.05)',
                }}
                className="absolute w-16 h-36 rounded-t-[100px] rounded-b-[30px] border border-white/30"
              />

              {/* 6. Crystal Reflections (Faceted Diamond-Cut Prism catching lighting) */}
              <motion.div
                animate={{
                  y: [0, -20, 0],
                  rotateX: [0, 45, 0],
                  rotateY: [40, 140, 40],
                  scale: [1, 1.08, 1],
                }}
                transition={{
                  duration: 22,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                style={{
                  transform: 'translateZ(130px)',
                  clipPath: 'polygon(50% 0%, 100% 35%, 100% 65%, 50% 100%, 0% 65%, 0% 35%)',
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(216, 163, 163, 0.35) 50%, rgba(184, 134, 107, 0.5) 100%)',
                  backdropFilter: 'blur(4px)',
                  WebkitBackdropFilter: 'blur(4px)',
                }}
                className="absolute right-12 top-1/4 w-8 h-12 border border-white/40 flex items-center justify-center opacity-90"
              >
                {/* Specular split highlight line */}
                <div className="w-[1px] h-full bg-white/70 transform rotate-12" />
              </motion.div>

              {/* 7. Secondary Smaller Floating Prism */}
              <motion.div
                animate={{
                  y: [0, 22, 0],
                  rotateX: [15, -15, 15],
                  rotateY: [0, 180, 0],
                }}
                transition={{
                  duration: 25,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                style={{
                  transform: 'translateZ(15px)',
                  clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
                  background: 'linear-gradient(225deg, rgba(255, 255, 255, 0.65) 0%, rgba(231, 211, 193, 0.3) 100%)',
                  backdropFilter: 'blur(2px)',
                  WebkitBackdropFilter: 'blur(2px)',
                }}
                className="absolute left-8 bottom-1/4 w-9 h-9 border border-white/30 opacity-70"
              />

              {/* 8. Champagne Gold sphere bead charm */}
              <motion.div
                animate={{
                  x: [0, -25, 0],
                  y: [0, 15, 0],
                  scale: [1, 0.92, 1]
                }}
                transition={{
                  duration: 32,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute top-10 right-24 w-5 h-5 rounded-full"
                style={{
                  transform: 'translateZ(55px)',
                  background: 'radial-gradient(circle at 35% 35%, #FFFFFF 0%, #E7D3C1 40%, #B8866B 100%)',
                  boxShadow: '0 8px 20px rgba(184, 134, 107, 0.25), inset 1px 1px 3px rgba(255, 255, 255, 0.9)'
                }}
              />

              {/* 9. Highlight Sparkle Star */}
              <motion.div
                animate={{
                  scale: [0.7, 1.3, 0.7],
                  opacity: [0.35, 0.9, 0.35],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute right-4 bottom-1/3 text-[#E7D3C1]"
                style={{ transform: 'translateZ(140px)' }}
              >
                <Sparkles className="w-5 h-5" />
              </motion.div>

              {/* Luxury Certification Floating Seal (translateZ: 100px) */}
              <div 
                className="absolute -top-4 -right-4 hover:scale-105 duration-300 rounded-2xl px-4 py-2.5 bg-[#2A2321] text-white shadow-2xl border border-[#D8A3A3]/20 flex items-center gap-1.5 select-none"
                style={{
                  transform: 'translateZ(110px)',
                }}
              >
                <Star className="w-3.5 h-3.5 fill-[#E7D3C1] text-[#E7D3C1]" />
                <span className="text-[9px] font-black uppercase tracking-widest text-[#F2E4DF] font-sans">{lt.certifiedSeal}</span>
              </div>

            </motion.div>

          </div>

        </div>

      </div>

      {/* Elegant Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 cursor-pointer pointer-events-none opacity-50 hover:opacity-100 transition-opacity">
        <span className="text-[9px] uppercase tracking-[0.35em] text-[#B8866B] font-semibold font-sans">{lt.scrollToDiscover}</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        >
          <ArrowDown className="w-3.5 h-3.5 text-[#D8A3A3]" />
        </motion.div>
      </div>

    </section>
  );
}
