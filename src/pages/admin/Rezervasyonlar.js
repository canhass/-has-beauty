import React, { useState } from 'react';
import { Sidebar } from './Dashboard';

const DATA = [
  {id:1,name:'Ayşe Yılmaz',initials:'AY',color:'linear-gradient(135deg,#FF6B9D,#FF8E53)',phone:'0532 411 22 47',services:['💅 Fransız Manikür','🌿 Derin Temizleme'],date:'5 Haz 2026',time:'09:00',amount:1800,status:'confirmed'},
  {id:2,name:'Zeynep Kaya',initials:'ZK',color:'linear-gradient(135deg,#A78BFA,#818CF8)',phone:'0541 333 88 12',services:['⚡ Lazer — Bacak Tümü'],date:'5 Haz 2026',time:'10:30',amount:2500,status:'confirmed'},
  {id:3,name:'Fatma Demir',initials:'FD',color:'linear-gradient(135deg,#34D399,#059669)',phone:'0505 222 66 31',services:['👁️ Kirpik Lifting'],date:'5 Haz 2026',time:'12:00',amount:750,status:'pending'},
  {id:4,name:'Merve Çelik',initials:'MÇ',color:'linear-gradient(135deg,#FBBF24,#F59E0B)',phone:'0533 555 77 90',services:['🌿 Cilt Bakımı — Anti-Aging'],date:'5 Haz 2026',time:'14:00',amount:1350,status:'new'},
  {id:5,name:'Selin Arslan',initials:'SA',color:'linear-gradient(135deg,#F472B6,#EC4899)',phone:'0542 888 44 23',services:['💄 Gelin Makyajı'],date:'5 Haz 2026',time:'15:30',amount:2500,status:'new'},
  {id:6,name:'Büşra Yıldız',initials:'BÜ',color:'linear-gradient(135deg,#60A5FA,#3B82F6)',phone:'0531 666 11 58',services:['💅 Akrilik Tırnak','👁️ Kaş Dizaynı'],date:'6 Haz 2026',time:'10:00',amount:1600,status:'new'},
  {id:7,name:'Nihan Öztürk',initials:'NÖ',color:'linear-gradient(135deg,#FF6B9D,#FF8E53)',phone:'0544 777 33 19',services:['⚡ Lazer — Koltuk Altı'],date:'6 Haz 2026',time:'11:30',amount:600,status:'confirmed'},
  {id:8,name:'Elif Şahin',initials:'EŞ',color:'linear-gradient(135deg,#34D399,#059669)',phone:'0536 999 55 84',services:['🕯️ Aromaterapi Masajı'],date:'7 Haz 2026',time:'13:00',amount:1100,status:'confirmed'},
];

const statusMeta = {
  confirmed: { label: 'Onaylı', color: '#2E7D53', bg: '#E8F8EF' },
  pending:   { label: 'Beklemede', color: '#CC7700', bg: '#FFF3E0' },
  new:       { label: 'Yeni', color: '#FF6B9D', bg: '#FFE4EF' },
  cancelled: { label: 'İptal', color: '#B91C1C', bg: '#FEE2E2' },
};

