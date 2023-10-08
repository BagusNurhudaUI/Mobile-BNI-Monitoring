import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  getFocusedRouteNameFromRoute,
  useNavigation,
} from '@react-navigation/native';

import HomeScreen from '../screen/Profile';
import Laporan from '../screen/Laporan';

import Ionicons from 'react-native-vector-icons/Ionicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Feather from 'react-native-vector-icons/Feather';
import AtmList from '../screen/AtmList';
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
import conn from '../helpers/const';
import Emr from '../screen/Emr';

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
  //Screen names
  const homeName = 'Home';
  const detailsName = 'Details';
  const settingsName = 'Settings';

  return (
    <View style={{flex: 1}}>
      <Header></Header>
      <Tab.Navigator
        initialRouteName="Laporan"
        screenOptions={({route}) => ({
          headerShown: false,
          tabBarShowLabel: true,
          tabBarStyle: {
            borderTopColor: 'rgba(0, 0, 0, .4)',
            // backgroundColor: conn.COLOR_GREY,
            height: 60,
            paddingBottom: 10,
            paddingTop: 10,
            position: 'absolute',
          },
          tabBarInactiveTintColor: conn.COLOR_GREY,
          tabBarActiveTintColor: conn.COLOR_ORANGE,
          tabBarIcon: ({focused, color, size}) => {
            let iconName;
            console.log(route.name);

            let rn = route.name;

            if (rn === homeName) {
              iconName = focused ? 'home-outline' : 'home-outline';
            } else if (rn === detailsName) {
              iconName = focused ? 'list' : 'list-outline';
            } else if (rn === settingsName) {
              iconName = focused ? 'settings' : 'settings-outline';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color="blue" />;
          },
        })}>
        <Tab.Screen
          name="ATM"
          component={AtmList}
          options={({navigation, route}) => {
            return {
              title: 'Home',
              tabBarIcon: ({color = 'blue', size}) => (
                <Ionicons name="home-outline" color={color} size={size} />
              ),
            };
          }}
        />
        <Tab.Screen
          name="Laporan"
          component={Laporan}
          options={({navigation, route}) => {
            return {
              title: 'Laporan',
              tabBarIcon: ({color = 'blue', size}) => (
                <Feather name="shopping-bag" color={color} size={size} />
              ),
            };
          }}
        />
        <Tab.Screen
          name="Emr"
          component={Emr}
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
