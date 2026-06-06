import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const kategoriler = [
  { id: 'tirnak', isim: 'Protez Tırnak', emoji: '💅', adet: 8, bg: '#FFE4EF' },
  { id: 'cilt', isim: 'Cilt Bakımı', emoji: '🌿', adet: 12, bg: '#D6F5F0' },
  { id: 'lazer', isim: 'Lazer Epilasyon', emoji: '⚡', adet: 6, bg: '#F0E6FF' },
  { id: 'kas', isim: 'Kaş & Kirpik', emoji: '👁️', adet: 9, bg: '#FFD6E0' },
  { id: 'masaj', isim: 'Masaj & SPA', emoji: '🕯️', adet: 7, bg: '#FFF4CC' },
  { id: 'makyaj', isim: 'Makyaj', emoji: '💄', adet: 5, bg: '#FFE8D6' },
  { id: 'sac', isim: 'Saç Bakımı', emoji: '✂️', adet: 10, bg: '#D6EEFF' },
  { id: 'kalici', isim: 'Kalıcı Makyaj', emoji: '🎨', adet: 4, bg: '#D6FFE8' },
];

export default function KategoriSec() {
  const [secilen, setSecilen] = useState([]);
  const navigate = useNavigate();

  const toggle = (id) => {
    setSecilen(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const devamEt = () => {
    localStorage.setItem('seciliKategoriler', JSON.stringify(secilen));
    navigate('/hizmet');
  };

  return (
    <div style={{ fontFamily: '-apple-system, SF Pro Display, sans-serif', background: '#FFF5F8', minHeight: '100vh' }}>

      {/* Header */}
      <div style={{ background: 'linear-gradient(135deg,#FF6B9D,#FF8E53,#FFB347)', padding: '1.75rem 2rem' }}>
        <div style={{ fontFamily: 'Georgia, serif', fontSize: 30, fontWeight: 600, color: '#fff' }}>Has Beauty</div>
        <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.85)', letterSpacing: 2, textTransform: 'uppercase' }}>Online Randevu</div>
      </div>

      {/* Adımlar */}
      <div style={{ background: '#fff', borderBottom: '1px solid #FFE4EF', padding: '1rem 2rem', display: 'flex', gap: 8, alignItems: 'center' }}>
        {['Kategori', 'Hizmet', 'Tarih & Saat', 'Bilgi & Ödeme', 'Onay'].map((s, i) => (
          <React.Fragment key={i}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: i === 0 ? '#FF6B9D' : '#C9A0B0', fontWeight: i === 0 ? 600 : 400 }}>
              <div style={{ width: 22, height: 22, borderRadius: '50%', background: i === 0 ? 'linear-gradient(135deg,#FF6B9D,#FF8E53)' : 'transparent', border: i === 0 ? 'none' : '1.5px solid #FFB8D2', display: 'flex', alignItems: 'center', justifyContent: 'center', color: i === 0 ? '#fff' : '#C9A0B0', fontSize: 11, fontWeight: 600 }}>
                {i + 1}
              </div>
              {s}
            </div>
            {i < 4 && <div style={{ width: 28, height: 1.5, background: '#FFE4EF' }} />}
          </React.Fragment>
        ))}
      </div>

      {/* İçerik */}
      <div style={{ padding: '1.75rem 2rem', maxWidth: 720, margin: '0 auto' }}>
        <div style={{ fontFamily: 'Georgia, serif', fontSize: 22, color: '#2D1A26', marginBottom: 4 }}>Kategori seçin ✨</div>
        <div style={{ fontSize: 13, color: '#A07090', marginBottom: 6 }}>Hangi hizmet kategorisinde randevu almak istersiniz?</div>
        <div style={{ fontSize: 11, color: '#FFB347', fontWeight: 500, marginBottom: 24 }}>✦ Birden fazla kategori seçebilirsiniz</div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(155px, 1fr))', gap: 12, marginBottom: 80 }}>
          {kategoriler.map(k => (
            <div key={k.id} onClick={() => toggle(k.id)} style={{ background: '#fff', border: secilen.includes(k.id) ? '2px solid #FF6B9D' : '1.5px solid #FFE4EF', borderRadius: 16, padding: '1.25rem 1rem', cursor: 'pointer', transition: 'all 0.15s', boxShadow: secilen.includes(k.id) ? '0 4px 20px rgba(255,107,157,0.18)' : 'none', position: 'relative' }}>
              {secilen.includes(k.id) && (
                <div style={{ position: 'absolute', top: 10, right: 10, width: 20, height: 20, borderRadius: '50%', background: 'linear-gradient(135deg,#FF6B9D,#FF8E53)', color: '#fff', fontSize: 11, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>✓</div>
              )}
              <div style={{ width: 44, height: 44, borderRadius: 12, background: k.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, marginBottom: 10 }}>{k.emoji}</div>
              <div style={{ fontSize: 13, fontWeight: 500, color: '#2D1A26' }}>{k.isim}</div>
              <div style={{ fontSize: 11, color: '#A07090', marginTop: 2 }}>{k.adet} hizmet</div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, background: '#fff', borderTop: '1.5px solid #FFE4EF', padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 -4px 20px rgba(255,107,157,0.08)' }}>
        <div style={{ fontSize: 13, color: '#A07090' }}>
          {secilen.length === 0 ? 'Henüz seçim yapılmadı' : <span>{secilen.length} kategori seçildi</span>}
        </div>
        <button onClick={devamEt} disabled={secilen.length === 0} style={{ background: secilen.length === 0 ? '#ccc' : 'linear-gradient(135deg,#FF6B9D,#FF8E53)', color: '#fff', border: 'none', borderRadius: 50, padding: '11px 28px', fontSize: 14, fontWeight: 600, cursor: secilen.length === 0 ? 'not-allowed' : 'pointer', boxShadow: secilen.length === 0 ? 'none' : '0 4px 14px rgba(255,107,157,0.35)' }}>
          Devam Et →
        </button>
      </div>
    </div>
  );
}