import { StyleSheet } from 'react-native';
import theme from '~/theme';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  status: {
    color: theme.colors.text,
    marginTop: 12,
    ...theme.typography.titleExtraLarge,
  },
  message: {
    color: theme.colors.text,
    marginTop: 12,
    ...theme.typography.bodyLarge,
  },
  refreshButton: {
    marginTop: 20,
  },
});
