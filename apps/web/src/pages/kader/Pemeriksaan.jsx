import { useEffect, useMemo, useState } from 'react';
import {
  HiOutlineClipboardCheck,
  HiOutlineCalendar,
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
import { useAuth } from '../../context/useAuth';

// ===== Data contoh. Ganti dengan data dari API =====
// Daftar balita untuk pilihan di form (ambil dari API Data Balita).
const daftarBalita = [
  { id: 1, nama: 'Aisyah Putri', lahir: '2024-03-12' },
  { id: 2, nama: 'Muhammad Fajar', lahir: '2023-08-21' },
  { id: 3, nama: 'Zahra Nabila', lahir: '2025-01-05' },
  { id: 4, nama: 'Raka Pratama', lahir: '2022-11-30' },
  { id: 5, nama: 'Alya Safitri', lahir: '2024-06-18' },
  { id: 6, nama: 'Dimas Saputra', lahir: '2023-02-09' },
  { id: 7, nama: 'Naura Azzahra', lahir: '2025-04-25' },
  { id: 8, nama: 'Fikri Ramadhan', lahir: '2021-12-14' },
  { id: 9, nama: 'Keisha Anindya', lahir: '2024-09-02' },
  { id: 10, nama: 'Gilang Permana', lahir: '2022-05-27' },
];

const dataAwal = [
  { id: 1, tanggal: '2026-11-07', balitaId: 1, bb: 10.2, tb: 78, lk: 46.5, gizi: 'BAIK', petugas: 'Rina Marlina', catatan: 'Pertumbuhan sesuai kurva. Lanjutkan ASI/MPASI.' },
  { id: 2, tanggal: '2026-11-07', balitaId: 2, bb: 11.5, tb: 87, lk: 48.0, gizi: 'BAIK', petugas: 'Rina Marlina', catatan: 'Tidak ada keluhan.' },
  { id: 3, tanggal: '2026-11-07', balitaId: 3, bb: 7.4, tb: 68, lk: 44.0, gizi: 'BERISIKO', petugas: 'Dewi Lestari', catatan: 'BB di bawah rata-rata. Disarankan tambah porsi makan dan pantau bulan depan.' },
  { id: 4, tanggal: '2026-11-07', balitaId: 5, bb: 8.3, tb: 74, lk: 45.0, gizi: 'KURANG', petugas: 'Yuli Handayani', catatan: 'Dirujuk konsultasi gizi ke puskesmas.' },
  { id: 5, tanggal: '2026-11-07', balitaId: 7, bb: 6.1, tb: 62, lk: 42.5, gizi: 'BURUK', petugas: 'Dewi Lestari', catatan: 'Dirujuk ke puskesmas untuk pemeriksaan lanjutan.' },
  { id: 6, tanggal: '2026-11-07', balitaId: 9, bb: 9.1, tb: 72, lk: 45.5, gizi: 'BERISIKO', petugas: 'Rina Marlina', catatan: 'Pantau kenaikan BB bulan depan.' },
  { id: 7, tanggal: '2026-10-10', balitaId: 4, bb: 12.1, tb: 93, lk: 49.0, gizi: 'BAIK', petugas: 'Nina Rahmawati', catatan: 'Tidak ada keluhan.' },
  { id: 8, tanggal: '2026-10-10', balitaId: 6, bb: 9.6, tb: 82, lk: 47.0, gizi: 'KURANG', petugas: 'Yuli Handayani', catatan: 'Diberi PMT dan jadwal timbang ulang dua minggu lagi.' },
  { id: 9, tanggal: '2026-10-10', balitaId: 8, bb: 14.0, tb: 99, lk: 50.0, gizi: 'BAIK', petugas: 'Nina Rahmawati', catatan: 'Tidak ada keluhan.' },
  { id: 10, tanggal: '2026-10-10', balitaId: 10, bb: 13.2, tb: 96, lk: 49.5, gizi: 'BAIK', petugas: 'Rina Marlina', catatan: 'Tidak ada keluhan.' },
];

const GIZI = {
  BAIK: { label: 'Gizi baik', badge: 'bg-lime-400' },
  BERISIKO: { label: 'Berisiko gizi kurang', badge: 'bg-yellow-300' },
  KURANG: { label: 'Gizi kurang', badge: 'bg-orange-400' },
  BURUK: { label: 'Gizi buruk', badge: 'bg-red-500' },
};

const PER_HALAMAN = 8;

const hariIni = () => new Date().toISOString().slice(0, 10);

const formKosong = () => ({ balitaId: '', tanggal: hariIni(), bb: '', tb: '', lk: '', gizi: 'BAIK', catatan: '' });

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

// Umur dalam bulan pada tanggal tertentu, tampil "1 th 8 bln" atau "8 bln"
const hitungUmur = (tglLahir, sampai) => {
  const lahir = new Date(tglLahir);
  const acuan = sampai ? new Date(sampai) : new Date();
  let bulan = (acuan.getFullYear() - lahir.getFullYear()) * 12 + (acuan.getMonth() - lahir.getMonth());
  if (acuan.getDate() < lahir.getDate()) bulan -= 1;
  bulan = Math.max(bulan, 0);
  const th = Math.floor(bulan / 12);
  const bln = bulan % 12;
  return th > 0 ? `${th} th ${bln} bln` : `${bln} bln`;
};

const formatTanggal = (iso) =>
  new Date(iso).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });

