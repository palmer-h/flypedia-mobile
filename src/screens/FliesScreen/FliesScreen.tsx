import React, { useCallback } from 'react';
import { FlatList } from 'react-native';
import OrbCardListItem from '~/components/common/OrbCardListItem/OrbCardListItem';
import { useIndexFliesQuery } from '~/services/flypediaApi';
import type { Fly } from '~/services/flypediaApi/types';
import type { Props } from '~/screens/FliesScreen/types';
import ListEmptyComponent from '~/components/common/ListEmptyComponent/ListEmptyComponent';
import ErrorSplash from '~/components/common/ErrorSplash/ErrorSplash';
import LoadingSplash from '~/components/common/LoadingSplash/LoadingSplash';
import { AppScreen } from '~/core/constants';

const FliesScreen: React.FC<Props> = ({ navigation }) => {
  const { data, error, isLoading, isFetching } = useIndexFliesQuery({
    pageNumber: 1,
    pageSize: 999,
  });

  const renderItem = ({ item }: { item: Fly }) => (
    <OrbCardListItem
      id={item.id}
      title={item.name}
      subtitle={item.types.map(x => x.name).join(', ')}
      desc={item.description}
      orbImgSrc={require('~/assets/flyPlaceholder.png')}
      accessibilityLabel="fly card"
      accessibilityHint="press to view fly details"
      onPress={() =>
        navigation.navigate(AppScreen.FLY_DETAILS, { id: item.id })
      }
    />
  );

  const ListEmptyStateComponent = useCallback(
    () => <ListEmptyComponent message="No flies found" />,
    [],
  );

  const keyExtractor = (item: Fly): string => String(item.id);

  if (error) {
    return 'status' in error ? (
      <ErrorSplash status={error.status} message={error.message} />
    ) : (
      <ErrorSplash message={error.message} />
    );
  }

  if (isLoading || isFetching) {
    return <LoadingSplash />;
  }

  if (data) {
    return (
      <FlatList
        data={data.results}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        ListEmptyComponent={ListEmptyStateComponent}
      />
    );
  }

  return null;
};

export default FliesScreen;
