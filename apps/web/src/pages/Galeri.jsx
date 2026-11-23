import { Link } from 'react-router-dom';
import { HiOutlinePhotograph } from 'react-icons/hi';

const Galeri = () => (
  // Latar krem bertitik, sama seperti Beranda dan dashboard.
  <main className="min-h-screen bg-[#fdf6c8] bg-[radial-gradient(rgba(0,0,0,0.22)_1px,transparent_1px)] px-6 pb-24 text-black [background-size:24px_24px] selection:bg-yellow-300">
    <section className="mx-auto max-w-7xl py-16 text-center md:py-24">
      <span className="mb-8 inline-flex h-16 w-16 items-center justify-center border-4 border-black bg-pink-300 text-black shadow-[5px_5px_0_0_#000]">
        <HiOutlinePhotograph className="h-8 w-8" aria-hidden="true" />
      </span>
      <h1 className="mx-auto max-w-3xl text-4xl font-black uppercase leading-tight tracking-tight md:text-5xl">
        <span className="inline-block -rotate-1 border-4 border-black bg-teal-400 px-4 py-2 shadow-[6px_6px_0_0_#000]">
          Galeri kegiatan
        </span>
      </h1>
      <p className="mx-auto mt-8 max-w-2xl text-lg font-bold leading-relaxed">
        Dokumentasi kegiatan Posyandu RW 08 akan ditampilkan di sini setelah tersedia.
      </p>
    </section>

    <section className="mx-auto max-w-4xl border-4 border-dashed border-black bg-white px-6 py-14 text-center shadow-[8px_8px_0_0_#000]">
      <span className="mx-auto inline-flex h-16 w-16 items-center justify-center border-4 border-black bg-sky-300 text-black">
        <HiOutlinePhotograph className="h-8 w-8" aria-hidden="true" />
      </span>
      <h2 className="mt-6 text-xl font-black uppercase">Belum ada foto kegiatan</h2>
      <p className="mx-auto mt-3 max-w-xl font-bold leading-relaxed">
        Galeri belum memiliki dokumentasi untuk ditampilkan. Lihat jadwal kegiatan atau tanyakan
        informasi terbaru kepada kader.
      </p>
      <Link
        to="/informasi"
        className="mt-8 inline-flex min-h-12 cursor-pointer items-center justify-center border-4 border-black bg-teal-400 px-6 py-3 text-sm font-black uppercase text-black shadow-[5px_5px_0_0_#000] transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:bg-teal-300 hover:shadow-[2px_2px_0_0_#000] active:translate-x-1 active:translate-y-1 active:shadow-none focus:outline-none focus-visible:ring-4 focus-visible:ring-pink-400 focus-visible:ring-offset-2"
      >
        Lihat jadwal kegiatan
      </Link>
    </section>
  </main>
);

export default Galeri;