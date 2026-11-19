import { useState } from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineInformationCircle } from 'react-icons/hi';

// ===== Data contoh. Ganti dengan data dari API (hanya anak milik warga yang login) =====
// Urutkan dari terbaru ke terlama.
const daftarAnak = [
  {
    id: 1,
    nama: 'Aisyah Putri',
    usia: '14 bulan',
    pemeriksaan: [
      { tanggal: '7 Okt 2026', bulan: 'Okt', usia: '13 bln', berat: 9.4, tinggi: 76, kepala: 45, status: 'Gizi baik', petugas: 'Kader Rina', catatan: 'Pertumbuhan baik. Lanjutkan MPASI bergizi.' },
      { tanggal: '9 Sep 2026', bulan: 'Sep', usia: '12 bln', berat: 9.1, tinggi: 75, kepala: 44.8, status: 'Gizi baik', petugas: 'Kader Rina', catatan: '-' },
      { tanggal: '5 Agu 2026', bulan: 'Agu', usia: '11 bln', berat: 8.9, tinggi: 74, kepala: 44.5, status: 'Gizi baik', petugas: 'Kader Dewi', catatan: '-' },
      { tanggal: '8 Jul 2026', bulan: 'Jul', usia: '10 bln', berat: 8.6, tinggi: 73, kepala: 44.2, status: 'Gizi baik', petugas: 'Kader Dewi', catatan: '-' },
      { tanggal: '10 Jun 2026', bulan: 'Jun', usia: '9 bln', berat: 8.4, tinggi: 71.5, kepala: 43.9, status: 'Berisiko gizi kurang', petugas: 'Kader Rina', catatan: 'Kenaikan berat badan kurang. Pantau bulan depan.' },
      { tanggal: '6 Mei 2026', bulan: 'Mei', usia: '8 bln', berat: 8.1, tinggi: 70, kepala: 43.5, status: 'Gizi baik', petugas: 'Kader Rina', catatan: '-' },
    ],
  },
  {
    id: 2,
    nama: 'Muhammad Fikri',
    usia: '4 tahun 8 bulan',
    pemeriksaan: [
      { tanggal: '7 Okt 2026', bulan: 'Okt', usia: '55 bln', berat: 14.2, tinggi: 99, kepala: 49, status: 'Berisiko gizi kurang', petugas: 'Kader Rina', catatan: 'Berat badan di bawah rata-rata usia. Tambah asupan protein.' },
      { tanggal: '9 Sep 2026', bulan: 'Sep', usia: '54 bln', berat: 14.1, tinggi: 98.5, kepala: 49, status: 'Berisiko gizi kurang', petugas: 'Kader Rina', catatan: '-' },
      { tanggal: '5 Agu 2026', bulan: 'Agu', usia: '53 bln', berat: 14.1, tinggi: 98, kepala: 48.9, status: 'Gizi baik', petugas: 'Kader Dewi', catatan: '-' },
      { tanggal: '8 Jul 2026', bulan: 'Jul', usia: '52 bln', berat: 13.9, tinggi: 97.5, kepala: 48.8, status: 'Gizi baik', petugas: 'Kader Dewi', catatan: '-' },
    ],
  },
];

const metrik = [
  { key: 'berat', label: 'Berat', satuan: 'kg' },
  { key: 'tinggi', label: 'Tinggi', satuan: 'cm' },
  { key: 'kepala', label: 'Lingkar kepala', satuan: 'cm' },
];

const warnaStatus = {
  'Gizi baik': 'bg-lime-400 text-black',
  'Berisiko gizi kurang': 'bg-yellow-300 text-black',
  'Gizi kurang': 'bg-orange-400 text-black',
  'Gizi buruk': 'bg-red-500 text-white',
};

const angka = (n) => String(n).replace('.', ',');

const card = 'border-4 border-black bg-white p-6 shadow-[8px_8px_0_0_#000]';

const cardTitle =
  'inline-block border-4 border-black bg-yellow-300 px-3 py-1 text-sm font-black uppercase tracking-wide text-black shadow-[3px_3px_0_0_#000]';

const linkButton =
  'cursor-pointer border-2 border-black bg-white px-2 py-1 text-xs font-black uppercase text-black shadow-[3px_3px_0_0_#000] transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:bg-pink-300 hover:shadow-[1px_1px_0_0_#000] active:translate-x-1 active:translate-y-1 active:shadow-none focus:outline-none focus-visible:ring-4 focus-visible:ring-pink-400';

