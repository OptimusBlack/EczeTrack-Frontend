import React, { memo, useState } from 'react';
import { WhiteBackground } from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';
import Paragraph from '../components/Paragraph';
import { theme } from '../core/theme';

import { ActivityIndicator, AsyncStorage } from 'react-native';
import * as Linking from 'expo-linking';

const HomeScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(true);

  const getUser = AsyncStorage.getItem('user');
  const getURL = Linking.parseInitialURLAsync();

  Promise.all([getUser, getURL])
    .then(([user, { path, queryParams }]) => {
      if(user)
        navigation.navigate('Dashboard');
      else {
        console.log('Opening with URL:', queryParams);
        if(queryParams && queryParams.token)
          navigation.navigate('ResetPassword', {token: queryParams.token});
        else
          setLoading(false);
      }
  });

  if(loading){
    return (
      <WhiteBackground>
        <Logo />
        <ActivityIndicator color={theme.colors.primary} size={'large'}/>
      </WhiteBackground>
    );
  }
  return (
    <WhiteBackground>
      <Logo />
      <Header>EczeTrack</Header>

      <Paragraph>
        Smart Eczema Symptom Tracker
      </Paragraph>
      <Button mode="contained" onPress={() => navigation.navigate('LoginScreen')}>
        Login
      </Button>
      <Button
        mode="outlined"
        onPress={() => navigation.navigate('MedicalDisclaimer')}
      >
        Sign Up
      </Button>
    </WhiteBackground>
)};

export default memo(HomeScreen);
