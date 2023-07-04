import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as StoreProvider } from 'react-redux';
import { store } from '~/store';
import MainAppNavigator from '~/navigators/MainAppNavigator/MainAppNavigator';

const App = () => {
  return (
    <StoreProvider store={store}>
      <NavigationContainer>
        <MainAppNavigator />
      </NavigationContainer>
    </StoreProvider>
  );
};

export default App;
