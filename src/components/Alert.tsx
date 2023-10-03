import React from 'react';
import {View, StyleSheet, Button, Alert} from 'react-native';

const AlertTwoButton = (title: string, message: string) =>
  Alert.alert(title, message, [
    {
      text: 'Cancel',
      onPress: () => console.log('Cancel Pressed'),
      style: 'cancel',
    },
    {text: 'OK', onPress: () => console.log('OK Pressed')},
  ]);

export default AlertTwoButton;
