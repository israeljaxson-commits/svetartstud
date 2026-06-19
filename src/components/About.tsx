/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ShieldCheck, Award, Heart } from 'lucide-react';
import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import svetaImage from '../assets/sveta.jpeg';

export default function About() {
  const { t } = useLanguage();

  const achievements = [
    {
      icon: <Award className="w-5 h-5 text-[#B67C7C]" />,
      title: t.about.achievements[0]?.title || 'Certified Manicure & Lamination Master',
      desc: t.about.achievements[0]?.desc || 'International accreditation in manicure, pedicure, and professional lamination techniques.',
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-[#B67C7C]" />,
      title: t.about.achievements[1]?.title || 'Class B Autoclave Sterilization',
      desc: t.about.achievements[1]?.desc || '100% sterile instruments. Your health and security are validated to strict clinical sterilization standards.',
    },
    {
      icon: <Heart className="w-5 h-5 text-[#B67C7C]" />,
      title: t.about.achievements[2]?.title || 'Premium Hypoallergenic Materials',
      desc: t.about.achievements[2]?.desc || 'Professional-grade products for manicure, pedicure, and InLei® lamination treatments.',
    },
  ];

  const statistics = [
    { value: t.about.metrics[0]?.value || '15+', metric: t.about.metrics[0]?.label || 'Years of Expertise' },
    { value: t.about.metrics[1]?.value || '450+', metric: t.about.metrics[1]?.label || 'Dedicated Clients' },
    { value: t.about.metrics[2]?.value || '100%', metric: t.about.metrics[2]?.label || 'Hygiene Rating' },
    { value: t.about.metrics[3]?.value || '25+', metric: t.about.metrics[3]?.label || 'Unique Colors & Shades' },
  ];

  return (
    <section id="about" className="py-32 bg-[#F2E4DF] relative overflow-hidden">
      
      {/* Decorative Editorial Watermark Circle */}
      <div className="absolute top-1/4 right-[5%] w-[400px] h-[400px] rounded-full border border-[#D9A7A7]/15 pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 left-[5%] w-[300px] h-[300px] rounded-full border border-[#E7C7A0]/20 pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-center">
          
          {/* About Section Left: Magazine-style Layered Campaign Images */}
          <div className="lg:col-span-6 relative order-last lg:order-first pt-16 lg:pt-0">
            
            {/* Interactive Asymmetric Depth Backdrop Frame */}
            <div className="absolute top-4 left-4 right-12 bottom-12 rounded-[40px] border border-[#D9A7A7]/30 -z-5 border-dashed" />
            
            {/* Main Primary Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 15 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ type: 'spring', damping: 25, stiffness: 85 }}
              className="relative w-full aspect-[4/5] max-w-lg mx-auto rounded-[36px] overflow-hidden premium-shadow border-4 border-white z-10"
            >
              <img
                src={svetaImage}
                alt="SvetArt Studio Atmosphere"
                className="w-full h-full object-cover scale-101 hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2C2523]/60 via-transparent to-transparent pointer-events-none" />
              
              {/* Overlaid Credo Statement Capsule */}
              <div className="absolute bottom-6 left-6 right-6 glass-panel-dark text-[#FAF6F4] rounded-2xl p-5 border border-white/10">
                <span className="text-[28px] font-serif font-light text-[#E7C7A0] leading-none select-none block -mb-2">“</span>
                <p className="font-serif italic text-sm text-[#F8E6DF] mb-2 leading-relaxed">
                  {t.about.credoText}
                </p>
                <div className="flex justify-between items-center border-t border-white/10 pt-2.5">
                  <span className="text-[9px] text-[#D9A7A7] font-bold uppercase tracking-widest block font-sans">
                    {t.about.credoAuthor}
                  </span>
                  <span className="text-[10px] text-[#E7C7A0] italic font-serif">
                    {t.about.credoTitle}
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Asymmetrical Overlapping Detail Zoom Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85, x: -50, y: 50 }}
              whileInView={{ opacity: 1, scale: 1, x: 0, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ type: 'spring', damping: 20, stiffness: 80, delay: 0.25 }}
              className="absolute bottom-[-40px] right-[-10px] lg:right-[-40px] w-48 h-64 rounded-[28px] overflow-hidden premium-shadow border-[6px] border-white z-20 hidden sm:block"
            >
              <img
                src="https://images.unsplash.com/photo-1519014816548-bf5fe059798b?q=80&w=500"
                alt="Accolade detail art Close-up"
                className="w-full h-full object-cover hover:scale-106 transition-transform duration-700"
              />
            </motion.div>
          </div>

          {/* About Section Right: Storytelling & Pedigree Column */}
          <div className="lg:col-span-6 space-y-12">
            
            {/* Editorial Heading Structure */}
            <div className="space-y-4">
              <span className="text-xs uppercase tracking-[0.3em] text-[#B67C7C] font-black block font-sans">
                {t.about.tag}
              </span>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#2C2523] tracking-tight leading-tight">
                {t.about.titleNormal} <br />
                <span className="italic font-light text-[#D9A7A7]">{t.about.titleItalic}</span>
              </h2>
              <div className="h-[1px] w-20 bg-[#D9A7A7]/50" />
            </div>

            {/* Editorial Spacing Copy */}
            <div className="space-y-6 text-stone-600 font-light text-sm md:text-base leading-relaxed font-sans">
              <p dangerouslySetInnerHTML={{ __html: t.about.para1 }} />
              <p dangerouslySetInnerHTML={{ __html: t.about.para2 }} />
            </div>

            {/* Structured Pedigree Accordion-list */}
            <div className="space-y-4">
              {achievements.map((item, idx) => (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                  key={idx}
                  className="flex items-start gap-4 p-5 rounded-2xl border border-[#D9A7A7]/10 bg-white/40 hover:bg-[#F2E4DF] hover:premium-shadow transition-all duration-300 font-sans"
                >
                  <div className="p-3 rounded-xl bg-[#F8E6DF] shrink-0 border border-white">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-[#2C2523] mb-1 font-serif">
                      {item.title}
                    </h4>
                    <p className="text-xs text-stone-500 font-light leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Quick Metrics Banner */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-[#D9A7A7]/20">
              {statistics.map((stat, idx) => (
                <motion.div
                  initial={{ scale: 0.95, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.08, duration: 0.4 }}
                  key={idx}
                  className="text-center font-sans"
                >
                  <span className="block font-serif text-3xl md:text-4xl font-bold text-[#B67C7C]">
                    {stat.value}
                  </span>
                  <span className="text-[10px] uppercase tracking-widest text-[#2C2523] font-bold block mt-1">
                    {stat.metric}
                  </span>
                </motion.div>
              ))}
            </div>

          </div>

        </div>
      </div>

    </section>
  );
}
