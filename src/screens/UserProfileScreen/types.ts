import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AppScreen } from '~/core/constants';
import { MainAppNavigatorScreenParams } from '~/navigators/MainAppNavigator/types';

export type Props = NativeStackScreenProps<
  MainAppNavigatorScreenParams,
  AppScreen.USER_PROFILE
>;
