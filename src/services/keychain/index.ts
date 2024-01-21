import * as Keychain from 'react-native-keychain';
import { DEFAULT_ERROR_MESSAGE } from '~/services/keychain/constants';

export const setSecureValue = async (
  key: string,
  value: string,
): Promise<false | Keychain.Result> => {
  try {
    return Keychain.setInternetCredentials(key, key, value, { service: key });
  } catch {
    throw new Error(DEFAULT_ERROR_MESSAGE);
  }
};

export const getSecureValue = async (key: string): Promise<false | string> => {
  try {
    const res = await Keychain.getInternetCredentials(key);
    if (!res) {
      return false;
    }
    return res.password;
  } catch (e) {
    throw new Error(DEFAULT_ERROR_MESSAGE);
  }
};

export const removeSecureValue = (key: string): Promise<void> => {
  try {
    return Keychain.resetInternetCredentials(key);
  } catch {
    throw new Error(DEFAULT_ERROR_MESSAGE);
  }
};
