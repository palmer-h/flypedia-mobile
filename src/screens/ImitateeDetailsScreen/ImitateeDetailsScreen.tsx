import React from 'react';
import { Text, View } from 'react-native';
import EntityCarousel from '~/components/common/EntityCarousel/EntityCarousel';
import EntityDetails from '~/components/common/EntityDetails/EntityDetails';
import type { Props } from '~/screens/ImitateeDetailsScreen/types';
import { useGetImitateeByIdQuery } from '~/services/flyApi/flyApi';
import theme from '~/theme';
import styles from '~/screens/ImitateeDetailsScreen/styles';
import { EntityCarouselItem } from '~/components/common/EntityCarousel/types';

const ImitateeDetailsScreen: React.FC<Props> = props => {
  const { data, error, isLoading } = useGetImitateeByIdQuery(
    props.route.params.id,
  );

  const flyCarouselItems: Array<EntityCarouselItem> =
    data?.flies?.map(x => ({
      id: x.id,
      title: x.name,
    })) || [];

  const handlePressFlyCarouselItem = (id: string | number): void => {
    props.navigation.navigate('Fly Details', { id: Number(id) });
  };

  if (isLoading) {
    return <Text>Loading</Text>;
  }

  if (error) {
    return <Text>Error</Text>;
  }

  if (data) {
    return (
      <View style={styles.container}>
        <EntityDetails
          title={data.name}
          description={data.description}
          style={styles.imitateeDetails}
        />
        {data.flies?.length ? (
          <EntityCarousel
            title="Imitates"
            items={flyCarouselItems}
            onPressItem={handlePressFlyCarouselItem}
          />
        ) : null}
      </View>
    );
  }
};

export default ImitateeDetailsScreen;
