import React from 'react';
import { Button as RNButton, View } from 'react-native';
import type { Props } from '~/components/common/Button/types';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import styles from '~/components/common/Button/styles';
import theme from '~/theme';

const Button: React.FC<Props> = props => (
  <View style={[styles.container, props.style]}>
    {props.icon ? (
      <FontAwesomeIcon
        icon={props.icon}
        style={styles.icon}
        color={props.color ? String(props.color) : theme.colors.primary}
      />
    ) : null}
    <RNButton {...props} color={props.color || theme.colors.primary} />
  </View>
);

export default Button;
