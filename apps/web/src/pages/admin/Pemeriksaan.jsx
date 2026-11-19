import { useMemo, useState } from 'react';
import {
  HiOutlineClipboardCheck,
  HiOutlineCalendar,
  HiOutlineExclamation,
  HiOutlineSearch,
  HiOutlineEye,
  HiOutlineX,
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
} from 'react-icons/hi';

// ===== Data contoh. Ganti dengan data dari API =====
const dataPemeriksaan = [
  { id: 1, tanggal: '2026-11-07', balita: 'Aisyah Putri', umur: '1 th 8 bln', bb: 10.2, tb: 78, lk: 46.5, gizi: 'BAIK', petugas: 'Rina Marlina', catatan: 'Pertumbuhan sesuai kurva. Lanjutkan ASI/MPASI.' },
  { id: 2, tanggal: '2026-11-07', balita: 'Muhammad Fajar', umur: '3 th 3 bln', bb: 11.5, tb: 87, lk: 48.0, gizi: 'BAIK', petugas: 'Rina Marlina', catatan: 'Tidak ada keluhan.' },
  { id: 3, tanggal: '2026-11-07', balita: 'Zahra Nabila', umur: '1 th 10 bln', bb: 7.4, tb: 68, lk: 44.0, gizi: 'BERISIKO', petugas: 'Dewi Lestari', catatan: 'BB di bawah rata-rata. Disarankan tambah porsi makan dan pantau bulan depan.' },
  { id: 4, tanggal: '2026-11-07', balita: 'Alya Safitri', umur: '2 th 4 bln', bb: 8.3, tb: 74, lk: 45.0, gizi: 'KURANG', petugas: 'Yuli Handayani', catatan: 'Dirujuk konsultasi gizi ke puskesmas.' },
  { id: 5, tanggal: '2026-11-07', balita: 'Naura Azzahra', umur: '1 th 6 bln', bb: 6.1, tb: 62, lk: 42.5, gizi: 'BURUK', petugas: 'Dewi Lestari', catatan: 'Dirujuk ke puskesmas untuk pemeriksaan lanjutan.' },
  { id: 6, tanggal: '2026-11-07', balita: 'Keisha Anindya', umur: '2 th 2 bln', bb: 9.1, tb: 72, lk: 45.5, gizi: 'BERISIKO', petugas: 'Rina Marlina', catatan: 'Pantau kenaikan BB bulan depan.' },
  { id: 7, tanggal: '2026-10-10', balita: 'Raka Pratama', umur: '3 th 10 bln', bb: 12.1, tb: 93, lk: 49.0, gizi: 'BAIK', petugas: 'Nina Rahmawati', catatan: 'Tidak ada keluhan.' },
  { id: 8, tanggal: '2026-10-10', balita: 'Dimas Saputra', umur: '3 th 8 bln', bb: 9.6, tb: 82, lk: 47.0, gizi: 'KURANG', petugas: 'Yuli Handayani', catatan: 'Diberi PMT dan jadwal timbang ulang dua minggu lagi.' },
  { id: 9, tanggal: '2026-10-10', balita: 'Fikri Ramadhan', umur: '4 th 10 bln', bb: 14.0, tb: 99, lk: 50.0, gizi: 'BAIK', petugas: 'Nina Rahmawati', catatan: 'Tidak ada keluhan.' },
  { id: 10, tanggal: '2026-10-10', balita: 'Gilang Permana', umur: '4 th 4 bln', bb: 13.2, tb: 96, lk: 49.5, gizi: 'BAIK', petugas: 'Rina Marlina', catatan: 'Tidak ada keluhan.' },
];

const GIZI = {
  BAIK: { label: 'Gizi baik', badge: 'bg-lime-400' },
  BERISIKO: { label: 'Berisiko gizi kurang', badge: 'bg-yellow-300' },
  KURANG: { label: 'Gizi kurang', badge: 'bg-orange-400' },
  BURUK: { label: 'Gizi buruk', badge: 'bg-red-500' },
};

const PER_HALAMAN = 8;

// ===== Kelas bersama (sama dengan DashboardAdmin) =====
const card = 'border-4 border-black bg-white p-6 shadow-[8px_8px_0_0_#000]';

const cardTitle =
  'inline-block border-4 border-black bg-yellow-300 px-3 py-1 text-sm font-black uppercase tracking-wide text-black shadow-[3px_3px_0_0_#000]';

const focusRing = 'focus:outline-none focus-visible:ring-4 focus-visible:ring-pink-400';

const btnBase = `cursor-pointer border-4 border-black font-black uppercase text-black shadow-[3px_3px_0_0_#000] transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[1px_1px_0_0_#000] active:translate-x-1 active:translate-y-1 active:shadow-none disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none disabled:hover:translate-x-0 disabled:hover:translate-y-0 ${focusRing}`;

