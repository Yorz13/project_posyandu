import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { HiArrowRight, HiOutlineCalendar, HiOutlineChartBar, HiOutlineClipboardList, HiOutlineHeart, HiOutlineLocationMarker, HiOutlinePhone, HiOutlineShieldCheck, HiOutlineUserGroup } from 'react-icons/hi';
import api from '../services/api';

const HIGHLIGHTS = [
  { teks: 'Pendampingan ibu & anak', ikon: HiOutlineHeart, warna: 'bg-pink-300' },
  { teks: 'Pertumbuhan terpantau', ikon: HiOutlineChartBar, warna: 'bg-teal-300' },
  { teks: 'Didukung kader setempat', ikon: HiOutlineUserGroup, warna: 'bg-yellow-300' },
  { teks: 'Informasi layanan berkala', ikon: HiOutlineCalendar, warna: 'bg-sky-300' },
];

const LAYANAN = [
  { nama: 'Penimbangan balita', isi: 'Pantau berat dan tinggi badan anak secara berkala bersama kader.', ikon: HiOutlineChartBar, warna: 'bg-teal-300' },
  { nama: 'Imunisasi', isi: 'Dapatkan informasi imunisasi untuk membantu melindungi kesehatan anak.', ikon: HiOutlineShieldCheck, warna: 'bg-yellow-300' },
  { nama: 'Kesehatan ibu', isi: 'Dukungan pemeriksaan dan edukasi kesehatan selama kehamilan.', ikon: HiOutlineHeart, warna: 'bg-pink-300' },
  { nama: 'Edukasi keluarga', isi: 'Berbagi informasi seputar gizi, tumbuh kembang, dan hidup sehat.', ikon: HiOutlineClipboardList, warna: 'bg-sky-300' },
];

// Gaya neo-brutalist: garis hitam tebal, bayangan keras, warna datar (sama dengan Navbar dan dashboard)
const cincin = 'focus:outline-none focus-visible:ring-4 focus-visible:ring-pink-400 focus-visible:ring-offset-2';
const kotak = 'border-4 border-black bg-white shadow-[6px_6px_0_0_#000]';
const kotakHover = 'transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[9px_9px_0_0_#000]';
const tombolDasar = `inline-flex min-h-12 cursor-pointer items-center justify-center gap-2 border-4 border-black px-6 py-3 text-sm font-black uppercase text-black shadow-[5px_5px_0_0_#000] transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_0_#000] active:translate-x-1 active:translate-y-1 active:shadow-none ${cincin}`;
const label = 'inline-block border-4 border-black bg-yellow-300 px-3 py-1 text-xs font-black uppercase tracking-wider text-black shadow-[3px_3px_0_0_#000]';

const formatTanggal = (tanggal) => new Intl.DateTimeFormat('id-ID', {
  day: 'numeric',
  month: 'short',
}).format(new Date(`${tanggal.slice(0, 10)}T00:00:00`));

