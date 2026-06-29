import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/redux/store';
import AppNavigator from './src/navigation/AppNavigator';
import { Loader } from './src/components';
import { COLORS } from './src/theme/colors';

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaProvider>
          <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
          <AppNavigator />
          <Loader />
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
