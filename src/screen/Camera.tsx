import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {RNCamera} from 'react-native-camera';
import {useCamera} from 'react-native-camera-hooks';
import Button from '../components/Button';
import RNFS from 'react-native-fs';
import {useNavigation} from '@react-navigation/native';

// let options = {
//   quality: 0.5,
//   mirrorImage: false,
// };

export default function Camera({route, navigation}: any) {
  // const navigation = useNavigation();
  // const data = JSON.parse(route.params.data);
  const id_doc = route.params.data.id_jenis_dokumentasi;
  console.log('ROUTE IN CAMERA', route.params.data.id_jenis_dokumentasi);
  const [{cameraRef}, {takePicture}] = useCamera(undefined);
  const [cameraPhoto, setCameraPhoto] = useState('');
  const [flashMode, setFlashMode] = useState(RNCamera.Constants.FlashMode.off);
  const [cameraType, setCameraType] = useState(RNCamera.Constants.Type.back);

  const toggleFlash = () => {
    setFlashMode((prevMode: any) =>
      prevMode === RNCamera.Constants.FlashMode.off
        ? RNCamera.Constants.FlashMode.on
        : RNCamera.Constants.FlashMode.off,
    );
  };

  const toggleCameraType = () => {
    setCameraType((prevType: any) =>
      prevType === RNCamera.Constants.Type.back
        ? RNCamera.Constants.Type.front
        : RNCamera.Constants.Type.back,
    );
  };

  const captureHandle = async () => {
    try {
      const data = await takePicture();
      // console.log(data);
      setCameraPhoto(data.uri);

      navigation.navigate('UploadLaporan', {
        params: {data: data.uri, id: id_doc},
        screen: 'Camera',
      });
      console.log('gagal');
    } catch (error) {
      console.log(error);
    }
  };

  const openFlash = () => {
    console.log('open flash');
  };

  return (
    <View style={styles.body}>
      <RNCamera
        ref={cameraRef}
        flashMode={flashMode}
        type={cameraType}
        captureAudio={false}
        style={styles.preview}>
        <View>
          <Button
            mode="outlined"
            onPress={() => {
              captureHandle();
            }}>
            Open Camera
          </Button>
          <Button
            mode="outlined"
            onPress={() => {
              toggleFlash();
            }}>
            {flashMode === RNCamera.Constants.FlashMode.off
              ? 'Flash Off'
              : 'Flash On'}
          </Button>
          <Button
            mode="outlined"
            onPress={() => {
              toggleCameraType();
            }}>
            {cameraType === RNCamera.Constants.Type.back
              ? 'Switch to Front'
              : 'Switch to Back'}
          </Button>
        </View>
      </RNCamera>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
  },
  preview: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
});
