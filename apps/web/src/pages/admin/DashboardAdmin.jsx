import {
  HiOutlineUserGroup,
  HiOutlineHeart,
  HiOutlineClipboardCheck,
  HiOutlineShieldCheck,
  HiOutlineCalendar,
  HiOutlineClock,
  HiOutlineLocationMarker,
} from 'react-icons/hi';

// ===== Data contoh. Ganti dengan data dari API =====
const stats = [
  { label: 'Total balita', value: 128, note: '+6 balita baru bulan ini', icon: HiOutlineUserGroup, tone: 'bg-teal-300' },
  { label: 'Ibu hamil', value: 24, note: '3 perlu kontrol minggu ini', icon: HiOutlineHeart, tone: 'bg-pink-300' },
  { label: 'Kunjungan bulan ini', value: 94, note: '+8% dari bulan lalu', icon: HiOutlineClipboardCheck, tone: 'bg-sky-300' },
  { label: 'Menunggu verifikasi', value: 5, note: 'Akun baru perlu diperiksa', icon: HiOutlineShieldCheck, tone: 'bg-yellow-300' },
];

const kunjungan = [
  { bulan: 'Mei', jumlah: 62 },
  { bulan: 'Jun', jumlah: 71 },
  { bulan: 'Jul', jumlah: 68 },
  { bulan: 'Agu', jumlah: 80 },
  { bulan: 'Sep', jumlah: 87 },
  { bulan: 'Okt', jumlah: 94 },
];

const statusGizi = [
  { label: 'Gizi baik', jumlah: 104, bar: 'bg-lime-400' },
  { label: 'Berisiko gizi kurang', jumlah: 14, bar: 'bg-yellow-300' },
  { label: 'Gizi kurang', jumlah: 7, bar: 'bg-orange-400' },
  { label: 'Gizi buruk', jumlah: 3, bar: 'bg-red-500' },
];

const jadwal = [
  { judul: 'Posyandu Balita', tanggal: 'Sabtu, 7 Nov 2026', jam: '08.00 WIB', tempat: 'Balai RW 08' },
  { judul: 'Pemeriksaan Ibu Hamil', tanggal: 'Selasa, 10 Nov 2026', jam: '09.00 WIB', tempat: 'Balai RW 08' },
  { judul: 'Imunisasi Campak', tanggal: 'Sabtu, 21 Nov 2026', jam: '08.00 WIB', tempat: 'Balai RW 08' },
];

const verifikasi = [
  { nama: 'Siti Aminah', peran: 'Orang tua', waktu: '2 jam lalu' },
  { nama: 'Dewi Lestari', peran: 'Kader', waktu: '5 jam lalu' },
  { nama: 'Rahmat Hidayat', peran: 'Orang tua', waktu: 'Kemarin' },
];

const aktivitas = [
  { teks: 'Kader Rina mencatat penimbangan 12 balita', waktu: '30 menit lalu' },
  { teks: 'Pendaftaran akun baru atas nama Siti Aminah', waktu: '2 jam lalu' },
  { teks: 'Jadwal Imunisasi Campak ditambahkan', waktu: 'Kemarin' },
  { teks: 'Laporan bulanan September diekspor', waktu: '2 hari lalu' },
];

const card = 'border-4 border-black bg-white p-6 shadow-[8px_8px_0_0_#000]';

const cardTitle =
  'inline-block border-4 border-black bg-yellow-300 px-3 py-1 text-sm font-black uppercase tracking-wide text-black shadow-[3px_3px_0_0_#000]';

const linkButton =
  'cursor-pointer border-2 border-black bg-white px-2 py-1 text-xs font-black uppercase text-black shadow-[3px_3px_0_0_#000] transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:bg-pink-300 hover:shadow-[1px_1px_0_0_#000] active:translate-x-1 active:translate-y-1 active:shadow-none focus:outline-none focus-visible:ring-4 focus-visible:ring-pink-400';

