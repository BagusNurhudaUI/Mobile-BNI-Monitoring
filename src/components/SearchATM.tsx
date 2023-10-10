import {View, Text} from 'react-native';
import React, {useState} from 'react';
import TextInput from './TextInput';
import InputField from './InputField';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import conn from '../helpers/const';
import {TouchableOpacity} from 'react-native-gesture-handler';

export default function SearchATM({onSearch}: any) {
  const handleSearch = (text: any) => {
    onSearch(text);
  };
  return (
    <View
      style={{
        flex: 0.2,
        justifyContent: 'flex-start',
        backgroundColor: conn.COLOR_GREY,
        paddingHorizontal: 10,
      }}>
      <Text
        style={{
          fontSize: 18,
          fontWeight: 'bold',
          marginTop: 30,
        }}>
        Masukkan nama ATM{' '}
      </Text>

      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
        }}>
        <MaterialCommunityIcons
          name="onepassword"
          size={20}
          color="#666"
          style={{marginRight: 5, marginStart: 50}}
        />
        <TextInput
          placeholder="Masukkan nama atm atau id atm"
          style={{width: '80%', height: 40, flex: 1}}
          blurOnSubmit={false}
          onChangeText={(text: any) => {
            handleSearch(text);
          }}
        />
        <TouchableOpacity
          onPress={() => {
            // fieldButtonFunction();
            // ChangeEyePasswords();
          }}>
          <View>
            <MaterialCommunityIcons
              name="onepassword"
              size={20}
              color="#666"
              style={{marginEnd: 50}}
            />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}
