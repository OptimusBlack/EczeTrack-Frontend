import React, { memo, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, AsyncStorage } from 'react-native';
import { WhiteBackground } from '../../components/Background';
import Logo from '../../components/Logo';
import Header from '../../components/Header';
import Button from '../../components/Button';
import TextInput from '../../components/TextInput';
import BackButton from '../../components/BackButton';
import { theme } from '../../core/theme';
import {
  emailValidator,
  passwordValidator,
  nameValidator,
} from '../../core/utils';
import {register} from '../../ApiManager';

import { useTranslation } from 'react-i18next';

const RegisterScreen = ({ navigation }) => {
  const { t, i18n } = useTranslation();

  const [name, setName] = useState({ value: '', error: '' });
  const [email, setEmail] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });

  const _onSignUpPressed = async () => {
    const nameError = nameValidator(name.value);
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);

    if (emailError || passwordError || nameError) {
      setName({ ...name, error: t(nameError) });
      setEmail({ ...email, error: t(emailError) });
      setPassword({ ...password, error: t(passwordError) });
      return;
    }

    const response = await register(name.value, email.value, password.value);
    if (response.code){
      if (response.message === "Email already taken"){
        setEmail({ ...email, error: t(response.message) });
      } else {
        setPassword({ ...password, error: t(response.message) });
      }
    }
    else {
      AsyncStorage.setItem('user', JSON.stringify(response));
      navigation.navigate('TabNavigator');
    }
  };

  return (
    <WhiteBackground>
      <BackButton goBack={() => navigation.navigate('HomeScreen')} />

      <Logo />

      <Header>{t('Create Account')}</Header>

      <TextInput
        label={t("Name")}
        returnKeyType="next"
        value={name.value}
        onChangeText={text => setName({ value: text, error: '' })}
        error={!!name.error}
        errorText={name.error}
      />

      <TextInput
        label={t("Email")}
        returnKeyType="next"
        value={email.value}
        onChangeText={text => setEmail({ value: text, error: '' })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />

      <TextInput
        label={t("Password")}
        returnKeyType="done"
        value={password.value}
        onChangeText={text => setPassword({ value: text, error: '' })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />

      <Button mode="contained" onPress={_onSignUpPressed} style={styles.button}>
        {t('Sign up')}
      </Button>

      <View style={styles.row}>
        <Text style={styles.label}>{t('Already have an account?') + ' '}</Text>
        <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
          <Text style={styles.link}>{t('Login')}</Text>
        </TouchableOpacity>
      </View>
    </WhiteBackground>
  );
};

const styles = StyleSheet.create({
  label: {
    color: theme.colors.secondary,
  },
  button: {
    marginTop: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
});

export default memo(RegisterScreen);
