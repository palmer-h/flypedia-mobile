import { TextStyle } from 'react-native';
import Toast from 'react-native-toast-message';
import theme from '~/theme';
import {
  DEFAULT_ERROR_MESSAGE,
  DEFAULT_SUCCESS_MESSAGE,
  ERROR_TITLE,
  SUCCESS_TITLE,
  ToastType,
} from '~/hooks/toast/constants';

export const useToast = () => {
  const titleTextStyle: TextStyle = {
    ...theme.typography.titleMedium,
  };
  const messageTextStyle: TextStyle = {
    ...theme.typography.bodyMedium,
  };

  const success = (message?: string): void =>
    Toast.show({
      type: ToastType.SUCCESS,
      text1: SUCCESS_TITLE,
      text2: message || DEFAULT_SUCCESS_MESSAGE,
      text1Style: titleTextStyle,
      text2Style: messageTextStyle,
    });

  const error = (message?: string): void =>
    Toast.show({
      type: ToastType.ERROR,
      text1: ERROR_TITLE,
      text2: message || DEFAULT_ERROR_MESSAGE,
      text1Style: titleTextStyle,
      text2Style: messageTextStyle,
    });

  const info = (message?: string): void =>
    Toast.show({
      type: ToastType.INFO,
      text1: ERROR_TITLE,
      text2: message || DEFAULT_ERROR_MESSAGE,
      text1Style: titleTextStyle,
      text2Style: messageTextStyle,
    });

  return {
    success,
    error,
    info,
  };
};
