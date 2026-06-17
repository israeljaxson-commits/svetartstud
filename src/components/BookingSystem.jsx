import { useState, useEffect } from 'react';

export default function BookingSystem() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [specialRequest, setSpecialRequest] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [nextUrl, setNextUrl] = useState('');
  const [minDate, setMinDate] = useState('');
  const [minTime, setMinTime] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const now = new Date();
      const isoDate = now.toISOString().split('T')[0];
      const isoTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
      setNextUrl(`${window.location.origin}${window.location.pathname}?booking=success`);
      setMinDate(isoDate);
      setMinTime(isoTime);
    }
  }, []);

  const effectiveMinTime = date === minDate ? minTime : '00:00';

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

  return (
    <section id="booking" className="py-28 bg-[#F8F0EE]">
      <div className="max-w-3xl mx-auto px-6 md:px-12">
        <div className="mb-14 text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-[#8C6D66] font-semibold">Reserve your appointment</p>
          <h2 className="mt-4 text-4xl md:text-5xl font-serif font-bold text-[#2C2523]">Book Your Session</h2>
          <p className="mt-4 text-base text-stone-600">Enter your name, phone, preferred date and time. The owner receives an email immediately when you submit.</p>
        </div>

        {submitted && (
          <div className="mb-6 rounded-[30px] border border-emerald-200 bg-emerald-50 px-6 py-4 text-sm text-emerald-800 shadow-sm">
            Your booking request was sent successfully. Thank you!
          </div>
        )}

        <form
          action="https://formsubmit.co/learsiando%40gmail.com"
          method="POST"
          className="grid gap-6 bg-white p-8 rounded-[40px] shadow-soft border border-[#E6D8D3]"
        >
          <input type="hidden" name="_subject" value="New booking request from SvetArt" />
          <input type="hidden" name="_captcha" value="false" />
          <input type="hidden" name="_next" value={nextUrl || 'https://svetartstud.vercel.app/?booking=success'} />

          <label className="block">
            <span className="text-sm font-semibold text-stone-700">Full name</span>
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              required
              className="mt-3 w-full rounded-3xl border border-[#D7C6C0] bg-[#FCF7F5] px-5 py-4 text-sm text-stone-900 outline-none transition focus:border-[#D9A7A7] focus:ring-2 focus:ring-[#F2D5D2]/60"
            />
          </label>

          <label className="block">
            <span className="text-sm font-semibold text-stone-700">Email address</span>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="mt-3 w-full rounded-3xl border border-[#D7C6C0] bg-[#FCF7F5] px-5 py-4 text-sm text-stone-900 outline-none transition focus:border-[#D9A7A7] focus:ring-2 focus:ring-[#F2D5D2]/60"
            />
          </label>

          <label className="block">
            <span className="text-sm font-semibold text-stone-700">Phone number</span>
            <input
              type="tel"
              name="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+373 60 000 000"
              required
              className="mt-3 w-full rounded-3xl border border-[#D7C6C0] bg-[#FCF7F5] px-5 py-4 text-sm text-stone-900 outline-none transition focus:border-[#D9A7A7] focus:ring-2 focus:ring-[#F2D5D2]/60"
            />
          </label>

          <div className="grid gap-6 md:grid-cols-2">
            <label className="block">
              <span className="text-sm font-semibold text-stone-700">Preferred date</span>
              <input
                type="date"
                name="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
                min={minDate}
                className="mt-3 w-full rounded-3xl border border-[#D7C6C0] bg-[#FCF7F5] px-5 py-4 text-sm text-stone-900 outline-none transition focus:border-[#D9A7A7] focus:ring-2 focus:ring-[#F2D5D2]/60"
              />
            </label>

            <label className="block">
              <span className="text-sm font-semibold text-stone-700">Preferred time</span>
              <input
                type="time"
                name="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                required
                min={effectiveMinTime}
                className="mt-3 w-full rounded-3xl border border-[#D7C6C0] bg-[#FCF7F5] px-5 py-4 text-sm text-stone-900 outline-none transition focus:border-[#D9A7A7] focus:ring-2 focus:ring-[#F2D5D2]/60"
              />
            </label>
          </div>

          <label className="block">
            <span className="text-sm font-semibold text-stone-700">Special request <span className="text-stone-500">(optional)</span></span>
            <textarea
              name="specialRequest"
              value={specialRequest}
              onChange={(e) => setSpecialRequest(e.target.value)}
              placeholder="Any special requests or preferences"
              rows={4}
              className="mt-3 w-full rounded-3xl border border-[#D7C6C0] bg-[#FCF7F5] px-5 py-4 text-sm text-stone-900 outline-none transition focus:border-[#D9A7A7] focus:ring-2 focus:ring-[#F2D5D2]/60"
            />
          </label>

          <button
            type="submit"
            className="mt-3 inline-flex items-center justify-center rounded-full bg-[#5D2F2A] px-7 py-4 text-sm font-bold uppercase tracking-[0.18em] text-white transition hover:bg-[#7b473f] disabled:cursor-not-allowed disabled:bg-[#b6a2a0]"
          >
            Send Booking Request
          </button>
        </form>
      </div>
    </section>
  );
}