const labelBulan = (ym) =>
  new Date(`${ym}-01`).toLocaleDateString('id-ID', { month: 'long', year: 'numeric' });

const toAngka = (v) => Number(String(v).replace(',', '.'));

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

const PemeriksaanKader = () => {
  const { user } = useAuth();
  const namaPetugas = user?.name ?? 'Kader';

  const [data, setData] = useState(dataAwal);
  const [cari, setCari] = useState('');
  const [bulan, setBulan] = useState('SEMUA');
  const [filter, setFilter] = useState('SEMUA');
  const [halaman, setHalaman] = useState(1);
  const [pesan, setPesan] = useState('');

  const [detail, setDetail] = useState(null);
  const [formBuka, setFormBuka] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState(formKosong());
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

  const balitaMap = useMemo(() => Object.fromEntries(daftarBalita.map((b) => [b.id, b])), []);

  // Gabungkan data pemeriksaan dengan nama dan umur balita saat diperiksa
  const rows = useMemo(
    () =>
      data.map((p) => {
        const b = balitaMap[p.balitaId];
        return { ...p, balita: b?.nama ?? 'Balita tidak ditemukan', umur: b ? hitungUmur(b.lahir, p.tanggal) : '-' };
      }),
    [data, balitaMap]
  );

  const daftarBulan = useMemo(
    () => [...new Set(data.map((p) => p.tanggal.slice(0, 7)))].sort().reverse(),
    [data]
  );

  const bulanIni = hariIni().slice(0, 7);
  const totalBulanIni = data.filter((p) => p.tanggal.startsWith(bulanIni)).length;
  const perluTindakLanjut = data.filter((p) => p.gizi !== 'BAIK').length;

  const tampil = useMemo(() => {
    const q = cari.trim().toLowerCase();
    return rows
      .filter((p) => {
        const cocokBulan = bulan === 'SEMUA' || p.tanggal.startsWith(bulan);
        const cocokGizi = filter === 'SEMUA' || p.gizi === filter;
        const cocokCari = !q || p.balita.toLowerCase().includes(q) || p.petugas.toLowerCase().includes(q);
        return cocokBulan && cocokGizi && cocokCari;
      })
      .sort((a, b) => b.tanggal.localeCompare(a.tanggal) || b.id - a.id);
  }, [rows, cari, bulan, filter]);

  const totalHalaman = Math.max(1, Math.ceil(tampil.length / PER_HALAMAN));
  const halamanAktif = Math.min(halaman, totalHalaman);
  const mulai = (halamanAktif - 1) * PER_HALAMAN;
  const baris = tampil.slice(mulai, mulai + PER_HALAMAN);

  const stats = [
    { label: 'Total pemeriksaan', value: data.length, icon: HiOutlineClipboardCheck, tone: 'bg-sky-300' },
    { label: 'Bulan ini', value: totalBulanIni, icon: HiOutlineCalendar, tone: 'bg-teal-300' },
    { label: 'Perlu tindak lanjut', value: perluTindakLanjut, icon: HiOutlineExclamation, tone: 'bg-orange-300' },
  ];

  const resetHalaman = (setter) => (e) => {
    setter(e.target.value);
    setHalaman(1);
  };

  const bukaTambah = () => {
    setEditId(null);
    setForm(formKosong());
    setError({});
    setPesan('');
    setFormBuka(true);
  };

  const bukaUbah = (p) => {
    setEditId(p.id);
    setForm({
      balitaId: String(p.balitaId),
      tanggal: p.tanggal,
      bb: String(p.bb),
      tb: String(p.tb),
      lk: String(p.lk),
      gizi: p.gizi,
      catatan: p.catatan,
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
    const balita = balitaMap[Number(form.balitaId)];
    if (!balita) err.balitaId = 'Pilih balita yang diperiksa.';
    if (!form.tanggal) {
      err.tanggal = 'Tanggal pemeriksaan wajib diisi.';
    } else if (form.tanggal > hariIni()) {
      err.tanggal = 'Tanggal tidak boleh di masa depan.';
    } else if (balita && form.tanggal < balita.lahir) {
      err.tanggal = 'Tanggal pemeriksaan tidak boleh sebelum tanggal lahir balita.';
    }
    const bb = toAngka(form.bb);
    const tb = toAngka(form.tb);
    const lk = toAngka(form.lk);
    if (!form.bb || Number.isNaN(bb) || bb <= 0 || bb > 30) err.bb = 'Berat badan harus antara 0-30 kg.';
    if (!form.tb || Number.isNaN(tb) || tb <= 0 || tb > 130) err.tb = 'Tinggi badan harus antara 0-130 cm.';
    if (!form.lk || Number.isNaN(lk) || lk <= 0 || lk > 60) err.lk = 'Lingkar kepala harus antara 0-60 cm.';
    return err;
  };

  const simpan = (e) => {
    e.preventDefault();
    const err = validasi();
    setError(err);
    if (Object.keys(err).length > 0) return;

    const baru = {
      balitaId: Number(form.balitaId),
      tanggal: form.tanggal,
      bb: toAngka(form.bb),
      tb: toAngka(form.tb),
      lk: toAngka(form.lk),
      gizi: form.gizi,
      catatan: form.catatan.trim() || 'Tidak ada catatan.',
    };
    const nama = balitaMap[baru.balitaId].nama;

    // TODO: panggil API (POST /pemeriksaan atau PUT /pemeriksaan/:id). Idealnya backend
    // juga memperbarui BB, TB, dan status gizi terbaru di data balita.
    if (editId === null) {
      setData((list) => [{ ...baru, id: Date.now(), petugas: namaPetugas }, ...list]);
      setPesan(`Pemeriksaan ${nama} berhasil dicatat.`);
    } else {
      setData((list) => list.map((p) => (p.id === editId ? { ...p, ...baru } : p)));
      setPesan(`Pemeriksaan ${nama} berhasil diperbarui.`);
    }
    setFormBuka(false);
    setHalaman(1);
  };

  const konfirmasiHapus = () => {
    // TODO: panggil API (DELETE /pemeriksaan/:id)
    setData((list) => list.filter((p) => p.id !== hapusTarget.id));
    setPesan(`Pemeriksaan ${hapusTarget.balita} tanggal ${formatTanggal(hapusTarget.tanggal)} berhasil dihapus.`);
    setHapusTarget(null);
  };

  const balitaTerpilih = balitaMap[Number(form.balitaId)];

  return (
    <div className="space-y-8">
      {/* Judul halaman */}
      <header className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="inline-block border-4 border-black bg-teal-400 px-4 py-2 text-2xl font-black uppercase tracking-tight text-black shadow-[6px_6px_0_0_#000] sm:text-3xl">
            Pemeriksaan
          </h1>
          <p className="mt-4 text-sm font-bold text-black">
            Catat hasil penimbangan dan pengukuran balita pada kegiatan posyandu.
          </p>
        </div>
        <button type="button" onClick={bukaTambah} className={`${btnPrimary} flex items-center gap-2 self-start sm:self-auto`}>
          <HiOutlinePlus className="h-5 w-5" aria-hidden="true" />
          Catat pemeriksaan
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
      <section aria-label="Ringkasan pemeriksaan" className="grid gap-6 sm:grid-cols-3">
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
        <h2 className={cardTitle}>Riwayat pemeriksaan</h2>

        <div className="mt-6 flex flex-col gap-3 lg:flex-row">
          <div className="relative flex-1">
            <HiOutlineSearch
              className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-black"
              aria-hidden="true"
            />
            <input
              type="search"
              value={cari}
              onChange={resetHalaman(setCari)}
              placeholder="Cari nama balita atau petugas…"
              aria-label="Cari pemeriksaan"
              className={`${inputClass} pl-10`}
            />
          </div>
          <select value={bulan} onChange={resetHalaman(setBulan)} aria-label="Filter bulan" className={`${inputClass} lg:w-48`}>
            <option value="SEMUA">Semua bulan</option>
            {daftarBulan.map((ym) => (
              <option key={ym} value={ym}>
                {labelBulan(ym)}
              </option>
            ))}
          </select>
          <select value={filter} onChange={resetHalaman(setFilter)} aria-label="Filter status gizi" className={`${inputClass} lg:w-64`}>
            <option value="SEMUA">Semua status gizi</option>
            {Object.entries(GIZI).map(([key, g]) => (
              <option key={key} value={key}>
                {g.label}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-6 overflow-x-auto border-4 border-black">
          <table className="w-full min-w-[1000px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b-4 border-black bg-yellow-300">
                {['No', 'Tanggal', 'Balita', 'BB / TB', 'Lingkar kepala', 'Status gizi', 'Petugas', 'Aksi'].map((h) => (
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
                    Tidak ada pemeriksaan yang cocok. Ubah kata kunci atau filter, atau catat pemeriksaan baru.
                  </td>
                </tr>
              ) : (
                baris.map((p, i) => (
                  <tr key={p.id} className="border-b-4 border-black last:border-b-0 odd:bg-white even:bg-sky-100">
                    <td className="px-4 py-3 font-black text-black">{mulai + i + 1}</td>
                    <td className="whitespace-nowrap px-4 py-3 font-bold text-black">{formatTanggal(p.tanggal)}</td>
                    <td className="px-4 py-3">
                      <p className="font-black text-black">{p.balita}</p>
                      <p className="text-xs font-bold text-black">{p.umur}</p>
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 font-bold text-black">
                      {p.bb} kg / {p.tb} cm
                    </td>
                    <td className="px-4 py-3 font-bold text-black">{p.lk} cm</td>
                    <td className="px-4 py-3">
                      <GiziBadge gizi={p.gizi} />
                    </td>
                    <td className="px-4 py-3 font-bold text-black">{p.petugas}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => setDetail(p)}
                          className={`${btnView} flex items-center gap-1`}
                          aria-label={`Lihat detail pemeriksaan ${p.balita}`}
                        >
                          <HiOutlineEye className="h-4 w-4" aria-hidden="true" />
                          Lihat
                        </button>
                        <button
                          type="button"
                          onClick={() => bukaUbah(p)}
                          className={`${btnEdit} flex items-center gap-1`}
                          aria-label={`Ubah pemeriksaan ${p.balita}`}
                        >
                          <HiOutlinePencil className="h-4 w-4" aria-hidden="true" />
                          Ubah
                        </button>
                        <button
                          type="button"
                          onClick={() => setHapusTarget(p)}
                          className={`${btnDanger} flex items-center gap-1`}
                          aria-label={`Hapus pemeriksaan ${p.balita}`}
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
            Menampilkan {baris.length} dari {tampil.length} pemeriksaan.
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
                Detail pemeriksaan
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

            <div className="mt-6">
              <p className="text-xl font-black text-black">{detail.balita}</p>
              <p className="mt-1 text-sm font-bold text-black">
                {detail.umur} · {formatTanggal(detail.tanggal)}
              </p>
              <div className="mt-3">
                <GiziBadge gizi={detail.gizi} />
              </div>
            </div>

            <dl className="mt-6 grid grid-cols-3 gap-4">
              {[
                ['Berat badan', `${detail.bb} kg`],
                ['Tinggi badan', `${detail.tb} cm`],
                ['Lingkar kepala', `${detail.lk} cm`],
              ].map(([k, v]) => (
                <div key={k} className="border-4 border-black bg-sky-100 p-3">
                  <dt className="text-xs font-black uppercase tracking-wide text-black">{k}</dt>
                  <dd className="mt-1 text-sm font-bold text-black">{v}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-4 border-4 border-black bg-yellow-100 p-3">
              <p className="text-xs font-black uppercase tracking-wide text-black">Catatan petugas</p>
              <p className="mt-1 text-sm font-bold text-black">{detail.catatan}</p>
              <p className="mt-2 text-xs font-bold text-black">Dicatat oleh {detail.petugas}</p>
            </div>

            <div className="mt-8 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => {
                  const p = detail;
                  setDetail(null);
                  bukaUbah(p);
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

      {/* Modal catat / ubah */}
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
                {editId === null ? 'Catat pemeriksaan' : 'Ubah pemeriksaan'}
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
              <Field
                label="Balita"
                error={error.balitaId}
                hint={balitaTerpilih ? `Umur saat diperiksa: ${hitungUmur(balitaTerpilih.lahir, form.tanggal || undefined)}` : undefined}
              >
                <select name="balitaId" value={form.balitaId} onChange={ubahField} className={inputClass} autoFocus>
                  <option value="">Pilih balita…</option>
                  {daftarBalita.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.nama}
                    </option>
                  ))}
                </select>
              </Field>

              <Field label="Tanggal pemeriksaan" error={error.tanggal}>
                <input name="tanggal" type="date" max={hariIni()} value={form.tanggal} onChange={ubahField} className={inputClass} />
              </Field>

              <div className="grid gap-4 sm:grid-cols-3">
                <Field label="BB (kg)" error={error.bb}>
                  <input name="bb" inputMode="decimal" value={form.bb} onChange={ubahField} className={inputClass} />
                </Field>
                <Field label="TB (cm)" error={error.tb}>
                  <input name="tb" inputMode="decimal" value={form.tb} onChange={ubahField} className={inputClass} />
                </Field>
                <Field label="Lingkar kepala (cm)" error={error.lk}>
                  <input name="lk" inputMode="decimal" value={form.lk} onChange={ubahField} className={inputClass} />
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

              <Field label="Catatan">
                <textarea
                  name="catatan"
                  rows={3}
                  value={form.catatan}
                  onChange={ubahField}
                  placeholder="Keluhan, saran, atau tindak lanjut (opsional)"
                  className={`${inputClass} resize-none`}
                />
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
              Hapus pemeriksaan?
            </h2>
            <p className="mt-5 text-sm font-bold text-black">
              Pemeriksaan <span className="font-black">{hapusTarget.balita}</span> tanggal{' '}
              {formatTanggal(hapusTarget.tanggal)} akan dihapus dan tidak bisa dikembalikan.
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

export default PemeriksaanKader;