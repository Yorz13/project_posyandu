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

const focusRing = 'focus:outline-none focus-visible:ring-4 focus-visible:ring-pink-400';

export default function SidebarWarga() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login', { replace: true });
  };

  return (
    <aside className="flex min-h-screen w-72 shrink-0 flex-col border-r-4 border-black bg-white text-black">
      {/* Logo */}
      <div className="border-b-4 border-black px-6 py-8">
        <div className="inline-block -rotate-2 border-4 border-black bg-teal-400 px-4 py-2 text-lg font-black uppercase leading-tight tracking-tight shadow-[5px_5px_0_0_#000]">
          Posyandu
          <br />
          RW 8
        </div>
      </div>

      {/* Menu */}
      <nav aria-label="Menu warga" className="flex-1 space-y-5 px-6 py-8">
        {menuWarga.map(({ label, path, icon: Icon }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              `flex items-center gap-3 border-4 border-black px-4 py-3 text-sm font-black uppercase transition-all ${focusRing} ${
                isActive
                  ? 'bg-yellow-300 shadow-[5px_5px_0_0_#000]'
                  : 'bg-white shadow-[5px_5px_0_0_#000] hover:translate-x-0.5 hover:translate-y-0.5 hover:bg-teal-300 hover:shadow-[2px_2px_0_0_#000] active:translate-x-1 active:translate-y-1 active:shadow-none'
              }`
            }
          >
            <Icon className="h-5 w-5 shrink-0" aria-hidden="true" />
            {label}
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <div className="border-t-4 border-black px-6 py-6">
        <button
          type="button"
          onClick={handleLogout}
          className={`flex w-full cursor-pointer items-center justify-center gap-3 border-4 border-black bg-pink-400 px-4 py-3 text-sm font-black uppercase shadow-[5px_5px_0_0_#000] transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:bg-pink-300 hover:shadow-[2px_2px_0_0_#000] active:translate-x-1 active:translate-y-1 active:shadow-none ${focusRing}`}
        >
          <FiLogOut className="h-5 w-5" aria-hidden="true" />
          Logout
        </button>
      </div>
    </aside>
  );
}