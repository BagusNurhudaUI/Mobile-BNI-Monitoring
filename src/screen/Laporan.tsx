import React from 'react';
import {SafeAreaView} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import LaporanResult from './LaporanResult';
import LaporanPending from './LaporanPending';
import conn from '../helpers/const';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const TabLaporan = createMaterialTopTabNavigator();

export default function Laporan() {
  return (
    <SafeAreaView style={{flex: 1}}>
      <TabLaporan.Navigator
        initialRouteName="LaporanResult"
        screenOptions={({route}) => ({
          headerShown: false,
          tabBarShowLabel: true,
          tabBarStyle: {},
          tabBarInactiveTintColor: conn.COLOR_GREY,
          tabBarActiveTintColor: conn.COLOR_ORANGE,
        })}>
        <TabLaporan.Screen
          name="LaporanResult"
          component={LaporanResult}
          options={({navigation, route}) => {
            return {
              title: 'Terkirim',
            };
          }}
        />
        <TabLaporan.Screen
          name="LaporanPending"
          component={LaporanPending}
          options={({navigation, route}) => {
            return {
              title: 'Belum Terkirim',
            };
          }}
        />
      </TabLaporan.Navigator>
    </SafeAreaView>
  );
}
