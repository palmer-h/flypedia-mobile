import React from 'react';
import { Pressable, ScrollView, View, Text } from 'react-native';
import ImageOrb from '../ImageOrb/ImageOrb';
import type { Props } from '~/components/common/EntityCarousel/types';
import theme from '~/theme';
import styles from '~/components/common/EntityCarousel/styles';

const EntityCarousel: React.FC<Props> = props => (
  <View style={props.style}>
    {props.title ? (
      <Text style={[theme.typography.titleSmall, styles.title]}>
        {props.title}
      </Text>
    ) : null}
    <ScrollView horizontal={true}>
      {props.items.map(x => (
        <Pressable
          key={x.id}
          style={styles.itemContainer}
          onPress={() => props.onPressItem(x.id)}>
          <ImageOrb size={64} shadow={true} />
          <Text style={[theme.typography.subtitleMedium, styles.itemTitle]}>
            {x.title}
          </Text>
          {x.subtitle ? (
            <Text style={theme.typography.subtitleMedium}>{x.subtitle}</Text>
          ) : null}
        </Pressable>
      ))}
    </ScrollView>
  </View>
);

export default EntityCarousel;
