import { useEffect, useMemo, useState } from 'react';
import {
  HiOutlineUserGroup,
  HiOutlineCheckCircle,
  HiOutlineExclamation,
  HiOutlineSearch,
  HiOutlinePlus,
  HiOutlineEye,
  HiOutlinePencil,
  HiOutlineTrash,
  HiOutlineX,
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
} from 'react-icons/hi';

// ===== Data contoh. Ganti dengan data dari API =====
const dataAwal = [
  { id: 1, nama: 'Aisyah Putri', jk: 'P', lahir: '2024-03-12', ortu: 'Siti Aminah', rt: '01', bb: 10.2, tb: 78, gizi: 'BAIK', periksa: '2026-11-07' },
  { id: 2, nama: 'Muhammad Fajar', jk: 'L', lahir: '2023-08-21', ortu: 'Rahmat Hidayat', rt: '02', bb: 11.5, tb: 87, gizi: 'BAIK', periksa: '2026-11-07' },
  { id: 3, nama: 'Zahra Nabila', jk: 'P', lahir: '2025-01-05', ortu: 'Dewi Lestari', rt: '03', bb: 7.4, tb: 68, gizi: 'BERISIKO', periksa: '2026-11-07' },
  { id: 4, nama: 'Raka Pratama', jk: 'L', lahir: '2022-11-30', ortu: 'Yuli Handayani', rt: '01', bb: 12.1, tb: 93, gizi: 'BAIK', periksa: '2026-10-10' },
  { id: 5, nama: 'Alya Safitri', jk: 'P', lahir: '2024-06-18', ortu: 'Nina Rahmawati', rt: '04', bb: 8.3, tb: 74, gizi: 'KURANG', periksa: '2026-11-07' },
  { id: 6, nama: 'Dimas Saputra', jk: 'L', lahir: '2023-02-09', ortu: 'Sari Wulandari', rt: '05', bb: 9.6, tb: 82, gizi: 'KURANG', periksa: '2026-10-10' },
  { id: 7, nama: 'Naura Azzahra', jk: 'P', lahir: '2025-04-25', ortu: 'Rina Marlina', rt: '02', bb: 6.1, tb: 62, gizi: 'BURUK', periksa: '2026-11-07' },
  { id: 8, nama: 'Fikri Ramadhan', jk: 'L', lahir: '2021-12-14', ortu: 'Ahmad Sopian', rt: '03', bb: 14.0, tb: 99, gizi: 'BAIK', periksa: '2026-10-10' },
  { id: 9, nama: 'Keisha Anindya', jk: 'P', lahir: '2024-09-02', ortu: 'Lilis Suryani', rt: '04', bb: 9.1, tb: 72, gizi: 'BERISIKO', periksa: '2026-11-07' },
  { id: 10, nama: 'Gilang Permana', jk: 'L', lahir: '2022-05-27', ortu: 'Deni Kurniawan', rt: '05', bb: 13.2, tb: 96, gizi: 'BAIK', periksa: '2026-10-10' },
];

const GIZI = {
  BAIK: { label: 'Gizi baik', badge: 'bg-lime-400' },
  BERISIKO: { label: 'Berisiko gizi kurang', badge: 'bg-yellow-300' },
  KURANG: { label: 'Gizi kurang', badge: 'bg-orange-400' },
  BURUK: { label: 'Gizi buruk', badge: 'bg-red-500' },
};

const PER_HALAMAN = 8;

const formKosong = { nama: '', jk: 'P', lahir: '', ortu: '', rt: '', bb: '', tb: '', gizi: 'BAIK' };

// ===== Kelas bersama (sama dengan DashboardAdmin) =====
const card = 'border-4 border-black bg-white p-6 shadow-[8px_8px_0_0_#000]';

const cardTitle =
  'inline-block border-4 border-black bg-yellow-300 px-3 py-1 text-sm font-black uppercase tracking-wide text-black shadow-[3px_3px_0_0_#000]';

const focusRing = 'focus:outline-none focus-visible:ring-4 focus-visible:ring-pink-400';

