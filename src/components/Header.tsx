import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';
import {theme} from '../core/theme';

export default function Header(props: any) {
  return (
    <View
      style={{
        height: 60,
        backgroundColor: '#f76617',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Text style={{color: '#fff', fontSize: 20}}>Your Header Template</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 21,
    color: theme.colors.primary,
    fontWeight: 'bold',
    paddingVertical: 12,
  },
});
