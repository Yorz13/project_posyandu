import { useMemo, useState } from 'react';
import {
  HiOutlineUserGroup,
  HiOutlineCheckCircle,
  HiOutlineBan,
  HiOutlinePlus,
  HiOutlinePencil,
  HiOutlineTrash,
  HiOutlineSearch,
  HiOutlineX,
} from 'react-icons/hi';

// ===== Data contoh. Ganti dengan data dari API (apps/api, modul kader) =====
const dataAwal = [
  { id: 1, nama: 'Rina Marlina', email: 'rina@posyandu.id', hp: '081234567801', rt: '01', status: 'AKTIF' },
  { id: 2, nama: 'Dewi Lestari', email: 'dewi@posyandu.id', hp: '081234567802', rt: '02', status: 'AKTIF' },
  { id: 3, nama: 'Yuli Handayani', email: 'yuli@posyandu.id', hp: '081234567803', rt: '03', status: 'AKTIF' },
  { id: 4, nama: 'Sari Wulandari', email: 'sari@posyandu.id', hp: '081234567804', rt: '04', status: 'NONAKTIF' },
  { id: 5, nama: 'Nina Rahmawati', email: 'nina@posyandu.id', hp: '081234567805', rt: '05', status: 'AKTIF' },
];

const formKosong = { nama: '', email: '', hp: '', rt: '', status: 'AKTIF' };

// ===== Kelas bersama (sama dengan DashboardAdmin) =====
const card = 'border-4 border-black bg-white p-6 shadow-[8px_8px_0_0_#000]';

const cardTitle =
  'inline-block border-4 border-black bg-yellow-300 px-3 py-1 text-sm font-black uppercase tracking-wide text-black shadow-[3px_3px_0_0_#000]';

const focusRing = 'focus:outline-none focus-visible:ring-4 focus-visible:ring-pink-400';

const btnBase = `cursor-pointer border-4 border-black font-black uppercase text-black shadow-[3px_3px_0_0_#000] transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[1px_1px_0_0_#000] active:translate-x-1 active:translate-y-1 active:shadow-none ${focusRing}`;

const btnPrimary = `${btnBase} bg-teal-400 hover:bg-teal-300 px-4 py-2 text-sm`;
const btnSecondary = `${btnBase} bg-white hover:bg-yellow-300 px-4 py-2 text-sm`;
const btnEdit = `${btnBase} bg-sky-300 hover:bg-sky-200 px-2.5 py-1 text-xs`;
const btnDanger = `${btnBase} bg-pink-300 hover:bg-pink-200 px-2.5 py-1 text-xs`;

const inputClass = `w-full border-4 border-black bg-white px-3 py-2 text-sm font-bold text-black placeholder:text-slate-500 ${focusRing}`;

