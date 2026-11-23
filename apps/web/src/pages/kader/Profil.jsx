import { useEffect, useRef, useState } from 'react';
import {
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlineShieldCheck,
  HiOutlineLockClosed,
  HiOutlineCamera,
  HiOutlineTrash,
} from 'react-icons/hi';
import { useAuth } from '../../context/useAuth';

const cincin = 'focus:outline-none focus-visible:ring-4 focus-visible:ring-pink-400 focus-visible:ring-offset-2';
const kartu = 'border-4 border-black bg-white shadow-[8px_8px_0_0_#000]';
const input = `w-full border-4 border-black bg-white px-3 py-2 font-bold text-black placeholder:text-black/40 disabled:bg-black/5 disabled:text-black/60 ${cincin}`;
const tombol = `inline-flex min-h-12 cursor-pointer items-center justify-center gap-2 border-4 border-black px-5 py-3 text-sm font-black uppercase text-black shadow-[5px_5px_0_0_#000] transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_0_#000] active:translate-x-1 active:translate-y-1 active:shadow-none disabled:cursor-not-allowed disabled:opacity-60 ${cincin}`;

/* ------------------------------------------------------------------
 * KONEKSI KE API
 * Alamat dasar API diambil dari VITE_API_URL (kosong = proxy Vite / satu domain).
 * SESUAIKAN headerAuth() dengan cara aplikasi Anda mengirim token login.
 * ------------------------------------------------------------------ */
const API = import.meta.env.VITE_API_URL ?? '';
const MAKS_FOTO = 2 * 1024 * 1024; // 2 MB
const TIPE_FOTO = ['image/jpeg', 'image/png', 'image/webp'];

