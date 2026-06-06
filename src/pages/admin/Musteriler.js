import React, { useState } from 'react';
import { Sidebar } from './Dashboard';

const CUSTOMERS = [
  {id:1,name:'Ayşe Yılmaz',initials:'AY',color:'linear-gradient(135deg,#FF6B9D,#FF8E53)',phone:'0532 411 22 47',bday:'5 Haziran',bdayToday:true,visits:24,totalSpend:28400,tags:['vip'],lastVisit:'5 Haz 2026',source:'Instagram',history:[{svc:'💅 Fransız Manikür',date:'5 Haz 2026',price:850},{svc:'🌿 Cilt Bakımı',date:'12 May 2026',price:950}]},
  {id:2,name:'Zeynep Kaya',initials:'ZK',color:'linear-gradient(135deg,#A78BFA,#818CF8)',phone:'0541 333 88 12',bday:'12 Haziran',bdayToday:false,visits:18,totalSpend:21000,tags:['vip'],lastVisit:'5 Haz 2026',source:'Google',history:[{svc:'⚡ Lazer — Bacak',date:'5 Haz 2026',price:2500}]},
  {id:3,name:'Fatma Demir',initials:'FD',color:'linear-gradient(135deg,#34D399,#059669)',phone:'0505 222 66 31',bday:'8 Haziran',bdayToday:false,visits:7,totalSpend:6200,tags:[],lastVisit:'5 Haz 2026',source:'Arkadaş',history:[{svc:'👁️ Kirpik Lifting',date:'5 Haz 2026',price:750}]},
  {id:4,name:'Merve Çelik',initials:'MÇ',color:'linear-gradient(135deg,#FBBF24,#F59E0B)',phone:'0533 555 77 90',bday:'5 Haziran',bdayToday:true,visits:3,totalSpend:3800,tags:['new'],lastVisit:'5 Haz 2026',source:'Instagram',history:[{svc:'🌿 Anti-Aging Bakım',date:'5 Haz 2026',price:1350}]},
  {id:5,name:'Selin Arslan',initials:'SA',color:'linear-gradient(135deg,#F472B6,#EC4899)',phone:'0542 888 44 23',bday:'22 Temmuz',bdayToday:false,visits:5,totalSpend:9500,tags:[],lastVisit:'5 Haz 2026',source:'Google',history:[{svc:'💄 Gelin Makyajı',date:'5 Haz 2026',price:2500}]},
  {id:6,name:'Büşra Yıldız',initials:'BÜ',color:'linear-gradient(135deg,#60A5FA,#3B82F6)',phone:'0531 666 11 58',bday:'3 Ekim',bdayToday:false,visits:12,totalSpend:14200,tags:['vip'],lastVisit:'4 Haz 2026',source:'Instagram',history:[{svc:'💅 Akrilik Tırnak',date:'4 Haz 2026',price:1200}]},
  {id:7,name:'Elif Şahin',initials:'EŞ',color:'linear-gradient(135deg,#34D399,#059669)',phone:'0536 999 55 84',bday:'29 Kasım',bdayToday:false,visits:15,totalSpend:17600,tags:['vip'],lastVisit:'7 Haz 2026',source:'Google',history:[{svc:'🕯️ Aromaterapi',date:'7 Haz 2026',price:1100}]},
  {id:8,name:'Canan Koç',initials:'CK',color:'linear-gradient(135deg,#FBBF24,#F59E0B)',phone:'0537 444 22 67',bday:'14 Şubat',bdayToday:false,visits:1,totalSpend:3500,tags:['new'],lastVisit:'8 Haz 2026',source:'Instagram',history:[{svc:'🎨 Microblading',date:'8 Haz 2026',price:3500}]},
];

