import { TextStyle } from 'react-native';
import colors from '~/theme/colors';

const base: TextStyle = {
  color: colors.text,
};

export const titleLarge: TextStyle = {
  ...base,
  fontSize: 18,
  fontWeight: '600',
};

export const titleMedium: TextStyle = {
  ...base,
  fontSize: 16,
  fontWeight: '600',
};

export const subtitleLarge: TextStyle = {
  ...base,
  fontSize: 16,
  fontWeight: '500',
};

export const subtitleMedium: TextStyle = {
  ...base,
  fontSize: 14,
  fontWeight: '500',
};

export const bodyMedium: TextStyle = {
  ...base,
  fontSize: 14,
  fontWeight: '400',
};
