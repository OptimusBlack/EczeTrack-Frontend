import React, { memo, useState } from 'react';
import { TouchableOpacity, StyleSheet, Text, View, AsyncStorage } from 'react-native';
import { WhiteBackground } from '../../components/Background';
import Logo from '../../components/Logo';
import Header from '../../components/Header';
import Button from '../../components/Button';
import TextInput from '../../components/TextInput';
import BackButton from '../../components/BackButton';
import { theme } from '../../core/theme';
import { emailValidator, passwordValidator } from '../../core/utils';
import {login} from '../../ApiManager';

import { useTranslation } from 'react-i18next';

const LoginScreen = ({ navigation }) => {
  const { t, i18n } = useTranslation();

  const [email, setEmail] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });

  const _onLoginPressed = async () => {
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);

    if (emailError || passwordError) {
      setEmail({ ...email, error: t(emailError) });
      setPassword({ ...password, error: t(passwordError) });
      return;
    }

    const response = await login(email.value, password.value);
    if (response.code){
        setPassword({...password, error: t(response.message) });
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

      <Header>{t('Welcome back')}</Header>

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

      <View style={styles.forgotPassword}>
        <TouchableOpacity
          onPress={() => navigation.navigate('ForgotPasswordScreen')}
        >
          <Text style={styles.label}>{t('Forgot your password?')}</Text>
        </TouchableOpacity>
      </View>

      <Button mode="contained" onPress={_onLoginPressed}>
        {t('Login')}
      </Button>

      <View style={styles.row}>
        <Text style={styles.label}>{t('Dont have an account?') + ' '}</Text>
        <TouchableOpacity onPress={() => {
          if (i18n.language == "en") {
            navigation.navigate('MedicalDisclaimer');
          } else {
            navigation.navigate('MedicalDisclaimerZH');
          }
        }}>
          <Text style={styles.link}>{t('Sign up')}</Text>
        </TouchableOpacity>
      </View>
    </WhiteBackground>
  );
};

const styles = StyleSheet.create({
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  label: {
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
});

export default memo(LoginScreen);
