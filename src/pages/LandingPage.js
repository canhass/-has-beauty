import React from 'react';
import { useNavigate } from 'react-router-dom';

const hizmetler = [
  { isim: 'Protez Tırnak', emoji: '💅', adet: 8, bg: '#FFE4EF' },
  { isim: 'Cilt Bakımı', emoji: '🌿', adet: 12, bg: '#D6F5F0' },
  { isim: 'Lazer Epilasyon', emoji: '⚡', adet: 6, bg: '#F0E6FF' },
  { isim: 'Kaş & Kirpik', emoji: '👁️', adet: 9, bg: '#FFD6E0' },
  { isim: 'Masaj & SPA', emoji: '🕯️', adet: 7, bg: '#FFF4CC' },
  { isim: 'Makyaj', emoji: '💄', adet: 5, bg: '#FFE8D6' },
  { isim: 'Saç Bakımı', emoji: '✂️', adet: 10, bg: '#D6EEFF' },
  { isim: 'Kalıcı Makyaj', emoji: '🎨', adet: 4, bg: '#D6FFE8' },
];

const yorumlar = [
  { initials: 'AY', color: 'linear-gradient(135deg,#FF6B9D,#FF8E53)', isim: 'Ayşe Y.', tarih: '2 gün önce', yorum: 'Harika bir deneyimdi! Tırnak tasarımım muhteşem oldu, kesinlikle tavsiye ederim.' },
  { initials: 'ZK', color: 'linear-gradient(135deg,#A78BFA,#818CF8)', isim: 'Zeynep K.', tarih: '1 hafta önce', yorum: 'Online randevu sistemi çok pratik. Lazer seanslarımda çok memnun kaldım.' },
  { initials: 'SA', color: 'linear-gradient(135deg,#34D399,#059669)', isim: 'Selin A.', tarih: '2 hafta önce', yorum: 'Gelin makyajım için doğru adresi buldum. Ekip çok profesyonel ve ilgili.' },
];

const ozellikler = [
  { icon: '📱', baslik: 'Online Randevu', aciklama: '7/24 online randevu al, beklemeden planla.' },
  { icon: '👩‍⚕️', baslik: 'Uzman Ekip', aciklama: 'Alanında uzman, sertifikalı güzellik uzmanları.' },
  { icon: '✨', baslik: 'Premium Ürünler', aciklama: 'Yalnızca onaylı, kaliteli markalar kullanıyoruz.' },
  { icon: '🎂', baslik: 'Doğum Günü Sürprizi', aciklama: 'Doğum günündeki müşterilerimize özel indirim.' },
];

