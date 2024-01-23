import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as StoreProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import Toast from 'react-native-toast-message';
import { store } from '~/store';
import MainAppNavigator from '~/navigators/MainAppNavigator/MainAppNavigator';
import { persistor } from '~/store';

const App = () => {
  return (
    <StoreProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <MainAppNavigator />
          <Toast />
        </NavigationContainer>
      </PersistGate>
    </StoreProvider>
  );
};

export default App;
