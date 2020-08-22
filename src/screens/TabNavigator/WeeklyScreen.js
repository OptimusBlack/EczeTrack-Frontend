import React, { memo, useState } from 'react';
import { GreenBackground } from '../../components/Background';
import Header from '../../components/Header';
import { AsyncStorage } from 'react-native';
import Button from '../../components/Button';


const SettingScreen = ({ navigation }) => {
  const onLogout = () => {
    AsyncStorage.removeItem('user', () => navigation.navigate('HomeScreen'));
  };


  return (
    <GreenBackground>
      <Header>Weekly Screen</Header>

      <Button mode="outlined" onPress={onLogout}>
        Logout
      </Button>
    </GreenBackground>
  );
};

export default memo(SettingScreen);
