import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MainAppNavigatorScreen } from '~/navigators/MainAppNavigator/constants';
import { MainAppNavigatorScreenParams } from '~/navigators/MainAppNavigator/types';

export type Props = NativeStackScreenProps<
  MainAppNavigatorScreenParams,
  MainAppNavigatorScreen.LOGIN
>;
