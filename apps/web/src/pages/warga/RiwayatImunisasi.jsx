import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  HiOutlineCheck,
  HiOutlineCalendar,
  HiOutlineExclamation,
  HiOutlineInformationCircle,
} from 'react-icons/hi';

// ===== Data contoh. Ganti dengan data dari API (hanya anak milik warga yang login) =====
// status: 'selesai' | 'terjadwal' | 'terlambat' | 'belum'
const daftarAnak = [
  {
    id: 1,
    nama: 'Aisyah Putri',
    usia: '14 bulan',
    imunisasi: [
      { nama: 'Hepatitis B (HB-0)', usiaIdeal: '< 24 jam', status: 'selesai', tanggal: '12 Sep 2025', tempat: 'RSIA Kasih Ibu', petugas: 'Bidan Ratna' },
      { nama: 'BCG', usiaIdeal: '1 bulan', status: 'selesai', tanggal: '10 Okt 2025', tempat: 'Posyandu RW 08', petugas: 'Bidan Ratna' },
      { nama: 'Polio 1', usiaIdeal: '1 bulan', status: 'selesai', tanggal: '10 Okt 2025', tempat: 'Posyandu RW 08', petugas: 'Bidan Ratna' },
      { nama: 'DPT-HB-Hib 1', usiaIdeal: '2 bulan', status: 'selesai', tanggal: '8 Nov 2025', tempat: 'Posyandu RW 08', petugas: 'Bidan Ratna' },
      { nama: 'DPT-HB-Hib 2', usiaIdeal: '3 bulan', status: 'selesai', tanggal: '6 Des 2025', tempat: 'Posyandu RW 08', petugas: 'Bidan Ratna' },
      { nama: 'DPT-HB-Hib 3', usiaIdeal: '4 bulan', status: 'selesai', tanggal: '10 Jan 2026', tempat: 'Posyandu RW 08', petugas: 'Bidan Ratna' },
      { nama: 'Campak-Rubella', usiaIdeal: '9 bulan', status: 'terjadwal', jadwal: 'Sabtu, 21 Nov 2026', tempat: 'Balai RW 08' },
      { nama: 'DPT-HB-Hib lanjutan', usiaIdeal: '18 bulan', status: 'belum' },
    ],
  },
  {
    id: 2,
    nama: 'Muhammad Fikri',
    usia: '4 tahun 8 bulan',
    imunisasi: [
      { nama: 'Hepatitis B (HB-0)', usiaIdeal: '< 24 jam', status: 'selesai', tanggal: '3 Mar 2022', tempat: 'RSIA Kasih Ibu', petugas: 'Bidan Ratna' },
      { nama: 'BCG', usiaIdeal: '1 bulan', status: 'selesai', tanggal: '5 Apr 2022', tempat: 'Posyandu RW 08', petugas: 'Bidan Ratna' },
      { nama: 'DPT-HB-Hib 3', usiaIdeal: '4 bulan', status: 'selesai', tanggal: '9 Jul 2022', tempat: 'Posyandu RW 08', petugas: 'Bidan Ratna' },
      { nama: 'Campak-Rubella', usiaIdeal: '9 bulan', status: 'selesai', tanggal: '10 Des 2022', tempat: 'Posyandu RW 08', petugas: 'Bidan Ratna' },
      { nama: 'Campak-Rubella lanjutan', usiaIdeal: '18 bulan', status: 'terlambat', jadwal: 'Seharusnya Sep 2023' },
    ],
  },
];

const tampilanStatus = {
  selesai: { label: 'Selesai', kelas: 'bg-lime-400 text-black' },
  terjadwal: { label: 'Terjadwal', kelas: 'bg-sky-300 text-black' },
  terlambat: { label: 'Terlambat', kelas: 'bg-red-500 text-white' },
  belum: { label: 'Belum waktunya', kelas: 'bg-white text-black' },
};

const card = 'border-4 border-black bg-white p-6 shadow-[8px_8px_0_0_#000]';

