import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import {
  HiOutlineMail,
  HiOutlineLockClosed,
  HiOutlineEye,
  HiOutlineEyeOff,
  HiOutlineArrowLeft,
} from 'react-icons/hi';
import { useAuth } from '../../context/useAuth';
import { HOME_BY_ROLE } from '../../utils/roles';

const inputWrapper =
  'flex items-center gap-3 border-4 border-black bg-white px-3 shadow-[4px_4px_0_0_#000] transition-all focus-within:-translate-x-0.5 focus-within:-translate-y-0.5 focus-within:bg-yellow-100 focus-within:shadow-[6px_6px_0_0_#000]';

const inputClass =
  'w-full bg-transparent py-3 text-sm font-bold text-black placeholder:font-medium placeholder:text-slate-500 focus:outline-none';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const from = location.state?.from?.pathname;
  const justRegistered = Boolean(location.state?.registered);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setIsLoading(true);

    try {
      const user = await login(formData.email, formData.password);
      navigate(from || HOME_BY_ROLE[user.role] || '/', { replace: true });
    } catch (error) {
      const message = error?.response?.data?.message
        || (error?.request
          ? 'Server API tidak dapat dihubungi. Pastikan API sedang berjalan.'
          : 'Gagal masuk. Periksa kembali email dan kata sandi Anda.');
      setErrorMessage(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="relative flex min-h-screen items-center justify-center bg-yellow-300 px-4 py-10"
      style={{
        backgroundImage: 'radial-gradient(#000 1.5px, transparent 1.5px)',
        backgroundSize: '22px 22px',
      }}
    >
      {/* Dekorasi */}
      <div className="pointer-events-none absolute left-6 top-10 hidden h-16 w-16 rotate-12 border-4 border-black bg-pink-400 shadow-[5px_5px_0_0_#000] md:block" />
      <div className="pointer-events-none absolute bottom-12 right-10 hidden h-20 w-20 -rotate-6 rounded-full border-4 border-black bg-teal-400 shadow-[5px_5px_0_0_#000] md:block" />
      <div className="pointer-events-none absolute bottom-24 left-16 hidden h-12 w-28 -rotate-3 border-4 border-black bg-sky-300 shadow-[5px_5px_0_0_#000] md:block" />

      <div className="relative w-full max-w-md">
        <Link
          to="/"
          className="mb-5 inline-flex items-center gap-2 border-4 border-black bg-white px-3 py-1.5 text-xs font-black uppercase tracking-wide text-black shadow-[4px_4px_0_0_#000] transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_0_#000] active:translate-x-1 active:translate-y-1 active:shadow-none"
        >
          <HiOutlineArrowLeft className="h-4 w-4" />
          Kembali ke Beranda
        </Link>

        <div className="relative border-4 border-black bg-white p-6 shadow-[10px_10px_0_0_#000] sm:p-8">
          <span className="absolute -right-4 -top-5 rotate-6 border-4 border-black bg-pink-400 px-3 py-1 text-xs font-black uppercase tracking-wider text-black shadow-[4px_4px_0_0_#000]">
            Posyandu RW 08
          </span>

          <div className="mb-6">
            <h1 className="inline-block border-4 border-black bg-teal-400 px-3 py-1 text-3xl font-black uppercase tracking-tight text-black shadow-[4px_4px_0_0_#000]">
              Masuk
            </h1>
            <p className="mt-4 text-sm font-semibold leading-relaxed text-black">
              Gunakan akun Anda untuk mengakses sistem informasi Posyandu RW 08.
            </p>
          </div>

          {justRegistered && !errorMessage && (
            <div
              role="status"
              className="mb-6 border-4 border-black bg-lime-300 p-4 text-sm font-bold text-black shadow-[4px_4px_0_0_#000]"
            >
              Pendaftaran berhasil dikirim. Kader akan memeriksa identitas Anda; akun bisa digunakan setelah diverifikasi.
            </div>
          )}

          {errorMessage && (
            <div
              role="alert"
              className="mb-6 border-4 border-black bg-red-400 p-4 text-sm font-bold text-black shadow-[4px_4px_0_0_#000]"
            >
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label htmlFor="email" className="mb-2 block text-xs font-black uppercase tracking-wider text-black">
                Alamat email
              </label>
              <div className={inputWrapper}>
                <HiOutlineMail className="h-5 w-5 shrink-0 text-black" aria-hidden="true" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="admin@posyandurw08.id"
                  className={inputClass}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="mb-2 block text-xs font-black uppercase tracking-wider text-black">
                Kata sandi
              </label>
              <div className={inputWrapper}>
                <HiOutlineLockClosed className="h-5 w-5 shrink-0 text-black" aria-hidden="true" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  autoComplete="current-password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Masukkan kata sandi"
                  className={inputClass}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi'}
                  className="shrink-0 cursor-pointer border-2 border-black bg-yellow-300 p-1 text-black transition-colors hover:bg-yellow-400"
                >
                  {showPassword ? <HiOutlineEyeOff className="h-4 w-4" /> : <HiOutlineEye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
              <label className="flex cursor-pointer select-none items-center gap-2 font-bold text-black">
                <input
                  type="checkbox"
                  name="rememberMe"
                  className="h-5 w-5 cursor-pointer appearance-none border-4 border-black bg-white checked:bg-teal-400 focus:outline-none focus-visible:ring-4 focus-visible:ring-pink-400"
                />
                <span>Ingat saya</span>
              </label>
              <Link
                to="/kontak"
                className="font-black text-black underline decoration-4 underline-offset-4 transition-colors hover:bg-yellow-300"
              >
                Butuh bantuan masuk?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="flex w-full cursor-pointer items-center justify-center gap-2 border-4 border-black bg-teal-400 px-4 py-3 text-base font-black uppercase tracking-wider text-black shadow-[6px_6px_0_0_#000] transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:bg-teal-300 hover:shadow-[3px_3px_0_0_#000] active:translate-x-1.5 active:translate-y-1.5 active:shadow-none focus:outline-none focus-visible:ring-4 focus-visible:ring-pink-400 disabled:cursor-not-allowed disabled:opacity-60 disabled:shadow-[6px_6px_0_0_#000] disabled:hover:translate-x-0 disabled:hover:translate-y-0"
            >
              {isLoading ? (
                <>
                  <svg className="h-5 w-5 animate-spin text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Memproses...</span>
                </>
              ) : (
                <span>Masuk</span>
              )}
            </button>
          </form>

          <div className="mt-6 border-t-4 border-black pt-5 text-center text-sm font-bold text-black">
            Belum punya akun?{' '}
            <Link
              to="/register"
              className="inline-block border-2 border-black bg-pink-400 px-2 py-0.5 font-black uppercase shadow-[3px_3px_0_0_#000] transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[1px_1px_0_0_#000]"
            >
              Daftar
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;