import {
  type PayloadAction,
  createSlice,
  createAsyncThunk,
} from '@reduxjs/toolkit';
import type { Fly, LoginResponse } from '~/services/flypediaApi/types';
import { INITIAL_USER_SLICE_STATE } from '~/store/slices/user/constants';
import * as keychain from '~/services/keychain';
import {
  ACCESS_TOKEN_KEYCHAIN_KEY,
  REFRESH_TOKEN_KEYCHAIN_KEY,
} from '~/core/constants';

export const userSlice = createSlice({
  name: 'user',
  initialState: INITIAL_USER_SLICE_STATE,
  reducers: {
    setUser: (state, action: PayloadAction<LoginResponse>) => {
      state.id = action.payload.userId;
      state.email = action.payload.email;
      state.favouriteFlies = action.payload.favouriteFlies;
    },
    setIsLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload;
    },
    addFlyToFavourites: (state, action: PayloadAction<Fly['id']>) => {
      state.favouriteFlies = [...state.favouriteFlies, action.payload];
    },
    removeFlyFromFavourites: (state, action: PayloadAction<Fly['id']>) => {
      state.favouriteFlies = state.favouriteFlies.filter(
        x => x !== action.payload,
      );
    },
    reset: () => INITIAL_USER_SLICE_STATE,
  },
});

export const logout = createAsyncThunk<void>(
  'user/logout',
  async (_data, thunkApi) => {
    await keychain.removeSecureValue(ACCESS_TOKEN_KEYCHAIN_KEY);
    await keychain.removeSecureValue(REFRESH_TOKEN_KEYCHAIN_KEY);
    thunkApi.dispatch(reset());
  },
);

export const onLogin = createAsyncThunk<void, LoginResponse>(
  'user/onLogin',
  async (data, thunkApi) => {
    await keychain.setSecureValue(ACCESS_TOKEN_KEYCHAIN_KEY, data.accessToken);
    await keychain.setSecureValue(
      REFRESH_TOKEN_KEYCHAIN_KEY,
      data.refreshToken,
    );
    thunkApi.dispatch(setUser(data));
    thunkApi.dispatch(setIsLoggedIn(true));
  },
);

export const {
  setUser,
  setIsLoggedIn,
  addFlyToFavourites,
  removeFlyFromFavourites,
  reset,
} = userSlice.actions;

export default userSlice.reducer;
