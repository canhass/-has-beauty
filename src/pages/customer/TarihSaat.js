import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MONTHS_TR = ['Ocak','Şubat','Mart','Nisan','Mayıs','Haziran','Temmuz','Ağustos','Eylül','Ekim','Kasım','Aralık'];
const DAYS_TR = ['Pzt','Sal','Çar','Per','Cum','Cmt','Paz'];
const SABAH = ['09:00','09:30','10:00','10:30','11:00','11:30'];
const OGLE = ['12:00','12:30','13:00','13:30','14:00','14:30','15:00','15:30'];
const AKSAM = ['16:00','16:30','17:00','17:30','18:00','18:30'];
const DOLU = ['09:00','11:00','14:30','16:00'];

export default function TarihSaat() {
  const navigate = useNavigate();
  const [viewYear, setViewYear] = useState(2026);
  const [viewMonth, setViewMonth] = useState(5);
  const [selDate, setSelDate] = useState(null);
  const [selTime, setSelTime] = useState(null);

  const today = new Date(2026, 5, 6);

  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  let firstDow = new Date(viewYear, viewMonth, 1).getDay();
  firstDow = firstDow === 0 ? 6 : firstDow - 1;

  const pad = n => String(n).padStart(2, '0');
  const dateKey = (d) => `${viewYear}-${pad(viewMonth + 1)}-${pad(d)}`;

  const devamEt = () => {
    localStorage.setItem('seciliTarih', selDate);
    localStorage.setItem('seciliSaat', selTime);
    navigate('/odeme');
  };

  const SlotGrup = ({ baslik, slots }) => (
    <div style={{ marginBottom: 16 }}>
      <div style={{ fontSize: 12, color: '#C9A0B0', fontWeight: 500, marginBottom: 8 }}>{baslik}</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 8 }}>
        {slots.map(t => {
          const dolu = DOLU.includes(t);
          const sec = selTime === t;
          return (
            <button key={t} disabled={dolu} onClick={() => setSelTime(t)} style={{ padding: '9px 6px', borderRadius: 10, border: sec ? 'none' : '1.5px solid #FFE4EF', background: dolu ? '#F8F0F4' : sec ? 'linear-gradient(135deg,#FF6B9D,#FF8E53)' : '#fff', color: dolu ? '#D4C0C8' : sec ? '#fff' : '#2D1A26', fontSize: 13, fontWeight: 500, cursor: dolu ? 'not-allowed' : 'pointer', fontFamily: 'inherit' }}>
              {t}
            </button>
          );
        })}
      </div>
    </div>
  );

  return (
    <div style={{ fontFamily: '-apple-system, SF Pro Display, sans-serif', background: '#FFF5F8', minHeight: '100vh' }}>
      <div style={{ background: 'linear-gradient(135deg,#FF6B9D,#FF8E53,#FFB347)', padding: '1.75rem 2rem' }}>
        <div style={{ fontFamily: 'Georgia, serif', fontSize: 30, fontWeight: 600, color: '#fff' }}>Has Beauty</div>
        <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.85)', letterSpacing: 2, textTransform: 'uppercase' }}>Online Randevu</div>
      </div>

      <div style={{ background: '#fff', borderBottom: '1px solid #FFE4EF', padding: '1rem 2rem', display: 'flex', gap: 8, alignItems: 'center', overflowX: 'auto' }}>
        {['Kategori', 'Hizmet', 'Tarih & Saat', 'Bilgi & Ödeme', 'Onay'].map((s, i) => (
          <React.Fragment key={i}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: i === 2 ? '#FF6B9D' : '#C9A0B0', fontWeight: i === 2 ? 600 : 400, whiteSpace: 'nowrap' }}>
              <div style={{ width: 22, height: 22, borderRadius: '50%', background: i === 2 ? 'linear-gradient(135deg,#FF6B9D,#FF8E53)' : i < 2 ? '#FFE4EF' : 'transparent', border: i < 2 ? '1.5px solid #FF6B9D' : i === 2 ? 'none' : '1.5px solid #FFB8D2', display: 'flex', alignItems: 'center', justifyContent: 'center', color: i === 2 ? '#fff' : i < 2 ? '#FF6B9D' : '#C9A0B0', fontSize: 11, fontWeight: 600 }}>
                {i < 2 ? '✓' : i + 1}
              </div>
              {s}
            </div>
            {i < 4 && <div style={{ width: 28, height: 1.5, background: '#FFE4EF', flexShrink: 0 }} />}
          </React.Fragment>
        ))}
      </div>

      <div style={{ padding: '1.75rem 2rem', maxWidth: 520, margin: '0 auto', paddingBottom: 100 }}>
        <div style={{ fontFamily: 'Georgia, serif', fontSize: 22, color: '#2D1A26', marginBottom: 4 }}>Tarih & Saat seçin 🗓️</div>
        <div style={{ fontSize: 13, color: '#A07090', marginBottom: 20 }}>Uygun gün ve saati seçin</div>

        {selDate && selTime && (
          <div style={{ background: 'linear-gradient(135deg,rgba(255,107,157,0.08),rgba(255,179,71,0.08))', border: '1.5px solid #FFE4EF', borderRadius: 14, padding: '10px 16px', marginBottom: 16, fontSize: 13, fontWeight: 500, color: '#FF6B9D' }}>
            📅 {selDate.split('-')[2]} {MONTHS_TR[parseInt(selDate.split('-')[1]) - 1]} · Saat {selTime}
          </div>
        )}

        {/* Takvim */}
        <div style={{ background: '#fff', border: '1.5px solid #FFE4EF', borderRadius: 18, padding: '1.25rem', marginBottom: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <button onClick={() => { if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); } else setViewMonth(m => m - 1); }} style={{ width: 34, height: 34, borderRadius: '50%', border: '1.5px solid #FFE4EF', background: '#fff', cursor: 'pointer', fontSize: 18, color: '#FF6B9D', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>‹</button>
            <span style={{ fontFamily: 'Georgia, serif', fontSize: 17, fontWeight: 500, color: '#2D1A26' }}>{MONTHS_TR[viewMonth]} {viewYear}</span>
            <button onClick={() => { if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); } else setViewMonth(m => m + 1); }} style={{ width: 34, height: 34, borderRadius: '50%', border: '1.5px solid #FFE4EF', background: '#fff', cursor: 'pointer', fontSize: 18, color: '#FF6B9D', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>›</button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: 4 }}>
            {DAYS_TR.map(d => <div key={d} style={{ textAlign: 'center', fontSize: 11, color: '#A07090', fontWeight: 600, padding: '4px 0' }}>{d}</div>)}
            {Array(firstDow).fill(null).map((_, i) => <div key={i} />)}
            {Array(daysInMonth).fill(null).map((_, i) => {
              const d = i + 1;
              const key = dateKey(d);
              const thisDate = new Date(viewYear, viewMonth, d);
              const isPast = thisDate < today;
              const isSun = thisDate.getDay() === 0;
              const isSel = selDate === key;
              const isToday = thisDate.toDateString() === today.toDateString();
              return (
                <button key={d} disabled={isPast || isSun} onClick={() => { setSelDate(key); setSelTime(null); }} style={{ width: '100%', aspectRatio: '1', borderRadius: '50%', border: 'none', background: isSel ? 'linear-gradient(135deg,#FF6B9D,#FF8E53)' : 'transparent', color: isSel ? '#fff' : isPast || isSun ? '#D4C0C8' : isToday ? '#FF6B9D' : '#2D1A26', fontSize: 13, fontWeight: isSel || isToday ? 600 : 400, cursor: isPast || isSun ? 'not-allowed' : 'pointer', fontFamily: 'inherit' }}>
                  {d}
                </button>
              );
            })}
          </div>
        </div>

        {selDate && (
          <div style={{ background: '#fff', border: '1.5px solid #FFE4EF', borderRadius: 18, padding: '1.25rem' }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#A07090', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 16 }}>Saat Seçin</div>
            <SlotGrup baslik="🌅 Sabah" slots={SABAH} />
            <SlotGrup baslik="☀️ Öğleden Sonra" slots={OGLE} />
            <SlotGrup baslik="🌆 Akşam" slots={AKSAM} />
          </div>
        )}
      </div>

      <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, background: '#fff', borderTop: '1.5px solid #FFE4EF', padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 -4px 20px rgba(255,107,157,0.08)' }}>
        <div style={{ fontSize: 13, color: '#A07090' }}>{selDate && selTime ? `${selDate.split('-')[2]} ${MONTHS_TR[parseInt(selDate.split('-')[1]) - 1]} · ${selTime}` : 'Tarih ve saat seçilmedi'}</div>
        <button onClick={devamEt} disabled={!selDate || !selTime} style={{ background: !selDate || !selTime ? '#ccc' : 'linear-gradient(135deg,#FF6B9D,#FF8E53)', color: '#fff', border: 'none', borderRadius: 50, padding: '11px 28px', fontSize: 14, fontWeight: 600, cursor: !selDate || !selTime ? 'not-allowed' : 'pointer' }}>
          Devam Et →
        </button>
      </div>
    </div>
  );
}
