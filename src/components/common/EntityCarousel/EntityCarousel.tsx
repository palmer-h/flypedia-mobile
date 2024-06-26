import React from 'react';
import { Pressable, ScrollView, View, Text } from 'react-native';
import ImageOrb from '../ImageOrb/ImageOrb';
import type { Props } from '~/components/common/EntityCarousel/types';
import theme from '~/theme';
import styles from '~/components/common/EntityCarousel/styles';

const EntityCarousel: React.FC<Props> = props => (
  <View style={props.style}>
    {props.title ? <Text style={styles.title}>{props.title}</Text> : null}
    <ScrollView horizontal={true}>
      {props.items.map(x => (
        <Pressable
          key={x.id}
          style={({ pressed }) => [
            styles.itemContainer,
            {
              backgroundColor: pressed
                ? theme.colors.pressed
                : theme.colors.background,
            },
          ]}
          onPress={() => props.onPressItem(String(x.id))}>
          <ImageOrb size={64} shadow={true} imgSrc={props.fallbackImg} />
          <Text style={[theme.typography.subtitleMedium, styles.itemTitle]}>
            {x.title}
          </Text>
        </Pressable>
      ))}
    </ScrollView>
  </View>
);

export default EntityCarousel;