export default function Musteriler() {
  const [search, setSearch] = useState('');
  const [tagFilter, setTagFilter] = useState('all');
  const [modal, setModal] = useState(null);

  const filtered = CUSTOMERS.filter(c => {
    const mSearch = !search || c.name.toLowerCase().includes(search.toLowerCase()) || c.phone.includes(search);
    const mTag = tagFilter === 'all' || (tagFilter === 'vip' && c.tags.includes('vip')) || (tagFilter === 'new' && c.tags.includes('new')) || (tagFilter === 'bday' && c.bdayToday);
    return mSearch && mTag;
  });

  return (
    <div style={{ fontFamily: '-apple-system, SF Pro Display, sans-serif', background: '#FFF5F8', minHeight: '100vh', display: 'flex' }}>
      <Sidebar active="/admin/musteriler" />
      <div style={{ flex: 1, overflow: 'auto', padding: '1.5rem', minWidth: 0 }}>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
          <div>
            <div style={{ fontFamily: 'Georgia, serif', fontSize: 22, fontWeight: 500, color: '#2D1A26' }}>Müşteriler</div>
            <div style={{ fontSize: 13, color: '#A07090' }}>5 Haziran 2026</div>
          </div>
          <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg,#FF6B9D,#FF8E53)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 600, color: '#fff' }}>HB</div>
        </div>

        {/* İstatistikler */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 10, marginBottom: '1.25rem' }}>
          {[{icon:'👥',val:'248',label:'Toplam müşteri'},{icon:'⭐',val:'34',label:'VIP müşteri'},{icon:'🎂',val:'2',label:'Bugün doğum günü'},{icon:'✨',val:'18',label:'Bu ay yeni'}].map(s => (
            <div key={s.label} style={{ background: '#fff', border: '1.5px solid #FFE4EF', borderRadius: 14, padding: '.9rem 1rem' }}>
              <div style={{ fontSize: 20, marginBottom: 6 }}>{s.icon}</div>
              <div style={{ fontSize: 20, fontWeight: 700, color: '#2D1A26', lineHeight: 1 }}>{s.val}</div>
              <div style={{ fontSize: 11, color: '#A07090', marginTop: 3 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Filtreler */}
        <div style={{ display: 'flex', gap: 10, marginBottom: '1.25rem', flexWrap: 'wrap' }}>
          <div style={{ position: 'relative', flex: 1, minWidth: 160 }}>
            <span style={{ position: 'absolute', left: 13, top: '50%', transform: 'translateY(-50%)', fontSize: 14, color: '#C9A0B0' }}>🔍</span>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="İsim veya telefon ara..." style={{ width: '100%', padding: '9px 14px 9px 36px', border: '1.5px solid #FFE4EF', borderRadius: 50, fontSize: 13, outline: 'none', fontFamily: 'inherit' }} />
          </div>
          <select value={tagFilter} onChange={e => setTagFilter(e.target.value)} style={{ padding: '9px 14px', border: '1.5px solid #FFE4EF', borderRadius: 50, fontSize: 13, color: '#2D1A26', background: '#fff', outline: 'none', fontFamily: 'inherit', cursor: 'pointer' }}>
            <option value="all">Tüm müşteriler</option>
            <option value="vip">VIP</option>
            <option value="new">Yeni</option>
            <option value="bday">Bugün doğum günü</option>
          </select>
        </div>

        {/* Kartlar */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px,1fr))', gap: 12 }}>
          {filtered.map(c => (
            <div key={c.id} onClick={() => setModal(c)} style={{ background: '#fff', border: c.bdayToday ? '2px solid #FF6B9D' : '1.5px solid #FFE4EF', borderRadius: 16, padding: '1.1rem', cursor: 'pointer', position: 'relative', transition: 'all 0.15s' }}>
              {c.bdayToday && <div style={{ position: 'absolute', top: 10, right: 10, background: 'linear-gradient(135deg,#FF6B9D,#FFB347)', color: '#fff', fontSize: 10, fontWeight: 700, padding: '3px 10px', borderRadius: 50 }}>🎂 Doğum Günü!</div>}
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                <div style={{ width: 42, height: 42, borderRadius: '50%', background: c.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700, color: '#fff', flexShrink: 0 }}>{c.initials}</div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: '#2D1A26' }}>{c.name}</div>
                  <div style={{ fontSize: 12, color: '#A07090' }}>{c.phone}</div>
                </div>
              </div>
              <div style={{ height: 1, background: '#FFF0F5', margin: '10px 0' }} />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
                {[['Ziyaret', `${c.visits} kez`], ['Harcama', `₺${c.totalSpend.toLocaleString('tr-TR')}`], ['Doğum günü', c.bday], ['Son ziyaret', c.lastVisit]].map(([l, v]) => (
                  <div key={l}>
                    <div style={{ fontSize: 10, color: '#C9A0B0', textTransform: 'uppercase', letterSpacing: 0.5 }}>{l}</div>
                    <div style={{ fontSize: 13, fontWeight: 500, color: '#2D1A26' }}>{v}</div>
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap', marginTop: 8 }}>
                {c.tags.includes('vip') && <span style={{ fontSize: 10, fontWeight: 500, padding: '3px 8px', borderRadius: 50, background: 'linear-gradient(135deg,#FF6B9D,#FF8E53)', color: '#fff' }}>⭐ VIP</span>}
                {c.tags.includes('new') && <span style={{ fontSize: 10, fontWeight: 500, padding: '3px 8px', borderRadius: 50, background: '#E8F8EF', color: '#2E7D53' }}>✨ Yeni</span>}
                {c.bdayToday && <span style={{ fontSize: 10, fontWeight: 500, padding: '3px 8px', borderRadius: 50, background: '#FFE4EF', color: '#FF6B9D' }}>🎂 Bugün</span>}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {modal && (
        <div onClick={() => setModal(null)} style={{ position: 'fixed', inset: 0, background: 'rgba(45,26,38,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: '1rem' }}>
          <div onClick={e => e.stopPropagation()} style={{ background: '#fff', borderRadius: 20, width: '100%', maxWidth: 460, overflow: 'hidden', boxShadow: '0 20px 60px rgba(255,107,157,0.2)' }}>
            <div style={{ background: 'linear-gradient(135deg,#FF6B9D,#FF8E53)', padding: '1.5rem', display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'rgba(255,255,255,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, fontWeight: 700, color: '#fff' }}>{modal.initials}</div>
              <div>
                <div style={{ fontFamily: 'Georgia, serif', fontSize: 20, color: '#fff' }}>{modal.name}</div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.85)' }}>{modal.phone} · {modal.source}</div>
              </div>
            </div>
            <div style={{ padding: '1.25rem' }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: '#A07090', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>Müşteri Bilgileri</div>
              {[['🎂 Doğum günü', modal.bday], ['🔁 Toplam ziyaret', `${modal.visits} kez`], ['💰 Toplam harcama', `₺${modal.totalSpend.toLocaleString('tr-TR')}`], ['📅 Son ziyaret', modal.lastVisit]].map(([l, v]) => (
                <div key={l} style={{ display: 'flex', justifyContent: 'space-between', padding: '7px 0', borderBottom: '1px solid #FFF0F5', fontSize: 13 }}>
                  <span style={{ color: '#A07090' }}>{l}</span>
                  <span style={{ fontWeight: 500, color: '#2D1A26' }}>{v}</span>
                </div>
              ))}
              <div style={{ fontSize: 11, fontWeight: 600, color: '#A07090', textTransform: 'uppercase', letterSpacing: 1, margin: '12px 0 8px' }}>Randevu Geçmişi</div>
              {modal.history.map((h, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderBottom: '1px solid #FFF0F5' }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'linear-gradient(135deg,#FF6B9D,#FF8E53)', flexShrink: 0 }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 500, color: '#2D1A26' }}>{h.svc}</div>
                    <div style={{ fontSize: 11, color: '#A07090' }}>{h.date}</div>
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#FF6B9D' }}>₺{h.price.toLocaleString('tr-TR')}</div>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 8, padding: '0 1.25rem 1.25rem' }}>
              <button style={{ flex: 1, padding: 10, borderRadius: 50, border: 'none', background: 'linear-gradient(135deg,#FF6B9D,#FF8E53)', color: '#fff', fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>💬 SMS Gönder</button>
              <button onClick={() => setModal(null)} style={{ flex: 1, padding: 10, borderRadius: 50, border: 'none', background: '#FFF0F8', color: '#FF6B9D', fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Kapat</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
