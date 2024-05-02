import React from 'react';
import { Text, View } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChainBroken, faRefresh } from '@fortawesome/free-solid-svg-icons';
import theme from '~/theme';
import { Props } from '~/components/common/ErrorSplash/types';
import styles from '~/components/common/ErrorSplash/styles';
import IconButton from '~/components/common/IconButton/IconButton';

const ErrorSplash: React.FC<Props> = props => (
  <View style={styles.container}>
    <View style={styles.contentContainer}>
      <FontAwesomeIcon
        icon={faChainBroken}
        size={64}
        color={theme.colors.text}
      />
      {props.status ? <Text style={styles.status}>{props.status}</Text> : null}
      <Text style={styles.message}>
        {props.message || 'Oops, something went wrong'}
      </Text>
      {props.onRetry ? (
        <IconButton
          icon={faRefresh}
          size={28}
          accessibilityLabel="try again"
          accessibilityHint="press to retry the request"
          style={styles.refreshButton}
          onPress={props.onRetry}
        />
      ) : null}
    </View>
  </View>
);

export default ErrorSplash;
