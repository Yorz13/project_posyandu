import { Link } from 'react-router-dom';
import {
  HiOutlineScale,
  HiOutlineArrowsExpand,
  HiOutlineCake,
  HiOutlineHeart,
  HiOutlineShieldCheck,
  HiOutlineCheck,
  HiOutlineCalendar,
  HiOutlineClock,
  HiOutlineLocationMarker,
} from 'react-icons/hi';

// ===== Data contoh. Ganti dengan data dari API (data anak milik warga yang login) =====
const warga = { nama: 'Siti Aminah' };

const anak = {
  nama: 'Aisyah Putri',
  jenisKelamin: 'Perempuan',
  usia: '14 bulan',
  statusGizi: 'Gizi baik',
  pemeriksaanTerakhir: '7 Okt 2026',
  berat: 9.4, // kg
  tinggi: 76, // cm
  lingkarKepala: 45, // cm
};

const statGizi = [
  { label: 'Berat badan', value: `${anak.berat} kg`, note: '+0,3 kg dari bulan lalu', icon: HiOutlineScale, tone: 'bg-teal-300' },
  { label: 'Tinggi badan', value: `${anak.tinggi} cm`, note: '+1 cm dari bulan lalu', icon: HiOutlineArrowsExpand, tone: 'bg-sky-300' },
  { label: 'Lingkar kepala', value: `${anak.lingkarKepala} cm`, note: 'Sesuai standar usia', icon: HiOutlineHeart, tone: 'bg-pink-300' },
  { label: 'Usia', value: anak.usia, note: `Terakhir diperiksa ${anak.pemeriksaanTerakhir}`, icon: HiOutlineCake, tone: 'bg-yellow-300' },
];

const beratPerBulan = [
  { bulan: 'Mei', berat: 8.1 },
  { bulan: 'Jun', berat: 8.4 },
  { bulan: 'Jul', berat: 8.6 },
  { bulan: 'Agu', berat: 8.9 },
  { bulan: 'Sep', berat: 9.1 },
  { bulan: 'Okt', berat: 9.4 },
];

const imunisasi = [
  { nama: 'Hepatitis B', selesai: true },
  { nama: 'BCG', selesai: true },
  { nama: 'Polio 1-3', selesai: true },
  { nama: 'DPT-HB-Hib 1-3', selesai: true },
  { nama: 'Campak', selesai: false, jadwal: 'Sabtu, 21 Nov 2026' },
  { nama: 'DPT-HB-Hib lanjutan', selesai: false },
];

const jadwal = [
  { judul: 'Posyandu Balita', tanggal: 'Sabtu, 7 Nov 2026', jam: '08.00 WIB', tempat: 'Balai RW 08' },
  { judul: 'Imunisasi Campak', tanggal: 'Sabtu, 21 Nov 2026', jam: '08.00 WIB', tempat: 'Balai RW 08' },
];

const pemeriksaan = [
  { tanggal: '7 Okt 2026', berat: '9,4 kg', tinggi: '76 cm', status: 'Gizi baik' },
  { tanggal: '9 Sep 2026', berat: '9,1 kg', tinggi: '75 cm', status: 'Gizi baik' },
  { tanggal: '5 Agu 2026', berat: '8,9 kg', tinggi: '74 cm', status: 'Gizi baik' },
];

const card = 'border-4 border-black bg-white p-6 shadow-[8px_8px_0_0_#000]';

const cardTitle =
  'inline-block border-4 border-black bg-yellow-300 px-3 py-1 text-sm font-black uppercase tracking-wide text-black shadow-[3px_3px_0_0_#000]';

const linkButton =
  'cursor-pointer border-2 border-black bg-white px-2 py-1 text-xs font-black uppercase text-black shadow-[3px_3px_0_0_#000] transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:bg-pink-300 hover:shadow-[1px_1px_0_0_#000] active:translate-x-1 active:translate-y-1 active:shadow-none focus:outline-none focus-visible:ring-4 focus-visible:ring-pink-400';

