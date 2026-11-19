import { useState } from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineInformationCircle } from 'react-icons/hi';

// ===== Data contoh. Ganti dengan data anak milik warga yang login (dari API) =====
const daftarAnak = [
  {
    id: 1,
    nama: 'Aisyah Putri',
    jenisKelamin: 'Perempuan',
    tanggalLahir: '12 Sep 2025',
    usia: '14 bulan',
    anakKe: 2,
    golonganDarah: 'O',
    beratLahir: '3,1 kg',
    panjangLahir: '49 cm',
    namaIbu: 'Siti Aminah',
    namaAyah: 'Budi Santoso',
    alamat: 'Jl. Melati No. 12, RT 03 / RW 08',
    nomorKia: 'KIA-08-0412',
    statusGizi: { label: 'Gizi baik', bar: 'bg-lime-400', text: 'text-black' },
    pemeriksaanTerakhir: '7 Okt 2026',
    ukuran: { berat: '9,4 kg', tinggi: '76 cm', lingkarKepala: '45 cm' },
    indikator: [
      { nama: 'Berat menurut usia', hasil: 'Berat badan normal' },
      { nama: 'Tinggi menurut usia', hasil: 'Normal' },
      { nama: 'Berat menurut tinggi', hasil: 'Gizi baik' },
    ],
  },
  {
    id: 2,
    nama: 'Muhammad Fikri',
    jenisKelamin: 'Laki-laki',
    tanggalLahir: '3 Mar 2022',
    usia: '4 tahun 8 bulan',
    anakKe: 1,
    golonganDarah: 'O',
    beratLahir: '3,3 kg',
    panjangLahir: '50 cm',
    namaIbu: 'Siti Aminah',
    namaAyah: 'Budi Santoso',
    alamat: 'Jl. Melati No. 12, RT 03 / RW 08',
    nomorKia: 'KIA-08-0187',
    statusGizi: { label: 'Berisiko gizi kurang', bar: 'bg-yellow-300', text: 'text-black' },
    pemeriksaanTerakhir: '7 Okt 2026',
    ukuran: { berat: '14,2 kg', tinggi: '99 cm', lingkarKepala: '49 cm' },
    indikator: [
      { nama: 'Berat menurut usia', hasil: 'Berat badan kurang' },
      { nama: 'Tinggi menurut usia', hasil: 'Normal' },
      { nama: 'Berat menurut tinggi', hasil: 'Berisiko gizi kurang' },
    ],
  },
];

const card = 'border-4 border-black bg-white p-6 shadow-[8px_8px_0_0_#000]';

const cardTitle =
  'inline-block border-4 border-black bg-yellow-300 px-3 py-1 text-sm font-black uppercase tracking-wide text-black shadow-[3px_3px_0_0_#000]';

const linkButton =
  'cursor-pointer border-2 border-black bg-white px-2 py-1 text-xs font-black uppercase text-black shadow-[3px_3px_0_0_#000] transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:bg-pink-300 hover:shadow-[1px_1px_0_0_#000] active:translate-x-1 active:translate-y-1 active:shadow-none focus:outline-none focus-visible:ring-4 focus-visible:ring-pink-400';

const Field = ({ label, value }) => (
  <div className="border-4 border-black bg-white p-3 shadow-[4px_4px_0_0_#000]">
    <dt className="text-xs font-bold text-slate-700">{label}</dt>
    <dd className="mt-1 text-sm font-black text-black">{value}</dd>
  </div>
);

