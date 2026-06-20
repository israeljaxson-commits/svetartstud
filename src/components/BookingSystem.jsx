import { useState, useEffect } from 'react';
import { BOOKING_SERVICE_OPTIONS, SALON_SERVICES } from '../data/services';
import { useLanguage } from '../context/LanguageContext';

const MONTH_NAMES = {
  en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  ro: ['Ianuarie', 'Februarie', 'Martie', 'Aprilie', 'Mai', 'Iunie', 'Iulie', 'August', 'Septembrie', 'Octombrie', 'Noiembrie', 'Decembrie'],
  ru: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
};

const getDaysInMonth = (year, month) => new Date(year, month, 0).getDate();

const TIME_SLOTS = (() => {
  const startMinutes = 8 * 60;
  const endMinutes = 23 * 60;
  const stepMinutes = 90;
  const slots = [];

  for (let minutes = startMinutes; minutes <= endMinutes; minutes += stepMinutes) {
    const hours = String(Math.floor(minutes / 60)).padStart(2, '0');
    const mins = String(minutes % 60).padStart(2, '0');
    slots.push(`${hours}:${mins}`);
  }

  return slots;
})();

const bookingHeaderT = {
  en: {
    badge: 'Exclusive studio appointments',
    eyebrow: 'Reserve your appointment',
    title: 'Book Your Session',
    subtitle: 'Select your service, enter your details and preferred date and time. The owner receives an email immediately when you submit.',
  },
  ro: {
    badge: 'Programări exclusive în studio',
    eyebrow: 'Rezervă-ți programarea',
    title: 'Programează-ți Vizita',
    subtitle: 'Selectează serviciul, completează datele tale și alege data și ora preferată. Proprietara primește imediat un email după trimitere.',
  },
  ru: {
    badge: 'Эксклюзивные записи в студии',
    eyebrow: 'Забронируйте визит',
    title: 'Запишитесь на Сеанс',
    subtitle: 'Выберите услугу, заполните свои данные и укажите удобные дату и время. После отправки владелица сразу получает письмо.',
  },
};

const bookingFormT = {
  en: {
    service: 'Service',
    selectService: 'Select a service',
    fullName: 'Full name',
    yourName: 'Your name',
    emailAddress: 'Email address',
    phoneNumber: 'Phone number',
    preferredDate: 'Preferred date',
    preferredTime: 'Preferred time',
    specialRequest: 'Special request',
    optional: '(optional)',
    specialRequestPlaceholder: 'Any special requests or preferences',
    selectDateFirst: 'Select a date first',
    selectTime: 'Select a time',
    booked: 'Booked',
    timeUnavailableError: 'This time slot is no longer available. Please choose another time.',
    genericSubmitError: 'Unable to reserve this slot right now. Please try again.',
    submitButton: 'Send Booking Request',
  },
  ro: {
    service: 'Serviciu',
    selectService: 'Selectează un serviciu',
    fullName: 'Nume complet',
    yourName: 'Numele tău',
    emailAddress: 'Adresă de email',
    phoneNumber: 'Număr de telefon',
    preferredDate: 'Data preferată',
    preferredTime: 'Ora preferată',
    specialRequest: 'Solicitare specială',
    optional: '(opțional)',
    specialRequestPlaceholder: 'Orice solicitări speciale sau preferințe',
    selectDateFirst: 'Selectează mai întâi data',
    selectTime: 'Selectează ora',
    booked: 'Ocupat',
    timeUnavailableError: 'Acest interval orar nu mai este disponibil. Te rugăm să alegi altă oră.',
    genericSubmitError: 'Nu am putut rezerva acest interval acum. Te rugăm să încerci din nou.',
    submitButton: 'Trimite Cererea de Rezervare',
  },
  ru: {
    service: 'Услуга',
    selectService: 'Выберите услугу',
    fullName: 'Полное имя',
    yourName: 'Ваше имя',
    emailAddress: 'Электронная почта',
    phoneNumber: 'Номер телефона',
    preferredDate: 'Предпочтительная дата',
    preferredTime: 'Предпочтительное время',
    specialRequest: 'Особый запрос',
    optional: '(необязательно)',
    specialRequestPlaceholder: 'Любые особые запросы или предпочтения',
    selectDateFirst: 'Сначала выберите дату',
    selectTime: 'Выберите время',
    booked: 'Занято',
    timeUnavailableError: 'Это время уже недоступно. Пожалуйста, выберите другое.',
    genericSubmitError: 'Сейчас не удалось забронировать это время. Пожалуйста, попробуйте снова.',
    submitButton: 'Отправить запрос на бронирование',
  },
};

