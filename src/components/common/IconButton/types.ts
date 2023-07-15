import type { IconProp } from '@fortawesome/fontawesome-svg-core';
import { ViewStyle } from 'react-native';

export type Props = {
  icon: IconProp;
  size: number;
  backgroundColor?: string;
  pressedColor?: string;
  iconColor?: string;
  accessibilityLabel?: string;
  accessibilityHint?: string;
  disabled?: boolean;
  shadow?: boolean;
  style?: ViewStyle | Array<ViewStyle>;
  onPress: () => void;
};
