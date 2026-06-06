import React, { useState } from 'react';
import { Sidebar } from './Dashboard';

const CATS = [
  {id:'tirnak',label:'Protez Tırnak',emoji:'💅',bg:'#FFE4EF'},
  {id:'cilt',label:'Cilt Bakımı',emoji:'🌿',bg:'#D6F5F0'},
  {id:'lazer',label:'Lazer Epilasyon',emoji:'⚡',bg:'#F0E6FF'},
  {id:'kas',label:'Kaş & Kirpik',emoji:'👁️',bg:'#FFD6E0'},
  {id:'masaj',label:'Masaj & SPA',emoji:'🕯️',bg:'#FFF4CC'},
  {id:'makyaj',label:'Makyaj',emoji:'💄',bg:'#FFE8D6'},
  {id:'sac',label:'Saç Bakımı',emoji:'✂️',bg:'#D6EEFF'},
  {id:'kalici',label:'Kalıcı Makyaj',emoji:'🎨',bg:'#D6FFE8'},
];

const INIT = [
  {id:1,cat:'tirnak',name:'Fransız Manikür',price:850,dur:60,active:true},
  {id:2,cat:'tirnak',name:'Akrilik Tırnak',price:1200,dur:90,active:true},
  {id:3,cat:'tirnak',name:'Jel Tırnak',price:1000,dur:75,active:true},
  {id:4,cat:'cilt',name:'Derin Temizleme',price:950,dur:60,active:true},
  {id:5,cat:'cilt',name:'Anti-Aging Bakım',price:1350,dur:75,active:true},
  {id:6,cat:'lazer',name:'Bacak Tümü',price:2500,dur:60,active:true},
  {id:7,cat:'lazer',name:'Koltuk Altı',price:600,dur:20,active:true},
  {id:8,cat:'kas',name:'Kaş Dizaynı',price:400,dur:30,active:true},
  {id:9,cat:'kas',name:'Kirpik Lifting',price:750,dur:45,active:true},
  {id:10,cat:'masaj',name:'Aromaterapi',price:1100,dur:60,active:true},
  {id:11,cat:'makyaj',name:'Gelin Makyajı',price:2500,dur:90,active:true},
  {id:12,cat:'sac',name:'Keratin Bakım',price:2800,dur:120,active:true},
  {id:13,cat:'kalici',name:'Microblading',price:3500,dur:120,active:true},
];

const empty = {name:'',cat:'tirnak',price:'',dur:''};

