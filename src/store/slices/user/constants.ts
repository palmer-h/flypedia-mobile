import { UserSliceState } from '~/store/slices/user/types';

export const INITIAL_USER_SLICE_STATE: UserSliceState = {
  isLoggedIn: false,
  id: null,
  email: null,
};
