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
import {
  getAuthToken,
  removeAuthToken,
  removeUserInfo,
  saveAuthToken,
  saveUserInfo,
} from '../api/authRepo';
import AlertTwoButton from '../components/Alert';

interface AuthContextProps {
  authState?: {token: string | null; authenticated: boolean | null};
  onLogin?: (email: string, password: string) => Promise<any>;
  onLogout?: () => Promise<any>;
  isLoading?: boolean;
}

const AuthContext = createContext<AuthContextProps>({});

export const useAuth = () => {
  return useContext(AuthContext);
};

export default function AuthProvider({children}: any) {
  const [isLoading, setIsLoading] = useState(false);
  const [authState, setAuthState] = useState<{
    token: string | null;
    authenticated: boolean | null;
  }>({
    token: null,
    authenticated: null,
  });

  useEffect(() => {
    const loadToken = async () => {
      const token = await getAuthToken();

      if (token) {
        setAuthState({
          token: token,
          authenticated: true,
        });
      }
    };
    setIsLoading(true);
    loadToken();
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const hasil = await userRepo.loginUser({
        email: email,
        password: password,
      });
      if (hasil.status === 200) {
        setAuthState({
          token: hasil.data.token,
          authenticated: true,
        });

        await saveAuthToken(hasil.data.token);
        await saveUserInfo(JSON.stringify(hasil.data.user));
      }
      setIsLoading(false);
      return hasil;
    } catch (err) {
      setIsLoading(false);
      return {
        error: true,
        message: err.message,
      };
    }
  };

  const logout = async () => {
    setIsLoading(true);
    await removeAuthToken();
    await removeUserInfo();

    setAuthState({
      token: null,
      authenticated: false,
    });
    setIsLoading(false);
  };

  const value = {
    onLogin: login,
    onLogout: logout,
    authState,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
