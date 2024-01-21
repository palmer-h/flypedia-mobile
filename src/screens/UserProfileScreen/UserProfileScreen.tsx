import React from 'react';
import { Text, View } from 'react-native';
import Button from '~/components/common/Button/Button';
import { useReduxDispatch, useReduxSelector } from '~/hooks/redux';
import type { Props } from '~/screens/UserProfileScreen/types';
import { logout } from '~/store/slices/user';

const UserProfileScreen: React.FC<Props> = () => {
  const dispatch = useReduxDispatch();

  const user = useReduxSelector(state => state.user);

  return (
    <View>
      <Text>Email: {user.email}</Text>
      <Button title="Logout" onPress={() => dispatch(logout())} />
    </View>
  );
};

export default UserProfileScreen;
