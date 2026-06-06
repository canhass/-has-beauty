import React from 'react';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ active }) => {
  const navigate = useNavigate();
  const items = [
    { path: '/admin', icon: '📊', label: 'Dashboard' },
    { path: '/admin/takvim', icon: '📅', label: 'Takvim' },
    { path: '/admin/rezervasyonlar', icon: '📋', label: 'Rezervasyonlar', badge: 4 },
    { path: '/admin/musteriler', icon: '👥', label: 'Müşteriler' },
    { path: '/admin/hizmetler', icon: '💆', label: 'Hizmetler' },
    { path: '/admin/sms', icon: '💬', label: 'SMS Geçmişi' },
  ];
  return (
    <div style={{ width: 200, flexShrink: 0, background: '#fff', borderRight: '1.5px solid #FFE4EF', display: 'flex', flexDirection: 'column', padding: '1.5rem 0', minHeight: '100vh' }}>
      <div style={{ fontFamily: 'Georgia, serif', fontSize: 18, fontWeight: 600, color: '#2D1A26', padding: '0 1.25rem 1.5rem', borderBottom: '1px solid #FFE4EF', marginBottom: '1rem' }}>
        Has <span style={{ background: 'linear-gradient(135deg,#FF6B9D,#FF8E53)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Beauty</span>
      </div>
      {items.map(item => (
        <div key={item.path} onClick={() => navigate(item.path)} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 1.25rem', fontSize: 13, color: active === item.path ? '#FF6B9D' : '#A07090', cursor: 'pointer', borderLeft: active === item.path ? '3px solid #FF6B9D' : '3px solid transparent', background: active === item.path ? '#FFF0F6' : 'transparent', fontWeight: active === item.path ? 500 : 400 }}>
          <span style={{ fontSize: 16, width: 20, textAlign: 'center' }}>{item.icon}</span>
          {item.label}
          {item.badge && <span style={{ marginLeft: 'auto', background: 'linear-gradient(135deg,#FF6B9D,#FF8E53)', color: '#fff', fontSize: 10, fontWeight: 700, padding: '2px 7px', borderRadius: 50 }}>{item.badge}</span>}
        </div>
      ))}
    </div>
  );
};

export { Sidebar };

const metrics = [
  { icon: '📅', label: 'Bugünkü Randevu', val: '8', sub: '↑ 2 dünden fazla', subColor: '#4CAF50' },
  { icon: '💰', label: 'Günlük Gelir', val: '₺9.450', sub: '↑ %18 bu hafta', subColor: '#4CAF50' },
  { icon: '⏳', label: 'Bekleyen Onay', val: '4', sub: 'Onay bekliyor', subColor: '#FF8E53' },
  { icon: '🎂', label: 'Bugün Doğum Günü', val: '2', sub: 'SMS gönderildi ✓', subColor: '#A07090' },
];

const bugunRandevular = [
  { initials: 'AY', color: 'linear-gradient(135deg,#FF6B9D,#FF8E53)', name: 'Ayşe Yılmaz', svc: '💅 Protez Tırnak + Cilt', time: '09:00', status: 'Onaylı', stColor: '#2E7D53', stBg: '#E8F8EF' },
  { initials: 'ZK', color: 'linear-gradient(135deg,#A78BFA,#818CF8)', name: 'Zeynep Kaya', svc: '⚡ Lazer Epilasyon', time: '10:30', status: 'Onaylı', stColor: '#2E7D53', stBg: '#E8F8EF' },
  { initials: 'FD', color: 'linear-gradient(135deg,#34D399,#059669)', name: 'Fatma Demir', svc: '👁️ Kirpik Lifting', time: '12:00', status: 'Beklemede', stColor: '#CC7700', stBg: '#FFF3E0' },
  { initials: 'MÇ', color: 'linear-gradient(135deg,#FBBF24,#F59E0B)', name: 'Merve Çelik', svc: '🌿 Cilt Bakımı', time: '14:00', status: 'Yeni', stColor: '#FF6B9D', stBg: '#FFE4EF' },
  { initials: 'SA', color: 'linear-gradient(135deg,#F472B6,#EC4899)', name: 'Selin Arslan', svc: '💄 Gelin Makyajı', time: '15:30', status: 'Yeni', stColor: '#FF6B9D', stBg: '#FFE4EF' },
];

const bdaylar = [
  { initials: 'AY', color: 'linear-gradient(135deg,#FF6B9D,#FF8E53)', name: 'Ayşe Yılmaz', tarih: '5 Haziran', tag: '🎂 Bugün', tagColor: '#FF6B9D', tagBg: '#FFE4EF' },
  { initials: 'MÇ', color: 'linear-gradient(135deg,#FBBF24,#F59E0B)', name: 'Merve Çelik', tarih: '5 Haziran', tag: '🎂 Bugün', tagColor: '#FF6B9D', tagBg: '#FFE4EF' },
  { initials: 'FD', color: 'linear-gradient(135deg,#34D399,#059669)', name: 'Fatma Demir', tarih: '8 Haziran', tag: '3 gün sonra', tagColor: '#CC7700', tagBg: '#FFF3E0' },
  { initials: 'ZK', color: 'linear-gradient(135deg,#A78BFA,#818CF8)', name: 'Zeynep Kaya', tarih: '12 Haziran', tag: '7 gün sonra', tagColor: '#CC7700', tagBg: '#FFF3E0' },
];

export default function Dashboard() {
  return (
    <div style={{ fontFamily: '-apple-system, SF Pro Display, sans-serif', background: '#FFF5F8', minHeight: '100vh', display: 'flex' }}>
      <Sidebar active="/admin" />
      <div style={{ flex: 1, overflow: 'auto', padding: '1.5rem' }}>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
          <div>
            <div style={{ fontFamily: 'Georgia, serif', fontSize: 22, fontWeight: 500, color: '#2D1A26' }}>Dashboard</div>
            <div style={{ fontSize: 13, color: '#A07090' }}>5 Haziran 2026, Cuma</div>
          </div>
          <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg,#FF6B9D,#FF8E53)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 600, color: '#fff' }}>HB</div>
        </div>

        {/* Metrikler */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12, marginBottom: '1.5rem' }}>
          {metrics.map(m => (
            <div key={m.label} style={{ background: '#fff', border: '1.5px solid #FFE4EF', borderRadius: 16, padding: '1rem' }}>
              <div style={{ fontSize: 22, marginBottom: 8 }}>{m.icon}</div>
              <div style={{ fontSize: 11, color: '#A07090', fontWeight: 500, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 4 }}>{m.label}</div>
              <div style={{ fontSize: 22, fontWeight: 700, color: '#2D1A26', lineHeight: 1 }}>{m.val}</div>
              <div style={{ fontSize: 11, color: m.subColor, marginTop: 4 }}>{m.sub}</div>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 12 }}>
          {/* Bugünkü randevular */}
          <div style={{ background: '#fff', border: '1.5px solid #FFE4EF', borderRadius: 16, padding: '1.1rem 1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: '#2D1A26' }}>Bugünkü Randevular</span>
              <span style={{ fontSize: 12, color: '#FF6B9D', cursor: 'pointer' }}>Tümünü gör →</span>
            </div>
            {bugunRandevular.map(r => (
              <div key={r.name} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 0', borderBottom: '1px solid #FFF0F5' }}>
                <div style={{ width: 34, height: 34, borderRadius: '50%', background: r.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: '#fff', flexShrink: 0 }}>{r.initials}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 500, color: '#2D1A26' }}>{r.name}</div>
                  <div style={{ fontSize: 11, color: '#A07090' }}>{r.svc}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 12, fontWeight: 500, color: '#2D1A26' }}>{r.time}</div>
                  <span style={{ fontSize: 10, fontWeight: 600, padding: '3px 8px', borderRadius: 50, background: r.stBg, color: r.stColor }}>{r.status}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Doğum günleri */}
          <div style={{ background: '#fff', border: '1.5px solid #FFE4EF', borderRadius: 16, padding: '1.1rem 1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: '#2D1A26' }}>Yaklaşan Doğum Günleri</span>
            </div>
            {bdaylar.map(b => (
              <div key={b.name} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderBottom: '1px solid #FFF0F5' }}>
                <div style={{ width: 32, height: 32, borderRadius: '50%', background: b.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: '#fff', flexShrink: 0 }}>{b.initials}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 500, color: '#2D1A26' }}>{b.name}</div>
                  <div style={{ fontSize: 11, color: '#A07090' }}>{b.tarih}</div>
                </div>
                <span style={{ fontSize: 10, fontWeight: 600, padding: '3px 8px', borderRadius: 50, background: b.tagBg, color: b.tagColor }}>{b.tag}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
