import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom';

import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import LayoutAdmin from '../layouts/LayoutAdmin';
import AdminRoute from './AdminRoute';
import PublicRoute from './PublicRoute';
import LayoutPublik from '../layouts/LayoutPublic';

const AppRoute = () => {
    return (
<BrowserRouter>
    <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/*" element={<Navigate to="/login" replace />} />

        <Route path="/admin/*" element={<LayoutAdmin />} >
        <Route path="*" element={<AdminRoute/>} />
        </Route>

         <Route path="/*" element={<LayoutPublik />}>
          <Route path="*" element={<PublicRoute />} />
        </Route>
    </Routes>
</BrowserRouter>
    )
}

export default AppRoute