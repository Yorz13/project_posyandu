import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  HiMenu,
  HiX,
  HiOutlineHome,
  HiOutlineClipboardList,
  HiOutlineUserGroup,
  HiOutlineInformationCircle,
  HiOutlinePhotograph,
  HiOutlinePhone,
  HiOutlineLogin,
} from 'react-icons/hi';

// Daftar menu tampilan umum (sebelum login)
const menuItems = [
  { label: 'Beranda', href: '/', icon: HiOutlineHome },
  { label: 'Layanan', href: '/layanan', icon: HiOutlineClipboardList },
  { label: 'Tentang', href: '/tentang', icon: HiOutlineUserGroup },
  { label: 'Informasi', href: '/informasi', icon: HiOutlineInformationCircle },
  { label: 'Galeri', href: '/galeri', icon: HiOutlinePhotograph },
  { label: 'Kontak', href: '/kontak', icon: HiOutlinePhone },
];

const focusRing = 'focus:outline-none focus-visible:ring-4 focus-visible:ring-pink-400';

const Navbar = () => {
  const [openPath, setOpenPath] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isOpen = openPath === location.pathname;

  // Tambah bayangan tebal di bawah header setelah halaman di-scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Tutup menu mobile dengan tombol Escape
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e) => e.key === 'Escape' && setOpenPath(null);
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen]);

  const desktopLink = ({ isActive }) =>
    `border-4 px-3 py-1.5 text-sm font-black uppercase text-black transition-all ${focusRing} ${
      isActive
        ? 'border-black bg-yellow-300 shadow-[3px_3px_0_0_#000]'
        : 'border-transparent hover:border-black hover:bg-yellow-100 hover:shadow-[3px_3px_0_0_#000]'
    }`;

  const mobileLink = ({ isActive }) =>
    `flex items-center gap-3 border-4 border-black px-4 py-3 text-sm font-black uppercase text-black shadow-[4px_4px_0_0_#000] transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_0_#000] active:translate-x-1 active:translate-y-1 active:shadow-none ${focusRing} ${
      isActive ? 'bg-yellow-300' : 'bg-white hover:bg-yellow-100'
    }`;

  const loginButton = `inline-flex cursor-pointer items-center justify-center gap-2 border-4 border-black bg-teal-400 px-5 py-2 text-sm font-black uppercase text-black shadow-[4px_4px_0_0_#000] transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:bg-teal-300 hover:shadow-[2px_2px_0_0_#000] active:translate-x-1 active:translate-y-1 active:shadow-none ${focusRing}`;

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b-4 border-black bg-white transition-shadow duration-300 ${
        scrolled || isOpen ? 'shadow-[0_4px_0_0_#000]' : ''
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Navigasi utama">
        <div className="flex h-16 items-center justify-between">
          {/* Brand */}
          <NavLink to="/" className={`flex items-center gap-3 ${focusRing}`}>
            <img
              src="/Logo.svg"
              alt="Logo Posyandu RW 08"
              className="h-10 w-10 border-4 border-black bg-white object-contain p-0.5 shadow-[3px_3px_0_0_#000]"
            />
            <span className="flex flex-col leading-tight">
              <span className="text-lg font-black uppercase tracking-tight text-black">Posyandu RW 08</span>
              <span className="hidden text-xs font-bold text-black sm:block">Sehat bersama, tumbuh bersama</span>
            </span>
          </NavLink>

          {/* Menu desktop */}
          <div className="hidden items-center gap-2 lg:flex">
            {menuItems.map(({ label, href }) => (
              <NavLink key={label} to={href} end={href === '/'} className={desktopLink}>
                {label}
              </NavLink>
            ))}

            <span className="mx-3 h-8 w-1 bg-black" aria-hidden="true" />

            <NavLink to="/login" className={loginButton}>
              <HiOutlineLogin className="h-5 w-5" aria-hidden="true" />
              Login
            </NavLink>
          </div>

          {/* Tombol menu mobile */}
          <button
            type="button"
            onClick={() => setOpenPath(isOpen ? null : location.pathname)}
            className={`inline-flex h-11 w-11 cursor-pointer items-center justify-center border-4 border-black bg-yellow-300 text-black shadow-[3px_3px_0_0_#000] transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[1px_1px_0_0_#000] active:translate-x-1 active:translate-y-1 active:shadow-none lg:hidden ${focusRing}`}
            aria-label={isOpen ? 'Tutup menu' : 'Buka menu'}
            aria-expanded={isOpen}
            aria-controls="menu-mobile"
          >
            {isOpen ? <HiX className="h-6 w-6" aria-hidden="true" /> : <HiMenu className="h-6 w-6" aria-hidden="true" />}
          </button>
        </div>

        {/* Menu mobile */}
        <div
          id="menu-mobile"
          className={`grid transition-[grid-template-rows] duration-300 ease-out lg:hidden ${
            isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
          }`}
        >
          <div className="overflow-hidden">
            {/* Padding kanan dan bawah memberi ruang untuk bayangan tebal tiap menu */}
            <div className="flex flex-col gap-4 border-t-4 border-black pb-5 pr-2 pt-5" inert={!isOpen}>
              {menuItems.map(({ label, href, icon: Icon }) => (
                <NavLink key={label} to={href} end={href === '/'} className={mobileLink} onClick={() => setOpenPath(null)}>
                  <Icon className="h-5 w-5" aria-hidden="true" />
                  {label}
                </NavLink>
              ))}

              <NavLink to="/login" className={`${loginButton} w-full py-3`} onClick={() => setOpenPath(null)}>
                <HiOutlineLogin className="h-5 w-5" aria-hidden="true" />
                Login
              </NavLink>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;