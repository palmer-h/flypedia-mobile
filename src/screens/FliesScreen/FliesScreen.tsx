import React, { useCallback, useState } from 'react';
import { FlatList, ActivityIndicator, Text } from 'react-native';
import OrbCardListItem from '~/components/common/OrbCardListItem/OrbCardListItem';
import { useIndexFliesQuery } from '~/services/flyApi/flyApi';
import type { Fly } from '~/services/flyApi/flyApi.types';
import type { Props } from '~/screens/FliesScreen/types';

const FliesScreen: React.FC<Props> = ({ navigation }) => {
  const [pageNumber, setPageNumber] = useState<number>(1);

  const { data, error, isLoading, isFetching } = useIndexFliesQuery({
    pageNumber,
    pageSize: 10,
  });

  const handleListEndReached = (): void => {
    if (!data || pageNumber >= data.metadata.totalPages) {
      return;
    }
    setPageNumber(pageNumber + 1);
  };

  const renderItem = useCallback(
    ({ item }: { item: Fly }) => (
      <OrbCardListItem
        id={item.id}
        title={item.name}
        subtitle={item.types.map(x => x.name).join(', ')}
        desc={item.description}
        orbImgSrc={require('~/assets/flyPlaceholder.png')}
        accessibilityLabel="fly card"
        accessibilityHint="press to view fly details"
        onPress={() => navigation.navigate('Fly Details', { id: item.id })}
      />
    ),
    [navigation],
  );

  const keyExtractor = (item: Fly): string => String(item.id);

  if (error) {
    return <Text>Error</Text>;
  }

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (data) {
    return (
      <FlatList
        data={data.results}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        onEndReached={handleListEndReached}
        ListFooterComponent={
          isFetching ? () => <ActivityIndicator /> : undefined
        }
      />
    );
  }
};

export default FliesScreen;
