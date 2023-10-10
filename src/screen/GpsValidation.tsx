import React, {useState, useEffect} from 'react';
import Button from '../components/Button';
import {
  PermissionsAndroid,
  Image,
  View,
  Text,
  ScrollView,
  StyleSheet,
  Alert,
  BackHandler,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import assetRepo from '../api/assetRepo';
import Geolocation from '@react-native-community/geolocation';
import {AssetModel, defaultAsset} from '../models/assetModel';
import conn from '../helpers/const';
import {WebView} from 'react-native-webview';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {AlertOneButton, AlertTwoButton} from '../components/Alert';
import GetLocation from 'react-native-get-location';
import LoadingView from '../components/LoadingView';

const RANGE = 0.2; // range is in KM

export default function GpsValidation({navigation, route}: any) {
  const [position, setPosition] = useState<{
    latitude: number | null;
    longitude: number | null;
  }>({
    latitude: null,
    longitude: null,
  });
  const [asset, setAsset] = useState<AssetModel>(defaultAsset);
  const [inRange, setInRange] = useState(false);
  const [gpsActive, setGpsActive] = useState(true);
  const [mylocation, setMyLocation] = useState(false);
  const [needGPS, setNeedGPS] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const getCurrentPosition = async () => {
    setIsLoading(true);
    return new Promise<any>((resolve, reject) => {
      GetLocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 60000,
      })
        .then((location: any) => {
          setPosition(location);
          console.log('hit in position');
          setIsLoading(false);
          resolve(location);
        })
        .catch((error: any) => {
          setPosition({
            latitude: -6.365035000000001,
            longitude: 106.82972833333334,
          });
          AlertOneButton('GPS Failed', 'GPS tidak dapat menemukan lokasi');
          setIsLoading(false);
          reject(error);
        });
    });
  };

  const getAtmById = async () => {
    setIsLoading(true);
    console.log('getAtmById');
    try {
      const hasil = await assetRepo.getAssetById(route.params.asset.id_asset);
      setAsset(hasil.data.data);
      setGpsActive(hasil.data.data.gps_active);
      console.log('hit in get atmById');
      setIsLoading(false);
      return hasil.data.data;
    } catch (err) {
      setIsLoading(false);
      console.log(err);
      return err;
    }
  };

  useEffect(() => {
    const hit = async () => {
      try {
        const deviceLoc = await getCurrentPosition();
        const assetLoc = await getAtmById();
        // console.log('hit in use effect', {assetLoc, deviceLoc});

        isWithinRadius(
          assetLoc!.latitude,
          assetLoc!.longitude,
          deviceLoc.latitude,
          deviceLoc.longitude,
          RANGE,
        );
      } catch (err) {
        console.log(err);
      }
    };
    hit();
  }, []);

  const updateLocation = () => {
    getCurrentPosition();
    setMyLocation(!mylocation);
  };

  // useEffect(() => {
  //   let interval;

  //   if (!needGPS) {
  //     interval = setInterval(() => {
  //       getCurrentPosition();
  //     }, 1000);
  //   }

  //   return () => clearInterval(interval);
  // });

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
    const hasil = distance <= radius;
    console.log({lat1, lon1, lat2, lon2});
    console.log('HASIL RANGE: ' + distance + 'radius: ' + radius);

    setInRange(hasil);
  }

  const checkCanUpload = () => {
    if (gpsActive === false || inRange) {
      navigation.navigate('UploadLaporan', {
        asset: asset,
        screen: 'GpsValidation',
      });
    } else {
      AlertTwoButton('Gagal', 'Anda tidak berada dalam range');
    }
  };

  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Simple Leaflet Map with Marker</title>
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css" />
      <style>
        body { margin: 0; }
        #map { height: 100vh; }
      </style>
    </head>
    <body>
      <div id="map"></div>

      <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"></script>
      <script>
      var map = L.map('map').setView(
        ${
          !mylocation
            ? `[${asset.latitude}, ${asset.longitude}]`
            : `[${position?.latitude}, ${position?.longitude}]`
        },
        17
      );
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      }).addTo(map);

      var gpsIconUrl = 'https://storage.googleapis.com/bni-gme/2074172.png';
      var gpsIcon = L.icon({
        iconUrl: gpsIconUrl,
        iconSize: [32, 32],
        iconAnchor: [16, 32],
      });
      
      var marker2 = L.marker([${position?.latitude}, ${position?.longitude}], {
        icon: gpsIcon
      }).addTo(map);
      if (${mylocation}) {
        marker2.bindPopup("<b>Posisi Anda!</b>", { offset: [0, -20] }).openPopup();
        }
      

      // Create a circle with a radius of 100 meters (adjust as needed)
        L.circle([${asset.latitude}, ${asset.longitude}], {
          color: 'blue',
          fillColor: 'blue',
          fillOpacity: 0.2,
          radius: 200
        }).addTo(map);

        

      var marker1 = L.marker([${asset.latitude}, ${
    asset.longitude
  }]).addTo(map);
  if (${!mylocation}) {
    marker1.bindPopup("<b>Posisi ATM!</b>").openPopup();
  }
  
      </script>
    </body>
    </html>
  `;
  return (
    <SafeAreaView style={{flex: 1}}>
      {/* {isLoading && <LoadingView />} */}
      <WebView
        source={{
          html,
        }}
      />
      <View
        style={{
          position: 'absolute',
          bottom: 20,
          left: 70,
          zIndex: 1,
          width: 500,
        }}>
        <Button
          mode="outlined"
          style={{
            color: 'white',
            width: '50%',
            backgroundColor:
              gpsActive === false || inRange
                ? conn.COLOR_ORANGE
                : conn.COLOR_WHITE_GREY,
          }}
          labelStyle={{
            fontWeight: 'bold',
            fontSize: 15,
            lineHeight: 26,
            color:
              gpsActive === false || inRange
                ? conn.COLOR_WHITE_GREY
                : conn.COLOR_ORANGE,
          }}
          onPress={() => {
            checkCanUpload();
          }}>
          {gpsActive === false || inRange ? 'ABSEN' : 'BELUM BISA ABSEN'}
        </Button>
      </View>

      <View
        style={{
          position: 'absolute',
          bottom: 36,
          left: 335,
          zIndex: 1,
          width: 40,
          height: 40,
          borderColor: 'black',
          borderWidth: 1,
          borderRadius: 10,
          overflow: 'hidden',
        }}>
        <TouchableOpacity
          onPress={() => {
            updateLocation();
          }}
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: conn.COLOR_WHITE_GREY,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <MaterialCommunityIcons
            name="crosshairs-gps"
            size={21}
            color={conn.COLOR_ORANGE}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
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