const DataKader = () => {
  const [kader, setKader] = useState(dataAwal);
  const [cari, setCari] = useState('');
  const [filter, setFilter] = useState('SEMUA');

  // Modal tambah/ubah
  const [formBuka, setFormBuka] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState(formKosong);
  const [error, setError] = useState({});

  // Modal hapus
  const [hapusTarget, setHapusTarget] = useState(null);

  const total = kader.length;
  const aktif = kader.filter((k) => k.status === 'AKTIF').length;
  const nonaktif = total - aktif;

  const tampil = useMemo(() => {
    const q = cari.trim().toLowerCase();
    return kader.filter((k) => {
      const cocokStatus = filter === 'SEMUA' || k.status === filter;
      const cocokCari =
        !q || [k.nama, k.email, k.hp].some((v) => v.toLowerCase().includes(q));
      return cocokStatus && cocokCari;
    });
  }, [kader, cari, filter]);

  const bukaTambah = () => {
    setEditId(null);
    setForm(formKosong);
    setError({});
    setFormBuka(true);
  };

  const bukaUbah = (k) => {
    setEditId(k.id);
    setForm({ nama: k.nama, email: k.email, hp: k.hp, rt: k.rt, status: k.status });
    setError({});
    setFormBuka(true);
  };

  const tutupForm = () => setFormBuka(false);

  const ubahField = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const validasi = () => {
    const err = {};
    if (!form.nama.trim()) err.nama = 'Nama wajib diisi.';
    if (!/^\S+@\S+\.\S+$/.test(form.email)) err.email = 'Format email tidak valid.';
    if (!/^08\d{8,12}$/.test(form.hp)) err.hp = 'Nomor HP harus diawali 08 dan 10-14 digit.';
    if (!form.rt.trim()) err.rt = 'RT wajib diisi.';
    return err;
  };

  const simpan = (e) => {
    e.preventDefault();
    const err = validasi();
    setError(err);
    if (Object.keys(err).length > 0) return;

    // TODO: panggil API (POST /kader atau PUT /kader/:id), lalu refresh data
    if (editId === null) {
      setKader((list) => [...list, { ...form, id: Date.now() }]);
    } else {
      setKader((list) => list.map((k) => (k.id === editId ? { ...k, ...form } : k)));
    }
    setFormBuka(false);
  };

  const konfirmasiHapus = () => {
    // TODO: panggil API (DELETE /kader/:id)
    setKader((list) => list.filter((k) => k.id !== hapusTarget.id));
    setHapusTarget(null);
  };

  const stats = [
    { label: 'Total kader', value: total, icon: HiOutlineUserGroup, tone: 'bg-teal-300' },
    { label: 'Kader aktif', value: aktif, icon: HiOutlineCheckCircle, tone: 'bg-lime-300' },
    { label: 'Nonaktif', value: nonaktif, icon: HiOutlineBan, tone: 'bg-pink-300' },
  ];

  return (
    <div className="space-y-8">
      {/* Judul halaman */}
      <header className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="inline-block border-4 border-black bg-teal-400 px-4 py-2 text-2xl font-black uppercase tracking-tight text-black shadow-[6px_6px_0_0_#000] sm:text-3xl">
            Data Kader
          </h1>
          <p className="mt-4 text-sm font-bold text-black">Kelola akun kader Posyandu RW 08.</p>
        </div>
        <button type="button" onClick={bukaTambah} className={`${btnPrimary} flex items-center gap-2 self-start sm:self-auto`}>
          <HiOutlinePlus className="h-5 w-5" aria-hidden="true" />
          Tambah kader
        </button>
      </header>

      {/* Ringkasan */}
      <section aria-label="Ringkasan kader" className="grid gap-6 sm:grid-cols-3">
        {stats.map(({ label, value, icon: Icon, tone }) => (
          <div key={label} className="border-4 border-black bg-white p-5 shadow-[6px_6px_0_0_#000]">
            <div className="flex items-center justify-between gap-3">
              <p className="text-xs font-black uppercase tracking-wider text-black">{label}</p>
              <span className={`flex h-11 w-11 shrink-0 items-center justify-center border-4 border-black ${tone}`}>
                <Icon className="h-5 w-5 text-black" aria-hidden="true" />
              </span>
            </div>
            <p className="mt-3 text-4xl font-black text-black">{value}</p>
          </div>
        ))}
      </section>

      {/* Tabel */}
      <section className={card}>
        <h2 className={cardTitle}>Daftar kader</h2>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <HiOutlineSearch
              className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-black"
              aria-hidden="true"
            />
            <input
              type="search"
              value={cari}
              onChange={(e) => setCari(e.target.value)}
              placeholder="Cari nama, email, atau nomor HP…"
              aria-label="Cari kader"
              className={`${inputClass} pl-10`}
            />
          </div>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            aria-label="Filter status"
            className={`${inputClass} sm:w-48`}
          >
            <option value="SEMUA">Semua status</option>
            <option value="AKTIF">Aktif</option>
            <option value="NONAKTIF">Nonaktif</option>
          </select>
        </div>

        <div className="mt-6 overflow-x-auto border-4 border-black">
          <table className="w-full min-w-[720px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b-4 border-black bg-yellow-300">
                {['No', 'Nama', 'Kontak', 'RT', 'Status', 'Aksi'].map((h) => (
                  <th key={h} scope="col" className="px-4 py-3 text-xs font-black uppercase tracking-wider text-black">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tampil.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-10 text-center font-bold text-black">
                    Tidak ada kader yang cocok. Ubah kata kunci atau filter, atau tambah kader baru.
                  </td>
                </tr>
              ) : (
                tampil.map((k, i) => (
                  <tr key={k.id} className="border-b-4 border-black last:border-b-0 odd:bg-white even:bg-sky-100">
                    <td className="px-4 py-3 font-black text-black">{i + 1}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <span
                          className="flex h-10 w-10 shrink-0 items-center justify-center border-4 border-black bg-pink-300 font-black text-black"
                          aria-hidden="true"
                        >
                          {k.nama.charAt(0)}
                        </span>
                        <span className="font-black text-black">{k.nama}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 font-bold text-black">
                      <p>{k.email}</p>
                      <p className="text-xs">{k.hp}</p>
                    </td>
                    <td className="px-4 py-3 font-black text-black">RT {k.rt}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-block border-2 border-black px-2 py-0.5 text-xs font-black uppercase text-black ${
                          k.status === 'AKTIF' ? 'bg-lime-300' : 'bg-orange-300'
                        }`}
                      >
                        {k.status === 'AKTIF' ? 'Aktif' : 'Nonaktif'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => bukaUbah(k)}
                          className={`${btnEdit} flex items-center gap-1`}
                          aria-label={`Ubah ${k.nama}`}
                        >
                          <HiOutlinePencil className="h-4 w-4" aria-hidden="true" />
                          Ubah
                        </button>
                        <button
                          type="button"
                          onClick={() => setHapusTarget(k)}
                          className={`${btnDanger} flex items-center gap-1`}
                          aria-label={`Hapus ${k.nama}`}
                        >
                          <HiOutlineTrash className="h-4 w-4" aria-hidden="true" />
                          Hapus
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <p className="mt-4 text-xs font-bold text-black">
          Menampilkan {tampil.length} dari {total} kader.
        </p>
      </section>

      {/* Modal tambah / ubah */}
      {formBuka && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="judul-form"
        >
          <form
            onSubmit={simpan}
            noValidate
            className="max-h-full w-full max-w-lg overflow-y-auto border-4 border-black bg-white p-6 shadow-[8px_8px_0_0_#000]"
          >
            <div className="flex items-start justify-between gap-3">
              <h2 id="judul-form" className={cardTitle}>
                {editId === null ? 'Tambah kader' : 'Ubah data kader'}
              </h2>
              <button
                type="button"
                onClick={tutupForm}
                aria-label="Tutup"
                className={`${btnBase} bg-white p-1 hover:bg-pink-300`}
              >
                <HiOutlineX className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <div className="mt-6 space-y-4">
              <Field label="Nama lengkap" error={error.nama}>
                <input name="nama" value={form.nama} onChange={ubahField} className={inputClass} autoFocus />
              </Field>
              <Field label="Email" error={error.email}>
                <input name="email" type="email" value={form.email} onChange={ubahField} className={inputClass} />
              </Field>
              <Field label="Nomor HP" error={error.hp}>
                <input name="hp" inputMode="tel" value={form.hp} onChange={ubahField} className={inputClass} />
              </Field>
               <Field label="Password" error={error.password}>
                <input name="hp" inputMode="tel" value={form.password} onChange={ubahField} className={inputClass} />
              </Field>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="RT" error={error.rt}>
                  <input name="rt" value={form.rt} onChange={ubahField} className={inputClass} />
                </Field>
                <Field label="Status">
                  <select name="status" value={form.status} onChange={ubahField} className={inputClass}>
                    <option value="AKTIF">Aktif</option>
                    <option value="NONAKTIF">Nonaktif</option>
                  </select>
                </Field>
              </div>
            </div>

            <div className="mt-8 flex justify-end gap-3">
              <button type="button" onClick={tutupForm} className={btnSecondary}>
                Batal
              </button>
              <button type="submit" className={btnPrimary}>
                Simpan
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Modal konfirmasi hapus */}
      {hapusTarget && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          role="alertdialog"
          aria-modal="true"
          aria-labelledby="judul-hapus"
        >
          <div className="w-full max-w-md border-4 border-black bg-white p-6 shadow-[8px_8px_0_0_#000]">
            <h2 id="judul-hapus" className="inline-block border-4 border-black bg-pink-300 px-3 py-1 text-sm font-black uppercase text-black shadow-[3px_3px_0_0_#000]">
              Hapus kader?
            </h2>
            <p className="mt-5 text-sm font-bold text-black">
              Akun <span className="font-black">{hapusTarget.nama}</span> akan dihapus dan tidak bisa dikembalikan.
            </p>
            <div className="mt-8 flex justify-end gap-3">
              <button type="button" onClick={() => setHapusTarget(null)} className={btnSecondary}>
                Batal
              </button>
              <button type="button" onClick={konfirmasiHapus} className={`${btnBase} bg-pink-400 hover:bg-pink-300 px-4 py-2 text-sm`}>
                Hapus kader
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Pembungkus label + pesan error untuk input form
const Field = ({ label, error, children }) => (
  <label className="block">
    <span className="mb-1 block text-xs font-black uppercase tracking-wide text-black">{label}</span>
    {children}
    {error && <span className="mt-1 block text-xs font-black text-red-600">{error}</span>}
  </label>
);

export default DataKader;