export default function Hizmetler() {
  const [services, setServices] = useState(INIT);
  const [activeTab, setActiveTab] = useState('all');
  const [modal, setModal] = useState(null); // null | {mode:'add'|'edit', data}
  const [delId, setDelId] = useState(null);
  const [nextId, setNextId] = useState(14);

  const cats = activeTab === 'all' ? CATS : CATS.filter(c => c.id === activeTab);

  const toggleActive = (id) => setServices(prev => prev.map(s => s.id === id ? {...s, active: !s.active} : s));

  const save = (form) => {
    if (modal.mode === 'add') {
      setServices(prev => [...prev, {...form, id: nextId, active: true, price: parseInt(form.price), dur: parseInt(form.dur)}]);
      setNextId(n => n + 1);
    } else {
      setServices(prev => prev.map(s => s.id === modal.data.id ? {...s, ...form, price: parseInt(form.price), dur: parseInt(form.dur)} : s));
    }
    setModal(null);
  };

  const del = () => {
    setServices(prev => prev.filter(s => s.id !== delId));
    setDelId(null);
  };

  return (
    <div style={{ fontFamily: '-apple-system, SF Pro Display, sans-serif', background: '#FFF5F8', minHeight: '100vh', display: 'flex' }}>
      <Sidebar active="/admin/hizmetler" />
      <div style={{ flex: 1, overflow: 'auto', padding: '1.5rem', minWidth: 0 }}>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
          <div>
            <div style={{ fontFamily: 'Georgia, serif', fontSize: 22, fontWeight: 500, color: '#2D1A26' }}>Hizmet Yönetimi</div>
            <div style={{ fontSize: 13, color: '#A07090' }}>5 Haziran 2026</div>
          </div>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg,#FF6B9D,#FF8E53)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 600, color: '#fff' }}>HB</div>
            <button onClick={() => setModal({mode:'add', data: empty})} style={{ background: 'linear-gradient(135deg,#FF6B9D,#FF8E53)', color: '#fff', border: 'none', borderRadius: 50, padding: '9px 20px', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', boxShadow: '0 4px 14px rgba(255,107,157,0.3)' }}>+ Hizmet Ekle</button>
          </div>
        </div>

        {/* Kategori tabları */}
        <div style={{ display: 'flex', gap: 8, marginBottom: '1.25rem', flexWrap: 'wrap' }}>
          <button onClick={() => setActiveTab('all')} style={{ padding: '8px 16px', borderRadius: 50, fontSize: 12, fontWeight: 500, border: activeTab === 'all' ? 'none' : '1.5px solid #FFE4EF', background: activeTab === 'all' ? 'linear-gradient(135deg,#FF6B9D,#FF8E53)' : '#fff', color: activeTab === 'all' ? '#fff' : '#A07090', cursor: 'pointer', fontFamily: 'inherit' }}>
            🗂️ Tümü ({services.length})
          </button>
          {CATS.map(c => (
            <button key={c.id} onClick={() => setActiveTab(c.id)} style={{ padding: '8px 16px', borderRadius: 50, fontSize: 12, fontWeight: 500, border: activeTab === c.id ? 'none' : '1.5px solid #FFE4EF', background: activeTab === c.id ? 'linear-gradient(135deg,#FF6B9D,#FF8E53)' : '#fff', color: activeTab === c.id ? '#fff' : '#A07090', cursor: 'pointer', fontFamily: 'inherit' }}>
              {c.emoji} {c.label} ({services.filter(s => s.cat === c.id).length})
            </button>
          ))}
        </div>

        {/* Hizmet tabloları */}
        {cats.map(cat => {
          const svcs = services.filter(s => s.cat === cat.id);
          if (!svcs.length) return null;
          return (
            <div key={cat.id} style={{ marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: cat.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>{cat.emoji}</div>
                <span style={{ fontSize: 13, fontWeight: 600, color: '#2D1A26' }}>{cat.label}</span>
                <span style={{ fontSize: 12, color: '#A07090' }}>{svcs.length} hizmet</span>
              </div>
              <div style={{ background: '#fff', border: '1.5px solid #FFE4EF', borderRadius: 16, overflow: 'hidden' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '2.5fr 1fr 1fr 1fr 1.2fr', padding: '9px 1.1rem', background: '#FFF8FB', borderBottom: '1.5px solid #FFE4EF', fontSize: 11, fontWeight: 600, color: '#A07090', textTransform: 'uppercase', letterSpacing: 0.8 }}>
                  <div>Hizmet Adı</div><div>Fiyat</div><div>Süre</div><div>Durum</div><div>İşlemler</div>
                </div>
                {svcs.map(s => (
                  <div key={s.id} style={{ display: 'grid', gridTemplateColumns: '2.5fr 1fr 1fr 1fr 1.2fr', padding: '11px 1.1rem', borderBottom: '1px solid #FFF0F5', alignItems: 'center' }}>
                    <div style={{ fontSize: 13, fontWeight: 500, color: '#2D1A26' }}>{cat.emoji} {s.name}</div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: '#2D1A26' }}>₺{s.price.toLocaleString('tr-TR')}</div>
                    <div style={{ fontSize: 12, color: '#A07090' }}>{s.dur} dk</div>
                    <div>
                      <div onClick={() => toggleActive(s.id)} style={{ width: 36, height: 20, borderRadius: 50, background: s.active ? 'linear-gradient(135deg,#FF6B9D,#FF8E53)' : '#E0D0D8', position: 'relative', cursor: 'pointer', transition: 'background 0.2s' }}>
                        <div style={{ position: 'absolute', width: 14, height: 14, borderRadius: '50%', background: '#fff', top: 3, left: s.active ? 19 : 3, transition: 'left 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.15)' }} />
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <button onClick={() => setModal({mode:'edit', data: {...s}})} style={{ padding: '5px 10px', borderRadius: 8, fontSize: 11, fontWeight: 600, cursor: 'pointer', border: 'none', background: '#FFF0F8', color: '#FF6B9D', fontFamily: 'inherit' }}>✏️ Düzenle</button>
                      <button onClick={() => setDelId(s.id)} style={{ padding: '5px 10px', borderRadius: 8, fontSize: 11, fontWeight: 600, cursor: 'pointer', border: 'none', background: '#FEE2E2', color: '#B91C1C', fontFamily: 'inherit' }}>🗑️</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Ekle/Düzenle Modal */}
      {modal && <HizmetModal modal={modal} onSave={save} onClose={() => setModal(null)} cats={CATS} />}

      {/* Sil Modal */}
      {delId && (
        <div onClick={() => setDelId(null)} style={{ position: 'fixed', inset: 0, background: 'rgba(45,26,38,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: '1rem' }}>
          <div onClick={e => e.stopPropagation()} style={{ background: '#fff', borderRadius: 20, width: '100%', maxWidth: 340, padding: '1.5rem', textAlign: 'center', boxShadow: '0 20px 60px rgba(255,107,157,0.2)' }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>🗑️</div>
            <div style={{ fontFamily: 'Georgia, serif', fontSize: 18, color: '#2D1A26', marginBottom: 6 }}>Hizmeti sil?</div>
            <div style={{ fontSize: 13, color: '#A07090', marginBottom: 20 }}>Bu işlem geri alınamaz.</div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={del} style={{ flex: 1, padding: 11, borderRadius: 50, border: 'none', background: '#FEE2E2', color: '#B91C1C', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Evet, Sil</button>
              <button onClick={() => setDelId(null)} style={{ flex: 1, padding: 11, borderRadius: 50, border: 'none', background: '#FFF0F8', color: '#FF6B9D', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Vazgeç</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function HizmetModal({ modal, onSave, onClose, cats }) {
  const [form, setForm] = useState(modal.data);
  const handle = e => setForm({...form, [e.target.name]: e.target.value});
  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(45,26,38,0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: '1rem' }}>
      <div onClick={e => e.stopPropagation()} style={{ background: '#fff', borderRadius: 20, width: '100%', maxWidth: 400, overflow: 'hidden', boxShadow: '0 20px 60px rgba(255,107,157,0.2)' }}>
        <div style={{ background: 'linear-gradient(135deg,#FF6B9D,#FF8E53)', padding: '1.25rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontFamily: 'Georgia, serif', fontSize: 18, color: '#fff' }}>{modal.mode === 'add' ? '+ Hizmet Ekle' : '✏️ Düzenle'}</span>
          <button onClick={onClose} style={{ width: 28, height: 28, borderRadius: '50%', border: '1.5px solid rgba(255,255,255,0.4)', background: 'transparent', cursor: 'pointer', color: '#fff', fontSize: 14 }}>✕</button>
        </div>
        <div style={{ padding: '1.25rem' }}>
          {[['Hizmet Adı','name','text','örn. Fransız Manikür'],['Fiyat (₺)','price','number','850'],['Süre (dk)','dur','number','60']].map(([label,name,type,ph]) => (
            <div key={name} style={{ marginBottom: 12 }}>
              <label style={{ fontSize: 12, fontWeight: 500, color: '#A07090', display: 'block', marginBottom: 5 }}>{label}</label>
              <input name={name} type={type} placeholder={ph} value={form[name]} onChange={handle} style={{ width: '100%', padding: '10px 14px', border: '1.5px solid #FFE4EF', borderRadius: 10, fontSize: 14, color: '#2D1A26', outline: 'none', fontFamily: 'inherit' }} />
            </div>
          ))}
          <div style={{ marginBottom: 12 }}>
            <label style={{ fontSize: 12, fontWeight: 500, color: '#A07090', display: 'block', marginBottom: 5 }}>Kategori</label>
            <select name="cat" value={form.cat} onChange={handle} style={{ width: '100%', padding: '10px 14px', border: '1.5px solid #FFE4EF', borderRadius: 10, fontSize: 14, color: '#2D1A26', outline: 'none', fontFamily: 'inherit' }}>
              {cats.map(c => <option key={c.id} value={c.id}>{c.emoji} {c.label}</option>)}
            </select>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8, padding: '0 1.25rem 1.25rem' }}>
          <button onClick={() => onSave(form)} style={{ flex: 1, padding: 11, borderRadius: 50, border: 'none', background: 'linear-gradient(135deg,#FF6B9D,#FF8E53)', color: '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>💾 Kaydet</button>
          <button onClick={onClose} style={{ flex: 1, padding: 11, borderRadius: 50, border: 'none', background: '#FFF0F8', color: '#FF6B9D', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>İptal</button>
        </div>
      </div>
    </div>
  );
}
