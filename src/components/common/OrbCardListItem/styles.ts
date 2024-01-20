import { StyleSheet } from 'react-native';
import theme from '~/theme';
import { CONTAINER_HEIGHT } from '~/components/common/OrbCardListItem/constants';

export default StyleSheet.create({
  container: {
    height: CONTAINER_HEIGHT,
    borderTopWidth: 0.2,
    borderTopColor: 'grey',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    maxWidth: '100%',
    paddingHorizontal: theme.spacing.screenPadding,
  },
  contentContainer: {
    flex: 1,
    paddingVertical: theme.spacing.screenPadding,
    paddingRight: theme.spacing.screenPadding,
  },
  descriptionText: {},
});
