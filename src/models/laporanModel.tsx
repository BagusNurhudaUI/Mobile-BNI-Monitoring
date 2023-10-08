export interface LaporanDetailModel {
  asset_alamat: string;
  asset_kode: string;
  asset_name: string;
  createdAt: string;
  date: string;
  date_done: string;
  deleteAt: string | null;
  deleted: boolean;
  dokumentasis: Dokumentasi[];
  id_asset: number;
  id_laporan: number;
  id_pelanggan: number;
  id_user: number;
  is_temuan: boolean;
  kunjungan: number;
  pelanggan_name: string;
  pelanggan_photo_url: string | null;
  temuan: Temuan | null;
  updatedAt: string;
  user_name: string;
  user_photo_url: string | null;
}

interface Dokumentasi {
  createdAt: string;
  dokumentasi_url: string;
  id: number;
  id_jenis_dokumentasi: number;
  id_laporan: number;
  nama_jenis_dokumentasi_snapshot: string;
}

interface Temuan {
  createdAt: string;
  id: number;
  id_laporan: number;
  keterangan: string;
  temuan1_url: string;
  temuan2_url: string;
}

export const defaultLaporanDetail: LaporanDetailModel = {
  asset_alamat: '',
  asset_kode: '',
  asset_name: '',
  createdAt: '',
  date: '',
  date_done: '',
  deleteAt: null,
  deleted: false,
  dokumentasis: [],
  id_asset: 0,
  id_laporan: 0,
  id_pelanggan: 0,
  id_user: 0,
  is_temuan: false,
  kunjungan: 0,
  pelanggan_name: '',
  pelanggan_photo_url: null,
  temuan: null,
  updatedAt: '',
  user_name: '',
  user_photo_url: null,
};
