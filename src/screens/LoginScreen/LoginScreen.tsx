import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { Props } from '~/screens/LoginScreen/types';
import styles from './styles';
import { useLoginMutation } from '~/services/flypediaApi';
import Button from '~/components/common/Button/Button';
import { useReduxDispatch } from '~/hooks/redux';
import { onLogin } from '~/store/slices/user';

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const dispatch = useReduxDispatch();

  const [login, { isLoading }] = useLoginMutation();

  const [email, setEmail] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
  const [formError, setFormError] = useState<string>('');

  const handleChangeEmailField = (val: string): void => {
    setEmailError('');
    setEmail(val);
  };

  const handleChangePasswordField = (val: string): void => {
    setPasswordError('');
    setPassword(val);
  };

  const validateForm = (): boolean => {
    let isError: boolean = false;

    if (!email) {
      setEmailError('Email is required');
      isError = true;
    }

    if (!password) {
      setPasswordError('Password is required');
      isError = true;
    }

    return !isError;
  };

  const handleSubmitForm = async (): Promise<void> => {
    setFormError('');

    if (!validateForm()) {
      return;
    }

    const res = (await login({ email, password })) as any;
    if (res.error) {
      setFormError(res.error.data.message);
      return;
    }
    dispatch(onLogin(res.data));
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
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
        <Text style={styles.formError}>{formError}</Text>
        <View style={styles.buttonContainer}>
          <Button
            title="Login"
            onPress={handleSubmitForm}
            accessibilityLabel="login button"
            disabled={isLoading}
          />
        </View>
      </SafeAreaView>
    </View>
  );
};

export default LoginScreen;