function BagianPembuka() {
  return (
    <section className="relative">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-14 sm:px-8 sm:py-20 md:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-14 lg:py-24">
        <div className="min-w-0">
          <span className={label}>Posyandu RW 08</span>
          <h1 className="mt-6 max-w-2xl text-4xl font-black uppercase leading-[1.08] tracking-tight text-black sm:text-5xl xl:text-6xl">
            Tumbuh sehat,{' '}
            <span className="inline-block -rotate-1 border-4 border-black bg-pink-400 px-2 shadow-[5px_5px_0_0_#000]">
              bersama keluarga.
            </span>
          </h1>
          <p className="mt-8 max-w-xl text-base font-bold leading-8 text-black sm:text-lg">
            Ruang layanan dan informasi kesehatan ibu-anak yang dekat dengan keluarga di lingkungan RW 08.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link to="/layanan" className={`${tombolDasar} bg-teal-400 hover:bg-teal-300`}>
              Kenali layanan <HiArrowRight className="h-5 w-5" aria-hidden="true" />
            </Link>
            <Link to="/informasi" className={`${tombolDasar} bg-white hover:bg-yellow-300`}>
              Lihat jadwal <HiOutlineCalendar className="h-5 w-5" aria-hidden="true" />
            </Link>
          </div>
          <div className="mt-10 flex items-center gap-4 border-t-4 border-black pt-6">
            <div className="flex -space-x-2" aria-hidden="true">
              <span className="grid h-10 w-10 place-items-center border-4 border-black bg-pink-300 text-black">
                <HiOutlineHeart className="h-4 w-4" />
              </span>
              <span className="grid h-10 w-10 place-items-center border-4 border-black bg-sky-300 text-black">
                <HiOutlineUserGroup className="h-4 w-4" />
              </span>
              <span className="grid h-10 w-10 place-items-center border-4 border-black bg-yellow-300 text-black">
                <HiOutlineShieldCheck className="h-4 w-4" />
              </span>
            </div>
            <p className="text-sm font-bold leading-5 text-black">
              Informasi kesehatan yang <span className="font-black">dekat, ramah, dan mudah dijangkau.</span>
            </p>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-xl min-w-0 pb-3 pr-3 lg:justify-self-end">
          <figure className="group relative">
            <div className="relative aspect-[4/3] overflow-hidden border-4 border-black bg-sky-200 shadow-[10px_10px_0_0_#000] sm:aspect-[3/2]">
              <img
                src="/foto%20layanan.jpg"
                alt="Ilustrasi kader kesehatan sedang memeriksa anak di posyandu"
                fetchPriority="high"
                className="h-full w-full object-cover object-[center_44%]"
              />
            </div>
            <figcaption className="relative -mt-4 ml-4 mr-[-0.75rem] border-4 border-black bg-yellow-300 px-5 py-4 shadow-[5px_5px_0_0_#000] sm:ml-8">
              <span className="block text-xs font-black uppercase tracking-wider text-black">Bersama untuk keluarga</span>
              <span className="mt-1 block text-base font-black leading-snug text-black sm:text-lg">Setiap tumbuh kembang berarti.</span>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}

function SorotanLayanan() {
  return (
    <section className="px-5 sm:px-8">
      <ul className="mx-auto grid max-w-6xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {HIGHLIGHTS.map(({ teks, ikon: Ikon, warna }) => (
          <li key={teks} className={`flex items-center gap-3 p-4 ${kotak} ${kotakHover}`}>
            <span className={`flex h-11 w-11 shrink-0 items-center justify-center border-4 border-black ${warna}`}>
              <Ikon className="h-5 w-5 text-black" aria-hidden="true" />
            </span>
            <span className="text-sm font-black uppercase leading-tight text-black">{teks}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

function DaftarLayanan() {
  return (
    <section>
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-20 sm:px-8 md:py-24 lg:grid-cols-[0.8fr_2.2fr]">
        <div className="self-center">
          <span className={label}>Dukungan keluarga</span>
          <h2 className="mt-5 text-3xl font-black uppercase leading-tight tracking-tight text-black sm:text-4xl">
            Layanan kesehatan, lebih dekat untuk semua.
          </h2>
          <p className="mt-4 font-bold leading-7 text-black">
            Kenali layanan dasar Posyandu untuk mendukung tumbuh kembang anak dan kesehatan ibu.
          </p>
          <Link
            to="/layanan"
            className={`mt-6 inline-flex items-center gap-2 border-b-4 border-black pb-0.5 text-sm font-black uppercase text-black transition-all hover:gap-3 hover:bg-yellow-300 ${cincin}`}
          >
            Lihat semua layanan <HiArrowRight aria-hidden="true" />
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {LAYANAN.map(({ nama, isi, ikon: Ikon, warna }) => (
            <Link key={nama} to="/layanan" className={`group p-5 sm:p-6 ${kotak} ${kotakHover} ${cincin}`}>
              <span className={`inline-flex h-12 w-12 items-center justify-center border-4 border-black ${warna}`}>
                <Ikon className="h-6 w-6 text-black" aria-hidden="true" />
              </span>
              <h3 className="mt-5 text-lg font-black uppercase text-black">{nama}</h3>
              <p className="mt-2 text-sm font-bold leading-6 text-black">{isi}</p>
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-black uppercase text-black transition-all group-hover:gap-3">
                Selengkapnya <HiArrowRight aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function JadwalKegiatan() {
  const [agenda, setAgenda] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;

    api.get('/informasi/kegiatan')
      .then(({ data }) => {
        if (active) setAgenda(data.data.slice(0, 3));
      })
      .catch(() => {
        if (active) setError('Jadwal belum dapat dimuat. Silakan buka halaman informasi atau hubungi kader.');
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  return (
    <section className="px-5 pb-20 pt-8 sm:px-8 md:pb-24">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.35fr_0.85fr]">
        <div>
          <span className={label}>Catat tanggalnya</span>
          <h2 className="mt-5 text-3xl font-black uppercase tracking-tight text-black sm:text-4xl">Agenda Posyandu</h2>
          <p className="mt-3 max-w-xl font-bold leading-7 text-black">
            Jadwal mendatang yang ditampilkan diambil dari kegiatan yang dicatat petugas. Konfirmasikan perubahan kepada kader.
          </p>

          {loading && (
            <p role="status" className={`mt-7 p-5 text-sm font-bold text-black ${kotak}`}>
              Memuat jadwal kegiatan...
            </p>
          )}
          {error && (
            <p role="alert" className="mt-7 border-4 border-black bg-pink-300 p-5 text-sm font-black text-black shadow-[6px_6px_0_0_#000]">
              {error}
            </p>
          )}
          {!loading && !error && agenda.length === 0 && (
            <p className={`mt-7 p-5 font-bold leading-relaxed text-black ${kotak}`}>
              Belum ada jadwal mendatang yang diumumkan. Silakan periksa kembali nanti atau hubungi kader untuk konfirmasi.
            </p>
          )}
          {!loading && !error && agenda.length > 0 && (
            <ul className="mt-7 space-y-5">
              {agenda.map((kegiatan) => (
                <li key={kegiatan.id}>
                  <Link to="/informasi" className={`group flex items-center gap-4 p-4 sm:p-5 ${kotak} ${kotakHover} ${cincin}`}>
                    <span className="flex h-[4.5rem] w-[4.5rem] shrink-0 flex-col items-center justify-center border-4 border-black bg-yellow-300 text-black">
                      <span className="text-lg font-black uppercase leading-none">{formatTanggal(kegiatan.tanggal)}</span>
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-black uppercase leading-snug text-black">{kegiatan.tema || 'Kegiatan Posyandu'}</span>
                      {kegiatan.lokasi && (
                        <span className="mt-2 flex items-center gap-1.5 text-sm font-bold text-black">
                          <HiOutlineLocationMarker className="h-4 w-4" aria-hidden="true" />
                          {kegiatan.lokasi}
                        </span>
                      )}
                    </span>
                    <HiArrowRight className="h-5 w-5 shrink-0 text-black transition group-hover:translate-x-1" aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          )}

          <Link
            to="/informasi"
            className={`mt-7 inline-flex items-center gap-2 border-b-4 border-black pb-0.5 text-sm font-black uppercase text-black transition-all hover:gap-3 hover:bg-yellow-300 ${cincin}`}
          >
            Lihat informasi lainnya <HiArrowRight aria-hidden="true" />
          </Link>
        </div>

        <aside className="flex flex-col justify-between border-4 border-black bg-teal-400 p-7 shadow-[10px_10px_0_0_#000] sm:p-9">
          <div>
            <span className="inline-flex h-12 w-12 items-center justify-center border-4 border-black bg-white text-black">
              <HiOutlineLocationMarker className="h-6 w-6" aria-hidden="true" />
            </span>
            <p className="mt-6 inline-block border-2 border-black bg-yellow-300 px-2 py-0.5 text-xs font-black uppercase tracking-wider text-black">
              Kami siap membantu
            </p>
            <h3 className="mt-4 text-2xl font-black uppercase leading-snug text-black sm:text-3xl">Ada pertanyaan seputar layanan?</h3>
            <p className="mt-3 font-bold leading-7 text-black">
              Hubungi kader atau kunjungi Balai Warga RW 08 untuk mendapatkan informasi.
            </p>
            <p className="mt-5 flex items-center gap-2 text-sm font-black uppercase text-black">
              <HiOutlineLocationMarker className="h-5 w-5" aria-hidden="true" />
              Balai Warga RW 08
            </p>
          </div>
          <Link to="/kontak" className={`${tombolDasar} mt-8 bg-white hover:bg-yellow-300`}>
            <HiOutlinePhone aria-hidden="true" /> Hubungi kami <HiArrowRight aria-hidden="true" />
          </Link>
        </aside>
      </div>
    </section>
  );
}

export default function Beranda() {
  return (
    // Latar krem bertitik, sama seperti halaman dashboard.
    <main className="min-h-screen bg-[#fdf6c8] bg-[radial-gradient(rgba(0,0,0,0.22)_1px,transparent_1px)] font-sans text-black [background-size:24px_24px] selection:bg-yellow-300">
      <BagianPembuka />
      <SorotanLayanan />
      <DaftarLayanan />
      <JadwalKegiatan />
    </main>
  );
}