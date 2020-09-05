import React, { memo, useState, useEffect } from 'react';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { emailValidator } from '../../core/utils';
import { WhiteBackground } from '../../components/Background';
import BackButton from '../../components/BackButton';
import Logo from '../../components/Logo';
import Header from '../../components/Header';
import TextInput from '../../components/TextInput';
import { theme } from '../../core/theme';
import Button from '../../components/Button';
import {forgotPassword} from '../../ApiManager';

import { useTranslation } from 'react-i18next';

const ForgotPasswordScreen = ({ navigation }) => {
  const { t, i18n } = useTranslation();

  const [email, setEmail] = useState({ value: '', error: '' });
  const [timer, setTimer] = useState(0);
  const [loading, setLoading] = useState(false);
  let interval;


  const _onSendPressed = async () => {
    const emailError = emailValidator(email.value);

    if (emailError) {
      setEmail({...email, error: t(emailError)});
      return;
    }
    setLoading(true);
    const response = await forgotPassword(email.value);
    setLoading(false);
    if(response && response.code)
      setEmail({...email, error: t(response.message)});
    else{
      setTimer(60);
    }
      // navigation.navigate('ResetPassword');
  };

  useEffect(() => {
    if(timer === 60){
      interval = setInterval( ()=> {
        setTimer(prevTimer => {
          if(prevTimer <= 1){
            clearInterval(interval);
            return 0;
          }
          return prevTimer-1;
        });
      }, 1000);
    }
    else if(timer === 0){
      clearInterval(interval);
    }
  }, [timer]);


  return (
    <WhiteBackground>
      <BackButton goBack={() => navigation.navigate('LoginScreen')} />

      <Logo />

      <Header>{t('Reset Password')}</Header>

      <TextInput
        label={t("Email")}
        returnKeyType="done"
        value={email.value}
        onChangeText={text => setEmail({ value: text, error: '' })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />
      {timer > 0 && <Text style={styles.checkemail}>Check your email for instructions</Text>}
      <Button
        mode="contained"
        onPress={_onSendPressed}
        style={styles.button}
        disabled={timer>0 || loading}>
        {loading ? <ActivityIndicator color={theme.colors.primary}/> : timer ? 'Resend instructions in ' + timer + 's' : t('Send Reset Instructions')}
      </Button>

      <TouchableOpacity
        style={styles.back}
        onPress={() => navigation.navigate('LoginScreen')}
      >
        <Text style={styles.label}>← {t('Back to login')}</Text>
      </TouchableOpacity>
    </WhiteBackground>
  );
};

const styles = StyleSheet.create({
  back: {
    width: '100%',
    marginTop: 12,
  },
  button: {
    marginTop: 12,
  },
  label: {
    color: theme.colors.secondary,
    width: '100%',
  },
  checkemail: {
    color: theme.colors.primary,
    alignSelf: 'center',
  }
});

export default memo(ForgotPasswordScreen);
