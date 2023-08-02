import React, { useCallback, useState } from 'react';
import { FlatList } from 'react-native';
import OrbCardListItem from '~/components/common/OrbCardListItem/OrbCardListItem';
import { useIndexImitateesQuery } from '~/services/flyApi';
import type { Imitatee } from '~/services/flyApi/types';
import type { Props } from '~/screens/ImitateesScreen/types';
import ListEmptyComponent from '~/components/common/ListEmptyComponent/ListEmptyComponent';
import ErrorSplash from '~/components/common/ErrorSplash/ErrorSplash';
import LoadingSplash from '~/components/common/LoadingSplash/LoadingSplash';

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
        id={item.externalId}
        title={item.name}
        desc={item.description}
        orbImgSrc={0}
        accessibilityLabel="imitatee card"
        accessibilityHint="press to view imitatee details"
        onPress={() =>
          navigation.navigate('Imitatee Details', { id: item.externalId })
        }
      />
    ),
    [navigation],
  );

  const ListEmptyStateComponent = useCallback(
    () => <ListEmptyComponent message="No imitatees found" />,
    [],
  );

  const keyExtractor = (item: Imitatee): string => String(item.externalId);

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
        renderItem={renderItem}
        ListEmptyComponent={ListEmptyStateComponent}
        onEndReached={handleListEndReached}
      />
    );
  }

  return null;
};

export default ImitateesScreen;
