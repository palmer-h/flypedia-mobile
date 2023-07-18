import { StyleSheet } from 'react-native';
import theme from '~/theme';

export default StyleSheet.create({
  container: {
    height: '100%',
    padding: theme.spacing.screenPadding,
    backgroundColor: theme.colors.background,
  },
  flyDetails: {
    marginBottom: 12,
  },
});
