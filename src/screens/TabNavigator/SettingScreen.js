import React, { memo, useState, useEffect } from 'react';
import { GreenBackground } from '../../components/Background';
import Header from '../../components/Header';
import { AsyncStorage, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import Button from '../../components/Button';
import {Picker} from '@react-native-community/picker';

import {theme} from '../../core/theme'

const SettingScreen = ({ navigation }) => {
  const [user, setUser] = useState(false);

  const [showPicker, setShowPicker] = useState(false);
  const [currentLang, setCurrentLang] = useState({label: 'English', value: 'en'});

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

  const _onLanguageChange = (itemValue) => {
    let newLang = {
      label: itemValue === 'en' ? 'English' : 'Chinese',
      value: itemValue
    };
    setCurrentLang(newLang);
    setShowPicker(false)
  };


  return (
    <GreenBackground>
      <Header white style={styles.header}>Settings</Header>
      <View style={styles.textContainer}>
        <Text style={styles.textLabel}>Name:</Text>
        <Text style={styles.textLabel}>{user.name}</Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.textLabel}>Email:</Text>
        <Text style={styles.textLabel}>{user.email}</Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.textLabel}>Language:</Text>
        <View style={{width: '50%'}}>
          <TouchableOpacity onPress={() => setShowPicker(!showPicker)}>
            <Text style={[styles.textLabel, {textAlign: 'right'}]}>{currentLang.label}</Text>
          </TouchableOpacity>
          {showPicker && <Picker
            selectedValue={currentLang}
            onValueChange={_onLanguageChange}
            returnKeyType={'done'}
          >
            <Picker.Item label="English" value={'en'} />
            <Picker.Item label="Chinese" value={'cn'} />
          </Picker>}
        </View>
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