export default function LandingPage() {
  const navigate = useNavigate();

  const s = {
    root: { fontFamily: '-apple-system, SF Pro Display, BlinkMacSystemFont, sans-serif', background: '#fff' },
    nav: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.25rem 2rem', background: '#fff', borderBottom: '1px solid #FFE4EF', position: 'sticky', top: 0, zIndex: 50 },
    logo: { fontFamily: 'Georgia, serif', fontSize: 22, fontWeight: 600, color: '#2D1A26' },
    navLinks: { display: 'flex', gap: 24, alignItems: 'center' },
    navLink: { fontSize: 13, color: '#A07090', cursor: 'pointer', textDecoration: 'none' },
    navBtn: { background: 'linear-gradient(135deg,#FF6B9D,#FF8E53)', color: '#fff', border: 'none', borderRadius: 50, padding: '9px 22px', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' },
    hero: { padding: '4rem 2rem 3rem', textAlign: 'center', background: 'linear-gradient(180deg,#FFF5F8 0%,#fff 100%)' },
    heroTag: { display: 'inline-block', background: '#FFE4EF', color: '#FF6B9D', fontSize: 12, fontWeight: 600, padding: '6px 16px', borderRadius: 50, marginBottom: '1.25rem' },
    heroTitle: { fontFamily: 'Georgia, serif', fontSize: 42, fontWeight: 700, color: '#2D1A26', lineHeight: 1.2, marginBottom: '1rem' },
    heroSub: { fontSize: 16, color: '#A07090', lineHeight: 1.7, maxWidth: 500, margin: '0 auto 2rem' },
    heroBtns: { display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' },
    btnPrimary: { background: 'linear-gradient(135deg,#FF6B9D,#FF8E53)', color: '#fff', border: 'none', borderRadius: 50, padding: '14px 32px', fontSize: 15, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', boxShadow: '0 4px 20px rgba(255,107,157,0.3)' },
    btnSecondary: { background: '#fff', color: '#FF6B9D', border: '1.5px solid #FFE4EF', borderRadius: 50, padding: '14px 32px', fontSize: 15, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' },
    stats: { display: 'flex', justifyContent: 'center', gap: 32, marginTop: '2.5rem', flexWrap: 'wrap' },
    section: { padding: '3rem 2rem' },
    sectionCenter: { textAlign: 'center', marginBottom: '2rem' },
    sectionTag: { display: 'inline-block', background: '#FFE4EF', color: '#FF6B9D', fontSize: 11, fontWeight: 600, padding: '5px 14px', borderRadius: 50, marginBottom: 12, letterSpacing: '0.5px', textTransform: 'uppercase' },
    sectionTitle: { fontFamily: 'Georgia, serif', fontSize: 28, fontWeight: 600, color: '#2D1A26', marginBottom: 8 },
    sectionSub: { fontSize: 14, color: '#A07090', maxWidth: 420, margin: '0 auto' },
    grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: 12, maxWidth: 720, margin: '0 auto' },
    svcCard: { background: '#fff', border: '1.5px solid #FFE4EF', borderRadius: 16, padding: '1.25rem 1rem', textAlign: 'center', cursor: 'pointer' },
    featGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16, maxWidth: 720, margin: '0 auto' },
    featCard: { background: '#FFF5F8', borderRadius: 16, padding: '1.25rem' },
    testGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 16, maxWidth: 720, margin: '0 auto' },
    testCard: { background: '#fff', border: '1.5px solid #FFE4EF', borderRadius: 16, padding: '1.25rem' },
    cta: { background: 'linear-gradient(135deg,#FF6B9D,#FF8E53)', padding: '3rem 2rem', textAlign: 'center' },
    footer: { background: '#2D1A26', padding: '2rem', textAlign: 'center' },
  };

  return (
    <div style={s.root}>
      {/* Nav */}
      <nav style={s.nav}>
        <div style={s.logo}>Has <span style={{ color: '#FF6B9D' }}>Beauty</span></div>
        <div style={s.navLinks}>
          <a style={s.navLink}>Hizmetler</a>
          <a style={s.navLink}>Hakkımızda</a>
          <a style={s.navLink}>İletişim</a>
          <button style={s.navBtn} onClick={() => navigate('/randevu')}>Randevu Al</button>
        </div>
      </nav>

      {/* Hero */}
      <section style={s.hero}>
        <div style={s.heroTag}>✦ İzmir'in En Seçkin Güzellik Merkezi</div>
        <h1 style={s.heroTitle}>Güzelliğini<br /><span style={{ color: '#FF6B9D' }}>Bizimle Keşfet</span></h1>
        <p style={s.heroSub}>Uzman kadromuz ve modern ekipmanlarımızla sana özel bakım deneyimi sunuyoruz.</p>
        <div style={s.heroBtns}>
          <button style={s.btnPrimary} onClick={() => navigate('/randevu')}>✨ Hemen Randevu Al</button>
          <button style={s.btnSecondary}>Hizmetlerimizi Gör</button>
        </div>
        <div style={s.stats}>
          {[['2.400+', 'Mutlu Müşteri'], ['8', 'Hizmet Kategorisi'], ['5★', 'Google Puanı'], ['7 Yıl', 'Deneyim']].map(([num, label]) => (
            <div key={label} style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: 'Georgia, serif', fontSize: 28, fontWeight: 700, color: '#2D1A26' }}>{num}</div>
              <div style={{ fontSize: 12, color: '#A07090', marginTop: 2 }}>{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Hizmetler */}
      <section style={s.section}>
        <div style={s.sectionCenter}>
          <div style={s.sectionTag}>Hizmetlerimiz</div>
          <div style={s.sectionTitle}>Ne Yapmak İstersin?</div>
          <div style={s.sectionSub}>8 farklı kategoride profesyonel güzellik hizmetleri</div>
        </div>
        <div style={s.grid}>
          {hizmetler.map(h => (
            <div key={h.isim} onClick={() => navigate('/randevu')} style={s.svcCard}>
              <div style={{ width: 48, height: 48, borderRadius: 14, background: h.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, margin: '0 auto 10px' }}>{h.emoji}</div>
              <div style={{ fontSize: 13, fontWeight: 500, color: '#2D1A26', marginBottom: 3 }}>{h.isim}</div>
              <div style={{ fontSize: 11, color: '#A07090' }}>{h.adet} hizmet</div>
            </div>
          ))}
        </div>
      </section>

      {/* Özellikler */}
      <section style={{ ...s.section, background: '#FFF5F8' }}>
        <div style={s.sectionCenter}>
          <div style={s.sectionTag}>Neden Biz?</div>
          <div style={s.sectionTitle}>Has Beauty Farkı</div>
        </div>
        <div style={s.featGrid}>
          {ozellikler.map(o => (
            <div key={o.baslik} style={s.featCard}>
              <div style={{ fontSize: 28, marginBottom: 10 }}>{o.icon}</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: '#2D1A26', marginBottom: 6 }}>{o.baslik}</div>
              <div style={{ fontSize: 13, color: '#A07090', lineHeight: 1.6 }}>{o.aciklama}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Yorumlar */}
      <section style={{ ...s.section, background: '#FFF5F8' }}>
        <div style={s.sectionCenter}>
          <div style={s.sectionTag}>Yorumlar</div>
          <div style={s.sectionTitle}>Müşterilerimiz Ne Diyor?</div>
        </div>
        <div style={s.testGrid}>
          {yorumlar.map(y => (
            <div key={y.isim} style={s.testCard}>
              <div style={{ color: '#FFB347', fontSize: 14, marginBottom: 10 }}>★★★★★</div>
              <p style={{ fontSize: 13, color: '#2D1A26', lineHeight: 1.6, marginBottom: 12, fontStyle: 'italic' }}>"{y.yorum}"</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 32, height: 32, borderRadius: '50%', background: y.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: '#fff' }}>{y.initials}</div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 500, color: '#2D1A26' }}>{y.isim}</div>
                  <div style={{ fontSize: 11, color: '#A07090' }}>{y.tarih}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={s.cta}>
        <div style={{ fontFamily: 'Georgia, serif', fontSize: 28, fontWeight: 600, color: '#fff', marginBottom: 10 }}>Randevunu Hemen Al!</div>
        <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.85)', marginBottom: '1.75rem' }}>Online randevu sistemiyle kolayca zaman ayırt, biz gerisini halledelim.</p>
        <button onClick={() => navigate('/randevu')} style={{ background: '#fff', color: '#FF6B9D', border: 'none', borderRadius: 50, padding: '14px 36px', fontSize: 15, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>✨ Randevu Al →</button>
      </section>

      {/* Footer */}
      <footer style={s.footer}>
        <div style={{ fontFamily: 'Georgia, serif', fontSize: 20, fontWeight: 600, color: '#fff', marginBottom: 8 }}>Has <span style={{ color: '#FF6B9D' }}>Beauty</span></div>
        <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>© 2026 Has Beauty. Tüm hakları saklıdır.</p>
      </footer>
    </div>
  );
}