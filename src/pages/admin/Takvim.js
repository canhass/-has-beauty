import React, { useState } from 'react';
import { Sidebar } from './Dashboard';

const MONTHS_TR = ['Ocak','Şubat','Mart','Nisan','Mayıs','Haziran','Temmuz','Ağustos','Eylül','Ekim','Kasım','Aralık'];
const DAYS_TR = ['Pzt','Sal','Çar','Per','Cum','Cmt'];
const HOURS = [9,10,11,12,13,14,15,16,17,18];
const SLOT_H = 52;

const APPTS = [
  {id:1,dayIdx:3,startH:9,startM:0,dur:90,name:'Ayşe Yılmaz',initials:'AY',color:'linear-gradient(135deg,#FF6B9D,#FF8E53)',svc:'💅 Fransız Manikür',phone:'0532 411 22 47',amount:1800,status:'confirmed'},
  {id:2,dayIdx:3,startH:10,startM:30,dur:60,name:'Zeynep Kaya',initials:'ZK',color:'linear-gradient(135deg,#A78BFA,#818CF8)',svc:'⚡ Lazer Epilasyon',phone:'0541 333 88 12',amount:2500,status:'confirmed'},
  {id:3,dayIdx:3,startH:12,startM:0,dur:45,name:'Fatma Demir',initials:'FD',color:'linear-gradient(135deg,#34D399,#059669)',svc:'👁️ Kirpik Lifting',phone:'0505 222 66 31',amount:750,status:'pending'},
  {id:4,dayIdx:3,startH:14,startM:0,dur:60,name:'Merve Çelik',initials:'MÇ',color:'linear-gradient(135deg,#FBBF24,#F59E0B)',svc:'🌿 Cilt Bakımı',phone:'0533 555 77 90',amount:1350,status:'new'},
  {id:5,dayIdx:3,startH:15,startM:30,dur:90,name:'Selin Arslan',initials:'SA',color:'linear-gradient(135deg,#F472B6,#EC4899)',svc:'💄 Gelin Makyajı',phone:'0542 888 44 23',amount:2500,status:'new'},
  {id:6,dayIdx:4,startH:10,startM:0,dur:60,name:'Büşra Yıldız',initials:'BÜ',color:'linear-gradient(135deg,#60A5FA,#3B82F6)',svc:'💅 Akrilik + Kaş',phone:'0531 666 11 58',amount:1600,status:'confirmed'},
  {id:7,dayIdx:4,startH:11,startM:30,dur:45,name:'Nihan Öztürk',initials:'NÖ',color:'linear-gradient(135deg,#FF6B9D,#FF8E53)',svc:'⚡ Lazer Koltuk',phone:'0544 777 33 19',amount:600,status:'confirmed'},
  {id:8,dayIdx:5,startH:13,startM:0,dur:60,name:'Elif Şahin',initials:'EŞ',color:'linear-gradient(135deg,#34D399,#059669)',svc:'🕯️ Aromaterapi',phone:'0536 999 55 84',amount:1100,status:'confirmed'},
  {id:9,dayIdx:1,startH:11,startM:0,dur:60,name:'Hande Koç',initials:'HK',color:'linear-gradient(135deg,#FBBF24,#F59E0B)',svc:'🌿 Kimyasal Peeling',phone:'0541 333 66 52',amount:1200,status:'confirmed'},
];

const BASE = new Date(2026,5,2);

