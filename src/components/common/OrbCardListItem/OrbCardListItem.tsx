import React from 'react';
import { Pressable, Text, View } from 'react-native';
import type { Props } from '~/components/common/OrbCardListItem/types';
import theme from '~/theme';
import styles from '~/components/common/OrbCardListItem/styles';
import ImageOrb from '../ImageOrb/ImageOrb';
import colors from '~/theme/colors';

const OrbCardListItem: React.FC<Props> = props => (
  <Pressable
    style={({ pressed }) => [
      styles.container,
      props.style,
      {
        backgroundColor: pressed ? colors.pressed : colors.background,
      },
    ]}
    accessibilityLabel={props.accessibilityLabel}
    accessibilityHint={props.accessibilityHint}
    onPress={() => props.onPress?.(props.id)}>
    <View style={styles.contentContainer}>
      <Text style={theme.typography.titleMedium}>{props.title}</Text>
      {props.subtitle ? (
        <Text style={theme.typography.subtitleMedium}>{props.subtitle}</Text>
      ) : null}
      <Text style={[theme.typography.bodyMedium, styles.descriptionText]}>
        {props.desc}
      </Text>
    </View>
    <ImageOrb size={50} imgSrc={props.orbImgSrc} shadow />
  </Pressable>
);

export default OrbCardListItem;
