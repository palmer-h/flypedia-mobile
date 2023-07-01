import React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { useIndexFliesQuery } from '~/services/flyApi/flyApi';

const FliesScreen: React.FC = () => {
  const { data, error, isLoading } = useIndexFliesQuery({
    pageNumber: 1,
    pageSize: 20,
  });

  if (data) {
    return (
      <View>
        {data.results.map(x => (
          <Text key={x.id}>{x.name}</Text>
        ))}
      </View>
    );
  }

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>Error</Text>;
  }
};

export default FliesScreen;
