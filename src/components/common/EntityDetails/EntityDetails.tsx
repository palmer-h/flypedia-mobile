import React from 'react';
import { Text, View } from 'react-native';
import type { Props } from '~/components/common/EntityDetails/types';
import theme from '~/theme';
import styles from '~/components/common/EntityDetails/styles';
import ImageOrb from '~/components/common/ImageOrb/ImageOrb';
import { ORB_IMAGE_SIZE } from '~/components/common/EntityDetails/constants';
import FavouriteButton from '~/components/common/FavouriteButton/FavouriteButton';

const EntityDetails: React.FC<Props> = props => (
  <View style={props.style}>
    <View style={styles.mainDetailsContainer}>
      <ImageOrb size={ORB_IMAGE_SIZE} style={styles.imageOrb} shadow={true} />
      <View style={styles.mainDetailsTitleContainer}>
        <Text style={styles.titleText}>{props.title}</Text>
        {props.subtitle ? (
          <Text style={[theme.typography.subtitleLarge, styles.subtitle]}>
            {props.subtitle}
          </Text>
        ) : null}
        {props.showFavouriteToggle && props.onToggleIsFavourite ? (
          <View style={styles.actionButtonContainer}>
            <FavouriteButton
              isFavourite={props.isFavourite}
              disabled={props.isLoading}
              onPress={props.onToggleIsFavourite}
            />
          </View>
        ) : null}
      </View>
    </View>
    {props.description ? (
      <View style={styles.descriptionContainer}>
        <Text style={theme.typography.bodyMedium}>{props.description}</Text>
      </View>
    ) : null}
  </View>
);

export default EntityDetails;
