// src/layouts/KaderLayout.jsx
import { Outlet } from 'react-router-dom';
import SidebarKader from '../components/kader/SidebarKader';
import { useAuth } from '../context/AuthContext';

export default function KaderLayout() {
  const { user } = useAuth();

  return (
    <div className="flex min-h-screen bg-slate-50">
      <SidebarKader />

      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-end px-6">
          <div className="text-right leading-tight">
            <p className="text-sm font-semibold text-slate-800">{user?.name ?? 'Kader'}</p>
            <p className="text-xs text-slate-500">Kader Posyandu</p>
          </div>
        </header>

        <main className="flex-1 p-6 overflow-x-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}