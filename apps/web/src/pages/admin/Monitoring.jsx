import { useMemo, useState } from 'react';
import {
  HiOutlineScale,
  HiOutlineShieldCheck,
  HiOutlineExclamation,
  HiOutlineUserGroup,
} from 'react-icons/hi';

// ===== Data contoh. Ganti dengan data dari API =====
// Target cakupan (%) dipakai untuk memberi warna bar. Sesuaikan dengan target posyandu.
const TARGET = 80;

const cakupanRT = [
  { rt: '01', balita: 28, ditimbang: 26, imunisasiLengkap: 24 },
  { rt: '02', balita: 25, ditimbang: 22, imunisasiLengkap: 18 },
  { rt: '03', balita: 27, ditimbang: 21, imunisasiLengkap: 20 },
  { rt: '04', balita: 24, ditimbang: 15, imunisasiLengkap: 14 },
  { rt: '05', balita: 24, ditimbang: 19, imunisasiLengkap: 16 },
];

const perhatian = [
  { id: 1, nama: 'Naura Azzahra', rt: '02', jenis: 'GIZI', level: 'BURUK', alasan: 'Gizi buruk', kader: 'Dewi Lestari', tindak: 'Dirujuk ke puskesmas' },
  { id: 2, nama: 'Alya Safitri', rt: '04', jenis: 'GIZI', level: 'KURANG', alasan: 'Gizi kurang', kader: 'Yuli Handayani', tindak: 'Konsultasi gizi' },
  { id: 3, nama: 'Dimas Saputra', rt: '05', jenis: 'GIZI', level: 'KURANG', alasan: 'Gizi kurang', kader: 'Nina Rahmawati', tindak: 'PMT, timbang ulang 2 minggu' },
  { id: 4, nama: 'Zahra Nabila', rt: '03', jenis: 'GIZI', level: 'BERISIKO', alasan: 'Berisiko gizi kurang', kader: 'Dewi Lestari', tindak: 'Pantau bulan depan' },
  { id: 5, nama: 'Keisha Anindya', rt: '04', jenis: 'GIZI', level: 'BERISIKO', alasan: 'Berisiko gizi kurang', kader: 'Yuli Handayani', tindak: 'Pantau bulan depan' },
  { id: 6, nama: 'Alya Safitri', rt: '04', jenis: 'IMUNISASI', level: 'TERLAMBAT', alasan: 'Polio dosis 4 terlambat', kader: 'Yuli Handayani', tindak: 'Hubungi orang tua' },
  { id: 7, nama: 'Dimas Saputra', rt: '05', jenis: 'IMUNISASI', level: 'TERLAMBAT', alasan: 'DPT-HB-Hib lanjutan terlambat', kader: 'Nina Rahmawati', tindak: 'Kunjungan rumah' },
];

const aktivitasKader = [
  { nama: 'Rina Marlina', rt: '01', pencatatan: 34, terakhir: '30 menit lalu' },
  { nama: 'Dewi Lestari', rt: '02, 03', pencatatan: 27, terakhir: '5 jam lalu' },
  { nama: 'Yuli Handayani', rt: '04', pencatatan: 21, terakhir: 'Kemarin' },
  { nama: 'Nina Rahmawati', rt: '05', pencatatan: 12, terakhir: '3 hari lalu' },
  { nama: 'Sari Wulandari', rt: '05', pencatatan: 0, terakhir: '24 hari lalu' },
];

const LEVEL = {
  BURUK: { badge: 'bg-red-500 text-white' },
  KURANG: { badge: 'bg-orange-400 text-black' },
  BERISIKO: { badge: 'bg-yellow-300 text-black' },
  TERLAMBAT: { badge: 'bg-orange-400 text-black' },
};

const TAB = [
  { key: 'SEMUA', label: 'Semua' },
  { key: 'GIZI', label: 'Gizi' },
  { key: 'IMUNISASI', label: 'Imunisasi' },
];

