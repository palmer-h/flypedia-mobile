import type { CompositeScreenProps } from '@react-navigation/native';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { StackScreenProps } from '@react-navigation/stack';
import type { MainAppNavigatorScreenParams } from '~/navigators/MainAppNavigator/types';
import type { BottomTabsNavigatorScreenParams } from '~/navigators/BottomTabsNavigator/types';
import { AppScreen } from '~/core/constants';

export type Props = CompositeScreenProps<
  BottomTabScreenProps<
    BottomTabsNavigatorScreenParams,
    AppScreen.USER_FAVOURITE_FLIES
  >,
  StackScreenProps<MainAppNavigatorScreenParams>
>;
