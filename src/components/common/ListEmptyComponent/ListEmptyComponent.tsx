import React from 'react';
import { Text, View } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Props } from '~/components/common/ListEmptyComponent/types';
import theme from '~/theme';
import styles from '~/components/common/ListEmptyComponent/styles';
import {
  DEFAULT_MSG,
  ICON_SIZE,
} from '~/components/common/ListEmptyComponent/constants';

const ListEmptyComponent: React.FC<Props> = props => (
  <View style={styles.container}>
    <View style={styles.contentContainer}>
      <FontAwesomeIcon
        icon={props.icon || faSearch}
        size={ICON_SIZE}
        color={theme.colors.primary}
      />
      <Text style={styles.message}>{props.message || DEFAULT_MSG}</Text>
    </View>
  </View>
);

export default ListEmptyComponent;
