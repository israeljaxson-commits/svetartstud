import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Booking } from './CalendarBooking';

function download(filename: string, content: string) {
  const blob = new Blob([content], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

function toCSV(bookings: Booking[]) {
  if (!bookings || bookings.length === 0) return '';
  const headers = ['referenceCode','serviceName','dateString','timeSlot','clientName','clientPhone','clientEmail','clientNotes','createdAt'];
  const rows = bookings.map(b => headers.map(h => JSON.stringify((b as any)[h] ?? '')).join(','));
  return headers.join(',') + '\n' + rows.join('\n');
}

export default function AdminBookings() {
  const { t } = useLanguage();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');


  const handleExportJSON = () => {
    download('bookings.json', JSON.stringify(bookings, null, 2));
  };

  const handleExportCSV = () => {
    const csv = toCSV(bookings);
    download('bookings.csv', csv);
  };

  const handleClearServer = async () => {
    setError('Server booking API integration has been removed.');
  };

  return (
    <section id="admin" className="py-20">
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-serif text-2xl font-bold">Bookings</h3>
          <div className="flex items-center gap-3">
            <button onClick={handleExportJSON} className="px-3 py-2 rounded rose-gold-gradient text-white">Export JSON</button>
            <button onClick={handleExportCSV} className="px-3 py-2 rounded bg-[#2C2523] text-white">Export CSV</button>
          </div>
        </div>

        <div className="bg-white rounded-xl border p-4 overflow-x-auto">
          {error && <div className="text-rose-600 mb-3">{error}</div>}
          {loading ? (
            <p className="text-sm text-stone-500">Loading...</p>
          ) : bookings.length === 0 ? (
            <p className="text-sm text-stone-500">No bookings found on server.</p>
          ) : (
            <table className="w-full text-sm table-auto">
              <thead>
                <tr className="text-left text-xs text-stone-500">
                  <th className="p-2">Ref</th>
                  <th className="p-2">Service</th>
                  <th className="p-2">Date</th>
                  <th className="p-2">Time</th>
                  <th className="p-2">Name</th>
                  <th className="p-2">Phone</th>
                  <th className="p-2">Email</th>
                  <th className="p-2">Notes</th>
                  <th className="p-2">Created</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map(b => (
                  <tr key={b.id} className="border-t">
                    <td className="p-2 font-mono text-[12px]">{b.referenceCode}</td>
                    <td className="p-2">{b.serviceName}</td>
                    <td className="p-2">{b.dateString}</td>
                    <td className="p-2">{b.timeSlot}</td>
                    <td className="p-2">{b.clientName}</td>
                    <td className="p-2">{b.clientPhone}</td>
                    <td className="p-2">{b.clientEmail}</td>
                    <td className="p-2 max-w-xs truncate">{b.clientNotes || '—'}</td>
                    <td className="p-2">{new Date(b.createdAt).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </section>
  );
}
