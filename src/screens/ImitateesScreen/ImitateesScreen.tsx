import React, { useCallback } from 'react';
import { FlatList } from 'react-native';
import OrbCardListItem from '~/components/common/OrbCardListItem/OrbCardListItem';
import { useIndexImitateesQuery } from '~/services/flypediaApi';
import type { Imitatee } from '~/services/flypediaApi/types';
import type { Props } from '~/screens/ImitateesScreen/types';
import ListEmptyComponent from '~/components/common/ListEmptyComponent/ListEmptyComponent';
import ErrorSplash from '~/components/common/ErrorSplash/ErrorSplash';
import LoadingSplash from '~/components/common/LoadingSplash/LoadingSplash';
import { AppScreen } from '~/core/constants';

const ImitateesScreen: React.FC<Props> = ({ navigation }) => {
  const { data, error, isLoading, isFetching } = useIndexImitateesQuery({
    pageNumber: 1,
    pageSize: 999,
  });

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

export default ImitateesScreen;
