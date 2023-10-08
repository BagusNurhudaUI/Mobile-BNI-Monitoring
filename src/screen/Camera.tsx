import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  BackHandler,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {RNCamera} from 'react-native-camera';
import {useCamera} from 'react-native-camera-hooks';
import Button from '../components/Button';
import RNFS from 'react-native-fs';

// import Marker, {
//   ImageFormat,
//   Position,
//   TextBackgroundType,
// } from 'react-native-image-marker';

let options = {
  quality: 0.09,
  orientation: 'portrait',
  base64: false,
  doNotSave: false,
  exif: true,
  forceUpOrientation: true,
  fixOrientation: true,
};

export default function Camera({route, navigation}: any) {
  const id_doc = route.params.data.id_jenis_dokumentasi;
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
      const data = await takePicture(options);
      setCameraPhoto(data.uri);

      // const optionMarker = {
      //   // background image
      //   backgroundImage: {
      //     src: require('./images/test.jpg'),
      //     scale: 1,
      //   },
      //   watermarkTexts: [
      //     {
      //       text: 'text marker \n multline text',
      //       positionOptions: {
      //         position: Position.topLeft,
      //       },
      //       style: {
      //         color: '#FC0700',
      //         fontSize: 30,
      //         fontName: 'Arial',
      //         shadowStyle: {
      //           dx: 10,
      //           dy: 10,
      //           radius: 10,
      //           color: '#008F6D',
      //         },
      //         textBackgroundStyle: {
      //           padding: '10% 10%',
      //           type: TextBackgroundType.stretchY,
      //           color: '#0FFF00',
      //         },
      //       },
      //     },
      //   ],
      //   scale: 1,
      //   quality: 100,
      //   filename: 'test',
      //   saveFormat: ImageFormat.png,
      //   maxSize: 1000,
      // };
      // Marker.markText(optionMarker);
      // console.log('MARKER ', Marker);

      // Read the file as base64
      const base64Data = await RNFS.readFile(data.uri, 'base64');

      // Create a Blob from the base64 data
      // const blob = new Blob([base64Data], {type: 'image/jpeg'});

      const propertyName = `${id_doc}`;

      const imageName = data.uri.split('/').pop();
      const fileData = {
        [propertyName]: {
          uri: data.uri,
          name: imageName,
          type: 'image/jpeg', // Adjust the MIME type as needed
        },
      };

      // console.log({fileData});

      navigation.navigate('UploadLaporan', {
        params: {uri: data.uri, id: id_doc, data: fileData},
        screen: 'Camera',
      });
    } catch (error) {
      console.log(error);
    }
  };

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
