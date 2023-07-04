import { StyleSheet } from 'react-native';
import colors from '~/theme/colors';

export default StyleSheet.create({
  container: {
    borderRadius: 100,
    backgroundColor: colors.background,
  },
  containerShadow: {
    elevation: 4,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  image: {
    flex: 1,
    height: undefined,
    width: undefined,
  },
});
