import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import LayoutAdmin from '../layouts/LayoutAdmin';
import AdminRoute from './AdminRoute';
import PublicRoute from './PublicRoute';
import LayoutPublik from '../layouts/LayoutPublic';
import KaderRoute from './KaderRoute';
import LayoutKader from '../layouts/LayoutKader';
import LayoutWarga from '../layouts/LayoutWarga';
import WargaRoute from './WargaRoute';

const AppRoute = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/*" element={<Navigate to="/login" replace />} />

        <Route path="/admin/*" element={<LayoutAdmin />}>
          <Route path="*" element={<AdminRoute />} />
        </Route>

        <Route path="/*" element={<LayoutPublik />}>
          <Route path="*" element={<PublicRoute />} />
        </Route>

        <Route path="/kader/*" element={<LayoutKader />}>
          <Route path="*" element={<KaderRoute />} />
        </Route>

        <Route path="/warga/*" element={<LayoutWarga />}>
          <Route path="*" element={<WargaRoute />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoute;
