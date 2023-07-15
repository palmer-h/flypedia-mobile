import React from 'react';
import { Text, View } from 'react-native';
import EntityDetails from '~/components/common/EntityDetails/EntityDetails';
import type { Props } from '~/screens/FlyDetailsScreen/types';
import { useGetFlyByIdQuery } from '~/services/flyApi/flyApi';
import theme from '~/theme';

const FlyDetailsScreen: React.FC<Props> = props => {
  const { data, error, isLoading } = useGetFlyByIdQuery(props.route.params.id);

  if (isLoading) {
    return <Text>Loading</Text>;
  }

  if (error) {
    return <Text>Error</Text>;
  }

  if (data) {
    return (
      <View style={{ padding: theme.spacing.screenPadding }}>
        <EntityDetails
          title={data.name}
          subtitle={data?.types.map(x => x.name).join(', ')}
          description={data.description}
        />
      </View>
    );
  }
};

export default FlyDetailsScreen;