// ===== Kelas bersama (sama dengan DashboardAdmin) =====
const card = 'border-4 border-black bg-white p-6 shadow-[8px_8px_0_0_#000]';

const cardTitle =
  'inline-block border-4 border-black bg-yellow-300 px-3 py-1 text-sm font-black uppercase tracking-wide text-black shadow-[3px_3px_0_0_#000]';

const focusRing = 'focus:outline-none focus-visible:ring-4 focus-visible:ring-pink-400';

const tabBase = `cursor-pointer border-4 border-black px-3 py-1 text-xs font-black uppercase text-black shadow-[3px_3px_0_0_#000] transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[1px_1px_0_0_#000] ${focusRing}`;

const persen = (a, b) => (b === 0 ? 0 : Math.round((a / b) * 100));

const warnaBar = (p) => (p >= TARGET ? 'bg-lime-400' : p >= 60 ? 'bg-yellow-300' : 'bg-orange-400');

const Bar = ({ label, nilai }) => (
  <div>
    <div className="flex items-center justify-between text-xs">
      <span className="font-bold text-black">{label}</span>
      <span className="font-black text-black">{nilai}%</span>
    </div>
    <div className="relative mt-1 h-5 border-4 border-black bg-white">
      <div className={`h-full border-r-4 border-black ${warnaBar(nilai)}`} style={{ width: `${nilai}%` }} />
      {/* Penanda target */}
      <span
        className="absolute -top-1 bottom-[-4px] w-0.5 bg-black"
        style={{ left: `${TARGET}%` }}
        aria-hidden="true"
      />
    </div>
  </div>
);

