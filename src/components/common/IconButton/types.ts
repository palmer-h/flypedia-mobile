import type { IconProp } from '@fortawesome/fontawesome-svg-core';

export type Props = {
  icon: IconProp;
  size: number;
  color?: string;
  accessibilityLabel?: string;
  accessibilityHint?: string;
  disabled?: boolean;
  onPress: () => void;
};
