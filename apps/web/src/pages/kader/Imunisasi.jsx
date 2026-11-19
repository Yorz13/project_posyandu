import { useEffect, useMemo, useState } from 'react';
import {
  HiOutlineShieldCheck,
  HiOutlineCalendar,
  HiOutlineExclamation,
  HiOutlineSearch,
  HiOutlinePlus,
  HiOutlineEye,
  HiOutlinePencil,
  HiOutlineTrash,
  HiOutlineCheck,
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

// Status yang disimpan hanya SUDAH atau TERJADWAL.
// TERLAMBAT dihitung otomatis: jadwal sudah lewat tetapi belum diberikan.
const dataAwal = [
  { id: 1, balitaId: 1, vaksin: 'DPT-HB-Hib', dosis: 'Lanjutan', tanggal: '2026-11-07', status: 'SUDAH', petugas: 'Rina Marlina', catatan: 'Tidak ada reaksi setelah imunisasi.' },
  { id: 2, balitaId: 2, vaksin: 'Campak', dosis: 'Dosis 2', tanggal: '2026-11-07', status: 'SUDAH', petugas: 'Rina Marlina', catatan: 'Demam ringan, sudah dijelaskan penanganannya ke orang tua.' },
  { id: 3, balitaId: 3, vaksin: 'Campak', dosis: 'Dosis 2', tanggal: '2026-11-21', status: 'TERJADWAL', petugas: '-', catatan: 'Dijadwalkan pada kegiatan imunisasi campak.' },
  { id: 4, balitaId: 5, vaksin: 'Polio', dosis: 'Dosis 4', tanggal: '2026-10-10', status: 'TERJADWAL', petugas: '-', catatan: 'Tidak hadir pada jadwal. Perlu dihubungi orang tua.' },
  { id: 5, balitaId: 7, vaksin: 'DPT-HB-Hib', dosis: 'Dosis 3', tanggal: '2026-11-07', status: 'SUDAH', petugas: 'Dewi Lestari', catatan: 'Kondisi balita stabil saat imunisasi.' },
  { id: 6, balitaId: 9, vaksin: 'Campak', dosis: 'Dosis 1', tanggal: '2026-11-21', status: 'TERJADWAL', petugas: '-', catatan: 'Dijadwalkan pada kegiatan imunisasi campak.' },
  { id: 7, balitaId: 4, vaksin: 'Polio', dosis: 'Dosis 4', tanggal: '2026-10-10', status: 'SUDAH', petugas: 'Nina Rahmawati', catatan: 'Tidak ada keluhan.' },
  { id: 8, balitaId: 6, vaksin: 'DPT-HB-Hib', dosis: 'Lanjutan', tanggal: '2026-10-10', status: 'TERJADWAL', petugas: '-', catatan: 'Belum datang. Kader akan mengunjungi rumah.' },
  { id: 9, balitaId: 8, vaksin: 'Campak', dosis: 'Dosis 2', tanggal: '2026-10-10', status: 'SUDAH', petugas: 'Yuli Handayani', catatan: 'Tidak ada keluhan.' },
  { id: 10, balitaId: 10, vaksin: 'BCG', dosis: 'Dosis 1', tanggal: '2026-11-21', status: 'TERJADWAL', petugas: '-', catatan: 'Dijadwalkan pada kegiatan imunisasi campak.' },
];

const STATUS = {
  SUDAH: { label: 'Sudah', badge: 'bg-lime-400' },
  TERJADWAL: { label: 'Terjadwal', badge: 'bg-sky-300' },
  TERLAMBAT: { label: 'Terlambat', badge: 'bg-orange-400' },
};

const DAFTAR_VAKSIN = ['BCG', 'DPT-HB-Hib', 'Polio', 'Campak'];
const DAFTAR_DOSIS = ['Dosis 1', 'Dosis 2', 'Dosis 3', 'Dosis 4', 'Lanjutan'];

const PER_HALAMAN = 8;

const hariIni = () => new Date().toISOString().slice(0, 10);

const formKosong = () => ({
  balitaId: '',
  vaksin: DAFTAR_VAKSIN[0],
  dosis: DAFTAR_DOSIS[0],
  tanggal: hariIni(),
  status: 'SUDAH',
  catatan: '',
});

// Status yang ditampilkan: jadwal yang sudah lewat dan belum diberikan menjadi TERLAMBAT
const statusEfektif = (d) => {
  if (d.status === 'SUDAH') return 'SUDAH';
  return d.tanggal < hariIni() ? 'TERLAMBAT' : 'TERJADWAL';
};

// ===== Kelas bersama (sama dengan DashboardAdmin) =====
const card = 'border-4 border-black bg-white p-6 shadow-[8px_8px_0_0_#000]';

const cardTitle =
  'inline-block border-4 border-black bg-yellow-300 px-3 py-1 text-sm font-black uppercase tracking-wide text-black shadow-[3px_3px_0_0_#000]';

const focusRing = 'focus:outline-none focus-visible:ring-4 focus-visible:ring-pink-400';

const btnBase = `cursor-pointer border-4 border-black font-black uppercase text-black shadow-[3px_3px_0_0_#000] transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[1px_1px_0_0_#000] active:translate-x-1 active:translate-y-1 active:shadow-none disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none disabled:hover:translate-x-0 disabled:hover:translate-y-0 ${focusRing}`;

const btnPrimary = `${btnBase} bg-teal-400 hover:bg-teal-300 px-4 py-2 text-sm`;
const btnSecondary = `${btnBase} bg-white hover:bg-yellow-300 px-4 py-2 text-sm`;
const btnView = `${btnBase} bg-white hover:bg-yellow-300 px-2 py-1 text-xs`;
const btnDone = `${btnBase} bg-lime-300 hover:bg-lime-200 px-2 py-1 text-xs`;
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

const StatusBadge = ({ status }) => (
  <span className={`inline-block border-2 border-black px-2 py-0.5 text-xs font-black uppercase text-black ${STATUS[status].badge}`}>
    {STATUS[status].label}
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

const ImunisasiKader = () => {
  const { user } = useAuth();
  const namaPetugas = user?.name ?? 'Kader';

  const [data, setData] = useState(dataAwal);
  const [cari, setCari] = useState('');
  const [vaksin, setVaksin] = useState('SEMUA');
  const [status, setStatus] = useState('SEMUA');
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

  // Gabungkan dengan nama balita, umur, dan status yang ditampilkan
  const rows = useMemo(
    () =>
      data.map((d) => {
        const b = balitaMap[d.balitaId];
        return {
          ...d,
          balita: b?.nama ?? 'Balita tidak ditemukan',
          umur: b ? hitungUmur(b.lahir, d.status === 'SUDAH' ? d.tanggal : undefined) : '-',
          statusTampil: statusEfektif(d),
        };
      }),
    [data, balitaMap]
  );

  const jumlah = (s) => rows.filter((d) => d.statusTampil === s).length;

  const tampil = useMemo(() => {
    const q = cari.trim().toLowerCase();
    return rows
      .filter((d) => {
        const cocokVaksin = vaksin === 'SEMUA' || d.vaksin === vaksin;
        const cocokStatus = status === 'SEMUA' || d.statusTampil === status;
        const cocokCari = !q || d.balita.toLowerCase().includes(q) || d.petugas.toLowerCase().includes(q);
        return cocokVaksin && cocokStatus && cocokCari;
      })
      .sort((a, b) => b.tanggal.localeCompare(a.tanggal) || b.id - a.id);
  }, [rows, cari, vaksin, status]);

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

  const bukaTambah = () => {
    setEditId(null);
    setForm(formKosong());
    setError({});
    setPesan('');
    setFormBuka(true);
  };

  const bukaUbah = (d, override = {}) => {
    setEditId(d.id);
    setForm({
      balitaId: String(d.balitaId),
      vaksin: d.vaksin,
      dosis: d.dosis,
      tanggal: d.tanggal,
      status: d.status,
      catatan: d.catatan,
      ...override,
    });
    setError({});
    setPesan('');
    setFormBuka(true);
  };

  // Jalan pintas: buka form dengan status Sudah dan tanggal hari ini
  const tandaiSudah = (d) => bukaUbah(d, { status: 'SUDAH', tanggal: hariIni() });

  const ubahField = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const validasi = () => {
    const err = {};
    const balita = balitaMap[Number(form.balitaId)];
    if (!balita) err.balitaId = 'Pilih balita yang diimunisasi.';
    if (!form.tanggal) {
      err.tanggal = 'Tanggal wajib diisi.';
    } else if (balita && form.tanggal < balita.lahir) {
      err.tanggal = 'Tanggal tidak boleh sebelum tanggal lahir balita.';
    } else if (form.status === 'SUDAH' && form.tanggal > hariIni()) {
      err.tanggal = 'Imunisasi yang sudah diberikan tidak boleh bertanggal di masa depan.';
    }
    return err;
  };

  const simpan = (e) => {
    e.preventDefault();
    const err = validasi();
    setError(err);
    if (Object.keys(err).length > 0) return;

    const lama = data.find((d) => d.id === editId);
    const sudah = form.status === 'SUDAH';
    const baru = {
      balitaId: Number(form.balitaId),
      vaksin: form.vaksin,
      dosis: form.dosis,
      tanggal: form.tanggal,
      status: form.status,
      petugas: sudah ? (lama && lama.petugas !== '-' ? lama.petugas : namaPetugas) : '-',
      catatan: form.catatan.trim() || (sudah ? 'Tidak ada catatan.' : 'Belum diberikan.'),
    };
    const nama = balitaMap[baru.balitaId].nama;

    // TODO: panggil API (POST /imunisasi atau PUT /imunisasi/:id), lalu refresh data
    if (editId === null) {
      setData((list) => [{ ...baru, id: Date.now() }, ...list]);
      setPesan(sudah ? `Imunisasi ${baru.vaksin} untuk ${nama} berhasil dicatat.` : `Jadwal ${baru.vaksin} untuk ${nama} berhasil ditambahkan.`);
    } else {
      setData((list) => list.map((d) => (d.id === editId ? { ...d, ...baru } : d)));
      setPesan(`Data imunisasi ${nama} berhasil diperbarui.`);
    }
    setFormBuka(false);
    setHalaman(1);
  };

  const konfirmasiHapus = () => {
    // TODO: panggil API (DELETE /imunisasi/:id)
    setData((list) => list.filter((d) => d.id !== hapusTarget.id));
    setPesan(`Data imunisasi ${hapusTarget.balita} (${hapusTarget.vaksin}) berhasil dihapus.`);
    setHapusTarget(null);
  };

  const balitaTerpilih = balitaMap[Number(form.balitaId)];

  return (
    <div className="space-y-8">
      {/* Judul halaman */}
      <header className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="inline-block border-4 border-black bg-teal-400 px-4 py-2 text-2xl font-black uppercase tracking-tight text-black shadow-[6px_6px_0_0_#000] sm:text-3xl">
            Imunisasi
          </h1>
          <p className="mt-4 text-sm font-bold text-black">
            Catat imunisasi yang sudah diberikan dan atur jadwal imunisasi balita.
          </p>
        </div>
        <button type="button" onClick={bukaTambah} className={`${btnPrimary} flex items-center gap-2 self-start sm:self-auto`}>
          <HiOutlinePlus className="h-5 w-5" aria-hidden="true" />
          Catat imunisasi
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
          <table className="w-full min-w-[1040px] border-collapse text-left text-sm">
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
                    Tidak ada data imunisasi yang cocok. Ubah kata kunci atau filter, atau catat imunisasi baru.
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
                      <StatusBadge status={d.statusTampil} />
                    </td>
                    <td className="px-4 py-3 font-bold text-black">{d.petugas}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        {d.status !== 'SUDAH' && (
                          <button
                            type="button"
                            onClick={() => tandaiSudah(d)}
                            className={`${btnDone} flex items-center gap-1`}
                            aria-label={`Tandai imunisasi ${d.vaksin} ${d.balita} sudah diberikan`}
                          >
                            <HiOutlineCheck className="h-4 w-4" aria-hidden="true" />
                            Sudah
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => setDetail(d)}
                          className={`${btnView} flex items-center gap-1`}
                          aria-label={`Lihat detail imunisasi ${d.balita}`}
                        >
                          <HiOutlineEye className="h-4 w-4" aria-hidden="true" />
                          Lihat
                        </button>
                        <button
                          type="button"
                          onClick={() => bukaUbah(d)}
                          className={`${btnEdit} flex items-center gap-1`}
                          aria-label={`Ubah imunisasi ${d.balita}`}
                        >
                          <HiOutlinePencil className="h-4 w-4" aria-hidden="true" />
                          Ubah
                        </button>
                        <button
                          type="button"
                          onClick={() => setHapusTarget(d)}
                          className={`${btnDanger} flex items-center gap-1`}
                          aria-label={`Hapus imunisasi ${d.balita}`}
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
                <StatusBadge status={detail.statusTampil} />
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

            <div className="mt-8 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => {
                  const d = detail;
                  setDetail(null);
                  bukaUbah(d);
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
                {editId === null ? 'Catat imunisasi' : 'Ubah imunisasi'}
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
                hint={balitaTerpilih ? `Umur sekarang: ${hitungUmur(balitaTerpilih.lahir)}` : undefined}
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

              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Vaksin">
                  <select name="vaksin" value={form.vaksin} onChange={ubahField} className={inputClass}>
                    {DAFTAR_VAKSIN.map((v) => (
                      <option key={v} value={v}>
                        {v}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label="Dosis">
                  <select name="dosis" value={form.dosis} onChange={ubahField} className={inputClass}>
                    {DAFTAR_DOSIS.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </Field>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Status">
                  <select name="status" value={form.status} onChange={ubahField} className={inputClass}>
                    <option value="SUDAH">Sudah diberikan</option>
                    <option value="TERJADWAL">Belum diberikan (jadwal)</option>
                  </select>
                </Field>
                <Field
                  label={form.status === 'SUDAH' ? 'Tanggal diberikan' : 'Tanggal jadwal'}
                  error={error.tanggal}
                  hint={form.status === 'TERJADWAL' ? 'Jadwal yang sudah lewat otomatis ditandai terlambat.' : undefined}
                >
                  <input
                    name="tanggal"
                    type="date"
                    max={form.status === 'SUDAH' ? hariIni() : undefined}
                    value={form.tanggal}
                    onChange={ubahField}
                    className={inputClass}
                  />
                </Field>
              </div>

              <Field label="Catatan">
                <textarea
                  name="catatan"
                  rows={3}
                  value={form.catatan}
                  onChange={ubahField}
                  placeholder="Reaksi setelah imunisasi atau keterangan lain (opsional)"
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
              Hapus data imunisasi?
            </h2>
            <p className="mt-5 text-sm font-bold text-black">
              Data imunisasi <span className="font-black">{hapusTarget.vaksin}</span> untuk{' '}
              <span className="font-black">{hapusTarget.balita}</span> akan dihapus dan tidak bisa dikembalikan.
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

export default ImunisasiKader;