const DashboardAdmin = () => {
  const maxKunjungan = Math.max(...kunjungan.map((k) => k.jumlah));
  const totalGizi = statusGizi.reduce((sum, g) => sum + g.jumlah, 0);
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
            Dashboard Admin
          </h1>
          <p className="mt-4 text-sm font-bold text-black">Ringkasan kegiatan Posyandu RW 08.</p>
        </div>
        <p className="inline-block self-start border-4 border-black bg-white px-3 py-1.5 text-xs font-black uppercase text-black shadow-[4px_4px_0_0_#000] sm:self-auto">
          {today}
        </p>
      </header>

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

      {/* Grafik kunjungan + status gizi */}
      <section className="grid gap-6 lg:grid-cols-3">
        <div className={`${card} lg:col-span-2`}>
          <h2 className={cardTitle}>Kunjungan 6 bulan terakhir</h2>
          <p className="mt-3 text-sm font-bold text-black">Jumlah balita dan ibu hamil yang datang ke posyandu.</p>

          <div
            role="img"
            aria-label={`Grafik kunjungan: ${kunjungan.map((k) => `${k.bulan} ${k.jumlah}`).join(', ')}`}
            className="mt-6 flex items-end gap-3 border-b-4 border-black sm:gap-5"
          >
            {kunjungan.map((k, index) => (
              <div key={k.bulan} className="flex flex-1 flex-col items-center gap-2">
                <span className="text-xs font-black text-black">{k.jumlah}</span>
                <div className="flex h-40 w-full items-end justify-center">
                  <div
                    className={`w-full max-w-14 border-4 border-b-0 border-black ${
                      index === kunjungan.length - 1 ? 'bg-pink-400' : 'bg-teal-300'
                    }`}
                    style={{ height: `${(k.jumlah / maxKunjungan) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-2 flex gap-3 sm:gap-5">
            {kunjungan.map((k) => (
              <span key={k.bulan} className="flex-1 text-center text-xs font-black uppercase text-black">
                {k.bulan}
              </span>
            ))}
          </div>
        </div>

        <div className={card}>
          <h2 className={cardTitle}>Status gizi balita</h2>
          <p className="mt-3 text-sm font-bold text-black">Dari {totalGizi} balita terdata.</p>

          <ul className="mt-6 space-y-5">
            {statusGizi.map((g) => {
              const persen = Math.round((g.jumlah / totalGizi) * 100);
              return (
                <li key={g.label}>
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-bold text-black">{g.label}</span>
                    <span className="font-black text-black">
                      {g.jumlah} <span className="font-bold">({persen}%)</span>
                    </span>
                  </div>
                  <div className="mt-1.5 h-5 overflow-hidden border-4 border-black bg-white">
                    <div className={`h-full border-r-4 border-black ${g.bar}`} style={{ width: `${persen}%` }} />
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* Jadwal, verifikasi, aktivitas */}
      <section className="grid gap-6 lg:grid-cols-3">
        <div className={card}>
          <div className="flex items-center justify-between gap-2">
            <h2 className={cardTitle}>Jadwal mendatang</h2>
            <button type="button" className={linkButton}>Lihat semua</button>
          </div>

          <ul className="mt-6 space-y-4">
            {jadwal.map((j) => (
              <li key={j.judul} className="border-4 border-black bg-sky-200 p-3 shadow-[4px_4px_0_0_#000]">
                <p className="text-sm font-black uppercase text-black">{j.judul}</p>
                <p className="mt-2 flex items-center gap-1.5 text-xs font-bold text-black">
                  <HiOutlineCalendar className="h-4 w-4" aria-hidden="true" />
                  {j.tanggal}
                </p>
                <p className="mt-1 flex items-center gap-1.5 text-xs font-bold text-black">
                  <HiOutlineClock className="h-4 w-4" aria-hidden="true" />
                  {j.jam}
                </p>
                <p className="mt-1 flex items-center gap-1.5 text-xs font-bold text-black">
                  <HiOutlineLocationMarker className="h-4 w-4" aria-hidden="true" />
                  {j.tempat}
                </p>
              </li>
            ))}
          </ul>
        </div>

        <div className={card}>
          <div className="flex items-center justify-between gap-2">
            <h2 className={cardTitle}>Menunggu verifikasi</h2>
            <button type="button" className={linkButton}>Lihat semua</button>
          </div>

          <ul className="mt-6 space-y-4">
            {verifikasi.map((v) => (
              <li
                key={v.nama}
                className="flex items-center gap-3 border-4 border-black bg-white p-3 shadow-[4px_4px_0_0_#000]"
              >
                <span
                  className="flex h-11 w-11 shrink-0 items-center justify-center border-4 border-black bg-pink-300 text-base font-black text-black"
                  aria-hidden="true"
                >
                  {v.nama.charAt(0)}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-black text-black">{v.nama}</p>
                  <p className="text-xs font-bold text-black">{v.peran} · {v.waktu}</p>
                </div>
                <button
                  type="button"
                  className="cursor-pointer border-4 border-black bg-teal-400 px-2.5 py-1 text-xs font-black uppercase text-black shadow-[3px_3px_0_0_#000] transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:bg-teal-300 hover:shadow-[1px_1px_0_0_#000] active:translate-x-1 active:translate-y-1 active:shadow-none focus:outline-none focus-visible:ring-4 focus-visible:ring-pink-400"
                >
                  Periksa
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className={card}>
          <h2 className={cardTitle}>Aktivitas terbaru</h2>

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

export default DashboardAdmin;