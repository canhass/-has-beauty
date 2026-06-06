import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function BilgiOdeme() {
  const navigate = useNavigate();
  const tarih = localStorage.getItem('seciliTarih') || '';
  const saat = localStorage.getItem('seciliSaat') || '';
  const MONTHS_TR = ['Ocak','Şubat','Mart','Nisan','Mayıs','Haziran','Temmuz','Ağustos','Eylül','Ekim','Kasım','Aralık'];
  const tarihGoster = tarih ? `${tarih.split('-')[2]} ${MONTHS_TR[parseInt(tarih.split('-')[1]) - 1]} 2026` : '';

  const [odeme, setOdeme] = useState('kart');
  const [form, setForm] = useState({ ad: '', soyad: '', tel: '', email: '', dogum: '', kaynak: '', not: '', kartAd: '', kartNo: '', exp: '', cvv: '' });

  const handleInput = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const fmtKart = (v) => v.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1  ').trim();
  const fmtExp = (v) => { let c = v.replace(/\D/g, '').slice(0, 4); return c.length >= 3 ? c.slice(0, 2) + ' / ' + c.slice(2) : c; };

  const Input = ({ label, name, placeholder, type = 'text' }) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
      <label style={{ fontSize: 12, fontWeight: 500, color: '#A07090' }}>{label}</label>
      <input name={name} type={type} placeholder={placeholder} value={form[name]} onChange={handleInput} style={{ padding: '10px 14px', border: '1.5px solid #FFE4EF', borderRadius: 10, fontSize: 14, color: '#2D1A26', outline: 'none', fontFamily: 'inherit' }} />
    </div>
  );

  return (
    <div style={{ fontFamily: '-apple-system, SF Pro Display, sans-serif', background: '#FFF5F8', minHeight: '100vh' }}>
      <div style={{ background: 'linear-gradient(135deg,#FF6B9D,#FF8E53,#FFB347)', padding: '1.75rem 2rem' }}>
        <div style={{ fontFamily: 'Georgia, serif', fontSize: 30, fontWeight: 600, color: '#fff' }}>Has Beauty</div>
        <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.85)', letterSpacing: 2, textTransform: 'uppercase' }}>Online Randevu</div>
      </div>

      <div style={{ background: '#fff', borderBottom: '1px solid #FFE4EF', padding: '1rem 2rem', display: 'flex', gap: 8, alignItems: 'center', overflowX: 'auto' }}>
        {['Kategori', 'Hizmet', 'Tarih & Saat', 'Bilgi & Ödeme', 'Onay'].map((s, i) => (
          <React.Fragment key={i}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: i === 3 ? '#FF6B9D' : '#C9A0B0', fontWeight: i === 3 ? 600 : 400, whiteSpace: 'nowrap' }}>
              <div style={{ width: 22, height: 22, borderRadius: '50%', background: i === 3 ? 'linear-gradient(135deg,#FF6B9D,#FF8E53)' : i < 3 ? '#FFE4EF' : 'transparent', border: i < 3 ? '1.5px solid #FF6B9D' : i === 3 ? 'none' : '1.5px solid #FFB8D2', display: 'flex', alignItems: 'center', justifyContent: 'center', color: i === 3 ? '#fff' : i < 3 ? '#FF6B9D' : '#C9A0B0', fontSize: 11, fontWeight: 600 }}>
                {i < 3 ? '✓' : i + 1}
              </div>
              {s}
            </div>
            {i < 4 && <div style={{ width: 28, height: 1.5, background: '#FFE4EF', flexShrink: 0 }} />}
          </React.Fragment>
        ))}
      </div>

      <div style={{ padding: '1.75rem 2rem', maxWidth: 520, margin: '0 auto', paddingBottom: 100 }}>
        <div style={{ fontFamily: 'Georgia, serif', fontSize: 22, color: '#2D1A26', marginBottom: 4 }}>Bilgi & Ödeme 💳</div>
        <div style={{ fontSize: 13, color: '#A07090', marginBottom: 16 }}>Son adım — randevunuzu tamamlayın</div>

        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#FFF0F8', border: '1.5px solid #FFE4EF', borderRadius: 50, padding: '7px 16px', fontSize: 13, fontWeight: 500, color: '#FF6B9D', marginBottom: 16 }}>
          📅 {tarihGoster} · Saat {saat}
        </div>

        {/* Kişisel Bilgiler */}
        <div style={{ background: '#fff', border: '1.5px solid #FFE4EF', borderRadius: 18, padding: '1.25rem 1.5rem', marginBottom: 12 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#A07090', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 16 }}>👤 Kişisel Bilgiler</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
            <Input label="Ad" name="ad" placeholder="Adınız" />
            <Input label="Soyad" name="soyad" placeholder="Soyadınız" />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
            <Input label="Telefon" name="tel" placeholder="05XX XXX XX XX" type="tel" />
            <Input label="E-posta" name="email" placeholder="ornek@mail.com" type="email" />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
            <Input label="Doğum Tarihi" name="dogum" placeholder="" type="date" />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
              <label style={{ fontSize: 12, fontWeight: 500, color: '#A07090' }}>Nasıl duydunuz?</label>
              <select name="kaynak" value={form.kaynak} onChange={handleInput} style={{ padding: '10px 14px', border: '1.5px solid #FFE4EF', borderRadius: 10, fontSize: 14, color: '#2D1A26', outline: 'none', fontFamily: 'inherit' }}>
                <option value="">Seçiniz</option>
                <option>Instagram</option>
                <option>Google</option>
                <option>Arkadaş tavsiyesi</option>
                <option>Diğer</option>
              </select>
            </div>
          </div>
          <Input label="Not (opsiyonel)" name="not" placeholder="Özel istek veya notunuz..." />
        </div>

        {/* Sipariş Özeti */}
        <div style={{ background: '#fff', border: '1.5px solid #FFE4EF', borderRadius: 18, padding: '1.25rem 1.5rem', marginBottom: 12 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#A07090', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 12 }}>🧾 Sipariş Özeti</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #FFF0F5', fontSize: 13 }}>
            <div><div style={{ fontWeight: 500, color: '#2D1A26' }}>Seçilen Hizmetler</div><div style={{ fontSize: 11, color: '#A07090' }}>⏱ ~120 dk</div></div>
            <div style={{ fontWeight: 600, color: '#FF6B9D' }}>₺2.200</div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 12, fontSize: 15, fontWeight: 700 }}>
            <span style={{ color: '#2D1A26' }}>Toplam</span>
            <span style={{ background: 'linear-gradient(135deg,#FF6B9D,#FF8E53)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>₺2.200</span>
          </div>
        </div>

        {/* Ödeme */}
        <div style={{ background: '#fff', border: '1.5px solid #FFE4EF', borderRadius: 18, padding: '1.25rem 1.5rem', marginBottom: 12 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#A07090', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 16 }}>💳 Ödeme Yöntemi</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 16 }}>
            {[{ id: 'kart', icon: '💳', label: 'Kredi / Banka Kartı', sub: 'iyzico güvenceli' }, { id: 'havale', icon: '🏦', label: 'Havale / EFT', sub: 'Manuel onay' }].map(p => (
              <div key={p.id} onClick={() => setOdeme(p.id)} style={{ border: odeme === p.id ? '2px solid #FF6B9D' : '1.5px solid #FFE4EF', borderRadius: 12, padding: 12, cursor: 'pointer', textAlign: 'center', background: odeme === p.id ? '#FFF8FB' : '#fff' }}>
                <div style={{ fontSize: 22 }}>{p.icon}</div>
                <div style={{ fontSize: 12, fontWeight: 500, color: '#2D1A26', marginTop: 4 }}>{p.label}</div>
                <div style={{ fontSize: 11, color: '#A07090' }}>{p.sub}</div>
              </div>
            ))}
          </div>

          {odeme === 'kart' && (
            <div>
              <div style={{ marginBottom: 10 }}>
                <Input label="Kart Üzerindeki İsim" name="kartAd" placeholder="AD SOYAD" />
              </div>
              <div style={{ marginBottom: 10 }}>
                <label style={{ fontSize: 12, fontWeight: 500, color: '#A07090', display: 'block', marginBottom: 5 }}>Kart Numarası</label>
                <input name="kartNo" placeholder="0000  0000  0000  0000" value={form.kartNo} onChange={e => setForm({ ...form, kartNo: fmtKart(e.target.value) })} style={{ width: '100%', padding: '10px 14px', border: '1.5px solid #FFE4EF', borderRadius: 10, fontSize: 14, color: '#2D1A26', outline: 'none', fontFamily: 'inherit' }} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 500, color: '#A07090', display: 'block', marginBottom: 5 }}>Son Kullanma</label>
                  <input placeholder="AA / YY" value={form.exp} onChange={e => setForm({ ...form, exp: fmtExp(e.target.value) })} style={{ width: '100%', padding: '10px 14px', border: '1.5px solid #FFE4EF', borderRadius: 10, fontSize: 14, color: '#2D1A26', outline: 'none', fontFamily: 'inherit' }} />
                </div>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 500, color: '#A07090', display: 'block', marginBottom: 5 }}>CVV</label>
                  <input placeholder="•••" maxLength={3} style={{ width: '100%', padding: '10px 14px', border: '1.5px solid #FFE4EF', borderRadius: 10, fontSize: 14, color: '#2D1A26', outline: 'none', fontFamily: 'inherit' }} />
                </div>
              </div>
            </div>
          )}

          {odeme === 'havale' && (
            <div style={{ background: '#FFF8F0', border: '1.5px solid #FFE8CC', borderRadius: 12, padding: '1rem' }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#CC7700', marginBottom: 8 }}>Havale Bilgileri</div>
              <div style={{ fontSize: 13, color: '#2D1A26', lineHeight: 1.8 }}>
                Banka: <strong>Ziraat Bankası</strong><br />
                IBAN: <strong>TR12 0001 0023 4567 8901 2345 67</strong><br />
                Hesap Sahibi: <strong>Has Beauty Ltd.</strong>
              </div>
            </div>
          )}

          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: '#A07090', marginTop: 12 }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#4CAF50' }} />
            256-bit SSL şifreleme · iyzico güvenceli ödeme
          </div>
        </div>
      </div>

      <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, background: '#fff', borderTop: '1.5px solid #FFE4EF', padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 -4px 20px rgba(255,107,157,0.08)' }}>
        <div>
          <div style={{ fontSize: 11, color: '#A07090' }}>Ödenecek tutar</div>
          <div style={{ fontSize: 18, fontWeight: 700, background: 'linear-gradient(135deg,#FF6B9D,#FF8E53)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>₺2.200</div>
        </div>
        <button onClick={() => navigate('/success')} style={{ background: 'linear-gradient(135deg,#FF6B9D,#FF8E53)', color: '#fff', border: 'none', borderRadius: 50, padding: '13px 32px', fontSize: 15, fontWeight: 600, cursor: 'pointer', boxShadow: '0 4px 14px rgba(255,107,157,0.35)' }}>
          🔒 Ödemeyi Tamamla
        </button>
      </div>
    </div>
  );
}