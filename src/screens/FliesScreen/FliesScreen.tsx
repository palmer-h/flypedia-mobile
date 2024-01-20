import React, { useCallback, useState } from 'react';
import { FlatList, ActivityIndicator } from 'react-native';
import OrbCardListItem from '~/components/common/OrbCardListItem/OrbCardListItem';
import { useIndexFliesQuery } from '~/services/flyApi';
import type { Fly } from '~/services/flyApi/types';
import type { Props } from '~/screens/FliesScreen/types';
import ListEmptyComponent from '~/components/common/ListEmptyComponent/ListEmptyComponent';
import ErrorSplash from '~/components/common/ErrorSplash/ErrorSplash';
import LoadingSplash from '~/components/common/LoadingSplash/LoadingSplash';
import { CONTAINER_HEIGHT } from '~/components/common/OrbCardListItem/constants';
import { MainAppNavigatorScreen } from '~/navigators/MainAppNavigator/constants';

const FliesScreen: React.FC<Props> = ({ navigation }) => {
  const [pageNumber, setPageNumber] = useState<number>(1);

  const { data, error, isLoading, isFetching } = useIndexFliesQuery({
    pageNumber,
    pageSize: 10,
  });

  const handleListEndReached = (): void => {
    console.log(isFetching);
    if (isFetching || !data || pageNumber >= data.metadata.totalPages) {
      return;
    }
    setPageNumber(pageNumber + 1);
  };

  const handleRefresh = (): void => {
    setPageNumber(1);
  };

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
        navigation.navigate(MainAppNavigatorScreen.FLY_DETAILS, { id: item.id })
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
      <FlatList
        data={data.results}
        keyExtractor={keyExtractor}
        refreshing={isLoading}
        onRefresh={handleRefresh}
        renderItem={renderItem}
        onEndReached={handleListEndReached}
        getItemLayout={(_data, index) => ({
          length: CONTAINER_HEIGHT,
          offset: 0,
          index,
        })}
        ListEmptyComponent={ListEmptyStateComponent}
        ListFooterComponent={isFetching ? ActivityIndicator : undefined}
      />
    );
  }

  return null;
};

export default FliesScreen;
