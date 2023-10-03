import {View, Text} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';

import AuthStack from './AuthStack';
import AppStack from './AppStack';
import {AuthContext} from '../context/AuthContext';
import {ActivityIndicator} from 'react-native-paper';
import {getAuthToken} from '../api/authRepo';

export default function AppNav() {
  const {isLoading} = useContext(AuthContext);
  const [userToken, setUserToken] = useState<string | null>('');
  const getUserToken = async () => {
    try {
      const token = await getAuthToken();
      setUserToken(token);
      console.log('userToken inside getUserToken: ' + userToken);
    } catch (err) {}
  };

  useEffect(() => {
    getUserToken();
  }, []);

  console.log('userToken: ' + userToken);
  console.log({isLoading});

  if (isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <View>
          <ActivityIndicator animating={true} size="large" />
        </View>
      </View>
    );
  }

  return (
    <NavigationContainer>
      {userToken !== '' && userToken ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
}
