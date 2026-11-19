import { useMemo, useState } from 'react';
import {
  HiOutlineScale,
  HiOutlineShieldCheck,
  HiOutlineExclamation,
  HiOutlinePencilAlt,
  HiOutlineCheck,
  HiOutlineReply,
} from 'react-icons/hi';

// ===== Data contoh. Ganti dengan data dari API =====
// Target cakupan (%) dipakai untuk memberi warna bar. Sesuaikan dengan target posyandu.
const TARGET = 80;

// RT yang menjadi wilayah kader ini. Nantinya ambil dari data kader yang login.
const RT_SAYA = ['04'];

const cakupanRT = [
  { rt: '01', balita: 28, ditimbang: 26, imunisasiLengkap: 24 },
  { rt: '02', balita: 25, ditimbang: 22, imunisasiLengkap: 18 },
  { rt: '03', balita: 27, ditimbang: 21, imunisasiLengkap: 20 },
  { rt: '04', balita: 24, ditimbang: 15, imunisasiLengkap: 14 },
  { rt: '05', balita: 24, ditimbang: 19, imunisasiLengkap: 16 },
];

const pencatatanSaya = { penimbangan: 21, imunisasi: 9, balitaBaru: 2 };

const tindakLanjutAwal = [
  { id: 1, nama: 'Naura Azzahra', rt: '02', jenis: 'GIZI', level: 'BURUK', alasan: 'Gizi buruk', tindak: 'Dirujuk ke puskesmas', selesai: false },
  { id: 2, nama: 'Alya Safitri', rt: '04', jenis: 'GIZI', level: 'KURANG', alasan: 'Gizi kurang', tindak: 'Konsultasi gizi', selesai: false },
  { id: 3, nama: 'Dimas Saputra', rt: '05', jenis: 'GIZI', level: 'KURANG', alasan: 'Gizi kurang', tindak: 'PMT, timbang ulang 2 minggu', selesai: false },
  { id: 4, nama: 'Zahra Nabila', rt: '03', jenis: 'GIZI', level: 'BERISIKO', alasan: 'Berisiko gizi kurang', tindak: 'Pantau bulan depan', selesai: false },
  { id: 5, nama: 'Keisha Anindya', rt: '04', jenis: 'GIZI', level: 'BERISIKO', alasan: 'Berisiko gizi kurang', tindak: 'Pantau bulan depan', selesai: true },
  { id: 6, nama: 'Alya Safitri', rt: '04', jenis: 'IMUNISASI', level: 'TERLAMBAT', alasan: 'Polio dosis 4 terlambat', tindak: 'Hubungi orang tua', selesai: false },
  { id: 7, nama: 'Dimas Saputra', rt: '05', jenis: 'IMUNISASI', level: 'TERLAMBAT', alasan: 'DPT-HB-Hib lanjutan terlambat', tindak: 'Kunjungan rumah', selesai: false },
];

const LEVEL = {
  BURUK: 'bg-red-500 text-white',
  KURANG: 'bg-orange-400 text-black',
  BERISIKO: 'bg-yellow-300 text-black',
  TERLAMBAT: 'bg-orange-400 text-black',
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

const btnBase = `cursor-pointer border-4 border-black font-black uppercase text-black shadow-[3px_3px_0_0_#000] transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[1px_1px_0_0_#000] active:translate-x-1 active:translate-y-1 active:shadow-none ${focusRing}`;

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
      <span className="absolute -top-1 bottom-[-4px] w-0.5 bg-black" style={{ left: `${TARGET}%` }} aria-hidden="true" />
    </div>
  </div>
);

