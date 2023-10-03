// In App.js in a new project
import * as React from 'react';

import AuthProvider from './context/AuthContext';
import AppNav from './navigation/AppNav';

function App() {
  return (
    <AuthProvider>
      <AppNav />
    </AuthProvider>
  );
}

export default App;
