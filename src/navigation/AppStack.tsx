import {View, Text} from 'react-native';
import React from 'react';
import Profile from '../screen/Profile';
import TabNavigator from './TabNavigator';
import Header from '../components/Header';
// import SplashScreen from '../components/SplashScreen';

// import CustomDrawer from '../components/CustomDrawer';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import {createDrawerNavigator} from '@react-navigation/drawer';
// const Drawer = createDrawerNavigator();

export default function AppStack() {
  console.log('app stack');

  return (
    <View style={{flex: 1}}>
      <Header />
      <View style={{flex: 1}}>
        <TabNavigator />
      </View>
    </View>
    // <SplashScreen />
  );
}
