/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, MouseEvent } from 'react';
import { Heart, MessageCircle, Instagram, Sparkles, ZoomIn, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';

interface InstagramPost {
  id: string;
  image: string;
  likes: number;
  comments: number;
  caption: string;
  tags: string[];
  treatment: string;
  gridClass: string; // Specific column-span/row-span layout coords
  heightClass: string;
}

const localLookbookT = {
  en: {
    comparisonTitle: "Lash Lamination & Lift Comparison",
    comparisonSub: "Drag the rose slider to compare natural lashes and 1 session of Italian Lash Filler.",
    beforeLabel: "Natural (Before)",
    feedTitle: "SvetArt Lookbook Feed",
    feedSub: "Interactive preview of our latest laboratory releases on social media.",
    post1: {
      treatment: 'Structured Gel Ivory',
      caption: 'Pure symmetry on natural nail beds. Building structural arches with premium gel bases allows this exquisite glossy shine to persist over 5 weeks. No chips, pure alignment.',
    },
    post2: {
      treatment: 'Bespoke Italian French',
      caption: 'Fine lines of pure satisfaction. Each smile line is calibrated matching individual finger dimensions for optimal elongation. Hand-painted with deep devotion.',
    },
    post3: {
      treatment: 'Italian Lash Lamination',
      caption: 'Opening the gaze effortlessly. Lash Filler lamination thickens lashes up to 24% over 3 sessions while creating a perfect, persistent curl. Wake up looking flawless.',
    },
    post4: {
      treatment: 'Bespoke Brow Architecture',
      caption: 'Golden ratio brow tailoring. Correcting asymmetric shapes through pristine wax mapping and premium organic tint infusions. Frames the face beautifully.',
    },
    post5: {
      treatment: 'Ultra Gloss Top-coat overlay',
      caption: 'That flawless reflection coefficient. A visual test of perfect structural curves: notice how light rays reflect linearly across the nail face. Craftsmanship lives here.',
    },
    post6: {
      treatment: 'Lash & Brow Combo Ritual',
      caption: 'SvetArt Signature Look ready for holidays. Deep laminations paired with natural organic shades. Zero mascara, zero morning worries.',
    }
  },
  ro: {
    comparisonTitle: "Laminare de Gene & Sprâncene - Înainte / După",
    comparisonSub: "Trage de glisor pentru a compara genele naturale cu rezultatul după laminare.",
    beforeLabel: "Natural (Înainte)",
    feedTitle: "Lookbook Social",
    feedSub: "Previzualizare interactivă a celor mai recente lucrări pe rețelele sociale.",
    post1: {
      treatment: 'Gel Structurat Ivory',
      caption: 'Simetrie pură pe patul unghial natural. Construirea apexului cu geluri de înaltă calitate permite rezistența culorii timp de peste 5 săptămâni.',
    },
    post2: {
      treatment: 'Manichiură French Personalizată',
      caption: 'Linii fine de satisfacție totală. Fiecare linie de zâmbet este calibrată manual la proporțiile degetelor tale.',
    },
    post3: {
      treatment: 'Laminare Gene Italiană',
      caption: 'Privire deschisă fără efort. Produsul InLei® Lash Filler îngroașă genele naturale cu până la 24%.',
    },
    post4: {
      treatment: 'Arhitectură Sprâncene de Lux',
      caption: 'Modelarea sprâncenelor conform secțiunii de aur. Corectarea formelor asimetrice prin ceară organică și pensat de precizie.',
    },
    post5: {
      treatment: 'Top Coat Ultra Glossy',
      caption: 'Reflexia perfectă a luminii. Testul vizual al structurii ideale: lumina se reflectă liniar pe suprafața unghiei.',
    },
    post6: {
      treatment: 'Tratament Pachet Combo',
      caption: 'Lookul semnătură SvetArt gata pentru orice ocazie. Laminări profunde combinate cu nuanțe organice durabile.',
    }
  },
  ru: {
    comparisonTitle: "Ламинирование ресниц — До и После",
    comparisonSub: "Перемещайте розовый слайдер, чтобы сравнить ресницы до и после процедуры InLei®.",
    beforeLabel: "Натуральные (До)",
    feedTitle: "Лукбук SvetArt",
    feedSub: "Интерактивная подборка наших последних работ в социальных сетях.",
    post1: {
      treatment: 'Гелевый маникюр Слоновая Кость',
      caption: 'Чистая симметрия на ногтях. Архитектурное укрепление премиальными гелями сохраняет безупречный вид и прочность до 5 недель.',
    },
    post2: {
      treatment: 'Индивидуальный френч',
      caption: 'Безукоризненная прорисовка улыбки. Каждая линия калибруется под естественные пропорции ваших пальцев.',
    },
    post3: {
      treatment: 'Итальянское ламинирование ресниц',
      caption: 'Выразительный взгляд без усилий. Состав Lash Filler клинически утолщает натуральные ресницы на 24% за три сеанса.',
    },
    post4: {
      treatment: 'Архитектура бровей по Золотому Сечению',
      caption: 'Исправление асимметрии с помощью точной коррекции и стойкого окрашивания органическими пигментами.',
    },
    post5: {
      treatment: 'Зеркальный глянцевый топ',
      caption: 'Идеальный блик. Визуальный тест правильной архитектуры ногтя: световая линия отражается абсолютно ровно.',
    },
    post6: {
      treatment: 'Премиум-комплекс для ресниц и бровей',
      caption: 'Фирменный комплекс SvetArt для безупречного внешнего вида. Ноль косметики, идеальный результат каждое утро.',
    }
  }
};

export default function Gallery() {
  const { lang, t } = useLanguage();
  const st = localLookbookT[lang] || localLookbookT.en;

  const [posts, setPosts] = useState<InstagramPost[]>([
    {
      id: 'post-1',
      image: 'https://vufenghjvgdfsatjxkac.supabase.co/storage/v1/object/public/gallery/image9.jpeg',
      likes: 184,
      comments: 24,
      treatment: st.post1.treatment,
      caption: st.post1.caption,
      tags: ['#GelManicure', '#SvetaAesthetics', '#NailArchitecture', '#NudeGlam'],
      gridClass: 'lg:col-span-1 lg:row-span-2',
      heightClass: 'aspect-[3/4.5] lg:h-full min-h-[460px]'
    },
    {
      id: 'post-2',
      image: 'https://vufenghjvgdfsatjxkac.supabase.co/storage/v1/object/public/gallery/image9.jpeg',
      likes: 245,
      comments: 31,
      treatment: st.post2.treatment,
      caption: st.post2.caption,
      tags: ['#FrenchManicure', '#CoutureNails', '#ChisinauBeauty', '#EliteArtistry'],
      gridClass: 'lg:col-span-1',
      heightClass: 'aspect-square h-[300px] lg:h-[340px]'
    },
    {
      id: 'post-3',
      image: 'https://vufenghjvgdfsatjxkac.supabase.co/storage/v1/object/public/gallery/image9.jpeg',
      treatment: st.post3.treatment,
      caption: st.post3.caption,
      tags: ['#LashLamination', '#InLeiLashFiller', '#EyeGaze', '#EyelashPerm'],
      gridClass: 'lg:col-span-1',
      heightClass: 'aspect-square h-[300px] lg:h-[340px]'
    },
    {
      id: 'post-4',
      image: 'https://vufenghjvgdfsatjxkac.supabase.co/storage/v1/object/public/gallery/image9.jpeg',
      likes: 198,
      comments: 19,
      treatment: st.post4.treatment,
      caption: st.post4.caption,
      tags: ['#BrowArchitecture', '#EyebrowTinting', '#BeautyBySveta', '#FacialSymmetry'],
      gridClass: 'lg:col-span-1',
      heightClass: 'aspect-square h-[300px] lg:h-[340px]'
    },
    {
      id: 'post-5',
      image: 'https://vufenghjvgdfsatjxkac.supabase.co/storage/v1/object/public/gallery/image9.jpeg',
      likes: 289,
      comments: 37,
      treatment: st.post5.treatment,
      caption: st.post5.caption,
      tags: ['#FlawlessNails', '#JapaneseGel', '#RussianHardware', '#SvetArtLook'],
      gridClass: 'lg:col-span-1 lg:row-span-2',
      heightClass: 'aspect-[3/4.5] lg:h-full min-h-[460px]'
    },
    {
      id: 'post-6',
      image: 'https://vufenghjvgdfsatjxkac.supabase.co/storage/v1/object/public/gallery/image9.jpeg',
      likes: 324,
      comments: 43,
      treatment: st.post6.treatment,
      caption: st.post6.caption,
      tags: ['#SignatureRitual', '#LaminationLounge', '#EffortlessGlow', '#ClaraVibe'],
      gridClass: 'lg:col-span-1',
      heightClass: 'aspect-square h-[300px] lg:h-[340px]'
    }
  ]);

  const [selectedPost, setSelectedPost] = useState<InstagramPost | null>(null);
  const [likedPosts, setLikedPosts] = useState<Record<string, boolean>>({});

  const toggleLike = (postId: string, e: MouseEvent) => {
    e.stopPropagation();
    const isLiked = likedPosts[postId];
    setLikedPosts(prev => ({ ...prev, [postId]: !isLiked }));
    setPosts(prev => prev.map(p => {
      if (p.id === postId) {
        return { ...p, likes: isLiked ? p.likes - 1 : p.likes + 1 };
      }
      return p;
    }));
  };

  return (
    <section id="gallery" className="py-28 bg-[#F2E4DF] relative overflow-hidden">
      
      {/* Editorial Decorative Background Details */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-[#F8E6DF]/20 to-transparent rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
        
        {/* Title Block */}
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-20">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#2C2523] tracking-tight leading-tight">
            {t.gallery.titleNormal} <span className="italic font-light text-[#D9A7A7]">{t.gallery.titleItalic}</span>
          </h2>
          <div className="h-[1px] w-24 bg-[#D9A7A7]/50 mx-auto mt-6" />
        </div>

        {/* ================= SECTION B: LUXURY EDITORIAL MASONRY GRID ================= */}
        <div>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-12">
            <div className="space-y-1.5 text-center sm:text-left">
              <h3 className="font-serif text-3xl font-bold text-[#2C2523]">{st.feedTitle}</h3>
              <p className="text-xs text-stone-500 font-light font-sans">{st.feedSub}</p>
            </div>
            <a
              href="https://www.instagram.com/svetart.beauty?igsh=MmhidHgzbHh2dXRy"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-4 rounded-full rose-gold-gradient text-white text-xs font-bold uppercase tracking-widest flex items-center gap-2 transition-all duration-305 shadow-md hover:shadow-2xl hover:brightness-105 active:scale-98 cursor-pointer font-sans"
            >
              <Instagram className="w-4 h-4 text-white" />
              <span>{t.gallery.followInsta}</span>
            </a>
          </div>


          {/* EDITORIAL MASONRY GRID CONSTRUCT */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {posts.map((post) => {
              const isLiked = !!likedPosts[post.id];
              return (
                <motion.div
                  initial={{ opacity: 0, y: 35 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  whileHover={{ y: -10, rotate: 0.5 }}
                  transition={{ type: 'spring', damping: 24, stiffness: 80 }}
                  key={post.id}
                  onClick={() => setSelectedPost(post)}
                  className={`group relative overflow-hidden cursor-pointer rounded-[36px] shadow-md hover:premium-shadow border border-white/70 bg-stone-50 transition-all duration-500 ${post.gridClass} ${post.heightClass}`}
                >
                  {/* Photo with zoom depth transition */}
                  <img
                    src={post.image}
                    alt={post.treatment}
                    className="w-full h-full object-cover scale-100 group-hover:scale-106 transition-transform duration-800 ease-out"
                  />
                  
                  {/* Luxury editorial visual overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2C2523]/80 via-[#2C2523]/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex flex-col justify-between p-7 text-white" />

                  {/* Details panel overlay */}
                  <div className="absolute inset-0 flex flex-col justify-between p-7 text-white opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-400 z-10">
                    <span className="text-[9px] uppercase tracking-[0.25em] font-extrabold text-[#FAF6F4] glass-panel-dark px-3.5 py-1.5 rounded-full border border-white/10 self-start font-sans">
                      {post.treatment}
                    </span>

                    <p className="text-xs font-light line-clamp-4 leading-relaxed text-stone-150 italic font-sans pr-2">
                      "{post.caption}"
                    </p>

                    <div className="flex items-center justify-end border-t border-white/25 pt-4">
                      <span className="text-[10px] uppercase tracking-widest text-[#FAF6F4] font-black flex items-center gap-1 font-sans">
                        <ZoomIn className="w-3.5 h-3.5 text-[#E7C7A0]" /> {t.gallery.inspect}
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Modal Inspection Overlay */}
        <AnimatePresence>
          {selectedPost && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedPost(null)}
                className="absolute inset-0 bg-[#2C2523]/85 backdrop-blur-md"
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 25 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 25 }}
                transition={{ type: 'spring', damping: 25, stiffness: 100 }}
                className="glass-panel-opaque rounded-[40px] overflow-hidden max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 shadow-2xl relative border border-white/60"
              >
                <button
                  onClick={() => setSelectedPost(null)}
                  className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>

                <div className="aspect-square bg-stone-100 relative">
                  <img
                    src={selectedPost.image}
                    alt={selectedPost.treatment}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-7 md:p-9 flex flex-col justify-between font-sans">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between border-b border-[#D9A7A7]/20 pb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full rose-gold-gradient flex items-center justify-center font-serif text-sm font-bold text-white shadow-md">
                          SB
                        </div>
                        <div>
                          <h4 className="text-xs font-bold uppercase tracking-wider text-[#2C2523]">SvertArt Beauty</h4>
                          <span className="text-[10px] text-stone-400">Chisinau Studio</span>
                        </div>
                      </div>
                      
                      <span className="text-[10px] uppercase tracking-wide bg-[#2C2523] text-[#F8E6DF] font-bold px-3 py-1.5 rounded-full border border-white/10">
                        {selectedPost.treatment}
                      </span>
                    </div>

                    <div className="space-y-4">
                      <p className="text-sm font-light text-stone-600 leading-relaxed italic">
                        "{selectedPost.caption}"
                      </p>
                      
                      <div className="flex flex-wrap gap-1.5">
                        {selectedPost.tags.map((tg) => (
                          <span key={tg} className="text-[10px] text-[#B67C7C] hover:underline font-semibold font-sans">
                            {tg}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-[#D9A7A7]/20">
                    <a
                      href={`https://wa.me/37379166006?text=${encodeURIComponent(
                        `Hi Sveta! I saw your stunning post about "${selectedPost.treatment}" in the SvetArt Lookbook and would love to check slot availability...`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-4 rose-gold-gradient text-white hover:brightness-105 hover:shadow-lg rounded-xl text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer text-center"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-[#E7C7A0]" />
                      {t.gallery.modalCTA}
                    </a>
                  </div>
                </div>

              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
