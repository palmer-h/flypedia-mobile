import React from 'react';
import { Text, View } from 'react-native';
import EntityDetails from '~/components/common/EntityDetails/EntityDetails';
import OrbCardListItem from '~/components/common/OrbCardListItem/OrbCardListItem';
import type { Props } from '~/screens/ImitateeDetailsScreen/types';
import { useGetImitateeByIdQuery } from '~/services/flyApi/flyApi';
import theme from '~/theme';

const ImitateeDetailsScreen: React.FC<Props> = props => {
  const { data, error, isLoading } = useGetImitateeByIdQuery(
    props.route.params.id,
  );

  if (isLoading) {
    return <Text>Loading</Text>;
  }

  if (error) {
    return <Text>Error</Text>;
  }

  if (data) {
    return (
      <View>
        <EntityDetails
          title={data.name}
          description={data.description}
          style={{ padding: theme.spacing.screenPadding }}
        />
      </View>
    );
  }
};

export default ImitateeDetailsScreen;
