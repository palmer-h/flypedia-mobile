import React from 'react';
import { View } from 'react-native';
import EntityCarousel from '~/components/common/EntityCarousel/EntityCarousel';
import { EntityCarouselItem } from '~/components/common/EntityCarousel/types';
import EntityDetails from '~/components/common/EntityDetails/EntityDetails';
import ErrorSplash from '~/components/common/ErrorSplash/ErrorSplash';
import LoadingSplash from '~/components/common/LoadingSplash/LoadingSplash';
import { MainAppNavigatorScreen } from '~/navigators/MainAppNavigator/constants';
import styles from '~/screens/FlyDetailsScreen/styles';
import type { Props } from '~/screens/FlyDetailsScreen/types';
import { useGetFlyByIdQuery } from '~/services/flyApi';

const FlyDetailsScreen: React.FC<Props> = props => {
  const { data, error, isLoading } = useGetFlyByIdQuery(props.route.params.id);

  console.log(props.route.params);

  const imitateeCarouselItems: Array<EntityCarouselItem> =
    data?.imitatees?.map(x => ({
      id: x.id,
      title: x.name,
    })) || [];

  const handlePressImitateeCarouselItem = (id: string): void => {
    props.navigation.navigate(MainAppNavigatorScreen.IMITATEE_DETAILS, { id });
  };

  if (error) {
    return 'status' in error ? (
      <ErrorSplash status={error.status} message={error.data as string} />
    ) : (
      <ErrorSplash message={error.message} />
    );
  }

  if (isLoading) {
    return <LoadingSplash />;
  }

  if (data) {
    return (
      <View style={styles.container}>
        <EntityDetails
          title={data.name}
          subtitle={data?.types.map(x => x.name).join(', ')}
          style={styles.flyDetails}
          description={data.description}
        />
        {data.imitatees?.length ? (
          <EntityCarousel
            title="Imitates"
            items={imitateeCarouselItems}
            onPressItem={handlePressImitateeCarouselItem}
          />
        ) : null}
      </View>
    );
  }

  return null;
};

export default FlyDetailsScreen;
