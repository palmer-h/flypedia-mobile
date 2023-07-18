import { ImageSourcePropType, ViewStyle } from 'react-native';

export type Props = {
  id: string | number;
  title: string;
  subtitle?: string;
  desc?: string;
  orbImgSrc?: ImageSourcePropType;
  style?: ViewStyle | Array<ViewStyle>;
  accessibilityLabel?: string;
  accessibilityHint?: string;
  onPress?: (id: string | number) => void;
};
