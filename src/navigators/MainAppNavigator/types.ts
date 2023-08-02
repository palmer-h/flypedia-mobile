import { Fly, Imitatee } from '~/services/flyApi/types';

export type MainAppNavigatorScreenParams = {
  Home: undefined;
  'Fly Details': {
    id: Fly['externalId'];
  };
  'Imitatee Details': {
    id: Imitatee['externalId'];
  };
};