const MonitoringKader = () => {
  const [daftar, setDaftar] = useState(tindakLanjutAwal);
  const [tab, setTab] = useState('SEMUA');
  const [hanyaRTSaya, setHanyaRTSaya] = useState(false);
  const [tampilSelesai, setTampilSelesai] = useState(false);
  const [pesan, setPesan] = useState('');

  const totalBalita = cakupanRT.reduce((s, r) => s + r.balita, 0);
  const totalDitimbang = cakupanRT.reduce((s, r) => s + r.ditimbang, 0);
  const totalImunisasi = cakupanRT.reduce((s, r) => s + r.imunisasiLengkap, 0);
  const belumSelesai = daftar.filter((d) => !d.selesai).length;
  const totalCatatan = pencatatanSaya.penimbangan + pencatatanSaya.imunisasi + pencatatanSaya.balitaBaru;

  const tampil = useMemo(
    () =>
      daftar.filter(
        (d) =>
          (tab === 'SEMUA' || d.jenis === tab) &&
          (!hanyaRTSaya || RT_SAYA.includes(d.rt)) &&
          (tampilSelesai || !d.selesai)
      ),
    [daftar, tab, hanyaRTSaya, tampilSelesai]
  );

  // RT milik kader ditampilkan paling atas
  const cakupanUrut = useMemo(
    () => [...cakupanRT].sort((a, b) => Number(RT_SAYA.includes(b.rt)) - Number(RT_SAYA.includes(a.rt)) || a.rt.localeCompare(b.rt)),
    []
  );

  const toggleSelesai = (item) => {
    // TODO: panggil API (PATCH /tindak-lanjut/:id) untuk menyimpan status selesai
    setDaftar((list) => list.map((d) => (d.id === item.id ? { ...d, selesai: !d.selesai } : d)));
    setPesan(
      item.selesai
        ? `Tindak lanjut ${item.nama} dikembalikan ke belum selesai.`
        : `Tindak lanjut ${item.nama} ditandai selesai.`
    );
  };

  const stats = [
    { label: 'Cakupan penimbangan', value: `${persen(totalDitimbang, totalBalita)}%`, note: `${totalDitimbang} dari ${totalBalita} balita ditimbang`, icon: HiOutlineScale, tone: 'bg-teal-300' },
    { label: 'Imunisasi lengkap', value: `${persen(totalImunisasi, totalBalita)}%`, note: `${totalImunisasi} dari ${totalBalita} balita`, icon: HiOutlineShieldCheck, tone: 'bg-lime-300' },
    { label: 'Tindak lanjut', value: belumSelesai, note: 'Belum selesai dikerjakan', icon: HiOutlineExclamation, tone: 'bg-orange-300' },
    { label: 'Catatan saya', value: totalCatatan, note: 'Pencatatan bulan ini', icon: HiOutlinePencilAlt, tone: 'bg-sky-300' },
  ];

  return (
    <div className="space-y-8">
      {/* Judul halaman */}
      <header>
        <h1 className="inline-block border-4 border-black bg-teal-400 px-4 py-2 text-2xl font-black uppercase tracking-tight text-black shadow-[6px_6px_0_0_#000] sm:text-3xl">
          Monitoring
        </h1>
        <p className="mt-4 text-sm font-bold text-black">
          Pantau cakupan kegiatan dan kerjakan tindak lanjut untuk balita yang perlu perhatian.
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

      {/* Tindak lanjut */}
      <section className={card}>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className={cardTitle}>Tindak lanjut balita</h2>
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

        <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2">
          <label className="flex cursor-pointer items-center gap-2 text-sm font-bold text-black">
            <input
              type="checkbox"
              checked={hanyaRTSaya}
              onChange={(e) => setHanyaRTSaya(e.target.checked)}
              className="h-5 w-5 cursor-pointer accent-teal-500"
            />
            Hanya RT saya (RT {RT_SAYA.join(', ')})
          </label>
          <label className="flex cursor-pointer items-center gap-2 text-sm font-bold text-black">
            <input
              type="checkbox"
              checked={tampilSelesai}
              onChange={(e) => setTampilSelesai(e.target.checked)}
              className="h-5 w-5 cursor-pointer accent-teal-500"
            />
            Tampilkan yang sudah selesai
          </label>
        </div>

        <p
          role="status"
          aria-live="polite"
          className={pesan ? 'mt-4 border-4 border-black bg-lime-300 px-3 py-2 text-sm font-black text-black shadow-[4px_4px_0_0_#000]' : 'sr-only'}
        >
          {pesan}
        </p>

        <div className="mt-6 overflow-x-auto border-4 border-black">
          <table className="w-full min-w-[820px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b-4 border-black bg-yellow-300">
                {['Balita', 'RT', 'Masalah', 'Tindak lanjut', 'Status', 'Aksi'].map((h) => (
                  <th key={h} scope="col" className="px-4 py-3 text-xs font-black uppercase tracking-wider text-black">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tampil.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-10 text-center font-bold text-black">
                    Tidak ada tindak lanjut yang tersisa pada pilihan ini. Kerja bagus!
                  </td>
                </tr>
              ) : (
                tampil.map((d) => (
                  <tr
                    key={d.id}
                    className={`border-b-4 border-black last:border-b-0 ${d.selesai ? 'bg-lime-100' : 'odd:bg-white even:bg-sky-100'}`}
                  >
                    <td className="px-4 py-3 font-black text-black">{d.nama}</td>
                    <td className="px-4 py-3 font-black text-black">
                      RT {d.rt}
                      {RT_SAYA.includes(d.rt) && (
                        <span className="ml-2 border-2 border-black bg-teal-300 px-1.5 py-0.5 text-[10px] font-black uppercase">Saya</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-block border-2 border-black px-2 py-0.5 text-xs font-black uppercase ${LEVEL[d.level]}`}>
                        {d.alasan}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-bold text-black">{d.tindak}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-block border-2 border-black px-2 py-0.5 text-xs font-black uppercase text-black ${
                          d.selesai ? 'bg-lime-400' : 'bg-white'
                        }`}
                      >
                        {d.selesai ? 'Selesai' : 'Belum'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <button
                        type="button"
                        onClick={() => toggleSelesai(d)}
                        className={`${btnBase} flex items-center gap-1 px-2 py-1 text-xs ${
                          d.selesai ? 'bg-white hover:bg-yellow-300' : 'bg-lime-300 hover:bg-lime-200'
                        }`}
                        aria-label={`${d.selesai ? 'Batalkan selesai' : 'Tandai selesai'}: ${d.alasan} ${d.nama}`}
                      >
                        {d.selesai ? (
                          <HiOutlineReply className="h-4 w-4" aria-hidden="true" />
                        ) : (
                          <HiOutlineCheck className="h-4 w-4" aria-hidden="true" />
                        )}
                        {d.selesai ? 'Batalkan' : 'Selesai'}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <p className="mt-4 text-xs font-bold text-black">
          Menampilkan {tampil.length} dari {daftar.length} tindak lanjut.
        </p>
      </section>

      {/* Cakupan per RT + pencatatan saya */}
      <section className="grid gap-6 lg:grid-cols-3">
        <div className={`${card} lg:col-span-2`}>
          <h2 className={cardTitle}>Cakupan per RT</h2>
          <p className="mt-3 text-sm font-bold text-black">Garis hitam pada bar menunjukkan target {TARGET}%.</p>

          <ul className="mt-6 grid gap-6 sm:grid-cols-2">
            {cakupanUrut.map((r) => (
              <li
                key={r.rt}
                className={`border-4 border-black p-4 shadow-[4px_4px_0_0_#000] ${RT_SAYA.includes(r.rt) ? 'bg-teal-100' : 'bg-sky-100'}`}
              >
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-black uppercase text-black">
                    RT {r.rt}
                    {RT_SAYA.includes(r.rt) && (
                      <span className="ml-2 border-2 border-black bg-teal-300 px-1.5 py-0.5 text-[10px] font-black">SAYA</span>
                    )}
                  </p>
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
          <h2 className={cardTitle}>Catatan saya</h2>
          <p className="mt-3 text-sm font-bold text-black">Data yang kamu catat bulan ini.</p>

          <ul className="mt-6 space-y-4">
            {[
              ['Penimbangan', pencatatanSaya.penimbangan, 'bg-teal-300'],
              ['Imunisasi', pencatatanSaya.imunisasi, 'bg-lime-300'],
              ['Balita baru', pencatatanSaya.balitaBaru, 'bg-pink-300'],
            ].map(([label, nilai, tone]) => (
              <li key={label} className="flex items-center justify-between gap-3 border-4 border-black bg-white p-3 shadow-[4px_4px_0_0_#000]">
                <div className="flex items-center gap-3">
                  <span className={`h-5 w-5 border-2 border-black ${tone}`} aria-hidden="true" />
                  <span className="text-sm font-black text-black">{label}</span>
                </div>
                <span className="text-2xl font-black text-black">{nilai}</span>
              </li>
            ))}
          </ul>

          <p className="mt-6 border-t-4 border-black pt-3 text-xs font-bold text-black">
            Total {totalCatatan} pencatatan.
          </p>
        </div>
      </section>
    </div>
  );
};

export default MonitoringKader;