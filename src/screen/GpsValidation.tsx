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
  BackHandler,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import assetRepo from '../api/assetRepo';
import Geolocation from '@react-native-community/geolocation';
import AlertTwoButton from '../components/Alert';
import {AssetModel, defaultAsset} from '../models/assetModel';
import conn from '../helpers/const';
import {WebView} from 'react-native-webview';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const RANGE = 0.2; // range is in KM

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

export default function GpsValidation({navigation, route}: any) {
  const [position, setPosition] = useState<{
    latitude: string | null;
    longitude: string | null;
  }>({
    latitude: null,
    longitude: null,
  });
  const [asset, setAsset] = useState<AssetModel>(defaultAsset);
  const [inRange, setInRange] = useState(false);
  const [gpsActive, setGpsActive] = useState(true);
  const [mylocation, setMyLocation] = useState(false);
  const getCurrentPosition = () => {
    // console.log('getcurrentPosition');
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
      setGpsActive(hasil.data.data.gps_active);
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
        RANGE,
      );
      // console.log(' fetch radius: ' + hasil);
      // console.log('is gps active: ' + gpsActive);
    }, 1000);

    return () => clearInterval(interval);
  });

  useEffect(() => {
    const onBackPress = () => {
      const data = {message: 'Hello from Screen A!'};
      navigation.navigate('ATM', {
        screen: 'GPS',
      }); // Navigate to Screen B with data
      return true;
    };

    BackHandler.addEventListener('hardwareBackPress', onBackPress);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    };
  }, [navigation]);

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
    // console.log('Jarak', distance);
    const hasil = distance <= radius;
    setInRange(hasil);
    return hasil;
  }

  const checkCanUpload = () => {
    console.log(asset.gps_active);

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
        16
      );
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);

      var marker2 = L.marker([${position?.latitude}, ${
    position?.longitude
  }]).addTo(map);
      // marker2.bindPopup("<b>Marker 2</b><br>This is the second marker.").openPopup();

      // Create a circle with a radius of 100 meters (adjust as needed)
        L.circle([${asset.latitude}, ${asset.longitude}], {
          color: 'blue',
          fillColor: 'blue',
          fillOpacity: 0.2,
          radius: 200
        }).addTo(map);

        // Create a custom icon for the GPS marker
        var gpsIcon = L.icon({
          iconUrl: 'path_to_gps_icon.png', // Replace with the path to your GPS icon
          iconSize: [32, 32],
          iconAnchor: [16, 32]
        });

      var marker1 = L.marker([${asset.latitude}, ${
    asset.longitude
  }]).addTo(map);
      // marker1.bindPopup("<b>Marker 1</b><br>This is the first marker.").openPopup();


      </script>
    </body>
    </html>
  `;
  return (
    <SafeAreaView style={{flex: 1}}>
      {/* <Paragraph>{asset.name}</Paragraph> */}
      <WebView
        source={{
          // uri: 'https://webgme.bagusnurhuda.site/emrv2/5c402d61a88a5bbac2162a9256249f',
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
                : conn.COLOR_GREY,
          }}
          labelStyle={{
            fontWeight: 'bold',
            fontSize: 15,
            lineHeight: 26,
            color:
              gpsActive === false || inRange
                ? conn.COLOR_GREY
                : conn.COLOR_VIOLET,
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
        }}>
        <TouchableOpacity
          onPress={() => {
            setMyLocation(true);
          }}
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: conn.COLOR_GREY,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <MaterialCommunityIcons
            name="crosshairs-gps"
            size={21}
            color={conn.COLOR_ORANGE}
            style={{marginRight: 5}}
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
