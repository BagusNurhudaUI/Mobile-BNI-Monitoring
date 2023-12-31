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
  Dimensions,
  KeyboardAvoidingView,
} from 'react-native';
import {launchCamera} from 'react-native-image-picker';
import jenisDokumentasiRepo from '../api/jenisDokumentasiRepo';
import assetRepo from '../api/assetRepo';
import SearchATM from '../components/SearchATM';
import {useRoute} from '@react-navigation/native';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import {useIsFocused, useFocusEffect} from '@react-navigation/native';
import conn from '../helpers/const';
import LoadingView from '../components/LoadingView';
import axios from 'axios';
import {api} from '../api/api';
import AtmListDetail from '../components/AtmListDetail';

export default function AtmList({navigation, route}: any) {
  const [assets, setAssets] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchResult, setSearchResult] = useState('');
  console.log('ROUTE IN HOME', route);
  useFocusEffect(
    React.useCallback(() => {
      getAllATM();
    }, []),
  );

  const getAllATM = async () => {
    console.log('fetch Get All ATM');
    setIsLoading(true);
    try {
      const hasil = await assetRepo.assetUser({
        params: {
          active: true,
        },
      });
      if (hasil.status === 200) {
        setAssets(hasil.data.data);
      } else {
        console.log('something wrong calls on getAllAtm');
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllATM();
  }, []);

  const handleSearch = value => {
    setIsLoading(true);
    setSearchResult(value); // This is the value coming back from SearchATM
    setIsLoading(false);
  };
  return (
    // <KeyboardAvoidingView style={{flex: 1}} keyboardVerticalOffset={330}>
    <View style={{flex: 1}}>
      <SearchATM onSearch={handleSearch} />
      {isLoading ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#FFFFFF',
            width: Dimensions.get('window').width,
          }}>
          <LoadingView />
        </View>
      ) : (
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#FFFFFF',
          }}>
          <ScrollView
            contentContainerStyle={{
              flexGrow: 1,
              padding: 10,
            }}
            style={{
              width: Dimensions.get('window').width,
            }}>
            {/* <Text>Search result: {searchResult}</Text> */}

            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                gap: 5,
              }}>
              {assets
                .filter((asset: any) => {
                  const searchRegex = new RegExp(searchResult, 'i'); // 'i' flag for case-insensitive search
                  return (
                    searchRegex.test(asset.name) || searchRegex.test(asset.kode)
                  );
                })
                .map((asset: any, i) => (
                  <AtmListDetail
                    key={i}
                    style={{
                      // width: 200,
                      justifyContent: 'center',
                      alignItems: 'center',
                      margin: 5,
                      backgroundColor: conn.COLOR_WHITE_GREY,
                    }}
                    data={asset}
                    onPress={() => {
                      getAllATM();

                      navigation.navigate('GpsValidation', {
                        asset: {
                          id_asset: asset.id_asset,
                          name: asset.name,
                          kode: asset.kode,
                          latitude: asset.latitude,
                          longitude: asset.longitude,
                          id_pelanggan: asset.id_pelanggan,
                          nama_pelanggan: asset.pelanggan.name,
                          alamat: asset.alamat,
                        },
                        screen: 'AtmList',
                      });
                    }}></AtmListDetail>
                ))}
            </View>
          </ScrollView>
        </View>
      )}
    </View>
    // </KeyboardAvoidingView>
  );
}
