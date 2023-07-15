import { ViewStyle } from 'react-native';

export type Props = {
  title: string;
  subtitle?: string;
  description?: string;
  style?: ViewStyle | Array<ViewStyle>;
};
