import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DATA = {
  tirnak: { label: 'Protez Tırnak', emoji: '💅', bg: '#FFE4EF', services: [
    { id: 't1', name: 'Fransız Manikür', dur: '60 dk', price: 850 },
    { id: 't2', name: 'Akrilik Tırnak', dur: '90 dk', price: 1200 },
    { id: 't3', name: 'Jel Tırnak', dur: '75 dk', price: 1000 },
    { id: 't4', name: 'Nail Art & Tasarım', dur: '90 dk', price: 1400 },
  ]},
  cilt: { label: 'Cilt Bakımı', emoji: '🌿', bg: '#D6F5F0', services: [
    { id: 'c1', name: 'Derin Temizleme', dur: '60 dk', price: 950 },
    { id: 'c2', name: 'Nemlendirici Bakım', dur: '45 dk', price: 750 },
    { id: 'c3', name: 'Anti-Aging Bakım', dur: '75 dk', price: 1350 },
    { id: 'c4', name: 'Akne Bakımı', dur: '60 dk', price: 1100 },
  ]},
  lazer: { label: 'Lazer Epilasyon', emoji: '⚡', bg: '#F0E6FF', services: [
    { id: 'l1', name: 'Bacak Tümü', dur: '60 dk', price: 2500 },
    { id: 'l2', name: 'Koltuk Altı', dur: '20 dk', price: 600 },
    { id: 'l3', name: 'Bikini Bölgesi', dur: '30 dk', price: 900 },
  ]},
  kas: { label: 'Kaş & Kirpik', emoji: '👁️', bg: '#FFD6E0', services: [
    { id: 'k1', name: 'Kaş Dizaynı', dur: '30 dk', price: 400 },
    { id: 'k2', name: 'Kirpik Lifting', dur: '45 dk', price: 750 },
    { id: 'k3', name: 'Tek Tek Kirpik', dur: '90 dk', price: 1500 },
  ]},
  masaj: { label: 'Masaj & SPA', emoji: '🕯️', bg: '#FFF4CC', services: [
    { id: 'm1', name: 'Klasik Masaj', dur: '50 dk', price: 850 },
    { id: 'm2', name: 'Aromaterapi', dur: '60 dk', price: 1100 },
    { id: 'm3', name: 'SPA Paketi', dur: '120 dk', price: 2200 },
  ]},
  makyaj: { label: 'Makyaj', emoji: '💄', bg: '#FFE8D6', services: [
    { id: 'mj1', name: 'Günlük Makyaj', dur: '45 dk', price: 700 },
    { id: 'mj2', name: 'Gelin Makyajı', dur: '90 dk', price: 2500 },
  ]},
  sac: { label: 'Saç Bakımı', emoji: '✂️', bg: '#D6EEFF', services: [
    { id: 's1', name: 'Saç Kesimi', dur: '45 dk', price: 450 },
    { id: 's2', name: 'Keratin Bakım', dur: '120 dk', price: 2800 },
    { id: 's3', name: 'Saç Boyama', dur: '90 dk', price: 1500 },
  ]},
  kalici: { label: 'Kalıcı Makyaj', emoji: '🎨', bg: '#D6FFE8', services: [
    { id: 'km1', name: 'Microblading', dur: '120 dk', price: 3500 },
    { id: 'km2', name: 'Kalıcı Eyeliner', dur: '90 dk', price: 2500 },
  ]},
};

