import React from 'react';
import { Text, View } from 'react-native';
import type { Props } from '~/components/common/EntityDetails/types';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import theme from '~/theme';
import styles from '~/components/common/EntityDetails/styles';
import ImageOrb from '~/components/common/ImageOrb/ImageOrb';
import { ORB_IMAGE_SIZE } from '~/components/common/EntityDetails/constants';
import ShareButton from '~/components/common/ShareButton/ShareButton';
import IconButton from '~/components/common/IconButton/IconButton';

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
        <IconButton
          size={20}
          icon={faHeart}
          style={styles.actionButton}
          onPress={() => null}
        />
        <ShareButton size={24} style={styles.actionButton} />
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
