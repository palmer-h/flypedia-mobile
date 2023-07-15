import React from 'react';
import { Text, View } from 'react-native';
import type { Props } from '~/components/common/EntityDetails/types';
import { faHeart, faShare } from '@fortawesome/free-solid-svg-icons';
import theme from '~/theme';
import styles from '~/components/common/EntityDetails/styles';
import ImageOrb from '~/components/common/ImageOrb/ImageOrb';
import Button from '~/components/common/Button/Button';
import { ORB_IMAGE_SIZE } from '~/components/common/EntityDetails/constants';

const EntityDetails: React.FC<Props> = props => {
  return (
    <View style={props.style}>
      <View style={styles.mainDetailsContainer}>
        <ImageOrb size={ORB_IMAGE_SIZE} style={styles.imageOrb} shadow={true} />
        <Text style={theme.typography.titleLarge}>{props.title}</Text>
        {props.subtitle ? (
          <Text style={[theme.typography.subtitleMedium, styles.subtitle]}>
            {props.subtitle}
          </Text>
        ) : null}
      </View>
      <View style={styles.actionButtonsContainer}>
        <Button
          title="Favourite"
          color={theme.colors.primary}
          icon={faHeart}
          style={styles.actionButton}
        />
        <Button
          title="Share"
          color={theme.colors.primary}
          icon={faShare}
          style={styles.actionButton}
        />
      </View>
      {props.description ? (
        <View style={styles.descriptionContainer}>
          <Text
            style={[theme.typography.titleSmall, styles.descriptionTitleText]}>
            Description
          </Text>
          <Text style={theme.typography.bodyMedium}>{props.description}</Text>
        </View>
      ) : null}
    </View>
  );
};

export default EntityDetails;
