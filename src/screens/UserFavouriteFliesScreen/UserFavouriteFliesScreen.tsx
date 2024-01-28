import React, { useCallback, useState } from 'react';
import { FlatList } from 'react-native';
import OrbCardListItem from '~/components/common/OrbCardListItem/OrbCardListItem';
import { useIndexUserFavouriteFliesQuery } from '~/services/flypediaApi';
import type { Fly } from '~/services/flypediaApi/types';
import type { Props } from '~/screens/UserFavouriteFliesScreen/types';
import ListEmptyComponent from '~/components/common/ListEmptyComponent/ListEmptyComponent';
import ErrorSplash from '~/components/common/ErrorSplash/ErrorSplash';
import LoadingSplash from '~/components/common/LoadingSplash/LoadingSplash';
import { CONTAINER_HEIGHT } from '~/components/common/OrbCardListItem/constants';
import { useReduxSelector } from '~/hooks/redux';
import { AppScreen } from '~/core/constants';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { EMPTY_STATE_MSG } from '~/screens/UserFavouriteFliesScreen/constants';
import PaginationControls from '~/components/common/PaginationControls/PaginationControls';
import { DEFAULT_ENTITY_PAGE_SIZE } from '~/services/flypediaApi/constants';

const UserFavouriteFliesScreen: React.FC<Props> = ({ navigation }) => {
  const userId = useReduxSelector(state => state.user.id);

  const [pageNumber, setPageNumber] = useState<number>(1);

  if (!userId) {
    throw new Error('Oops...');
  }

  const { data, error, isLoading, isFetching } =
    useIndexUserFavouriteFliesQuery(
      {
        pageNumber,
        pageSize: DEFAULT_ENTITY_PAGE_SIZE,
        userId,
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
    () => <ListEmptyComponent message={EMPTY_STATE_MSG} icon={faHeart} />,
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
      <FlatList
        data={data.results}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        getItemLayout={(_data, index) => ({
          length: CONTAINER_HEIGHT,
          offset: 0,
          index,
        })}
        contentContainerStyle={{ height: '100%' }}
        ListEmptyComponent={ListEmptyStateComponent}
        ListFooterComponent={
          <PaginationControls
            pageNumber={pageNumber}
            totalPages={data.metadata.totalPages || 0}
            onGoToPage={handlePaginationControlsAction}
          />
        }
      />
    );
  }

  return null;
};

export default UserFavouriteFliesScreen;
