// src/components/HeaderKader.jsx
import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiSearch, FiChevronDown, FiHome, FiUser, FiLogOut } from 'react-icons/fi';
import { useAuth } from '../context/useAuth';

const HeaderKader = ({ onSearch }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  const name = user?.name ?? 'Kader';
  const apiUrl = import.meta.env.VITE_API_URL ?? '';
  const foto = user?.foto
    ? /^(https?:|blob:|data:)/.test(user.foto)
      ? user.foto
      : `${apiUrl}${user.foto}`
    : '';

  // Tutup dropdown saat klik di luar atau tekan Escape
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setOpen(false);
    };
    const handleEscape = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const keyword = query.trim();
    if (!keyword) return;
    if (onSearch) onSearch(keyword);
  };

  const handleLogout = async () => {
    setOpen(false);
    await logout();
    navigate('/login', { replace: true });
  };

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center gap-4 border-b-4 border-black bg-white px-4 sm:px-6">
      {/* Kiri: spacer agar pencarian tetap di tengah */}
      <div className="hidden flex-1 md:block" />

      {/* Tengah: pencarian */}
      <form onSubmit={handleSearch} role="search" className="flex w-full max-w-md flex-1 md:flex-none">
        <label htmlFor="kader-search" className="sr-only">
          Cari
        </label>
        <input
          id="kader-search"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Cari balita, pemeriksaan, imunisasi..."
          className="min-w-0 flex-1 border-4 border-r-0 border-black bg-white px-3 py-2 text-sm font-bold text-black placeholder:font-medium placeholder:text-slate-500 focus:bg-yellow-100 focus:outline-none"
        />
        <button
          type="submit"
          aria-label="Cari"
          className="flex shrink-0 cursor-pointer items-center gap-2 border-4 border-black bg-teal-400 px-3 py-2 text-sm font-black uppercase text-black shadow-[4px_4px_0_0_#000] transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:bg-teal-300 hover:shadow-[2px_2px_0_0_#000] active:translate-x-1 active:translate-y-1 active:shadow-none focus:outline-none focus-visible:ring-4 focus-visible:ring-pink-400"
        >
          <FiSearch className="h-4 w-4" aria-hidden="true" />
          <span className="hidden sm:inline">Cari</span>
        </button>
      </form>

      {/* Kanan: profil + dropdown */}
      <div className="flex flex-1 justify-end" ref={menuRef}>
        <div className="relative">
          <button
            type="button"
            onClick={() => setOpen((prev) => !prev)}
            aria-haspopup="menu"
            aria-expanded={open}
            className="flex cursor-pointer items-center gap-3 border-4 border-black bg-white py-1 pl-1 pr-3 shadow-[4px_4px_0_0_#000] transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:bg-yellow-100 hover:shadow-[2px_2px_0_0_#000] active:translate-x-1 active:translate-y-1 active:shadow-none focus:outline-none focus-visible:ring-4 focus-visible:ring-pink-400"
          >
            <span
              className="flex h-9 w-9 items-center justify-center overflow-hidden border-4 border-black bg-lime-300 text-sm font-black text-black"
              aria-hidden="true"
            >
              {foto ? (
                <img src={foto} alt="" className="h-full w-full object-cover" />
              ) : (
                name.charAt(0).toUpperCase()
              )}
            </span>
            <span className="hidden max-w-32 truncate text-sm font-black uppercase text-black sm:block">
              {name}
            </span>
            <FiChevronDown
              className={`h-4 w-4 text-black transition-transform ${open ? 'rotate-180' : ''}`}
              aria-hidden="true"
            />
          </button>

          {open && (
            <div
              role="menu"
              className="absolute right-0 mt-3 w-60 border-4 border-black bg-white shadow-[8px_8px_0_0_#000]"
            >
              <div className="border-b-4 border-black bg-sky-200 p-3">
                <p className="truncate text-sm font-black uppercase text-black">{name}</p>
                <p className="mt-1 inline-block border-2 border-black bg-lime-300 px-1.5 py-0.5 text-[10px] font-black uppercase leading-none text-black">
                  Kader Posyandu
                </p>
              </div>

              <div className="space-y-3 p-3">
                <Link
                  to="/kader/profil"
                  role="menuitem"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 border-4 border-black bg-white px-3 py-2 text-sm font-black uppercase text-black shadow-[3px_3px_0_0_#000] transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:bg-sky-200 hover:shadow-[1px_1px_0_0_#000] focus:outline-none focus-visible:ring-4 focus-visible:ring-pink-400"
                >
                  <FiUser aria-hidden="true" /> Profil
                </Link>

                <button
                  type="button"
                  role="menuitem"
                  onClick={handleLogout}
                  className="flex w-full cursor-pointer items-center gap-3 border-4 border-black bg-pink-400 px-3 py-2 text-sm font-black uppercase text-black shadow-[3px_3px_0_0_#000] transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:bg-pink-300 hover:shadow-[1px_1px_0_0_#000] focus:outline-none focus-visible:ring-4 focus-visible:ring-yellow-300"
                >
                  <FiLogOut aria-hidden="true" /> Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default HeaderKader;