const btnBase = `cursor-pointer border-4 border-black font-black uppercase text-black shadow-[3px_3px_0_0_#000] transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[1px_1px_0_0_#000] active:translate-x-1 active:translate-y-1 active:shadow-none disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none disabled:hover:translate-x-0 disabled:hover:translate-y-0 ${focusRing}`;

const btnPrimary = `${btnBase} bg-teal-400 hover:bg-teal-300 px-4 py-2 text-sm`;
const btnSecondary = `${btnBase} bg-white hover:bg-yellow-300 px-4 py-2 text-sm`;
const btnView = `${btnBase} bg-white hover:bg-yellow-300 px-2 py-1 text-xs`;
const btnEdit = `${btnBase} bg-sky-300 hover:bg-sky-200 px-2 py-1 text-xs`;
const btnDanger = `${btnBase} bg-pink-300 hover:bg-pink-200 px-2 py-1 text-xs`;
const btnPage = `${btnBase} bg-white hover:bg-yellow-300 px-2 py-1 text-xs`;

const inputClass = `w-full border-4 border-black bg-white px-3 py-2 text-sm font-bold text-black placeholder:text-slate-500 ${focusRing}`;

// Hitung umur dalam bulan, tampil sebagai "1 th 8 bln" atau "8 bln"
const hitungUmur = (tglLahir) => {
  const lahir = new Date(tglLahir);
  const now = new Date();
  let bulan = (now.getFullYear() - lahir.getFullYear()) * 12 + (now.getMonth() - lahir.getMonth());
  if (now.getDate() < lahir.getDate()) bulan -= 1;
  bulan = Math.max(bulan, 0);
  const th = Math.floor(bulan / 12);
  const bln = bulan % 12;
  return th > 0 ? `${th} th ${bln} bln` : `${bln} bln`;
};

const formatTanggal = (iso) =>
  new Date(iso).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });

const GiziBadge = ({ gizi }) => (
  <span
    className={`inline-block border-2 border-black px-2 py-0.5 text-xs font-black uppercase ${GIZI[gizi].badge} ${
      gizi === 'BURUK' ? 'text-white' : 'text-black'
    }`}
  >
    {GIZI[gizi].label}
  </span>
);

// Pembungkus label + pesan error untuk input form
const Field = ({ label, error, hint, children }) => (
  <label className="block">
    <span className="mb-1 block text-xs font-black uppercase tracking-wide text-black">{label}</span>
    {children}
    {hint && !error && <span className="mt-1 block text-xs font-bold text-slate-700">{hint}</span>}
    {error && <span className="mt-1 block text-xs font-black text-red-600">{error}</span>}
  </label>
);

const toAngka = (v) => Number(String(v).replace(',', '.'));

