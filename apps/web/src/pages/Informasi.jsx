import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { HiArrowRight, HiOutlineLocationMarker } from 'react-icons/hi';
import api from '../services/api';

const formatTanggal = (tanggal) => new Intl.DateTimeFormat('id-ID', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
}).format(new Date(`${tanggal.slice(0, 10)}T00:00:00`));

// Warna label tanggal bergantian agar daftar tidak monoton
const WARNA_TANGGAL = ['bg-yellow-300', 'bg-pink-300', 'bg-sky-300', 'bg-lime-300'];

const label = 'inline-block border-4 border-black bg-yellow-300 px-3 py-1 text-xs font-black uppercase tracking-wider text-black shadow-[3px_3px_0_0_#000]';

const Informasi = () => {
  const [jadwal, setJadwal] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;

    api.get('/informasi/kegiatan')
      .then(({ data }) => {
        if (active) setJadwal(data.data);
      })
      .catch(() => {
        if (active) setError('Jadwal belum dapat dimuat. Silakan coba lagi nanti atau hubungi kader Posyandu.');
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  return (
    // Latar krem bertitik, sama seperti Beranda dan dashboard.
    <main className="min-h-screen bg-[#fdf6c8] bg-[radial-gradient(rgba(0,0,0,0.22)_1px,transparent_1px)] px-6 pb-24 text-black [background-size:24px_24px] selection:bg-yellow-300">
      <section className="mx-auto max-w-7xl py-16 md:py-24">
        <div className="max-w-3xl">
          <span className={`mb-6 ${label}`}>Pusat Informasi</span>
          <h1 className="mb-8 text-4xl font-black uppercase leading-tight tracking-tight md:text-5xl">
            Jadwal{' '}
            <span className="inline-block -rotate-1 border-4 border-black bg-teal-400 px-3 shadow-[5px_5px_0_0_#000]">
              kegiatan
            </span>{' '}
            Posyandu
          </h1>
          <p className="text-lg font-bold leading-relaxed">
            Jadwal di halaman ini berasal dari kegiatan yang dicatat oleh petugas. Untuk perubahan atau
            konfirmasi jadwal, silakan hubungi kader Posyandu RW 08.
          </p>
        </div>
      </section>

      <section
        className="mx-auto max-w-7xl border-4 border-black bg-white p-6 shadow-[8px_8px_0_0_#000] md:p-10"
        aria-labelledby="jadwal-title"
      >
        <div className="mb-8">
          <p className="text-sm font-black uppercase tracking-wide">Informasi layanan</p>
          <h2 id="jadwal-title" className="mt-2 inline-block border-4 border-black bg-yellow-300 px-3 py-1 text-2xl font-black uppercase shadow-[4px_4px_0_0_#000]">
            Kegiatan mendatang
          </h2>
        </div>

        {loading && <p role="status" className="font-bold">Memuat jadwal kegiatan...</p>}
        {error && (
          <p role="alert" className="border-4 border-black bg-pink-300 p-4 font-black shadow-[5px_5px_0_0_#000]">
            {error}
          </p>
        )}
        {!loading && !error && jadwal.length === 0 && (
          <p className="border-4 border-black bg-sky-100 p-6 font-bold leading-relaxed">
            Belum ada kegiatan mendatang yang diumumkan. Periksa kembali nanti atau hubungi kader untuk
            memastikan jadwal layanan.
          </p>
        )}

        {!loading && !error && jadwal.length > 0 && (
          <ul className="grid gap-6 md:grid-cols-2">
            {jadwal.map((kegiatan, index) => (
              <li
                key={kegiatan.id}
                className="border-4 border-black bg-white p-6 shadow-[6px_6px_0_0_#000] transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[9px_9px_0_0_#000]"
              >
                <p className={`inline-block border-2 border-black px-2 py-0.5 text-sm font-black uppercase ${WARNA_TANGGAL[index % WARNA_TANGGAL.length]}`}>
                  {formatTanggal(kegiatan.tanggal)}
                </p>
                <h3 className="mt-3 text-xl font-black uppercase">{kegiatan.tema || 'Kegiatan Posyandu'}</h3>
                {kegiatan.lokasi && (
                  <p className="mt-3 flex items-center gap-2 border-t-4 border-black pt-3 text-sm font-bold">
                    <HiOutlineLocationMarker className="h-5 w-5 shrink-0" aria-hidden="true" />
                    {kegiatan.lokasi}
                  </p>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="mx-auto mt-14 max-w-7xl border-4 border-black bg-teal-400 p-8 shadow-[10px_10px_0_0_#000] md:flex md:items-center md:justify-between md:gap-8 md:p-10">
        <div>
          <h2 className="text-2xl font-black uppercase">Bersiap sebelum datang</h2>
          <p className="mt-3 max-w-2xl font-bold leading-relaxed">
            Bawa buku KIA atau KMS bila tersedia. Konfirmasikan waktu dan lokasi kegiatan kepada kader,
            terutama jika ada perubahan jadwal.
          </p>
        </div>
        <Link
          to="/kontak"
          className="mt-6 inline-flex min-h-12 shrink-0 cursor-pointer items-center justify-center gap-2 border-4 border-black bg-white px-6 py-3 text-sm font-black uppercase text-black shadow-[5px_5px_0_0_#000] transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:bg-yellow-300 hover:shadow-[2px_2px_0_0_#000] active:translate-x-1 active:translate-y-1 active:shadow-none focus:outline-none focus-visible:ring-4 focus-visible:ring-pink-400 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-400 md:mt-0"
        >
          Hubungi kader
          <HiArrowRight className="h-5 w-5" aria-hidden="true" />
        </Link>
      </section>
    </main>
  );
};

export default Informasi;