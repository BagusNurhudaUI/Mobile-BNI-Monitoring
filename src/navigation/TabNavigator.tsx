import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';

import HomeScreen from '../screen/Profile';
import Laporan from '../screen/Laporan';

import Ionicons from 'react-native-vector-icons/Ionicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Feather from 'react-native-vector-icons/Feather';
import AtmList from '../screen/AtmList';
import LaporanResult from '../screen/LaporanResult';
import Camera from '../screen/Camera';
import GpsValidation from '../screen/GpsValidation';
import UploadLaporan from '../screen/UploadLaporan';
import {
  ScrollView,
  View,
  Text,
  Dimensions,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import Header from '../components/Header';
import {StatusBar} from 'react-native';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const UploadStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={AtmList}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

const TabNavigator = () => {
  return (
    <View style={{flex: 1}}>
      <StatusBar backgroundColor="#f76617" />
      <Header></Header>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: true,
          tabBarStyle: {
            backgroundColor: '#f76617',
          },
          tabBarInactiveTintColor: '#fff',
          tabBarActiveTintColor: 'yellow',
          // tabBarStyle:{display: none}
        }}>
        <Tab.Screen
          name="ATM"
          component={AtmList}
          options={({navigation, route}) => {
            console.log('ROUTE IN NAV', route); // Log the route object

            return {
              title: 'Home',
              tabBarIcon: ({color = 'blue', size}) => (
                <Ionicons name="home-outline" color={color} size={size} />
              ),
            };
          }}
        />
        <Tab.Screen
          name="Cart"
          component={Laporan}
          options={({navigation, route}) => {
            console.log('ROUTE IN NAV', route); // Log the route object

            return {
              title: 'Laporan',
              tabBarIcon: ({color = 'blue', size}) => (
                <Feather name="shopping-bag" color={color} size={size} />
              ),
            };
          }}
        />
        <Tab.Screen
          name="Report"
          component={Laporan}
          options={{
            tabBarIcon: ({color, size}) => (
              <Ionicons name="heart-outline" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={HomeScreen}
          options={{
            tabBarIcon: ({color, size}) => (
              <SimpleLineIcons name="user" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </View>
  );
};

export default TabNavigator;
