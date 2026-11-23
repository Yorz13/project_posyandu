import { Link } from 'react-router-dom';
import {
  HiOutlineLocationMarker,
  HiOutlineCalendar,
  HiOutlineClock,
  HiOutlinePhone,
  HiOutlineExternalLink,
} from 'react-icons/hi';
import { FaWhatsapp } from 'react-icons/fa';

/* ------------------------------------------------------------------
 * DATA — GANTI DENGAN DATA ASLI POSYANDU RW 08
 * Semua nilai di bawah ini hanya contoh. Isi sebelum situs dipublikasikan.
 * ------------------------------------------------------------------ */
const POSYANDU = {
  nama: 'Posyandu RW 08',
  // Alamat lengkap yang tampil di halaman dan dipakai sebagai kata kunci peta.
  alamat: 'Posyandu RW 08, Desa Manggahang, Kecamatan Baleendah, Kabupaten Bandung, Jawa Barat',
  // Koordinat titik lokasi (klik kanan lokasi di Google Maps lalu salin angkanya).
  // Jika diisi, koordinat dipakai untuk peta karena lebih akurat daripada alamat.
  lat: null, // contoh: -6.9175
  lng: null, // contoh: 107.6191
  jamLayanan: 'Senin–Jumat, 08.00–16.00 WIB',
};

const KADER = [
  {
    nama: 'Rina Marlina',
    peran: 'Ketua Kader',
    whatsapp: '0881024672098', // format 08xx atau 628xx
    telepon: '0881024672098', // boleh dikosongkan
    jam: 'Senin–Jumat, 08.00–16.00 WIB',
  },
  {
    nama: 'Dewi Lestari',
    peran: 'Pendaftaran dan jadwal',
    whatsapp: '081200000002',
    telepon: '',
    jam: 'Senin–Jumat, 08.00–16.00 WIB',
  },
];
/* ------------------------------------------------------------------ */

const cincin = 'focus:outline-none focus-visible:ring-4 focus-visible:ring-pink-400 focus-visible:ring-offset-2';
const tombolDasar = `inline-flex min-h-12 cursor-pointer items-center justify-center gap-2 border-4 border-black px-5 py-3 text-sm font-black uppercase text-black shadow-[5px_5px_0_0_#000] transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_0_#000] active:translate-x-1 active:translate-y-1 active:shadow-none ${cincin}`;
const kartu = 'border-4 border-black bg-white shadow-[8px_8px_0_0_#000]';

// Ubah 0812... atau +62812... menjadi 62812... untuk tautan WhatsApp.
const nomorInternasional = (nomor) => {
  const angka = String(nomor || '').replace(/\D/g, '');
  if (!angka) return '';
  if (angka.startsWith('62')) return angka;
  if (angka.startsWith('0')) return `62${angka.slice(1)}`;
  return `62${angka}`;
};

const adaKoordinat = Number.isFinite(POSYANDU.lat) && Number.isFinite(POSYANDU.lng);
const kataKunciPeta = adaKoordinat ? `${POSYANDU.lat},${POSYANDU.lng}` : POSYANDU.alamat;
const urlPetaEmbed = `https://www.google.com/maps?q=${encodeURIComponent(kataKunciPeta)}&z=17&output=embed`;
const urlBukaPeta = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(kataKunciPeta)}`;
const urlRute = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(kataKunciPeta)}`;

const KartuKader = ({ kader }) => {
  const wa = nomorInternasional(kader.whatsapp);
  const pesan = encodeURIComponent(
    `Halo kak ${kader.nama}, saya ingin bertanya tentang kegiatan ${POSYANDU.nama}.`,
  );
  const telepon = String(kader.telepon || '').replace(/[^\d+]/g, '');

  return (
    <article className={`${kartu} flex flex-col p-6`}>
      <h3 className="text-xl font-black uppercase">{kader.nama}</h3>
      <p className="mt-1 inline-block self-start border-2 border-black bg-yellow-300 px-2 py-0.5 text-xs font-black">
        {kader.peran}
      </p>

      {kader.jam && (
        <p className="mt-4 flex items-start gap-2 text-sm font-bold">
          <HiOutlineClock className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
          <span>Bisa dihubungi: {kader.jam}</span>
        </p>
      )}

      <div className="mt-6 flex flex-wrap gap-3">
        {wa && (
          <a
            href={`https://wa.me/${wa}?text=${pesan}`}
            target="_blank"
            rel="noopener noreferrer"
            className={`${tombolDasar} bg-green-400 hover:bg-green-300`}
            aria-label={`Kirim WhatsApp ke ${kader.nama}`}
          >
            <FaWhatsapp className="h-5 w-5" aria-hidden="true" />
            WhatsApp
          </a>
        )}
        {telepon && (
          <a
            href={`tel:${telepon}`}
            className={`${tombolDasar} bg-white hover:bg-yellow-300`}
            aria-label={`Telepon ${kader.nama}`}
          >
            <HiOutlinePhone className="h-5 w-5" aria-hidden="true" />
            Telepon
          </a>
        )}
      </div>

      {(wa || telepon) && (
        <p className="mt-4 text-sm font-bold text-black/70">
          Nomor: <span className="select-all">{kader.telepon || kader.whatsapp}</span>
        </p>
      )}
    </article>
  );
};

