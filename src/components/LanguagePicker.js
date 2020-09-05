import React, { memo, useState } from 'react';
import { AsyncStorage, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-community/picker';

import { theme } from '../core/theme';

import { useTranslation } from 'react-i18next';
import { changeLanguage } from '../translation'
import { factorList } from "../data/factorList";

const LanguagePicker = ({ navigation, blackText }) => {
  const { t, i18n } = useTranslation();

  const [showPicker, setShowPicker] = useState(false);
  const [currentLang, setCurrentLang] = useState({ label: 'English', value: 'en' });

  const _onLanguageChange = async (itemValue) => {
    let newLang = {
      label: itemValue === 'en' ? 'English' : 'Chinese',
      value: itemValue
    };
    await AsyncStorage.setItem('lang', itemValue);
    await changeLanguage(itemValue);
    // Translating factorList
    for (let i = 0; i < factorList.length; i++) {
      factorList[i].label = t(factorList[i].label);
    }
    setCurrentLang(newLang);
    setShowPicker(false)
  };


  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setShowPicker(!showPicker)}>
        <Text style={[styles.textLabel, { textAlign: 'right', color: blackText ? 'black' : 'white' }]}>{currentLang.label}</Text>
      </TouchableOpacity>
      {showPicker && <Picker
        selectedValue={currentLang}
        onValueChange={_onLanguageChange}
        returnKeyType={'done'}
      // style={{color: blackText ? 'black' : 'white'}}
      >
        <Picker.Item label="English" value={'en'} />
        <Picker.Item label="Chinese" value={'zh'} />
      </Picker>}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 20
  },
  container: {
    width: '50%'
  },
  textLabel: {
    fontSize: 16,
    color: 'white',
  }
});

export default memo(LanguagePicker);
