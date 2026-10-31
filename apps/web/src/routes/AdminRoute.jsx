import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from '../pages/admin/DashboardAdmin';
import DataKader from '../pages/admin/DataKader';

const AdminRoute = () => {
  return (
    <Routes>
      <Route index element={<Navigate to="dashboard" replace />} />
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="kader" element={<DataKader />} />
      <Route path="*" element={<Navigate to="dashboard" replace />} />
    </Routes>
  );
};

export default AdminRoute;