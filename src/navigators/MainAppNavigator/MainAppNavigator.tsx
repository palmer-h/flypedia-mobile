import React from 'react';
import { View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import BottomTabsNavigator from '~/navigators/BottomTabsNavigator/BottomTabsNavigator';
import FlyDetailsScreen from '~/screens/FlyDetailsScreen/FlyDetailsScreen';
import ImitateeDetailsScreen from '~/screens/ImitateeDetailsScreen/ImitateeDetailsScreen';
import { MainAppNavigatorScreenParams } from '~/navigators/MainAppNavigator/types';
import IconButton from '~/components/common/IconButton/IconButton';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { NavigationProp } from '@react-navigation/native';
import theme from '~/theme';

const Stack = createStackNavigator<MainAppNavigatorScreenParams>();

const HeaderLeft: React.FC<NavigationProp<MainAppNavigatorScreenParams>> = ({
  navigation,
}) => {
  return (
    <View style={{ marginLeft: theme.spacing.screenPadding }}>
      <IconButton icon={faChevronLeft} size={20} onPress={navigation.goBack} />
    </View>
  );
};

const MainAppNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={({ navigation }) => ({
        headerLeft: () => <HeaderLeft navigation={navigation} />,
      })}>
      <Stack.Screen
        name="Home"
        component={BottomTabsNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Fly Details" component={FlyDetailsScreen} />
      <Stack.Screen name="Imitatee Details" component={ImitateeDetailsScreen} />
    </Stack.Navigator>
  );
};

export default MainAppNavigator;
