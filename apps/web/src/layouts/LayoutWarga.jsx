// src/layouts/LayoutWarga.jsx
import { Outlet } from 'react-router-dom';
import SidebarWarga from '../components/SidebarWarga';
import { useAuth } from '../context/useAuth';

const LayoutWarga = () => {
  const { user } = useAuth();

  return (
    <div className="flex min-h-screen bg-slate-50">
      <SidebarWarga />

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-16 items-center justify-end border-b border-slate-200 bg-white px-6">
          <div className="text-right leading-tight">
            <p className="text-sm font-semibold text-slate-800">{user?.name ?? 'Warga'}</p>
            <p className="text-xs text-slate-500">Warga RW 08</p>
          </div>
        </header>

        <main className="flex-1 overflow-x-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default LayoutWarga;