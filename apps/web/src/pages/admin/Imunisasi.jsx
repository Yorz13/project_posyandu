import { useMemo, useState } from 'react';
import {
  HiOutlineShieldCheck,
  HiOutlineCalendar,
  HiOutlineExclamation,
  HiOutlineSearch,
  HiOutlineEye,
  HiOutlineX,
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
} from 'react-icons/hi';

// ===== Data contoh. Ganti dengan data dari API =====
const dataImunisasi = [
  { id: 1, balita: 'Aisyah Putri', umur: '1 th 8 bln', vaksin: 'DPT-HB-Hib', dosis: 'Lanjutan', tanggal: '2026-11-07', status: 'SUDAH', petugas: 'Rina Marlina', catatan: 'Tidak ada reaksi setelah imunisasi.' },
  { id: 2, balita: 'Muhammad Fajar', umur: '3 th 3 bln', vaksin: 'Campak', dosis: 'Dosis 2', tanggal: '2026-11-07', status: 'SUDAH', petugas: 'Rina Marlina', catatan: 'Demam ringan, sudah dijelaskan penanganannya ke orang tua.' },
  { id: 3, balita: 'Zahra Nabila', umur: '1 th 10 bln', vaksin: 'Campak', dosis: 'Dosis 2', tanggal: '2026-11-21', status: 'TERJADWAL', petugas: '-', catatan: 'Dijadwalkan pada kegiatan imunisasi campak.' },
  { id: 4, balita: 'Alya Safitri', umur: '2 th 4 bln', vaksin: 'Polio', dosis: 'Dosis 4', tanggal: '2026-10-10', status: 'TERLAMBAT', petugas: '-', catatan: 'Tidak hadir pada jadwal. Perlu dihubungi orang tua.' },
  { id: 5, balita: 'Naura Azzahra', umur: '1 th 6 bln', vaksin: 'DPT-HB-Hib', dosis: 'Dosis 3', tanggal: '2026-11-07', status: 'SUDAH', petugas: 'Dewi Lestari', catatan: 'Kondisi balita stabil saat imunisasi.' },
  { id: 6, balita: 'Keisha Anindya', umur: '2 th 2 bln', vaksin: 'Campak', dosis: 'Dosis 1', tanggal: '2026-11-21', status: 'TERJADWAL', petugas: '-', catatan: 'Dijadwalkan pada kegiatan imunisasi campak.' },
  { id: 7, balita: 'Raka Pratama', umur: '3 th 10 bln', vaksin: 'Polio', dosis: 'Dosis 4', tanggal: '2026-10-10', status: 'SUDAH', petugas: 'Nina Rahmawati', catatan: 'Tidak ada keluhan.' },
  { id: 8, balita: 'Dimas Saputra', umur: '3 th 8 bln', vaksin: 'DPT-HB-Hib', dosis: 'Lanjutan', tanggal: '2026-10-10', status: 'TERLAMBAT', petugas: '-', catatan: 'Belum datang. Kader akan mengunjungi rumah.' },
  { id: 9, balita: 'Fikri Ramadhan', umur: '4 th 10 bln', vaksin: 'Campak', dosis: 'Dosis 2', tanggal: '2026-10-10', status: 'SUDAH', petugas: 'Yuli Handayani', catatan: 'Tidak ada keluhan.' },
  { id: 10, balita: 'Gilang Permana', umur: '4 th 4 bln', vaksin: 'BCG', dosis: 'Dosis 1', tanggal: '2026-11-21', status: 'TERJADWAL', petugas: '-', catatan: 'Dijadwalkan pada kegiatan imunisasi campak.' },
];

const STATUS = {
  SUDAH: { label: 'Sudah', badge: 'bg-lime-400' },
  TERJADWAL: { label: 'Terjadwal', badge: 'bg-sky-300' },
  TERLAMBAT: { label: 'Terlambat', badge: 'bg-orange-400' },
};

const DAFTAR_VAKSIN = ['BCG', 'DPT-HB-Hib', 'Polio', 'Campak'];

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

const StatusBadge = ({ status }) => (
  <span className={`inline-block border-2 border-black px-2 py-0.5 text-xs font-black uppercase text-black ${STATUS[status].badge}`}>
    {STATUS[status].label}
  </span>
);

