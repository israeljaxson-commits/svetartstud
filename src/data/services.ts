export type ServiceCategory = 'manicure' | 'pedicure' | 'lamination';

import heelCareImage from '../../assets/gallery/heel-care.jpg';
import eyelashLaminationImage from '../../assets/gallery/eyelash-lamination.jpg';
import hygienicPedicureImage from '../../assets/gallery/hygienic-pedicure.jpg';
import aestheticPedicureImage from '../../assets/gallery/aesthetic-pedicure.jpg';
import eyebrowLaminationImage from '../../assets/gallery/eyebrow-lamination.jpg';
import pedicureCourseImage from '../../assets/gallery/pedicure-course.jpg';

export const BOOKING_SERVICE_OPTIONS = [
  'Hygienic Manicure',
  'Manicure Correction',
  'Nail Extensions',
  'Hygienic Pedicure',
  'Aesthetic Pedicure',
  'Heel Care',
  'Eyelash Lamination',
  'Eyebrow Lamination',
  'Eyelash + Eyebrow Lamination',
  'Manicure Course',
  'Pedicure Course',
  'Lamination Course',
] as const;

export type BookingServiceOption = (typeof BOOKING_SERVICE_OPTIONS)[number];

export interface ServiceItem {
  id: string;
  bookingName: BookingServiceOption;
  category: ServiceCategory;
  image: string;
  en: { name: string; price: string; materials: string; description: string; features: string[] };
  ro: { name: string; price: string; materials: string; description: string; features: string[] };
  ru: { name: string; price: string; materials: string; description: string; features: string[] };
}

