import React from 'react';
import { View } from 'react-native';
import EntityCarousel from '~/components/common/EntityCarousel/EntityCarousel';
import { EntityCarouselItem } from '~/components/common/EntityCarousel/types';
import EntityDetails from '~/components/common/EntityDetails/EntityDetails';
import ErrorSplash from '~/components/common/ErrorSplash/ErrorSplash';
import LoadingSplash from '~/components/common/LoadingSplash/LoadingSplash';
import { AppScreen } from '~/core/constants';
import { useReduxDispatch, useReduxSelector } from '~/hooks/redux';
import { useToast } from '~/hooks/toast';
import styles from '~/screens/FlyDetailsScreen/styles';
import type { Props } from '~/screens/FlyDetailsScreen/types';
import {
  useGetFlyByIdQuery,
  useAddFlyToUserFavouritesMutation,
  useRemoveFlyFromUserFavouritesMutation,
} from '~/services/flypediaApi';
import {
  addFlyToFavourites as addFlyToFavouritesReducer,
  removeFlyFromFavourites as removeFlyFromFavouritesReducer,
} from '~/store/slices/user';
import { IMITATEES_CAROUSEL_TITLE } from '~/screens/FlyDetailsScreen/constants';

const FlyDetailsScreen: React.FC<Props> = props => {
  const dispatch = useReduxDispatch();
  const toast = useToast();

  const { data, error, isLoading } = useGetFlyByIdQuery(props.route.params.id);
  const [addFlyToUserFavourites, { isLoading: isAddingFlyToUserFavourites }] =
    useAddFlyToUserFavouritesMutation();
  const [
    removeFlyFromUserFavourites,
    { isLoading: isRemovingFlyFromUserFavourites },
  ] = useRemoveFlyFromUserFavouritesMutation();

  const isLoggedIn = useReduxSelector(state => state.user.isLoggedIn);
  const userId = useReduxSelector(state => state.user.id);
  const userFavouriteFlies = useReduxSelector(
    state => state.user.favouriteFlies,
  );

  const imitateeCarouselItems: Array<EntityCarouselItem> =
    data?.imitatees?.map(x => ({
      id: x.id,
      title: x.name,
    })) || [];

  const handlePressImitateeCarouselItem = (id: string): void => {
    props.navigation.navigate(AppScreen.IMITATEE_DETAILS, { id });
  };

  const handleToggleFlyIsFavourite = async (
    isFavourite: boolean,
  ): Promise<void> => {
    let req;
    let reducer;

    if (isFavourite) {
      req = addFlyToUserFavourites;
      reducer = addFlyToFavouritesReducer;
    } else {
      req = removeFlyFromUserFavourites;
      reducer = removeFlyFromFavouritesReducer;
    }

    if (!userId || !data) {
      throw new Error('Oops...');
    }

    const res = await req({ userId, flyId: data.id });

    if ('error' in res) {
      toast.error(res.error.message);
      return;
    }

    toast.success(
      `Fly ${isFavourite ? 'added to' : 'removed from'} favourites`,
    );
    dispatch(reducer(data.id));
  };

  const flyIsFavourite: boolean = userFavouriteFlies
    ? userFavouriteFlies.includes(props.route.params.id)
    : false;

  if (error) {
    return 'status' in error ? (
      <ErrorSplash status={error.status} message={error.message} />
    ) : (
      <ErrorSplash message={error.message} />
    );
  }

  if (isLoading) {
    return <LoadingSplash />;
  }

  if (data) {
    return (
      <View style={styles.container}>
        <EntityDetails
          title={data.name}
          subtitle={data?.types.map(x => x.name).join(', ')}
          style={styles.flyDetails}
          description={data.description}
          showFavouriteToggle={isLoggedIn}
          isFavourite={flyIsFavourite}
          updatedAt={data.updatedAt}
          isLoading={
            isAddingFlyToUserFavourites || isRemovingFlyFromUserFavourites
          }
          onToggleIsFavourite={handleToggleFlyIsFavourite}
        />
        {data.imitatees?.length ? (
          <EntityCarousel
            title={IMITATEES_CAROUSEL_TITLE}
            items={imitateeCarouselItems}
            fallbackImg={require('~/assets/imitateePlaceholder.png')}
            onPressItem={handlePressImitateeCarouselItem}
          />
        ) : null}
      </View>
    );
  }

  return null;
};

export default FlyDetailsScreen;
