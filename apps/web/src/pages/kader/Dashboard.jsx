import {
  HiOutlineUserGroup,
  HiOutlineScale,
  HiOutlineShieldCheck,
  HiOutlineExclamation,
  HiOutlineUserAdd,
  HiOutlineClipboardList,
  HiOutlineCalendar,
  HiOutlineClock,
  HiOutlineLocationMarker,
} from 'react-icons/hi';

// ===== Data contoh. Ganti dengan data dari API =====
const stats = [
  { label: 'Balita terdata', value: 128, note: '+6 balita baru bulan ini', icon: HiOutlineUserGroup, tone: 'bg-teal-300' },
  { label: 'Sudah ditimbang', value: 94, note: '34 balita belum ditimbang', icon: HiOutlineScale, tone: 'bg-sky-300' },
  { label: 'Imunisasi jatuh tempo', value: 9, note: 'Perlu diingatkan ke orang tua', icon: HiOutlineShieldCheck, tone: 'bg-yellow-300' },
  { label: 'Perlu perhatian', value: 7, note: 'Berat badan tidak naik 2 bulan', icon: HiOutlineExclamation, tone: 'bg-pink-300' },
];

const aksiCepat = [
  { label: 'Catat penimbangan', icon: HiOutlineScale, tone: 'bg-teal-400 hover:bg-teal-300' },
  { label: 'Catat imunisasi', icon: HiOutlineShieldCheck, tone: 'bg-sky-300 hover:bg-sky-200' },
  { label: 'Tambah balita', icon: HiOutlineUserAdd, tone: 'bg-pink-300 hover:bg-pink-200' },
  { label: 'Pemeriksaan ibu hamil', icon: HiOutlineClipboardList, tone: 'bg-yellow-300 hover:bg-yellow-200' },
];

const progress = { ditimbang: 94, total: 128 };

const sesiHariIni = {
  judul: 'Posyandu Balita',
  tanggal: 'Sabtu, 7 Nov 2026',
  jam: '08.00 WIB',
  tempat: 'Balai RW 08',
};

const perluPerhatian = [
  { nama: 'Aisyah Putri', usia: '14 bln', alasan: 'Berat badan tidak naik 2 bulan', status: 'Gizi kurang', badge: 'bg-orange-400' },
  { nama: 'Raka Pratama', usia: '22 bln', alasan: 'Tinggi di bawah standar usia', status: 'Berisiko', badge: 'bg-yellow-300' },
  { nama: 'Naura Salsabila', usia: '9 bln', alasan: 'Belum ditimbang 2 bulan', status: 'Gizi buruk', badge: 'bg-red-500' },
  { nama: 'Farhan Maulana', usia: '30 bln', alasan: 'Berat badan turun dari bulan lalu', status: 'Berisiko', badge: 'bg-yellow-300' },
];

const imunisasi = [
  { nama: 'Zahra Kamila', jenis: 'Campak', jatuhTempo: 'Sabtu, 7 Nov' },
  { nama: 'Bima Saputra', jenis: 'DPT-HB-Hib 3', jatuhTempo: 'Sabtu, 7 Nov' },
  { nama: 'Alya Rahmawati', jenis: 'Polio 4', jatuhTempo: 'Sabtu, 21 Nov' },
  { nama: 'Dimas Aditya', jenis: 'Campak', jatuhTempo: 'Sabtu, 21 Nov' },
];

const aktivitas = [
  { teks: 'Menimbang 12 balita di RT 03', waktu: '30 menit lalu' },
  { teks: 'Mencatat imunisasi Campak untuk Zahra Kamila', waktu: '2 jam lalu' },
  { teks: 'Menambahkan data balita baru: Naura Salsabila', waktu: 'Kemarin' },
  { teks: 'Mengubah data pemeriksaan Raka Pratama', waktu: '2 hari lalu' },
];

const card = 'border-4 border-black bg-white p-6 shadow-[8px_8px_0_0_#000]';

const cardTitle =
  'inline-block border-4 border-black bg-yellow-300 px-3 py-1 text-sm font-black uppercase tracking-wide text-black shadow-[3px_3px_0_0_#000]';

