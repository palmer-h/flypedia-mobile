import React from 'react';
import { Text, View } from 'react-native';
import EntityCarousel from '~/components/common/EntityCarousel/EntityCarousel';
import EntityDetails from '~/components/common/EntityDetails/EntityDetails';
import styles from '~/screens/FlyDetailsScreen/styles';
import type { Props } from '~/screens/FlyDetailsScreen/types';
import { useGetFlyByIdQuery } from '~/services/flyApi/flyApi';
import theme from '~/theme';

const FlyDetailsScreen: React.FC<Props> = props => {
  const { data, error, isLoading } = useGetFlyByIdQuery(props.route.params.id);

  const imitateeCarouselItems =
    data?.imitatees?.map(x => ({
      id: x.id,
      title: x.name,
    })) || [];

  const handlePressImitateeCarouselItem = (id: string | number): void => {
    props.navigation.navigate('Imitatee Details', { id: Number(id) });
  };

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
          style={styles.flyDetails}
          description={data.description}
        />
        {data.imitatees?.length ? (
          <EntityCarousel
            title="Imitatees"
            items={imitateeCarouselItems}
            onPressItem={handlePressImitateeCarouselItem}
          />
        ) : null}
      </View>
    );
  }
};

export default FlyDetailsScreen;