export default function BookingSystem({ preselectedService = '' }) {
  const { lang } = useLanguage();
  const header = bookingHeaderT[lang] || bookingHeaderT.en;
  const formT = bookingFormT[lang] || bookingFormT.en;
  const monthNames = MONTH_NAMES[lang] || MONTH_NAMES.en;
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;
  const currentDay = currentDate.getDate();
  const serviceOptions = SALON_SERVICES.map((service) => ({
    value: service.bookingName,
    label: service[lang]?.name || service.en.name,
  }));
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState('');
  const [date, setDate] = useState('');
  const [selectedDay, setSelectedDay] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [time, setTime] = useState('');
  const [specialRequest, setSpecialRequest] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [clockTick, setClockTick] = useState(Date.now());
  const [nextUrl, setNextUrl] = useState('');
  const [minDate, setMinDate] = useState('');

  const defaultNextUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/thank-you.html?lang=${encodeURIComponent(lang)}`
    : '/thank-you.html';

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const now = new Date();
      const isoDate = now.toISOString().split('T')[0];
      setNextUrl(defaultNextUrl);
      setMinDate(isoDate);
    }
  }, [defaultNextUrl]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setClockTick(Date.now());
    }, 30000);

    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!selectedDay || !selectedMonth) {
      setDate('');
      return;
    }

    const dayNumber = Number(selectedDay);
    const monthNumber = Number(selectedMonth);
    const yearNumber = currentYear;
    const nextDate = new Date(yearNumber, monthNumber - 1, dayNumber);
    const isSameDate =
      nextDate.getFullYear() === yearNumber &&
      nextDate.getMonth() === monthNumber - 1 &&
      nextDate.getDate() === dayNumber;

    if (!isSameDate) {
      setDate('');
      return;
    }

    const isoDate = `${yearNumber}-${String(monthNumber).padStart(2, '0')}-${String(dayNumber).padStart(2, '0')}`;
    const chosenDate = new Date(`${isoDate}T00:00:00`);
    const today = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());

    if (chosenDate < today) {
      setDate('');
      return;
    }

    setDate(isoDate);
  }, [selectedDay, selectedMonth, currentYear, currentDate]);

  useEffect(() => {
    if (preselectedService && BOOKING_SERVICE_OPTIONS.includes(preselectedService)) {
      setService(preselectedService);
    }
  }, [preselectedService]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('booking') === 'success') {
        setSubmitted(true);
        params.delete('booking');
        const newSearch = params.toString();
        const newUrl = `${window.location.pathname}${newSearch ? `?${newSearch}` : ''}`;
        window.history.replaceState({}, document.title, newUrl);
      }
    }
  }, []);

  useEffect(() => {
    if (!submitted) return;
    const timer = window.setTimeout(() => setSubmitted(false), 8000);
    return () => window.clearTimeout(timer);
  }, [submitted]);

  const isTimeSlotUnavailable = (slot) => {
    if (!date) return false;
    const now = new Date(clockTick);
    const liveDate = now.toISOString().split('T')[0];
    const liveTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    if (date === liveDate && slot < liveTime) return true;
    return false;
  };

  const daysInSelectedMonth = selectedMonth
    ? getDaysInMonth(currentYear, Number(selectedMonth))
    : 31;

  const monthOptions = Array.from({ length: 12 }, (_, index) => ({
    value: String(index + 1),
    label: monthNames[index],
    disabled: index + 1 < currentMonth,
  }));

  const dayOptions = Array.from({ length: daysInSelectedMonth }, (_, index) => {
    const dayNumber = index + 1;
    const selectedMonthNumber = Number(selectedMonth || currentMonth);
    const isPastDay =
      selectedMonthNumber === currentMonth &&
      dayNumber < currentDay;

    return {
      value: String(dayNumber),
      label: String(dayNumber),
      disabled: isPastDay,
    };
  });

  const handleSubmit = (e) => {
    if (!date || !time) {
      e.preventDefault();
      return;
    }

    if (isTimeSlotUnavailable(time)) {
      e.preventDefault();
      setSubmitError(formT.timeUnavailableError);
      return;
    }

    setSubmitError('');
    setIsSubmitting(true);
    // Allow the native form to submit directly to formsubmit.co
  };

  return (
    <section id="booking" className="py-28 bg-[#F8F0EE]">
      <div className="max-w-3xl mx-auto px-6 md:px-12">
        <div className="mb-14 text-center relative">
          <div className="absolute inset-x-0 -top-4 flex justify-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#E8D2C7] bg-[#F9F4F1]/80 px-4 py-2 text-[10px] uppercase tracking-[0.35em] text-[#8C6D66] font-semibold shadow-sm backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-[#B67C7C] shadow-[0_0_10px_rgba(182,124,124,0.35)]"></span>
              {header.badge}
            </span>
          </div>
          <div className="relative pt-8">
            <p className="text-sm uppercase tracking-[0.35em] text-[#8C6D66] font-semibold">{header.eyebrow}</p>
            <h2 className="mt-4 text-4xl md:text-5xl font-serif font-bold text-[#2C2523]">{header.title}</h2>
            <div className="mx-auto mt-5 h-1.5 w-24 rounded-full bg-gradient-to-r from-[#B67C7C] via-[#E7D3C1] to-[#D8A3A3] shadow-soft" />
            <p className="mt-6 text-base text-stone-600 max-w-2xl mx-auto">{header.subtitle}</p>
          </div>
        </div>

        {submitted && (
          <div className="mb-6 rounded-[30px] border border-emerald-200 bg-emerald-50 px-6 py-4 text-sm text-emerald-800 shadow-sm">
            Your booking request was sent successfully. Thank you!
          </div>
        )}

        {submitError && (
          <div className="mb-6 rounded-[30px] border border-rose-200 bg-rose-50 px-6 py-4 text-sm text-rose-700 shadow-sm">
            {submitError}
          </div>
        )}

        <form
          action="https://formsubmit.co/learsiando%40gmail.com"
          method="POST"
          onSubmit={handleSubmit}
          className="grid gap-6 bg-gradient-to-br from-[#FFFBF7] via-[#FEF3EB] to-[#F7E6DC] p-10 rounded-[48px] shadow-[0_30px_60px_rgba(148,94,77,0.14)] border border-[#E9D4C8]"
        >
          <input type="hidden" name="_subject" value="New booking request from SvetArt" />
          <input type="hidden" name="_captcha" value="false" />
          <input type="hidden" name="_next" value={nextUrl || defaultNextUrl} />
          <label className="block rounded-[32px] border border-[#E9D2C6] bg-[#FFF8F3] p-5 shadow-[0_18px_45px_rgba(148,94,77,0.08)]">
            <span className="text-sm font-semibold text-stone-700">{formT.service}</span>
            <select
              name="service"
              value={service}
              onChange={(e) => setService(e.target.value)}
              required
              className="mt-3 w-full rounded-[28px] border border-[#D8B9A0] bg-[#FBF0E7] px-5 py-4 text-sm text-stone-900 outline-none transition duration-300 focus:border-[#C8A38D] focus:ring-2 focus:ring-[#E8CFC1]/60 appearance-none cursor-pointer"
            >
              <option value="" disabled>{formT.selectService}</option>
              {serviceOptions.map((option) => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </label>

          <label className="block rounded-[32px] border border-[#E9D2C6] bg-[#FFF8F3] p-5 shadow-[0_18px_45px_rgba(148,94,77,0.08)]">
            <span className="text-sm font-semibold text-stone-700">{formT.fullName}</span>
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={formT.yourName}
              required
              className="mt-3 w-full rounded-[28px] border border-[#D8B9A0] bg-[#FBF0E7] px-5 py-4 text-sm text-stone-900 outline-none transition duration-300 focus:border-[#C8A38D] focus:ring-2 focus:ring-[#E8CFC1]/60"
            />
          </label>

          <label className="block rounded-[32px] border border-[#E9D2C6] bg-[#FFF8F3] p-5 shadow-[0_18px_45px_rgba(148,94,77,0.08)]">
            <span className="text-sm font-semibold text-stone-700">{formT.emailAddress}</span>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="mt-3 w-full rounded-[28px] border border-[#D8B9A0] bg-[#FBF0E7] px-5 py-4 text-sm text-stone-900 outline-none transition duration-300 focus:border-[#C8A38D] focus:ring-2 focus:ring-[#E8CFC1]/60"
            />
          </label>

          <label className="block rounded-[32px] border border-[#E9D2C6] bg-[#FFF8F3] p-5 shadow-[0_18px_45px_rgba(148,94,77,0.08)]">
            <span className="text-sm font-semibold text-stone-700">{formT.phoneNumber}</span>
            <input
              type="tel"
              name="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+373 60 000 000"
              required
              className="mt-3 w-full rounded-[28px] border border-[#D8B9A0] bg-[#FBF0E7] px-5 py-4 text-sm text-stone-900 outline-none transition duration-300 focus:border-[#C8A38D] focus:ring-2 focus:ring-[#E8CFC1]/60"
            />
          </label>

          <div className="grid gap-6 md:grid-cols-2">
            <label className="block rounded-[32px] border border-[#E9D2C6] bg-[#FFF8F3] p-5 shadow-[0_18px_45px_rgba(148,94,77,0.08)]">
              <span className="text-sm font-semibold text-stone-700">{formT.preferredDate}</span>
              <input type="hidden" name="date" value={date} />
              <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
                <select
                  value={selectedMonth}
                  onChange={(e) => {
                    setSelectedMonth(e.target.value);
                    setSubmitError('');
                  }}
                  required
                  className="w-full rounded-[28px] border border-[#D8B9A0] bg-[#FBF0E7] px-4 py-4 text-sm text-stone-900 outline-none transition duration-300 focus:border-[#C8A38D] focus:ring-2 focus:ring-[#E8CFC1]/60 appearance-none cursor-pointer disabled:cursor-not-allowed disabled:opacity-65"
                >
                  <option value="" disabled>Month</option>
                  {monthOptions.map((option) => (
                    <option key={option.value} value={option.value} disabled={option.disabled}>
                      {option.label}
                    </option>
                  ))}
                </select>

                <select
                  value={selectedDay}
                  onChange={(e) => {
                    setSelectedDay(e.target.value);
                    setSubmitError('');
                  }}
                  required
                  className="w-full rounded-[28px] border border-[#D8B9A0] bg-[#FBF0E7] px-4 py-4 text-sm text-stone-900 outline-none transition duration-300 focus:border-[#C8A38D] focus:ring-2 focus:ring-[#E8CFC1]/60 appearance-none cursor-pointer disabled:cursor-not-allowed disabled:opacity-65"
                >
                  <option value="" disabled>Day</option>
                  {dayOptions.map((option) => (
                    <option key={option.value} value={option.value} disabled={option.disabled}>
                      {option.label}
                    </option>
                  ))}
                </select>

              </div>
            </label>

            <label className="block rounded-[32px] border border-[#E9D2C6] bg-[#FFF8F3] p-5 shadow-[0_18px_45px_rgba(148,94,77,0.08)]">
              <span className="text-sm font-semibold text-stone-700">{formT.preferredTime}</span>
              <select
                name="time"
                value={time}
                onChange={(e) => {
                  setTime(e.target.value);
                  setSubmitError('');
                }}
                required
                disabled={!date}
                className="mt-3 w-full rounded-[28px] border border-[#D8B9A0] bg-[#FBF0E7] px-5 py-4 text-sm text-stone-900 outline-none transition duration-300 focus:border-[#C8A38D] focus:ring-2 focus:ring-[#E8CFC1]/60 appearance-none cursor-pointer disabled:cursor-not-allowed disabled:opacity-65"
              >
                <option value="" disabled>{date ? formT.selectTime : formT.selectDateFirst}</option>
                {TIME_SLOTS.map((slot) => {
                  const unavailable = isTimeSlotUnavailable(slot);
                  return (
                    <option key={slot} value={slot} disabled={unavailable}>
                      {unavailable ? `${slot} - ${formT.booked}` : slot}
                    </option>
                  );
                })}
              </select>
            </label>
          </div>

          <label className="block rounded-[32px] border border-[#E9D2C6] bg-[#FFF8F3] p-5 shadow-[0_18px_45px_rgba(148,94,77,0.08)]">
            <span className="text-sm font-semibold text-stone-700">{formT.specialRequest} <span className="text-stone-500">{formT.optional}</span></span>
            <textarea
              name="specialRequest"
              value={specialRequest}
              onChange={(e) => setSpecialRequest(e.target.value)}
              placeholder={formT.specialRequestPlaceholder}
              rows={4}
              className="mt-3 w-full rounded-[28px] border border-[#D8B9A0] bg-[#FBF0E7] px-5 py-4 text-sm text-stone-900 outline-none transition duration-300 focus:border-[#C8A38D] focus:ring-2 focus:ring-[#E8CFC1]/60"
            />
          </label>

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-3 inline-flex items-center justify-center rounded-full bg-[#5D2F2A] px-7 py-4 text-sm font-bold uppercase tracking-[0.18em] text-white transition duration-300 hover:bg-[#7b473f] shadow-[0_14px_30px_rgba(93,47,42,0.16)] disabled:cursor-not-allowed disabled:bg-[#b6a2a0]"
          >
            {formT.submitButton}
          </button>
        </form>
      </div>
    </section>
  );
}