export default function Rezervasyonlar() {
  const [data, setData] = useState(DATA);
  const [tab, setTab] = useState('all');
  const [search, setSearch] = useState('');
  const [modal, setModal] = useState(null);

  const filtered = data.filter(r => {
    const mTab = tab === 'all' || r.status === tab;
    const mSearch = !search || r.name.toLowerCase().includes(search.toLowerCase()) || r.phone.includes(search);
    return mTab && mSearch;
  });

  const updateStatus = (id, status) => {
    setData(prev => prev.map(r => r.id === id ? { ...r, status } : r));
    setModal(null);
  };

  return (
    <div style={{ fontFamily: '-apple-system, SF Pro Display, sans-serif', background: '#FFF5F8', minHeight: '100vh', display: 'flex' }}>
      <Sidebar active="/admin/rezervasyonlar" />
      <div style={{ flex: 1, overflow: 'auto', padding: '1.5rem', minWidth: 0 }}>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
          <div>
            <div style={{ fontFamily: 'Georgia, serif', fontSize: 22, fontWeight: 500, color: '#2D1A26' }}>Rezervasyonlar</div>
            <div style={{ fontSize: 13, color: '#A07090' }}>5 Haziran 2026</div>
          </div>
          <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg,#FF6B9D,#FF8E53)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 600, color: '#fff' }}>HB</div>
        </div>

        {/* Arama */}
        <div style={{ position: 'relative', marginBottom: 12 }}>
          <span style={{ position: 'absolute', left: 13, top: '50%', transform: 'translateY(-50%)', fontSize: 14, color: '#C9A0B0' }}>🔍</span>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="İsim veya telefon ara..." style={{ width: '100%', padding: '9px 14px 9px 36px', border: '1.5px solid #FFE4EF', borderRadius: 50, fontSize: 13, color: '#2D1A26', background: '#fff', outline: 'none', fontFamily: 'inherit' }} />
        </div>

        {/* Tablar */}
        <div style={{ display: 'flex', gap: 6, marginBottom: '1.25rem', flexWrap: 'wrap' }}>
          {[['all','Tümü'],['new','Yeni'],['confirmed','Onaylı'],['pending','Beklemede'],['cancelled','İptal']].map(([id,label]) => (
            <button key={id} onClick={() => setTab(id)} style={{ padding: '7px 16px', borderRadius: 50, fontSize: 12, fontWeight: 500, border: tab === id ? 'none' : '1.5px solid #FFE4EF', background: tab === id ? 'linear-gradient(135deg,#FF6B9D,#FF8E53)' : '#fff', color: tab === id ? '#fff' : '#A07090', cursor: 'pointer', fontFamily: 'inherit' }}>
              {label}
            </button>
          ))}
        </div>

        {/* Tablo */}
        <div style={{ background: '#fff', border: '1.5px solid #FFE4EF', borderRadius: 18, overflow: 'hidden' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 2fr 1.2fr 1fr 1.2fr 1.4fr', padding: '10px 1.25rem', background: '#FFF8FB', borderBottom: '1.5px solid #FFE4EF', fontSize: 11, fontWeight: 600, color: '#A07090', textTransform: 'uppercase', letterSpacing: 0.8 }}>
            <div>Müşteri</div><div>Hizmet</div><div>Tarih & Saat</div><div>Tutar</div><div>Durum</div><div>İşlem</div>
          </div>
          {filtered.map(r => {
            const st = statusMeta[r.status];
            return (
              <div key={r.id} style={{ display: 'grid', gridTemplateColumns: '2fr 2fr 1.2fr 1fr 1.2fr 1.4fr', padding: '12px 1.25rem', borderBottom: '1px solid #FFF0F5', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: 32, height: 32, borderRadius: '50%', background: r.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: '#fff', flexShrink: 0 }}>{r.initials}</div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 500, color: '#2D1A26' }}>{r.name}</div>
                    <div style={{ fontSize: 11, color: '#A07090' }}>{r.phone}</div>
                  </div>
                </div>
                <div style={{ fontSize: 12, color: '#2D1A26' }}>
                  {r.services[0]}
                  {r.services.length > 1 && <div style={{ fontSize: 11, color: '#FF6B9D' }}>+{r.services.length - 1} daha</div>}
                </div>
                <div>
                  <div style={{ fontSize: 12, color: '#2D1A26' }}>{r.time}</div>
                  <div style={{ fontSize: 11, color: '#A07090' }}>{r.date}</div>
                </div>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#2D1A26' }}>₺{r.amount.toLocaleString('tr-TR')}</div>
                <div><span style={{ fontSize: 10, fontWeight: 600, padding: '4px 10px', borderRadius: 50, background: st.bg, color: st.color }}>{st.label}</span></div>
                <div style={{ display: 'flex', gap: 6 }}>
                  {(r.status === 'new' || r.status === 'pending') && (
                    <button onClick={() => updateStatus(r.id, 'confirmed')} style={{ padding: '5px 10px', borderRadius: 8, fontSize: 11, fontWeight: 600, cursor: 'pointer', border: 'none', background: '#E8F8EF', color: '#2E7D53', fontFamily: 'inherit' }}>✓ Onayla</button>
                  )}
                  <button onClick={() => setModal(r)} style={{ padding: '5px 10px', borderRadius: 8, fontSize: 11, fontWeight: 600, cursor: 'pointer', border: 'none', background: '#FFF0F8', color: '#FF6B9D', fontFamily: 'inherit' }}>Detay</button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal */}
      {modal && (
        <div onClick={() => setModal(null)} style={{ position: 'fixed', inset: 0, background: 'rgba(45,26,38,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: '1rem' }}>
          <div onClick={e => e.stopPropagation()} style={{ background: '#fff', borderRadius: 20, width: '100%', maxWidth: 420, overflow: 'hidden', boxShadow: '0 20px 60px rgba(255,107,157,0.2)' }}>
            <div style={{ background: 'linear-gradient(135deg,#FF6B9D,#FF8E53)', padding: '1.25rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontFamily: 'Georgia, serif', fontSize: 18, color: '#fff' }}>{modal.name}</span>
              <button onClick={() => setModal(null)} style={{ width: 28, height: 28, borderRadius: '50%', border: '1.5px solid rgba(255,255,255,0.4)', background: 'transparent', cursor: 'pointer', color: '#fff', fontSize: 14 }}>✕</button>
            </div>
            <div style={{ padding: '1.25rem' }}>
              {[['📞 Telefon', modal.phone], ['💆 Hizmet', modal.services.join(', ')], ['📅 Tarih', modal.date], ['⏰ Saat', modal.time], ['💰 Tutar', `₺${modal.amount.toLocaleString('tr-TR')}`], ['📌 Durum', statusMeta[modal.status].label]].map(([l, v]) => (
                <div key={l} style={{ display: 'flex', justifyContent: 'space-between', padding: '7px 0', borderBottom: '1px solid #FFF0F5', fontSize: 13 }}>
                  <span style={{ color: '#A07090' }}>{l}</span>
                  <span style={{ fontWeight: 500, color: '#2D1A26' }}>{v}</span>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 8, padding: '0 1.25rem 1.25rem' }}>
              {(modal.status === 'new' || modal.status === 'pending') && (
                <button onClick={() => updateStatus(modal.id, 'confirmed')} style={{ flex: 1, padding: 11, borderRadius: 50, border: 'none', background: 'linear-gradient(135deg,#FF6B9D,#FF8E53)', color: '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>✓ Onayla</button>
              )}
              <button onClick={() => updateStatus(modal.id, 'cancelled')} style={{ flex: 1, padding: 11, borderRadius: 50, border: 'none', background: '#FEE2E2', color: '#B91C1C', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>İptal Et</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
