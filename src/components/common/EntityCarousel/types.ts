import { ViewStyle } from 'react-native';

export type Props = {
  title?: string;
  items: Array<{
    id: string | number;
    title: string;
    subtitle?: string;
  }>;
  style?: ViewStyle | Array<ViewStyle>;
  onPressItem: (id: string | number) => void;
};
