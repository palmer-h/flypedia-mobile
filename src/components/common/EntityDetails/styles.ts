import { StyleSheet } from 'react-native';
import theme from '~/theme';

export default StyleSheet.create({
  mainDetailsContainer: {
    flexDirection: 'row',
  },
  mainDetailsTitleContainer: {
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: 'auto',
    flex: 1,
  },
  imageOrb: {
    marginBottom: 12,
  },
  subtitle: {
    marginTop: 4,
  },
  favouriteButton: {
    marginVertical: 12,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  descriptionContainer: {
    marginVertical: 12,
  },
  titleText: {
    ...theme.typography.titleExtraLarge,
    textAlign: 'center',
    paddingHorizontal: 8,
    color: theme.colors.primary,
  },
  descriptionTitleText: {
    marginBottom: 8,
  },
  actionButtonContainer: {
    paddingVertical: 12,
  },
});
