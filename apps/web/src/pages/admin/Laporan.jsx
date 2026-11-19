import { useMemo, useState } from 'react';
import {
  HiOutlineClipboardCheck,
  HiOutlineChartBar,
  HiOutlineScale,
  HiOutlineDownload,
} from 'react-icons/hi';

// ===== Data contoh. Ganti dengan data dari API =====
// Urutan dari bulan terlama ke terbaru. Angka kunjungan dan gizi bulan Oktober
// disamakan dengan DashboardAdmin.
const rekap = [
  { bulan: '2026-05', balita: 118, ditimbang: 100, kunjungan: 62, gizi: { BAIK: 96, BERISIKO: 14, KURANG: 6, BURUK: 2 }, imunisasi: { sudah: 52, terlambat: 9 } },
  { bulan: '2026-06', balita: 120, ditimbang: 104, kunjungan: 71, gizi: { BAIK: 98, BERISIKO: 14, KURANG: 6, BURUK: 2 }, imunisasi: { sudah: 58, terlambat: 8 } },
  { bulan: '2026-07', balita: 122, ditimbang: 103, kunjungan: 68, gizi: { BAIK: 99, BERISIKO: 14, KURANG: 7, BURUK: 2 }, imunisasi: { sudah: 55, terlambat: 10 } },
  { bulan: '2026-08', balita: 124, ditimbang: 108, kunjungan: 80, gizi: { BAIK: 101, BERISIKO: 14, KURANG: 7, BURUK: 2 }, imunisasi: { sudah: 63, terlambat: 8 } },
  { bulan: '2026-09', balita: 126, ditimbang: 112, kunjungan: 87, gizi: { BAIK: 103, BERISIKO: 14, KURANG: 7, BURUK: 2 }, imunisasi: { sudah: 66, terlambat: 7 } },
  { bulan: '2026-10', balita: 128, ditimbang: 111, kunjungan: 94, gizi: { BAIK: 104, BERISIKO: 14, KURANG: 7, BURUK: 3 }, imunisasi: { sudah: 70, terlambat: 6 } },
];

const riwayatAwal = [
  { id: 3, nama: 'Rekap bulanan', periode: '6 bulan terakhir', format: 'CSV', tanggal: '2026-11-17', oleh: 'Admin' },
  { id: 2, nama: 'Laporan bulanan September', periode: 'September 2026', format: 'CSV', tanggal: '2026-10-17', oleh: 'Admin' },
  { id: 1, nama: 'Status gizi', periode: '3 bulan terakhir', format: 'CSV', tanggal: '2026-10-02', oleh: 'Admin' },
];

const labelBulan = (ym) =>
  new Date(`${ym}-01`).toLocaleDateString('id-ID', { month: 'long', year: 'numeric' });

const persen = (a, b) => (b === 0 ? 0 : Math.round((a / b) * 100));

// Kolom tiap jenis laporan. Dipakai untuk tabel pratinjau dan isi file CSV.
const JENIS = {
  REKAP: {
    label: 'Rekap bulanan',
    kolom: [
      { h: 'Bulan', get: (r) => labelBulan(r.bulan) },
      { h: 'Balita terdata', get: (r) => r.balita },
      { h: 'Ditimbang', get: (r) => r.ditimbang },
      { h: 'Cakupan timbang (%)', get: (r) => persen(r.ditimbang, r.balita) },
      { h: 'Kunjungan', get: (r) => r.kunjungan },
    ],
  },
  GIZI: {
    label: 'Status gizi',
    kolom: [
      { h: 'Bulan', get: (r) => labelBulan(r.bulan) },
      { h: 'Gizi baik', get: (r) => r.gizi.BAIK },
      { h: 'Berisiko gizi kurang', get: (r) => r.gizi.BERISIKO },
      { h: 'Gizi kurang', get: (r) => r.gizi.KURANG },
      { h: 'Gizi buruk', get: (r) => r.gizi.BURUK },
    ],
  },
  IMUNISASI: {
    label: 'Imunisasi',
    kolom: [
      { h: 'Bulan', get: (r) => labelBulan(r.bulan) },
      { h: 'Sudah diimunisasi', get: (r) => r.imunisasi.sudah },
      { h: 'Terlambat', get: (r) => r.imunisasi.terlambat },
      { h: 'Cakupan (%)', get: (r) => persen(r.imunisasi.sudah, r.imunisasi.sudah + r.imunisasi.terlambat) },
    ],
  },
};

