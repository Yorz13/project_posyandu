import { Link } from 'react-router-dom';
import { HiOutlineHeart, HiOutlineLightBulb, HiOutlineUserGroup } from 'react-icons/hi';

const Tentang = () => (
  // Latar krem bertitik, sama seperti Beranda dan dashboard.
  <main className="min-h-screen bg-[#fdf6c8] bg-[radial-gradient(rgba(0,0,0,0.22)_1px,transparent_1px)] px-6 pb-24 text-black [background-size:24px_24px] selection:bg-yellow-300">
    <section className="mx-auto max-w-7xl py-16 text-center md:py-24">
      <span className="mb-6 inline-block border-4 border-black bg-yellow-300 px-3 py-1 text-xs font-black uppercase tracking-wider shadow-[3px_3px_0_0_#000]">
        Mengenal kami lebih dekat
      </span>
      <h1 className="mb-8 text-4xl font-black uppercase leading-tight tracking-tight md:text-5xl">
        Tentang{' '}
        <span className="inline-block -rotate-1 border-4 border-black bg-teal-400 px-3 shadow-[5px_5px_0_0_#000]">
          Posyandu RW 08
        </span>
      </h1>
      <p className="mx-auto max-w-3xl text-lg font-bold leading-relaxed">
        Posyandu mendukung keluarga melalui kegiatan kesehatan berbasis masyarakat, pendampingan
        kader, dan informasi layanan di lingkungan RW 08.
      </p>
    </section>

    <section className="mx-auto grid max-w-7xl gap-8 md:grid-cols-2">
      <article className="border-4 border-black bg-white p-8 shadow-[8px_8px_0_0_#000] transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[11px_11px_0_0_#000]">
        <span className="inline-flex h-14 w-14 items-center justify-center border-4 border-black bg-sky-300 text-black">
          <HiOutlineLightBulb className="h-7 w-7" aria-hidden="true" />
        </span>
        <h2 className="mt-5 text-2xl font-black uppercase">Tujuan</h2>
        <p className="mt-3 font-bold leading-relaxed">
          Mendekatkan informasi dan pendampingan kesehatan ibu, anak, serta keluarga kepada warga.
          Pelayanan diberikan sesuai kegiatan dan tenaga yang tersedia.
        </p>
      </article>
      <article className="border-4 border-black bg-white p-8 shadow-[8px_8px_0_0_#000] transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[11px_11px_0_0_#000]">
        <span className="inline-flex h-14 w-14 items-center justify-center border-4 border-black bg-pink-300 text-black">
          <HiOutlineHeart className="h-7 w-7" aria-hidden="true" />
        </span>
        <h2 className="mt-5 text-2xl font-black uppercase">Pendampingan bersama</h2>
        <p className="mt-3 font-bold leading-relaxed">
          Kader membantu warga mendapatkan informasi kegiatan dan layanan. Untuk kebutuhan
          pemeriksaan atau saran medis, warga dapat berkonsultasi dengan tenaga kesehatan.
        </p>
      </article>
    </section>

    <section className="mx-auto mt-14 max-w-7xl border-4 border-black bg-teal-400 p-8 shadow-[10px_10px_0_0_#000] md:flex md:items-center md:justify-between md:gap-8 md:p-10">
      <div className="flex items-start gap-4">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center border-4 border-black bg-white text-black">
          <HiOutlineUserGroup className="h-6 w-6" aria-hidden="true" />
        </span>
        <div>
          <h2 className="text-2xl font-black uppercase">Cari tahu kegiatan Posyandu</h2>
          <p className="mt-2 font-bold leading-relaxed">
            Jadwal dan lokasi kegiatan diumumkan setelah dicatat oleh petugas. Konfirmasikan
            informasi kepada kader sebelum berkunjung.
          </p>
        </div>
      </div>
      <Link
        to="/informasi"
        className="mt-6 inline-flex min-h-12 shrink-0 cursor-pointer items-center justify-center border-4 border-black bg-white px-6 py-3 text-sm font-black uppercase text-black shadow-[5px_5px_0_0_#000] transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:bg-yellow-300 hover:shadow-[2px_2px_0_0_#000] active:translate-x-1 active:translate-y-1 active:shadow-none focus:outline-none focus-visible:ring-4 focus-visible:ring-pink-400 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-400 md:mt-0"
      >
        Lihat jadwal
      </Link>
    </section>
  </main>
);

export default Tentang;