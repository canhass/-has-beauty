import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Success() {
  const navigate = useNavigate();
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const colors = ['#FF6B9D','#FF8E53','#FFB347','#FFD1E8','#A78BFA','#34D399','#60A5FA'];
    const pieces = Array.from({ length: 120 }, () => ({
      x: Math.random() * canvas.width,
      y: -20 - Math.random() * 200,
      w: 6 + Math.random() * 8,
      h: 6 + Math.random() * 8,
      color: colors[Math.floor(Math.random() * colors.length)],
      rot: Math.random() * 360,
      vx: (Math.random() - 0.5) * 4,
      vy: 2 + Math.random() * 4,
      vr: (Math.random() - 0.5) * 8,
      alpha: 1,
    }));
    let frame = 0;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let alive = false;
      pieces.forEach(p => {
        p.x += p.vx; p.y += p.vy; p.rot += p.vr;
        if (p.y > canvas.height * 0.7) p.alpha -= 0.025;
        if (p.alpha > 0) {
          alive = true;
          ctx.save();
          ctx.globalAlpha = Math.max(0, p.alpha);
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rot * Math.PI / 180);
          ctx.fillStyle = p.color;
          ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
          ctx.restore();
        }
      });
      frame++;
      if (alive && frame < 180) requestAnimationFrame(animate);
      else ctx.clearRect(0, 0, canvas.width, canvas.height);
    };
    setTimeout(animate, 300);
  }, []);

  const tarih = localStorage.getItem('seciliTarih') || '';
  const saat = localStorage.getItem('seciliSaat') || '';
  const MONTHS_TR = ['Ocak','Şubat','Mart','Nisan','Mayıs','Haziran','Temmuz','Ağustos','Eylül','Ekim','Kasım','Aralık'];
  const tarihGoster = tarih ? `${tarih.split('-')[2]} ${MONTHS_TR[parseInt(tarih.split('-')[1]) - 1]} 2026` : '';

  return (
    <div style={{ fontFamily: '-apple-system, SF Pro Display, sans-serif', background: '#FFF5F8', minHeight: '100vh' }}>
      <canvas ref={canvasRef} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 999 }} />

      <div style={{ background: 'linear-gradient(135deg,#FF6B9D,#FF8E53,#FFB347)', padding: '1.75rem 2rem' }}>
        <div style={{ fontFamily: 'Georgia, serif', fontSize: 30, fontWeight: 600, color: '#fff' }}>Has Beauty</div>
        <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.85)', letterSpacing: 2, textTransform: 'uppercase' }}>Online Randevu</div>
      </div>

      <div style={{ background: '#fff', borderBottom: '1px solid #FFE4EF', padding: '1rem 2rem', display: 'flex', gap: 8, alignItems: 'center', overflowX: 'auto' }}>
        {['Kategori', 'Hizmet', 'Tarih & Saat', 'Bilgi & Ödeme', 'Onay'].map((s, i) => (
          <React.Fragment key={i}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#FF6B9D', fontWeight: 500, whiteSpace: 'nowrap' }}>
              <div style={{ width: 22, height: 22, borderRadius: '50%', background: '#FFE4EF', border: '1.5px solid #FF6B9D', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FF6B9D', fontSize: 11, fontWeight: 600 }}>✓</div>
              {s}
            </div>
            {i < 4 && <div style={{ width: 28, height: 1.5, background: '#FFE4EF', flexShrink: 0 }} />}
          </React.Fragment>
        ))}
      </div>

      <div style={{ padding: '2rem', maxWidth: 520, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <div style={{ width: 90, height: 90, borderRadius: '50%', background: 'linear-gradient(135deg,#FF6B9D,#FF8E53)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 40, margin: '0 auto 16px', boxShadow: '0 8px 32px rgba(255,107,157,0.35)' }}>✓</div>
          <div style={{ fontFamily: 'Georgia, serif', fontSize: 26, fontWeight: 600, color: '#2D1A26', marginBottom: 8 }}>Randevunuz onaylandı! 🎉</div>
          <div style={{ fontSize: 14, color: '#A07090', lineHeight: 1.6 }}>Ödemeniz alındı ve randevunuz başarıyla oluşturuldu.<br />SMS ile bilgilendirme gönderildi.</div>
          <div style={{ display: 'inline-block', background: 'linear-gradient(135deg,rgba(255,107,157,0.1),rgba(255,179,71,0.1))', border: '1.5px solid #FFE4EF', borderRadius: 50, padding: '8px 20px', fontSize: 13, fontWeight: 600, color: '#FF6B9D', margin: '16px 0' }}>
            Rezervasyon No: #HB-2026-4872
          </div>
        </div>

        <div style={{ background: '#fff', border: '1.5px solid #FFE4EF', borderRadius: 18, padding: '1.25rem 1.5rem', marginBottom: 12 }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: '#A07090', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 12 }}>📋 Randevu Detayları</div>
          {[
            { label: '📅 Tarih', val: tarihGoster },
            { label: '⏰ Saat', val: saat },
            { label: '⏱ Süre', val: '~120 dk' },
            { label: '💳 Ödeme', val: '✓ ₺2.200 Alındı' },
          ].map(r => (
            <div key={r.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #FFF0F5', fontSize: 13 }}>
              <span style={{ color: '#A07090' }}>{r.label}</span>
              <span style={{ fontWeight: 500, color: r.label.includes('Ödeme') ? '#4CAF50' : '#2D1A26' }}>{r.val}</span>
            </div>
          ))}
        </div>

        <div style={{ background: 'linear-gradient(135deg,rgba(255,107,157,0.06),rgba(255,179,71,0.06))', border: '1.5px solid #FFE4EF', borderRadius: 18, padding: '1.1rem 1.5rem', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ width: 44, height: 44, borderRadius: 12, background: 'linear-gradient(135deg,#FF6B9D,#FF8E53)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>💬</div>
          <div style={{ fontSize: 13, color: '#2D1A26', lineHeight: 1.5 }}>
            <strong style={{ color: '#FF6B9D' }}>SMS gönderildi!</strong><br />
            Randevu onay mesajı telefonunuza iletildi. 24 saat önce hatırlatma alacaksınız.
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          <button style={{ padding: 11, borderRadius: 50, border: '1.5px solid #FFE4EF', background: '#fff', fontSize: 13, fontWeight: 500, color: '#FF6B9D', cursor: 'pointer', fontFamily: 'inherit' }}>📅 Takvime Ekle</button>
          <button onClick={() => navigate('/')} style={{ padding: 11, borderRadius: 50, border: 'none', background: 'linear-gradient(135deg,#FF6B9D,#FF8E53)', fontSize: 13, fontWeight: 600, color: '#fff', cursor: 'pointer', fontFamily: 'inherit', boxShadow: '0 4px 14px rgba(255,107,157,0.3)' }}>🏠 Ana Sayfaya Dön</button>
        </div>
      </div>
    </div>
  );
}