const PERIODE = {
  3: '3 bulan terakhir',
  6: '6 bulan terakhir',
};

// ===== Kelas bersama (sama dengan DashboardAdmin) =====
const card = 'border-4 border-black bg-white p-6 shadow-[8px_8px_0_0_#000]';

const cardTitle =
  'inline-block border-4 border-black bg-yellow-300 px-3 py-1 text-sm font-black uppercase tracking-wide text-black shadow-[3px_3px_0_0_#000]';

const focusRing = 'focus:outline-none focus-visible:ring-4 focus-visible:ring-pink-400';

const btnPrimary = `cursor-pointer border-4 border-black bg-teal-400 px-4 py-2 text-sm font-black uppercase text-black shadow-[3px_3px_0_0_#000] transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:bg-teal-300 hover:shadow-[1px_1px_0_0_#000] active:translate-x-1 active:translate-y-1 active:shadow-none ${focusRing}`;

const inputClass = `w-full border-4 border-black bg-white px-3 py-2 text-sm font-bold text-black ${focusRing}`;

const formatTanggal = (iso) =>
  new Date(iso).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });

// Unduh CSV di browser. BOM ditambahkan supaya Excel membaca UTF-8 dengan benar.
const unduhCSV = (namaFile, header, baris) => {
  const esc = (v) => `"${String(v).replace(/"/g, '""')}"`;
  const isi = [header, ...baris].map((r) => r.map(esc).join(',')).join('\r\n');
  const blob = new Blob(['\uFEFF' + isi], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = namaFile;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
};

const Laporan = () => {
  const [jenis, setJenis] = useState('REKAP');
  const [periode, setPeriode] = useState('6');
  const [riwayat, setRiwayat] = useState(riwayatAwal);
  const [pesan, setPesan] = useState('');

  const data = useMemo(() => rekap.slice(-Number(periode)).reverse(), [periode]);
  const { kolom } = JENIS[jenis];

  const totalKunjungan = data.reduce((s, r) => s + r.kunjungan, 0);
  const rataKunjungan = Math.round(totalKunjungan / data.length);
  const terbaru = rekap[rekap.length - 1];

  const stats = [
    { label: 'Total kunjungan', value: totalKunjungan, note: PERIODE[periode], icon: HiOutlineClipboardCheck, tone: 'bg-sky-300' },
    { label: 'Rata-rata per bulan', value: rataKunjungan, note: 'Kunjungan balita dan ibu hamil', icon: HiOutlineChartBar, tone: 'bg-teal-300' },
    { label: 'Cakupan timbang terbaru', value: `${persen(terbaru.ditimbang, terbaru.balita)}%`, note: labelBulan(terbaru.bulan), icon: HiOutlineScale, tone: 'bg-lime-300' },
  ];

  const unduh = () => {
    const namaFile = `laporan-${jenis.toLowerCase()}-${periode}-bulan.csv`;
    unduhCSV(
      namaFile,
      kolom.map((k) => k.h),
      data.map((r) => kolom.map((k) => k.get(r)))
    );

    // TODO: simpan catatan ekspor ke API agar riwayat tetap ada setelah halaman dimuat ulang
    setRiwayat((list) => [
      {
        id: Date.now(),
        nama: JENIS[jenis].label,
        periode: PERIODE[periode],
        format: 'CSV',
        tanggal: new Date().toISOString().slice(0, 10),
        oleh: 'Admin',
      },
      ...list,
    ]);
    setPesan(`File ${namaFile} berhasil diunduh.`);
  };

  return (
    <div className="space-y-8">
      {/* Judul halaman */}
      <header>
        <h1 className="inline-block border-4 border-black bg-teal-400 px-4 py-2 text-2xl font-black uppercase tracking-tight text-black shadow-[6px_6px_0_0_#000] sm:text-3xl">
          Laporan
        </h1>
        <p className="mt-4 text-sm font-bold text-black">Buat dan unduh laporan kegiatan Posyandu RW 08.</p>
      </header>

      {/* Ringkasan */}
      <section aria-label="Ringkasan laporan" className="grid gap-6 sm:grid-cols-3">
        {stats.map(({ label, value, note, icon: Icon, tone }) => (
          <div key={label} className="border-4 border-black bg-white p-5 shadow-[6px_6px_0_0_#000]">
            <div className="flex items-center justify-between gap-3">
              <p className="text-xs font-black uppercase tracking-wider text-black">{label}</p>
              <span className={`flex h-11 w-11 shrink-0 items-center justify-center border-4 border-black ${tone}`}>
                <Icon className="h-5 w-5 text-black" aria-hidden="true" />
              </span>
            </div>
            <p className="mt-3 text-4xl font-black text-black">{value}</p>
            <p className="mt-2 border-t-4 border-black pt-2 text-xs font-bold text-black">{note}</p>
          </div>
        ))}
      </section>

      {/* Buat laporan */}
      <section className={card}>
        <h2 className={cardTitle}>Buat laporan</h2>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_auto] lg:items-end">
          <label className="block">
            <span className="mb-1 block text-xs font-black uppercase tracking-wide text-black">Jenis laporan</span>
            <select
              value={jenis}
              onChange={(e) => {
                setJenis(e.target.value);
                setPesan('');
              }}
              className={inputClass}
            >
              {Object.entries(JENIS).map(([key, j]) => (
                <option key={key} value={key}>
                  {j.label}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="mb-1 block text-xs font-black uppercase tracking-wide text-black">Periode</span>
            <select
              value={periode}
              onChange={(e) => {
                setPeriode(e.target.value);
                setPesan('');
              }}
              className={inputClass}
            >
              {Object.entries(PERIODE).map(([key, label]) => (
                <option key={key} value={key}>
                  {label}
                </option>
              ))}
            </select>
          </label>

          <button type="button" onClick={unduh} className={`${btnPrimary} flex items-center justify-center gap-2`}>
            <HiOutlineDownload className="h-5 w-5" aria-hidden="true" />
            Unduh CSV
          </button>
        </div>

        <p role="status" aria-live="polite" className="mt-3 min-h-5 text-xs font-black text-black">
          {pesan}
        </p>

        {/* Pratinjau */}
        <p className="mt-2 text-sm font-bold text-black">
          Pratinjau: {JENIS[jenis].label.toLowerCase()}, {PERIODE[periode]}.
        </p>
        <div className="mt-3 overflow-x-auto border-4 border-black">
          <table className="w-full min-w-[560px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b-4 border-black bg-yellow-300">
                {kolom.map((k) => (
                  <th key={k.h} scope="col" className="px-4 py-3 text-xs font-black uppercase tracking-wider text-black">
                    {k.h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((r) => (
                <tr key={r.bulan} className="border-b-4 border-black last:border-b-0 odd:bg-white even:bg-sky-100">
                  {kolom.map((k, i) => (
                    <td key={k.h} className={`px-4 py-3 text-black ${i === 0 ? 'font-black' : 'font-bold'}`}>
                      {k.get(r)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Riwayat ekspor */}
      <section className={card}>
        <h2 className={cardTitle}>Riwayat ekspor</h2>

        <ul className="mt-6 space-y-4">
          {riwayat.map((r) => (
            <li
              key={r.id}
              className="flex flex-col gap-2 border-4 border-black bg-white p-3 shadow-[4px_4px_0_0_#000] sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="text-sm font-black text-black">{r.nama}</p>
                <p className="text-xs font-bold text-black">
                  {r.periode} · Diekspor {formatTanggal(r.tanggal)} oleh {r.oleh}
                </p>
              </div>
              <span className="self-start border-2 border-black bg-sky-300 px-2 py-0.5 text-xs font-black uppercase text-black sm:self-auto">
                {r.format}
              </span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default Laporan;