const DataAnak = () => {
  const [terpilih, setTerpilih] = useState(daftarAnak[0].id);
  const anak = daftarAnak.find((a) => a.id === terpilih);

  return (
    <div className="space-y-8">
      {/* Judul halaman */}
      <header>
        <h1 className="inline-block border-4 border-black bg-teal-400 px-4 py-2 text-2xl font-black uppercase tracking-tight text-black shadow-[6px_6px_0_0_#000] sm:text-3xl">
          Data Anak
        </h1>
        <p className="mt-4 text-sm font-bold text-black">Identitas dan hasil ukur terakhir anak Anda.</p>
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

      {/* Profil + status */}
      <section className="grid gap-6 lg:grid-cols-3">
        <div className="border-4 border-black bg-pink-200 p-6 shadow-[8px_8px_0_0_#000]">
          <span
            className="flex h-20 w-20 items-center justify-center border-4 border-black bg-white text-4xl font-black text-black shadow-[4px_4px_0_0_#000]"
            aria-hidden="true"
          >
            {anak.nama.charAt(0)}
          </span>
          <p className="mt-5 text-2xl font-black text-black">{anak.nama}</p>
          <p className="mt-1 text-sm font-bold text-black">
            {anak.jenisKelamin} · {anak.usia}
          </p>

          <p className="mt-6 text-xs font-black uppercase text-black">Status gizi</p>
          <span
            className={`mt-2 inline-block border-4 border-black px-3 py-1.5 text-sm font-black uppercase shadow-[3px_3px_0_0_#000] ${anak.statusGizi.bar} ${anak.statusGizi.text}`}
          >
            {anak.statusGizi.label}
          </span>
          <p className="mt-4 text-xs font-bold text-black">Terakhir diperiksa {anak.pemeriksaanTerakhir}</p>
        </div>

        <div className={`${card} lg:col-span-2`}>
          <h2 className={cardTitle}>Identitas</h2>
          <dl className="mt-6 grid gap-4 sm:grid-cols-2">
            <Field label="Nama lengkap" value={anak.nama} />
            <Field label="Nomor buku KIA" value={anak.nomorKia} />
            <Field label="Jenis kelamin" value={anak.jenisKelamin} />
            <Field label="Tanggal lahir" value={anak.tanggalLahir} />
            <Field label="Anak ke" value={anak.anakKe} />
            <Field label="Golongan darah" value={anak.golonganDarah} />
            <Field label="Berat lahir" value={anak.beratLahir} />
            <Field label="Panjang lahir" value={anak.panjangLahir} />
            <Field label="Nama ibu" value={anak.namaIbu} />
            <Field label="Nama ayah" value={anak.namaAyah} />
            <div className="sm:col-span-2">
              <Field label="Alamat" value={anak.alamat} />
            </div>
          </dl>
        </div>
      </section>

      {/* Hasil ukur + indikator */}
      <section className="grid gap-6 lg:grid-cols-3">
        <div className={card}>
          <h2 className={cardTitle}>Ukuran terakhir</h2>
          <dl className="mt-6 space-y-4">
            <Field label="Berat badan" value={anak.ukuran.berat} />
            <Field label="Tinggi badan" value={anak.ukuran.tinggi} />
            <Field label="Lingkar kepala" value={anak.ukuran.lingkarKepala} />
          </dl>
        </div>

        <div className={`${card} lg:col-span-2`}>
          <div className="flex items-center justify-between gap-2">
            <h2 className={cardTitle}>Penilaian pertumbuhan</h2>
            <Link to="/warga/pemeriksaan" className={linkButton}>
              Riwayat
            </Link>
          </div>

          <ul className="mt-6 space-y-4">
            {anak.indikator.map((i) => (
              <li
                key={i.nama}
                className="flex flex-col gap-1 border-4 border-black bg-sky-200 p-3 shadow-[4px_4px_0_0_#000] sm:flex-row sm:items-center sm:justify-between"
              >
                <p className="text-sm font-black uppercase text-black">{i.nama}</p>
                <p className="text-sm font-bold text-black">{i.hasil}</p>
              </li>
            ))}
          </ul>

          <Link to="/warga/imunisasi" className={`${linkButton} mt-6 inline-block`}>
            Lihat riwayat imunisasi
          </Link>
        </div>
      </section>

      {/* Catatan hanya-baca */}
      <p className="flex items-start gap-2 border-4 border-black bg-white p-4 text-sm font-bold text-black shadow-[4px_4px_0_0_#000]">
        <HiOutlineInformationCircle className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
        Data anak diperbarui oleh kader. Jika ada data yang salah, sampaikan ke kader saat posyandu.
      </p>
    </div>
  );
};

export default DataAnak;