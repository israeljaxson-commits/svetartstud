/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Calendar, Clock, User, Phone, Mail, ArrowLeft, ArrowRight, Check, CheckCircle2, AlertCircle, Sparkles, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { SALON_SERVICES } from '../data/services';

export interface Booking {
  id: string;
  serviceId: string;
  serviceName: string;
  duration: string;
  dateString: string; // e.g. "2026-06-18"
  timeSlot: string;   // e.g. "14:00"
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  clientNotes?: string;
  referenceCode: string;
  createdAt: string;
}

interface CalendarBookingProps {
  preselectedServiceId?: string;
  onBookingComplete?: (booking: Booking) => void;
}

const SERVICES_DATA = SALON_SERVICES.map((s) => ({
  id: s.id,
  name: {
    en: s.en.name,
    ro: s.ro.name,
    ru: s.ru.name,
  },
  duration: s.category === 'lamination' ? '65m' : s.category === 'pedicure' ? '60m' : '75m',
  materials: {
    en: s.en.materials,
    ro: s.ro.materials,
    ru: s.ru.materials,
  },
  price: {
    en: s.en.price,
    ro: s.ro.price,
    ru: s.ru.price,
  },
}));

const LOCALES = {
  en: {
    title: "Luxury Booking Calendar",
    subtitle: "Secure your private beauty session at SvetArt Studio in Chisinau",
    step1: "Select treatment",
    step2: "Choose date & time",
    step3: "Concierge details",
    step4: "Reservation confirmed",
    prev: "Back",
    next: "Continue",
    chooseService: "Choose a bespoke treatment",
    chooseDate: "Select your preferred date",
    chooseTime: "Select an available time slot",
    durationLabel: "Duration",
    priceLabel: "Price",
    formulasLabel: "Formulas",
    clientName: "Your Full Name",
    clientPhone: "Mobile Phone",
    clientEmail: "Email Address",
    clientNotes: "Special requests or color preferences (optional)",
    confirmBtn: "Confirm Luxury Booking",
    successHeading: "Appointment Secured!",
    successMsg: "Your private session has been officially registered in SvetArt's elite schedule. A personal VIP confirmation will be synchronized shortly.",
    refCode: "Booking Ref",
    addressLabel: "Studio Address",
    hoursLabel: "Salon Line",
    addCalendar: "Add to Google Calendar",
    backToServices: "Back to Services",
    myBookings: "My Appointmens",
    cancelBooking: "Cancel Reservation",
    warningPast: "Cannot book past dates.",
    sundayNotice: "ℹ️ Sunday sessions involve a custom surcharge and require personal manual approval.",
    noActive: "You do not have any active appointments. Pick a slot below!",
    nameReq: "Please enter your name",
    phoneReq: "Please enter your phone number",
    emailReq: "Please enter a valid email address",
    bookedSlot: "Booked",
    activeHeading: "Your Confirmed Luxury Appointments",
    serviceTitle: "Service",
    dateTimeTitle: "Selected Date & Time",
    notesTitle: "My Notes",
    priceEst: "Estimated Cost"
  },
  ro: {
    title: "Calendar de Rezervări de Lux",
    subtitle: "Asigură-ți sesiunea de înfrumusețare privată la SvetArt Studio în Chișinău",
    step1: "Selectează tratamentul",
    step2: "Alege data și ora",
    step3: "Detalii client",
    step4: "Rezervare confirmată",
    prev: "Anterior",
    next: "Mai departe",
    chooseService: "Alege un tratament personalizat",
    chooseDate: "Selectează data dorită",
    chooseTime: "Alege un interval orar liber",
    durationLabel: "Durată",
    priceLabel: "Preț",
    formulasLabel: "Formule",
    clientName: "Numele tău complet",
    clientPhone: "Telefon mobil",
    clientEmail: "Adresă de email",
    clientNotes: "Solicitări speciale sau preferințe de culoare (opțional)",
    confirmBtn: "Confirmă Rezervarea de Lux",
    successHeading: "Programare Securizată!",
    successMsg: "Sesiunea ta privată a fost înregistrată oficial în programul de elită SvetArt. O confirmare personalizată VIP va fi sincronizată în curând.",
    refCode: "Ref. Rezervare",
    addressLabel: "Adresă Studio",
    hoursLabel: "Linie Salon",
    addCalendar: "Adaugă în Google Calendar",
    backToServices: "Înapoi la Servicii",
    myBookings: "Programările Mele",
    cancelBooking: "Anulează Programarea",
    warningPast: "Nu se pot rezerva date din trecut.",
    sundayNotice: "ℹ️ Sesiunile de duminică implică o taxă suplimentară de €15 și necesită aprobare manuală.",
    noActive: "Nu ai nicio programare activă. Alege un interval orar mai jos!",
    nameReq: "Te rugăm să introduci numele",
    phoneReq: "Te rugăm să introduci numărul de telefon",
    emailReq: "Te rugăm să introduci o adresă de email validă",
    bookedSlot: "Ocupat",
    activeHeading: "Programările Tale de Lux Confirmate",
    serviceTitle: "Serviciu",
    dateTimeTitle: "Data și Ora Selectată",
    notesTitle: "Observații",
    priceEst: "Preț estimativ"
  },
  ru: {
    title: "Календарь Премиум-Записи",
    subtitle: "Забронируйте визит в уютную студию SvetArt в Кишиневе",
    step1: "Выберите услугу",
    step2: "Дата и время",
    step3: "Данные клиента",
    step4: "Запись подтверждена",
    prev: "Назад",
    next: "Продолжить",
    chooseService: "Выберите процедуру",
    chooseDate: "Выберите желаемую дату",
    chooseTime: "Выберите свободное время",
    durationLabel: "Длительность",
    priceLabel: "Стоимость",
    formulasLabel: "Материалы",
    clientName: "Ваше имя и фамилия",
    clientPhone: "Мобильный телефон",
    clientEmail: "Электронная почта",
    clientNotes: "Особые пожелания или детали дизайна (необязательно)",
    confirmBtn: "Подтвердить запись класса люкс",
    successHeading: "Визит успешно забронирован!",
    successMsg: "Ваша сессия официально внесена в рабочий календарь SvetArt. Мы свяжемся с вами в ближайшее время для подтверждения.",
    refCode: "Код записи",
    addressLabel: "Адрес студии",
    hoursLabel: "Рабочие часы",
    addCalendar: "Добавить в Google Календарь",
    backToServices: "Назад к услугам",
    myBookings: "Мои Записи",
    cancelBooking: "Отменить запись",
    warningPast: "Нельзя забронировать прошедшую дату.",
    sundayNotice: "ℹ️ Записи по воскресеньям включают наценку €15 и требуют ручного подтверждения.",
    noActive: "У вас нет активных записей. Выберите время ниже!",
    nameReq: "Пожалуйста, введите имя",
    phoneReq: "Пожалуйста, введите номер телефона",
    emailReq: "Пожалуйста, введите корректный email",
    bookedSlot: "Занято",
    activeHeading: "Ваш Подтвержденные Премиум-Записи",
    serviceTitle: "Услуга",
    dateTimeTitle: "Выбранные Дата и Время",
    notesTitle: "Ваши примечания",
    priceEst: "Стоимость"
  }
};

