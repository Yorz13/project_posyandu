// src/layouts/KaderLayout.jsx
import { Outlet } from 'react-router-dom';
import SidebarKader from '../components/SidebarKader';
import HeaderKader from '../components/HeaderKader';

export default function KaderLayout() {

  return (
    <div
      className="flex min-h-screen bg-yellow-100"
      style={{
        backgroundImage: 'radial-gradient(#000 1px, transparent 1px)',
        backgroundSize: '24px 24px',
      }}
    >
      {/* Sidebar: menempel di layar, tinggi tetap 1 layar */}
      <div className="sticky top-0 h-screen shrink-0 self-start">
        <SidebarKader />
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        <HeaderKader />

        <main className="flex-1 overflow-x-auto p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}