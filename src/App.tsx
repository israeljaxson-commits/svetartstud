/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import CalendarBooking from './components/CalendarBooking';
import { useState, FormEvent, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Gallery from './components/Gallery';
import Reviews from './components/Reviews';
import ContactAndFAQ from './components/ContactAndFAQ';
import Footer from './components/Footer';
import { MessageSquare, Send, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from './context/LanguageContext';

export default function App() {
  const { lang, t } = useLanguage();
  const [selectedService, setSelectedService] = useState('');
  const [whatsappOpen, setWhatsappOpen] = useState(false);
  const [whatsappMsg, setWhatsappMsg] = useState('');
  const [badgeCounter, setBadgeCounter] = useState(1); // notification indicator on WhatsApp floating button

  const baseMessages = {
    en: "Buna Sveta! I am interested in checking slot availability for a manicure or lamination treatment...",
    ro: "Buna Sveta! Vreau sa verific disponibilitatea pentru manichiura sau laminare gene saptamana viitoare...",
    ru: "Привет, Света! Я бы хотела узнать свободные места на маникюр или ламинирование ресниц..."
  };

  const manicuresMsg = {
    en: "Buna! I'm interested in booking a gel manicure next week. Are there open slots?",
    ro: "Buna! Sunt interesata de o programare pentru manichiura saptamana viitoare. Exista locuri libere?",
    ru: "Привет! Хочу записаться на гелевый маникюр на следующей неделе. Есть свободные окошки?"
  };

  const laminationMsg = {
    en: "Hi Sveta! Tell me more about eyelash lamination process. How long does it last?",
    ro: "Buna Sveta! Spune-mi mai multe despre procesul de laminare a genelor. Cat timp dura?",
    ru: "Привет, Света! Расскажи подробнее про ламинирование ресниц. Сколько времени держится эффект?"
  };

  // Keep WhatsApp message default synced with selected language
  useEffect(() => {
    setWhatsappMsg(baseMessages[lang] || baseMessages.en);
  }, [lang]);

  const handleScrollToBooking = () => {
    setSelectedService('');
    setTimeout(() => {
      const element = document.querySelector('#contact');
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
    }, 150);
  };

  const handleScrollToContact = () => {
    setTimeout(() => {
      const element = document.querySelector('#contact');
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
    }, 150);
  };

  const handleWhatsappSend = (e: FormEvent) => {
    e.preventDefault();
    const phoneNum = '37379166006'; // Sveta's business phone format for API redirect
    const encodedStr = encodeURIComponent(whatsappMsg);
    window.open(`https://wa.me/${phoneNum}?text=${encodedStr}`, '_blank');
    setWhatsappOpen(false);
    setBadgeCounter(0);
  };

  // Callback to clean preselected service state when client clears it inside FAQ panel
  const handleClearPreselection = () => {
    setSelectedService('');
  };

  return (
    <div className="font-sans antialiased text-luxury-charcoal bg-luxury-cream selection:bg-luxury-blush selection:text-luxury-bronze scroll-smooth min-h-screen">
      
      <div className="flex flex-col min-h-screen">
        
        {/* Sticky premium Navigation bar */}
        <Navbar
          onBookClick={handleScrollToBooking}
        />

        {/* Layout Main Stream */}
        <main className="flex-grow">
          
          {/* 1. Hero Section */}
          <Hero
            onBookClick={handleScrollToBooking}
            onContactClick={handleScrollToContact}
          />

          {/* 2. Services Section: select service callback sets state */}
          <Services
            onServiceSelect={(id) => {
              setSelectedService(id);
            }}
          />

          {/* 3. About Section */}
          <About />

          {/* 4. Interactive Gallery & Before/After Comparison */}
          <Gallery />

          {/* 5. Customer Reviews Section */}
          <Reviews />
          <CalendarBooking />
          {/* 6. Contact, Promotions & FAQ Section */}
          <ContactAndFAQ
            selectedServiceName={selectedService}
            onClearPreselection={handleClearPreselection}
          />

        </main>

        {/* General luxury brands footer */}
        <Footer />

        {/* ================= EXTRA FEATURE: FLOATING WHATSAPP CHATBOX INTERACTION ================= */}
        <div className="fixed bottom-6 left-6 z-40 flex flex-col items-start gap-3">
          
          {/* WhatsApp popup container */}
          <AnimatePresence>
            {whatsappOpen && (
              <motion.div
                initial={{ opacity: 0, y: 15, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 15, scale: 0.95 }}
                className="rounded-[32px] p-5 shadow-2xl w-80 text-left select-none glass-panel-opaque"
                id="whatsapp-chatbox"
              >
                {/* Head wrapper */}
                <div className="flex items-center justify-between border-b border-white pb-3 mb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="relative">
                      <div className="w-10 h-10 rounded-full glass-panel flex items-center justify-center font-serif font-bold text-[#B67C7C] border border-white/60">
                        {t.whatsapp.sm}
                      </div>
                      <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white" />
                    </div>
                    <div>
                      <h4 className="font-serif font-bold text-stone-850 text-sm leading-tight">SvetArt Beauty</h4>
                      <span className="text-[10px] text-emerald-600 font-medium">{t.whatsapp.status}</span>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => setWhatsappOpen(false)}
                    className="p-1 rounded-full text-stone-400 hover:bg-white/40 hover:text-stone-750 transition-colors cursor-pointer"
                    aria-label="Close Whatsapp popup"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <p className="text-[11px] text-stone-600 leading-relaxed bg-white/45 p-3 rounded-xl border border-white/60 mb-4 select-none">
                  {t.whatsapp.welcomeMsg}
                </p>

                {/* Simple Template Shortcuts */}
                <div className="space-y-1.5 mb-3.5">
                  <span className="text-[9px] uppercase tracking-wider text-stone-400 font-bold block">
                    {lang === 'ro' ? 'Formulări rapide' : lang === 'ru' ? 'Шаблоны сообщений' : 'Quick templates'}
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    <button
                      type="button"
                      onClick={() => setWhatsappMsg(manicuresMsg[lang] || manicuresMsg.en)}
                      className="px-2.5 py-1 rounded-[10px] glass-button hover:bg-white/60 text-[10px] text-stone-700 hover:text-[#B67C7C] cursor-pointer"
                    >
                      {t.whatsapp.options.manicure}
                    </button>
                    <button
                      type="button"
                      onClick={() => setWhatsappMsg(laminationMsg[lang] || laminationMsg.en)}
                      className="px-2.5 py-1 rounded-[10px] glass-button hover:bg-white/60 text-[10px] text-stone-700 hover:text-[#B67C7C] cursor-pointer"
                    >
                      {t.whatsapp.options.lamination}
                    </button>
                  </div>
                </div>

                {/* Messaging Form */}
                <form onSubmit={handleWhatsappSend} className="space-y-3">
                  <textarea
                    rows={3}
                    required
                    className="w-full text-xs p-3 rounded-xl border border-white/60 bg-white/20 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-[#D9A7A7]/40 text-stone-850 font-sans"
                    value={whatsappMsg || ''}
                    onChange={(e) => setWhatsappMsg(e.target.value)}
                  />
                  <button
                    type="submit"
                    className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold uppercase tracking-wide flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    {lang === 'ro' ? 'Trimite pe WhatsApp' : lang === 'ru' ? 'Отправить в WhatsApp' : 'Send on WhatsApp'}
                  </button>
                </form>

              </motion.div>
            )}
          </AnimatePresence>

          {/* Floating Action Circle Button */}
          <button
            onClick={() => {
              setWhatsappOpen(!whatsappOpen);
              setBadgeCounter(0);
            }}
            className="w-14 h-14 bg-emerald-600 hover:bg-emerald-700 text-stone-50 rounded-full flex items-center justify-center shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 relative cursor-pointer border border-emerald-550/20"
            id="btn-floating-whatsapp"
            title="Connect on WhatsApp"
          >
            <MessageSquare className="w-6 h-6 fill-stone-50/10" />
            
            {/* Notification Badge */}
            {badgeCounter > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-6 h-6 rounded-full bg-rose-500 text-stone-50 font-bold border-2 border-white flex items-center justify-center text-[10px] animate-bounce">
                1
              </span>
            )}
          </button>

        </div>

      </div>

    </div>
  );
}