export default function HizmetSec() {
  const navigate = useNavigate();
  const kategoriler = JSON.parse(localStorage.getItem('seciliKategoriler') || '[]');
  const [secilen, setSecilen] = useState([]);
  const [aktifTab, setAktifTab] = useState(kategoriler[0] || 'tirnak');

  const toggle = (id) => {
    setSecilen(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const toplam = Object.values(DATA).flatMap(d => d.services).filter(s => secilen.includes(s.id)).reduce((acc, s) => acc + s.price, 0);

  const devamEt = () => {
    localStorage.setItem('seciliHizmetler', JSON.stringify(secilen));
    navigate('/tarih');
  };

  return (
    <div style={{ fontFamily: '-apple-system, SF Pro Display, sans-serif', background: '#FFF5F8', minHeight: '100vh' }}>
      <div style={{ background: 'linear-gradient(135deg,#FF6B9D,#FF8E53,#FFB347)', padding: '1.75rem 2rem' }}>
        <div style={{ fontFamily: 'Georgia, serif', fontSize: 30, fontWeight: 600, color: '#fff' }}>Has Beauty</div>
        <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.85)', letterSpacing: 2, textTransform: 'uppercase' }}>Online Randevu</div>
      </div>

      <div style={{ background: '#fff', borderBottom: '1px solid #FFE4EF', padding: '1rem 2rem', display: 'flex', gap: 8, alignItems: 'center', overflowX: 'auto' }}>
        {['Kategori', 'Hizmet', 'Tarih & Saat', 'Bilgi & Ödeme', 'Onay'].map((s, i) => (
          <React.Fragment key={i}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: i === 1 ? '#FF6B9D' : '#C9A0B0', fontWeight: i === 1 ? 600 : 400, whiteSpace: 'nowrap' }}>
              <div style={{ width: 22, height: 22, borderRadius: '50%', background: i === 1 ? 'linear-gradient(135deg,#FF6B9D,#FF8E53)' : i < 1 ? '#FFE4EF' : 'transparent', border: i < 1 ? '1.5px solid #FF6B9D' : i === 1 ? 'none' : '1.5px solid #FFB8D2', display: 'flex', alignItems: 'center', justifyContent: 'center', color: i === 1 ? '#fff' : i < 1 ? '#FF6B9D' : '#C9A0B0', fontSize: 11, fontWeight: 600 }}>
                {i < 1 ? '✓' : i + 1}
              </div>
              {s}
            </div>
            {i < 4 && <div style={{ width: 28, height: 1.5, background: '#FFE4EF', flexShrink: 0 }} />}
          </React.Fragment>
        ))}
      </div>

      <div style={{ padding: '1.75rem 2rem', maxWidth: 720, margin: '0 auto', paddingBottom: 100 }}>
        <div style={{ fontFamily: 'Georgia, serif', fontSize: 22, color: '#2D1A26', marginBottom: 4 }}>Hizmet seçin 💖</div>
        <div style={{ fontSize: 13, color: '#A07090', marginBottom: 16 }}>Birden fazla hizmet seçebilirsiniz</div>

        <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
          {kategoriler.map(id => DATA[id] && (
            <button key={id} onClick={() => setAktifTab(id)} style={{ padding: '7px 16px', borderRadius: 50, fontSize: 12, fontWeight: 500, border: aktifTab === id ? 'none' : '1.5px solid #FFE4EF', background: aktifTab === id ? 'linear-gradient(135deg,#FF6B9D,#FF8E53)' : '#fff', color: aktifTab === id ? '#fff' : '#A07090', cursor: 'pointer' }}>
              {DATA[id].emoji} {DATA[id].label}
            </button>
          ))}
        </div>

        {DATA[aktifTab]?.services.map(s => (
          <div key={s.id} onClick={() => toggle(s.id)} style={{ background: '#fff', border: secilen.includes(s.id) ? '2px solid #FF6B9D' : '1.5px solid #FFE4EF', borderRadius: 14, padding: '1rem 1.1rem', marginBottom: 8, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 42, height: 42, borderRadius: 10, background: DATA[aktifTab].bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>{DATA[aktifTab].emoji}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 500, color: '#2D1A26' }}>{s.name}</div>
              <div style={{ fontSize: 12, color: '#A07090' }}>⏱ {s.dur}</div>
            </div>
            <div style={{ fontSize: 15, fontWeight: 600, color: '#FF6B9D' }}>₺{s.price.toLocaleString('tr-TR')}</div>
            <div style={{ width: 22, height: 22, borderRadius: '50%', background: secilen.includes(s.id) ? 'linear-gradient(135deg,#FF6B9D,#FF8E53)' : 'transparent', border: secilen.includes(s.id) ? 'none' : '1.5px solid #FFB8D2', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 12 }}>
              {secilen.includes(s.id) ? '✓' : ''}
            </div>
          </div>
        ))}
      </div>

      <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, background: '#fff', borderTop: '1.5px solid #FFE4EF', padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 -4px 20px rgba(255,107,157,0.08)' }}>
        <div>
          <div style={{ fontSize: 12, color: '#A07090' }}>{secilen.length} hizmet seçildi</div>
          {toplam > 0 && <div style={{ fontSize: 16, fontWeight: 700, color: '#2D1A26' }}>Toplam: ₺{toplam.toLocaleString('tr-TR')}</div>}
        </div>
        <button onClick={devamEt} disabled={secilen.length === 0} style={{ background: secilen.length === 0 ? '#ccc' : 'linear-gradient(135deg,#FF6B9D,#FF8E53)', color: '#fff', border: 'none', borderRadius: 50, padding: '11px 28px', fontSize: 14, fontWeight: 600, cursor: secilen.length === 0 ? 'not-allowed' : 'pointer' }}>
          Devam Et →
        </button>
      </div>
    </div>
  );
}