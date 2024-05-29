import { StyleSheet } from 'react-native';
import theme from '~/theme';

export default StyleSheet.create({
  container: {
    height: '100%',
    padding: theme.spacing.screenPadding,
    backgroundColor: theme.colors.background,
  },
  text: {
    textAlign: 'center',
    color: theme.colors.text,
  },
  titleText: {
    fontSize: 32,
    marginBottom: 16,
    fontWeight: 400,
  },
  linkText: {
    color: theme.colors.link,
    marginTop: 8,
    fontWeight: 600,
  },
});
