import {View, Text, Image} from 'react-native';
import React, {useState, useEffect} from 'react';
import Button from './Button';
import {useNavigation} from '@react-navigation/native';

interface ReportDokumentasiProps {
  value: {
    [key: string]: any;
  };
  navigation: any;
}
interface NavigationParams {
  data: any;
}

// import imageDummy from '../../assets/gme-icon1.png';

const ReportDokumentasi: React.FC<ReportDokumentasiProps> = ({
  value,
  navigation,
}: any) => {
  const [image, setImage] = useState(
    'https://storage.googleapis.com/bni-gme/dokumentasi/2023-10/2023-10-04/8cc73c50-62a4-11ee-85ab-910f863bfe1c.jpg',
  );
  // const navigation = useNavigation();
  const data = JSON.parse(value.data) || {};
  useEffect(() => {
    if (value.image && value.image !== '') {
      setImage(value.image);
    }
  }, [value.image]);

  //   console.log('Image Dummy: ' + imageDummy);

  return (
    <View>
      <Text>{data.nama_jenis_dokumentasi}</Text>
      {/* <Text>Image , {value.image}</Text> */}
      <Image
        source={{uri: image}}
        style={{
          width: 200,
          height: 200,
        }}
      />
      <Button
        mode="outlined"
        onPress={() => {
          navigation.navigate('Camera', {data: data});
        }}>
        Open Camera
      </Button>
    </View>
  );
};

export default ReportDokumentasi;
