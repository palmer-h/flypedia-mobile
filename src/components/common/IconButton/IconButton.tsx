import React from 'react';
import { Pressable } from 'react-native';
import theme from '~/theme';
import type { Props } from '~/components/common/IconButton/types';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import styles from '~/components/common/IconButton//styles';

const IconButton: React.FC<Props> = props => (
  <Pressable
    accessibilityHint={props.accessibilityHint}
    accessibilityLabel={props.accessibilityLabel}
    accessibilityState={{
      disabled: props.disabled,
    }}
    disabled={props.disabled}
    style={({ pressed }) => [
      styles.container,
      {
        backgroundColor: pressed
          ? props.pressedColor || theme.colors.pressedPrimary
          : props.backgroundColor || theme.colors.primary,
      },
      props.shadow ? styles.containerShadow : null,
      props.style,
    ]}
    onPress={!props.disabled ? props.onPress : undefined}>
    <FontAwesomeIcon
      icon={props.icon}
      size={props.size}
      color={props.iconColor || theme.colors.onPrimary}
    />
  </Pressable>
);

export default IconButton;
