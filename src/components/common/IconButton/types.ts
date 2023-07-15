import type { IconProp } from '@fortawesome/fontawesome-svg-core';
import { ViewStyle } from 'react-native';

export type Props = {
  icon: IconProp;
  size: number;
  color?: string;
  accessibilityLabel?: string;
  accessibilityHint?: string;
  disabled?: boolean;
  style?: ViewStyle | Array<ViewStyle>;
  onPress: () => void;
};
