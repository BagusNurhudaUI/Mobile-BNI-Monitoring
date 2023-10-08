import {View, Text, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import laporanRepo from '../api/laporanRepo';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {LaporanDetailModel} from '../models/laporanModel';

const Result = ({navigation}) => {
  const [laporans, setLaporans] = useState([]);

  const fetchLaporan = async () => {
    console.log('running fetchLaporan');
    try {
      const hasil = await laporanRepo.getReports({});
      if (hasil.status === 200) {
        setLaporans(hasil.data.data);
      } else {
        console.log('error fetchLaporan');
      }
    } catch (err) {
      console.log('error on fetchLaporan', err);
    }
  };

  const handleButtonClick = id => {
    console.log('buttonClick to report details...');

    try {
      navigation.navigate('LaporanResultDetail', {id: id});
    } catch (err) {}
  };

  useEffect(() => {
    fetchLaporan();
  }, []);
  return (
    <View>
      <Text>LaporanResult</Text>
      {laporans.map((laporan: LaporanDetailModel, i) => (
        <TouchableOpacity
          key={i}
          onPress={() => handleButtonClick(laporan.id_laporan)}>
          <Text>{laporan.asset_name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const StackLaporanResult = createNativeStackNavigator();

export default function LaporanResult() {
  console.log('app stack');

  return (
    <StackLaporanResult.Navigator>
      <StackLaporanResult.Screen
        name="LaporanResultPage"
        component={Result}
        options={{headerShown: false}}
      />
    </StackLaporanResult.Navigator>
  );
}