const Monitoring = () => {
  const [tab, setTab] = useState('SEMUA');

  const totalBalita = cakupanRT.reduce((s, r) => s + r.balita, 0);
  const totalDitimbang = cakupanRT.reduce((s, r) => s + r.ditimbang, 0);
  const totalImunisasi = cakupanRT.reduce((s, r) => s + r.imunisasiLengkap, 0);
  const kaderAktif = aktivitasKader.filter((k) => k.pencatatan > 0).length;
  const maxCatat = Math.max(...aktivitasKader.map((k) => k.pencatatan), 1);

  const daftarPerhatian = useMemo(
    () => perhatian.filter((p) => tab === 'SEMUA' || p.jenis === tab),
    [tab]
  );

  const stats = [
    { label: 'Cakupan penimbangan', value: `${persen(totalDitimbang, totalBalita)}%`, note: `${totalDitimbang} dari ${totalBalita} balita ditimbang`, icon: HiOutlineScale, tone: 'bg-teal-300' },
    { label: 'Imunisasi lengkap', value: `${persen(totalImunisasi, totalBalita)}%`, note: `${totalImunisasi} dari ${totalBalita} balita`, icon: HiOutlineShieldCheck, tone: 'bg-lime-300' },
    { label: 'Perlu perhatian', value: perhatian.length, note: 'Kasus gizi dan imunisasi', icon: HiOutlineExclamation, tone: 'bg-orange-300' },
    { label: 'Kader aktif', value: `${kaderAktif}/${aktivitasKader.length}`, note: 'Sudah mencatat bulan ini', icon: HiOutlineUserGroup, tone: 'bg-sky-300' },
  ];

  return (
    <div className="space-y-8">
      {/* Judul halaman */}
      <header>
        <h1 className="inline-block border-4 border-black bg-teal-400 px-4 py-2 text-2xl font-black uppercase tracking-tight text-black shadow-[6px_6px_0_0_#000] sm:text-3xl">
          Monitoring
        </h1>
        <p className="mt-4 text-sm font-bold text-black">
          Pantau cakupan kegiatan, balita yang perlu tindak lanjut, dan aktivitas kader.
        </p>
      </header>

      {/* Ringkasan */}
      <section aria-label="Ringkasan monitoring" className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
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

      {/* Cakupan per RT + aktivitas kader */}
      <section className="grid gap-6 lg:grid-cols-2">
        <div className={card}>
          <h2 className={cardTitle}>Cakupan per RT</h2>
          <p className="mt-3 text-sm font-bold text-black">
            Garis hitam pada bar menunjukkan target {TARGET}%.
          </p>

          <ul className="mt-6 space-y-6">
            {cakupanRT.map((r) => (
              <li key={r.rt} className="border-4 border-black bg-sky-100 p-4 shadow-[4px_4px_0_0_#000]">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-black uppercase text-black">RT {r.rt}</p>
                  <p className="text-xs font-bold text-black">{r.balita} balita</p>
                </div>
                <div className="mt-3 space-y-3">
                  <Bar label="Penimbangan" nilai={persen(r.ditimbang, r.balita)} />
                  <Bar label="Imunisasi lengkap" nilai={persen(r.imunisasiLengkap, r.balita)} />
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className={card}>
          <h2 className={cardTitle}>Aktivitas kader</h2>
          <p className="mt-3 text-sm font-bold text-black">Jumlah pencatatan bulan ini.</p>

          <ul className="mt-6 space-y-4">
            {aktivitasKader.map((k) => (
              <li key={k.nama} className="border-4 border-black bg-white p-3 shadow-[4px_4px_0_0_#000]">
                <div className="flex items-center gap-3">
                  <span
                    className="flex h-10 w-10 shrink-0 items-center justify-center border-4 border-black bg-pink-300 font-black text-black"
                    aria-hidden="true"
                  >
                    {k.nama.charAt(0)}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-black text-black">{k.nama}</p>
                    <p className="text-xs font-bold text-black">
                      RT {k.rt} · Terakhir: {k.terakhir}
                    </p>
                  </div>
                  {k.pencatatan === 0 ? (
                    <span className="border-2 border-black bg-orange-400 px-2 py-0.5 text-xs font-black uppercase text-black">
                      Belum input
                    </span>
                  ) : (
                    <span className="text-lg font-black text-black">{k.pencatatan}</span>
                  )}
                </div>
                <div className="mt-2 h-3 border-2 border-black bg-white">
                  <div
                    className="h-full border-r-2 border-black bg-teal-400"
                    style={{ width: `${(k.pencatatan / maxCatat) * 100}%` }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Balita perlu perhatian */}
      <section className={card}>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className={cardTitle}>Balita perlu perhatian</h2>
          <div className="flex gap-2" role="tablist" aria-label="Jenis kasus">
            {TAB.map((t) => (
              <button
                key={t.key}
                type="button"
                role="tab"
                aria-selected={tab === t.key}
                onClick={() => setTab(t.key)}
                className={`${tabBase} ${tab === t.key ? 'bg-teal-400' : 'bg-white hover:bg-yellow-300'}`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 overflow-x-auto border-4 border-black">
          <table className="w-full min-w-[720px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b-4 border-black bg-yellow-300">
                {['Balita', 'RT', 'Masalah', 'Tindak lanjut', 'Kader'].map((h) => (
                  <th key={h} scope="col" className="px-4 py-3 text-xs font-black uppercase tracking-wider text-black">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {daftarPerhatian.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-10 text-center font-bold text-black">
                    Tidak ada balita yang perlu perhatian pada kategori ini.
                  </td>
                </tr>
              ) : (
                daftarPerhatian.map((p) => (
                  <tr key={p.id} className="border-b-4 border-black last:border-b-0 odd:bg-white even:bg-sky-100">
                    <td className="px-4 py-3 font-black text-black">{p.nama}</td>
                    <td className="px-4 py-3 font-black text-black">RT {p.rt}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-block border-2 border-black px-2 py-0.5 text-xs font-black uppercase ${LEVEL[p.level].badge}`}>
                        {p.alasan}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-bold text-black">{p.tindak}</td>
                    <td className="px-4 py-3 font-bold text-black">{p.kader}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <p className="mt-4 text-xs font-bold text-black">
          Menampilkan {daftarPerhatian.length} dari {perhatian.length} kasus.
        </p>
      </section>
    </div>
  );
};

export default Monitoring;