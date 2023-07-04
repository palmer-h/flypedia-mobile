import React from 'react';
import { Text } from 'react-native';
import { Props } from '~/screens/ImitateeDetailsScreen/types';

const ImitateeDetailsScreen: React.FC<Props> = props => {
  const id = props.route.params.id;

  return <Text>{id}</Text>;
};

export default ImitateeDetailsScreen;
