import React from 'react';
import { Text, View } from 'react-native';
import type { Props } from '~/components/common/EntityDetails/types';
import theme from '~/theme';
import styles from '~/components/common/EntityDetails/styles';
import ImageOrb from '~/components/common/ImageOrb/ImageOrb';
import {
  ORB_IMAGE_SIZE,
  UPDATED_AT_DATE_FORMAT,
} from '~/components/common/EntityDetails/constants';
import FavouriteButton from '~/components/common/FavouriteButton/FavouriteButton';
import { format } from 'date-fns';

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
    {props.updatedAt ? (
      <Text style={theme.typography.subtitleMedium}>
        Last updated {format(props.updatedAt, UPDATED_AT_DATE_FORMAT)}
      </Text>
    ) : null}
  </View>
);

export default EntityDetails;
