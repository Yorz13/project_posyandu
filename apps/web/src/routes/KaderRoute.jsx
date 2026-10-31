import { Routes, Route, Navigate } from 'react-router-dom';
import DashboardKader from '../pages/kader/DashboardKader';

const KaderRoute = () => {
  return (
    <Routes>
      <Route index element={<Navigate to="dashboard" replace />} />
      <Route path="dashboard" element={<DashboardKader />} />
      <Route path="*" element={<Navigate to="dashboard" replace />} />
    </Routes>
  );
};

export default KaderRoute;