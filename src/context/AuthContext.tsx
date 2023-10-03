import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {api} from '../api/api';
import userRepo from '../api/userRepo';
import {getAuthToken, removeAuthToken, saveAuthToken} from '../api/authRepo';
import AlertTwoButton from '../components/Alert';

interface AuthContextProps {
  login: (email, password) => void;
  logout: () => void;
  isLoading: boolean;
  userToken: string | null;
}

export const AuthContext = createContext<AuthContextProps>({
  login: (email, password) => {},
  logout: () => {},
  isLoading: false,
  userToken: '',
});

const AuthProvider: React.FC<{children: ReactNode}> = ({
  children,
  navigation,
}: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userToken, setUserToken] = useState<string | null>('');

  const login = async (email, password) => {
    setIsLoading(true);
    console.log(
      `masuk login function with email: ${email.value} and password: ${password.value}`,
    );
    await userRepo
      .loginUser({
        email: email.value,
        password: password.value,
      })
      .then(async user => {
        console.log(JSON.stringify(user.data));
        if (user.status === 200) {
          setUserToken('shakbjhawbda');
          await saveAuthToken('shakbjhawbda');
          //   AlertTwoButton('Berhasil', user?.data?.message);
        } else {
          AlertTwoButton('Gagal Login', user?.data?.message || 'Network Error');
          //   navigation.reset({
          //     index: 0,
          //     routes: [{name: 'Login'}],
          //   });
        }
      })
      .catch(error => {})
      .finally(async () => {
        console.log(await getAuthToken());
      });

    setIsLoading(false);
  };

  const logout = async () => {
    console.log('logout in auth contect');
    setIsLoading(true);
    setUserToken('');
    await removeAuthToken();
    setIsLoading(false);
  };

  const isLoggedIn = async () => {
    try {
      setIsLoading(true);
      let userToken = await getAuthToken();
      // console.log('user token di isLogged in', userToken);

      setUserToken(userToken);
      setIsLoading(false);
    } catch (err) {
      console.log('isLoggedIn error: ' + err);
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider value={{login, logout, isLoading, userToken}}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
