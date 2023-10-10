import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import conn from '../helpers/const';
import {TouchableOpacity} from 'react-native-gesture-handler';

export default function AtmListDetail({
  style,
  labelStyle,
  data,
  ...props
}: any) {
  //   console.log({props});

  return (
    <TouchableOpacity {...props}>
      <View
        style={{
          borderColor: 'black',
          borderWidth: 1,
          borderRadius: 8,
        }}>
        <View style={style}>
          <Text>{data.name}</Text>
          <Text>{data.kode}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  text: {
    fontWeight: 'bold',
    fontSize: 15,
    lineHeight: 26,
    color: conn.COLOR_VIOLET,
  },
});
