// src/routes/PublicRoute.jsx
import { Routes, Route, Navigate } from 'react-router-dom';

import Beranda from '../pages/Beranda';
import Layanan from '../pages/Layanan';
import Tentang from '../pages/Tentang';
import Informasi from '../pages/Informasi';
import Galeri from '../pages/Galeri';
import Kontak from '../pages/Kontak';

const PublicRoute = () => {
  return (
    <Routes>
      <Route index element={<Beranda />} />
      <Route path="layanan" element={<Layanan />} />
      <Route path="tentang" element={<Tentang />} />
      <Route path="informasi" element={<Informasi />} />
      <Route path="galeri" element={<Galeri />} />
      <Route path="kontak" element={<Kontak />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default PublicRoute;