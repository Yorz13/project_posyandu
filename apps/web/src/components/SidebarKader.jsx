// src/components/kader/SidebarKader.jsx
import { NavLink } from 'react-router-dom';
import { FiHome, FiUsers, FiClipboard, FiShield, FiMonitor, FiFileText, FiLogOut } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';

// Kader: tambah/ubah data warga (balita, pemeriksaan, imunisasi) + monitoring.
// Tidak ada menu Data Kader / Pengguna.
const menuKader = [
  { label: 'Dashboard', path: '/kader/dashboard', icon: FiHome },
  { label: 'Data Balita', path: '/kader/balita', icon: FiUsers },
  { label: 'Pemeriksaan', path: '/kader/pemeriksaan', icon: FiClipboard },
  { label: 'Imunisasi', path: '/kader/imunisasi', icon: FiShield },
  { label: 'Monitoring', path: '/kader/monitoring', icon: FiMonitor },
  { label: 'Laporan', path: '/kader/laporan', icon: FiFileText },
];

export default function SidebarKader() {
  const { logout } = useAuth();

  return (
    <aside className="w-64 min-h-screen bg-[#11182B] text-white flex flex-col">
      <div className="px-6 py-6 text-sm font-bold leading-tight">
        POSYANDU
        <br />
        RW 8
      </div>

      <nav className="flex-1 px-4 space-y-1">
        {menuKader.map(({ label, path, icon: Icon }) => (
          <NavLink key={path} to={path} className={({ isActive }) => `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition-colors ${isActive ? 'bg-[#2563EB]' : 'text-white/70 hover:bg-white/10'}`}>
            <Icon className="shrink-0" />
            {label}
          </NavLink>
        ))}
      </nav>

      <button onClick={logout} className="m-4 flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-white/70 hover:bg-white/10">
        <FiLogOut /> Logout
      </button>
    </aside>
  );
}
