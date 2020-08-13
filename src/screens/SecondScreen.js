import React, { memo, useState } from 'react';
import { GreenBackground } from '../components/Background';
import Header from '../components/Header';
import { AsyncStorage } from 'react-native';
import Button from '../components/Button';


const SecondScreen = ({ navigation }) => {
  const onLogout = () => {
    AsyncStorage.removeItem('user', () => navigation.navigate('HomeScreen'));
  };


  return (
    <GreenBackground>
      <Header>Second Screen</Header>

      <Button mode="outlined" onPress={onLogout}>
        Logout
      </Button>
    </GreenBackground>
  );
};

export default memo(SecondScreen);