export default function Takvim() {
  const [weekOffset, setWeekOffset] = useState(0);
  const [view, setView] = useState('week');
  const [selDay, setSelDay] = useState(3);
  const [modal, setModal] = useState(null);

  const dates = Array.from({length:6},(_,i)=>{
    const d = new Date(BASE);
    d.setDate(BASE.getDate() + weekOffset*7 + i);
    return d;
  });

  const today = new Date(2026,5,5);
  const d1 = dates[0], d2 = dates[5];
  const weekLabel = `${d1.getDate()} ${MONTHS_TR[d1.getMonth()]} – ${d2.getDate()} ${MONTHS_TR[d2.getMonth()]} ${d2.getFullYear()}`;

  const minToTop = (h,m) => ((h - 9)*60 + m) / 60 * SLOT_H;
  const durToH = (dur) => Math.max(dur / 60 * SLOT_H, 28);

  return (
    <div style={{ fontFamily: '-apple-system, SF Pro Display, sans-serif', background: '#FFF5F8', minHeight: '100vh', display: 'flex' }}>
      <Sidebar active="/admin/takvim" />
      <div style={{ flex: 1, overflow: 'auto', padding: '1.5rem', minWidth: 0, display: 'flex', flexDirection: 'column' }}>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem', flexWrap: 'wrap', gap: 10 }}>
          <div>
            <div style={{ fontFamily: 'Georgia, serif', fontSize: 22, fontWeight: 500, color: '#2D1A26' }}>Takvim</div>
            <div style={{ fontSize: 13, color: '#A07090' }}>5 Haziran 2026</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
            <button onClick={() => setWeekOffset(w => w-1)} style={{ width:34,height:34,borderRadius:'50%',border:'1.5px solid #FFE4EF',background:'#fff',cursor:'pointer',fontSize:18,color:'#FF6B9D',display:'flex',alignItems:'center',justifyContent:'center' }}>‹</button>
            <span style={{ fontSize:13,fontWeight:600,color:'#2D1A26',minWidth:180,textAlign:'center' }}>{weekLabel}</span>
            <button onClick={() => setWeekOffset(w => w+1)} style={{ width:34,height:34,borderRadius:'50%',border:'1.5px solid #FFE4EF',background:'#fff',cursor:'pointer',fontSize:18,color:'#FF6B9D',display:'flex',alignItems:'center',justifyContent:'center' }}>›</button>
            <div style={{ display:'flex',border:'1.5px solid #FFE4EF',borderRadius:50,overflow:'hidden',background:'#fff' }}>
              {['week','day'].map(v => (
                <button key={v} onClick={() => setView(v)} style={{ padding:'7px 16px',fontSize:12,fontWeight:500,cursor:'pointer',border:'none',background: view===v ? 'linear-gradient(135deg,#FF6B9D,#FF8E53)' : 'transparent',color: view===v ? '#fff' : '#A07090',fontFamily:'inherit' }}>
                  {v==='week' ? 'Haftalık' : 'Günlük'}
                </button>
              ))}
            </div>
            <div style={{ width:36,height:36,borderRadius:'50%',background:'linear-gradient(135deg,#FF6B9D,#FF8E53)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:13,fontWeight:600,color:'#fff' }}>HB</div>
          </div>
        </div>

        {view === 'week' ? (
          <div style={{ background:'#fff',border:'1.5px solid #FFE4EF',borderRadius:18,overflow:'hidden',flex:1 }}>
            <div style={{ display:'grid',gridTemplateColumns:'56px repeat(6,1fr)',borderBottom:'1.5px solid #FFE4EF' }}>
              <div style={{ borderRight:'1px solid #FFE4EF' }} />
              {dates.map((d,i) => (
                <div key={i} style={{ padding:'10px 6px',textAlign:'center',borderRight: i<5 ? '1px solid #FFF0F5' : 'none' }}>
                  <div style={{ fontSize:11,fontWeight:600,color:'#A07090',textTransform:'uppercase',letterSpacing:0.5 }}>{DAYS_TR[i]}</div>
                  <div style={{ fontSize:16,fontWeight:600,color: d.toDateString()===today.toDateString() ? '#fff' : '#2D1A26',width:28,height:28,borderRadius:'50%',background: d.toDateString()===today.toDateString() ? 'linear-gradient(135deg,#FF6B9D,#FF8E53)' : 'transparent',display:'flex',alignItems:'center',justifyContent:'center',margin:'2px auto 0' }}>{d.getDate()}</div>
                </div>
              ))}
            </div>
            <div style={{ display:'grid',gridTemplateColumns:'56px repeat(6,1fr)',overflowY:'auto',maxHeight:380 }}>
              <div>
                {HOURS.map(h => <div key={h} style={{ height:SLOT_H,display:'flex',alignItems:'flex-start',justifyContent:'flex-end',padding:'4px 8px 0 0',fontSize:10,color:'#C9A0B0',borderRight:'1px solid #FFE4EF',flexShrink:0 }}>{h}:00</div>)}
              </div>
              {dates.map((_,di) => (
                <div key={di} style={{ position:'relative',borderRight: di<5 ? '1px solid #FFF0F5' : 'none',minHeight: SLOT_H*HOURS.length }}>
                  {HOURS.map((_,i) => <div key={i} style={{ position:'absolute',left:0,right:0,height:1,background:'#FFF0F5',top: i*SLOT_H }} />)}
                  {APPTS.filter(a => a.dayIdx===di).map(a => (
                    <div key={a.id} onClick={() => setModal(a)} style={{ position:'absolute',left:2,right:2,top: minToTop(a.startH,a.startM),height: durToH(a.dur),borderRadius:8,background:a.color,padding:'4px 6px',cursor:'pointer',overflow:'hidden',zIndex:1 }}>
                      <div style={{ fontSize:11,fontWeight:600,color:'#fff',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis' }}>{a.initials} {a.name.split(' ')[0]}</div>
                      <div style={{ fontSize:10,color:'rgba(255,255,255,0.85)',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis' }}>{a.svc}</div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div>
            <div style={{ display:'flex',gap:8,marginBottom:12,flexWrap:'wrap' }}>
              {dates.map((d,i) => (
                <button key={i} onClick={() => setSelDay(i)} style={{ padding:'6px 12px',borderRadius:50,border: i===selDay ? 'none' : '1.5px solid #FFE4EF',background: i===selDay ? 'linear-gradient(135deg,#FF6B9D,#FF8E53)' : '#fff',color: i===selDay ? '#fff' : '#A07090',fontSize:12,fontWeight:500,cursor:'pointer',fontFamily:'inherit' }}>
                  {DAYS_TR[i]} {d.getDate()}
                </button>
              ))}
            </div>
            <div style={{ background:'#fff',border:'1.5px solid #FFE4EF',borderRadius:18,overflow:'hidden' }}>
              <div style={{ padding:'1rem 1.25rem',borderBottom:'1.5px solid #FFE4EF',display:'flex',justifyContent:'space-between',alignItems:'center' }}>
                <span style={{ fontFamily:'Georgia,serif',fontSize:16,fontWeight:500,color:'#2D1A26' }}>{dates[selDay]?.getDate()} {MONTHS_TR[dates[selDay]?.getMonth()]}</span>
                <span style={{ fontSize:13,color:'#A07090' }}>{APPTS.filter(a=>a.dayIdx===selDay).length} randevu</span>
              </div>
              <div style={{ display:'grid',gridTemplateColumns:'56px 1fr',overflowY:'auto',maxHeight:420 }}>
                <div>{HOURS.map(h => <div key={h} style={{ height:SLOT_H,display:'flex',alignItems:'flex-start',justifyContent:'flex-end',padding:'4px 8px 0 0',fontSize:10,color:'#C9A0B0',borderRight:'1px solid #FFE4EF' }}>{h}:00</div>)}</div>
                <div style={{ position:'relative',minHeight: SLOT_H*HOURS.length }}>
                  {HOURS.map((_,i) => <div key={i} style={{ position:'absolute',left:0,right:0,height:1,background:'#FFF0F5',top: i*SLOT_H }} />)}
                  {APPTS.filter(a=>a.dayIdx===selDay).map(a => (
                    <div key={a.id} onClick={() => setModal(a)} style={{ position:'absolute',left:4,right:4,top: minToTop(a.startH,a.startM),height: durToH(a.dur),borderRadius:10,background:a.color,padding:'8px 12px',cursor:'pointer' }}>
                      <div style={{ fontSize:13,fontWeight:600,color:'#fff' }}>{a.name}</div>
                      <div style={{ fontSize:11,color:'rgba(255,255,255,0.85)' }}>{a.svc} · {a.startH}:{String(a.startM).padStart(2,'0')}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {modal && (
        <div onClick={() => setModal(null)} style={{ position:'fixed',inset:0,background:'rgba(45,26,38,0.4)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:100,padding:'1rem' }}>
          <div onClick={e => e.stopPropagation()} style={{ background:'#fff',borderRadius:20,width:'100%',maxWidth:360,overflow:'hidden',boxShadow:'0 20px 60px rgba(255,107,157,0.2)' }}>
            <div style={{ background:modal.color,padding:'1.25rem 1.5rem',display:'flex',alignItems:'center',gap:12 }}>
              <div style={{ width:44,height:44,borderRadius:'50%',background:'rgba(255,255,255,0.25)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:14,fontWeight:700,color:'#fff' }}>{modal.initials}</div>
              <div>
                <div style={{ fontSize:15,fontWeight:600,color:'#fff' }}>{modal.name}</div>
                <div style={{ fontSize:12,color:'rgba(255,255,255,0.85)' }}>{modal.phone}</div>
              </div>
            </div>
            <div style={{ padding:'1.25rem' }}>
              {[['💆 Hizmet',modal.svc],['⏰ Saat',`${modal.startH}:${String(modal.startM).padStart(2,'0')}`],['⏱ Süre',`${modal.dur} dk`],['💰 Tutar',`₺${modal.amount.toLocaleString('tr-TR')}`]].map(([l,v]) => (
                <div key={l} style={{ display:'flex',justifyContent:'space-between',padding:'7px 0',borderBottom:'1px solid #FFF0F5',fontSize:13 }}>
                  <span style={{ color:'#A07090' }}>{l}</span>
                  <span style={{ fontWeight:500,color:'#2D1A26' }}>{v}</span>
                </div>
              ))}
            </div>
            <div style={{ padding:'0 1.25rem 1.25rem',display:'flex',gap:8 }}>
              <button onClick={() => setModal(null)} style={{ flex:1,padding:10,borderRadius:50,border:'none',background:'linear-gradient(135deg,#FF6B9D,#FF8E53)',color:'#fff',fontSize:12,fontWeight:600,cursor:'pointer',fontFamily:'inherit' }}>Kapat</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
