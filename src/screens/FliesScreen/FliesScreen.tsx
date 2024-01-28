import React, { useCallback, useState } from 'react';
import { FlatList } from 'react-native';
import OrbCardListItem from '~/components/common/OrbCardListItem/OrbCardListItem';
import { useIndexFliesQuery } from '~/services/flypediaApi';
import type { Fly } from '~/services/flypediaApi/types';
import type { Props } from '~/screens/FliesScreen/types';
import ListEmptyComponent from '~/components/common/ListEmptyComponent/ListEmptyComponent';
import ErrorSplash from '~/components/common/ErrorSplash/ErrorSplash';
import LoadingSplash from '~/components/common/LoadingSplash/LoadingSplash';
import { AppScreen } from '~/core/constants';
import PaginationControls from '~/components/common/PaginationControls/PaginationControls';

const FliesScreen: React.FC<Props> = ({ navigation }) => {
  const [pageNumber, setPageNumber] = useState<number>(1);

  const { data, error, isLoading, isFetching } = useIndexFliesQuery(
    {
      pageNumber,
      pageSize: 30,
    },
    { refetchOnReconnect: true },
  );

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
      <React.Fragment>
        <FlatList
          data={data.results}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          ListEmptyComponent={ListEmptyStateComponent}
          ListFooterComponent={
            <PaginationControls
              pageNumber={pageNumber}
              totalPages={data.metadata.totalPages}
              onGoToPage={handlePaginationControlsAction}
            />
          }
        />
      </React.Fragment>
    );
  }

  return null;
};

export default FliesScreen;
