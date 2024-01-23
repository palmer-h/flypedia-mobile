import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { AppScreen } from '~/core/constants';

export type BottomTabsNavigatorScreenParams = {
  [AppScreen.FLIES]: undefined;
  [AppScreen.IMITATEES]: undefined;
  [AppScreen.USER_FAVOURITE_FLIES]: undefined;
};

export type TabBarIconProps = {
  focused: boolean;
  icon: IconProp;
};
