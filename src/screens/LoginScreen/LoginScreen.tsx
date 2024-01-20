import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { Props } from '~/screens/LoginScreen/types';
import styles from './styles';

const LoginScreen: React.FC<Props> = () => {
  const [email, setEmail] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');

  const handleChangeEmailField = (val: string): void => {
    setEmailError('Yo!');
    setEmail(val);
  };

  const handleChangePasswordField = (val: string): void => {
    setPasswordError('');
    setPassword(val);
  };

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <View style={styles.inputContainer}>
          <TextInput
            onChangeText={handleChangeEmailField}
            value={email}
            keyboardType="email-address"
            style={styles.nativeInput}
            placeholder="Email"
          />
          <Text style={styles.inputError}>{emailError}</Text>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            onChangeText={handleChangePasswordField}
            secureTextEntry={true}
            value={password}
            style={styles.nativeInput}
            placeholder="Password"
          />
          <Text style={styles.inputError}>{passwordError}</Text>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default LoginScreen;
