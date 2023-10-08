import React, {useContext, useEffect, useState} from 'react';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Paragraph from '../components/Paragraph';
import Button from '../components/Button';
import {getAuthToken, removeAuthToken, getUserInfo} from '../api/authRepo';
import {View, Text} from 'react-native';
import {useAuth} from '../context/AuthContext';
import userRepo from '../api/userRepo';
import {useNavigation} from '@react-navigation/native';
import {UserData, defaultUserData} from '../models/userModel';

export default function Profile({navigation}: any) {
  const {onLogout} = useAuth();
  const [user, setUser] = useState<UserData>(defaultUserData);

  const Logout = async () => {
    console.log('Keluar');
    // await removeAuthToken();
    await onLogout!();
    // navigation.reset({
    //   index: 0,
    //   routes: [{name: 'Login'}],
    // });
  };

  useEffect(() => {
    const fetchUserInfo = async () => {
      console.log('first render user');
      const user = await getUserInfo();
      console.log('user: ' + user);
      if (user) {
        setUser(JSON.parse(user));
      }
    };

    fetchUserInfo();
  }, []);

  const getInfoUser = async () => {
    console.log('getInfoUser');
    console.log();
    const hasil = await userRepo.getUserById(user.id_user);
    console.log(JSON.stringify(hasil.data.data.name));
    setUser(hasil.data.data);
  };
  return (
    <Background>
      <Logo />
      <Paragraph>Profile</Paragraph>
      <View>
        <Text>Nama : {user.name}</Text>
      </View>
      <Button
        mode="outlined"
        onPress={() => {
          getInfoUser();
        }}>
        GetInfo
      </Button>
      <Button
        mode="outlined"
        onPress={() => {
          Logout();
        }}>
        Logout
      </Button>
    </Background>
  );
}
