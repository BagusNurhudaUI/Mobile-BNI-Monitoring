import React from 'react';
import {RouteProp, NavigationProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';
import Paragraph from '../components/Paragraph';

const StartScreen = ({navigation}: any) => {
  console.log('Component rendered!');
  return (
    <Background>
      <Logo />
      <Header>Login Template</Header>
      <Paragraph>
        The easiest way to start with your amazing application.
      </Paragraph>
      <Button
        mode="contained"
        onPress={() => navigation.navigate('LoginScreen')}>
        Login
      </Button>
      {/* <Button
        mode="outlined"
        onPress={() => navigation.navigate('RegisterScreen')}>
        Sign Up
      </Button> */}
    </Background>
  );
};

export default StartScreen;
