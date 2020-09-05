import React, { memo, useState, useEffect } from 'react';
import { WhiteBackground } from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';
import Paragraph from '../components/Paragraph';
import { theme } from '../core/theme';
import LanguagePicker from '../components/LanguagePicker';

import { useTranslation } from 'react-i18next';

import { refreshToken } from '../ApiManager.js'

import { ActivityIndicator, AsyncStorage, Text, View } from 'react-native';
import * as Linking from 'expo-linking';

const HomeScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(true);

  const getUser = AsyncStorage.getItem('user');
  const getURL = Linking.parseInitialURLAsync();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    Promise.all([getUser, getURL])
      .then(async ([user, { path, queryParams }]) => {
        if (user) {
          user = JSON.parse(user);
          console.log("USER:", user);
          setLoading(false);
          if (new Date() > new Date(user.tokens.refresh.expires))
            setLoading(false);
          else if (new Date() < new Date(user.tokens.access.expires))
            navigation.navigate('TabNavigator');
          else {
            const res = await refreshToken(user.tokens.refresh.token);
            if (res.code)
              setLoading(false);
            else {
              user.tokens = res;
              AsyncStorage.setItem('user', JSON.stringify(user));
              navigation.navigate('TabNavigator');
            }
          }

        }
        else {
          if (queryParams && queryParams.token)
            navigation.navigate('ResetPassword', { token: queryParams.token });
          else
            setLoading(false);
        }
      });
  }, []);


  if (loading) {
    return (
      <WhiteBackground>
        <Logo />
        <ActivityIndicator color={theme.colors.primary} size={'large'} />
      </WhiteBackground>
    );
  }
  return (
    <WhiteBackground>
      <Logo />
      <Header>{t('EczeTrack')}</Header>

      <Paragraph>
        {t('Smart Eczema Symptom Tracker')}
      </Paragraph>
      <Button mode="contained" onPress={() => navigation.navigate('LoginScreen')}>
        {t('LOGIN')}
      </Button>
      <Button
        mode="outlined"
        onPress={() => {
          if (i18n.language == "en") {
            navigation.navigate('MedicalDisclaimer');
          } else {
            navigation.navigate('MedicalDisclaimerZH');
          }
        }}
      >
        {t('SIGN UP')}
      </Button>

      <View style={{flexDirection: 'row'}} >
        <Text>{t('Select Language') + ': '}</Text>
        <LanguagePicker blackText />
      </View>

    </WhiteBackground>
  )
};

export default memo(HomeScreen);
