import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { Props } from '~/components/common/OrbCardListItem/types';
import { subtitleMedium, titleMedium, bodyMedium } from '~/theme/typography';
import styles from '~/components/common/OrbCardListItem/styles';
import ImageOrb from '../ImageOrb/ImageOrb';

const OrbCardListItem: React.FC<Props> = props => {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        props.style,
        {
          backgroundColor: pressed ? 'gray' : 'white',
        },
      ]}>
      <ImageOrb size={50} />
      <View style={styles.contentContainer}>
        <Text style={titleMedium}>{props.title}</Text>
        {props.subtitle ? (
          <Text style={subtitleMedium}>{props.subtitle}</Text>
        ) : null}
        <Text style={[bodyMedium, styles.descriptionText]}>{props.desc}</Text>
      </View>
    </Pressable>
  );
};

export default OrbCardListItem;
