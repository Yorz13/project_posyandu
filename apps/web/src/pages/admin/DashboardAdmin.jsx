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
  { label: 'Total balita', value: 128, note: '+6 balita baru bulan ini', icon: HiOutlineUserGroup, tone: 'bg-teal-50 text-teal-700' },
  { label: 'Ibu hamil', value: 24, note: '3 perlu kontrol minggu ini', icon: HiOutlineHeart, tone: 'bg-rose-50 text-rose-600' },
  { label: 'Kunjungan bulan ini', value: 94, note: '+8% dari bulan lalu', icon: HiOutlineClipboardCheck, tone: 'bg-sky-50 text-sky-700' },
  { label: 'Menunggu verifikasi', value: 5, note: 'Akun baru perlu diperiksa', icon: HiOutlineShieldCheck, tone: 'bg-amber-50 text-amber-700' },
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
  { label: 'Gizi baik', jumlah: 104, bar: 'bg-emerald-500' },
  { label: 'Berisiko gizi kurang', jumlah: 14, bar: 'bg-amber-400' },
  { label: 'Gizi kurang', jumlah: 7, bar: 'bg-orange-500' },
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

const card = 'rounded-2xl border border-slate-200 bg-white p-6 shadow-sm';
const linkButton =
  'text-sm font-medium text-teal-700 transition-colors hover:text-teal-800 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2 rounded';

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
      <header className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Dashboard Admin</h1>
          <p className="mt-1 text-sm text-slate-600">Ringkasan kegiatan Posyandu RW 08.</p>
        </div>
        <p className="text-sm text-slate-500">{today}</p>
      </header>

      {/* Statistik utama */}
      <section aria-label="Statistik utama" className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map(({ label, value, note, icon: Icon, tone }) => (
          <div key={label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-slate-600">{label}</p>
              <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${tone}`}>
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
            </div>
            <p className="mt-3 text-3xl font-bold text-slate-900">{value.toLocaleString('id-ID')}</p>
            <p className="mt-1 text-xs text-slate-500">{note}</p>
          </div>
        ))}
      </section>

      {/* Grafik kunjungan + status gizi */}
      <section className="grid gap-6 lg:grid-cols-3">
        <div className={`${card} lg:col-span-2`}>
          <h2 className="text-base font-semibold text-slate-900">Kunjungan 6 bulan terakhir</h2>
          <p className="text-sm text-slate-500">Jumlah balita dan ibu hamil yang datang ke posyandu.</p>

          <div
            role="img"
            aria-label={`Grafik kunjungan: ${kunjungan.map((k) => `${k.bulan} ${k.jumlah}`).join(', ')}`}
            className="mt-6 flex items-end gap-3 sm:gap-5"
          >
            {kunjungan.map((k, index) => (
              <div key={k.bulan} className="flex flex-1 flex-col items-center gap-2">
                <span className="text-xs font-semibold text-slate-700">{k.jumlah}</span>
                <div className="flex h-40 w-full items-end justify-center">
                  <div
                    className={`w-full max-w-14 rounded-t-lg ${index === kunjungan.length - 1 ? 'bg-teal-600' : 'bg-teal-200'}`}
                    style={{ height: `${(k.jumlah / maxKunjungan) * 100}%` }}
                  />
                </div>
                <span className="text-xs text-slate-500">{k.bulan}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={card}>
          <h2 className="text-base font-semibold text-slate-900">Status gizi balita</h2>
          <p className="text-sm text-slate-500">Dari {totalGizi} balita terdata.</p>

          <ul className="mt-6 space-y-4">
            {statusGizi.map((g) => {
              const persen = Math.round((g.jumlah / totalGizi) * 100);
              return (
                <li key={g.label}>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-700">{g.label}</span>
                    <span className="font-semibold text-slate-900">
                      {g.jumlah} <span className="font-normal text-slate-500">({persen}%)</span>
                    </span>
                  </div>
                  <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-slate-100">
                    <div className={`h-full rounded-full ${g.bar}`} style={{ width: `${persen}%` }} />
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
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-slate-900">Jadwal mendatang</h2>
            <button type="button" className={linkButton}>Lihat semua</button>
          </div>

          <ul className="mt-5 space-y-5">
            {jadwal.map((j) => (
              <li key={j.judul} className="border-l-2 border-teal-500 pl-4">
                <p className="text-sm font-semibold text-slate-900">{j.judul}</p>
                <p className="mt-1 flex items-center gap-1.5 text-xs text-slate-600">
                  <HiOutlineCalendar className="h-4 w-4 text-slate-400" aria-hidden="true" />
                  {j.tanggal}
                </p>
                <p className="mt-1 flex items-center gap-1.5 text-xs text-slate-600">
                  <HiOutlineClock className="h-4 w-4 text-slate-400" aria-hidden="true" />
                  {j.jam}
                </p>
                <p className="mt-1 flex items-center gap-1.5 text-xs text-slate-600">
                  <HiOutlineLocationMarker className="h-4 w-4 text-slate-400" aria-hidden="true" />
                  {j.tempat}
                </p>
              </li>
            ))}
          </ul>
        </div>

        <div className={card}>
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-slate-900">Menunggu verifikasi</h2>
            <button type="button" className={linkButton}>Lihat semua</button>
          </div>

          <ul className="mt-5 divide-y divide-slate-100">
            {verifikasi.map((v) => (
              <li key={v.nama} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
                <span
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-teal-100 text-sm font-semibold text-teal-800"
                  aria-hidden="true"
                >
                  {v.nama.charAt(0)}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-slate-900">{v.nama}</p>
                  <p className="text-xs text-slate-500">{v.peran} · {v.waktu}</p>
                </div>
                <button
                  type="button"
                  className="rounded-lg border border-teal-600 px-3 py-1.5 text-xs font-semibold text-teal-700 transition-colors hover:bg-teal-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2"
                >
                  Periksa
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className={card}>
          <h2 className="text-base font-semibold text-slate-900">Aktivitas terbaru</h2>

          <ul className="mt-5 space-y-5">
            {aktivitas.map((a) => (
              <li key={a.teks} className="flex gap-3">
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-teal-500" aria-hidden="true" />
                <div>
                  <p className="text-sm text-slate-800">{a.teks}</p>
                  <p className="mt-0.5 text-xs text-slate-500">{a.waktu}</p>
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