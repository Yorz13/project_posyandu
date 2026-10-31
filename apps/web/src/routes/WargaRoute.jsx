// src/routes/WargaRoute.jsx
import { Routes, Route, Navigate } from 'react-router-dom';
import DashboardWarga from '../pages/warga/DashboardWarga';

const WargaRoute = () => {
  return (
    <Routes>
      <Route index element={<Navigate to="dashboard" replace />} />
      <Route path="dashboard" element={<DashboardWarga />} />
      {/* Tambahkan halaman lain di sini setelah dibuat:
      <Route path="anak" element={<DataAnak />} />
      <Route path="pemeriksaan" element={<RiwayatPemeriksaan />} />
      <Route path="imunisasi" element={<RiwayatImunisasi />} /> */}
      <Route path="*" element={<Navigate to="dashboard" replace />} />
    </Routes>
  );
};

export default WargaRoute;