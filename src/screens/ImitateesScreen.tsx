import React, { useCallback } from 'react';
import { ActivityIndicator, FlatList, Text } from 'react-native';
import OrbCardListItem from '~/components/common/OrbCardListItem/OrbCardListItem';
import { useIndexImitateesQuery } from '~/services/flyApi/flyApi';
import { Imitatee } from '~/services/flyApi/flyApi.types';

const ImitateesScreen: React.FC = () => {
  const { data, error, isLoading } = useIndexImitateesQuery({
    pageNumber: 1,
    pageSize: 20,
  });

  const renderItem = useCallback(
    ({ item }: { item: Imitatee }) => (
      <OrbCardListItem id={item.id} title={item.name} desc={item.description} />
    ),
    [],
  );

  const keyExtractor = (item: Imitatee): string => String(item.id);

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

export default ImitateesScreen;
