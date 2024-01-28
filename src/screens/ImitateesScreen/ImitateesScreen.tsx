import React, { useCallback, useState } from 'react';
import { FlatList } from 'react-native';
import OrbCardListItem from '~/components/common/OrbCardListItem/OrbCardListItem';
import { useIndexImitateesQuery } from '~/services/flypediaApi';
import type { Imitatee } from '~/services/flypediaApi/types';
import type { Props } from '~/screens/ImitateesScreen/types';
import ListEmptyComponent from '~/components/common/ListEmptyComponent/ListEmptyComponent';
import ErrorSplash from '~/components/common/ErrorSplash/ErrorSplash';
import LoadingSplash from '~/components/common/LoadingSplash/LoadingSplash';
import { AppScreen } from '~/core/constants';
import { DEFAULT_ENTITY_PAGE_SIZE } from '~/services/flypediaApi/constants';
import { CONTAINER_HEIGHT } from '~/components/common/OrbCardListItem/constants';
import PaginationControls from '~/components/common/PaginationControls/PaginationControls';

const ImitateesScreen: React.FC<Props> = ({ navigation }) => {
  const [pageNumber, setPageNumber] = useState<number>(1);

  const { data, error, isLoading, isFetching } = useIndexImitateesQuery(
    {
      pageNumber,
      pageSize: DEFAULT_ENTITY_PAGE_SIZE,
    },
    { refetchOnReconnect: true },
  );

  const renderItem = useCallback(
    ({ item }: { item: Imitatee }) => (
      <OrbCardListItem
        id={item.id}
        title={item.name}
        desc={item.description}
        orbImgSrc={require('~/assets/imitateePlaceholder.png')}
        accessibilityLabel="imitatee card"
        accessibilityHint="press to view imitatee details"
        onPress={() =>
          navigation.navigate(AppScreen.IMITATEE_DETAILS, {
            id: item.id,
          })
        }
      />
    ),
    [navigation],
  );

  const ListEmptyStateComponent = useCallback(
    () => <ListEmptyComponent message="No imitatees found" />,
    [],
  );

  const keyExtractor = (item: Imitatee): string => String(item.id);

  const handlePaginationControlsAction = (page: number): void => {
    setPageNumber(page);
  };

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
        getItemLayout={(_data, index) => ({
          length: CONTAINER_HEIGHT,
          offset: 0,
          index,
        })}
        ListFooterComponent={
          <PaginationControls
            pageNumber={data.metadata.pageNumber}
            totalPages={data.metadata.totalPages}
            onGoToPage={handlePaginationControlsAction}
          />
        }
      />
    );
  }

  return null;
};

export default ImitateesScreen;
