import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LaporanPending() {
  const [storage, setStorage] = useState([]);

  useEffect(() => {
    const fetchStorageData = async () => {
      try {
        const allKeys = await AsyncStorage.getAllKeys();
        const allData = await AsyncStorage.multiGet(allKeys);
        if (allData) {
          console.log(allData);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchStorageData();
  }, []);

  return (
    <View>
      <Text>LaporanPending</Text>
      <Text>Storage Data:</Text>
      <Text>{JSON.stringify(storage)}</Text>
    </View>
  );
}
