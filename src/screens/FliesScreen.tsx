import React, { useCallback } from 'react';
import { FlatList, ActivityIndicator, Text } from 'react-native';
import OrbCardListItem from '~/components/common/OrbCardListItem/OrbCardListItem';
import { useIndexFliesQuery } from '~/services/flyApi/flyApi';
import { Fly } from '~/services/flyApi/flyApi.types';

const FliesScreen: React.FC = () => {
  const { data, error, isLoading } = useIndexFliesQuery({
    pageNumber: 1,
    pageSize: 20,
  });

  const renderItem = useCallback(
    ({ item }: { item: Fly }) => (
      <OrbCardListItem
        id={item.id}
        title={item.name}
        subtitle={item.types.map(x => x.name).join(', ')}
        desc={item.description}
      />
    ),
    [],
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
      />
    );
  }
};

export default FliesScreen;