const DataBalitaKader = () => {
  const [data, setData] = useState(dataAwal);
  const [cari, setCari] = useState('');
  const [filter, setFilter] = useState('SEMUA');
  const [halaman, setHalaman] = useState(1);
  const [pesan, setPesan] = useState('');

  const [detail, setDetail] = useState(null);
  const [formBuka, setFormBuka] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState(formKosong);
  const [error, setError] = useState({});
  const [hapusTarget, setHapusTarget] = useState(null);

  // Tutup modal dengan tombol Escape
  useEffect(() => {
    const onKey = (e) => {
      if (e.key !== 'Escape') return;
      setDetail(null);
      setFormBuka(false);
      setHapusTarget(null);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  const total = data.length;
  const gizibaik = data.filter((b) => b.gizi === 'BAIK').length;
  const perluPerhatian = total - gizibaik;

  const tampil = useMemo(() => {
    const q = cari.trim().toLowerCase();
    return data.filter((b) => {
      const cocokGizi = filter === 'SEMUA' || b.gizi === filter;
      const cocokCari = !q || b.nama.toLowerCase().includes(q) || b.ortu.toLowerCase().includes(q);
      return cocokGizi && cocokCari;
    });
  }, [data, cari, filter]);

  const totalHalaman = Math.max(1, Math.ceil(tampil.length / PER_HALAMAN));
  const halamanAktif = Math.min(halaman, totalHalaman);
  const mulai = (halamanAktif - 1) * PER_HALAMAN;
  const baris = tampil.slice(mulai, mulai + PER_HALAMAN);

  const stats = [
    { label: 'Total balita', value: total, icon: HiOutlineUserGroup, tone: 'bg-teal-300' },
    { label: 'Gizi baik', value: gizibaik, icon: HiOutlineCheckCircle, tone: 'bg-lime-300' },
    { label: 'Perlu perhatian', value: perluPerhatian, icon: HiOutlineExclamation, tone: 'bg-orange-300' },
  ];

  const hariIni = new Date().toISOString().slice(0, 10);

  const bukaTambah = () => {
    setEditId(null);
    setForm(formKosong);
    setError({});
    setPesan('');
    setFormBuka(true);
  };

  const bukaUbah = (b) => {
    setEditId(b.id);
    setForm({
      nama: b.nama,
      jk: b.jk,
      lahir: b.lahir,
      ortu: b.ortu,
      rt: b.rt,
      bb: String(b.bb),
      tb: String(b.tb),
      gizi: b.gizi,
    });
    setError({});
    setPesan('');
    setFormBuka(true);
  };

  const ubahField = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const validasi = () => {
    const err = {};
    if (!form.nama.trim()) err.nama = 'Nama balita wajib diisi.';
    if (!form.lahir) {
      err.lahir = 'Tanggal lahir wajib diisi.';
    } else if (form.lahir > hariIni) {
      err.lahir = 'Tanggal lahir tidak boleh di masa depan.';
    } else if (hitungUmur(form.lahir).includes('th') && parseInt(hitungUmur(form.lahir), 10) >= 5) {
      err.lahir = 'Umur balita maksimal 5 tahun.';
    }
    if (!form.ortu.trim()) err.ortu = 'Nama orang tua wajib diisi.';
    if (!/^\d{1,2}$/.test(form.rt.trim())) err.rt = 'RT diisi angka, misalnya 01.';
    const bb = toAngka(form.bb);
    const tb = toAngka(form.tb);
    if (!form.bb || Number.isNaN(bb) || bb <= 0 || bb > 30) err.bb = 'Berat badan harus antara 0-30 kg.';
    if (!form.tb || Number.isNaN(tb) || tb <= 0 || tb > 130) err.tb = 'Tinggi badan harus antara 0-130 cm.';
    return err;
  };

  const simpan = (e) => {
    e.preventDefault();
    const err = validasi();
    setError(err);
    if (Object.keys(err).length > 0) return;

    const baru = {
      nama: form.nama.trim(),
      jk: form.jk,
      lahir: form.lahir,
      ortu: form.ortu.trim(),
      rt: form.rt.trim().padStart(2, '0'),
      bb: toAngka(form.bb),
      tb: toAngka(form.tb),
      gizi: form.gizi,
    };

    // TODO: panggil API (POST /balita atau PUT /balita/:id), lalu refresh data
    if (editId === null) {
      setData((list) => [{ ...baru, id: Date.now(), periksa: null }, ...list]);
      setPesan(`Data ${baru.nama} berhasil ditambahkan.`);
    } else {
      setData((list) => list.map((b) => (b.id === editId ? { ...b, ...baru } : b)));
      setPesan(`Data ${baru.nama} berhasil diperbarui.`);
    }
    setFormBuka(false);
    setHalaman(1);
  };

  const konfirmasiHapus = () => {
    // TODO: panggil API (DELETE /balita/:id)
    setData((list) => list.filter((b) => b.id !== hapusTarget.id));
    setPesan(`Data ${hapusTarget.nama} berhasil dihapus.`);
    setHapusTarget(null);
  };

  return (
    <div className="space-y-8">
      {/* Judul halaman */}
      <header className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="inline-block border-4 border-black bg-teal-400 px-4 py-2 text-2xl font-black uppercase tracking-tight text-black shadow-[6px_6px_0_0_#000] sm:text-3xl">
            Data Balita
          </h1>
          <p className="mt-4 text-sm font-bold text-black">
            Kelola data balita Posyandu RW 08: tambah, ubah, atau hapus data warga.
          </p>
        </div>
        <button type="button" onClick={bukaTambah} className={`${btnPrimary} flex items-center gap-2 self-start sm:self-auto`}>
          <HiOutlinePlus className="h-5 w-5" aria-hidden="true" />
          Tambah balita
        </button>
      </header>

      {/* Pesan hasil aksi */}
      <p
        role="status"
        aria-live="polite"
        className={pesan ? 'border-4 border-black bg-lime-300 px-4 py-2 text-sm font-black text-black shadow-[4px_4px_0_0_#000]' : 'sr-only'}
      >
        {pesan}
      </p>

      {/* Ringkasan */}
      <section aria-label="Ringkasan balita" className="grid gap-6 sm:grid-cols-3">
        {stats.map(({ label, value, icon: Icon, tone }) => (
          <div key={label} className="border-4 border-black bg-white p-5 shadow-[6px_6px_0_0_#000]">
            <div className="flex items-center justify-between gap-3">
              <p className="text-xs font-black uppercase tracking-wider text-black">{label}</p>
              <span className={`flex h-11 w-11 shrink-0 items-center justify-center border-4 border-black ${tone}`}>
                <Icon className="h-5 w-5 text-black" aria-hidden="true" />
              </span>
            </div>
            <p className="mt-3 text-4xl font-black text-black">{value}</p>
          </div>
        ))}
      </section>

      {/* Tabel */}
      <section className={card}>
        <h2 className={cardTitle}>Daftar balita</h2>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <HiOutlineSearch
              className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-black"
              aria-hidden="true"
            />
            <input
              type="search"
              value={cari}
              onChange={(e) => {
                setCari(e.target.value);
                setHalaman(1);
              }}
              placeholder="Cari nama balita atau orang tua…"
              aria-label="Cari balita"
              className={`${inputClass} pl-10`}
            />
          </div>
          <select
            value={filter}
            onChange={(e) => {
              setFilter(e.target.value);
              setHalaman(1);
            }}
            aria-label="Filter status gizi"
            className={`${inputClass} sm:w-64`}
          >
            <option value="SEMUA">Semua status gizi</option>
            {Object.entries(GIZI).map(([key, g]) => (
              <option key={key} value={key}>
                {g.label}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-6 overflow-x-auto border-4 border-black">
          <table className="w-full min-w-[960px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b-4 border-black bg-yellow-300">
                {['No', 'Nama balita', 'Umur', 'Orang tua', 'RT', 'BB / TB', 'Status gizi', 'Aksi'].map((h) => (
                  <th key={h} scope="col" className="px-4 py-3 text-xs font-black uppercase tracking-wider text-black">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {baris.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-4 py-10 text-center font-bold text-black">
                    Tidak ada balita yang cocok. Ubah kata kunci atau filter, atau tambah balita baru.
                  </td>
                </tr>
              ) : (
                baris.map((b, i) => (
                  <tr key={b.id} className="border-b-4 border-black last:border-b-0 odd:bg-white even:bg-sky-100">
                    <td className="px-4 py-3 font-black text-black">{mulai + i + 1}</td>
                    <td className="px-4 py-3">
                      <p className="font-black text-black">{b.nama}</p>
                      <p className="text-xs font-bold text-black">{b.jk === 'L' ? 'Laki-laki' : 'Perempuan'}</p>
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 font-bold text-black">{hitungUmur(b.lahir)}</td>
                    <td className="px-4 py-3 font-bold text-black">{b.ortu}</td>
                    <td className="px-4 py-3 font-black text-black">RT {b.rt}</td>
                    <td className="whitespace-nowrap px-4 py-3 font-bold text-black">
                      {b.bb} kg / {b.tb} cm
                    </td>
                    <td className="px-4 py-3">
                      <GiziBadge gizi={b.gizi} />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => setDetail(b)}
                          className={`${btnView} flex items-center gap-1`}
                          aria-label={`Lihat detail ${b.nama}`}
                        >
                          <HiOutlineEye className="h-4 w-4" aria-hidden="true" />
                          Lihat
                        </button>
                        <button
                          type="button"
                          onClick={() => bukaUbah(b)}
                          className={`${btnEdit} flex items-center gap-1`}
                          aria-label={`Ubah ${b.nama}`}
                        >
                          <HiOutlinePencil className="h-4 w-4" aria-hidden="true" />
                          Ubah
                        </button>
                        <button
                          type="button"
                          onClick={() => setHapusTarget(b)}
                          className={`${btnDanger} flex items-center gap-1`}
                          aria-label={`Hapus ${b.nama}`}
                        >
                          <HiOutlineTrash className="h-4 w-4" aria-hidden="true" />
                          Hapus
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Paginasi */}
        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs font-bold text-black">
            Menampilkan {baris.length} dari {tampil.length} balita.
          </p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setHalaman(halamanAktif - 1)}
              disabled={halamanAktif === 1}
              className={btnPage}
              aria-label="Halaman sebelumnya"
            >
              <HiOutlineChevronLeft className="h-4 w-4" aria-hidden="true" />
            </button>
            <span className="border-4 border-black bg-white px-3 py-1 text-xs font-black text-black">
              {halamanAktif} / {totalHalaman}
            </span>
            <button
              type="button"
              onClick={() => setHalaman(halamanAktif + 1)}
              disabled={halamanAktif === totalHalaman}
              className={btnPage}
              aria-label="Halaman berikutnya"
            >
              <HiOutlineChevronRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </section>

      {/* Modal detail */}
      {detail && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="judul-detail"
        >
          <div className="max-h-full w-full max-w-lg overflow-y-auto border-4 border-black bg-white p-6 shadow-[8px_8px_0_0_#000]">
            <div className="flex items-start justify-between gap-3">
              <h2 id="judul-detail" className={cardTitle}>
                Detail balita
              </h2>
              <button
                type="button"
                onClick={() => setDetail(null)}
                aria-label="Tutup"
                className={`${btnBase} bg-white p-1 hover:bg-pink-300`}
              >
                <HiOutlineX className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <div className="mt-6 flex items-center gap-4">
              <span
                className="flex h-14 w-14 shrink-0 items-center justify-center border-4 border-black bg-pink-300 text-2xl font-black text-black"
                aria-hidden="true"
              >
                {detail.nama.charAt(0)}
              </span>
              <div>
                <p className="text-xl font-black text-black">{detail.nama}</p>
                <div className="mt-1">
                  <GiziBadge gizi={detail.gizi} />
                </div>
              </div>
            </div>

            <dl className="mt-6 grid grid-cols-2 gap-4">
              {[
                ['Jenis kelamin', detail.jk === 'L' ? 'Laki-laki' : 'Perempuan'],
                ['Umur', hitungUmur(detail.lahir)],
                ['Tanggal lahir', formatTanggal(detail.lahir)],
                ['Orang tua', detail.ortu],
                ['RT', `RT ${detail.rt}`],
                ['Pemeriksaan terakhir', detail.periksa ? formatTanggal(detail.periksa) : 'Belum diperiksa'],
                ['Berat badan', `${detail.bb} kg`],
                ['Tinggi badan', `${detail.tb} cm`],
              ].map(([k, v]) => (
                <div key={k} className="border-4 border-black bg-sky-100 p-3">
                  <dt className="text-xs font-black uppercase tracking-wide text-black">{k}</dt>
                  <dd className="mt-1 text-sm font-bold text-black">{v}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-8 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => {
                  const b = detail;
                  setDetail(null);
                  bukaUbah(b);
                }}
                className={`${btnBase} bg-sky-300 hover:bg-sky-200 px-4 py-2 text-sm`}
              >
                Ubah data
              </button>
              <button type="button" onClick={() => setDetail(null)} className={btnPrimary}>
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal tambah / ubah */}
      {formBuka && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="judul-form"
        >
          <form
            onSubmit={simpan}
            noValidate
            className="max-h-full w-full max-w-lg overflow-y-auto border-4 border-black bg-white p-6 shadow-[8px_8px_0_0_#000]"
          >
            <div className="flex items-start justify-between gap-3">
              <h2 id="judul-form" className={cardTitle}>
                {editId === null ? 'Tambah balita' : 'Ubah data balita'}
              </h2>
              <button
                type="button"
                onClick={() => setFormBuka(false)}
                aria-label="Tutup"
                className={`${btnBase} bg-white p-1 hover:bg-pink-300`}
              >
                <HiOutlineX className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <div className="mt-6 space-y-4">
              <Field label="Nama balita" error={error.nama}>
                <input name="nama" value={form.nama} onChange={ubahField} className={inputClass} autoFocus />
              </Field>

              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Jenis kelamin">
                  <select name="jk" value={form.jk} onChange={ubahField} className={inputClass}>
                    <option value="P">Perempuan</option>
                    <option value="L">Laki-laki</option>
                  </select>
                </Field>
                <Field label="Tanggal lahir" error={error.lahir}>
                  <input name="lahir" type="date" max={hariIni} value={form.lahir} onChange={ubahField} className={inputClass} />
                </Field>
              </div>

              <div className="grid gap-4 sm:grid-cols-[1fr_6rem]">
                <Field label="Nama orang tua" error={error.ortu}>
                  <input name="ortu" value={form.ortu} onChange={ubahField} className={inputClass} />
                </Field>
                <Field label="RT" error={error.rt}>
                  <input name="rt" inputMode="numeric" maxLength={2} value={form.rt} onChange={ubahField} className={inputClass} />
                </Field>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Berat badan (kg)" error={error.bb}>
                  <input name="bb" inputMode="decimal" value={form.bb} onChange={ubahField} className={inputClass} />
                </Field>
                <Field label="Tinggi badan (cm)" error={error.tb}>
                  <input name="tb" inputMode="decimal" value={form.tb} onChange={ubahField} className={inputClass} />
                </Field>
              </div>

              <Field label="Status gizi" hint="Pilih sesuai hasil penilaian status gizi balita.">
                <select name="gizi" value={form.gizi} onChange={ubahField} className={inputClass}>
                  {Object.entries(GIZI).map(([key, g]) => (
                    <option key={key} value={key}>
                      {g.label}
                    </option>
                  ))}
                </select>
              </Field>
            </div>

            <div className="mt-8 flex justify-end gap-3">
              <button type="button" onClick={() => setFormBuka(false)} className={btnSecondary}>
                Batal
              </button>
              <button type="submit" className={btnPrimary}>
                Simpan
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Modal konfirmasi hapus */}
      {hapusTarget && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          role="alertdialog"
          aria-modal="true"
          aria-labelledby="judul-hapus"
        >
          <div className="w-full max-w-md border-4 border-black bg-white p-6 shadow-[8px_8px_0_0_#000]">
            <h2
              id="judul-hapus"
              className="inline-block border-4 border-black bg-pink-300 px-3 py-1 text-sm font-black uppercase text-black shadow-[3px_3px_0_0_#000]"
            >
              Hapus data balita?
            </h2>
            <p className="mt-5 text-sm font-bold text-black">
              Data <span className="font-black">{hapusTarget.nama}</span> akan dihapus dan tidak bisa dikembalikan.
              Pastikan data ini memang salah input atau sudah tidak berlaku.
            </p>
            <div className="mt-8 flex justify-end gap-3">
              <button type="button" onClick={() => setHapusTarget(null)} className={btnSecondary}>
                Batal
              </button>
              <button
                type="button"
                onClick={konfirmasiHapus}
                className={`${btnBase} bg-pink-400 hover:bg-pink-300 px-4 py-2 text-sm`}
              >
                Hapus data
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataBalitaKader;