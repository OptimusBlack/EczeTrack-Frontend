import React, { memo, useState } from 'react';
import { WhiteBackground } from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';
import Paragraph from '../components/Paragraph';
import { theme } from '../core/theme';

import {refreshToken} from '../ApiManager.js'

import { ActivityIndicator, AsyncStorage } from 'react-native';
import * as Linking from 'expo-linking';

const HomeScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(true);

  const getUser = AsyncStorage.getItem('user');
  const getURL = Linking.parseInitialURLAsync();

  Promise.all([getUser, getURL])
    .then(async ([user, { path, queryParams }]) => {
      if(user){
        user = JSON.parse(user);
        console.log("USER:", user);
        if(new Date() > new Date(user.tokens.refresh.expires))
          setLoading(false);
        else if(new Date() < new Date(user.tokens.access.expires))
          navigation.navigate('TabNavigator');
        else{
          const res = await refreshToken(user.tokens.refresh.token);
          if(res.code)
            setLoading(false);
          else{
            user.tokens = res;
            AsyncStorage.setItem('user', JSON.stringify(user));
            navigation.navigate('TabNavigator');
          }
        }

      }
      else {
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
