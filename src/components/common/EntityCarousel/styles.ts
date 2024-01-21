import { StyleSheet } from 'react-native';
import theme from '~/theme';

export default StyleSheet.create({
  title: {
    ...theme.typography.titleMedium,
    marginBottom: 8,
    backgroundColor: theme.colors.primary,
    color: theme.colors.onPrimary,
    padding: 8,
  },
  itemContainer: {
    alignItems: 'center',
    width: 128,
    padding: 8,
  },
  itemTitle: {
    textAlign: 'center',
    marginTop: 8,
  },
});
