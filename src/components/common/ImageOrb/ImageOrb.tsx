import React from 'react';
import { Image, View } from 'react-native';
import type { Props } from '~/components/common/ImageOrb/types';
import styles from '~/components/common/ImageOrb/styles';

const ImageOrb: React.FC<Props> = props => (
  <View
    style={[
      styles.container,
      props.style,
      { width: props.size, height: props.size },
      props.shadow ? styles.containerShadow : null,
    ]}>
    <Image
      source={props.imgSrc || require('~/assets/flyPlaceholder.png')}
      width={undefined}
      height={undefined}
      style={styles.image}
    />
  </View>
);

export default ImageOrb;
