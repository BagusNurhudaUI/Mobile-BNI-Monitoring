export function emailValidator(email: any) {
  const re = /\S+@\S+\.\S+/;
  if (!email) return 'Email tidak boleh kosong!.';
  if (!re.test(email)) return 'Ooops! Masukkan email valid!.';
  return '';
}
