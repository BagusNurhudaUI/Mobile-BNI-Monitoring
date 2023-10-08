import {View, Text} from 'react-native';
import React from 'react';
import Profile from '../screen/Profile';
import TabNavigator from './TabNavigator';
import Header from '../components/Header';
import {createStackNavigator} from '@react-navigation/stack';
import Camera from '../screen/Camera';
import GpsValidation from '../screen/GpsValidation';
import UploadLaporan from '../screen/UploadLaporan';
import LaporanResultDetail from '../screen/LaporanResultDetail';
const Stack = createStackNavigator();

export default function AppStack() {
  console.log('app stack');

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={TabNavigator}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="GpsValidation"
        component={GpsValidation}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="UploadLaporan"
        component={UploadLaporan}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Camera"
        component={Camera}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="LaporanResultDetail"
        component={LaporanResultDetail}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}
