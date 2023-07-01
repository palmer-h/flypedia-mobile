import { ImageSourcePropType, ViewStyle } from 'react-native';

export type Props = {
  imgSrc?: ImageSourcePropType;
  size: number;
  style?: ViewStyle | Array<ViewStyle>;
};
