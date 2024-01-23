import React from 'react';
import { View } from 'react-native';
import EntityCarousel from '~/components/common/EntityCarousel/EntityCarousel';
import EntityDetails from '~/components/common/EntityDetails/EntityDetails';
import type { Props } from '~/screens/ImitateeDetailsScreen/types';
import { useGetImitateeByIdQuery } from '~/services/flypediaApi';
import styles from '~/screens/ImitateeDetailsScreen/styles';
import { EntityCarouselItem } from '~/components/common/EntityCarousel/types';
import ErrorSplash from '~/components/common/ErrorSplash/ErrorSplash';
import LoadingSplash from '~/components/common/LoadingSplash/LoadingSplash';
import { AppScreen } from '~/core/constants';

const ImitateeDetailsScreen: React.FC<Props> = props => {
  const { data, error, isLoading } = useGetImitateeByIdQuery(
    props.route.params.id,
  );

  const flyCarouselItems: Array<EntityCarouselItem> =
    data?.flies?.map(x => ({
      id: x.id,
      title: x.name,
    })) || [];

  const handlePressFlyCarouselItem = (id: string): void => {
    props.navigation.navigate(AppScreen.FLY_DETAILS, { id });
  };

  if (error) {
    return 'status' in error ? (
      <ErrorSplash status={error.status} message={error.message} />
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
          description={data.description}
          style={styles.imitateeDetails}
        />
        {data.flies?.length ? (
          <EntityCarousel
            title="Imitate using"
            items={flyCarouselItems}
            onPressItem={handlePressFlyCarouselItem}
          />
        ) : null}
      </View>
    );
  }

  return null;
};

export default ImitateeDetailsScreen;
