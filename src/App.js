import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LandingPage from './pages/LandingPage';
import KategoriSec from './pages/customer/KategoriSec';
import HizmetSec from './pages/customer/HizmetSec';
import TarihSaat from './pages/customer/TarihSaat';
import BilgiOdeme from './pages/customer/BilgiOdeme';
import Success from './pages/customer/Success';

import Dashboard from './pages/admin/Dashboard';
import Rezervasyonlar from './pages/admin/Rezervasyonlar';
import Musteriler from './pages/admin/Musteriler';
import Hizmetler from './pages/admin/Hizmetler';
import Takvim from './pages/admin/Takvim';
import SmsGecmisi from './pages/admin/SmsGecmisi';

function App() {
  return (
    <Router>
      <Routes>
        {/* Ana Sayfa */}
        <Route path="/" element={<LandingPage />} />

        {/* Randevu Akışı */}
        <Route path="/randevu" element={<KategoriSec />} />
        <Route path="/hizmet" element={<HizmetSec />} />
        <Route path="/tarih" element={<TarihSaat />} />
        <Route path="/odeme" element={<BilgiOdeme />} />
        <Route path="/success" element={<Success />} />

        {/* Admin */}
        <Route path="/admin" element={<Dashboard />} />
        <Route path="/admin/rezervasyonlar" element={<Rezervasyonlar />} />
        <Route path="/admin/musteriler" element={<Musteriler />} />
        <Route path="/admin/hizmetler" element={<Hizmetler />} />
        <Route path="/admin/takvim" element={<Takvim />} />
        <Route path="/admin/sms" element={<SmsGecmisi />} />
      </Routes>
    </Router>
  );
}

export default App;