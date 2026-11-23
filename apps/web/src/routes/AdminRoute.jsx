import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from '../pages/admin/DashboardAdmin';
import DataKader from '../pages/admin/DataKader';
import DataBalita from '../pages/admin/DataBalita';
import Imunisasi from '../pages/admin/Imunisasi';
import Laporan from '../pages/admin/Laporan';
import Monitoring from '../pages/admin/Monitoring';
import Pemeriksaan from '../pages/admin/Pemeriksaan';
import Profil from '../pages/admin/Profil';

const AdminRoute = () => {
  return (
    <Routes>
      <Route index element={<Navigate to="dashboard" replace />} />
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="kader" element={<DataKader />} />
      <Route path="balita" element={<DataBalita />} />
      <Route path="imunisasi" element={<Imunisasi />} />
      <Route path="laporan" element={<Laporan />} />
      <Route path="monitoring" element={<Monitoring />} />
      <Route path="pemeriksaan" element={<Pemeriksaan />} />
      <Route path="profil" element={<Profil />} />

      <Route path="*" element={<Navigate to="dashboard" replace />} />
    </Routes>
  );
};

export default AdminRoute;