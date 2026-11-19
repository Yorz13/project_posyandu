// src/components/SidebarKader.jsx
import { NavLink, useNavigate } from 'react-router-dom';
import { FiHome, FiUsers, FiClipboard, FiShield, FiMonitor, FiFileText, FiLogOut } from 'react-icons/fi';
import { useAuth } from '../context/useAuth';

// Kader: tambah/ubah data warga (balita, pemeriksaan, imunisasi) + monitoring.
// Tidak ada menu Data Kader / Pengguna, dan tidak ada label LIHAT karena kader bisa mengubah data.
const menuKader = [
  { label: 'Dashboard', path: '/kader/dashboard', icon: FiHome },
  { label: 'Data Balita', path: '/kader/balita', icon: FiUsers },
  { label: 'Pemeriksaan', path: '/kader/pemeriksaan', icon: FiClipboard },
  { label: 'Imunisasi', path: '/kader/imunisasi', icon: FiShield },
  { label: 'Monitoring', path: '/kader/monitoring', icon: FiMonitor },
  { label: 'Laporan', path: '/kader/laporan', icon: FiFileText },
];

const focusRing = 'focus:outline-none focus-visible:ring-4 focus-visible:ring-pink-400';

const itemBase = `flex items-center gap-3 border-4 border-black px-4 py-3 text-sm font-black uppercase text-black shadow-[4px_4px_0_0_#000] transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_0_#000] active:translate-x-1 active:translate-y-1 active:shadow-none ${focusRing}`;

export default function SidebarKader() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login', { replace: true });
  };

  return (
    <aside className="flex min-h-screen w-72 shrink-0 flex-col border-r-4 border-black bg-white">
      {/* Logo */}
      <div className="border-b-4 border-black px-6 py-6">
        <div className="inline-block -rotate-2 border-4 border-black bg-teal-400 px-4 py-2 text-base font-black uppercase leading-tight text-black shadow-[4px_4px_0_0_#000]">
          Posyandu
          <br />
          RW 8
        </div>
      </div>

      {/* Menu */}
      <nav aria-label="Menu kader" className="flex-1 space-y-4 p-5">
        {menuKader.map(({ label, path, icon: Icon }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) => `${itemBase} ${isActive ? 'bg-yellow-300' : 'bg-white hover:bg-yellow-100'}`}
          >
            <Icon className="h-5 w-5 shrink-0" aria-hidden="true" />
            {label}
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <div className="border-t-4 border-black p-5">
        <button
          type="button"
          onClick={handleLogout}
          className={`${itemBase} w-full cursor-pointer justify-center bg-pink-400 hover:bg-pink-300`}
        >
          <FiLogOut className="h-5 w-5 shrink-0" aria-hidden="true" />
          Logout
        </button>
      </div>
    </aside>
  );
}