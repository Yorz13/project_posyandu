// src/routes/WargaRoute.jsx
import { Routes, Route, Navigate } from 'react-router-dom';
import DashboardWarga from '../pages/warga/DashboardWarga';
import DataAnak from '../pages/warga/DataAnak';
import RiwayatImunisasi from '../pages/warga/RiwayatImunisasi';
import RiwayatPemeriksaan from '../pages/warga/RiwayatPemeriksaan';
import Profil from '../pages/warga/Profil';

const WargaRoute = () => {
  return (
    <Routes>
      <Route index element={<Navigate to="dashboard" replace />} />
      <Route path="dashboard" element={<DashboardWarga />} />
      <Route path="anak" element={<DataAnak />} />
      <Route path="imunisasi" element={<RiwayatImunisasi />} />
      <Route path="pemeriksaan" element={<RiwayatPemeriksaan />} />
      <Route path="profil" element={<Profil />} />
      <Route path="*" element={<Navigate to="dashboard" replace />} />
    </Routes>
  );
};

export default WargaRoute;