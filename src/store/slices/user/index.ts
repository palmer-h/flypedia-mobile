import {
  type PayloadAction,
  createSlice,
  createAsyncThunk,
} from '@reduxjs/toolkit';
import type { LoginResponse } from '~/services/flypediaApi/types';
import { INITIAL_USER_SLICE_STATE } from '~/store/slices/user/constants';
import * as keychain from '~/services/keychain';

export const userSlice = createSlice({
  name: 'user',
  initialState: INITIAL_USER_SLICE_STATE,
  reducers: {
    setUser: (state, action: PayloadAction<LoginResponse>) => {
      state.id = action.payload.userId;
      state.email = action.payload.email;
    },
    setIsLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload;
    },
    reset: () => INITIAL_USER_SLICE_STATE,
  },
});

export const logout = createAsyncThunk<void>(
  'user/logout',
  async (_data, thunkApi) => {
    await keychain.removeSecureValue('accessToken');
    await keychain.removeSecureValue('refreshToken');
    thunkApi.dispatch(reset());
  },
);

export const onLogin = createAsyncThunk<void, LoginResponse>(
  'user/onLogin',
  async (data, thunkApi) => {
    await keychain.setSecureValue('accessToken', data.accessToken);
    await keychain.setSecureValue('refreshToken', data.refreshToken);
    thunkApi.dispatch(setUser(data));
    thunkApi.dispatch(setIsLoggedIn(true));
  },
);

export const { setUser, setIsLoggedIn, reset } = userSlice.actions;

export default userSlice.reducer;
