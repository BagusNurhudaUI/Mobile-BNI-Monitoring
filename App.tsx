import React, {useEffect} from 'react';
import App from './src';
import 'react-native-gesture-handler';
import SplashScreen from 'react-native-splash-screen';

const Main = () => {
  useEffect(() => {
    // wait 2 seconds and then hide SplashScreen
    const timeout = setTimeout(() => {
      SplashScreen.hide();
    }, 1500);

    // Clean up the timeout if the component is unmounted before the 2 seconds
    return () => clearTimeout(timeout);
  }, []);

  return <App />;
};

export default Main;