const btnView = `${btnBase} bg-sky-300 hover:bg-sky-200 px-2.5 py-1 text-xs`;
const btnPage = `${btnBase} bg-white hover:bg-yellow-300 px-2 py-1 text-xs`;

const inputClass = `w-full border-4 border-black bg-white px-3 py-2 text-sm font-bold text-black placeholder:text-slate-500 ${focusRing}`;

const formatTanggal = (iso) =>
  new Date(iso).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });

const labelBulan = (ym) =>
  new Date(`${ym}-01`).toLocaleDateString('id-ID', { month: 'long', year: 'numeric' });

const GiziBadge = ({ gizi }) => (
  <span
    className={`inline-block border-2 border-black px-2 py-0.5 text-xs font-black uppercase ${GIZI[gizi].badge} ${
      gizi === 'BURUK' ? 'text-white' : 'text-black'
    }`}
  >
    {GIZI[gizi].label}
  </span>
);

const Pemeriksaan = () => {
  const [cari, setCari] = useState('');
  const [bulan, setBulan] = useState('SEMUA');
  const [filter, setFilter] = useState('SEMUA');
  const [halaman, setHalaman] = useState(1);
  const [detail, setDetail] = useState(null);

  // Daftar bulan unik dari data, terbaru di atas
  const daftarBulan = useMemo(
    () => [...new Set(dataPemeriksaan.map((p) => p.tanggal.slice(0, 7)))].sort().reverse(),
    []
  );

  const bulanIni = new Date().toISOString().slice(0, 7);
  const totalBulanIni = dataPemeriksaan.filter((p) => p.tanggal.startsWith(bulanIni)).length;
  const perluTindakLanjut = dataPemeriksaan.filter((p) => p.gizi !== 'BAIK').length;

  const tampil = useMemo(() => {
    const q = cari.trim().toLowerCase();
    return dataPemeriksaan
      .filter((p) => {
        const cocokBulan = bulan === 'SEMUA' || p.tanggal.startsWith(bulan);
        const cocokGizi = filter === 'SEMUA' || p.gizi === filter;
        const cocokCari = !q || p.balita.toLowerCase().includes(q) || p.petugas.toLowerCase().includes(q);
        return cocokBulan && cocokGizi && cocokCari;
      })
      .sort((a, b) => b.tanggal.localeCompare(a.tanggal));
  }, [cari, bulan, filter]);

  const totalHalaman = Math.max(1, Math.ceil(tampil.length / PER_HALAMAN));
  const halamanAktif = Math.min(halaman, totalHalaman);
  const mulai = (halamanAktif - 1) * PER_HALAMAN;
  const baris = tampil.slice(mulai, mulai + PER_HALAMAN);

  const stats = [
    { label: 'Total pemeriksaan', value: dataPemeriksaan.length, icon: HiOutlineClipboardCheck, tone: 'bg-sky-300' },
    { label: 'Bulan ini', value: totalBulanIni, icon: HiOutlineCalendar, tone: 'bg-teal-300' },
    { label: 'Perlu tindak lanjut', value: perluTindakLanjut, icon: HiOutlineExclamation, tone: 'bg-orange-300' },
  ];

  const resetHalaman = (setter) => (e) => {
    setter(e.target.value);
    setHalaman(1);
  };

  return (
    <div className="space-y-8">
      {/* Judul halaman */}
      <header>
        <h1 className="inline-block border-4 border-black bg-teal-400 px-4 py-2 text-2xl font-black uppercase tracking-tight text-black shadow-[6px_6px_0_0_#000] sm:text-3xl">
          Pemeriksaan
        </h1>
        <p className="mt-4 text-sm font-bold text-black">
          Riwayat penimbangan dan pengukuran balita. Admin hanya dapat melihat data, pencatatan dilakukan oleh kader.
        </p>
      </header>

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
          <table className="w-full min-w-[860px] border-collapse text-left text-sm">
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
                    Tidak ada pemeriksaan yang cocok. Ubah kata kunci, bulan, atau status gizi.
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
                      <button
                        type="button"
                        onClick={() => setDetail(p)}
                        className={`${btnView} flex items-center gap-1`}
                        aria-label={`Lihat detail pemeriksaan ${p.balita}`}
                      >
                        <HiOutlineEye className="h-4 w-4" aria-hidden="true" />
                        Lihat
                      </button>
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

      {/* Modal detail (hanya lihat) */}
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

            <div className="mt-8 flex justify-end">
              <button type="button" onClick={() => setDetail(null)} className={`${btnBase} bg-teal-400 hover:bg-teal-300 px-4 py-2 text-sm`}>
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Pemeriksaan;