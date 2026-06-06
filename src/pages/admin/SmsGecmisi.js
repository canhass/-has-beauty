import React, { useState } from 'react';
import { Sidebar } from './Dashboard';

const TYPE_META = {
  bday:    { label: 'Doğum Günü', icon: '🎂', bg: '#FFE4EF', cls: '#FF6B9D' },
  confirm: { label: 'Onay',       icon: '✅', bg: '#E8F8EF', cls: '#2E7D53' },
  remind:  { label: 'Hatırlatma', icon: '⏰', bg: '#FFF3E0', cls: '#CC7700' },
  cancel:  { label: 'İptal',      icon: '❌', bg: '#FEE2E2', cls: '#B91C1C' },
  manual:  { label: 'Manuel',     icon: '✍️', bg: '#EEF2FF', cls: '#4F46E5' },
};

const DATA = [
  {id:1,name:'Ayşe Yılmaz',phone:'0532 411 22 47',type:'bday',msg:'🎂 Doğum gününüz kutlu olsun Ayşe Hanım! Has Beauty olarak size özel %15 indirim hediyemiz var.',date:'5 Haz',time:'09:00',status:'delivered'},
  {id:2,name:'Merve Çelik',phone:'0533 555 77 90',type:'bday',msg:'🎂 Doğum gününüz kutlu olsun Merve Hanım! Has Beauty olarak size özel %15 indirim hediyemiz var.',date:'5 Haz',time:'09:00',status:'delivered'},
  {id:3,name:'Zeynep Kaya',phone:'0541 333 88 12',type:'confirm',msg:'✅ Randevunuz onaylandı! 5 Haz 2026 Saat 10:30 — Lazer Epilasyon. Has Beauty sizi bekliyor.',date:'5 Haz',time:'08:45',status:'delivered'},
  {id:4,name:'Fatma Demir',phone:'0505 222 66 31',type:'remind',msg:'⏰ Hatırlatma: Yarın 12:00\'de Has Beauty\'de randevunuz var.',date:'4 Haz',time:'14:00',status:'delivered'},
  {id:5,name:'Selin Arslan',phone:'0542 888 44 23',type:'cancel',msg:'❌ Randevunuz iptal edildi. Yeni randevu için: hasbeauty.com',date:'3 Haz',time:'11:30',status:'delivered'},
  {id:6,name:'Büşra Yıldız',phone:'0531 666 11 58',type:'remind',msg:'⏰ Hatırlatma: Yarın 10:00\'de Has Beauty\'de randevunuz var.',date:'4 Haz',time:'14:00',status:'delivered'},
  {id:7,name:'Elif Şahin',phone:'0536 999 55 84',type:'remind',msg:'⏰ Hatırlatma: Yarın 13:00\'de Aromaterapi Masajı randevunuz var.',date:'6 Haz',time:'14:00',status:'sent'},
  {id:8,name:'Canan Koç',phone:'0537 444 22 67',type:'confirm',msg:'✅ Randevunuz onaylandı! 8 Haz 2026 Saat 10:00 — Microblading.',date:'5 Haz',time:'10:15',status:'delivered'},
  {id:9,name:'Tüm Müşteriler',phone:'248 alıcı',type:'manual',msg:'🌸 Has Beauty\'de Haziran fırsatları! Tüm cilt bakımı hizmetlerinde %20 indirim.',date:'1 Haz',time:'10:00',status:'delivered'},
];

const TEMPLATES = {
  bday: '🎂 Doğum gününüz kutlu olsun! Has Beauty olarak size özel %15 indirim hediyemiz var. Randevu: hasbeauty.com',
  camp: '🎉 Has Beauty\'de büyük kampanya! Bu ay tüm hizmetlerde %20 indirim. Kaçırmayın: hasbeauty.com',
  remind: '⏰ Has Beauty\'den hatırlatma: Randevunuzu unutmayın! Değişiklik için: 0532 000 00 00',
};

