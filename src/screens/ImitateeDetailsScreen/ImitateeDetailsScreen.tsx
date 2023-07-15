import React from 'react';
import { Text, View } from 'react-native';
import OrbCardListItem from '~/components/common/OrbCardListItem/OrbCardListItem';
import { Props } from '~/screens/ImitateeDetailsScreen/types';
import { useGetImitateeByIdQuery } from '~/services/flyApi/flyApi';

const ImitateeDetailsScreen: React.FC<Props> = props => {
  const { data, error, isLoading } = useGetImitateeByIdQuery(
    props.route.params.id,
  );

  if (isLoading) {
    return <Text>Loading</Text>;
  }

  if (error) {
    return <Text>Error</Text>;
  }

  if (data) {
    return (
      <View>
        <Text>{data.description}</Text>
        {data.flies ? (
          <View>
            <Text>Imitate with the following flies:</Text>
            {data.flies.map(x => (
              <OrbCardListItem
                id={x.id}
                key={x.id}
                title={x.name}
                desc={x.description}
                onPress={() =>
                  props.navigation.navigate('Fly Details', {
                    id: x.id,
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

export default ImitateeDetailsScreen;
