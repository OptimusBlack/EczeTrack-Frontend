import React, { memo } from 'react';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Paragraph from '../components/Paragraph';
import Button from '../components/Button';
import { AsyncStorage } from 'react-native';


const Dashboard = ({ navigation }) => {
  const onLogout = () => {
    AsyncStorage.removeItem('user', () => navigation.navigate('HomeScreen'));
  };
  return (
    <Background>
      <Logo />
      <Header>Let’s start</Header>
      <Paragraph>
        Your amazing app starts here. Open you favourite code editor and start
        editing this project.
      </Paragraph>
      <Button mode="outlined" onPress={onLogout}>
        Logout
      </Button>
    </Background>
)};

export default memo(Dashboard);
