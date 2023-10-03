import React, {useContext, useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Linking,
} from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {ActivityIndicator} from 'react-native-paper';

// import LoginSVG from '../assets/images/misc/login.svg';
import CustomButton from '../components/CustomButton';
import InputField from '../components/InputField';
import {AuthContext} from '../context/AuthContext';
import {emailValidator} from '../helpers/emailValidator';
import {passwordValidator} from '../helpers/passwordValidator';
import userRepo from '../api/userRepo';
import {
  getAuthToken,
  saveAuthToken,
  saveUserInfo,
  getUserInfo,
} from '../api/authRepo';
import AlertTwoButton from '../components/Alert';
import {StyleSheet} from 'react-native';
import LoadingView from '../components/LoadingView';

const LoginScreen2 = ({navigation}: any) => {
  console.log('masuk ke login screen login');
  // const {login, logout} = useContext(AuthContext);
  const [email, setEmail] = useState({value: '', error: ''});
  const [password, setPassword] = useState({value: '', error: ''});
  const [isLoading, setIsLoading] = useState(false);
  const emailError = emailValidator(email.value);
  const passwordError = passwordValidator(password.value);
  console.log('EMAILERROR ATAU TIDAK', {emailError, passwordError});

  const handleLogin = async () => {
    console.log('HANDLE LOGIN', {email, password});
    setIsLoading(true);
    console.log(
      `masuk login function with email: ${email.value} and password: ${password.value}`,
    );

    if (emailError || passwordError) {
      setEmail({...email, error: emailError});
      setPassword({...password, error: passwordError});
      setIsLoading(false);
      return;
    }

    await userRepo
      .loginUser({
        email: email.value,
        password: password.value,
      })
      .then(async user => {
        console.log(JSON.stringify(user.data.user));
        if (user.status === 200) {
          await saveAuthToken(user.data.token);
          await saveUserInfo(JSON.stringify(user.data.user));
          await navigation.reset({
            index: 0,
            routes: [{name: 'AppStack'}],
          });
          //   AlertTwoButton('Berhasil', user?.data?.message);
        } else {
          AlertTwoButton('Gagal Login', user?.data?.message || 'Network Error');
        }
      })
      .catch(err => {
        AlertTwoButton('Gagal Login', err?.data?.message || 'Network Error');
      })
      .finally(async () => {
        // console.log(await getAuthToken());
      });

    setIsLoading(false);
    return;
  };

  return (
    <SafeAreaView style={{flex: 1, justifyContent: 'center'}}>
      {/* if loading is true, please make it block y index = 1 */}
      {isLoading && <LoadingView />}

      <View style={{paddingHorizontal: 25, marginBottom: 50, marginTop: 50}}>
        <View style={{marginTop: 20, marginBottom: 20, alignItems: 'center'}}>
          <Text
            style={{
              fontFamily: 'Inter-Bold',
              fontWeight: 'bold',
              fontSize: 30,
              color: '#20315f',
              paddingTop: 30,
            }}>
            GME Monitoring
          </Text>
        </View>
        <View style={styles.container}>
          <Image
            source={require('../../assets/gme-icon.png')}
            style={styles.image}
            resizeMode="contain"
          />
        </View>

        <InputField
          label={'Email'}
          icon={
            <MaterialCommunityIcons
              name="email-box"
              size={20}
              color="#666"
              style={{marginRight: 5}}
            />
          }
          keyboardType="default"
          value={email.value}
          onChangeText={(text: string) => setEmail({value: text, error: ''})}
        />

        <InputField
          label={'Password'}
          icon={
            <MaterialCommunityIcons
              name="onepassword"
              size={20}
              color="#666"
              style={{marginRight: 5}}
            />
          }
          inputType="password"
          fieldButtonLabel={
            <Entypo
              name="eye"
              size={20}
              color="#666"
              style={{marginRight: 20}}
            />
          }
          fieldButtonFunction={() => {
            console.log('click on eye');
          }}
          value={password.value}
          onChangeText={(text: string) => setPassword({value: text, error: ''})}
        />
        {/* <Text
          style={{
            fontFamily: 'Inter-Bold',
            fontWeight: 'bold',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 10,
            color: 'red',
          }}>
          {emailError}
        </Text> */}
        {email.error !== '' || password.error !== '' ? (
          <View style={{marginTop: 0, marginBottom: 20, alignItems: 'center'}}>
            <Text
              style={{
                fontFamily: 'Inter-Bold',
                fontWeight: 'bold',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 12,
                color: 'red',
              }}>
              Error : {email.error}, {password.error}
            </Text>
          </View>
        ) : null}

        <CustomButton
          label={'Login'}
          onPress={() => {
            handleLogin();
          }}
        />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: 30,
          }}>
          <Text>Butuh Bantuan Masuk?</Text>
          <TouchableOpacity
            onPress={() => Linking.openURL('https://wa.me/6287888254504')}>
            <Text style={{color: '#f76617', fontWeight: '700'}}> Chat</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20,
  },
  image: {
    width: 250,
    height: 200,
  },
});

export default LoginScreen2;
