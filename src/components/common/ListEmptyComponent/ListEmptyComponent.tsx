import React from 'react';
import { Text, View } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Props } from '~/components/common/ListEmptyComponent/types';
import theme from '~/theme';
import styles from '~/components/common/ListEmptyComponent/styles';

const ListEmptyComponent: React.FC<Props> = props => (
  <View style={styles.container}>
    <FontAwesomeIcon icon={faSearch} size={64} color={theme.colors.primary} />
    <Text style={styles.message}>{props.message || 'No items found'}</Text>
  </View>
);

export default ListEmptyComponent;
