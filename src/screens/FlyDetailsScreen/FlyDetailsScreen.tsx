import React from 'react';
import { Text, View } from 'react-native';
import OrbCardListItem from '~/components/common/OrbCardListItem/OrbCardListItem';
import { Props } from '~/screens/FlyDetailsScreen/types';
import { useGetFlyByIdQuery } from '~/services/flyApi/flyApi';

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
      <View>
        <Text>{data.name}</Text>
        {data.types.map(x => (
          <Text>{x.name}</Text>
        ))}
        <Text>{data.description}</Text>
        {data.imitatees ? (
          <View>
            <Text>This fly can imitate:</Text>
            {data.imitatees.map(x => (
              <OrbCardListItem
                id={x.id}
                key={x.id}
                title={x.name}
                desc={x.description}
                onPress={() =>
                  props.navigation.navigate('Imitatee Details', {
                    id: x.id,
                    name: x.name,
                  })
                }
              />
            ))}
          </View>
        ) : null}
      </View>
    );
  }
};

export default FlyDetailsScreen;
