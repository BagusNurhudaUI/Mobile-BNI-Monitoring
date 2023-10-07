import React, {useContext, useEffect, useMemo, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';

import AuthStack from './AuthStack';
import AppStack from './AppStack';
import {useAuth} from '../context/AuthContext';
import LoadingView from '../components/LoadingView';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {getAuthToken} from '../api/authRepo';
import SplashScreen from 'react-native-splash-screen';
const RootStack = createNativeStackNavigator();

export default function AppNav() {
  const {authState} = useAuth();
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log('Auth State in AppNav: ', authState);
    const getToken = async () => {
      setLoading(true);
      console.log('di hit setiap login');
      const token = await getAuthToken();
      setToken(token);
      console.log('get token: ', token);
      setLoading(false);
      // Do something with the token here
    };

    getToken();
  }, [authState]);

  return (
    <NavigationContainer>
      {loading ? (
        <RootStack.Navigator screenOptions={{headerShown: false}}>
          <RootStack.Screen name="Loading" component={LoadingView} />
        </RootStack.Navigator>
      ) : token && token !== '' ? (
        <AppStack />
      ) : (
        <AuthStack />
      )}
    </NavigationContainer>
  );
}
