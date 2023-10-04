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

export default function GpsValidation({navigation, route}: any) {
  console.log('ROUTE IN GPS VALIDATION', route);
  const asset = route.params.asset;
  return (
    <ScrollView>
      <Background>
        <Text> GPS VALIDATION</Text>
        <Logo />
        <Paragraph>{asset.name}</Paragraph>
        <Button
          mode="outlined"
          onPress={() => {
            navigation.navigate('UploadLaporan', {
              asset: asset,
              screen: 'GpsValidation',
            });
          }}>
          Go to Upload Laporan
        </Button>
      </Background>
    </ScrollView>
  );
}
