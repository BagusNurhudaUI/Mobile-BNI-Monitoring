import React, {useState, useEffect} from 'react';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Paragraph from '../components/Paragraph';
import Button from '../components/Button';
import {PermissionsAndroid, Image, View, Text, ScrollView} from 'react-native';
import {launchCamera} from 'react-native-image-picker';
import jenisDokumentasiRepo from '../api/jenisDokumentasiRepo';

export default function Laporan() {
  const [cameraPhoto, setCameraPhoto] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [jenisdokumentasi, setJenisdokumentasi] = useState([]);
  let options = {
    saveToPhotos: false,
    cameraTyoe: 'back',
    mediaType: 'photo',
    quality: 0.1,
  };

  const addItem = item => {
    setCameraPhoto(prevPhotos => [...prevPhotos, item]);
  };

  console.log('addItem result: ' + JSON.stringify(cameraPhoto));

  const openCamera = async (id: any, index) => {
    console.log('openCamera');

    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
    );
    console.log('Is granted', granted);

    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      const result = await launchCamera(options);
      addItem(result);
      // in jenis dokumentasi array index = index, with add object id_dokum = id, url= result.assets[0].originalPath
    }
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
  const openGalerry = () => {};
  return (
    <ScrollView>
      <Background>
        <Logo />
        <Paragraph>ATM LIST</Paragraph>

        {/* {cameraPhoto && (
          <View>
            <Image
              source={{uri: cameraPhoto}}
              style={{height: 200, width: 200}}
            />
          </View>
        )} */}
        {/* <Text> {cameraPhoto} </Text> */}
        <View>
          {cameraPhoto.map((photo, index) => (
            <Image
              key={index}
              source={{uri: photo.assets[0].uri}}
              style={{height: 200, width: 200}}
            />
          ))}
        </View>
        <View>
          {jenisdokumentasi.map((jd, index) => (
            <View>
              <Text>{JSON.stringify(jd)}</Text>
              <Button
                mode="outlined"
                onPress={() => {
                  openCamera(jd.id_jenis_dokumentasi, index);
                }}>
                Open Camera
              </Button>
            </View>
          ))}
        </View>
        <Button
          mode="outlined"
          onPress={() => {
            openGalerry;
          }}>
          Open Galerry
        </Button>
      </Background>
    </ScrollView>
  );
}