export default function SmsGecmisi() {
  const [tab, setTab] = useState('all');
  const [search, setSearch] = useState('');
  const [modal, setModal] = useState(null);
  const [sendModal, setSendModal] = useState(false);
  const [smsText, setSmsText] = useState('');

  const filtered = DATA.filter(s => {
    const mTab = tab === 'all' || s.type === tab;
    const mSearch = !search || s.name.toLowerCase().includes(search.toLowerCase()) || s.phone.includes(search);
    return mTab && mSearch;
  });

  const stMeta = { delivered: { label: 'İletildi', color: '#2E7D53', bg: '#E8F8EF' }, sent: { label: 'Gönderildi', color: '#4F46E5', bg: '#EEF2FF' }, failed: { label: 'Başarısız', color: '#B91C1C', bg: '#FEE2E2' } };

  return (
    <div style={{ fontFamily: '-apple-system, SF Pro Display, sans-serif', background: '#FFF5F8', minHeight: '100vh', display: 'flex' }}>
      <Sidebar active="/admin/sms" />
      <div style={{ flex: 1, overflow: 'auto', padding: '1.5rem', minWidth: 0 }}>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
          <div>
            <div style={{ fontFamily: 'Georgia, serif', fontSize: 22, fontWeight: 500, color: '#2D1A26' }}>SMS Geçmişi</div>
            <div style={{ fontSize: 13, color: '#A07090' }}>5 Haziran 2026</div>
          </div>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg,#FF6B9D,#FF8E53)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 600, color: '#fff' }}>HB</div>
            <button onClick={() => setSendModal(true)} style={{ background: 'linear-gradient(135deg,#FF6B9D,#FF8E53)', color: '#fff', border: 'none', borderRadius: 50, padding: '9px 20px', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', boxShadow: '0 4px 14px rgba(255,107,157,0.3)' }}>+ Toplu SMS</button>
          </div>
        </div>

        {/* İstatistikler */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 10, marginBottom: '1.25rem' }}>
          {[{icon:'💬',val:'1.248',label:'Bu ay gönderilen'},{icon:'✅',val:'%98.2',label:'İletilme oranı'},{icon:'🎂',val:'42',label:'Doğum günü SMS'},{icon:'💰',val:'₺187',label:'Bu ay maliyet'}].map(s => (
            <div key={s.label} style={{ background: '#fff', border: '1.5px solid #FFE4EF', borderRadius: 14, padding: '.9rem 1rem' }}>
              <div style={{ fontSize: 20, marginBottom: 6 }}>{s.icon}</div>
              <div style={{ fontSize: 20, fontWeight: 700, color: '#2D1A26', lineHeight: 1 }}>{s.val}</div>
              <div style={{ fontSize: 11, color: '#A07090', marginTop: 3 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Arama */}
        <div style={{ position: 'relative', marginBottom: 12 }}>
          <span style={{ position: 'absolute', left: 13, top: '50%', transform: 'translateY(-50%)', fontSize: 14, color: '#C9A0B0' }}>🔍</span>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="İsim veya telefon ara..." style={{ width: '100%', padding: '9px 14px 9px 36px', border: '1.5px solid #FFE4EF', borderRadius: 50, fontSize: 13, color: '#2D1A26', background: '#fff', outline: 'none', fontFamily: 'inherit' }} />
        </div>

        {/* Tablar */}
        <div style={{ display: 'flex', gap: 6, marginBottom: '1.25rem', flexWrap: 'wrap' }}>
          {[['all','Tümü'],['bday','🎂 Doğum Günü'],['confirm','✅ Onay'],['remind','⏰ Hatırlatma'],['cancel','❌ İptal'],['manual','✍️ Manuel']].map(([id,label]) => (
            <button key={id} onClick={() => setTab(id)} style={{ padding: '7px 16px', borderRadius: 50, fontSize: 12, fontWeight: 500, border: tab === id ? 'none' : '1.5px solid #FFE4EF', background: tab === id ? 'linear-gradient(135deg,#FF6B9D,#FF8E53)' : '#fff', color: tab === id ? '#fff' : '#A07090', cursor: 'pointer', fontFamily: 'inherit' }}>
              {label}
            </button>
          ))}
        </div>

        {/* Tablo */}
        <div style={{ background: '#fff', border: '1.5px solid #FFE4EF', borderRadius: 18, overflow: 'hidden' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '36px 1.8fr 2.5fr 1fr 1fr 1fr', padding: '9px 1.1rem', background: '#FFF8FB', borderBottom: '1.5px solid #FFE4EF', fontSize: 11, fontWeight: 600, color: '#A07090', textTransform: 'uppercase', letterSpacing: 0.8, gap: 8 }}>
            <div /><div>Müşteri</div><div>Mesaj</div><div>Tip</div><div>Tarih</div><div>Durum</div>
          </div>
          {filtered.map(s => {
            const tm = TYPE_META[s.type];
            const st = stMeta[s.status];
            return (
              <div key={s.id} onClick={() => setModal(s)} style={{ display: 'grid', gridTemplateColumns: '36px 1.8fr 2.5fr 1fr 1fr 1fr', padding: '11px 1.1rem', borderBottom: '1px solid #FFF0F5', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: tm.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>{tm.icon}</div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 500, color: '#2D1A26' }}>{s.name}</div>
                  <div style={{ fontSize: 11, color: '#A07090' }}>{s.phone}</div>
                </div>
                <div style={{ fontSize: 12, color: '#2D1A26', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{s.msg}</div>
                <div><span style={{ fontSize: 10, fontWeight: 600, padding: '3px 8px', borderRadius: 50, background: tm.bg, color: tm.cls }}>{tm.label}</span></div>
                <div>
                  <div style={{ fontSize: 12, color: '#2D1A26' }}>{s.date}</div>
                  <div style={{ fontSize: 11, color: '#A07090' }}>{s.time}</div>
                </div>
                <div><span style={{ fontSize: 10, fontWeight: 600, padding: '4px 10px', borderRadius: 50, background: st.bg, color: st.color }}>{st.label}</span></div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Detay Modal */}
      {modal && (
        <div onClick={() => setModal(null)} style={{ position: 'fixed', inset: 0, background: 'rgba(45,26,38,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: '1rem' }}>
          <div onClick={e => e.stopPropagation()} style={{ background: '#fff', borderRadius: 20, width: '100%', maxWidth: 420, overflow: 'hidden', boxShadow: '0 20px 60px rgba(255,107,157,0.2)' }}>
            <div style={{ background: 'linear-gradient(135deg,#FF6B9D,#FF8E53)', padding: '1.1rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontFamily: 'Georgia, serif', fontSize: 17, color: '#fff' }}>SMS Detayı</span>
              <button onClick={() => setModal(null)} style={{ width: 28, height: 28, borderRadius: '50%', border: '1.5px solid rgba(255,255,255,0.4)', background: 'transparent', cursor: 'pointer', color: '#fff', fontSize: 14 }}>✕</button>
            </div>
            <div style={{ padding: '1.25rem' }}>
              <div style={{ background: '#FFF0F8', border: '1.5px solid #FFE4EF', borderRadius: '14px 14px 14px 4px', padding: '12px 14px', fontSize: 13, color: '#2D1A26', lineHeight: 1.6, marginBottom: 16 }}>{modal.msg}</div>
              {[['👤 Alıcı', modal.name], ['📞 Telefon', modal.phone], ['📌 Tip', TYPE_META[modal.type].label], ['📅 Gönderim', `${modal.date} ${modal.time}`], ['📝 Karakter', `${modal.msg.length} / 160`]].map(([l, v]) => (
                <div key={l} style={{ display: 'flex', justifyContent: 'space-between', padding: '7px 0', borderBottom: '1px solid #FFF0F5', fontSize: 13 }}>
                  <span style={{ color: '#A07090' }}>{l}</span>
                  <span style={{ fontWeight: 500, color: '#2D1A26' }}>{v}</span>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 8, padding: '0 1.25rem 1.25rem' }}>
              <button onClick={() => setModal(null)} style={{ flex: 1, padding: 10, borderRadius: 50, border: 'none', background: 'linear-gradient(135deg,#FF6B9D,#FF8E53)', color: '#fff', fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Tekrar Gönder</button>
              <button onClick={() => setModal(null)} style={{ flex: 1, padding: 10, borderRadius: 50, border: 'none', background: '#FFF0F8', color: '#FF6B9D', fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Kapat</button>
            </div>
          </div>
        </div>
      )}

      {/* Toplu SMS Modal */}
      {sendModal && (
        <div onClick={() => setSendModal(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(45,26,38,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: '1rem' }}>
          <div onClick={e => e.stopPropagation()} style={{ background: '#fff', borderRadius: 20, width: '100%', maxWidth: 420, overflow: 'hidden', boxShadow: '0 20px 60px rgba(255,107,157,0.2)' }}>
            <div style={{ background: 'linear-gradient(135deg,#FF6B9D,#FF8E53)', padding: '1.1rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontFamily: 'Georgia, serif', fontSize: 17, color: '#fff' }}>✍️ Toplu SMS Gönder</span>
              <button onClick={() => setSendModal(false)} style={{ width: 28, height: 28, borderRadius: '50%', border: '1.5px solid rgba(255,255,255,0.4)', background: 'transparent', cursor: 'pointer', color: '#fff', fontSize: 14 }}>✕</button>
            </div>
            <div style={{ padding: '1.25rem' }}>
              {[['Hedef Kitle', <select style={{ width: '100%', padding: '10px 14px', border: '1.5px solid #FFE4EF', borderRadius: 10, fontSize: 13, color: '#2D1A26', outline: 'none', fontFamily: 'inherit' }}><option>Tüm müşteriler (248 kişi)</option><option>VIP müşteriler (34 kişi)</option><option>Bu ay randevusu olanlar</option></select>],
                ['Şablon', <select onChange={e => e.target.value && setSmsText(TEMPLATES[e.target.value] || '')} style={{ width: '100%', padding: '10px 14px', border: '1.5px solid #FFE4EF', borderRadius: 10, fontSize: 13, color: '#2D1A26', outline: 'none', fontFamily: 'inherit' }}><option value="">Şablon seç...</option><option value="bday">🎂 Doğum günü</option><option value="camp">🎉 Kampanya</option><option value="remind">⏰ Hatırlatma</option></select>]
              ].map(([label, input]) => (
                <div key={label} style={{ marginBottom: 12 }}>
                  <label style={{ fontSize: 12, fontWeight: 500, color: '#A07090', display: 'block', marginBottom: 5 }}>{label}</label>
                  {input}
                </div>
              ))}
              <div style={{ marginBottom: 12 }}>
                <label style={{ fontSize: 12, fontWeight: 500, color: '#A07090', display: 'block', marginBottom: 5 }}>Mesaj</label>
                <textarea value={smsText} onChange={e => setSmsText(e.target.value)} placeholder="Mesajınızı yazın..." style={{ width: '100%', padding: '10px 14px', border: '1.5px solid #FFE4EF', borderRadius: 10, fontSize: 13, color: '#2D1A26', outline: 'none', fontFamily: 'inherit', resize: 'vertical', minHeight: 80, lineHeight: 1.5 }} />
                <div style={{ fontSize: 11, color: '#A07090', textAlign: 'right', marginTop: 3 }}>{smsText.length} / 160 karakter</div>
              </div>
              <div style={{ background: '#FFF8F0', border: '1.5px solid #FFE8CC', borderRadius: 10, padding: '10px 12px', fontSize: 12, color: '#CC7700' }}>
                ⚠️ Tahmini maliyet: <strong>₺{(248 * 0.15).toFixed(0)}</strong> · Netgsm üzerinden gönderilecek
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8, padding: '0 1.25rem 1.25rem' }}>
              <button onClick={() => setSendModal(false)} style={{ flex: 1, padding: 11, borderRadius: 50, border: 'none', background: 'linear-gradient(135deg,#FF6B9D,#FF8E53)', color: '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>🚀 Gönder</button>
              <button onClick={() => setSendModal(false)} style={{ flex: 1, padding: 11, borderRadius: 50, border: 'none', background: '#FFF0F8', color: '#FF6B9D', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>İptal</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
