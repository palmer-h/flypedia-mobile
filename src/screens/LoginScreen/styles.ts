import { StyleSheet } from 'react-native';
import theme from '~/theme';

export default StyleSheet.create({
  container: {
    height: '100%',
    padding: theme.spacing.screenPadding,
    backgroundColor: theme.colors.background,
  },
  inputContainer: {
    marginVertical: 8,
  },
  nativeInput: {
    borderWidth: 2,
    borderRadius: 4,
    paddingHorizontal: 12,
    borderColor: theme.colors.primary,
  },
  inputError: {
    minHeight: 12,
    paddingHorizontal: 12,
    paddingTop: 4,
    color: theme.colors.error,
  },
});