const Imunisasi = () => {
  const [cari, setCari] = useState('');
  const [vaksin, setVaksin] = useState('SEMUA');
  const [status, setStatus] = useState('SEMUA');
  const [halaman, setHalaman] = useState(1);
  const [detail, setDetail] = useState(null);

  const jumlah = (s) => dataImunisasi.filter((d) => d.status === s).length;

  const tampil = useMemo(() => {
    const q = cari.trim().toLowerCase();
    return dataImunisasi
      .filter((d) => {
        const cocokVaksin = vaksin === 'SEMUA' || d.vaksin === vaksin;
        const cocokStatus = status === 'SEMUA' || d.status === status;
        const cocokCari = !q || d.balita.toLowerCase().includes(q) || d.petugas.toLowerCase().includes(q);
        return cocokVaksin && cocokStatus && cocokCari;
      })
      .sort((a, b) => b.tanggal.localeCompare(a.tanggal));
  }, [cari, vaksin, status]);

  const totalHalaman = Math.max(1, Math.ceil(tampil.length / PER_HALAMAN));
  const halamanAktif = Math.min(halaman, totalHalaman);
  const mulai = (halamanAktif - 1) * PER_HALAMAN;
  const baris = tampil.slice(mulai, mulai + PER_HALAMAN);

  const stats = [
    { label: 'Sudah diimunisasi', value: jumlah('SUDAH'), icon: HiOutlineShieldCheck, tone: 'bg-lime-300' },
    { label: 'Terjadwal', value: jumlah('TERJADWAL'), icon: HiOutlineCalendar, tone: 'bg-sky-300' },
    { label: 'Terlambat', value: jumlah('TERLAMBAT'), icon: HiOutlineExclamation, tone: 'bg-orange-300' },
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
          Imunisasi
        </h1>
        <p className="mt-4 text-sm font-bold text-black">
          Riwayat dan jadwal imunisasi balita. Admin hanya dapat melihat data, pencatatan dilakukan oleh kader.
        </p>
      </header>

      {/* Ringkasan */}
      <section aria-label="Ringkasan imunisasi" className="grid gap-6 sm:grid-cols-3">
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
        <h2 className={cardTitle}>Daftar imunisasi</h2>

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
              aria-label="Cari imunisasi"
              className={`${inputClass} pl-10`}
            />
          </div>
          <select value={vaksin} onChange={resetHalaman(setVaksin)} aria-label="Filter vaksin" className={`${inputClass} lg:w-48`}>
            <option value="SEMUA">Semua vaksin</option>
            {DAFTAR_VAKSIN.map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </select>
          <select value={status} onChange={resetHalaman(setStatus)} aria-label="Filter status" className={`${inputClass} lg:w-48`}>
            <option value="SEMUA">Semua status</option>
            {Object.entries(STATUS).map(([key, s]) => (
              <option key={key} value={key}>
                {s.label}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-6 overflow-x-auto border-4 border-black">
          <table className="w-full min-w-[820px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b-4 border-black bg-yellow-300">
                {['No', 'Balita', 'Vaksin', 'Tanggal', 'Status', 'Petugas', 'Aksi'].map((h) => (
                  <th key={h} scope="col" className="px-4 py-3 text-xs font-black uppercase tracking-wider text-black">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {baris.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-10 text-center font-bold text-black">
                    Tidak ada data imunisasi yang cocok. Ubah kata kunci, vaksin, atau status.
                  </td>
                </tr>
              ) : (
                baris.map((d, i) => (
                  <tr key={d.id} className="border-b-4 border-black last:border-b-0 odd:bg-white even:bg-sky-100">
                    <td className="px-4 py-3 font-black text-black">{mulai + i + 1}</td>
                    <td className="px-4 py-3">
                      <p className="font-black text-black">{d.balita}</p>
                      <p className="text-xs font-bold text-black">{d.umur}</p>
                    </td>
                    <td className="px-4 py-3">
                      <p className="font-black text-black">{d.vaksin}</p>
                      <p className="text-xs font-bold text-black">{d.dosis}</p>
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 font-bold text-black">{formatTanggal(d.tanggal)}</td>
                    <td className="px-4 py-3">
                      <StatusBadge status={d.status} />
                    </td>
                    <td className="px-4 py-3 font-bold text-black">{d.petugas}</td>
                    <td className="px-4 py-3">
                      <button
                        type="button"
                        onClick={() => setDetail(d)}
                        className={`${btnView} flex items-center gap-1`}
                        aria-label={`Lihat detail imunisasi ${d.balita}`}
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
            Menampilkan {baris.length} dari {tampil.length} data imunisasi.
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
                Detail imunisasi
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
              <p className="mt-1 text-sm font-bold text-black">{detail.umur}</p>
              <div className="mt-3">
                <StatusBadge status={detail.status} />
              </div>
            </div>

            <dl className="mt-6 grid grid-cols-2 gap-4">
              {[
                ['Vaksin', detail.vaksin],
                ['Dosis', detail.dosis],
                [detail.status === 'SUDAH' ? 'Tanggal diberikan' : 'Tanggal jadwal', formatTanggal(detail.tanggal)],
                ['Petugas', detail.petugas],
              ].map(([k, v]) => (
                <div key={k} className="border-4 border-black bg-sky-100 p-3">
                  <dt className="text-xs font-black uppercase tracking-wide text-black">{k}</dt>
                  <dd className="mt-1 text-sm font-bold text-black">{v}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-4 border-4 border-black bg-yellow-100 p-3">
              <p className="text-xs font-black uppercase tracking-wide text-black">Catatan</p>
              <p className="mt-1 text-sm font-bold text-black">{detail.catatan}</p>
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

export default Imunisasi;