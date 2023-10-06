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
  StyleSheet,
  Alert,
} from 'react-native';
import assetRepo from '../api/assetRepo';
import Geolocation from '@react-native-community/geolocation';
import AlertTwoButton from '../components/Alert';

export default function GpsValidation({navigation, route}: any) {
  const [position, setPosition] = useState<{
    latitude: string | null;
    longitude: string | null;
  }>({
    latitude: null,
    longitude: null,
  });
  const [asset, setAsset] = useState<{
    latitude: string | null;
    longitude: string | null;
    name: string | null;
  }>({
    latitude: null,
    longitude: null,
    name: null,
  });
  const [inRange, setInRange] = useState(false);
  // console.log('ROUTE IN GPS VALIDATION', route);
  const getCurrentPosition = () => {
    console.log('getcurrentPosition');

    Geolocation.getCurrentPosition(
      (pos: any) => {
        setPosition(pos.coords);
      },
      error => console.log(error),
      {enableHighAccuracy: true},
    );
  };

  const getAtmById = async () => {
    console.log('getAtmById');
    try {
      const hasil = await assetRepo.getAssetById(route.params.asset.id_asset);
      setAsset(hasil.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCurrentPosition();
    getAtmById();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      getCurrentPosition();
      const hasil = isWithinRadius(
        asset.latitude,
        asset.longitude,
        position?.latitude,
        position?.longitude,
        9,
      );
      console.log(' fetch radius: ' + hasil);
    }, 2000);

    return () => clearInterval(interval);
  });

  function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in kilometers
    return distance;
  }

  function isWithinRadius(lat1, lon1, lat2, lon2, radius) {
    const distance = calculateDistance(lat1, lon1, lat2, lon2);
    console.log('Jarak', distance);
    const hasil = distance <= radius;
    setInRange(hasil);
    return hasil;
  }

  return (
    <ScrollView>
      <Background>
        <Text> GPS VALIDATION</Text>
        <Logo />
        <Paragraph>{asset.name}</Paragraph>
        <Button
          mode="outlined"
          style={{
            color: 'white',
            backgroundColor:
              asset.gps_active === false || inRange ? 'yellow' : 'black',
          }}
          onPress={() => {
            console.log(asset.gps_active);

            if (inRange) {
              navigation.navigate('UploadLaporan', {
                asset: asset,
                screen: 'GpsValidation',
              });
            } else {
              AlertTwoButton('Gagal', 'Anda tidak berada dalam range');
            }
          }}>
          Go to Upload Laporan
        </Button>
        <Button
          mode="outlined"
          onPress={() => {
            getCurrentPosition();
          }}>
          Get Location
        </Button>
        <Text>Latitude: {position?.latitude}</Text>
        <Text>Longitude: {position?.longitude}</Text>
        <Button
          mode="outlined"
          onPress={() => {
            const hasil = isWithinRadius(
              asset.latitude,
              asset.longitude,
              position?.latitude,
              position?.longitude,
              9,
            );
          }}>
          Get calculate distance
        </Button>
        <Text>Masuk Range ?: {inRange ? 'Ya' : 'Tidak'}</Text>
      </Background>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
    alignSelf: 'stretch',
  },
});
