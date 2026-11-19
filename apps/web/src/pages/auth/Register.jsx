import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  HiOutlineUser,
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlineLockClosed,
  HiOutlineEye,
  HiOutlineEyeOff,
  HiOutlineArrowLeft,
} from 'react-icons/hi';
import { useAuth } from '../../context/useAuth';
import api from '../../services/api';

const labelClass = 'mb-2 block text-xs font-black uppercase tracking-wider text-black';

const inputWrapper =
  'flex items-center gap-3 border-4 border-black bg-white px-3 shadow-[4px_4px_0_0_#000] transition-all focus-within:-translate-x-0.5 focus-within:-translate-y-0.5 focus-within:bg-yellow-100 focus-within:shadow-[6px_6px_0_0_#000]';

const inputClass =
  'w-full bg-transparent py-3 text-sm font-bold text-black placeholder:font-medium placeholder:text-slate-500 focus:outline-none';

const plainField =
  'w-full border-4 border-black bg-white px-3 py-3 text-sm font-bold text-black shadow-[4px_4px_0_0_#000] transition-all placeholder:font-medium placeholder:text-slate-500 focus:-translate-x-0.5 focus:-translate-y-0.5 focus:bg-yellow-100 focus:shadow-[6px_6px_0_0_#000] focus:outline-none disabled:cursor-not-allowed disabled:bg-slate-200 disabled:opacity-70';

