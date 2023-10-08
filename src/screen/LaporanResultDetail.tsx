import {View, Text, TouchableOpacity, ScrollView, Image} from 'react-native';
import React, {useState, useEffect} from 'react';
import laporanRepo from '../api/laporanRepo';
import {LaporanDetailModel, defaultLaporanDetail} from '../models/laporanModel';

export default function LaporanResultDetail({navigation, route}) {
  const [laporan, setLaporan] =
    useState<LaporanDetailModel>(defaultLaporanDetail);
  const id = route.params.id;
  console.log('ROUTE ON LAPORAN RESULT DETAIL', id);

  const fetchLaporan = async () => {
    console.log('running fetchLaporan');
    try {
      const hasil = await laporanRepo.getReportById(id);
      if (hasil.status === 200) {
        console.log(hasil.data.data);
        setLaporan(hasil.data.data);
      } else {
        console.log('error fetchLaporan');
      }
    } catch (err) {
      console.log('error on fetchLaporan', err);
    }
  };

  useEffect(() => {
    fetchLaporan();
  }, []);
  return (
    <View>
      <ScrollView>
        <Text>LaporanResult DETAIL on main screen</Text>
        {Object.keys(laporan).map(
          (key, index) =>
            key !== 'dokumentasis' &&
            key !== 'temuan' && (
              <Text key={index}>
                {key}: {JSON.stringify(laporan[key])}
              </Text>
            ),
        )}

        {laporan.dokumentasis.map((dokumentasi, index) => (
          <View key={index}>
            <Text>{dokumentasi.nama_jenis_dokumentasi_snapshot}</Text>
            <Image
              source={{uri: dokumentasi.dokumentasi_url}}
              style={{width: 100, height: 100}}
            />
          </View>
        ))}

        <View>
          <Text>{laporan?.temuan?.keterangan}</Text>

          {laporan?.temuan?.temuan1_url && (
            <View>
              <Text>Temuan 1</Text>
              <Image
                source={{uri: laporan?.temuan?.temuan1_url}}
                style={{width: 100, height: 100}}
              />
            </View>
          )}

          {laporan?.temuan?.temuan2_url && (
            <View>
              <Text>Temuan 2</Text>
              <Image
                source={{uri: laporan?.temuan?.temuan2_url}}
                style={{width: 100, height: 100}}
              />
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
