import React from 'react';
import { View } from 'react-native';
import { Props } from '~/components/common/ImageOrb/types';
import styles from '~/components/common/ImageOrb/styles';

const ImageOrb = React.memo((props: Props) => {
  return (
    <View
      style={[
        styles.container,
        props.style,
        { width: props.size, height: props.size },
      ]}></View>
  );
});

export default ImageOrb;
