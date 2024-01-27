import { StyleSheet } from 'react-native';
import theme from '~/theme';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    marginTop: 'auto',
    marginBottom: 'auto',
    alignItems: 'center',
  },
  message: {
    color: theme.colors.text,
    marginTop: 20,
    ...theme.typography.bodyLarge,
  },
});
