import { ViewStyle } from 'react-native';

export type Props = {
  title?: string;
  items: Array<EntityCarouselItem>;
  style?: ViewStyle | Array<ViewStyle>;
  onPressItem: (id: string) => void;
};

export type EntityCarouselItem = {
  id: string | number;
  title: string;
};
