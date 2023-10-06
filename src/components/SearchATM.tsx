import {View, Text} from 'react-native';
import React, {useState} from 'react';
import TextInput from './TextInput';
import InputField from './InputField';

export default function SearchATM({onSearch}: any) {
  const handleSearch = (text: any) => {
    onSearch(text); // Call the callback function with the searchValue
  };
  return (
    <View
      style={{
        flex: 0.2,
        alignItems: 'center',
        justifyContent: 'center',

        backgroundColor: '#FFFF',
      }}>
      <Text>Cari ATM</Text>
      <TextInput
        placeholder="Search..."
        onChangeText={(text: any) => {
          handleSearch(text);
        }}
      />
    </View>
  );
}
