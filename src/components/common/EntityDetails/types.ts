import { ViewStyle } from 'react-native';

export type Props = {
  title: string;
  subtitle?: string;
  description?: string;
  style?: ViewStyle | Array<ViewStyle>;
  isFavourite?: boolean;
  isLoading?: boolean;
  showFavouriteToggle?: boolean;
  onToggleIsFavourite?: (isFavourite: boolean) => void;
};
