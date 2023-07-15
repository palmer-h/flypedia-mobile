import type { IconProp } from '@fortawesome/fontawesome-svg-core';
import type { ButtonProps, ViewStyle } from 'react-native';

export type Props = ButtonProps & {
  icon?: IconProp;
  style?: ViewStyle | Array<ViewStyle>;
};
