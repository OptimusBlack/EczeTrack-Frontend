import React, { memo, useState } from 'react';
import { PlainBackground } from '../components/Background';
import Header from '../components/Header';
import { AsyncStorage } from 'react-native';
import Button from '../components/Button';


const SecondScreen = ({ navigation }) => {
  const onLogout = () => {
    AsyncStorage.removeItem('user', () => navigation.navigate('HomeScreen'));
  };


  return (
    <PlainBackground>
      <Header>Second Screen</Header>

      <Button mode="outlined" onPress={onLogout}>
        Logout
      </Button>
    </PlainBackground>
  );
};

export default memo(SecondScreen);
