import React, {useState, useEffect} from 'react';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Paragraph from '../components/Paragraph';
import Button from '../components/Button';
import {
  PermissionsAndroid,
  Image,
  View,
  Text,
  ScrollView,
  BackHandler,
} from 'react-native';
import {launchCamera} from 'react-native-image-picker';
import jenisDokumentasiRepo from '../api/jenisDokumentasiRepo';
import assetRepo from '../api/assetRepo';
import SearchATM from '../components/SearchATM';
import {useRoute} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';
import ReportDokumentasi from '../components/ReportDokumentasi';
import {AlertOneButton} from '../components/Alert';
import laporanRepo from '../api/laporanRepo';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AtmItem {
  id_asset: number | string;
  // Add other properties if needed
}

export default function UploadLaporan({navigation, route}: any) {
  const [jenisDokumentasi, setJenisDokumentasi] = useState([]);
  const [urlSaved, setUrlSaved] = useState({});
  const [dataUpload, setDataUpload] = useState([]);
  const [image, setImage] = useState({});
  const [atm, setAtm] = useState<AtmItem | undefined>();
  const [kunjungan, setKunjungan] = useState(null);
  const [isTemuan, setIsTemuan] = useState(true);
  const [idAsset, setIdAsset] = useState('');
  // console.log('UPLOAD LAPORAN ROUTE', route.params);

  const getAllJenisDokumentasi = async () => {
    console.log('run jenis dokum');
    try {
      const hasil = await jenisDokumentasiRepo.getJenisDokumentasi({
        params: {
          active: true,
        },
      });
      setJenisDokumentasi(hasil.data.data);
    } catch (err) {
    } finally {
    }
  };

  const getKunjungan = async () => {
    console.log('run validate asset');
    try {
      setIdAsset(route.params.asset.id_asset);
      const hasil = await assetRepo.validateAsset(route.params.asset.id_asset);
      if (hasil.status === 200) {
        setKunjungan(hasil.data.kunjungan);
      } else {
        AlertOneButton(
          'Gagal',
          hasil.response.data.message,
          () => {
            navigation.navigate('ATM');
          },
          'Kembali ke halaman utama',
        );
      }
    } catch (err) {
      console.log('error', err);
    }
  };

  useEffect(() => {
    if (route.params.screen === 'Camera') {
      console.log('FROM CAMERA');
      const url = route?.params?.params.uri;
      const id = route?.params?.params.id;
      const data = route?.params?.params.data;
      console.log('url : ' + url + ' id : ' + id, 'data : ');

      setUrlSaved(prevState => ({
        ...prevState,
        [id]: url,
      }));

      setDataUpload(prevUploadedFiles => ({
        ...prevUploadedFiles,
        ...data,
      }));

      console.log(String(isTemuan));
    }
  }, [route]);

  useEffect(() => {
    getAllJenisDokumentasi();
    getKunjungan();
  }, []);

  const backAction = () => {
    navigation.goBack();
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', backAction);
    };
  }, []);

  const UploadLaporan = async () => {
    try {
      const formData = new FormData();
      for (const key in dataUpload) {
        if (dataUpload.hasOwnProperty(key)) {
          const fileData = dataUpload[key];
          console.log('key: ' + key);
          console.log('data: ' + fileData);

          formData.append(key, fileData);
        }
      }
      formData.append('id_asset', idAsset);
      formData.append('is_temuan', String(isTemuan));

      console.log({formData});

      const hasil = await laporanRepo.addReport(formData);
      if (hasil.status === 200) {
        console.log('Upload Success', hasil.data);
        AlertOneButton(
          'Berhasil',
          `Laporan ATM ${hasil.data.asset_name} - ${hasil.data.asset_kode} berhasil dikirim`,
          () => {
            navigation.navigate('ATM');
          },
          'Mengerti',
        );
      } else {
        console.log('RESPONSE', hasil.response.data);
        const currentDate = new Date();
        const formattedDate = `${currentDate.getFullYear()}-${
          currentDate.getMonth() + 1
        }-${currentDate.getDate()}`;
        const key = `${idAsset}-${formattedDate}`;
        const value = JSON.stringify(formData);

        await AsyncStorage.setItem(`upload_laporan:${key}`, value);
        AlertOneButton('Gagal', `${hasil.response.data.message}`);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ScrollView>
      <Background>
        <Text> KUJUNGAN KE : {kunjungan}</Text>
        <Text> {JSON.stringify(atm)}</Text>
        {jenisDokumentasi.map((jd: any, i) => {
          const id = jd.id_jenis_dokumentasi;
          const imageURL = urlSaved[id]; // Access URL based on the id

          return (
            <ReportDokumentasi
              key={i}
              value={{data: JSON.stringify(jd), image: imageURL || ''}}
              navigation={navigation}
            />
          );
        })}
        <Text> Temuan </Text>
        {/* Buttons to identify temuan */}
        <Button
          mode={isTemuan ? 'contained' : 'outlined'}
          onPress={() => setIsTemuan(true)}
          style={{marginVertical: 10}}>
          Yes
        </Button>
        <Button
          mode={isTemuan ? 'outlined' : 'contained'}
          onPress={() => setIsTemuan(false)}
          style={{marginBottom: 10}}>
          No
        </Button>
        {isTemuan && (
          <View>
            <Text>Temuan 1</Text>
            <Text>Temuan 1</Text>
          </View>
        )}
        <Button
          mode="outlined"
          onPress={() => {
            UploadLaporan();
          }}>
          Submit
        </Button>
      </Background>
    </ScrollView>
  );
}
