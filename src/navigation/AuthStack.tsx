import {View, Text} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import OnboardingScreen from '../screen/OnboardingScreen';
import LoginScreen from '../screen/LoginScreen';
import {LoginScreen2} from '../screen';
import AppStack from './AppStack';

const Stack = createNativeStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="Login" component={LoginScreen2} />
      <Stack.Screen name="AppStack" component={AppStack} />
      {/* <Stack.Screen name="Register" component={RegisterScreen} /> */}
      {/* <Stack.Screen name="StartScreen" component={StartScreen} /> */}
      {/* <Stack.Screen name="LoginScreen" component={LoginScreen} /> */}
      {/* <Stack.Screen name="Dashboard" component={Dashboard} /> */}
      {/* <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
        
        <Stack.Screen
          name="ResetPasswordScreen"
          component={ResetPasswordScreen}
        /> */}
    </Stack.Navigator>
  );
}