const linkButton =
  'cursor-pointer border-2 border-black bg-white px-2 py-1 text-xs font-black uppercase text-black shadow-[3px_3px_0_0_#000] transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:bg-pink-300 hover:shadow-[1px_1px_0_0_#000] active:translate-x-1 active:translate-y-1 active:shadow-none focus:outline-none focus-visible:ring-4 focus-visible:ring-pink-400';

const Dashboard = () => {
  const persenTimbang = Math.round((progress.ditimbang / progress.total) * 100);
  const belumDitimbang = progress.total - progress.ditimbang;
  const today = new Date().toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="space-y-8">
      {/* Judul halaman */}
      <header className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="inline-block border-4 border-black bg-teal-400 px-4 py-2 text-2xl font-black uppercase tracking-tight text-black shadow-[6px_6px_0_0_#000] sm:text-3xl">
            Dashboard Kader
          </h1>
          <p className="mt-4 text-sm font-bold text-black">
            Selamat bertugas! Ada {belumDitimbang} balita yang belum ditimbang bulan ini.
          </p>
        </div>
        <p className="inline-block self-start border-4 border-black bg-white px-3 py-1.5 text-xs font-black uppercase text-black shadow-[4px_4px_0_0_#000] sm:self-auto">
          {today}
        </p>
      </header>

      {/* Aksi cepat */}
      <section aria-label="Aksi cepat" className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {aksiCepat.map(({ label, icon: Icon, tone }) => (
          <button
            key={label}
            type="button"
            className={`flex cursor-pointer items-center gap-3 border-4 border-black px-4 py-4 text-left text-sm font-black uppercase text-black shadow-[6px_6px_0_0_#000] transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[3px_3px_0_0_#000] active:translate-x-1.5 active:translate-y-1.5 active:shadow-none focus:outline-none focus-visible:ring-4 focus-visible:ring-pink-400 ${tone}`}
          >
            <Icon className="h-6 w-6 shrink-0" aria-hidden="true" />
            {label}
          </button>
        ))}
      </section>

      {/* Statistik utama */}
      <section aria-label="Statistik utama" className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map(({ label, value, note, icon: Icon, tone }) => (
          <div
            key={label}
            className="border-4 border-black bg-white p-5 shadow-[6px_6px_0_0_#000] transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[9px_9px_0_0_#000]"
          >
            <div className="flex items-center justify-between gap-3">
              <p className="text-xs font-black uppercase tracking-wider text-black">{label}</p>
              <span className={`flex h-11 w-11 shrink-0 items-center justify-center border-4 border-black ${tone}`}>
                <Icon className="h-5 w-5 text-black" aria-hidden="true" />
              </span>
            </div>
            <p className="mt-3 text-4xl font-black text-black">{value.toLocaleString('id-ID')}</p>
            <p className="mt-2 border-t-4 border-black pt-2 text-xs font-bold text-black">{note}</p>
          </div>
        ))}
      </section>

      {/* Progres penimbangan + sesi hari ini */}
      <section className="grid gap-6 lg:grid-cols-3">
        <div className={`${card} lg:col-span-2`}>
          <h2 className={cardTitle}>Progres penimbangan bulan ini</h2>
          <p className="mt-3 text-sm font-bold text-black">
            {progress.ditimbang} dari {progress.total} balita sudah ditimbang.
          </p>

          <div className="mt-6 flex items-end justify-between">
            <p className="text-6xl font-black text-black">{persenTimbang}%</p>
            <p className="text-sm font-bold text-black">Sisa {belumDitimbang} balita</p>
          </div>
          <div
            role="progressbar"
            aria-valuenow={persenTimbang}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Progres penimbangan bulan ini"
            className="mt-3 h-8 overflow-hidden border-4 border-black bg-white"
          >
            <div className="h-full border-r-4 border-black bg-teal-400" style={{ width: `${persenTimbang}%` }} />
          </div>
        </div>

        <div className={card}>
          <h2 className={cardTitle}>Sesi mendatang</h2>

          <div className="mt-6 border-4 border-black bg-sky-200 p-4 shadow-[4px_4px_0_0_#000]">
            <p className="text-sm font-black uppercase text-black">{sesiHariIni.judul}</p>
            <p className="mt-3 flex items-center gap-1.5 text-xs font-bold text-black">
              <HiOutlineCalendar className="h-4 w-4" aria-hidden="true" />
              {sesiHariIni.tanggal}
            </p>
            <p className="mt-1 flex items-center gap-1.5 text-xs font-bold text-black">
              <HiOutlineClock className="h-4 w-4" aria-hidden="true" />
              {sesiHariIni.jam}
            </p>
            <p className="mt-1 flex items-center gap-1.5 text-xs font-bold text-black">
              <HiOutlineLocationMarker className="h-4 w-4" aria-hidden="true" />
              {sesiHariIni.tempat}
            </p>
          </div>
        </div>
      </section>

      {/* Balita perlu perhatian, imunisasi, aktivitas */}
      <section className="grid gap-6 lg:grid-cols-3">
        <div className={card}>
          <div className="flex items-center justify-between gap-2">
            <h2 className={cardTitle}>Perlu perhatian</h2>
            <button type="button" className={linkButton}>Lihat semua</button>
          </div>

          <ul className="mt-6 space-y-4">
            {perluPerhatian.map((b) => (
              <li key={b.nama} className="border-4 border-black bg-white p-3 shadow-[4px_4px_0_0_#000]">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-black text-black">{b.nama}</p>
                    <p className="text-xs font-bold text-black">{b.usia}</p>
                  </div>
                  <span
                    className={`shrink-0 border-2 border-black px-2 py-0.5 text-xs font-black uppercase ${b.badge} ${
                      b.badge === 'bg-red-500' ? 'text-white' : 'text-black'
                    }`}
                  >
                    {b.status}
                  </span>
                </div>
                <p className="mt-2 border-t-4 border-black pt-2 text-xs font-bold text-black">{b.alasan}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className={card}>
          <div className="flex items-center justify-between gap-2">
            <h2 className={cardTitle}>Imunisasi jatuh tempo</h2>
            <button type="button" className={linkButton}>Lihat semua</button>
          </div>

          <ul className="mt-6 space-y-4">
            {imunisasi.map((i) => (
              <li
                key={`${i.nama}-${i.jenis}`}
                className="flex items-center gap-3 border-4 border-black bg-white p-3 shadow-[4px_4px_0_0_#000]"
              >
                <span
                  className="flex h-11 w-11 shrink-0 items-center justify-center border-4 border-black bg-pink-300 text-base font-black text-black"
                  aria-hidden="true"
                >
                  {i.nama.charAt(0)}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-black text-black">{i.nama}</p>
                  <p className="text-xs font-bold text-black">{i.jenis} · {i.jatuhTempo}</p>
                </div>
                <button
                  type="button"
                  className="cursor-pointer border-4 border-black bg-teal-400 px-2.5 py-1 text-xs font-black uppercase text-black shadow-[3px_3px_0_0_#000] transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:bg-teal-300 hover:shadow-[1px_1px_0_0_#000] active:translate-x-1 active:translate-y-1 active:shadow-none focus:outline-none focus-visible:ring-4 focus-visible:ring-pink-400"
                >
                  Catat
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className={card}>
          <h2 className={cardTitle}>Aktivitas saya</h2>

          <ul className="mt-6 space-y-4">
            {aktivitas.map((a, index) => (
              <li key={a.teks} className="flex gap-3">
                <span
                  className={`mt-1 h-4 w-4 shrink-0 border-2 border-black ${
                    ['bg-pink-400', 'bg-teal-400', 'bg-yellow-300', 'bg-sky-300'][index % 4]
                  }`}
                  aria-hidden="true"
                />
                <div>
                  <p className="text-sm font-bold text-black">{a.teks}</p>
                  <p className="mt-0.5 text-xs font-semibold text-slate-700">{a.waktu}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;