const headerAuth = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const kirim = async (url, opsi = {}) => {
  const res = await fetch(`${API}${url}`, {
    credentials: 'include',
    ...opsi,
    headers: { ...headerAuth(), ...opsi.headers },
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || 'Permintaan gagal. Coba lagi.');
  return data;
};

const simpanProfil = (formData) => kirim('/api/auth/profil', { method: 'PUT', body: formData });

const gantiPassword = (data) =>
  kirim('/api/auth/password', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

const urlFoto = (foto) => {
  if (!foto) return '';
  return /^(https?:|blob:|data:)/.test(foto) ? foto : `${API}${foto}`;
};
/* ------------------------------------------------------------------ */

const Bidang = ({ id, label, children }) => (
  <div>
    <label htmlFor={id} className="mb-1 block text-sm font-black uppercase">
      {label}
    </label>
    {children}
  </div>
);

const Pesan = ({ jenis, children }) =>
  children ? (
    <p
      role={jenis === 'galat' ? 'alert' : 'status'}
      className={`border-4 border-black px-3 py-2 text-sm font-black ${
        jenis === 'galat' ? 'bg-pink-300' : 'bg-lime-300'
      }`}
    >
      {children}
    </p>
  ) : null;

const Profil = () => {
  const { user, updateUser, setUser } = useAuth();
  const perbaruiPengguna = updateUser ?? setUser;

  const [profil, setProfil] = useState({ nama: '', telepon: '' });
  const [pesanProfil, setPesanProfil] = useState({ jenis: '', teks: '' });
  const [menyimpan, setMenyimpan] = useState(false);

  // Foto: berkas baru yang dipilih, pratinjau lokalnya, dan penanda hapus.
  const inputFotoRef = useRef(null);
  const [berkasFoto, setBerkasFoto] = useState(null);
  const [pratinjau, setPratinjau] = useState('');
  const [hapusFoto, setHapusFoto] = useState(false);
  const [pesanFoto, setPesanFoto] = useState('');

  const [sandi, setSandi] = useState({ lama: '', baru: '', ulang: '' });
  const [pesanSandi, setPesanSandi] = useState({ jenis: '', teks: '' });
  const [mengganti, setMengganti] = useState(false);

  // Isi form dari data pengguna (juga saat data baru selesai dimuat).
  useEffect(() => {
    setProfil({
      nama: user?.name ?? 'Kader',
      telepon: user?.phone ?? user?.telepon ?? '',
    });
  }, [user]);

  // Bersihkan URL pratinjau agar tidak menumpuk di memori.
  useEffect(() => {
    return () => {
      if (pratinjau) URL.revokeObjectURL(pratinjau);
    };
  }, [pratinjau]);

  const email = user?.email ?? '';
  const fotoTampil = pratinjau || (hapusFoto ? '' : urlFoto(user?.foto));
  const inisial = (profil.nama.trim()[0] || 'K').toUpperCase();

  const pilihFoto = (e) => {
    const berkas = e.target.files?.[0];
    e.target.value = ''; // agar berkas yang sama bisa dipilih ulang
    if (!berkas) return;
    if (!TIPE_FOTO.includes(berkas.type)) {
      setPesanFoto('Format foto harus JPG, PNG, atau WebP.');
      return;
    }
    if (berkas.size > MAKS_FOTO) {
      setPesanFoto('Ukuran foto maksimal 2 MB.');
      return;
    }
    setPesanFoto('');
    setBerkasFoto(berkas);
    setPratinjau(URL.createObjectURL(berkas));
    setHapusFoto(false);
  };

  const batalkanFoto = () => {
    setBerkasFoto(null);
    setPratinjau('');
    setPesanFoto('');
  };

  const kirimProfil = async (e) => {
    e.preventDefault();
    if (!profil.nama.trim()) {
      setPesanProfil({ jenis: 'galat', teks: 'Nama tidak boleh kosong.' });
      return;
    }
    setMenyimpan(true);
    setPesanProfil({ jenis: '', teks: '' });
    try {
      const formData = new FormData();
      formData.append('nama', profil.nama.trim());
      formData.append('telepon', profil.telepon.trim());
      if (berkasFoto) formData.append('foto', berkasFoto);
      if (hapusFoto) formData.append('hapusFoto', 'true');

      const hasil = await simpanProfil(formData);

      batalkanFoto();
      setHapusFoto(false);
      if (typeof perbaruiPengguna === 'function' && hasil.user) {
        perbaruiPengguna({ ...user, ...hasil.user });
        setPesanProfil({ jenis: 'ok', teks: 'Profil disimpan.' });
      } else {
        setPesanProfil({
          jenis: 'ok',
          teks: 'Profil disimpan. Muat ulang halaman untuk melihat perubahan di header.',
        });
      }
    } catch (err) {
      setPesanProfil({ jenis: 'galat', teks: err.message });
    } finally {
      setMenyimpan(false);
    }
  };

  const kirimSandi = async (e) => {
    e.preventDefault();
    if (!sandi.lama || !sandi.baru) {
      setPesanSandi({ jenis: 'galat', teks: 'Isi kata sandi lama dan kata sandi baru.' });
      return;
    }
    if (sandi.baru.length < 8) {
      setPesanSandi({ jenis: 'galat', teks: 'Kata sandi baru minimal 8 karakter.' });
      return;
    }
    if (sandi.baru !== sandi.ulang) {
      setPesanSandi({ jenis: 'galat', teks: 'Konfirmasi tidak sama dengan kata sandi baru.' });
      return;
    }
    setMengganti(true);
    setPesanSandi({ jenis: '', teks: '' });
    try {
      await gantiPassword({ passwordLama: sandi.lama, passwordBaru: sandi.baru });
      setSandi({ lama: '', baru: '', ulang: '' });
      setPesanSandi({ jenis: 'ok', teks: 'Kata sandi diganti.' });
    } catch (err) {
      setPesanSandi({ jenis: 'galat', teks: err.message });
    } finally {
      setMengganti(false);
    }
  };

  return (
    <div className="space-y-8">
      <header>
        <h1 className="inline-block border-4 border-black bg-teal-400 px-4 py-2 text-3xl font-black uppercase shadow-[6px_6px_0_0_#000] md:text-4xl">
          Profil
        </h1>
        <p className="mt-4 font-bold">Kelola foto, data akun, dan kata sandi Anda.</p>
      </header>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Ringkasan akun + foto */}
        <aside className={`${kartu} h-fit p-6`} aria-label="Ringkasan akun">
          <div className="flex h-32 w-32 items-center justify-center overflow-hidden border-4 border-black bg-lime-300 text-6xl font-black shadow-[4px_4px_0_0_#000]">
            {fotoTampil ? (
              <img src={fotoTampil} alt={`Foto profil ${profil.nama}`} className="h-full w-full object-cover" />
            ) : (
              <span aria-hidden="true">{inisial}</span>
            )}
          </div>

          <input
            ref={inputFotoRef}
            id="foto-profil"
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={pilihFoto}
            className="sr-only"
          />
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => inputFotoRef.current?.click()}
              className={`${tombol} min-h-10 bg-sky-300 px-3 py-2 text-xs hover:bg-sky-200`}
            >
              <HiOutlineCamera className="h-4 w-4" aria-hidden="true" />
              {fotoTampil ? 'Ganti foto' : 'Pilih foto'}
            </button>
            {berkasFoto && (
              <button
                type="button"
                onClick={batalkanFoto}
                className={`${tombol} min-h-10 bg-white px-3 py-2 text-xs hover:bg-yellow-300`}
              >
                Batal
              </button>
            )}
            {!berkasFoto && user?.foto && !hapusFoto && (
              <button
                type="button"
                onClick={() => setHapusFoto(true)}
                className={`${tombol} min-h-10 bg-white px-3 py-2 text-xs hover:bg-pink-300`}
              >
                <HiOutlineTrash className="h-4 w-4" aria-hidden="true" />
                Hapus foto
              </button>
            )}
          </div>
          <p className="mt-2 text-xs font-bold text-black/70">JPG, PNG, atau WebP. Maksimal 2 MB.</p>
          {(berkasFoto || hapusFoto) && (
            <p className="mt-2 text-xs font-black">Klik “Simpan profil” untuk menerapkan perubahan foto.</p>
          )}
          <Pesan jenis="galat">{pesanFoto}</Pesan>

          <h2 className="mt-6 break-words text-2xl font-black uppercase">{profil.nama}</h2>
          <p className="mt-2 inline-block border-2 border-black bg-lime-300 px-2 py-0.5 text-xs font-black uppercase">
            Kader Posyandu
          </p>

          <ul className="mt-6 space-y-3 font-bold">
            <li className="flex items-center gap-3">
              <HiOutlineShieldCheck className="h-5 w-5 shrink-0" aria-hidden="true" />
              Akses data balita dan pemeriksaan
            </li>
            <li className="flex items-center gap-3 break-all">
              <HiOutlineMail className="h-5 w-5 shrink-0" aria-hidden="true" />
              {email || 'Email belum tersedia'}
            </li>
            <li className="flex items-center gap-3">
              <HiOutlinePhone className="h-5 w-5 shrink-0" aria-hidden="true" />
              {profil.telepon || 'Nomor belum diisi'}
            </li>
          </ul>
        </aside>

        <div className="space-y-8 lg:col-span-2">
          {/* Data akun */}
          <form onSubmit={kirimProfil} className={`${kartu} space-y-5 p-6`} noValidate>
            <h2 className="inline-block border-4 border-black bg-yellow-300 px-3 py-1 text-lg font-black uppercase">
              Data akun
            </h2>

            <Bidang id="nama" label="Nama lengkap">
              <input
                id="nama"
                className={input}
                value={profil.nama}
                onChange={(e) => setProfil({ ...profil, nama: e.target.value })}
                autoComplete="name"
              />
            </Bidang>

            <Bidang id="email" label="Email">
              <input id="email" type="email" className={input} value={email} disabled />
              <p className="mt-1 text-xs font-bold text-black/70">
                Email dipakai untuk masuk dan tidak bisa diubah di sini.
              </p>
            </Bidang>

            <Bidang id="telepon" label="Nomor telepon / WhatsApp">
              <input
                id="telepon"
                type="tel"
                inputMode="tel"
                className={input}
                value={profil.telepon}
                onChange={(e) => setProfil({ ...profil, telepon: e.target.value })}
                placeholder="08xxxxxxxxxx"
                autoComplete="tel"
              />
            </Bidang>

            <Pesan jenis={pesanProfil.jenis}>{pesanProfil.teks}</Pesan>

            <button type="submit" disabled={menyimpan} className={`${tombol} bg-teal-400 hover:bg-teal-300`}>
              {menyimpan ? 'Menyimpan…' : 'Simpan profil'}
            </button>
          </form>

          {/* Ganti kata sandi */}
          <form onSubmit={kirimSandi} className={`${kartu} space-y-5 p-6`} noValidate>
            <h2 className="inline-flex items-center gap-2 border-4 border-black bg-sky-300 px-3 py-1 text-lg font-black uppercase">
              <HiOutlineLockClosed className="h-5 w-5" aria-hidden="true" />
              Ganti kata sandi
            </h2>

            <Bidang id="sandi-lama" label="Kata sandi lama">
              <input
                id="sandi-lama"
                type="password"
                className={input}
                value={sandi.lama}
                onChange={(e) => setSandi({ ...sandi, lama: e.target.value })}
                autoComplete="current-password"
              />
            </Bidang>

            <div className="grid gap-5 md:grid-cols-2">
              <Bidang id="sandi-baru" label="Kata sandi baru">
                <input
                  id="sandi-baru"
                  type="password"
                  className={input}
                  value={sandi.baru}
                  onChange={(e) => setSandi({ ...sandi, baru: e.target.value })}
                  autoComplete="new-password"
                />
              </Bidang>
              <Bidang id="sandi-ulang" label="Ulangi kata sandi baru">
                <input
                  id="sandi-ulang"
                  type="password"
                  className={input}
                  value={sandi.ulang}
                  onChange={(e) => setSandi({ ...sandi, ulang: e.target.value })}
                  autoComplete="new-password"
                />
              </Bidang>
            </div>
            <p className="text-xs font-bold text-black/70">Minimal 8 karakter.</p>

            <Pesan jenis={pesanSandi.jenis}>{pesanSandi.teks}</Pesan>

            <button type="submit" disabled={mengganti} className={`${tombol} bg-pink-300 hover:bg-pink-200`}>
              {mengganti ? 'Mengganti…' : 'Ganti kata sandi'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profil;