const RiwayatPemeriksaan = () => {
  const [terpilih, setTerpilih] = useState(daftarAnak[0].id);
  const [ukuran, setUkuran] = useState('berat');

  const anak = daftarAnak.find((a) => a.id === terpilih);
  const data = anak.pemeriksaan;
  const terbaru = data[0];
  const sebelumnya = data[1];
  const m = metrik.find((x) => x.key === ukuran);

  // Grafik: urut dari lama ke baru
  const seri = [...data].reverse();
  const nilai = seri.map((d) => d[ukuran]);
  const maks = Math.max(...nilai);
  const min = Math.min(...nilai);

  const selisih = sebelumnya ? +(terbaru[ukuran] - sebelumnya[ukuran]).toFixed(1) : null;
  const teksSelisih =
    selisih === null
      ? 'Belum ada pembanding'
      : `${selisih > 0 ? '+' : ''}${angka(selisih)} ${m.satuan} dari pemeriksaan sebelumnya`;

  return (
    <div className="space-y-8">
      {/* Judul halaman */}
      <header>
        <h1 className="inline-block border-4 border-black bg-teal-400 px-4 py-2 text-2xl font-black uppercase tracking-tight text-black shadow-[6px_6px_0_0_#000] sm:text-3xl">
          Riwayat Pemeriksaan
        </h1>
        <p className="mt-4 text-sm font-bold text-black">Hasil penimbangan dan pengukuran di setiap posyandu.</p>
      </header>

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

      {/* Hasil terbaru */}
      <section aria-label="Hasil pemeriksaan terbaru" className="border-4 border-black bg-pink-200 p-5 shadow-[8px_8px_0_0_#000]">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-black uppercase text-black">Pemeriksaan terbaru · {terbaru.tanggal}</p>
            <p className="mt-2 text-xl font-black text-black">
              {angka(terbaru.berat)} kg · {angka(terbaru.tinggi)} cm · LK {angka(terbaru.kepala)} cm
            </p>
            <p className="mt-1 text-sm font-bold text-black">{anak.nama}, {anak.usia}</p>
          </div>
          <span
            className={`inline-block self-start border-4 border-black px-3 py-1.5 text-sm font-black uppercase shadow-[3px_3px_0_0_#000] sm:self-auto ${warnaStatus[terbaru.status]}`}
          >
            {terbaru.status}
          </span>
        </div>
        {terbaru.catatan !== '-' && (
          <p className="mt-4 border-t-4 border-black pt-3 text-sm font-bold text-black">Catatan kader: {terbaru.catatan}</p>
        )}
      </section>

      {/* Grafik */}
      <section className={card}>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h2 className={cardTitle}>Perkembangan {m.label.toLowerCase()}</h2>
          <div role="group" aria-label="Pilih ukuran" className="flex flex-wrap gap-3">
            {metrik.map((x) => (
              <button
                key={x.key}
                type="button"
                aria-pressed={ukuran === x.key}
                onClick={() => setUkuran(x.key)}
                className={`cursor-pointer border-2 border-black px-2 py-1 text-xs font-black uppercase text-black shadow-[3px_3px_0_0_#000] transition-all focus:outline-none focus-visible:ring-4 focus-visible:ring-pink-400 ${
                  ukuran === x.key ? 'bg-teal-400' : 'bg-white hover:bg-pink-300'
                }`}
              >
                {x.label}
              </button>
            ))}
          </div>
        </div>
        <p className="mt-3 text-sm font-bold text-black">{teksSelisih}.</p>

        <div
          role="img"
          aria-label={`Grafik ${m.label.toLowerCase()}: ${seri.map((d) => `${d.bulan} ${angka(d[ukuran])} ${m.satuan}`).join(', ')}`}
          className="mt-6 flex items-end gap-3 border-b-4 border-black sm:gap-5"
        >
          {seri.map((d, i) => {
            // Skala dimulai dari sedikit di bawah nilai minimum agar perubahan kecil tetap terlihat
            const tinggiPersen = 25 + ((d[ukuran] - min) / (maks - min || 1)) * 75;
            return (
              <div key={d.tanggal} className="flex flex-1 flex-col items-center gap-2">
                <span className="text-xs font-black text-black">{angka(d[ukuran])}</span>
                <div className="flex h-40 w-full items-end justify-center">
                  <div
                    className={`w-full max-w-14 border-4 border-b-0 border-black ${i === seri.length - 1 ? 'bg-pink-400' : 'bg-teal-300'}`}
                    style={{ height: `${tinggiPersen}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
        <div className="mt-2 flex gap-3 sm:gap-5">
          {seri.map((d) => (
            <span key={d.tanggal} className="flex-1 text-center text-xs font-black uppercase text-black">
              {d.bulan}
            </span>
          ))}
        </div>
      </section>

      {/* Tabel riwayat */}
      <section className={card}>
        <div className="flex items-center justify-between gap-2">
          <h2 className={cardTitle}>Semua pemeriksaan</h2>
          <Link to="/warga/imunisasi" className={linkButton}>
            Riwayat imunisasi
          </Link>
        </div>

        <div className="mt-6 overflow-x-auto">
          <table className="w-full min-w-[720px] border-4 border-black text-left text-sm">
            <caption className="sr-only">Riwayat pemeriksaan {anak.nama}</caption>
            <thead className="bg-sky-200">
              <tr className="border-b-4 border-black">
                {['Tanggal', 'Usia', 'Berat', 'Tinggi', 'L. kepala', 'Status gizi', 'Catatan'].map((h) => (
                  <th key={h} scope="col" className="px-3 py-3 text-xs font-black uppercase text-black">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((d) => (
                <tr key={d.tanggal} className="border-b-4 border-black last:border-b-0">
                  <td className="whitespace-nowrap px-3 py-3 font-black text-black">{d.tanggal}</td>
                  <td className="whitespace-nowrap px-3 py-3 font-bold text-black">{d.usia}</td>
                  <td className="whitespace-nowrap px-3 py-3 font-bold text-black">{angka(d.berat)} kg</td>
                  <td className="whitespace-nowrap px-3 py-3 font-bold text-black">{angka(d.tinggi)} cm</td>
                  <td className="whitespace-nowrap px-3 py-3 font-bold text-black">{angka(d.kepala)} cm</td>
                  <td className="px-3 py-3">
                    <span
                      className={`inline-block whitespace-nowrap border-2 border-black px-2 py-0.5 text-xs font-black uppercase ${warnaStatus[d.status]}`}
                    >
                      {d.status}
                    </span>
                  </td>
                  <td className="px-3 py-3 text-xs font-bold text-black">{d.catatan}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Catatan hanya-baca */}
      <p className="flex items-start gap-2 border-4 border-black bg-white p-4 text-sm font-bold text-black shadow-[4px_4px_0_0_#000]">
        <HiOutlineInformationCircle className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
        Hasil pemeriksaan dicatat oleh kader. Jika ada data yang tidak sesuai, sampaikan ke kader saat posyandu.
      </p>
    </div>
  );
};

export default RiwayatPemeriksaan;