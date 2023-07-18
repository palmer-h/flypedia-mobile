import { ViewStyle } from 'react-native';

export type Props = {
  size?: number;
  style?: ViewStyle | Array<ViewStyle>;
  accessibilityLabel?: string;
  accessibilityHint?: string;
};
