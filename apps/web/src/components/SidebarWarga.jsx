// src/components/SidebarWarga.jsx
import { NavLink, useNavigate } from 'react-router-dom';
import { FiHome, FiUser, FiClipboard, FiShield, FiLogOut } from 'react-icons/fi';
import { useAuth } from '../context/useAuth';

// Warga: hanya memantau data anaknya sendiri (tidak ada tambah/ubah/hapus).
const menuWarga = [
  { label: 'Dashboard', path: '/warga/dashboard', icon: FiHome },
  { label: 'Data Anak', path: '/warga/anak', icon: FiUser },
  { label: 'Riwayat Pemeriksaan', path: '/warga/pemeriksaan', icon: FiClipboard },
  { label: 'Riwayat Imunisasi', path: '/warga/imunisasi', icon: FiShield },
];

export default function SidebarWarga() {
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
        {menuWarga.map(({ label, path, icon: Icon }) => (
          <NavLink key={path} to={path} className={({ isActive }) => `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition-colors ${isActive ? 'bg-[#2563EB]' : 'text-white/70 hover:bg-white/10'}`}>
            <Icon className="shrink-0" />
            {label}
          </NavLink>
        ))}
      </nav>

      <button type="button" onClick={handleLogout} className="m-4 flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-white/70 hover:bg-white/10">
        <FiLogOut /> Logout
      </button>
    </aside>
  );
}