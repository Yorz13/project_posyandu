// src/layouts/AdminLayout.jsx
import { Outlet } from 'react-router-dom';
import SidebarAdmin from '../components/SidebarAdmin';
import { useAuth } from '../context/useAuth';

export default function AdminLayout() {
  const { user } = useAuth();

  return (
    <div className="flex min-h-screen bg-slate-50">
      <SidebarAdmin />

      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-end px-6">
          <div className="text-right leading-tight">
            <p className="text-sm font-semibold text-slate-800">{user?.name ?? 'Admin'}</p>
            <p className="text-xs text-slate-500">Admin Posyandu</p>
          </div>
        </header>

        <main className="flex-1 p-6 overflow-x-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
