import React, {useState, useEffect} from 'react';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Paragraph from '../components/Paragraph';
import Button from '../components/Button';
import {PermissionsAndroid, Image, View, Text, ScrollView} from 'react-native';
import {launchCamera} from 'react-native-image-picker';
import jenisDokumentasiRepo from '../api/jenisDokumentasiRepo';
import assetRepo from '../api/assetRepo';
import SearchATM from '../components/SearchATM';
import {useRoute} from '@react-navigation/native';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import {useIsFocused, useFocusEffect} from '@react-navigation/native';

export default function AtmList({navigation, route}: any) {
  const [atm, setAtm] = useState([]);
  console.log('ROUTE IN ATM', route);

  useFocusEffect(
    React.useCallback(() => {
      // This function will be called when the screen gains focus
      getAllATM();
    }, []),
  );

  const getAllATM = async () => {
    console.log('rendered');
    try {
      const hasil = await assetRepo.assetUser({
        params: {
          active: true,
        },
      });
      setAtm(hasil.data.data);
    } catch (err) {
    } finally {
    }
  };

  useEffect(() => {
    getAllATM();
  }, []);

  return (
    <ScrollView>
      <SearchATM></SearchATM>
      <Background>
        <Logo />
        <Paragraph>ATM LIST</Paragraph>
        {atm.map((atm: any, i) => (
          <Button
            key={i}
            mode="outlined"
            onPress={() => {
              getAllATM();

              navigation.navigate('GpsValidation', {
                asset: {
                  id_asset: atm.id_asset,
                  name: atm.name,
                  kode: atm.kode,
                  id_pelanggan: atm.id_pelanggan,
                  nama_pelanggan: atm.pelanggan.name,
                  alamat: atm.alamat,
                },
                screen: 'AtmList',
              });
            }}>
            {atm.name}
          </Button>
        ))}
      </Background>
    </ScrollView>
  );
}
