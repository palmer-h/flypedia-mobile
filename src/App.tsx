import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import BottomTabsNavigator from './navigators/BottomTabsNavigator/BottomTabsNavigator';
import { Provider as StoreProvider } from 'react-redux';
import { store } from '~/store';

const App = () => {
  return (
    <StoreProvider store={store}>
      <NavigationContainer>
        <BottomTabsNavigator />
      </NavigationContainer>
    </StoreProvider>
  );
};

export default App;
