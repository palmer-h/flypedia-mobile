import React from 'react';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import IconButton from '~/components/common/IconButton/IconButton';
import type { Props } from '~/components/common/FavouriteButton/types';

const FavouriteButton: React.FC<Props> = props => (
  <IconButton
    icon={faHeart}
    size={props.size || 28}
    style={props.style}
    accessibilityLabel={props.accessibilityLabel || 'favourite button'}
    accessibilityHint={props.accessibilityHint || 'press to favourite'}
    onPress={() => null}
  />
);

export default FavouriteButton;
