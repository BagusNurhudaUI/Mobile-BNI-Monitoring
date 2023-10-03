import React, {useState, useEffect} from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Modal,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import {ActivityIndicator, Text} from 'react-native-paper';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import BackButton from '../components/BackButton';
import {theme} from '../core/theme';
import {emailValidator} from '../helpers/emailValidator';
import {passwordValidator} from '../helpers/passwordValidator';
import userRepo from '../api/userRepo';
import AlertTwoButton from '../components/Alert';
import {getAuthToken, saveAuthToken} from '../api/authRepo';

type LoginScreenProps = {
  navigation: {
    goBack: () => void;
    reset: (params: {index: number; routes: Array<{name: string}>}) => void;
    navigate: (routeName: string) => void;
    replace: (routeName: string) => void;
  };
};

export default function LoginScreen({navigation}: LoginScreenProps) {
  const [email, setEmail] = useState({value: '', error: ''});
  const [password, setPassword] = useState({value: '', error: ''});
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    const checkLoggedIn = async () => {
      const authToken = await getAuthToken();
      if (authToken) {
        navigation.reset({
          index: 0,
          routes: [{name: 'Dashboard'}],
        });
      }
    };

    checkLoggedIn();
  }, [navigation]);

  const onLoginPressed = async () => {
    console.log({loading});

    // if (loading) return; // If already loading, do nothing

    setLoading(true); // Start loading

    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);
    console.log({email, password});

    if (emailError || passwordError) {
      setEmail({...email, error: emailError});
      setPassword({...password, error: passwordError});
      setLoading(false);
      return;
    }

    try {
      console.log('masuk tyr');

      const hasil = await getData(email.value, password.value);
      console.log({hasil});

      console.log('status: ' + hasil.status);
      // console.log('data: ' + JSON.stringify(hasil));
      console.log({loading});
      if (hasil.status && hasil.status === 200) {
        saveAuthToken(hasil.data.token);
        setLoading(false);
        navigation.reset({
          index: 0,
          routes: [{name: 'Dashboard'}],
        });
      } else {
        AlertTwoButton('Gagal Login', hasil?.data?.message || 'Network Error');
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
      // Handle error
    } finally {
      setLoading(false);
    }
  };

  const getData = async (email: string, password: string) => {
    const data = {
      email: email,
      password: password,
    };
    console.log({data});

    try {
      return await userRepo.loginUser(data);
    } catch (err: any) {
      return err;
    }
  };

  return (
    // <KeyboardAvoidingView style={{flex: 1}} behavior="padding">
    // <ScrollView>
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      {loading ? (
        <View
          style={{
            ...StyleSheet.absoluteFillObject,
            backgroundColor: 'rgba(0,0,0,0.5)',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ActivityIndicator animating={loading} size="large" />
        </View>
      ) : (
        <Background>
          {/* <ActivityIndicator animating={loading} size="large" /> */}
          <Logo />
          <Header>Welcome back.</Header>
          <TextInput
            label="Email"
            returnKeyType="next"
            onChangeText={(text: string) => setEmail({value: text, error: ''})}
            value={email.value}
            error={!!email.error}
            errorText={email.error}
            autoCapitalize="none"
            autoCompleteType="email"
            // textContentType="emailAddress"
            // keyboardType="email-address"
          />
          <TextInput
            label="Password"
            returnKeyType="done"
            value={password.value}
            onChangeText={(text: string) =>
              setPassword({value: text, error: ''})
            }
            error={!!password.error}
            errorText={password.error}
            secureTextEntry
          />
          {/* <View style={styles.forgotPassword}>
        <TouchableOpacity
          onPress={() => navigation.navigate('ResetPasswordScreen')}>
          <Text style={styles.forgot}>Forgot your password?</Text>
        </TouchableOpacity>
      </View> */}
          <Button mode="contained" onPress={onLoginPressed}>
            Login
          </Button>
          {/* <View style={styles.row}>
        <Text>Don’t have an account? </Text>
        <TouchableOpacity onPress={() => navigation.replace('RegisterScreen')}>
          <Text style={styles.link}>Sign up</Text>
        </TouchableOpacity>
      </View> */}
        </Background>
      )}
    </View>
    // </ScrollView>
    // </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  forgot: {
    fontSize: 13,
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
});
