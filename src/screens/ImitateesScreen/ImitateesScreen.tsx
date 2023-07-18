import React, { useCallback, useState } from 'react';
import { ActivityIndicator, FlatList, Text } from 'react-native';
import OrbCardListItem from '~/components/common/OrbCardListItem/OrbCardListItem';
import { useIndexImitateesQuery } from '~/services/flyApi/flyApi';
import type { Imitatee } from '~/services/flyApi/flyApi.types';
import type { Props } from '~/screens/ImitateesScreen/types';

const ImitateesScreen: React.FC<Props> = ({ navigation }) => {
  const [pageNumber, setPageNumber] = useState<number>(1);

  const { data, error, isLoading } = useIndexImitateesQuery({
    pageNumber,
    pageSize: 20,
  });

  const handleListEndReached = (): void => {
    if (!data || pageNumber >= data.metadata.totalPages) {
      return;
    }
    setPageNumber(pageNumber + 1);
  };

  const renderItem = useCallback(
    ({ item }: { item: Imitatee }) => (
      <OrbCardListItem
        id={item.id}
        title={item.name}
        desc={item.description}
        orbImgSrc={0}
        accessibilityLabel="imitatee card"
        accessibilityHint="press to view imitatee details"
        onPress={() => navigation.navigate('Imitatee Details', { id: item.id })}
      />
    ),
    [navigation],
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
        onEndReached={handleListEndReached}
      />
    );
  }
};

export default ImitateesScreen;
