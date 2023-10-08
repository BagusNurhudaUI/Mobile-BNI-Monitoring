import React from 'react';
import {View, StyleSheet, Button, Alert} from 'react-native';

export const AlertTwoButton = (
  title: string,
  message: string,
  onOkPress?: () => void,
  onCancelPress?: () => void,
  textCancel?: string,
  textOK?: string,
) =>
  Alert.alert(title, message, [
    {
      text: textCancel ? textCancel : 'Cancel',
      onPress: () => {
        console.log('Cancel Pressed');
        if (onCancelPress) {
          onCancelPress();
        }
      },
      style: 'cancel',
    },
    {
      text: textOK ? textOK : 'OK',
      onPress: () => {
        console.log('OK Pressed');
        if (onOkPress) {
          onOkPress();
        }
      },
    },
  ]);

export const AlertOneButton = (
  title: string,
  message: string,
  onOkPress?: () => void,
  textOK?: string,
) =>
  Alert.alert(title, message, [
    {
      text: textOK ? textOK : 'OK',
      onPress: () => {
        console.log('OK Pressed');
        if (onOkPress) {
          onOkPress();
        }
      },
    },
  ]);
