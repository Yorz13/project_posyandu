import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute';

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
        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected: Masyarakat */}
        <Route element={<ProtectedRoute allowedRoles={['Masyarakat']} />}>
          <Route path="/warga/*" element={<LayoutWarga />}>
            <Route path="*" element={<WargaRoute />} />
          </Route>
        </Route>

        {/* Protected: Kader */}
        <Route element={<ProtectedRoute allowedRoles={['KADER']} />}>
          <Route path="/kader/*" element={<LayoutKader />}>
            <Route path="*" element={<KaderRoute />} />
          </Route>
        </Route>

        {/* Protected: Admin */}
        <Route element={<ProtectedRoute allowedRoles={['ADMIN']} />}>
          <Route path="/admin/*" element={<LayoutAdmin />}>
            <Route path="*" element={<AdminRoute />} />
          </Route>
        </Route>

        {/* Public (Beranda, Layanan, dll) - harus paling bawah sebagai catch-all */}
        <Route path="/*" element={<LayoutPublik />}>
          <Route path="*" element={<PublicRoute />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoute;