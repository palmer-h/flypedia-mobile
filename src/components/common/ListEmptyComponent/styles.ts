import { StyleSheet } from 'react-native';
import theme from '~/theme';

export default StyleSheet.create({
  container: {
    marginVertical: 32,
    alignItems: 'center',
  },
  message: {
    color: theme.colors.text,
    marginTop: 16,
    ...theme.typography.bodyLarge,
  },
});