const DashboardWarga = () => {
  const maxBerat = Math.max(...beratPerBulan.map((b) => b.berat));
  const minBerat = Math.min(...beratPerBulan.map((b) => b.berat));
  const imunisasiSelesai = imunisasi.filter((i) => i.selesai).length;
  const persenImunisasi = Math.round((imunisasiSelesai / imunisasi.length) * 100);
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
            Halo, {warga.nama}
          </h1>
          <p className="mt-4 text-sm font-bold text-black">Pantau tumbuh kembang {anak.nama} di sini.</p>
        </div>
        <p className="inline-block self-start border-4 border-black bg-white px-3 py-1.5 text-xs font-black uppercase text-black shadow-[4px_4px_0_0_#000] sm:self-auto">
          {today}
        </p>
      </header>

      {/* Ringkasan anak */}
      <section aria-label="Ringkasan anak" className="border-4 border-black bg-pink-200 p-5 shadow-[8px_8px_0_0_#000]">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <span
              className="flex h-16 w-16 shrink-0 items-center justify-center border-4 border-black bg-white text-3xl font-black text-black shadow-[4px_4px_0_0_#000]"
              aria-hidden="true"
            >
              {anak.nama.charAt(0)}
            </span>
            <div>
              <p className="text-xl font-black text-black">{anak.nama}</p>
              <p className="text-sm font-bold text-black">{anak.jenisKelamin} · {anak.usia}</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <span className="border-4 border-black bg-lime-400 px-3 py-1.5 text-sm font-black uppercase text-black shadow-[3px_3px_0_0_#000]">
              {anak.statusGizi}
            </span>
            <Link to="/warga/anak" className={linkButton}>
              Lihat data anak
            </Link>
          </div>
        </div>
      </section>

      {/* Statistik terakhir */}
      <section aria-label="Hasil pemeriksaan terakhir" className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {statGizi.map(({ label, value, note, icon: Icon, tone }) => (
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
            <p className="mt-3 text-3xl font-black text-black">{value}</p>
            <p className="mt-2 border-t-4 border-black pt-2 text-xs font-bold text-black">{note}</p>
          </div>
        ))}
      </section>

      {/* Grafik berat badan + imunisasi */}
      <section className="grid gap-6 lg:grid-cols-3">
        <div className={`${card} lg:col-span-2`}>
          <h2 className={cardTitle}>Berat badan 6 bulan terakhir</h2>
          <p className="mt-3 text-sm font-bold text-black">Berat badan {anak.nama} dalam kilogram.</p>

          <div
            role="img"
            aria-label={`Grafik berat badan: ${beratPerBulan.map((b) => `${b.bulan} ${b.berat} kg`).join(', ')}`}
            className="mt-6 flex items-end gap-3 border-b-4 border-black sm:gap-5"
          >
            {beratPerBulan.map((b, index) => {
              // Skala dimulai dari sedikit di bawah nilai minimum agar kenaikan terlihat jelas
              const tinggiPersen = 25 + ((b.berat - minBerat) / (maxBerat - minBerat || 1)) * 75;
              return (
                <div key={b.bulan} className="flex flex-1 flex-col items-center gap-2">
                  <span className="text-xs font-black text-black">{String(b.berat).replace('.', ',')}</span>
                  <div className="flex h-40 w-full items-end justify-center">
                    <div
                      className={`w-full max-w-14 border-4 border-b-0 border-black ${
                        index === beratPerBulan.length - 1 ? 'bg-pink-400' : 'bg-teal-300'
                      }`}
                      style={{ height: `${tinggiPersen}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-2 flex gap-3 sm:gap-5">
            {beratPerBulan.map((b) => (
              <span key={b.bulan} className="flex-1 text-center text-xs font-black uppercase text-black">
                {b.bulan}
              </span>
            ))}
          </div>
        </div>

        <div className={card}>
          <div className="flex items-center justify-between gap-2">
            <h2 className={cardTitle}>Imunisasi</h2>
            <Link to="/warga/imunisasi" className={linkButton}>
              Riwayat
            </Link>
          </div>
          <p className="mt-3 text-sm font-bold text-black">
            {imunisasiSelesai} dari {imunisasi.length} imunisasi sudah selesai.
          </p>

          <div
            role="progressbar"
            aria-valuenow={persenImunisasi}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Progres imunisasi"
            className="mt-4 h-5 overflow-hidden border-4 border-black bg-white"
          >
            <div className="h-full border-r-4 border-black bg-lime-400" style={{ width: `${persenImunisasi}%` }} />
          </div>

          <ul className="mt-5 space-y-3">
            {imunisasi.map((i) => (
              <li key={i.nama} className="flex items-start gap-3">
                <span
                  className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center border-2 border-black ${
                    i.selesai ? 'bg-lime-400' : 'bg-white'
                  }`}
                  aria-hidden="true"
                >
                  {i.selesai && <HiOutlineCheck className="h-3.5 w-3.5 text-black" />}
                </span>
                <div>
                  <p className="text-sm font-bold text-black">
                    {i.nama}
                    <span className="sr-only">{i.selesai ? ' (selesai)' : ' (belum)'}</span>
                  </p>
                  {i.jadwal && <p className="text-xs font-semibold text-slate-700">Jadwal: {i.jadwal}</p>}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Jadwal + riwayat pemeriksaan */}
      <section className="grid gap-6 lg:grid-cols-3">
        <div className={card}>
          <h2 className={cardTitle}>Jadwal posyandu</h2>

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

        <div className={`${card} lg:col-span-2`}>
          <div className="flex items-center justify-between gap-2">
            <h2 className={cardTitle}>Pemeriksaan terakhir</h2>
            <Link to="/warga/pemeriksaan" className={linkButton}>
              Lihat semua
            </Link>
          </div>

          <ul className="mt-6 space-y-4">
            {pemeriksaan.map((p) => (
              <li
                key={p.tanggal}
                className="flex flex-col gap-2 border-4 border-black bg-white p-3 shadow-[4px_4px_0_0_#000] sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="text-sm font-black text-black">{p.tanggal}</p>
                  <p className="text-xs font-bold text-black">
                    Berat {p.berat} · Tinggi {p.tinggi}
                  </p>
                </div>
                <span className="inline-block self-start border-2 border-black bg-lime-400 px-2 py-0.5 text-xs font-black uppercase text-black sm:self-auto">
                  {p.status}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
};

export default DashboardWarga;