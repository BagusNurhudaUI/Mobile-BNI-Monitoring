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
import {useNavigation} from '@react-navigation/native';
import ReportDokumentasi from '../components/ReportDokumentasi';

interface AtmItem {
  id_asset: number | string;
  // Add other properties if needed
}

export default function UploadLaporan({navigation, route}: any) {
  const [jenisDokumentasi, setJenisDokumentasi] = useState([]);
  const [urlSaved, setUrlSaved] = useState({});
  const [image, setImage] = useState({});
  const [atm, setAtm] = useState<AtmItem | undefined>();
  const [kunjungan, setKunjungan] = useState(null);
  const [isTemuan, setIsTemuan] = useState(true);
  console.log('UPLOAD LAPORAN ROUTE', route.params);

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
      const hasil = await assetRepo.validateAsset(route.params.asset.id_asset);
      if (hasil.status === 200) {
        setKunjungan(hasil.data.kunjungan);
      } else {
      }
      console.log('hasil ', hasil.data);
    } catch (err) {
      console.log('error', err.message);
    }
  };

  useEffect(() => {
    if (route.params.screen === 'GpsValidation') {
      console.log('FROM GPS');
      console.log(route?.params?.params);
      // setAtm(JSON.parse(route?.params?.params));
    } else {
      console.log('FROM CAMERA');
      const url = route?.params?.params.data;
      const id = route?.params?.params.id;
      console.log('url : ' + url + ' id : ' + id);

      setUrlSaved(prevState => ({
        ...prevState,
        [id]: url,
      }));
      console.log({urlSaved});
    }
  }, [route]);

  useEffect(() => {
    getAllJenisDokumentasi();
    getKunjungan();
  }, []);

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
        <Button mode="outlined" onPress={() => {}}>
          Submit
        </Button>
      </Background>
    </ScrollView>
  );
}
