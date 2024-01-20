import React from 'react';
import { View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import BottomTabsNavigator from '~/navigators/BottomTabsNavigator/BottomTabsNavigator';
import FlyDetailsScreen from '~/screens/FlyDetailsScreen/FlyDetailsScreen';
import ImitateeDetailsScreen from '~/screens/ImitateeDetailsScreen/ImitateeDetailsScreen';
import type { MainAppNavigatorScreenParams } from '~/navigators/MainAppNavigator/types';
import IconButton from '~/components/common/IconButton/IconButton';
import { faChevronLeft, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import type { NavigationProp } from '@react-navigation/native';
import theme from '~/theme';
import { useReduxSelector } from '~/hooks/redux';
import LoginScreen from '~/screens/LoginScreen/LoginScreen';
import {
  HEADER_BACK_BUTTON_ICON_SIZE,
  LOGIN_BUTTON_ICON_SIZE,
  MainAppNavigatorScreen,
} from '~/navigators/MainAppNavigator/constants';

const Stack = createStackNavigator<MainAppNavigatorScreenParams>();

const HeaderLeft: React.FC<{
  navigation: NavigationProp<MainAppNavigatorScreenParams>;
}> = ({ navigation }) => {
  if (!navigation.canGoBack()) {
    return null;
  }

  return (
    <View style={{ marginLeft: theme.spacing.screenPadding }}>
      <IconButton
        icon={faChevronLeft}
        size={HEADER_BACK_BUTTON_ICON_SIZE}
        accessibilityLabel="go back button"
        accessibilityHint="press to go back to the previous screen"
        onPress={navigation.goBack}
      />
    </View>
  );
};

const HeaderRight: React.FC<{
  navigation: NavigationProp<MainAppNavigatorScreenParams>;
}> = ({ navigation }) => {
  return (
    <View style={{ marginRight: theme.spacing.screenPadding }}>
      <IconButton
        icon={faUserCircle}
        size={LOGIN_BUTTON_ICON_SIZE}
        accessibilityLabel="login button"
        accessibilityHint="press to go to the login screen"
        onPress={() => navigation.navigate(MainAppNavigatorScreen.LOGIN)}
      />
    </View>
  );
};

const MainAppNavigator = () => {
  const isLoggedIn = useReduxSelector(state => state.user.id);

  return (
    <Stack.Navigator
      screenOptions={({ navigation, route }) => ({
        headerLeft: () => HeaderLeft({ navigation }),
        headerRight: () => HeaderRight({ navigation }),
        headerTitle: !navigation.canGoBack() ? '' : route.name,
        headerStyle: {
          height: !navigation.canGoBack() ? 42 : 52,
          backgroundColor: theme.colors.primary,
        },
        headerTitleStyle: {
          color: theme.colors.onPrimary,
        },
      })}>
      <Stack.Screen
        name={MainAppNavigatorScreen.HOME}
        component={BottomTabsNavigator}
      />
      <Stack.Screen
        name={MainAppNavigatorScreen.FLY_DETAILS}
        component={FlyDetailsScreen}
      />
      <Stack.Screen
        name={MainAppNavigatorScreen.IMITATEE_DETAILS}
        component={ImitateeDetailsScreen}
      />
      {!isLoggedIn ? (
        <Stack.Screen
          name={MainAppNavigatorScreen.LOGIN}
          options={{
            headerRight: undefined,
          }}
          component={LoginScreen}
        />
      ) : undefined}
    </Stack.Navigator>
  );
};

export default MainAppNavigator;
