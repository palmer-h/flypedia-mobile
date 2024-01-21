import React, { useCallback, useEffect } from 'react';
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
import * as keychain from '~/services/keychain';
import { useReduxDispatch } from '~/hooks/redux';
import { logout, setIsLoggedIn } from '~/store/slices/user';
import UserProfileScreen from '~/screens/UserProfileScreen/UserProfileScreen';

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
  const isLoggedIn = useReduxSelector(state => state.user.id);

  const handleIconPress = (): void => {
    navigation.navigate(
      !isLoggedIn
        ? MainAppNavigatorScreen.LOGIN
        : MainAppNavigatorScreen.USER_PROFILE,
    );
  };

  return (
    <View style={{ marginRight: theme.spacing.screenPadding }}>
      <IconButton
        icon={faUserCircle}
        size={LOGIN_BUTTON_ICON_SIZE}
        accessibilityLabel="login button"
        accessibilityHint="press to go to the login screen"
        onPress={handleIconPress}
      />
    </View>
  );
};

const MainAppNavigator = () => {
  const isLoggedIn = useReduxSelector(state => state.user.id);

  const dispatch = useReduxDispatch();

  const checkLoggedInStatus = useCallback(async (): Promise<void> => {
    const accessToken = await keychain.getSecureValue('accessToken');
    const refreshToken = await keychain.getSecureValue('refreshToken');

    if (!accessToken || !refreshToken) {
      await dispatch(logout());
      return;
    }
    dispatch(setIsLoggedIn(true));
  }, [dispatch]);

  useEffect((): void => {
    checkLoggedInStatus();
  }, [checkLoggedInStatus]);

  return (
    <Stack.Navigator
      screenOptions={({ navigation, route }) => ({
        headerLeft: () => HeaderLeft({ navigation }),
        headerRight: () => HeaderRight({ navigation }),
        headerTitle: !navigation.canGoBack() ? 'Flypedia' : route.name,
        headerStyle: {
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
      ) : (
        <Stack.Screen
          name={MainAppNavigatorScreen.USER_PROFILE}
          options={{
            headerRight: undefined,
          }}
          component={UserProfileScreen}
        />
      )}
    </Stack.Navigator>
  );
};

export default MainAppNavigator;
