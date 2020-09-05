import React, { memo, useState, useEffect } from 'react';
import { GreenBackground } from '../../components/Background';
import Header from '../../components/Header';
import { AsyncStorage, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import Button from '../../components/Button';
import LanguagePicker from '../../components/LanguagePicker';

import {theme} from '../../core/theme';

import { useTranslation } from 'react-i18next';

const SettingScreen = ({ navigation }) => {
  const { t } = useTranslation();

  const [user, setUser] = useState(false);

  const getUser = async ()=>{
    let res = await AsyncStorage.getItem('user');
    res = JSON.parse(res);
    if(res && res.user)
      setUser(res.user);
    else
      setUser(false);
  };

  useEffect(() => {getUser()}, []);

  const onLogout = () => {
    AsyncStorage.removeItem('user', () => navigation.navigate('HomeScreen'));
  };

  return (
    <GreenBackground>
      <Header white style={styles.header}>{t('Settings')}</Header>
      <View style={styles.textContainer}>
        <Text style={styles.textLabel}>{t('Name')}:</Text>
        <Text style={styles.textLabel}>{user.name}</Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.textLabel}>{t('Email')}:</Text>
        <Text style={styles.textLabel}>{user.email}</Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.textLabel}>Language/語言:</Text>
        <LanguagePicker/>
      </View>

      <Button mode="outlined" onPress={onLogout}>
        Logout
      </Button>
    </GreenBackground>
  );
};

const styles = StyleSheet.create({
  header:{
    fontSize: 20
  },
  textContainer: {
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    alignSelf: 'stretch',
    paddingVertical: 5,
    borderBottomColor: theme.colors.primary,
    borderBottomWidth: 1,
    marginBottom: 10,
    flexDirection: 'row',
  },
  textLabel:{
    fontSize: 16,
    color: 'white',
  }
});

export default memo(SettingScreen);