const WEEKDAYS_SHORT = {
  en: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  ro: ['Lun', 'Mar', 'Mie', 'Joi', 'Vin', 'Sâm', 'Dum'],
  ru: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']
};

const MONTHS = {
  en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  ro: ['Ianuarie', 'Februarie', 'Martie', 'Aprilie', 'Mai', 'Iunie', 'Iulie', 'August', 'Septembrie', 'Octombrie', 'Noiembrie', 'Decembrie'],
  ru: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']
};

export default function CalendarBooking({ preselectedServiceId = '', onBookingComplete }: CalendarBookingProps) {
  const { lang } = useLanguage();
  const dict = LOCALES[lang] || LOCALES.en;

  // Booking states
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState<typeof SERVICES_DATA[0] | null>(null);
  
  // Date and custom calendar logic
  // Since real time is June 2026, calendar initializes on month = 5 (June)
  const [currentYear, setCurrentYear] = useState(2026);
  const [currentMonthIdx, setCurrentMonthIdx] = useState(5); // June
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  // Client Details
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientNotes, setClientNotes] = useState('');
  const [referenceCode, setReferenceCode] = useState('');
  const [validationError, setValidationError] = useState('');

  // Confirmed booking state
  const [activeBookings, setActiveBookings] = useState<Booking[]>([]);
  const [lastConfirmedBooking, setLastConfirmedBooking] = useState<Booking | null>(null);

  // Simulated booked coordinates (day + slot) to show amazing realistic state
  // e.g. "2026-06-18-09:00": true
  const [simulatedBookedSlots, setSimulatedBookedSlots] = useState<Record<string, boolean>>({
    '2026-06-16-09:00': true,
    '2026-06-16-14:00': true,
    '2026-06-17-11:30': true,
    '2026-06-17-19:00': true,
    '2026-06-18-14:00': true,
    '2026-06-19-09:00': true,
    '2026-06-20-11:30': true,
    '2026-07-02-14:00': true,
    '2026-07-04-16:30': true,
  });

  // Load bookings from LocalStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('svetart_luxury_bookings');
      if (stored) {
        const bookingsParsed = JSON.parse(stored) as Booking[];
        setActiveBookings(bookingsParsed);
      }
    } catch (e) {
      console.error("Failed to parse stored bookings:", e);
    }
  }, []);

  // Preselect service when prop is passed or changes
  useEffect(() => {
    if (preselectedServiceId) {
      const match = SERVICES_DATA.find(s => s.id === preselectedServiceId);
      if (match) {
        setSelectedService(match);
        // Automatically advance to Step 2 if user selected from outside services card
        setStep(2);
      }
    } else if (!selectedService) {
      // Default to standard structured gel manicure if none
      setSelectedService(SERVICES_DATA[0]);
    }
  }, [preselectedServiceId]);

  // Standard Available Time Slots
  const TIME_SLOTS = ['09:00', '11:30', '14:00', '16:30', '19:00'];

  // Calendar Math
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonthOffset = (year: number, month: number) => {
    const day = new Date(year, month, 1).getDay();
    // Adjust so week starts on Monday (0 = Mon, 6 = Sun)
    return day === 0 ? 6 : day - 1;
  };

  const handlePrevMonth = () => {
    if (currentMonthIdx === 5 && currentYear === 2026) return; // limit back to June 2026
    if (currentMonthIdx === 0) {
      setCurrentMonthIdx(11);
      setCurrentYear((prev: number) => prev - 1);
    } else {
      setCurrentMonthIdx((prev: number) => prev - 1);
    }
    setSelectedDate(null);
    setSelectedTime(null);
  };

  const handleNextMonth = () => {
    if (currentMonthIdx === 11) {
      setCurrentMonthIdx(0);
      setCurrentYear((prev: number) => prev + 1);
    } else {
      setCurrentMonthIdx((prev: number) => prev + 1);
    }
    setSelectedDate(null);
    setSelectedTime(null);
  };

  const selectDateHandler = (day: number) => {
    const d = new Date(currentYear, currentMonthIdx, day);
    
    // Check if back in past (June 16, 2026 limit)
    const todayLimit = new Date(2026, 5, 16);
    if (d < todayLimit && d.toDateString() !== todayLimit.toDateString()) {
      setValidationError(dict.warningPast);
      setTimeout(() => setValidationError(''), 3000);
      return;
    }

    setSelectedDate(d);
    setSelectedTime(null);
    setValidationError('');
  };

  const selectTimeHandler = (time: string, isSlotBooked: boolean) => {
    if (isSlotBooked) return;
    setSelectedTime(time);
    setValidationError('');
  };

  // Check if date represents today
  const isToday = (day: number) => {
    const d = new Date(currentYear, currentMonthIdx, day);
    return d.toDateString() === new Date(2026, 5, 16).toDateString(); // fixed modern metadata base date
  };

  // Convert Date Object to "YYYY-MM-DD"
  const getDateString = (date: Date) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  };

  const getSlotId = (date: Date, time: string) => {
    return `${getDateString(date)}-${time}`;
  };

  // Step Navigations
  const handleNextStep = () => {
    if (step === 1 && !selectedService) {
      return;
    }
    if (step === 2) {
      if (!selectedDate || !selectedTime) {
        setValidationError(dict.chooseTime);
        return;
      }
    }
    setStep(prev => prev + 1);
    setValidationError('');
  };

  const handlePrevStep = () => {
    setStep(prev => prev - 1);
    setValidationError('');
  };

  // Submit Booking

  const handleCancelBooking = (id: string) => {
    const updated = activeBookings.filter(b => b.id !== id);
    setActiveBookings(updated);
    localStorage.setItem('svetart_luxury_bookings', JSON.stringify(updated));
    if (lastConfirmedBooking?.id === id) {
      setLastConfirmedBooking(null);
    }
  };

  // Generate Google Calendar Link
  const getGoogleCalendarLink = (b: Booking) => {
    const dStr = b.dateString.replace(/-/g, '');
    const [hrs, mins] = b.timeSlot.split(':');
    const hrsNum = parseInt(hrs, 10);
    const durationMins = parseInt(b.duration, 10);
    
    // Start date/time ISO format (UTC or simple local assumption for client)
    const startDate = new Date(b.dateString);
    startDate.setHours(hrsNum, parseInt(mins, 10), 0);
    
    const endDate = new Date(startDate.getTime() + durationMins * 60000);
    
    const formatTimeGoogle = (date: Date) => {
      return date.toISOString().replace(/-|:|\.\d\d\d/g, '');
    };
    
    const startStr = formatTimeGoogle(startDate);
    const endStr = formatTimeGoogle(endDate);
    
    const title = encodeURIComponent(`SvetArt Studio: ${b.serviceName}`);
    const details = encodeURIComponent(`Luxury customized styling session with Svetlana Motoc.\n\nBooking Ref: ${b.referenceCode}\nPersonal details: ${b.clientName} (${b.clientPhone})\nSpecial requests: ${b.clientNotes || 'None'}`);
    const location = encodeURIComponent("Strada Alexandru Anestiade 3, Chișinău, Moldova");
    
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startStr}/${endStr}&details=${details}&location=${location}`;
  };

  // WhatsApp sharing removed

  // Calendar calculations
  const daysInMonth = getDaysInMonth(currentYear, currentMonthIdx);
  const firstDayOffset = getFirstDayOfMonthOffset(currentYear, currentMonthIdx);
  const calendarGridCells = Array.from({ length: 42 }, (_, index) => {
    const dayNumber = index - firstDayOffset + 1;
    const isValidDay = dayNumber > 0 && dayNumber <= daysInMonth;
    return isValidDay ? dayNumber : null;
  });

  return (
    <div id="booking" className="w-full bg-white rounded-[36.5px] p-6 md:p-8 shadow-2xl border border-[#D9A7A7]/15">
      <div className="flex items-center justify-between mb-6 border-b border-[#D9A7A7]/10 pb-4">
        <div>
          <h3 className="font-serif text-2xl md:text-3xl font-bold tracking-tight text-[#2C2523] flex items-center gap-2">
            <Calendar className="w-6 h-6 text-[#B67C7C]" />
            {dict.title}
          </h3>
          <p className="text-xs text-stone-500 font-light mt-1 max-w-md">
            {dict.subtitle}
          </p>
        </div>
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 bg-[#F8E6DF] rounded-full border border-[#D9A7A7]/15 text-[10px] uppercase font-black text-[#B67C7C]" id="calendar-booking-badge">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Step {step} of 4</span>
        </div>
      </div>

      {/* Progress Line */}
      <div className="w-full bg-[#FAF6F4] h-1.5 rounded-full mb-8 overflow-hidden flex">
        <div 
          className="bg-gradient-to-r from-[#F8E6DF] via-[#D9A7A7] to-[#B67C7C] h-full transition-all duration-500" 
          style={{ width: `${(step / 4) * 100}%` }}
        />
      </div>

      {/* Error Notices */}
      <AnimatePresence>
        {validationError && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-3 bg-rose-50 text-rose-700 text-xs rounded-xl flex items-center gap-2.5 border border-rose-100 mb-6 font-sans"
          >
            <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
            <span>{validationError}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: ACTIVE STEP VIEWS */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* STEP 1: SELECT SERVICE */}
          {step === 1 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-4 font-sans"
            >
              <h4 className="font-serif text-lg font-bold text-[#2C2523]">{dict.chooseService}</h4>
              <div className="space-y-3">
                {SERVICES_DATA.map((service) => {
                  const isSelected = selectedService?.id === service.id;
                  return (
                    <button
                      key={service.id}
                      onClick={() => setSelectedService(service)}
                      className={`w-full text-left p-4 rounded-3xl border transition-all duration-300 flex items-start justify-between gap-4 cursor-pointer select-none ${
                        isSelected 
                          ? 'bg-[#F2E4DF]/60 border-[#B67C7C] shadow-md ring-1 ring-[#B67C7C]/20' 
                          : 'bg-white border-stone-150 hover:bg-[#FAF6F4] hover:border-[#D9A7A7]/40'
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-serif font-bold text-[#2C2523] text-sm md:text-base">
                            {service.name[lang] || service.name.en}
                          </span>
                          {isSelected && (
                            <span className="p-0.5 bg-[#B67C7C] text-white rounded-full">
                              <Check className="w-3 h-3" />
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-stone-500 font-light leading-relaxed">
                          <strong className="font-semibold text-stone-700">{dict.formulasLabel}:</strong> {service.materials[lang] || service.materials.en}
                        </p>
                        {/* Duration intentionally hidden from service listings */}
                      </div>
                      {/* price intentionally hidden in UI */}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* STEP 2: SELECT DATE & TIME */}
          {step === 2 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6 font-sans"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                
                {/* Custom Calendar Card Grid */}
                <div>
                  <h4 className="font-serif text-lg font-bold text-[#2C2523]">{dict.chooseDate}</h4>
                  <div className="bg-[#FAF6F4] rounded-3xl p-4 border border-[#D9A7A7]/10" id="interactive-schedule-calendar">
                    
                    {/* Header: Months Slider */}
                    <div className="flex items-center justify-between mb-4 px-1">
                      <button 
                        onClick={handlePrevMonth}
                        disabled={currentMonthIdx === 5 && currentYear === 2026}
                        className={`p-1.5 rounded-full bg-white border border-stone-150 transition-colors ${
                          currentMonthIdx === 5 && currentYear === 2026 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-slate-50 cursor-pointer'
                        }`}
                      >
                        <ArrowLeft className="w-4 h-4 text-stone-600" />
                      </button>
                      <span className="font-serif font-bold text-sm text-[#2C2523] select-none uppercase tracking-wider">
                        {MONTHS[lang] ? MONTHS[lang][currentMonthIdx] : MONTHS.en[currentMonthIdx]} {currentYear}
                      </span>
                      <button 
                        onClick={handleNextMonth}
                        className="p-1.5 rounded-full bg-white border border-stone-150 hover:bg-slate-50 transition-colors cursor-pointer"
                      >
                        <ArrowRight className="w-4 h-4 text-stone-600" />
                      </button>
                    </div>

                    {/* Weekdays Labels */}
                    <div className="grid grid-cols-7 gap-1 text-center text-[10px] text-stone-400 uppercase font-black tracking-widest mb-2 select-none">
                      {(WEEKDAYS_SHORT[lang] || WEEKDAYS_SHORT.en).map(day => (
                        <div key={day} className="py-1">{day}</div>
                      ))}
                    </div>

                    {/* Days Cells Grid */}
                    <div className="grid grid-cols-7 gap-1" id="calendar-days-panel">
                      {calendarGridCells.map((day, idx) => {
                        if (!day) return <div key={`empty-${idx}`} className="aspect-square" />;
                        
                        const isChosen = selectedDate?.getDate() === day && selectedDate?.getMonth() === currentMonthIdx && selectedDate?.getFullYear() === currentYear;
                        const isSunday = (idx + 1) % 7 === 0;

                        // Past limitation check helper
                        const cellDate = new Date(currentYear, currentMonthIdx, day);
                        const todayLimit = new Date(2026, 5, 16);
                        const isPast = cellDate < todayLimit && cellDate.toDateString() !== todayLimit.toDateString();

                        return (
                          <button
                            key={`day-${day}`}
                            onClick={() => !isPast && selectDateHandler(day)}
                            disabled={isPast}
                            className={`aspect-square w-full rounded-full text-xs font-bold transition-all duration-200 flex flex-col items-center justify-center relative select-none ${
                              isPast 
                                ? 'text-stone-300 line-through opacity-45 cursor-not-allowed' 
                                : isChosen
                                ? 'bg-[#B67C7C] text-white shadow-md font-extrabold hover:scale-105'
                                : isToday(day)
                                ? 'border border-[#B67C7C] text-[#B67C7C] hover:bg-[#F2E4DF] cursor-pointer font-extrabold'
                                : isSunday
                                ? 'text-amber-750 hover:bg-[#F8E6DF]/50 cursor-pointer'
                                : 'text-[#2C2523] hover:bg-stone-200/55 cursor-pointer'
                            }`}
                          >
                            <span>{day}</span>
                            {/* Accent indicator underneath for chosen or sunday */}
                            {isToday(day) && !isChosen && <span className="absolute bottom-1 w-1 h-1 bg-[#B67C7C] rounded-full" />}
                            {isSunday && !isPast && !isChosen && <span className="absolute top-1 right-1 text-[7px] text-amber-600 font-black">VIP</span>}
                          </button>
                        );
                      })}
                    </div>

                  </div>
                  {/* Sunday Premium Notification */}
                  {selectedDate?.getDay() === 0 && (
                    <p className="text-[10px] text-amber-700 italic select-none">
                      {dict.sundayNotice}
                    </p>
                  )}
                </div>

                {/* Right inside Step 2: Time Slots Slider */}
                <div className="space-y-3">
                  <h4 className="font-serif text-lg font-bold text-[#2C2523]">{dict.chooseTime}</h4>
                  {selectedDate ? (
                    <div className="space-y-2.5">
                      <p className="text-xs text-stone-400 capitalize pl-1">
                        Slots for <strong className="text-stone-700">{selectedDate.toLocaleDateString(lang === 'ro' ? 'ro-RO' : lang === 'ru' ? 'ru-RU' : 'en-US', { weekday: 'long', month: 'short', day: 'numeric' })}</strong>
                      </p>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2" id="timeslots-grid">
                        {TIME_SLOTS.map((time) => {
                          const slotId = getSlotId(selectedDate, time);
                          const isBooked = simulatedBookedSlots[slotId];
                          const isSelectedTime = selectedTime === time;
                          
                          return (
                            <button
                              key={time}
                              disabled={isBooked}
                              onClick={() => selectTimeHandler(time, isBooked || false)}
                              className={`py-3.5 px-4 rounded-2xl border text-xs font-bold flex items-center justify-between text-left transition-all duration-200 select-none ${
                                isBooked
                                  ? 'bg-[#FAF6F4] text-stone-300 border-stone-150 line-through cursor-not-allowed opacity-60'
                                  : isSelectedTime
                                  ? 'bg-[#B67C7C] text-white border-[#B67C7C] shadow-md'
                                  : 'bg-white text-[#2C2523] border-[#D9A7A7]/20 hover:border-[#B67C7C] hover:bg-[#FAF6F4] cursor-pointer'
                              }`}
                            >
                              <span className="flex items-center gap-2">
                                <Clock className="w-3.5 h-3.5 opacity-70" />
                                {time}
                              </span>
                              <span className={`text-[9px] uppercase tracking-widest font-black px-1.5 py-0.5 rounded ${
                                isBooked 
                                  ? 'bg-stone-100 text-stone-400' 
                                  : isSelectedTime
                                  ? 'bg-white/20 text-white'
                                  : 'text-[#B67C7C]'
                              }`}>
                                {isBooked ? dict.bookedSlot : 'Open'}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ) : (
                    <div className="h-44 border border-dashed border-[#D9A7A7]/25 rounded-3xl flex items-center justify-center p-6 text-center select-none bg-[#FAF6F4]">
                      <p className="text-xs text-stone-400 font-light font-sans max-w-xs leading-relaxed">
                        👈 Please tap on an active calendar date to open Chisinau studio slot availability.
                      </p>
                    </div>
                  )}
                </div>

              </div>
            </motion.div>
          )}

          {/* STEP 3: CLIENT INFO FORM */}
          {step === 3 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-4 font-sans"
            >
              <h4 className="font-serif text-lg font-bold text-[#2C2523]">{dict.step3}</h4>
              <form
                action="https://formsubmit.co/motoc05andreea%40gmail.com"
                method="POST"
                target="_blank"
                rel="noopener noreferrer"
                className="space-y-4 font-sans text-left"
              >
                <input type="hidden" name="service" value={selectedService?.name[lang] || selectedService?.name.en || ''} />
                <input type="hidden" name="serviceId" value={selectedService?.id || ''} />
                <input type="hidden" name="duration" value={selectedService?.duration || ''} />
                <input type="hidden" name="date" value={selectedDate ? getDateString(selectedDate) : ''} />
                <input type="hidden" name="time" value={selectedTime || ''} />
                <input type="hidden" name="reference" value={referenceCode} />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5 column-wrap">
                    <label className="text-xs uppercase tracking-wider text-stone-400 font-bold block">
                      {dict.clientName} *
                    </label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#D9A7A7]" />
                      <input
                        type="text"
                        name="name"
                        required
                        placeholder="e.g. Maria Popescu"
                        className="w-full text-xs pl-11 pr-4 py-3.5 rounded-2xl border border-[#D9A7A7]/20 bg-white focus:outline-none focus:ring-2 focus:ring-[#B67C7C]/30 text-[#2C2523] font-semibold"
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5 column-wrap">
                    <label className="text-xs uppercase tracking-wider text-stone-400 font-bold block">
                      {dict.clientPhone} *
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#D9A7A7]" />
                      <input
                        type="tel"
                        name="phone"
                        required
                        placeholder="e.g. +373 79 123 456"
                        className="w-full text-xs pl-11 pr-4 py-3.5 rounded-2xl border border-[#D9A7A7]/20 bg-white focus:outline-none focus:ring-2 focus:ring-[#B67C7C]/30 text-[#2C2523] font-semibold"
                        value={clientPhone}
                        onChange={(e) => setClientPhone(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5 w-full">
                  <label className="text-xs uppercase tracking-wider text-stone-400 font-bold block">
                    {dict.clientEmail} *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#D9A7A7]" />
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="e.g. maria.popescu@gmail.com"
                      className="w-full text-xs pl-11 pr-4 py-3.5 rounded-2xl border border-[#D9A7A7]/20 bg-white focus:outline-none focus:ring-2 focus:ring-[#B67C7C]/30 text-[#2C2523] font-semibold"
                      value={clientEmail}
                      onChange={(e) => setClientEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-1.5 w-full">
                  <label className="text-xs uppercase tracking-wider text-stone-400 font-bold block">
                    {dict.clientNotes}
                  </label>
                  <textarea
                    rows={3}
                    placeholder="e.g. Please check if we can add some minimal gold wire sparkles or a clean matte top-coat."
                    className="w-full text-xs p-4 rounded-2xl border border-[#D9A7A7]/20 bg-white focus:outline-none focus:ring-2 focus:ring-[#B67C7C]/30 text-[#2C2523] font-medium"
                    value={clientNotes}
                    onChange={(e) => setClientNotes(e.target.value)}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-[#B67C7C] hover:bg-[#2C2523] text-white rounded-full text-xs font-black uppercase tracking-widest transition-colors duration-300 shadow-md flex items-center justify-center gap-2 cursor-pointer mt-2"
                >
                  <span>{dict.confirmBtn}</span>
                  <CheckCircle2 className="w-4 h-4 fill-white/10" />
                </button>

              </form>
            </motion.div>
          )}

          {/* STEP 4: SUCCESS / CONFIRMED BOOKING */}
          {step === 4 && lastConfirmedBooking && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-6 text-center select-none font-sans"
            >
              <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-100 shadow-inner">
                <CheckCircle2 className="w-10 h-10 stroke-[2.5px]" />
              </div>

              <div className="space-y-2">
                <h4 className="font-serif text-3xl font-bold text-[#2C2523]">{dict.successHeading}</h4>
                <p className="text-xs text-stone-500 font-light leading-relaxed max-w-lg mx-auto">
                  {dict.successMsg}
                </p>
              </div>

              {/* Reference Card with details */}
              <div className="max-w-md mx-auto p-6 bg-[#FAF6F4] rounded-[32px] border border-[#D9A7A7]/20 text-left space-y-4 shadow-sm font-sans" id="congrats-booking-card">
                <div className="flex justify-between items-center border-b border-stone-200/50 pb-3">
                  <div>
                    <span className="text-[9px] uppercase tracking-wider text-stone-400 font-bold block">{dict.refCode}</span>
                    <strong className="text-stone-850 font-mono text-sm uppercase tracking-wider">{lastConfirmedBooking.referenceCode}</strong>
                  </div>
                  <span className="text-[10px] uppercase font-bold text-white bg-emerald-600 px-2.5 py-1 rounded-full shrink-0">
                    Active
                  </span>
                </div>

                <div className="space-y-3 text-xs text-[#2C2523]" id="successful-booking-rows">
                  <div className="row-wrapper">
                    <span className="text-stone-400 block tracking-wide font-medium text-[10px] uppercase mb-0.5">{dict.serviceTitle}</span>
                    <strong className="font-serif italic font-semibold text-sm">"{lastConfirmedBooking.serviceName}"</strong>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-stone-400 block tracking-wide font-medium text-[10px] uppercase mb-0.5">{dict.dateTimeTitle}</span>
                      <strong className="font-bold">
                        {new Date(lastConfirmedBooking.dateString).toLocaleDateString(lang === 'ro' ? 'ro-RO' : lang === 'ru' ? 'ru-RU' : 'en-US', { day: 'numeric', month: 'short', year: 'numeric' })} <br />
                        @{lastConfirmedBooking.timeSlot}
                      </strong>
                    </div>
                    <div>
                      <span className="text-stone-400 block tracking-wide font-medium text-[10px] uppercase mb-0.5">{dict.priceEst}</span>
                      <strong className="font-serif italic font-black text-[#B67C7C] text-sm">—</strong>
                    </div>
                  </div>

                  {lastConfirmedBooking.clientNotes && (
                    <div className="bg-white/60 p-3 rounded-xl border border-stone-200/40">
                      <span className="text-stone-400 block tracking-wide font-medium text-[9px] uppercase mb-1">{dict.notesTitle}</span>
                      <p className="text-stone-650 italic font-medium leading-relaxed font-sans">{lastConfirmedBooking.clientNotes}</p>
                    </div>
                  )}
                </div>

                {/* Integration Action Buttons: WhatsApp sharing removed; keep calendar link */}
                <div className="space-y-2 pt-2">
                  <a
                    href={getGoogleCalendarLink(lastConfirmedBooking)}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-3 bg-white hover:bg-stone-50 text-stone-700 border border-stone-200/80 font-bold rounded-2xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-300 shadow-inner cursor-pointer"
                  >
                    <Calendar className="w-3.5 h-3.5 text-[#B67C7C]" />
                    <span>{dict.addCalendar}</span>
                  </a>
                </div>
              </div>

              {/* Start New button */}
              <button
                onClick={() => {
                  setStep(1);
                  setSelectedDate(null);
                  setSelectedTime(null);
                  setClientNotes('');
                }}
                className="text-xs text-[#B67C7C] font-bold underline hover:text-[#2C2523] uppercase tracking-wider cursor-pointer font-sans"
              >
                {dict.backToServices}
              </button>
            </motion.div>
          )}

        </div>

        {/* RIGHT COLUMN: BOOKING SUMMARY CORNER */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Real-time Order Summary list */}
          <div className="bg-[#FAF6F4] rounded-[32px] p-6 border border-[#D9A7A7]/15 text-left space-y-4 select-none font-sans" id="booking-sidebar-invoice">
            <span className="text-[10px] uppercase tracking-widest text-[#B67C7C] font-black block">
              Reservation Summary
            </span>
            
            <div className="space-y-4">
              
              {/* Service selected summary */}
              <div className="border-b border-[#D9A7A7]/10 pb-3">
                <span className="text-[10px] text-stone-400 font-bold uppercase block mb-1">Elite Procedure</span>
                {selectedService ? (
                  <div>
                    <h5 className="font-serif italic font-bold text-[#2C2523] text-sm leading-tight">
                      {selectedService.name[lang] || selectedService.name.en}
                    </h5>
                    <p className="text-[10px] text-stone-500 font-light mt-0.5">
                      {selectedService.materials[lang] || selectedService.materials.en}
                    </p>
                  </div>
                ) : (
                  <p className="text-xs text-stone-400 italic">None selected</p>
                )}
              </div>

              {/* Date & Time selection summary */}
              <div className="border-b border-[#D9A7A7]/10 pb-3">
                <span className="text-[10px] text-stone-400 font-bold uppercase block mb-1">Requested Timing</span>
                {selectedDate && selectedTime ? (
                  <div className="flex items-center gap-2.5">
                    <Calendar className="w-4 h-4 text-[#B67C7C]" />
                    <div>
                      <strong className="text-xs text-[#2C2523] block leading-tight font-bold">
                        {selectedDate.toLocaleDateString(lang === 'ro' ? 'ro-RO' : lang === 'ru' ? 'ru-RU' : 'en-US', { day: 'numeric', month: 'long', year: 'numeric' })}
                      </strong>
                      <span className="text-[10px] text-stone-500 font-medium">At {selectedTime} (EEST)</span>
                    </div>
                  </div>
                ) : (
                  <p className="text-xs text-stone-400 italic">None selected</p>
                )}
              </div>

              {/* Cumulative Subtotal Estimate */}
              <div className="flex items-center justify-between pt-1">
                <span className="text-xs text-[#2C2523] font-bold">Total Estimate</span>
                <span className="font-serif text-2xl font-black text-[#B67C7C]" id="booking-amount-total">
                  —
                </span>
              </div>

            </div>

            {/* Stepper Buttons Panel block */}
            {step < 3 && (
              <div className="flex items-center gap-3 pt-3 border-t border-[#D9A7A7]/20-off" id="booking-stepper-control-buttons">
                {step > 1 && (
                  <button
                    onClick={handlePrevStep}
                    className="flex-1 py-3 border border-stone-200 rounded-full text-xs font-bold text-stone-600 hover:bg-white select-none transition-colors cursor-pointer text-center uppercase tracking-wider"
                  >
                    {dict.prev}
                  </button>
                )}
                <button
                  onClick={handleNextStep}
                  disabled={step === 1 && !selectedService || step === 2 && (!selectedDate || !selectedTime)}
                  className={`flex-1 py-3.5 bg-[#2C2523] text-white rounded-full text-xs font-black uppercase tracking-wider select-none transition-all duration-300 text-center ${
                    (step === 1 && !selectedService || step === 2 && (!selectedDate || !selectedTime))
                      ? 'opacity-40 cursor-not-allowed bg-stone-300 text-stone-400'
                      : 'hover:bg-[#B67C7C] cursor-pointer shadow hover:shadow-md'
                  }`}
                >
                  {dict.next}
                </button>
              </div>
            )}

          </div>

          {/* ACTIVE BOOKINGS LOG LIST PERSISTED */}
          {activeBookings.length > 0 && (
            <div className="bg-[#FAF6F4] rounded-[32px] p-6 border border-[#23c252]/10 text-left space-y-4 font-sans select-none" id="customer-active-bookings-log">
              <span className="text-[10px] uppercase tracking-widest text-emerald-600 font-black block flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                {dict.myBookings} ({activeBookings.length})
              </span>
              
              <div className="space-y-3 max-h-52 overflow-y-auto pr-1">
                {activeBookings.map((b) => (
                  <div key={b.id} className="p-3 bg-white rounded-2xl border border-stone-150 relative space-y-1 group">
                    <button
                      onClick={() => handleCancelBooking(b.id)}
                      className="absolute top-2.5 right-2.5 p-1 text-stone-400 hover:text-rose-500 rounded-lg hover:bg-rose-50 transition-colors cursor-pointer"
                      title={dict.cancelBooking}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                    <h6 className="font-serif font-bold text-[#2C2523] text-xs max-w-[85%] truncate">
                      {b.serviceName}
                    </h6>
                    <p className="text-[10px] text-stone-500 leading-none">
                      {new Date(b.dateString).toLocaleDateString(lang === 'ro' ? 'ro-RO' : lang === 'ru' ? 'ru-RU' : 'en-US', { day: 'numeric', month: 'short' })} • {b.timeSlot}
                    </p>
                    <div className="flex items-center justify-between text-[9px] pt-1 border-t border-stone-100 mt-1">
                      <span className="text-stone-400 font-mono text-[9px]">{b.referenceCode}</span>
                      <span className="font-serif italic font-black text-[#B67C7C]">—</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
