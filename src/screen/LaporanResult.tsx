import React, {useState, useEffect} from 'react';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Paragraph from '../components/Paragraph';
import Button from '../components/Button';
import {PermissionsAndroid, Image, View, Text, ScrollView} from 'react-native';
import {launchCamera} from 'react-native-image-picker';
import jenisDokumentasiRepo from '../api/jenisDokumentasiRepo';
import {RNCamera} from 'react-native-camera';
import {useCamera} from 'react-native-camera-hooks';

export default function LaporanResult(navigation: any) {
  const [cameraPhoto, setCameraPhoto] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [jenisdokumentasi, setJenisdokumentasi] = useState([]);

  const [{cameraRef}, {takePicture}] = useCamera(undefined);

  const openCamera = () => {
    console.log('openCamera result: ');
  };

  const getJenisDokumentasi = async () => {
    const hasil = await jenisDokumentasiRepo.getJenisDokumentasi({
      params: {
        active: true,
      },
    });
    console.log(hasil.data.data);
    setJenisdokumentasi(hasil.data.data);
  };

  useEffect(() => {
    getJenisDokumentasi();
  }, []);
  return (
    <ScrollView>
      <Background>
        <Logo />
        <Paragraph>REACT NATIVE CAMERA</Paragraph>

        <Button
          mode="outlined"
          onPress={() => {
            openCamera();
            navigation.navigate('Camera');
          }}>
          Open Camera
        </Button>
      </Background>
    </ScrollView>
  );
}