const Kontak = () => (
  // Latar krem bertitik, sama seperti Beranda dan dashboard.
  <main className="min-h-screen bg-[#fdf6c8] bg-[radial-gradient(rgba(0,0,0,0.22)_1px,transparent_1px)] px-6 pb-24 text-black [background-size:24px_24px] selection:bg-yellow-300">
    <section className="mx-auto max-w-7xl py-16 text-center md:py-24">
      <span className="mb-6 inline-block border-4 border-black bg-yellow-300 px-3 py-1 text-xs font-black uppercase tracking-wider shadow-[3px_3px_0_0_#000]">
        {POSYANDU.nama}
      </span>
      <h1 className="mb-8 text-4xl font-black uppercase leading-tight tracking-tight md:text-5xl">
        <span className="inline-block -rotate-1 border-4 border-black bg-teal-400 px-4 py-2 shadow-[6px_6px_0_0_#000]">
          Hubungi kader
        </span>
      </h1>
      <p className="mx-auto max-w-2xl text-lg font-bold leading-relaxed">
        Untuk memastikan informasi tetap akurat, tanyakan jadwal dan layanan langsung kepada kader.
        Pilih salah satu kader di bawah, lalu kirim pesan atau telepon.
      </p>
    </section>

    {/* Kontak kader */}
    <section className="mx-auto max-w-5xl" aria-labelledby="judul-kader">
      <h2 id="judul-kader" className="mb-6 text-2xl font-black uppercase">
        Kontak kader
      </h2>
      <div className="grid gap-8 md:grid-cols-2">
        {KADER.map((kader) => (
          <KartuKader key={kader.nama} kader={kader} />
        ))}
      </div>
    </section>

    {/* Lokasi + peta nyata */}
    <section className="mx-auto mt-16 max-w-5xl" aria-labelledby="judul-lokasi">
      <h2 id="judul-lokasi" className="mb-6 text-2xl font-black uppercase">
        Lokasi pelayanan
      </h2>

      <div className={`${kartu} overflow-hidden`}>
        <div className="border-b-4 border-black">
          <iframe
            title={`Peta lokasi ${POSYANDU.nama}`}
            src={urlPetaEmbed}
            className="block h-80 w-full md:h-[28rem]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>

        <div className="grid gap-6 p-6 md:grid-cols-2 md:p-8">
          <div className="space-y-4 font-bold leading-relaxed">
            <p className="flex items-start gap-3">
              <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center border-4 border-black bg-sky-300">
                <HiOutlineLocationMarker className="h-5 w-5" aria-hidden="true" />
              </span>
              <span>{POSYANDU.alamat}</span>
            </p>
            <p className="flex items-start gap-3">
              <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center border-4 border-black bg-pink-300">
                <HiOutlineClock className="h-5 w-5" aria-hidden="true" />
              </span>
              <span>{POSYANDU.jamLayanan}</span>
            </p>
          </div>

          <div className="flex flex-wrap content-start gap-3 md:justify-end">
            <a
              href={urlRute}
              target="_blank"
              rel="noopener noreferrer"
              className={`${tombolDasar} bg-teal-400 hover:bg-teal-300`}
            >
              <HiOutlineLocationMarker className="h-5 w-5" aria-hidden="true" />
              Petunjuk arah
            </a>
            <a
              href={urlBukaPeta}
              target="_blank"
              rel="noopener noreferrer"
              className={`${tombolDasar} bg-white hover:bg-yellow-300`}
            >
              <HiOutlineExternalLink className="h-5 w-5" aria-hidden="true" />
              Buka di Google Maps
            </a>
          </div>
        </div>
      </div>

      <p className="mt-4 text-sm font-bold">
        Lokasi kegiatan bisa berpindah pada jadwal tertentu. Konfirmasikan kepada kader sebelum berangkat.
      </p>
    </section>

    <nav aria-label="Tautan informasi" className="mx-auto mt-12 flex max-w-5xl flex-wrap gap-4">
      <Link to="/informasi" className={`${tombolDasar} bg-teal-400 hover:bg-teal-300`}>
        <HiOutlineCalendar className="h-5 w-5" aria-hidden="true" />
        Lihat jadwal kegiatan
      </Link>
      <Link to="/layanan" className={`${tombolDasar} bg-white hover:bg-yellow-300`}>
        Lihat layanan
      </Link>
    </nav>
  </main>
);

export default Kontak;