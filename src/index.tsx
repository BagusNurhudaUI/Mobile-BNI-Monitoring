// In App.js in a new project
import * as React from 'react';

import AuthProvider from './context/AuthContext';
import AppNav from './navigation/AppNav';
import {StatusBar} from 'react-native';
import conn from './helpers/const';
import SplashScreen from 'react-native-splash-screen';

function App() {
  React.useEffect(() => {
    // wait 2 seconds and then hide SplashScreen
    const timeout = setTimeout(() => {
      SplashScreen.hide();
    }, 1500);

    // Clean up the timeout if the component is unmounted before the 2 seconds
    return () => clearTimeout(timeout);
  }, []);
  return (
    <AuthProvider>
      <StatusBar backgroundColor={conn.COLOR_ORANGE} />
      <AppNav />
    </AuthProvider>
  );
}

export default App;
