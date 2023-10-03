import {View, Text} from 'react-native';
import React from 'react';
import {ActivityIndicator} from 'react-native-paper';
import {StyleSheet} from 'react-native';

export default function LoadingView() {
  return (
    <View
      style={{
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.3)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1,
      }}>
      <ActivityIndicator animating={true} size="large" color="rgb(60,64,67)" />
    </View>
  );
}
