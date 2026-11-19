import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from '../pages/kader/Dashboard';
import DataBalita from '../pages/kader/DataBalita';
import Imunisasi from '../pages/kader/Imunisasi';
import Laporan from '../pages/kader/Laporan';
import Monitoring from '../pages/kader/Monitoring';
import Pemeriksaan from '../pages/kader/Pemeriksaan';

const KaderRoute = () => {
  return (
    <Routes>
      <Route index element={<Navigate to="dashboard" replace />} />
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="balita" element={<DataBalita />} />
      <Route path="imunisasi" element={<Imunisasi />} />
      <Route path="laporan" element={<Laporan />} />
      <Route path="monitoring" element={<Monitoring />} />
      <Route path="pemeriksaan" element={<Pemeriksaan />} />
      <Route path="*" element={<Navigate to="dashboard" replace />} />
    </Routes>
  );
};

export default KaderRoute;