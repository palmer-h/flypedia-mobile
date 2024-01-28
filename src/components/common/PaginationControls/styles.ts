import { StyleSheet } from 'react-native';
import theme from '~/theme';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingVertical: 16,
    backgroundColor: theme.colors.background,
  },
  pageNumberText: {
    ...theme.typography.bodyLarge,
  },
  activePageNumberText: {
    color: theme.colors.primary,
    fontWeight: '900',
    borderBottomWidth: 2,
  },
});