const eyeButton =
  'shrink-0 cursor-pointer border-2 border-black bg-yellow-300 p-1 text-black transition-colors hover:bg-yellow-400';

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    nik: '',
    tanggalLahir: '',
    jenisKelamin: '',
    posyanduId: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [agree, setAgree] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [posyandu, setPosyandu] = useState([]);
  const [loadingPosyandu, setLoadingPosyandu] = useState(true);

  useEffect(() => {
    let active = true;
    api.get('/auth/posyandu')
      .then(({ data }) => {
        if (active) setPosyandu(data.data);
      })
      .catch((error) => {
        if (active) setErrorMessage(error.response?.data?.message || 'Daftar Posyandu belum dapat dimuat.');
      })
      .finally(() => {
        if (active) setLoadingPosyandu(false);
      });
    return () => {
      active = false;
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    if (formData.name.trim().length < 3) return 'Nama lengkap minimal 3 karakter.';
    if (!/^\d{16}$/.test(formData.nik)) return 'NIK harus terdiri dari 16 digit.';
    if (formData.phone && !/^(\+62|62|0)8[0-9]{7,12}$/.test(formData.phone)) {
      return 'Nomor HP tidak valid. Contoh: 081234567890.';
    }
    if (!formData.tanggalLahir || !formData.jenisKelamin || !formData.posyanduId) return 'Lengkapi tanggal lahir, jenis kelamin, dan Posyandu.';
    if (formData.password.length < 8) return 'Kata sandi minimal 8 karakter.';
    if (formData.password !== formData.confirmPassword) return 'Konfirmasi kata sandi tidak cocok.';
    if (!agree) return 'Anda harus menyetujui syarat dan ketentuan.';
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    const validationError = validate();
    if (validationError) {
      setErrorMessage(validationError);
      return;
    }

    setIsLoading(true);
    try {
      await register({
        nama: formData.name.trim(),
        email: formData.email.trim(),
        telepon: formData.phone.trim(),
        nik: formData.nik.trim(),
        tanggalLahir: formData.tanggalLahir,
        jenisKelamin: formData.jenisKelamin,
        posyanduId: formData.posyanduId,
        password: formData.password,
      });
      navigate('/login', { replace: true, state: { registered: true } });
    } catch (error) {
      const message = error?.response?.data?.message
        || (error?.request
          ? 'Server API tidak dapat dihubungi. Pastikan API sedang berjalan.'
          : 'Pendaftaran gagal. Silakan coba lagi.');
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
      <div className="pointer-events-none fixed left-6 top-10 hidden h-16 w-16 rotate-12 border-4 border-black bg-pink-400 shadow-[5px_5px_0_0_#000] lg:block" />
      <div className="pointer-events-none fixed bottom-12 right-10 hidden h-20 w-20 -rotate-6 rounded-full border-4 border-black bg-teal-400 shadow-[5px_5px_0_0_#000] lg:block" />
      <div className="pointer-events-none fixed bottom-24 left-16 hidden h-12 w-28 -rotate-3 border-4 border-black bg-sky-300 shadow-[5px_5px_0_0_#000] lg:block" />

      <div className="relative w-full max-w-xl">
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
              Buat akun
            </h1>
            <p className="mt-4 text-sm font-semibold leading-relaxed text-black">
              Daftarkan identitas Anda. Akun baru dapat digunakan setelah diverifikasi Kader.
            </p>
          </div>

          {errorMessage && (
            <div
              role="alert"
              className="mb-6 border-4 border-black bg-red-400 p-4 text-sm font-bold text-black shadow-[4px_4px_0_0_#000]"
            >
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Nama */}
            <div>
              <label htmlFor="name" className={labelClass}>Nama lengkap *</label>
              <div className={inputWrapper}>
                <HiOutlineUser className="h-5 w-5 shrink-0 text-black" aria-hidden="true" />
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Nama sesuai KTP"
                  className={inputClass}
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className={labelClass}>Alamat email *</label>
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
                  placeholder="nama@email.com"
                  className={inputClass}
                />
              </div>
            </div>

            {/* Telepon */}
            <div>
              <label htmlFor="phone" className={labelClass}>
                Nomor HP{' '}
                <span className="ml-1 border-2 border-black bg-sky-300 px-1.5 py-0.5 text-[10px]">Opsional</span>
              </label>
              <div className={inputWrapper}>
                <HiOutlinePhone className="h-5 w-5 shrink-0 text-black" aria-hidden="true" />
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="081234567890"
                  className={inputClass}
                />
              </div>
            </div>

            {/* NIK */}
            <div>
              <label htmlFor="nik" className={labelClass}>NIK *</label>
              <input
                id="nik"
                name="nik"
                inputMode="numeric"
                pattern="[0-9]{16}"
                maxLength={16}
                autoComplete="off"
                required
                value={formData.nik}
                onChange={handleChange}
                placeholder="16 digit NIK sesuai KTP"
                className={plainField}
              />
            </div>

            {/* Tanggal lahir + Jenis kelamin */}
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="tanggalLahir" className={labelClass}>Tanggal lahir *</label>
                <input
                  id="tanggalLahir"
                  name="tanggalLahir"
                  type="date"
                  required
                  value={formData.tanggalLahir}
                  onChange={handleChange}
                  className={plainField}
                />
              </div>
              <div>
                <label htmlFor="jenisKelamin" className={labelClass}>Jenis kelamin *</label>
                <select
                  id="jenisKelamin"
                  name="jenisKelamin"
                  required
                  value={formData.jenisKelamin}
                  onChange={handleChange}
                  className={`${plainField} cursor-pointer`}
                >
                  <option value="">Pilih jenis kelamin</option>
                  <option value="PEREMPUAN">Perempuan</option>
                  <option value="LAKI_LAKI">Laki-laki</option>
                </select>
              </div>
            </div>

            {/* Posyandu */}
            <div>
              <label htmlFor="posyanduId" className={labelClass}>Posyandu *</label>
              <select
                id="posyanduId"
                name="posyanduId"
                required
                disabled={loadingPosyandu || posyandu.length === 0}
                value={formData.posyanduId}
                onChange={handleChange}
                className={`${plainField} cursor-pointer`}
              >
                <option value="">{loadingPosyandu ? 'Memuat Posyandu...' : 'Pilih Posyandu'}</option>
                {posyandu.map((item) => (
                  <option key={item.id} value={item.id}>{item.nama} — {item.desa}</option>
                ))}
              </select>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className={labelClass}>Kata sandi *</label>
              <div className={inputWrapper}>
                <HiOutlineLockClosed className="h-5 w-5 shrink-0 text-black" aria-hidden="true" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  minLength={8}
                  autoComplete="new-password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Minimal 8 karakter"
                  className={inputClass}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi'}
                  className={eyeButton}
                >
                  {showPassword ? <HiOutlineEyeOff className="h-4 w-4" /> : <HiOutlineEye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Konfirmasi password */}
            <div>
              <label htmlFor="confirmPassword" className={labelClass}>Konfirmasi kata sandi *</label>
              <div className={inputWrapper}>
                <HiOutlineLockClosed className="h-5 w-5 shrink-0 text-black" aria-hidden="true" />
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirm ? 'text' : 'password'}
                  required
                  autoComplete="new-password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Ulangi kata sandi"
                  className={inputClass}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm((prev) => !prev)}
                  aria-label={showConfirm ? 'Sembunyikan konfirmasi kata sandi' : 'Tampilkan konfirmasi kata sandi'}
                  className={eyeButton}
                >
                  {showConfirm ? <HiOutlineEyeOff className="h-4 w-4" /> : <HiOutlineEye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Syarat */}
            <label className="flex cursor-pointer select-none items-start gap-3 border-4 border-black bg-sky-200 p-3 text-sm font-bold text-black shadow-[4px_4px_0_0_#000]">
              <input
                type="checkbox"
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}
                className="mt-0.5 h-5 w-5 shrink-0 cursor-pointer appearance-none border-4 border-black bg-white checked:bg-teal-400 focus:outline-none focus-visible:ring-4 focus-visible:ring-pink-400"
              />
              <span>Saya menyetujui syarat dan ketentuan penggunaan sistem Posyandu RW 08.</span>
            </label>

            <button
              type="submit"
              disabled={isLoading || loadingPosyandu || posyandu.length === 0}
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
                <span>Daftar</span>
              )}
            </button>
          </form>

          <div className="mt-6 border-t-4 border-black pt-5 text-center text-sm font-bold text-black">
            Sudah punya akun?{' '}
            <Link
              to="/login"
              className="inline-block border-2 border-black bg-pink-400 px-2 py-0.5 font-black uppercase shadow-[3px_3px_0_0_#000] transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[1px_1px_0_0_#000]"
            >
              Masuk
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;