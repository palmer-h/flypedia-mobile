import React from 'react';
import {
  faHeartCircleCheck,
  faHeartCirclePlus,
} from '@fortawesome/free-solid-svg-icons';
import IconButton from '~/components/common/IconButton/IconButton';
import type { Props } from '~/components/common/FavouriteButton/types';
import theme from '~/theme';

const FavouriteButton: React.FC<Props> = props => (
  <IconButton
    icon={props.isFavourite ? faHeartCircleCheck : faHeartCirclePlus}
    size={props.size || 28}
    iconColor={props.isFavourite ? theme.colors.success : theme.colors.primary}
    backgroundColor={theme.colors.background}
    style={props.style}
    disabled={props.disabled}
    accessibilityLabel={props.accessibilityLabel || 'favourite button'}
    accessibilityHint={props.accessibilityHint || 'press to favourite'}
    onPress={() => props.onPress(!props.isFavourite)}
  />
);

export default FavouriteButton;