const cardTitle =
  'inline-block border-4 border-black bg-yellow-300 px-3 py-1 text-sm font-black uppercase tracking-wide text-black shadow-[3px_3px_0_0_#000]';

const linkButton =
  'cursor-pointer border-2 border-black bg-white px-2 py-1 text-xs font-black uppercase text-black shadow-[3px_3px_0_0_#000] transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:bg-pink-300 hover:shadow-[1px_1px_0_0_#000] active:translate-x-1 active:translate-y-1 active:shadow-none focus:outline-none focus-visible:ring-4 focus-visible:ring-pink-400';

const RiwayatImunisasi = () => {
  const [terpilih, setTerpilih] = useState(daftarAnak[0]?.id);
  const anak = daftarAnak.find((a) => a.id === terpilih);

  const header = (
    <header>
      <h1 className="inline-block border-4 border-black bg-teal-400 px-4 py-2 text-2xl font-black uppercase tracking-tight text-black shadow-[6px_6px_0_0_#000] sm:text-3xl">
        Riwayat Imunisasi
      </h1>
      <p className="mt-4 text-sm font-bold text-black">Imunisasi yang sudah diterima dan yang akan datang.</p>
    </header>
  );

  // Kondisi kosong: belum ada data anak
  if (!anak) {
    return (
      <div className="space-y-8">
        {header}
        <p className="border-4 border-black bg-white p-6 text-sm font-bold text-black shadow-[6px_6px_0_0_#000]">
          Belum ada data anak. Hubungi kader posyandu untuk mendaftarkan anak Anda.
        </p>
      </div>
    );
  }

  const data = anak.imunisasi;
  const jumlah = (s) => data.filter((i) => i.status === s).length;
  const selesai = jumlah('selesai');
  const persen = data.length ? Math.round((selesai / data.length) * 100) : 0;

  const terlambat = data.filter((i) => i.status === 'terlambat');
  const berikutnya = data.find((i) => i.status === 'terjadwal');

  return (
    <div className="space-y-8">
      {header}

      {/* Pemilih anak */}
      {daftarAnak.length > 1 && (
        <div role="tablist" aria-label="Pilih anak" className="flex flex-wrap gap-4">
          {daftarAnak.map((a) => {
            const aktif = a.id === terpilih;
            return (
              <button
                key={a.id}
                type="button"
                role="tab"
                aria-selected={aktif}
                onClick={() => setTerpilih(a.id)}
                className={`cursor-pointer border-4 border-black px-4 py-2 text-sm font-black uppercase text-black shadow-[4px_4px_0_0_#000] transition-all focus:outline-none focus-visible:ring-4 focus-visible:ring-pink-400 ${
                  aktif
                    ? 'bg-yellow-300'
                    : 'bg-white hover:translate-x-0.5 hover:translate-y-0.5 hover:bg-pink-300 hover:shadow-[2px_2px_0_0_#000]'
                }`}
              >
                {a.nama}
              </button>
            );
          })}
        </div>
      )}

      {/* Peringatan terlambat */}
      {terlambat.length > 0 && (
        <section
          role="alert"
          className="flex items-start gap-3 border-4 border-black bg-red-500 p-4 text-white shadow-[6px_6px_0_0_#000]"
        >
          <HiOutlineExclamation className="mt-0.5 h-6 w-6 shrink-0" aria-hidden="true" />
          <div>
            <p className="text-sm font-black uppercase">
              {terlambat.length} imunisasi terlambat untuk {anak.nama}
            </p>
            <p className="mt-1 text-sm font-bold">
              {terlambat.map((i) => i.nama).join(', ')}. Bawa anak ke posyandu atau puskesmas untuk dikejar.
            </p>
          </div>
        </section>
      )}

      {/* Ringkasan + berikutnya */}
      <section className="grid gap-6 lg:grid-cols-3">
        <div className={`${card} lg:col-span-2`}>
          <h2 className={cardTitle}>Kelengkapan imunisasi</h2>
          <p className="mt-3 text-sm font-bold text-black">
            {selesai} dari {data.length} imunisasi sudah selesai untuk {anak.nama}.
          </p>

          <div className="mt-6 flex items-end justify-between">
            <p className="text-6xl font-black text-black">{persen}%</p>
            <p className="text-sm font-bold text-black">
              {jumlah('terjadwal')} terjadwal · {jumlah('terlambat')} terlambat
            </p>
          </div>
          <div
            role="progressbar"
            aria-valuenow={persen}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Kelengkapan imunisasi"
            className="mt-3 h-8 overflow-hidden border-4 border-black bg-white"
          >
            <div className="h-full border-r-4 border-black bg-lime-400" style={{ width: `${persen}%` }} />
          </div>
        </div>

        <div className={card}>
          <h2 className={cardTitle}>Berikutnya</h2>
          {berikutnya ? (
            <div className="mt-6 border-4 border-black bg-sky-200 p-4 shadow-[4px_4px_0_0_#000]">
              <p className="text-sm font-black uppercase text-black">{berikutnya.nama}</p>
              <p className="mt-3 flex items-center gap-1.5 text-xs font-bold text-black">
                <HiOutlineCalendar className="h-4 w-4" aria-hidden="true" />
                {berikutnya.jadwal}
              </p>
              {berikutnya.tempat && <p className="mt-1 text-xs font-bold text-black">{berikutnya.tempat}</p>}
            </div>
          ) : (
            <p className="mt-6 text-sm font-bold text-black">Belum ada imunisasi yang dijadwalkan.</p>
          )}
        </div>
      </section>

      {/* Daftar imunisasi */}
      <section className={card}>
        <div className="flex items-center justify-between gap-2">
          <h2 className={cardTitle}>Daftar imunisasi</h2>
          <Link to="/warga/anak" className={linkButton}>
            Data anak
          </Link>
        </div>

        <div className="mt-6 overflow-x-auto">
          <table className="w-full min-w-[720px] border-4 border-black text-left text-sm">
            <caption className="sr-only">Daftar imunisasi {anak.nama}</caption>
            <thead className="bg-sky-200">
              <tr className="border-b-4 border-black">
                {['Imunisasi', 'Usia ideal', 'Status', 'Tanggal', 'Tempat', 'Petugas'].map((h) => (
                  <th key={h} scope="col" className="px-3 py-3 text-xs font-black uppercase text-black">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((i) => {
                const s = tampilanStatus[i.status];
                return (
                  <tr key={i.nama} className="border-b-4 border-black last:border-b-0">
                    <td className="px-3 py-3 font-black text-black">{i.nama}</td>
                    <td className="whitespace-nowrap px-3 py-3 font-bold text-black">{i.usiaIdeal}</td>
                    <td className="px-3 py-3">
                      <span
                        className={`inline-flex items-center gap-1 whitespace-nowrap border-2 border-black px-2 py-0.5 text-xs font-black uppercase ${s.kelas}`}
                      >
                        {i.status === 'selesai' && <HiOutlineCheck className="h-3.5 w-3.5" aria-hidden="true" />}
                        {s.label}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-3 py-3 font-bold text-black">{i.tanggal ?? i.jadwal ?? '-'}</td>
                    <td className="px-3 py-3 text-xs font-bold text-black">{i.tempat ?? '-'}</td>
                    <td className="px-3 py-3 text-xs font-bold text-black">{i.petugas ?? '-'}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* Catatan hanya-baca */}
      <p className="flex items-start gap-2 border-4 border-black bg-white p-4 text-sm font-bold text-black shadow-[4px_4px_0_0_#000]">
        <HiOutlineInformationCircle className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
        Riwayat imunisasi dicatat oleh kader dan petugas kesehatan. Jika ada yang belum tercatat, bawa buku KIA ke posyandu.
      </p>
    </div>
  );
};

export default RiwayatImunisasi;