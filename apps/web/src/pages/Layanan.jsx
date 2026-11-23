import { Link } from 'react-router-dom';
import {
  HiOutlineUserGroup,
  HiOutlineShieldCheck,
  HiOutlineClipboardList,
  HiOutlineChatAlt2,
  HiOutlineScale,
} from 'react-icons/hi';

const daftarLayanan = [
  {
    title: 'Penimbangan dan pengukuran',
    desc: 'Pemantauan berkala berat dan tinggi badan balita bersama kader untuk mendukung pencatatan tumbuh kembang.',
    icon: HiOutlineScale,
    target: 'Balita',
    warna: 'bg-teal-300',
  },
  {
    title: 'Informasi imunisasi',
    desc: 'Informasi dan pendampingan terkait imunisasi anak. Jadwal serta ketersediaan layanan perlu dikonfirmasi kepada kader.',
    icon: HiOutlineShieldCheck,
    target: 'Bayi dan balita',
    warna: 'bg-yellow-300',
  },
  {
    title: 'Pendampingan kesehatan ibu',
    desc: 'Dukungan pemeriksaan dan edukasi kesehatan ibu, termasuk selama masa kehamilan.',
    icon: HiOutlineClipboardList,
    target: 'Ibu',
    warna: 'bg-pink-300',
  },
  {
    title: 'Edukasi kesehatan keluarga',
    desc: 'Penyampaian informasi kesehatan keluarga dan kebiasaan hidup sehat melalui kegiatan Posyandu.',
    icon: HiOutlineChatAlt2,
    target: 'Seluruh keluarga',
    warna: 'bg-sky-300',
  },
  {
    title: 'Pendampingan warga',
    desc: 'Kader membantu warga memperoleh informasi layanan dan mengetahui langkah selanjutnya sesuai kebutuhan.',
    icon: HiOutlineUserGroup,
    target: 'Warga RW 08',
    warna: 'bg-lime-300',
  },
];

const Layanan = () => (
  // Latar krem bertitik, sama seperti Beranda dan dashboard.
  <main className="min-h-screen bg-[#fdf6c8] bg-[radial-gradient(rgba(0,0,0,0.22)_1px,transparent_1px)] px-6 pb-24 text-black [background-size:24px_24px] selection:bg-yellow-300">
    <section className="mx-auto max-w-7xl py-16 text-center md:py-24">
      <span className="mb-6 inline-block border-4 border-black bg-yellow-300 px-3 py-1 text-xs font-black uppercase tracking-wider shadow-[3px_3px_0_0_#000]">
        Layanan Posyandu RW 08
      </span>
      <h1 className="mb-8 text-4xl font-black uppercase leading-tight tracking-tight md:text-5xl">
        <span className="inline-block -rotate-1 border-4 border-black bg-teal-400 px-4 py-2 shadow-[6px_6px_0_0_#000]">
          Layanan kesehatan keluarga
        </span>
      </h1>
      <p className="mx-auto max-w-2xl text-lg font-bold leading-relaxed">
        Kenali bentuk pendampingan yang tersedia. Jenis layanan, jadwal, dan ketersediaannya dapat
        berbeda; konfirmasikan kepada kader sebelum berkunjung.
      </p>
    </section>

    <section aria-label="Daftar layanan" className="mx-auto grid max-w-7xl gap-8 md:grid-cols-2">
      {daftarLayanan.map(({ title, desc, icon: Icon, target, warna }) => (
        <article
          key={title}
          className="flex gap-5 border-4 border-black bg-white p-7 shadow-[8px_8px_0_0_#000] transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[11px_11px_0_0_#000]"
        >
          <span className={`flex h-14 w-14 shrink-0 items-center justify-center border-4 border-black ${warna}`}>
            <Icon className="h-7 w-7 text-black" aria-hidden="true" />
          </span>
          <div>
            <h2 className="text-xl font-black uppercase leading-snug">{title}</h2>
            <span className="mt-2 inline-block border-2 border-black bg-white px-2 py-0.5 text-xs font-black uppercase">
              Sasaran: {target}
            </span>
            <p className="mt-3 font-bold leading-relaxed">{desc}</p>
          </div>
        </article>
      ))}
    </section>

    <section className="mx-auto mt-14 flex max-w-7xl flex-col items-start justify-between gap-6 border-4 border-black bg-teal-400 p-8 shadow-[10px_10px_0_0_#000] md:flex-row md:items-center md:p-10">
      <div>
        <h2 className="text-2xl font-black uppercase">Perlu memastikan jadwal layanan?</h2>
        <p className="mt-2 font-bold">Periksa kegiatan mendatang atau hubungi kader sebelum berkunjung.</p>
      </div>
      <Link
        to="/informasi"
        className="inline-flex min-h-12 shrink-0 cursor-pointer items-center justify-center border-4 border-black bg-white px-6 py-3 text-sm font-black uppercase text-black shadow-[5px_5px_0_0_#000] transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:bg-yellow-300 hover:shadow-[2px_2px_0_0_#000] active:translate-x-1 active:translate-y-1 active:shadow-none focus:outline-none focus-visible:ring-4 focus-visible:ring-pink-400 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-400"
      >
        Lihat jadwal
      </Link>
    </section>
  </main>
);

export default Layanan;