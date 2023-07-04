import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { Props } from '~/components/common/OrbCardListItem/types';
import { subtitleMedium, titleMedium, bodyMedium } from '~/theme/typography';
import styles from '~/components/common/OrbCardListItem/styles';
import ImageOrb from '../ImageOrb/ImageOrb';
import colors from '~/theme/colors';

const OrbCardListItem: React.FC<Props> = props => {
  const handlePress = (): void => {
    props.onPress?.(props.id);
  };

  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        props.style,
        {
          backgroundColor: pressed ? colors.pressed : colors.background,
        },
      ]}
      onPress={handlePress}>
      <View style={styles.contentContainer}>
        <Text style={titleMedium}>{props.title}</Text>
        {props.subtitle ? (
          <Text style={subtitleMedium}>{props.subtitle}</Text>
        ) : null}
        <Text style={[bodyMedium, styles.descriptionText]}>{props.desc}</Text>
      </View>
      <ImageOrb size={50} imgSrc={props.orbImgSrc} shadow />
    </Pressable>
  );
};

export default OrbCardListItem;
