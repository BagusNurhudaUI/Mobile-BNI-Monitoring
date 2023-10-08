interface UserData {
  id_user: number;
  id_pelanggan: number;
  id_user_asset: number | null;
  email: string;
  role: string;
  name: string;
  phone: string;
  photo_url: string;
  active: boolean;
  createdAt: string | null;
  updatedAt: string;
}

const defaultUserData: UserData = {
  id_user: 0,
  id_pelanggan: 0,
  id_user_asset: null,
  email: '',
  role: '',
  name: '',
  phone: '',
  photo_url: '',
  active: false,
  createdAt: null,
  updatedAt: '',
};

export {UserData, defaultUserData};
