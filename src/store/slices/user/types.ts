import type { Fly } from '~/services/flypediaApi/types';

export type UserSliceState = {
  isLoggedIn: boolean;
  id: string | null;
  email: string | null;
  favouriteFlies: Array<Fly['id']>;
};