export const SALON_SERVICES: ServiceItem[] = [
  {
    id: 'hygienic-manicure',
    bookingName: 'Hygienic Manicure',
    category: 'manicure',
    image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=600',
    en: {
      name: 'Hygienic Manicure',
      price: '250 MDL',
      materials: 'Professional sterile tools & premium care products',
      description: 'A thorough, hygienic manicure focused on nail health, cuticle care, and a clean, polished finish.',
      features: ['Sterile instrument protocol', 'Cuticle alignment & shaping', 'Nail plate preparation', 'Nourishing cuticle oil finish'],
    },
    ro: {
      name: 'Manichiură Igienică',
      price: '250 MDL',
      materials: 'Instrumente sterile profesionale & produse premium',
      description: 'Manichiură igienică completă, axată pe sănătatea unghiilor, îngrijirea cuticulei și un finisaj curat.',
      features: ['Protocol cu instrumente sterile', 'Aliniere și modelare cuticule', 'Pregătirea unghiei', 'Finisaj cu ulei nutritiv'],
    },
    ru: {
      name: 'Гигиенический маникюр',
      price: '250 MDL',
      materials: 'Профессиональные стерильные инструменты и премиум-средства',
      description: 'Тщательный гигиенический маникюр с акцентом на здоровье ногтей, уход за кутикулой и аккуратный финиш.',
      features: ['Стерильный протокол инструментов', 'Обработка и форма кутикулы', 'Подготовка ногтевой пластины', 'Питательное масло для кутикулы'],
    },
  },
  {
    id: 'manicure-correction',
    bookingName: 'Manicure Correction',
    category: 'manicure',
    image: 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?q=80&w=600',
    en: {
      name: 'Manicure Correction',
      price: 'From 380 MDL',
      materials: 'Precision correction tools & restorative formulas',
      description: 'Corrective manicure to restore shape, symmetry, and strength for nails that need expert refinement.',
      features: ['Shape & symmetry correction', 'Structural nail assessment', 'Targeted problem-area care', 'Custom finish to preference'],
    },
    ro: {
      name: 'Corecție Manichiură',
      price: 'De la 380 MDL',
      materials: 'Instrumente de precizie & formule restauratoare',
      description: 'Manichiură corectivă pentru restaurarea formei, simetriei și rezistenței unghiilor care necesită rafinare expertă.',
      features: ['Corecție formă și simetrie', 'Evaluare structurală a unghiei', 'Îngrijire zone problematice', 'Finisaj personalizat'],
    },
    ru: {
      name: 'Коррекция маникюра',
      price: 'От 380 MDL',
      materials: 'Инструменты точной коррекции и восстанавливающие составы',
      description: 'Корректирующий маникюр для восстановления формы, симметрии и прочности ногтей.',
      features: ['Коррекция формы и симметрии', 'Структурная оценка ногтя', 'Уход за проблемными зонами', 'Индивидуальный финиш'],
    },
  },
  {
    id: 'nail-extensions',
    bookingName: 'Nail Extensions',
    category: 'manicure',
    image: 'https://images.unsplash.com/photo-1632345031435-8727f6897d53?q=80&w=600',
    en: {
      name: 'Nail Extensions',
      price: 'From 450 MDL',
      materials: 'Premium extension systems & durable coatings',
      description: 'Professional nail extensions tailored to your desired length and shape with lasting durability.',
      features: ['Custom length & architecture', 'Secure extension application', 'Precision shaping', 'Long-wearing finish'],
    },
    ro: {
      name: 'Extensii Unghii',
      price: 'De la 450 MDL',
      materials: 'Sisteme premium de extensie & acoperiri durabile',
      description: 'Extensii profesionale adaptate la lungimea și forma dorită, cu rezistență de durată.',
      features: ['Lungime și arhitectură personalizată', 'Aplicare sigură a extensiilor', 'Modelare de precizie', 'Finisaj de lungă durată'],
    },
    ru: {
      name: 'Наращивание ногтей',
      price: 'От 450 MDL',
      materials: 'Премиальные системы наращивания и стойкие покрытия',
      description: 'Профессиональное наращивание ногтей с индивидуальной длиной и формой.',
      features: ['Индивидуальная длина и архитектура', 'Надёжное наращивание', 'Точная форма', 'Долговечное покрытие'],
    },
  },
  {
    id: 'manicure-course',
    bookingName: 'Manicure Course',
    category: 'manicure',
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=600',
    en: {
      name: 'Manicure Course',
      price: '350€ / 250€',
      materials: 'Professional training kit & certification materials',
      description: 'Hands-on manicure training course with Svetlana Motoc — master professional techniques step by step.',
      features: ['Live practical training', 'Sterile technique mastery', 'Professional certification path', 'Small-group instruction'],
    },
    ro: {
      name: 'Curs Manichiură',
      price: '350€ / 250€',
      materials: 'Kit de training profesional & materiale de certificare',
      description: 'Curs practic de manichiură cu Svetlana Motoc — tehnici profesionale pas cu pas.',
      features: ['Training practic live', 'Stăpânirea tehnicii sterile', 'Parcurs de certificare', 'Grupuri mici'],
    },
    ru: {
      name: 'Курс маникюра',
      price: '350€ / 250€',
      materials: 'Профессиональный обучающий набор и материалы',
      description: 'Практический курс маникюра со Светланой Моток — профессиональные техники шаг за шагом.',
      features: ['Живое практическое обучение', 'Освоение стерильной техники', 'Путь к сертификации', 'Малые группы'],
    },
  },
  {
    id: 'hygienic-pedicure',
    bookingName: 'Hygienic Pedicure',
    category: 'pedicure',
    image: hygienicPedicureImage,
    en: {
      name: 'Hygienic Pedicure',
      price: '250 MDL',
      materials: 'Clinical-grade pedicure tools & nourishing foot care',
      description: 'Essential hygienic pedicure for clean, healthy feet with precise nail and cuticle care.',
      features: ['Sterile foot care protocol', 'Nail trimming & shaping', 'Cuticle treatment', 'Hydrating foot finish'],
    },
    ro: {
      name: 'Pedichiură Igienică',
      price: '250 MDL',
      materials: 'Instrumente pedichiură & îngrijire premium pentru picioare',
      description: 'Pedichiură igienică esențială pentru picioare curate și sănătoase, cu îngrijire precisă a unghiilor.',
      features: ['Protocol steril pentru picioare', 'Tăiere și modelare unghii', 'Tratament cuticule', 'Finisaj hidratant'],
    },
    ru: {
      name: 'Гигиенический педикюр',
      price: '250 MDL',
      materials: 'Профессиональные инструменты и уход для ног',
      description: 'Гигиенический педикюр для чистых, здоровых стоп с точным уходом за ногтями и кутикулой.',
      features: ['Стерильный протокол ухода', 'Стрижка и форма ногтей', 'Обработка кутикулы', 'Увлажняющий финиш'],
    },
  },
  {
    id: 'aesthetic-pedicure',
    bookingName: 'Aesthetic Pedicure',
    category: 'pedicure',
    image: aestheticPedicureImage,
    en: {
      name: 'Aesthetic Pedicure',
      price: '400 MDL',
      materials: 'Luxury foot care products & premium finishes',
      description: 'Full aesthetic pedicure combining hygiene, exfoliation, and a beautiful polished finish.',
      features: ['Deep cleansing & exfoliation', 'Callus softening', 'Premium nail finish', 'Silky smooth foot result'],
    },
    ro: {
      name: 'Pedichiură Estetică',
      price: '400 MDL',
      materials: 'Produse de lux pentru picioare & finisaje premium',
      description: 'Pedichiură estetică completă: igienă, exfoliere și un finisaj impecabil.',
      features: ['Curățare profundă & exfoliere', 'Înmuiere calozități', 'Finisaj premium unghii', 'Picioare catifelate'],
    },
    ru: {
      name: 'Эстетический педикюр',
      price: '400 MDL',
      materials: 'Люксовые средства для ног и премиальные покрытия',
      description: 'Полный эстетический педикюр: гигиена, exfoliation и безупречный финиш.',
      features: ['Глубокое очищение и пилинг', 'Размягчение огрубелостей', 'Премиальное покрытие', 'Гладкие и ухоженные стопы'],
    },
  },
  {
    id: 'heel-care',
    bookingName: 'Heel Care',
    category: 'pedicure',
    image: heelCareImage,
    en: {
      name: 'Heel Care',
      price: '120 MDL',
      materials: 'Specialized heel treatment formulas',
      description: 'Targeted heel care to smooth, soften, and restore comfort to dry or cracked heels.',
      features: ['Focused heel treatment', 'Dead skin removal', 'Intensive moisturization', 'Comfort-restoring finish'],
    },
    ro: {
      name: 'Îngrijire Călcâie',
      price: '120 MDL',
      materials: 'Formule specializate pentru călcâie',
      description: 'Tratament dedicat călcâielor pentru netezire, catifelare și confort.',
      features: ['Tratament focalizat pe călcâie', 'Îndepărtarea pielii uscate', 'Hidratare intensivă', 'Finisaj reconfortant'],
    },
    ru: {
      name: 'Уход за пятками',
      price: '120 MDL',
      materials: 'Специализированные формулы для пяток',
      description: 'Целенаправленный уход за пятками для смягчения сухой и потрескавшейся кожи.',
      features: ['Уход именно для пяток', 'Удаление огрубевшей кожи', 'Интенсивное увлажнение', 'Комфортный финиш'],
    },
  },
  {
    id: 'pedicure-course',
    bookingName: 'Pedicure Course',
    category: 'pedicure',
    image: pedicureCourseImage,
    en: {
      name: 'Pedicure Course',
      price: '200€',
      materials: 'Professional pedicure training kit',
      description: 'Professional pedicure training course covering sterile technique, foot anatomy, and client-ready skills.',
      features: ['Practical foot care training', 'Sterile workflow mastery', 'Professional certification', 'Expert-led sessions'],
    },
    ro: {
      name: 'Curs Pedichiură',
      price: '200€',
      materials: 'Kit profesional de training pedichiură',
      description: 'Curs profesional de pedichiură: tehnică sterilă, anatomia piciorului și abilitați pentru clienți.',
      features: ['Training practic pentru picioare', 'Stăpânirea fluxului steril', 'Certificare profesională', 'Sesiuni conduse de expert'],
    },
    ru: {
      name: 'Курс педикюра',
      price: '200€',
      materials: 'Профессиональный обучающий набор для педикюра',
      description: 'Профессиональный курс педикюра: стерильная техника, анатомия стопы и практические навыки.',
      features: ['Практическое обучение', 'Освоение стерильного процесса', 'Профессиональная сертификация', 'Занятия с экспертом'],
    },
  },
  {
    id: 'eyelash-lamination',
    bookingName: 'Eyelash Lamination',
    category: 'lamination',
    image: eyelashLaminationImage,
    en: {
      name: 'Eyelash Lamination',
      price: '400 MDL',
      materials: 'InLei® professional lamination formulas',
      description: 'Eyelash lamination for a lifted, defined curl that enhances your natural lashes for weeks.',
      features: ['Precision lash mapping', 'Lift & curl treatment', 'Nourishing lamination formula', 'Long-lasting natural result'],
    },
    ro: {
      name: 'Laminare Gene',
      price: '400 MDL',
      materials: 'Formule profesionale InLei® pentru laminare',
      description: 'Laminare de gene pentru o curbă ridicată și definită, care evidențiază genele naturale săptămâni întregi.',
      features: ['Mapare precisă a genelor', 'Tratament lift & curl', 'Formulă nutritivă de laminare', 'Rezultat natural de durată'],
    },
    ru: {
      name: 'Ламинирование ресниц',
      price: '400 MDL',
      materials: 'Профессиональные составы InLei®',
      description: 'Ламинирование ресниц для выразительного изгиба и подчёркивания натуральных ресниц на несколько недель.',
      features: ['Точная укладка ресниц', 'Лифтинг и завивка', 'Питательная формула', 'Стойкий натуральный результат'],
    },
  },
  {
    id: 'eyebrow-lamination',
    bookingName: 'Eyebrow Lamination',
    category: 'lamination',
    image: eyebrowLaminationImage,
    en: {
      name: 'Eyebrow Lamination',
      price: '370 MDL',
      materials: 'Premium brow lamination & tint formulas',
      description: 'Brow lamination to set hairs in a fuller, more uniform direction with a polished, groomed look.',
      features: ['Brow shape assessment', 'Lamination & setting', 'Optional tint coordination', 'Fuller groomed appearance'],
    },
    ro: {
      name: 'Laminare Sprâncene',
      price: '370 MDL',
      materials: 'Formule premium pentru laminare sprâncene',
      description: 'Laminare sprâncene pentru fire mai pline, uniform direcționate, cu un aspect îngrijit.',
      features: ['Evaluarea formei sprâncenelor', 'Laminare și fixare', 'Coordonare opțională de nuanță', 'Aspect mai plin și îngrijit'],
    },
    ru: {
      name: 'Ламинирование бровей',
      price: '370 MDL',
      materials: 'Премиальные составы для ламинирования бровей',
      description: 'Ламинирование бровей для более густого, аккуратно уложенного и ухоженного вида.',
      features: ['Оценка формы бровей', 'Ламинирование и фиксация', 'Опциональное окрашивание', 'Более полный ухоженный вид'],
    },
  },
  {
    id: 'eyelash-eyebrow-lamination',
    bookingName: 'Eyelash + Eyebrow Lamination',
    category: 'lamination',
    image: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?q=80&w=600',
    en: {
      name: 'Eyelash + Eyebrow Lamination',
      price: '700 MDL',
      materials: 'Complete InLei® lamination suite',
      description: 'Combined eyelash and eyebrow lamination for a harmonized, camera-ready look in one session.',
      features: ['Full lash lamination', 'Full brow lamination', 'Harmonized facial framing', 'Best-value combo session'],
    },
    ro: {
      name: 'Laminare Gene + Sprâncene',
      price: '700 MDL',
      materials: 'Set complet InLei® pentru laminare',
      description: 'Laminare combinată gene și sprâncene pentru un look armonios, gata de fotografiat, într-o singură ședință.',
      features: ['Laminare completă gene', 'Laminare completă sprâncene', 'Încadrare facială armonizată', 'Cel mai bun pachet combo'],
    },
    ru: {
      name: 'Ламинирование ресниц + бровей',
      price: '700 MDL',
      materials: 'Полный комплекс InLei® для ламинирования',
      description: 'Комбинированное ламинирование ресниц и бровей для гармоничного образа за один визит.',
      features: ['Полное ламинирование ресниц', 'Полное ламинирование бровей', 'Гармоничное обрамление лица', 'Выгодный комбо-сеанс'],
    },
  },
  {
    id: 'lamination-course',
    bookingName: 'Lamination Course',
    category: 'lamination',
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=600',
    en: {
      name: 'Lamination Course',
      price: '250€',
      materials: 'Professional lamination training kit',
      description: 'Professional lash and brow lamination course — learn certified techniques from Svetlana Motoc.',
      features: ['Lash & brow lamination training', 'Product chemistry overview', 'Live model practice', 'Professional certification'],
    },
    ro: {
      name: 'Curs Laminare',
      price: '250€',
      materials: 'Kit profesional de training laminare',
      description: 'Curs profesional de laminare gene și sprâncene — tehnici certificate cu Svetlana Motoc.',
      features: ['Training laminare gene & sprâncene', 'Prezentare produse & chimie', 'Practică pe model live', 'Certificare profesională'],
    },
    ru: {
      name: 'Курс ламинирования',
      price: '250€',
      materials: 'Профессиональный обучающий набор',
      description: 'Профессиональный курс ламинирования ресниц и бровей — сертифицированные техники от Светланы Моток.',
      features: ['Обучение ламинированию ресниц и бровей', 'Обзор составов и химии', 'Практика на модели', 'Профессиональная сертификация'],
    },
  },
];

export function getServiceById(id: string): ServiceItem | undefined {
  return SALON_SERVICES.find((s) => s.id === id);
}

export function getServiceByBookingName(name: string): ServiceItem | undefined {
  return SALON_SERVICES.find((s) => s.bookingName === name);
}
