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
    <aside className="flex h-full w-64 flex-col overflow-y-auto border-r-4 border-black bg-white text-black">
      <div className="border-b-4 border-black p-5">
        <div className="inline-block -rotate-2 border-4 border-black bg-teal-400 px-3 py-2 text-sm font-black uppercase leading-tight tracking-wide shadow-[4px_4px_0_0_#000]">
          POSYANDU
          <br />
          RW 8
        </div>
      </div>

      <nav className="flex-1 space-y-3 p-4">
        {menuAdmin.map(({ label, path, icon: Icon, readOnly }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              `flex items-center gap-3 border-4 border-black px-3 py-2.5 text-sm font-black uppercase tracking-wide transition-all focus:outline-none focus-visible:ring-4 focus-visible:ring-pink-400 ${
                isActive
                  ? 'translate-x-0.5 translate-y-0.5 bg-yellow-300 shadow-[2px_2px_0_0_#000]'
                  : 'bg-white shadow-[4px_4px_0_0_#000] hover:translate-x-0.5 hover:translate-y-0.5 hover:bg-sky-200 hover:shadow-[2px_2px_0_0_#000] active:translate-x-1 active:translate-y-1 active:shadow-none'
              }`
            }
          >
            <Icon className="shrink-0" aria-hidden="true" />
            <span className="flex-1">{label}</span>
            {readOnly && (
              <span className="border-2 border-black bg-lime-300 px-1.5 py-0.5 text-[10px] font-black leading-none">
                Lihat
              </span>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="border-t-4 border-black p-4">
        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full cursor-pointer items-center justify-center gap-3 border-4 border-black bg-pink-400 px-3 py-2.5 text-sm font-black uppercase tracking-wide shadow-[4px_4px_0_0_#000] transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:bg-pink-300 hover:shadow-[2px_2px_0_0_#000] active:translate-x-1 active:translate-y-1 active:shadow-none focus:outline-none focus-visible:ring-4 focus-visible:ring-yellow-300"
        >
          <FiLogOut aria-hidden="true" /> Logout
        </button>
      </div>
    </aside>
  );
}