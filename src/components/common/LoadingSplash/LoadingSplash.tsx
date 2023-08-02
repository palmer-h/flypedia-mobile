import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import theme from '~/theme';
import styles from '~/components/common/LoadingSplash/styles';

const LoadingSplash: React.FC = () => (
  <View style={styles.container}>
    <ActivityIndicator
      color={theme.colors.primary}
      style={styles.loadingIndicator}
    />
  </View>
);

export default LoadingSplash;
