// src/components/SidebarAdmin.jsx
import { NavLink, useNavigate } from 'react-router-dom';
import { FiHome, FiUsers, FiUserCheck, FiClipboard, FiShield, FiMonitor, FiFileText, FiLogOut } from 'react-icons/fi';
import { useAuth } from '../context/useAuth';

// Admin: hanya memantau, satu-satunya yang bisa diubah adalah Data Kader.
const menuAdmin = [
  { label: 'Dashboard', path: '/admin/dashboard', icon: FiHome },
  { label: 'Data Kader', path: '/admin/kader', icon: FiUserCheck }, // CRUD
  { label: 'Data Balita', path: '/admin/balita', icon: FiUsers, readOnly: true },
  { label: 'Pemeriksaan', path: '/admin/pemeriksaan', icon: FiClipboard, readOnly: true },
  { label: 'Imunisasi', path: '/admin/imunisasi', icon: FiShield, readOnly: true },
  { label: 'Monitoring', path: '/admin/monitoring', icon: FiMonitor },
  { label: 'Laporan', path: '/admin/laporan', icon: FiFileText },
];

export default function SidebarAdmin() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login', { replace: true });
  };

  return (
    <aside className="w-64 min-h-screen bg-[#11182B] text-white flex flex-col">
      <div className="px-6 py-6 text-sm font-bold leading-tight">
        POSYANDU
        <br />
        RW 8
      </div>

      <nav className="flex-1 px-4 space-y-1">
        {menuAdmin.map(({ label, path, icon: Icon, readOnly }) => (
          <NavLink key={path} to={path} className={({ isActive }) => `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition-colors ${isActive ? 'bg-[#2563EB]' : 'text-white/70 hover:bg-white/10'}`}>
            <Icon className="shrink-0" />
            <span className="flex-1">{label}</span>
            {readOnly && <span className="text-[10px] text-white/40">Lihat</span>}
          </NavLink>
        ))}
      </nav>

      <button type="button" onClick={handleLogout} className="m-4 flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-white/70 hover:bg-white/10">
        <FiLogOut /> Logout
      </button>
    </aside>
  );
}