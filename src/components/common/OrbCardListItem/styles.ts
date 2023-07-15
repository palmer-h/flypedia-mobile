import { StyleSheet } from 'react-native';
import theme from '~/theme';

export default StyleSheet.create({
  container: {
    borderTopWidth: 0.5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.screenPadding,
  },
  contentContainer: {
    paddingVertical: theme.spacing.screenPadding,
    paddingRight: theme.spacing.screenPadding,
  },
  descriptionText: {
    marginTop: 8,
  },
});
