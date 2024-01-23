import { AppScreen } from '~/core/constants';
import { Fly, Imitatee } from '~/services/flypediaApi/types';

export type MainAppNavigatorScreenParams = {
  [AppScreen.HOME]: undefined;
  [AppScreen.LOGIN]: undefined;
  [AppScreen.USER_PROFILE]: undefined;
  [AppScreen.FLY_DETAILS]: {
    id: Fly['id'];
  };
  [AppScreen.IMITATEE_DETAILS]: {
    id: Imitatee['id'];
  };
};
